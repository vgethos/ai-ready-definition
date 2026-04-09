import { invokeClaude } from './claude.js';

/**
 * Condense an individual analysis — keep findings and up to 2 quotes per finding.
 */
function condenseAnalysis(analysis) {
  const pick = (evidence, n = 2) => {
    if (!evidence || evidence.length === 0) return [];
    return evidence.slice(0, n).map((e) => ({ quote: e.quote, context: e.context, participantId: e.participantId || analysis.participantId }));
  };

  return {
    participantId: analysis.participantId,
    participantName: analysis.participantName,
    themes: (analysis.themes || []).map((t) => ({ theme: t.theme, evidence: pick(t.evidence) })),
    concerns: (analysis.concerns || []).map((c) => ({ concern: c.concern, evidence: pick(c.evidence) })),
    motivations: (analysis.motivations || []).map((m) => ({ motivation: m.motivation, evidence: pick(m.evidence) })),
    painPoints: (analysis.painPoints || []).map((p) => ({ painPoint: p.painPoint, evidence: pick(p.evidence) })),
    knowledgeGaps: (analysis.knowledgeGaps || []).map((g) => ({ gap: g.gap, evidence: pick(g.evidence) })),
    decisionMakingPatterns: (analysis.decisionMakingPatterns || []).map((d) => ({ pattern: d.pattern, evidence: pick(d.evidence) })),
    technologyComfort: analysis.technologyComfort ? { level: analysis.technologyComfort.level, evidence: pick(analysis.technologyComfort.evidence) } : null,
    insuranceResearchApproach: analysis.insuranceResearchApproach ? { approach: analysis.insuranceResearchApproach.approach, evidence: pick(analysis.insuranceResearchApproach.evidence) } : null,
  };
}

/**
 * Build a demographic summary string for a participant.
 */
function summarizeParticipant(p) {
  const parts = [
    `${p.firstName} ${p.lastName} (ID: ${p.id})`,
    `Age: ${p.age}`,
    `Gender: ${p.gender}`,
    `Occupation: ${p.occupation}`,
    `Income: ${p.income}`,
    `Marital status: ${p.maritalStatus}`,
    `Living with: ${p.livingWith}`,
    `Education: ${p.education}`,
    `Neighborhood: ${p.neighborhoodType}`,
    `Region: ${p.region}`,
    `Has life insurance: ${p.hasLifeInsurance}`,
    `Coverage amount: ${p.coverageAmount}`,
    `Policies considering: ${p.policiesConsidering}`,
    `Research approach: ${p.researchApproach}`,
    `Providers heard of: ${p.providersHeardOf}`,
  ];
  return parts.join(' | ');
}

/**
 * Strip markdown code fences from a string and parse as JSON.
 */
function parseJsonResponse(text) {
  if (!text) {
    return { parsed: null, error: 'Empty response from Claude' };
  }

  let jsonStr = text.trim();

  // Strip markdown code fences if present (greedy match for large JSON)
  const fenceMatch = jsonStr.match(/```(?:json)?\s*\n([\s\S]+)\n\s*```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1];
  } else if (jsonStr.startsWith('```')) {
    const lines = jsonStr.split('\n');
    if (lines[0].startsWith('```')) lines.shift();
    if (lines[lines.length - 1].trim() === '```') lines.pop();
    jsonStr = lines.join('\n');
  }

  try {
    return { parsed: JSON.parse(jsonStr.trim()), error: null };
  } catch (err) {
    return { parsed: null, error: `Failed to parse JSON: ${err.message}\nRaw response (first 500 chars): ${text.slice(0, 500)}` };
  }
}

/**
 * Generate 2-3 evidence-based profiles from transcript analysis results.
 *
 * @param {object} analysisResult - Output from analyzeTranscripts (individualAnalyses + synthesis)
 * @param {object[]} participants - Array of participant objects with demographic data
 * @param {string} lensDescription - Description of the current lens (e.g., "Adults aged 55 and older...")
 * @param {object} [options]
 * @param {string} [options.cwd] - Working directory for Claude
 * @returns {Promise<{profiles: object|null, error: string|null}>}
 */
