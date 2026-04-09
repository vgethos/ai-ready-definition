import { invokeClaude } from './claude.js';

/**
 * Strip markdown code fences from a string and parse as JSON.
 * Claude often wraps JSON responses in ```json ... ``` blocks.
 */
function parseJsonResponse(text) {
  if (!text) return null;

  let jsonStr = text.trim();

  // Strip markdown code fences if present (greedy match to handle large JSON)
  const fenceMatch = jsonStr.match(/```(?:json)?\s*\n([\s\S]+)\n\s*```/);
  if (fenceMatch) {
    jsonStr = fenceMatch[1].trim();
  } else if (jsonStr.startsWith('```')) {
    // Fallback: strip opening/closing fences line by line
    const lines = jsonStr.split('\n');
    if (lines[0].startsWith('```')) lines.shift();
    if (lines[lines.length - 1].trim() === '```') lines.pop();
    jsonStr = lines.join('\n').trim();
  }

  return JSON.parse(jsonStr);
}

/**
 * Build the individual transcript analysis prompt for a single participant.
 */
function buildAnalysisPrompt(participant, transcriptPath) {
  const metadata = [
    `Name: ${participant.firstName} ${participant.lastName}`,
    `Age: ${participant.age}`,
    `Gender: ${participant.gender}`,
    `Occupation: ${participant.occupation}`,
    `Household Income: ${participant.income}`,
    `Marital Status: ${participant.maritalStatus}`,
    `Living With: ${participant.livingWith}`,
    `Education: ${participant.education}`,
    `Neighborhood: ${participant.neighborhoodType}`,
    `Region: ${participant.region}`,
    `Has Life Insurance: ${participant.hasLifeInsurance}`,
    `Coverage Amount: ${participant.coverageAmount}`,
    `Policies Considering: ${participant.policiesConsidering}`,
    `Research Approach: ${participant.researchApproach}`,
    `Providers Heard Of: ${participant.providersHeardOf}`,
  ].join('\n');

  return `You are a user research analyst. Analyze an interview transcript for a life insurance study.

## Participant Metadata
${metadata}

## Instructions

1. Read the transcript file at: ${transcriptPath}
2. Analyze the full transcript and extract findings in the categories below.
3. Every finding MUST include direct quotes from the transcript as evidence. Include the speaker and approximate timestamp with each quote.
4. Be conservative — only include findings that are clearly supported by what the participant actually said. Do not speculate or embellish.

## Required Output

Return ONLY valid JSON (no other text) with this exact structure:

{
  "participantId": "${participant.id}",
  "participantName": "${participant.firstName} ${participant.lastName}",
  "themes": [{ "theme": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "concerns": [{ "concern": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "motivations": [{ "motivation": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "painPoints": [{ "painPoint": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "knowledgeGaps": [{ "gap": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "decisionMakingPatterns": [{ "pattern": "string", "evidence": [{ "quote": "string", "context": "string" }] }],
  "technologyComfort": { "level": "string", "evidence": [{ "quote": "string", "context": "string" }] },
  "insuranceResearchApproach": { "approach": "string", "evidence": [{ "quote": "string", "context": "string" }] }
}

Where:
- "theme" / "concern" / etc. = a concise label for the finding
- "quote" = the participant's exact words from the transcript (include speaker name and timestamp)
- "context" = brief explanation of why this quote supports the finding

Return ONLY the JSON object. No markdown formatting, no explanation, no preamble.`;
}

/**
 * Condense an individual analysis for the synthesis step.
 * Keeps findings and one key quote per finding, drops verbose evidence arrays.
 */
function condenseAnalysis(analysis) {
  const pickOne = (evidence) => {
    if (!evidence || evidence.length === 0) return [];
    return [{ quote: evidence[0].quote, context: evidence[0].context }];
  };

  return {
    participantId: analysis.participantId,
    participantName: analysis.participantName,
    themes: (analysis.themes || []).map((t) => ({ theme: t.theme, evidence: pickOne(t.evidence) })),
    concerns: (analysis.concerns || []).map((c) => ({ concern: c.concern, evidence: pickOne(c.evidence) })),
    motivations: (analysis.motivations || []).map((m) => ({ motivation: m.motivation, evidence: pickOne(m.evidence) })),
    painPoints: (analysis.painPoints || []).map((p) => ({ painPoint: p.painPoint, evidence: pickOne(p.evidence) })),
    knowledgeGaps: (analysis.knowledgeGaps || []).map((g) => ({ gap: g.gap, evidence: pickOne(g.evidence) })),
    decisionMakingPatterns: (analysis.decisionMakingPatterns || []).map((d) => ({ pattern: d.pattern, evidence: pickOne(d.evidence) })),
    technologyComfort: analysis.technologyComfort ? { level: analysis.technologyComfort.level, evidence: pickOne(analysis.technologyComfort.evidence) } : null,
    insuranceResearchApproach: analysis.insuranceResearchApproach ? { approach: analysis.insuranceResearchApproach.approach, evidence: pickOne(analysis.insuranceResearchApproach.evidence) } : null,
  };
}

/**
 * Build the synthesis prompt that combines all individual analyses.
 * Uses condensed versions to stay within context limits.
 */
