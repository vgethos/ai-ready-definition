import { createInterface } from 'node:readline';

/**
 * Promise-based readline question helper.
 */
function ask(rl, prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, (answer) => resolve(answer.trim()));
  });
}

/**
 * Print a horizontal separator line.
 */
function separator(char = '─', width = 60) {
  console.log(char.repeat(width));
}

/**
 * Format a single evidence quote for display.
 */
function formatQuote(ev) {
  if (!ev) return '';
  const tag = ev.evidenceType ? ` [${ev.evidenceType}]` : '';
  const who = ev.participantId || 'unknown';
  return `  > "${ev.quote}" — ${who}${tag}`;
}

/**
 * Display a profile in summary form (highlights only).
 */
function displayProfileSummary(profile, index) {
  console.log(`\nProfile ${index + 1}: ${profile.name}`);
  console.log(`ID: ${profile.id}`);

  // Demographics
  const d = profile.demographicSummary;
  if (d) {
    console.log(`\nDemographics: ${d.description || ''}`);
    if (d.ageRange) console.log(`  Age range: ${d.ageRange}`);
    if (d.typicalOccupation) console.log(`  Typical occupation: ${d.typicalOccupation}`);
    if (d.incomeRange) console.log(`  Income range: ${d.incomeRange}`);
    if (d.familySituation) console.log(`  Family situation: ${d.familySituation}`);
  }

  // Top 3 motivations
  if (profile.motivations && profile.motivations.length > 0) {
    console.log('\nKey Motivations:');
    for (const m of profile.motivations.slice(0, 3)) {
      console.log(`  - ${m.motivation}`);
      const firstQuote = m.evidence && m.evidence[0];
      if (firstQuote) console.log(formatQuote(firstQuote));
    }
  }

  // Top 3 concerns
  if (profile.concerns && profile.concerns.length > 0) {
    console.log('\nKey Concerns:');
    for (const c of profile.concerns.slice(0, 3)) {
      console.log(`  - ${c.concern}`);
      const firstQuote = c.evidence && c.evidence[0];
      if (firstQuote) console.log(formatQuote(firstQuote));
    }
  }

  // Insurance knowledge
  if (profile.insuranceKnowledge) {
    const ik = profile.insuranceKnowledge;
    console.log(`\nInsurance Knowledge: ${ik.level || 'N/A'}`);
    if (ik.description) console.log(`  ${ik.description}`);
  }

  // Research approach
  if (profile.researchApproach) {
    console.log(`\nResearch Approach:`);
    console.log(`  ${profile.researchApproach.description || ''}`);
  }

  // Decision-making style
  if (profile.decisionMakingStyle) {
    console.log(`\nDecision-Making Style:`);
    console.log(`  ${profile.decisionMakingStyle.description || ''}`);
  }

  // Technology comfort
  if (profile.technologyComfort) {
    const tc = profile.technologyComfort;
    console.log(`\nTechnology Comfort: ${tc.level || 'N/A'}`);
    if (tc.description) console.log(`  ${tc.description}`);
  }

  // Represented participants
  if (profile.representedParticipants && profile.representedParticipants.length > 0) {
    console.log('\nRepresented Participants:');
    for (const p of profile.representedParticipants) {
      console.log(`  - ${p.participantName || p.participantId}: ${p.fitDescription}`);
    }
  }
}

/**
 * Display ALL evidence for a single profile (full detail view).
 */