export async function generateProfiles(analysisResult, participants, lensDescription, options = {}) {
  console.log('Generating profiles...');

  const participantSummaries = participants.map(summarizeParticipant).join('\n');

  const prompt = `You are a user research analyst. Your task is to generate 2-3 evidence-based research profiles from interview transcript analyses.

## Important Terminology
Use the term "profiles" — NEVER "personas." These are grounded composites, not fictional archetypes.

## Lens
${lensDescription}

## Participant Demographics
${participantSummaries}

## Cross-Cutting Synthesis (patterns, clusters, and key insights across all participants)
${JSON.stringify(analysisResult.synthesis, null, 2)}

## Instructions

Generate 2-3 distinct profiles based on the data above. Each profile should represent a distinct behavioral/attitudinal cluster within this lens.

Key rules:
1. **Every attribute must be traceable to real participant data.** Do not invent or speculate. Be conservative — if the data doesn't clearly support a claim, don't make it.
2. **Include direct quotes as evidence.** Use actual quotes from the individual analyses to support each profile attribute.
3. **Each profile should represent a distinct cluster.** Look at the synthesis clusters for guidance, but use your judgment — the clusters are suggestions, not mandates.
4. **Map real participants to profiles.** Every participant should appear in at least one profile's representedParticipants list. Explain why they fit.
5. **Evidence types must be accurate:**
   - "quote-based" — directly supported by something a participant said
   - "inferred" — a reasonable inference from demographics, context, or patterns, but not directly stated

Return ONLY valid JSON matching this exact schema (no surrounding text, no markdown fences):

{
  "profiles": [
    {
      "id": "string (slug like 'cautious-researcher')",
      "name": "string (descriptive label, NOT a person name)",
      "demographicSummary": {
        "ageRange": "string",
        "typicalOccupation": "string",
        "incomeRange": "string",
        "familySituation": "string",
        "description": "string (1-2 sentences)"
      },
      "motivations": [
        { "motivation": "string", "evidence": [{ "quote": "string", "participantId": "string", "evidenceType": "quote-based" }] }
      ],
      "concerns": [
        { "concern": "string", "evidence": [{ "quote": "string", "participantId": "string", "evidenceType": "quote-based|inferred" }] }
      ],
      "insuranceKnowledge": {
        "level": "string (novice/intermediate/knowledgeable)",
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "researchApproach": {
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "decisionMakingStyle": {
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "technologyComfort": {
        "level": "string (low/moderate/high)",
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "representedParticipants": [
        { "participantId": "string", "participantName": "string", "fitDescription": "string (why this participant fits this profile)" }
      ]
    }
  ],
  "profileSummary": "string (1-2 paragraphs describing the overall landscape and how profiles relate to each other)"
}`;

  const { result, error } = await invokeClaude(prompt, {
    allowedTools: [],
    maxTurns: 3,
    timeout: 600_000,
    cwd: options.cwd,
  });

  if (error) {
    return { profiles: null, error: `Claude invocation failed: ${error}` };
  }

  const { parsed, error: parseError } = parseJsonResponse(result);
  if (parseError) {
    return { profiles: null, error: parseError };
  }

  return { profiles: parsed, error: null };
}

/**
 * Adjust existing profiles based on user feedback.
 *
 * @param {object} currentProfiles - The current profiles JSON (with profiles array and profileSummary)
 * @param {object} analysisResult - Original analysis output for reference
 * @param {object[]} participants - Array of participant objects
 * @param {string} adjustment - User's description of desired changes
 * @param {object} [options]
 * @param {string} [options.cwd] - Working directory for Claude
 * @returns {Promise<{profiles: object|null, error: string|null}>}
 */
export async function adjustProfiles(currentProfiles, analysisResult, participants, adjustment, options = {}) {
  console.log('Adjusting profiles...');

  const participantSummaries = participants.map(summarizeParticipant).join('\n');

  const prompt = `You are a user research analyst. You previously generated research profiles from interview data. The researcher has reviewed them and wants adjustments.

## Important Terminology
Use the term "profiles" — NEVER "personas."

## Current Profiles
${JSON.stringify(currentProfiles, null, 2)}

## Requested Adjustment
${adjustment}

## Original Synthesis (for reference)
${JSON.stringify(analysisResult.synthesis, null, 2)}

## Participant Demographics (for reference)
${participantSummaries}

## Instructions

Apply the requested adjustment to the profiles. Maintain the same evidence standards:
1. Every attribute must be traceable to real participant data.
2. Include direct quotes as evidence.
3. Tag evidence types accurately ("quote-based" or "inferred").
4. Be conservative — don't infer what wasn't said.

Return ONLY valid JSON in the exact same schema as the current profiles (no surrounding text, no markdown fences):

{
  "profiles": [
    {
      "id": "string (slug like 'cautious-researcher')",
      "name": "string (descriptive label, NOT a person name)",
      "demographicSummary": {
        "ageRange": "string",
        "typicalOccupation": "string",
        "incomeRange": "string",
        "familySituation": "string",
        "description": "string (1-2 sentences)"
      },
      "motivations": [
        { "motivation": "string", "evidence": [{ "quote": "string", "participantId": "string", "evidenceType": "quote-based" }] }
      ],
      "concerns": [
        { "concern": "string", "evidence": [{ "quote": "string", "participantId": "string", "evidenceType": "quote-based|inferred" }] }
      ],
      "insuranceKnowledge": {
        "level": "string (novice/intermediate/knowledgeable)",
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "researchApproach": {
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "decisionMakingStyle": {
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "technologyComfort": {
        "level": "string (low/moderate/high)",
        "description": "string",
        "evidence": [{ "quote": "string", "participantId": "string" }]
      },
      "representedParticipants": [
        { "participantId": "string", "participantName": "string", "fitDescription": "string (why this participant fits this profile)" }
      ]
    }
  ],
  "profileSummary": "string (1-2 paragraphs describing the overall landscape and how profiles relate to each other)"
}`;

  const { result, error } = await invokeClaude(prompt, {
    allowedTools: [],
    maxTurns: 3,
    timeout: 600_000,
    cwd: options.cwd,
  });

  if (error) {
    return { profiles: null, error: `Claude invocation failed: ${error}` };
  }

  const { parsed, error: parseError } = parseJsonResponse(result);
  if (parseError) {
    return { profiles: null, error: parseError };
  }

  return { profiles: parsed, error: null };
}