function buildSynthesisPrompt(individualAnalyses) {
  const condensed = individualAnalyses.map(condenseAnalysis);
  const analysesJson = JSON.stringify(condensed, null, 2);

  return `You are a user research analyst performing cross-participant synthesis for a life insurance study of adults aged 55+.

## Individual Analyses

Below are the individual transcript analyses for all participants:

${analysesJson}

## Instructions

1. Identify themes and patterns that appear across multiple participants.
2. Group participants into behavioral/attitudinal clusters — people who share similar approaches, concerns, or decision-making styles.
3. For each insight, indicate the evidence level:
   - "quote-based" — directly supported by participant quotes
   - "inferred" — a reasonable inference from patterns across participants
4. Be conservative. Only surface patterns that have real evidence across multiple participants.

## Required Output

Return ONLY valid JSON (no other text) with this exact structure:

{
  "crossCuttingThemes": [
    {
      "theme": "string",
      "participants": ["participant-id-1", "participant-id-2"],
      "evidence": [{ "quote": "string", "context": "string", "participantId": "string" }]
    }
  ],
  "clusters": [
    {
      "clusterId": "string",
      "label": "string",
      "description": "string",
      "participantIds": ["participant-id-1", "participant-id-2"],
      "sharedTraits": ["string"],
      "distinguishingTraits": ["string"]
    }
  ],
  "keyInsights": [
    {
      "insight": "string",
      "supportingParticipants": ["participant-id-1"],
      "evidenceLevel": "quote-based"
    }
  ]
}

Return ONLY the JSON object. No markdown formatting, no explanation, no preamble.`;
}

/**
 * Analyze a single participant's transcript.
 *
 * @param {Object} participant - Participant object from loadParticipants()
 * @param {string} transcriptPath - Absolute path to the transcript .txt file
 * @param {Object} [options]
 * @param {string} [options.cwd] - Working directory for Claude invocations
 * @returns {Promise<Object>} The analysis JSON for this participant
 */
export async function analyzeTranscript(participant, transcriptPath, options = {}) {
  const { cwd } = options;

  const prompt = buildAnalysisPrompt(participant, transcriptPath);

  const { result, error } = await invokeClaude(prompt, {
    allowedTools: ['Read'],
    maxTurns: 5,
    timeout: 300_000,
    ...(cwd ? { cwd } : {}),
  });

  if (error) {
    console.warn(`  Warning: Claude error for ${participant.firstName} ${participant.lastName}: ${error}`);
    return {
      participantId: participant.id,
      participantName: `${participant.firstName} ${participant.lastName}`,
      parseError: true,
      error,
      raw: null,
    };
  }

  try {
    const parsed = parseJsonResponse(result);
    return parsed;
  } catch (parseErr) {
    console.warn(`  Warning: Failed to parse JSON for ${participant.firstName} ${participant.lastName}: ${parseErr.message}`);
    return {
      participantId: participant.id,
      participantName: `${participant.firstName} ${participant.lastName}`,
      parseError: true,
      error: parseErr.message,
      raw: result,
    };
  }
}

/**
 * Analyze all participant transcripts and synthesize cross-participant patterns.
 *
 * @param {Array<Object>} participants - Array of participant objects from loadParticipants()
 * @param {string} transcriptsDir - Absolute path to the transcripts directory
 * @param {Object} [options]
 * @param {Function} [options.onProgress] - Callback: (current, total, participantName) => void
 * @param {string} [options.cwd] - Working directory for Claude invocations
 * @returns {Promise<{individualAnalyses: Array<Object>, synthesis: Object}>}
 */
export async function analyzeTranscripts(participants, transcriptsDir, options = {}) {
  const { onProgress, cwd } = options;

  // Filter to participants that have transcripts
  const withTranscripts = participants.filter((p) => p.transcriptFile);

  if (withTranscripts.length === 0) {
    console.log('No participants with transcript files found.');
    return { individualAnalyses: [], synthesis: null };
  }

  console.log(`\nAnalyzing ${withTranscripts.length} transcripts...\n`);

  // Phase 1: Individual analyses (sequential)
  const individualAnalyses = [];

  for (let i = 0; i < withTranscripts.length; i++) {
    const participant = withTranscripts[i];
    const transcriptPath = `${transcriptsDir}/${participant.transcriptFile}`;
    const name = `${participant.firstName} ${participant.lastName}`;

    console.log(`Analyzing transcript for ${name}... (${i + 1}/${withTranscripts.length})`);

    if (onProgress) {
      onProgress(i + 1, withTranscripts.length, name);
    }

    const analysis = await analyzeTranscript(participant, transcriptPath, { cwd });
    individualAnalyses.push(analysis);

    if (analysis.parseError) {
      console.log(`  Completed with parse error — raw response stored.`);
    } else {
      console.log(`  Done.`);
    }
  }

  // Phase 2: Synthesis across all participants
  const successfulAnalyses = individualAnalyses.filter((a) => !a.parseError);

  if (successfulAnalyses.length < 2) {
    console.log('\nNot enough successful analyses for synthesis (need at least 2).');
    return { individualAnalyses, synthesis: null };
  }

  console.log(`\nSynthesizing patterns across ${successfulAnalyses.length} analyses...\n`);

  const synthesisPrompt = buildSynthesisPrompt(successfulAnalyses);

  const { result: synthesisResult, error: synthesisError } = await invokeClaude(synthesisPrompt, {
    allowedTools: [],
    maxTurns: 3,
    timeout: 300_000,
    ...(cwd ? { cwd } : {}),
  });

  let synthesis = null;

  if (synthesisError) {
    console.warn(`Warning: Synthesis failed: ${synthesisError}`);
    synthesis = { parseError: true, error: synthesisError, raw: null };
  } else {
    try {
      synthesis = parseJsonResponse(synthesisResult);
      console.log('Synthesis complete.');
    } catch (parseErr) {
      console.warn(`Warning: Failed to parse synthesis JSON: ${parseErr.message}`);
      synthesis = { parseError: true, error: parseErr.message, raw: synthesisResult };
    }
  }

  return { individualAnalyses, synthesis };
}
