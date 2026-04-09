# Research Profiles

A tool for analyzing user research transcripts through configurable demographic lenses, generating evidence-based profiles, and evaluating the Ethos life insurance funnel from each profile's perspective.

## Project Goal

Enable researchers, PMs, designers, and execs to:
1. Select a demographic lens (e.g., "55+ year olds")
2. Have Claude parse interview transcripts and participant data to generate grounded profiles
3. Review and refine those profiles in a guided step-by-step flow
4. Walk each profile through the Ethos funnel screen-by-screen
5. Produce a report identifying friction points, gaps, and opportunities — with every finding tagged by evidence level

## Key Principles

- **Evidence grounding is non-negotiable.** Profiles must be conservative and rooted in what participants actually said. No speculation, no embellishment. Every claim in a profile should trace back to transcript content or participant metadata.
- **Evidence tagging on all findings.** When profiles walk through the funnel, every flagged issue must be categorized:
  - `quote-based` — directly supported by something a participant said in an interview
  - `inferred` — a reasonable inference drawn from participant demographics, context, or patterns across multiple transcripts, but not directly stated
- **Include direct quotes.** Profiles and funnel reports should surface actual participant quotes as supporting evidence wherever possible.
- **Not "personas."** The researcher prefers "profiles" — use that term consistently. These are grounded composites, not fictional archetypes.

## Architecture

### Phase 1: CLI Tool (current)
- Standalone Node.js script(s) calling the Claude API
- Terminal-based guided workflow: select lens -> generate profiles -> review -> funnel walkthrough -> report
- Local only (runs in this directory)

### Phase 2: Web UI (future)
- Will move into `sandbox-demos/` as a route
- Web interface with agentic backend
- Researchers configure the lens, review profiles interactively, explore reports

## Data

### Participant Metadata
- `foundational-55-interviews-participants.csv` — 10 participants, exported from UserInterviews.com
- Rich demographic and screener data: age, income, occupation, insurance status, research behavior, etc.

### Interview Transcripts
- `transcripts/*.txt` — 10 transcript files (~500-900 lines each)
- Format: speaker name + timestamp, then utterance. Interviewer is Nicole Bonoff.
- Named by participant first name + last initial (e.g., `jayw.txt` = Jay Webber)

### Funnel Definition
- `../../docs/funnel-output/screen-*.md` — 29 screens documented (screen-01 through screen-29)
- Each screen describes what the user sees and what they can do
- **Incomplete:** ends at identity verification (screen 29). Missing: payment, final confirmation, post-purchase. Use what exists for the proof of concept.
- Referenced screenshots in `../../docs/screenshots/`

## Workflow Details

### Step 1: Transcript Analysis
- Parse all transcripts + CSV metadata for the selected lens
- For 55+ lens: all 10 current participants qualify
- Extract themes, concerns, motivations, pain points, knowledge gaps, decision-making patterns
- Everything extracted must be attributable to specific participants/quotes

### Step 2: Profile Generation
- Generate 2-3 profiles that represent distinct behavioral/attitudinal clusters within the lens
- Each profile should include:
  - Demographic summary (grounded in CSV data)
  - Key motivations and concerns (with supporting quotes)
  - Insurance knowledge level and research approach
  - Decision-making style
  - Technology comfort level
  - Which real participants this profile most closely represents
- Profiles are composites but every attribute must be traceable to real data

### Step 3: Profile Review
- Present profiles to the user for review
- Allow adjustments before proceeding to funnel walkthrough

### Step 4: Funnel Walkthrough
- For each profile, walk through every available funnel screen
- At each screen, identify:
  - What works well for this profile
  - What creates friction or confusion
  - What's missing or could be improved
  - Specific language/UX issues
- Tag each finding as `quote-based` or `inferred`

### Step 5: Report Generation
- Consolidated report across all profiles
- Organized by funnel screen with cross-profile patterns
- Individual profile perspective sections
- Priority-ranked findings
- All supporting evidence (quotes + inference reasoning) included

## Tech Stack

- Node.js
- Anthropic Claude API (`@anthropic-ai/sdk`)
- Phase 2: Next.js (to match sandbox-demos stack)

## Current Lens

- **55+ year olds** — the only lens for Phase 1. The infrastructure should be built to support additional lenses later (stay-at-home parents, first-time buyers, etc.) but don't over-engineer for that now.

## File Organization

```
research-profiles/
  CLAUDE.md
  foundational-55-interviews-participants.csv
  transcripts/           # Interview transcript .txt files
  src/                   # Phase 1 CLI tool source
  output/                # Generated profiles and reports
```
