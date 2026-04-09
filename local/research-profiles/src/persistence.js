import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Format a timestamp as YYYY-MM-DD-HHmmss.
 */
function formatTimestamp(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return [
    date.getFullYear(),
    '-',
    pad(date.getMonth() + 1),
    '-',
    pad(date.getDate()),
    '-',
    pad(date.getHours()),
    pad(date.getMinutes()),
    pad(date.getSeconds()),
  ].join('');
}

/**
 * Render evidence quotes as markdown blockquotes.
 */
function renderEvidence(evidence) {
  if (!evidence || evidence.length === 0) return '';
  return evidence
    .map((ev) => {
      const tag = ev.evidenceType ? ` [${ev.evidenceType}]` : '';
      const who = ev.participantId || 'unknown';
      return `  > "${ev.quote}" — ${who}${tag}`;
    })
    .join('\n');
}

/**
 * Generate a human-readable markdown report from profiles.
 */
function generateMarkdown(profiles, lensId) {
  const now = new Date();
  const dateStr = now.toISOString().split('T')[0];
  const profileCount = profiles.profiles.length;

  // Count represented participants (deduplicated)
  const participantIds = new Set();
  for (const p of profiles.profiles) {
    if (p.representedParticipants) {
      for (const rp of p.representedParticipants) {
        participantIds.add(rp.participantId);
      }
    }
  }

  const lines = [];

  lines.push(`# Research Profiles: ${lensId}`);
  lines.push('');
  lines.push(`Generated: ${dateStr}`);
  lines.push(`Lens: ${lensId}`);
  lines.push(`Participants analyzed: ${participantIds.size}`);
  lines.push('');
  lines.push('## Summary');
  lines.push('');
  lines.push(profiles.profileSummary || '');
  lines.push('');
  lines.push('---');

  for (let i = 0; i < profileCount; i++) {
    const profile = profiles.profiles[i];

    lines.push('');
    lines.push(`## Profile ${i + 1}: ${profile.name}`);
    lines.push('');
    lines.push(`**ID:** ${profile.id}`);

    // Demographics
    const d = profile.demographicSummary;
    if (d) {
      lines.push('');
      lines.push('### Demographics');
      if (d.description) lines.push(d.description);
      if (d.ageRange) lines.push(`- Age range: ${d.ageRange}`);
      if (d.typicalOccupation) lines.push(`- Typical occupation: ${d.typicalOccupation}`);
      if (d.incomeRange) lines.push(`- Income range: ${d.incomeRange}`);
      if (d.familySituation) lines.push(`- Family situation: ${d.familySituation}`);
    }

    // Motivations
    if (profile.motivations && profile.motivations.length > 0) {
      lines.push('');
      lines.push('### Key Motivations');
      for (const m of profile.motivations) {
        lines.push(`- **${m.motivation}**`);
        const ev = renderEvidence(m.evidence);
        if (ev) lines.push(ev);
      }
    }

    // Concerns
    if (profile.concerns && profile.concerns.length > 0) {
      lines.push('');
      lines.push('### Key Concerns');
      for (const c of profile.concerns) {
        lines.push(`- **${c.concern}**`);
        const ev = renderEvidence(c.evidence);
        if (ev) lines.push(ev);
      }
    }

    // Insurance knowledge
    if (profile.insuranceKnowledge) {
      const ik = profile.insuranceKnowledge;
      lines.push('');
      lines.push('### Insurance Knowledge');
      lines.push(`**Level:** ${ik.level || 'N/A'}`);
      if (ik.description) lines.push(ik.description);
      const ev = renderEvidence(ik.evidence);
      if (ev) lines.push(ev);
    }

    // Research approach
    if (profile.researchApproach) {
      lines.push('');
      lines.push('### Research Approach');
      if (profile.researchApproach.description) lines.push(profile.researchApproach.description);
      const ev = renderEvidence(profile.researchApproach.evidence);
      if (ev) lines.push(ev);
    }

    // Decision-making style
    if (profile.decisionMakingStyle) {
      lines.push('');
      lines.push('### Decision-Making Style');
      if (profile.decisionMakingStyle.description) lines.push(profile.decisionMakingStyle.description);
      const ev = renderEvidence(profile.decisionMakingStyle.evidence);
      if (ev) lines.push(ev);
    }

    // Technology comfort
    if (profile.technologyComfort) {
      const tc = profile.technologyComfort;
      lines.push('');
      lines.push('### Technology Comfort');
      lines.push(`**Level:** ${tc.level || 'N/A'}`);
      if (tc.description) lines.push(tc.description);
      const ev = renderEvidence(tc.evidence);
      if (ev) lines.push(ev);
    }

    // Represented participants
    if (profile.representedParticipants && profile.representedParticipants.length > 0) {
      lines.push('');
      lines.push('### Represented Participants');
      lines.push('| Participant | Fit |');
      lines.push('|---|---|');
      for (const p of profile.representedParticipants) {
        const name = p.participantName || p.participantId;
        lines.push(`| ${name} | ${p.fitDescription} |`);
      }
    }

    lines.push('');
    lines.push('---');
  }

  return lines.join('\n');
}

/**
 * Save profiles, analysis, and a markdown report to a timestamped output directory.
 *
 * @param {object} profiles - The profiles JSON object
 * @param {object} analysisResult - The full analysis result { individualAnalyses, synthesis }
 * @param {string} outputDir - Path to the output/ directory
 * @param {string} lensId - Lens identifier, e.g. "55-plus"
 * @returns {string} The path to the created subdirectory
 */
export function saveProfiles(profiles, analysisResult, outputDir, lensId) {
  const timestamp = formatTimestamp(new Date());
  const subDir = join(outputDir, `${lensId}-${timestamp}`);

  mkdirSync(subDir, { recursive: true });

  writeFileSync(join(subDir, 'profiles.json'), JSON.stringify(profiles, null, 2), 'utf-8');
  writeFileSync(join(subDir, 'analysis.json'), JSON.stringify(analysisResult, null, 2), 'utf-8');
  writeFileSync(join(subDir, 'profiles.md'), generateMarkdown(profiles, lensId), 'utf-8');

  console.log(`Saved to ${subDir}`);
  return subDir;
}

/**
 * Load a previously saved profiles.json file.
 *
 * @param {string} profilesJsonPath - Absolute path to a profiles.json file
 * @returns {object} The parsed profiles object
 */
export function loadProfiles(profilesJsonPath) {
  const raw = readFileSync(profilesJsonPath, 'utf-8');
  return JSON.parse(raw);
}
