import { spawn } from 'node:child_process';

/**
 * Invoke the Claude Code CLI with a prompt and return structured results.
 *
 * @param {string} prompt - The prompt to send to Claude
 * @param {object} [options]
 * @param {string[]} [options.allowedTools] - Tool names to allow (default: Read, Glob, Grep)
 * @param {number} [options.maxTurns] - Max conversation turns (default: 10)
 * @param {string} [options.cwd] - Working directory for the claude process
 * @param {number} [options.timeout] - Timeout in ms before killing the process (default: 120000)
 * @returns {Promise<{result: string|null, usage: object|null, error: string|null}>}
 */
export async function invokeClaude(prompt, options = {}) {
  const {
    allowedTools = ['Read', 'Glob', 'Grep'],
    maxTurns = 10,
    cwd = process.cwd(),
    timeout = 120_000,
  } = options;

  const args = [
    '-p', prompt,
    '--output-format', 'json',
    '--allowedTools', allowedTools.join(','),
    '--max-turns', String(maxTurns),
  ];

  return new Promise((resolve) => {
    let stdout = '';
    let stderr = '';
    let killed = false;

    const child = spawn('claude', args, { cwd });

    const timer = setTimeout(() => {
      killed = true;
      child.kill('SIGKILL');
    }, timeout);

    child.stdout.on('data', (chunk) => { stdout += chunk; });
    child.stderr.on('data', (chunk) => { stderr += chunk; });

    child.on('error', (err) => {
      clearTimeout(timer);
      resolve({ result: null, usage: null, error: `Failed to spawn claude: ${err.message}` });
    });

    child.on('close', (code) => {
      clearTimeout(timer);

      if (killed) {
        return resolve({ result: null, usage: null, error: `Process timed out after ${timeout}ms` });
      }

      if (code !== 0) {
        const detail = stderr.trim() || stdout.trim() || `exit code ${code}`;
        return resolve({ result: null, usage: null, error: `claude exited with code ${code}: ${detail}` });
      }

      let parsed;
      try {
        parsed = JSON.parse(stdout);
      } catch {
        return resolve({ result: null, usage: null, error: `Failed to parse JSON output: ${stdout.slice(0, 500)}` });
      }

      // Handle error responses from Claude
      if (parsed.is_error || parsed.type === 'error') {
        const msg = parsed.error?.message || parsed.result || JSON.stringify(parsed);
        return resolve({ result: null, usage: null, error: `Claude returned an error: ${msg}` });
      }

      // Extract text from content blocks (the JSON output is typically an array or has a result field)
      const text = extractText(parsed);
      const usage = parsed.usage || null;

      resolve({ result: text, usage, error: null });
    });
  });
}

/**
 * Extract text content from Claude's JSON response.
 * The response may be an array of content blocks, or an object with a result field.
 */
function extractText(parsed) {
  // If it's a string already, return it
  if (typeof parsed === 'string') return parsed;

  // If it has a result field that's a string, use that
  if (typeof parsed.result === 'string') return parsed.result;

  // If it has a content array (content blocks), extract text blocks
  const blocks = parsed.content || parsed.result;
  if (Array.isArray(blocks)) {
    return blocks
      .filter((b) => b.type === 'text')
      .map((b) => b.text)
      .join('\n');
  }

  // Fallback: stringify
  return JSON.stringify(parsed);
}

/**
 * Test that the Claude CLI is reachable and working.
 *
 * @returns {Promise<{ok: boolean, error: string|null}>}
 */
export async function testConnection() {
  const { result, error } = await invokeClaude('Reply with exactly: CONNECTION_OK', {
    allowedTools: [],
    maxTurns: 1,
    timeout: 30_000,
  });

  if (error) {
    return { ok: false, error };
  }

  if (result && result.includes('CONNECTION_OK')) {
    return { ok: true, error: null };
  }

  return { ok: false, error: `Unexpected response: ${result?.slice(0, 200)}` };
}
