/**
 * Funnel Screen Capture Script
 *
 * Usage: node capture-funnel.mjs [startUrl]
 *
 * 1. Opens a browser — you navigate the funnel manually
 * 2. Click CAPTURE in the control panel to screenshot the current screen
 * 3. A headless Claude instance analyzes the screenshot and writes markdown
 * 4. Click SAVE & QUIT when done — produces funnel-capture.md
 */

import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const START_URL = process.argv[2] || 'https://www.ethos.com';
const OUTPUT_DIR = path.join(process.cwd(), 'funnel-output');
const SCREENSHOT_DIR = path.join(OUTPUT_DIR, 'screenshots');

if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const ANALYSIS_PROMPT = `You are analyzing a screenshot of one screen in an insurance application funnel. Look at the screenshot at the provided file path and produce a clean markdown description with exactly this structure:

### What the user sees
Describe all visible text, headings, images, and information shown on the screen. Be specific about the exact wording. Note the visual hierarchy.

### What the user can do
List every interactive element: buttons, text inputs, dropdowns, radio buttons, checkboxes, sliders, links, etc. For each, note its label and purpose.

Rules:
- Be precise — use the exact text from the screen
- Keep it concise, no fluff
- Do NOT wrap the output in a code block
- Output ONLY the markdown, nothing else`;

async function analyzeScreenshot(screenshotPath, screenNum) {
  console.log(`  Analyzing with Claude...`);
  try {
    const prompt = `Read the image file at ${screenshotPath} and analyze it.\n\n${ANALYSIS_PROMPT}`;
    const result = await new Promise((resolve, reject) => {
      const proc = spawn('claude', [
        '-p',
        '--model', 'sonnet',
        '--allowedTools', 'Read',
      ], {
        stdio: ['pipe', 'pipe', 'pipe'],
      });

      let stdout = '';
      let stderr = '';
      proc.stdout.on('data', (d) => stdout += d);
      proc.stderr.on('data', (d) => stderr += d);

      // Send prompt via stdin then close it
      proc.stdin.write(prompt);
      proc.stdin.end();

      const timer = setTimeout(() => { proc.kill(); reject(new Error('Timed out after 60s')); }, 60000);

      proc.on('close', (code) => {
        clearTimeout(timer);
        if (code === 0) resolve(stdout.trim());
        else reject(new Error(`Exit code ${code}: ${stderr.trim()}`));
      });
      proc.on('error', (err) => { clearTimeout(timer); reject(err); });
    });
    return result;
  } catch (err) {
    console.error(`  Claude analysis failed: ${err.message}`);
    return `_Analysis failed for screen ${screenNum}: ${err.message.slice(0, 200)}_`;
  }
}

