import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import process from 'node:process';

import { testConnection } from './claude.js';
import { loadParticipants } from './participants.js';
import { loadFunnelScreens, getScreenSummary } from './funnel.js';
import { getLens, filterParticipants } from './lenses.js';
import { analyzeTranscripts } from './analysis.js';
import { generateProfiles, adjustProfiles } from './profiles.js';
import { reviewProfiles } from './review.js';
import { saveProfiles } from './persistence.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const projectRoot = resolve(__dirname, '..');
const transcriptsDir = resolve(projectRoot, 'transcripts');
const outputDir = resolve(projectRoot, 'output');

const LENS_ID = '55-plus';

console.log('');
console.log('='.repeat(56));
console.log('  Research Profiles — Analysis & Profile Generation');
console.log('='.repeat(56));
console.log('');

// ── Step 1: Load data ──────────────────────────────────

let participants;
try {
  const csvPath = resolve(projectRoot, 'foundational-55-interviews-participants.csv');
  participants = await loadParticipants(csvPath);
  console.log(`✓ Loaded ${participants.length} participants`);
} catch (err) {
  console.error(`✗ Failed to load participants: ${err.message}`);
  process.exit(1);
}

let screens;
try {
  const screensDir = resolve(__dirname, '../../../docs/funnel-output');
  screens = await loadFunnelScreens(screensDir);
  console.log(`✓ Loaded ${screens.length} funnel screens`);
} catch (err) {
  console.error(`✗ Failed to load funnel screens: ${err.message}`);
  process.exit(1);
}

// ── Step 2: Apply lens ─────────────────────────────────

const lens = getLens(LENS_ID);
const matched = filterParticipants(LENS_ID, participants);
console.log(`✓ Lens '${lens.name}': ${matched.length} of ${participants.length} participants match`);

if (matched.length === 0) {
  console.error('✗ No participants match the lens. Nothing to analyze.');
  process.exit(1);
}

// Print participant table
const nameWidth = Math.max(...matched.map((p) => p.firstName.length), 4);
console.log('');
console.log('  ' + 'Name'.padEnd(nameWidth + 2) + 'Age'.padEnd(6) + 'Transcript');
console.log('  ' + '-'.repeat(nameWidth + 2 + 6 + 10));
for (const p of matched) {
  const name = p.firstName.padEnd(nameWidth + 2);
  const age = (p.age != null ? String(p.age) : '—').padEnd(6);
  const transcript = p.transcriptFile ? 'yes' : 'no';
  console.log(`  ${name}${age}${transcript}`);
}
console.log('');

// ── Step 3: Test Claude connection ─────────────────────

try {
  const { ok, error } = await testConnection();
  if (ok) {
    console.log('✓ Claude connection OK');
  } else {
    console.error(`✗ Claude connection failed: ${error}`);
    console.error('  The claude CLI must be installed and available on PATH.');
    process.exit(1);
  }
} catch (err) {
  console.error(`✗ Claude connection failed: ${err.message}`);
  process.exit(1);
}

console.log('');

// ── Step 4: Analyze transcripts ────────────────────────

const analysisCheckpoint = resolve(outputDir, 'analysis-checkpoint.json');
const skipAnalysis = process.argv.includes('--from-analysis');
let analysisResult;

if (skipAnalysis && existsSync(analysisCheckpoint)) {
  console.log('='.repeat(56));
  console.log('  Step 1: Transcript Analysis (loading checkpoint)');
  console.log('='.repeat(56));
  console.log('');
  analysisResult = JSON.parse(readFileSync(analysisCheckpoint, 'utf-8'));
  const successCount = analysisResult.individualAnalyses.filter((a) => !a.parseError).length;
  console.log(`✓ Loaded analysis checkpoint: ${successCount} analyses + synthesis`);
} else {
  console.log('='.repeat(56));
  console.log('  Step 1: Transcript Analysis');
  console.log('='.repeat(56));

  analysisResult = await analyzeTranscripts(matched, transcriptsDir, {
    cwd: projectRoot,
  });

  const successCount = analysisResult.individualAnalyses.filter((a) => !a.parseError).length;
  const failCount = analysisResult.individualAnalyses.length - successCount;
  console.log(`\n✓ Analysis complete: ${successCount} successful, ${failCount} failed`);

  // Save checkpoint
  mkdirSync(outputDir, { recursive: true });
  writeFileSync(analysisCheckpoint, JSON.stringify(analysisResult, null, 2), 'utf-8');
  console.log(`✓ Analysis checkpoint saved to ${analysisCheckpoint}`);
}

if (!analysisResult.synthesis || analysisResult.synthesis.parseError) {
  console.error('✗ Synthesis failed. Cannot proceed to profile generation.');
  process.exit(1);
}

console.log('✓ Synthesis complete');
console.log('');

// ── Step 5: Generate profiles ──────────────────────────

console.log('='.repeat(56));
console.log('  Step 2: Profile Generation');
console.log('='.repeat(56));
console.log('');

const { profiles: generatedProfiles, error: profileError } = await generateProfiles(
  analysisResult,
  matched,
  lens.description,
  { cwd: projectRoot }
);

if (profileError) {
  console.error(`✗ Profile generation failed: ${profileError}`);
  process.exit(1);
}

console.log(`✓ Generated ${generatedProfiles.profiles.length} profiles`);
console.log('');

// ── Step 6: Interactive review ─────────────────────────

console.log('='.repeat(56));
console.log('  Step 3: Profile Review');
console.log('='.repeat(56));

const adjustFn = async (currentProfiles, adjustment) => {
  const { profiles: adjusted, error } = await adjustProfiles(
    currentProfiles,
    analysisResult,
    matched,
    adjustment,
    { cwd: projectRoot }
  );
  if (error) {
    console.error(`  Adjustment failed: ${error}`);
    return currentProfiles;
  }
  return adjusted;
};

const { accepted, profiles: finalProfiles } = await reviewProfiles(generatedProfiles, adjustFn);

if (!accepted || !finalProfiles) {
  console.log('\nExiting without saving.');
  process.exit(0);
}

// ── Step 7: Save results ───────────────────────────────

console.log('');
console.log('='.repeat(56));
console.log('  Step 4: Saving Results');
console.log('='.repeat(56));
console.log('');

const savedDir = saveProfiles(finalProfiles, analysisResult, outputDir, LENS_ID);

console.log('');
console.log('='.repeat(56));
console.log('  Done!');
console.log('='.repeat(56));
console.log('');
console.log(`Profiles saved to: ${savedDir}`);
console.log('Files:');
console.log('  profiles.json  — structured profile data');
console.log('  analysis.json  — full transcript analysis');
console.log('  profiles.md    — human-readable report');
console.log('');
