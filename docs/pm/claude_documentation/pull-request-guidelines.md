---
last_updated: 2026-02-19
category: guide
---

# GitHub Pull Request Style Guide

<!-- TOC -->
## Table of Contents
- [1. Overview](#1-overview)
- [2. PR Title Format](#2-pr-title-format)
- [3. PR Description Structure](#3-pr-description-structure)
  - [3.1 Summary Section](#31-summary-section)
  - [3.2 Why Section](#32-why-section)
  - [3.3 What Section](#33-what-section)
  - [3.4 How Section](#34-how-section)
  - [3.5 Testing Section](#35-testing-section)
  - [3.6 Impact Section](#36-impact-section)
- [4. PR Review Process](#4-pr-review-process)
- [5. Branch Management](#5-branch-management)
- [6. Merge Requirements](#6-merge-requirements)
- [7. Best Practices](#7-best-practices)
- [8. Examples](#8-examples)
<!-- /TOC -->

---

## 1. Overview

This guide defines the pull request conventions for the Consumer Product repo.

---

## 2. PR Title Format

PR titles should be concise and descriptive, following the pattern:

```
[Type] Brief description of the change
```

Examples:
- `[Feature] Add transaction duplicate detection`
- `[Fix] Correct budget calculation for credit cards`
- `[Refactor] Restructure authentication flow`
- `[Docs] Update API documentation`

---

## 3. PR Description Structure

### 3.1 Summary Section

Start with a 1-2 sentence summary at the top, no header needed:

> Implements structured JSON logging across the backend to enable real-time monitoring and debugging without SSH access. Replaces text-based logs with searchable, filterable JSON format integrated with Grafana dashboards.

Then use these sections as applicable:

### 3.2 Why Section

**Problems solved or goals achieved** (optional for simple PRs where the summary is sufficient)

Use regular bullets to list problems/goals with enough context to understand the pain point:

- Production debugging required SSH access and manual grep through 500MB text logs
- No way to correlate errors across services without timestamp matching
- Customer support couldn't see transaction processing errors in real-time

Avoid:
- Vague statements like "Logs were bad"
- Circular reasoning like "Added logging because we needed it"
- Just referencing tickets without context like "To implement JIRA-1234"

### 3.3 What Section

**How each change works - the meat of your PR**

Group related changes together using descriptive headers with emojis. Focus on implementation approach and technical decisions, not file names or line numbers. Each section should cover the approach, technical decisions, and testing status.

Examples:

### 📋 Screen 3 — ROI Screen Reframe
- Moved the 3–4× death benefit claim from Screen 2 body copy to its own full-width screen
- Screen's new job: make the ROI story feel real and personal, not just informational
- Copy in progress; visualization approach deferred to next review

### 💬 Cash Value Screens (8–9) — Scope Expansion
- Folded market-linked growth and loss protection concept into screens 8–9
- May require a third screen to carry the full story — flagged as open question
- Language avoids "returns" and "wealth during your life" per compliance rules

### 📝 IUL Primer Update
- Clarified that the 8.5% cap applies to cash value only, not the full death benefit
- Updated approved messaging examples to reflect 2/17 product review decisions

Writing good bullets:
- ✅ "Implemented caching using Redis with LRU eviction and 5-minute TTL for merchant lookups"
- ❌ "Added caching" (too vague)
- ❌ "Modified cache.py on lines 45-89" (too specific about code location)

### 3.4 How Section

**Steps for reviewers**

Include this section when there are non-obvious steps to review the changes:
- Prototype requires specific setup to view correctly
- Review requires reading a companion doc first
- Compliance-sensitive copy that needs cross-referencing

Write instructions as numbered steps.

### For prototype reviews:
```markdown
1. Open the prototype file directly in a browser (no server needed)
2. Resize to 320px and 480px — verify layout holds at both widths
3. Compare against Latest_Designs/ screenshots for intended screen state
```

### For copy or PRD reviews:
```markdown
1. Read the latest ideation doc alongside this PR's changes
2. Check compliance-sensitive language against @docs/about_iul/CLAUDE.md
```

Skip this section for simple doc updates or config-only changes.

### 3.5 Testing Section

**Key choices and trade-offs** (optional - only for significant decisions)

Document non-obvious decisions that reviewers need context to evaluate.

Include when you:
- Chose one approach over an obvious alternative
- Made a structural or framing trade-off
- Departed from an established pattern

### Examples:

#### Screen Structure Decision
- **Choice**: Combined growth + protection on one screen vs two separate screens
- **Reason**: Two light screens maintain flow momentum better than one dense screen
- **Trade-off**: Adds a screen to the funnel but reduces cognitive load per screen

#### Copy Framing Choice
- **Choice**: Lead with ROI ratio ("3–4×") vs lead with protection story
- **Reason**: ROI framing creates more immediate emotional connection
- **Trade-off**: Must be carefully caveated ("could receive") to stay compliant

Skip this section when the approach is standard or obvious from context.

### 3.6 Impact Section

Include these optional sections only when relevant:

### ⚠️ Breaking Changes
- Structural reorganization that changes where files live
- Renamed conventions that other docs reference
- Decisions that supersede previously documented guidance

### ⚙️ Configuration Required
- CLAUDE.md updates needed in other directories
- New conventions reviewers should be aware of

### 📉 Known Limitations
- Trade-offs made for now
- Follow-up work deferred
- Open questions not yet resolved

---

## 4. PR Review Process

### 4.1 Writing Philosophy

#### Find the Middle Ground
Describe the implementation approach, not the code details:
- ✅ "Implemented duplicate detection using sliding window algorithm with 5-minute threshold"
- ❌ "Added duplicate_check() function" (too vague)
- ❌ "Modified lines 45-67 in transaction_handler.py" (too specific)

#### Focus on Impact
Explain what changed and who benefits:
- ✅ "Replaced text logs with JSON format, enabling Grafana dashboards for ops team"
- ❌ "Updated logging configuration"

#### Group Logically
Organize by feature/component, not by file:
- ✅ "🔐 Authentication: Added OAuth2 with Google/GitHub, session management via Redis"
- ❌ "Modified: auth.py, oauth.py, routes.py, session.py"

#### Be Concise but Complete
No unnecessary words, but include all necessary context:
- ✅ "Added rate limiting: 100 req/min per user, 429 status with retry-after header"
- ❌ "Added some rate limiting to help with load"
- ❌ "Implemented a comprehensive rate limiting system using Redis counters with configurable thresholds per endpoint..."

---

## 5. Branch Management

### 5.1 PR Update Strategy

When updating an existing PR:

#### Create One Cohesive Description
- **Never append** "Updates" or "Latest Changes" sections
- **Regenerate** the entire description as a unified narrative
- **Integrate** new changes seamlessly into existing sections

#### Maintain Accuracy
- Update all metrics (file counts, issue references)
- Refresh performance numbers
- Ensure all sections reflect current state

#### Preserve Context
- Keep the review history marker: `<!-- Last reviewed commit: SHA -->`
- Maintain references to discussions and decisions
- Update the marker with the latest commit SHA


### 5.2 Automated PR Creation
When using `gh pr create`, include:
```bash
gh pr create \
  --title "[Type] Brief description" \
  --body "$(cat <<'EOF'
[Full PR description following this guide]
EOF
)"
```

### 5.3 Review Comments
Address review feedback by:
1. Responding to specific comments
2. Updating the PR description if scope changes
3. Adding commits with clear messages

---

## 6. Merge Requirements

### 6.1 Review Readiness Checklist

### 1. Keep PRs Focused
- One feature or fix per PR
- Break large changes into sequential PRs
- Use feature flags for incremental rollout

### 2. Provide Context
- Link to related issues and discussions
- Include screenshots for UI changes
- Add performance metrics for optimizations

### 3. Make Reviews Easier
- Highlight areas needing special attention
- Explain non-obvious implementation choices
- Provide testing instructions

### 4. Update Throughout Lifecycle
- Keep description current with changes
- Document decisions from review discussions
- Update status and readiness

---

## 7. Best Practices

### 7.1 Special Sections

### For Bug Fixes
Include:
- **Root Cause**: What caused the bug
- **Solution**: How it was fixed
- **Testing**: How to verify the fix
- **Regression Prevention**: Tests or checks added

### For Features
Include:
- **User Story**: Who benefits and how
- **Design Decisions**: Key choices and trade-offs
- **Future Work**: What's out of scope but planned

### For Refactoring
Include:
- **Motivation**: Why refactor now
- **Approach**: Refactoring strategy
- **Verification**: How to ensure no behavior change
- **Benefits**: Measurable improvements

### 7.2 Review Checklist

Before marking PR ready for review:

- [ ] **Title** clearly describes the change
- [ ] **Description** follows this guide's structure
- [ ] **Tests** are passing
- [ ] **Documentation** is updated
- [ ] **Commits** follow commit message conventions
- [ ] **Conflicts** are resolved
- [ ] **Self-review** completed
- [ ] **Screenshots/recordings** added for UI changes

### 7.3 Common Anti-Patterns

#### ❌ Vague Descriptions
"Fixed some bugs and added features"

#### ❌ Implementation Focus
"Updated lines 12-34 in ideation_2.md"

#### ❌ Missing Context
No explanation of why changes were needed

#### ❌ Update Fragmentation
Multiple "Update" sections instead of cohesive description

#### ❌ Oversized PRs
Hundreds of files changed across multiple features

---

## 8. Examples

### 8.1 Tools Available

### PR Management
- **GitHub CLI (`gh`)**: Use for creating and updating PRs
- **Claude Code commands**: `/generate-pr-description` for PR description generation

## Quick Reference

### Core Structure
1. **Summary** (1-2 sentences, no header) - What changed at highest level
2. **Why** (optional for simple PRs) - Problems solved, goals achieved
3. **Implementation** - How changes work, grouped by feature with emojis
4. **How to Use** - Action items for developers pulling the branch
5. **Technical Decisions** (optional) - Non-obvious choices and trade-offs

### Optional Sections (use when relevant)
- 🔒 Security Changes
- ⚠️ Breaking Changes
- ⚙️ Configuration Required
- 📉 Known Limitations
- 🔄 Rollback Plan
- 📊 Performance Impact
- 🗃️ Database Migrations

### Remember
- Don't repeat information across sections
- Focus on the middle ground between abstract and line-level detail
- Each change should appear only once
- Include testing approach within Implementation sections
- Keep it concise but complete