async function main() {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: false });

  const mainContext = await browser.newContext({ viewport: null });
  const mainPage = await mainContext.newPage();
  await mainPage.goto(START_URL, { waitUntil: 'domcontentloaded' });

  // Control panel — separate small window
  const controlContext = await browser.newContext({
    viewport: { width: 320, height: 450 },
  });
  const controlPage = await controlContext.newPage();
  await controlPage.setContent(`
    <html>
    <body style="margin:0;padding:12px;font-family:system-ui;background:#1a1a1a;color:white;display:flex;flex-direction:column;gap:10px;">
      <div id="status" style="text-align:center;font-size:14px;color:#aaa;">Captured: 0 screens</div>
      <button id="capture" style="background:#2563eb;color:white;border:none;padding:14px;border-radius:8px;font-size:16px;font-weight:700;cursor:pointer;">
        📸 CAPTURE
      </button>
      <div id="log" style="flex:1;overflow-y:auto;font-size:11px;color:#888;font-family:monospace;max-height:300px;"></div>
      <button id="save" style="background:#16a34a;color:white;border:none;padding:12px;border-radius:8px;font-size:14px;font-weight:700;cursor:pointer;">
        💾 SAVE & QUIT
      </button>
    </body>
    </html>
  `);

  let screenNum = 1;
  let failCount = 0;
  const screenMarkdowns = {}; // keyed by screen number for correct ordering
  const pendingAnalyses = new Set();

  function logToPanel(msg, color = '#888') {
    controlPage.evaluate(({ msg, color }) => {
      const log = document.getElementById('log');
      const line = document.createElement('div');
      line.style.color = color;
      line.style.marginBottom = '3px';
      line.textContent = msg;
      log.appendChild(line);
      log.scrollTop = log.scrollHeight;
    }, { msg, color }).catch(() => {});
  }

  function updateControlStatus() {
    const pending = pendingAnalyses.size;
    const done = Object.keys(screenMarkdowns).length - failCount;
    const total = screenNum - 1;
    let text = `Captured: ${total} | Done: ${done}`;
    if (pending > 0) text += ` | Pending: ${pending}`;
    if (failCount > 0) text += ` | Failed: ${failCount}`;
    controlPage.evaluate(({ text, hasFailures }) => {
      const el = document.getElementById('status');
      el.textContent = text;
      el.style.color = hasFailures ? '#f87171' : '#aaa';
    }, { text, hasFailures: failCount > 0 }).catch(() => {});
  }

  await controlPage.exposeFunction('__doCapture', async () => {
    const num = screenNum++;
    const url = mainPage.url();
    console.log(`Capturing screen ${num}...`);
    try {
      const screenshotPath = path.join(SCREENSHOT_DIR, `screen-${String(num).padStart(2, '0')}.png`);
      // Convert fixed/sticky elements to absolute so they don't float mid-page in full-page screenshots
      await mainPage.evaluate(() => {
        document.querySelectorAll('*').forEach((el) => {
          const pos = getComputedStyle(el).position;
          if (pos === 'fixed' || pos === 'sticky') {
            el.setAttribute('data-orig-pos', pos);
            el.style.position = 'absolute';
          }
        });
      });
      await mainPage.screenshot({ path: screenshotPath, fullPage: true });
      // Restore original positions
      await mainPage.evaluate(() => {
        document.querySelectorAll('[data-orig-pos]').forEach((el) => {
          el.style.position = el.getAttribute('data-orig-pos');
          el.removeAttribute('data-orig-pos');
        });
      });
      console.log(`  Screenshot saved: ${screenshotPath}`);

      // Fire off analysis in background
      pendingAnalyses.add(num);
      logToPanel(`#${num} ⏳ analyzing...`, '#60a5fa');
      updateControlStatus();

      analyzeScreenshot(screenshotPath, num).then((analysis) => {
        const md = `## Screen ${num}\n\n**URL:** ${url}\n\n${analysis}\n\n![Screen ${num}](screenshots/screen-${String(num).padStart(2, '0')}.png)\n\n---\n\n`;
        screenMarkdowns[num] = md;

        const mdPath = path.join(OUTPUT_DIR, `screen-${String(num).padStart(2, '0')}.md`);
        fs.writeFileSync(mdPath, md);
        console.log(`  Screen ${num} analysis complete → ${mdPath}`);

        logToPanel(`#${num} ✅ done`, '#4ade80');
        pendingAnalyses.delete(num);
        updateControlStatus();
      }).catch((err) => {
        console.error(`  Screen ${num} analysis failed: ${err.message}`);
        screenMarkdowns[num] = `## Screen ${num}\n\n**URL:** ${url}\n\n_Analysis failed_\n\n---\n\n`;
        failCount++;
        logToPanel(`#${num} ❌ failed: ${err.message.slice(0, 60)}`, '#f87171');
        pendingAnalyses.delete(num);
        updateControlStatus();
      });

      return num;
    } catch (err) {
      console.error(`  Screenshot error: ${err.message}`);
      return -1;
    }
  });

  await controlPage.exposeFunction('__doSave', async () => {
    if (pendingAnalyses.size > 0) {
      console.log(`Waiting for ${pendingAnalyses.size} pending analyses to finish...`);
      await controlPage.evaluate((n) => {
        document.getElementById('status').textContent = `Waiting for ${n} analyses to finish...`;
      }, pendingAnalyses.size);
      // Poll until all done
      while (pendingAnalyses.size > 0) {
        await new Promise((r) => setTimeout(r, 500));
      }
    }

    // Combine in order
    const ordered = Object.keys(screenMarkdowns).sort((a, b) => a - b).map((k) => screenMarkdowns[k]);
    const outputPath = path.join(OUTPUT_DIR, 'funnel-capture.md');
    const combined = `# Ethos Funnel Screen Capture\n\nCaptured: ${new Date().toISOString().split('T')[0]}\n\n---\n\n` + ordered.join('');
    fs.writeFileSync(outputPath, combined);
    console.log(`\nSaved ${ordered.length} screens to ${outputPath}`);
    await browser.close();
    process.exit(0);
  });

  await controlPage.evaluate(() => {
    document.getElementById('capture').addEventListener('click', async () => {
      const btn = document.getElementById('capture');
      btn.textContent = '⏳ Taking screenshot...';
      btn.disabled = true;

      const num = await window.__doCapture();

      if (num > 0) {
        btn.textContent = '✅ Queued!';
        setTimeout(() => { btn.textContent = '📸 CAPTURE'; btn.disabled = false; }, 400);
      } else {
        btn.textContent = '❌ Error';
        setTimeout(() => { btn.textContent = '📸 CAPTURE'; btn.disabled = false; }, 1000);
      }
    });
    document.getElementById('save').addEventListener('click', () => window.__doSave());
  });

  console.log('\nReady! Two windows open:');
  console.log('  1. Main browser — navigate the funnel');
  console.log('  2. Control panel — CAPTURE each screen, SAVE & QUIT when done');
  console.log(`\nOutput goes to: ${OUTPUT_DIR}/\n`);

  await new Promise(() => {});
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