function displayProfileDetail(profile, index) {
  console.log(`\n${'═'.repeat(60)}`);
  console.log(`FULL DETAIL — Profile ${index + 1}: ${profile.name} (${profile.id})`);
  console.log('═'.repeat(60));

  // Demographics
  const d = profile.demographicSummary;
  if (d) {
    console.log(`\n### Demographics`);
    console.log(d.description || '');
    if (d.ageRange) console.log(`  Age range: ${d.ageRange}`);
    if (d.typicalOccupation) console.log(`  Typical occupation: ${d.typicalOccupation}`);
    if (d.incomeRange) console.log(`  Income range: ${d.incomeRange}`);
    if (d.familySituation) console.log(`  Family situation: ${d.familySituation}`);
  }

  // All motivations with all evidence
  if (profile.motivations && profile.motivations.length > 0) {
    console.log(`\n### Motivations (${profile.motivations.length} total)`);
    for (const m of profile.motivations) {
      console.log(`\n  - ${m.motivation}`);
      if (m.evidence) {
        for (const ev of m.evidence) {
          console.log(formatQuote(ev));
        }
      }
    }
  }

  // All concerns with all evidence
  if (profile.concerns && profile.concerns.length > 0) {
    console.log(`\n### Concerns (${profile.concerns.length} total)`);
    for (const c of profile.concerns) {
      console.log(`\n  - ${c.concern}`);
      if (c.evidence) {
        for (const ev of c.evidence) {
          console.log(formatQuote(ev));
        }
      }
    }
  }

  // Insurance knowledge — full
  if (profile.insuranceKnowledge) {
    const ik = profile.insuranceKnowledge;
    console.log(`\n### Insurance Knowledge`);
    console.log(`  Level: ${ik.level || 'N/A'}`);
    if (ik.description) console.log(`  ${ik.description}`);
    if (ik.evidence) {
      for (const ev of ik.evidence) {
        console.log(formatQuote(ev));
      }
    }
  }

  // Research approach — full
  if (profile.researchApproach) {
    console.log(`\n### Research Approach`);
    console.log(`  ${profile.researchApproach.description || ''}`);
    if (profile.researchApproach.evidence) {
      for (const ev of profile.researchApproach.evidence) {
        console.log(formatQuote(ev));
      }
    }
  }

  // Decision-making style — full
  if (profile.decisionMakingStyle) {
    console.log(`\n### Decision-Making Style`);
    console.log(`  ${profile.decisionMakingStyle.description || ''}`);
    if (profile.decisionMakingStyle.evidence) {
      for (const ev of profile.decisionMakingStyle.evidence) {
        console.log(formatQuote(ev));
      }
    }
  }

  // Technology comfort — full
  if (profile.technologyComfort) {
    const tc = profile.technologyComfort;
    console.log(`\n### Technology Comfort`);
    console.log(`  Level: ${tc.level || 'N/A'}`);
    if (tc.description) console.log(`  ${tc.description}`);
    if (tc.evidence) {
      for (const ev of tc.evidence) {
        console.log(formatQuote(ev));
      }
    }
  }

  // Represented participants
  if (profile.representedParticipants && profile.representedParticipants.length > 0) {
    console.log(`\n### Represented Participants`);
    for (const p of profile.representedParticipants) {
      console.log(`  - ${p.participantName || p.participantId}: ${p.fitDescription}`);
    }
  }
}

/**
 * Display all profiles in summary form.
 */
function displayAllProfiles(profiles) {
  console.log('\n');
  separator('═', 60);
  console.log('GENERATED RESEARCH PROFILES');
  separator('═', 60);

  if (profiles.profileSummary) {
    console.log(`\n${profiles.profileSummary}`);
  }

  for (let i = 0; i < profiles.profiles.length; i++) {
    console.log('');
    separator('─', 60);
    displayProfileSummary(profiles.profiles[i], i);
  }

  separator('─', 60);
  console.log('');
}

/**
 * Interactive review loop for generated profiles.
 *
 * @param {object} profiles - The profiles JSON object
 * @param {function} adjustFn - async (currentProfiles, adjustment) => newProfiles
 * @returns {{ accepted: boolean, profiles: object|null }}
 */
export async function reviewProfiles(profiles, adjustFn) {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  let currentProfiles = profiles;

  try {
    // eslint-disable-next-line no-constant-condition
    while (true) {
      displayAllProfiles(currentProfiles);

      const prompt = [
        'Review the profiles above. Options:',
        '  [a]ccept - confirm these profiles and proceed',
        '  [r]evise - request changes to the profiles',
        '  [d]etail - show full detail for a specific profile',
        '  [q]uit   - exit without saving',
        '',
        'Your choice: ',
      ].join('\n');

      const choice = (await ask(rl, prompt)).toLowerCase();

      if (choice === 'a' || choice === 'accept') {
        rl.close();
        return { accepted: true, profiles: currentProfiles };
      }

      if (choice === 'q' || choice === 'quit') {
        rl.close();
        return { accepted: false, profiles: null };
      }

      if (choice === 'r' || choice === 'revise') {
        const adjustment = await ask(
          rl,
          "Describe the changes you'd like (e.g., 'merge profiles 1 and 2', 'add more detail about technology comfort'):\n> "
        );

        if (adjustment) {
          console.log('\nRegenerating profiles with your adjustments...\n');
          currentProfiles = await adjustFn(currentProfiles, adjustment);
        }
        continue;
      }

      if (choice === 'd' || choice === 'detail') {
        const count = currentProfiles.profiles.length;
        const numStr = await ask(
          rl,
          `Which profile? Enter number (${Array.from({ length: count }, (_, i) => i + 1).join(', ')}): `
        );
        const num = parseInt(numStr, 10);

        if (num >= 1 && num <= count) {
          displayProfileDetail(currentProfiles.profiles[num - 1], num - 1);
        } else {
          console.log(`Invalid selection. Please enter a number between 1 and ${count}.`);
        }
        continue;
      }

      console.log("Unknown option. Please enter 'a', 'r', 'd', or 'q'.");
    }
  } finally {
    // Ensure readline is closed even on unexpected errors
    rl.close();
  }
}
