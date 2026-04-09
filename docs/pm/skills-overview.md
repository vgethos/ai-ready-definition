---
last_updated: 2026-03-09
last_exported: 2026-03-09
category: reference
---

# Skills Overview

<!-- TOC -->
## Table of Contents
- [1. PRD Pipeline](#1-prd-pipeline)
  - [1.1 /prd-gather-context](#11-prd-gather-context)
  - [1.2 /prd-generate](#12-prd-generate)
  - [1.3 /prd-review](#13-prd-review)
  - [1.4 /md-to-docx](#14-md-to-docx)
- [2. Prototype Pipeline](#2-prototype-pipeline)
  - [2.1 /create-prototype](#21-create-prototype)
  - [2.2 /frontend-design](#22-frontend-design)
- [3. Browser Tools](#3-browser-tools)
  - [3.1 /agent-browser](#31-agent-browser)
  - [3.2 /chrome-devtools](#32-chrome-devtools)
- [4. Design Integration](#4-design-integration)
  - [4.1 /figma-access](#41-figma-access)
- [5. Project Management](#5-project-management)
  - [5.1 /jira-access](#51-jira-access)
- [6. Document Workflows](#6-document-workflows)
  - [6.1 /gws-workspace](#61-gws-workspace)
  - [6.2 /md-to-gdoc](#62-md-to-gdoc)
- [7. Second Opinions](#7-second-opinions)
- [8. Skill Quick Reference](#8-skill-quick-reference)
<!-- /TOC -->

---

## 1. PRD Pipeline

Four skills that take a raw hypothesis to a shareable, reviewed, exported document.

### 1.1 /prd-gather-context

**What it does:** A structured 7-phase thinking session that moves from a vague problem to a ranked list of hypotheses with mechanisms, constraints, and success metrics. Output is a `context_[name].md` file that feeds directly into `/prd-generate`.

**Input:** A problem statement or idea — even a rough one.

**Output:** `context_[name].md` with problem statement, ranked hypotheses (1–10 conviction scores), constraints, and success metrics.

**Key behaviors:**
- Pushes back on vague framing ("what do you mean by low-intent?")
- Proposes 2–3 treatments per user hesitation — doesn't prescribe
- References precedent without copying it
- Doesn't move to Phase 2 until Phase 1 is solid

**Invoke when:** Starting any new test, feature, or optimization. Use before `/prd-generate` unless you already have a clear context doc.

---

### 1.2 /prd-generate

**What it does:** Converts a context doc into a complete, hypothesis-driven PRD. Collaboratively defines test dimension and variants before writing anything — preventing cosmetically different variants that test the same thing.

**Input:** A context doc from `/prd-gather-context` (or your own brief with problem, hypotheses, constraints, and metrics).

**Output:** `prd_[name].md` with 8 sections: Objective, Principles, Context, Design Pattern, Test Variants, Success Metrics, Constraints, Next Steps.

**Key behaviors:**
- Requires behavior-prediction hypotheses ("users delay because X; this treatment makes inaction feel costly") — not feature descriptions
- Validates variant isolation before writing (are variants actually testing different things?)
- Enforces IUL compliance rules if it's an IUL project
- Applies a pre-save quality checklist before writing the file

**Invoke when:** You have a context doc and are ready to scaffold a PRD.

---

### 1.3 /prd-review

**What it does:** Audits a PRD across six quality dimensions and produces a structured report with ratings, specific quoted issues, and suggested rewrites. Never gives generic feedback — always quotes the actual text and shows what improved looks like.

**Input:** A PRD file or pasted PRD content.

**Output:** Audit report with per-dimension ratings (Strong / Good / Needs Work), Must Fix / Should Fix / Nice to Have issues, and a Launch Readiness Checklist.

**Six dimensions:**
1. Structural Quality — problem specificity, principles, hypothesis mechanics
2. Copy Quality — word precision, character limits, pronoun consistency
3. Hypothesis Strength — testability, behavioral predictions, conviction levels
4. Gap Analysis — unexplored hesitations, overlapping tests, metric gaps
5. Precedent Context — past test references, learning applied vs. copied
6. Logical Consistency — narrative flow, contradictions, role clarity

**Invoke when:** After generating a PRD, before sharing with stakeholders, or when you want a second opinion on hypothesis strength.

---

### 1.4 /md-to-docx

**What it does:** Converts a markdown file to a formatted DOCX using pandoc with the correct flags for Ethos styling. Auto-updates `last_exported` in frontmatter so you always know if your export is stale.

**Input:** File path to any `.md` file (typically a `prd_[name].md`).

**Output:** `.docx` at the same path, styled with Arial 11 body text. Updates `last_exported` in the MD frontmatter.

**Invoke when:** Ready to share a PRD with stakeholders or upload to Drive.

---

## 2. Prototype Pipeline

### 2.1 /create-prototype

**What it does:** An interactive brief-gathering session that collects context (funnel stage, hypothesis, variant count), reads a PRD if provided, flags gaps without blocking, and produces a structured brief. Hands off directly to `/frontend-design`.

**Input:** A concept, screen name, or PRD link.

**Output:** A structured prototype brief specifying file names, routes, EDS component pattern, variant structure, and interaction notes — then triggers `/frontend-design`.

**Key behaviors:**
- Reads a PRD fully before asking questions — doesn't re-ask what the PRD answers
- Determines EDS pattern automatically from funnel stage (LP vs. onboarding vs. BOF)
- Sets up file structure for single prototypes or multi-variant grouped experiments
- Flags unclear items in Open Questions without blocking progress

**Invoke when:** Starting any new prototype. Handles both single screens and multi-variant A/B experiments.

---

### 2.2 /frontend-design

**What it does:** Generates production-grade React + EDS v2 prototype code from a brief. Enforces EDS component usage and Ethos design tokens — no generic AI output.

**Input:** A structured brief (from `/create-prototype`) or a fully described concept.

**Output:** React `.tsx` component file using `PhoneFrame`, EDS v2 components from `src/eds.tsx`, and verified Ethos type/color tokens.

**Key behaviors:**
- Requires `<Button>` from EDS — never raw `<button>`
- Requires font tokens from `src/styles.ts` — never inline font strings or hardcoded hex
- Selects LP vs. app/BOF pattern automatically from funnel stage
- Applies Design Thinking framework before coding (purpose, differentiation, quality bar)
- Adds variant switcher and click feedback panel for stakeholder demos

**Invoke when:** You have a complete brief and want code generated. Use `/create-prototype` first if the brief isn't ready.

---

## 3. Browser Tools

Two tools for different browser workflows. See @CLAUDE.md for the decision rule.

### 3.1 /agent-browser

**What it does:** Headless browser automation CLI for multi-step workflows, web scraping, and prototype testing. Launches a fresh Chromium session — no existing tab needed.

**Input:** A URL, a task description, or a sequence of interactions to automate.

**Output:** Screenshots, extracted content, form submission results, or test pass/fail results.

**Key behaviors:**
- Navigates to new URLs headlessly — doesn't require Chrome to be open
- Handles auth flows, multi-page sequences, and state persistence across steps
- More token-efficient than DevTools for automation tasks
- Supports responsive testing at arbitrary viewport sizes

**Invoke when:** Automating workflows, scraping data, testing full user flows, or navigating to a URL that isn't already open in Chrome.

---

### 3.2 /chrome-devtools

**What it does:** Reads, inspects, and interacts with live tabs already open in Chrome via the Chrome DevTools MCP. 29 tools across navigation, input, emulation, debugging, network, and performance.

**Input:** A tab already open in Chrome (identified via `list_pages`).

**Output:** Screenshots, DOM snapshots, console messages, network requests, Lighthouse audits, or JavaScript evaluation results.

**Key behaviors:**
- Works on existing Chrome tabs — no new browser launched
- Always: `list_pages` → `select_page` → act (tab ID required before every action)
- `evaluate_script` is the escape hatch — anything in the DevTools console works here
- Requires the Chrome DevTools MCP extension to be running

**Invoke when:** A page is already open in Chrome and you need to inspect it, screenshot it, check console errors, audit performance, or run JavaScript against it.

---

## 4. Design Integration

### 4.1 /figma-access

**What it does:** Reads Figma designs, takes screenshots, extracts design tokens, generates code from mockups, and maps Figma components to code components (Code Connect).

**Input:** A Figma URL, a file key + node ID, or a request to see what's currently open in Figma Desktop.

**Output:** Screenshots, design context, generated React/HTML code, extracted token values, or Code Connect mappings.

**Key behaviors:**
- Figma Desktop integration: works without a URL if a file is open and selected
- URL-based access: parses fileKey and nodeId from Figma URLs automatically
- Generates code adapted to the project's EDS token system — not generic output
- Flags when a file is too large to fetch in full and requests specific nodes instead

**Invoke when:** Implementing a design from Figma, checking what's open, extracting tokens, or mapping components.

---

## 5. Project Management

### 5.1 /jira-access

**What it does:** Full read/write access to the CQ Jira project. Creates, reads, updates, and transitions tickets. Auto-populates mandatory fields (Product Area = IUL, Quarter from current date) on every ticket created for Juan.

**Input:** Natural language — "find ticket CQ-1397", "create an experiment for X", "add the Optimizely link to CQ-1500".

**Output:** Ticket details, search results, created/updated tickets.

**Key behaviors:**
- Auto-populates: Product Area (IUL), Quarter (from current date), PM (Juan), Assignee (Juan)
- Supports JQL for advanced search (`project = CQ AND status = "In Experiment"`)
- Creates Experiment, Task, Bug, Story, and Operational Task issue types
- Handles multi-line descriptions correctly (template literals, not escaped `\n`)
- Links Figma, Optimizely, Mode, and Full Stories URLs to tickets

**Invoke when:** Creating or updating a Jira ticket, searching for duplicates, or checking experiment status.

---

## 6. Document Workflows

### 6.1 /gws-workspace

**What it does:** Read and write Google Docs, Sheets, Slides, and Drive files using the `gws` CLI. Covers the full Google Workspace API surface.

**Input:** A Google doc/sheet/slide URL or file ID, plus the operation to perform.

**Output:** Document content, sheet data, updated files, or uploaded Drive assets.

**Supports:**
- Docs: read, append, batch update
- Sheets: read ranges, append rows, update cells, batch get
- Slides: read, create, batch update
- Drive: search, upload, export as PDF

**Invoke when:** Reading or writing any Google Workspace file — docs, trackers, presentations, Drive.

---

### 6.2 /md-to-gdoc

**What it does:** Converts a local Markdown file into a fully formatted Google Doc tab. Handles headings, bold, italic, tables, and bullets with proper Google Doc paragraph spacing. Clears and rewrites the tab on each run (idempotent).

**Input:** A markdown file path + a Google Doc URL (with tab ID).

**Output:** A formatted Google Doc tab matching the markdown source.

**Invoke when:** Exporting a context doc, PRD, or notes file to a Google Doc tab for sharing.

---

## 7. Second Opinions

Two AI agents available for independent analysis, critique, or parallel prototype builds.

**gemini-agent** — 1M token context window. Best for reading many files at once, cross-project consistency checks, and large-scale audits.

**codex-agent** — Runs code, executes scripts, tests prototypes at specific viewport sizes.

**Example uses:**
- "Have the gemini-agent review all Mar 2026 PRDs and tell me if the hypotheses are consistent"
- "Have the codex-agent build a competing version of this prototype"
- "Have both agents draft competing variants of this hero copy"

Both agents are invoked by natural language — no special commands needed.

---

## 8. Skill Quick Reference

| Skill | Input | Output | When to use |
|---|---|---|---|
| `/prd-gather-context` | Rough problem or idea | `context_[name].md` | Starting a new test |
| `/prd-generate` | Context doc | `prd_[name].md` | Ready to scaffold a PRD |
| `/prd-review` | PRD file | Audit report | Before sharing with stakeholders |
| `/md-to-docx` | Markdown file path | `.docx` | Ready to share externally |
| `/create-prototype` | Concept or PRD | Prototype brief + triggers `/frontend-design` | Starting any prototype |
| `/frontend-design` | Complete brief | React `.tsx` component (EDS components, Ethos tokens) | Brief already ready |
| `/agent-browser` | URL or task description | Screenshots, content, test results | Automation, scraping, new URLs |
| `/chrome-devtools` | Open Chrome tab | Screenshots, DOM, console, network, audits | Inspecting live tabs |
| `/figma-access` | Figma URL or open file | Screenshots, code, tokens | Implementing a design |
| `/jira-access` | Natural language | Ticket read/write | Jira operations |
| `/gws-workspace` | Doc/sheet URL + operation | File content or update | Google Workspace read/write |
| `/md-to-gdoc` | Markdown file + Doc URL | Formatted Google Doc tab | Exporting MD to a Doc |
| `gemini-agent` | Any task | Analysis, review, or code | Second opinion, large-context reads |
| `codex-agent` | Any task | Analysis, review, or code | Second opinion, running code |
