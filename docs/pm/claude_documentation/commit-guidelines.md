---
last_updated: 2026-02-19
category: guide
---

# GitHub Commit Message Style Guide

<!-- TOC -->
## Table of Contents
- [1. Commit Message Format](#1-commit-message-format)
- [2. Message Components](#2-message-components)
  - [2.1 Type (Required)](#21-type-required)
  - [2.2 Scope (Optional)](#22-scope-optional)
  - [2.3 Subject (Required)](#23-subject-required)
  - [2.4 Body (Optional but Recommended)](#24-body-optional-but-recommended)
  - [2.5 Footer (Optional)](#25-footer-optional)
- [3. Examples](#3-examples)
- [4. Commit Grouping](#4-commit-grouping)
- [5. Best Practices](#5-best-practices)
- [6. Issue Linking](#6-issue-linking)
- [7. Quick Reference](#7-quick-reference)
<!-- /TOC -->

---

This guide defines the commit message conventions for the Consumer Product repo.

**Purpose**: Single source of truth for commit message format. For how to create commits, use the `/commit-to-github` command.

---

## 1. Commit Message Format

All commit messages follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

---

## 2. Message Components

### 2.1 Type (Required)

- **feat**: New file, screen, prototype, or capability added
- **fix**: Correcting a mistake in a document or prototype
- **docs**: Updates to reference docs, guidelines, or knowledge base
- **refactor**: Reorganizing or restructuring without changing content
- **chore**: Config files, CLAUDE.md updates, tooling, or maintenance
- **revert**: Reverts a previous commit

### 2.2 Scope (Optional)

- **prototypes**: HTML prototype or component files in ethos-prototypes/
- **projects**: Work in docs/iul_projects/ — use project name for precision: `projects/onboarding`
- **knowledge-base**: Updates to docs/about_iul/
- **docs**: Documentation standards or guidelines
- **config**: CLAUDE.md files, package.json, settings

### 2.3 Subject (Required)

- Use imperative mood ("add" not "adds" or "added")
- Don't capitalize the first letter
- No period at the end
- **Maximum 72 characters**

### 2.4 Body (Optional but Recommended)

**Standard format:**
```
What: [Summary of what this enables]

Why: [Summary of why needed]
```

**Simple format (for small changes):**
```
What: [Single line explaining what changed]
```

- Focus on WHAT and WHY, not implementation details
- Keep concise — small commits can have small messages

### 2.5 Footer (Optional)

- Linear issue references: `Closes ATHENA-123`, `Fixes ATHENA-123`, `Related to ATHENA-123`
- Claude Code signature: `🤖 Generated with [Claude Code](https://claude.com/claude-code)`

---

## 3. Examples

### New Prototype

```
feat(prototypes): add iul-goals screen prototype

What: HTML prototype for the goals selection step in IUL onboarding.

Why: Needed a shareable design for product review.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### PRD Update

```
docs(projects/onboarding): update PRD v2 with screen 3 copy decisions

What: Added ROI screen copy options; locked cash value screen scope.

Why: Incorporates decisions from 2/18 product review.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Meeting Notes

```
docs(meetings): add 2026-02-19 IUL onboarding review notes

What: Captured decisions on Screen 3 framing and Screens 8-9 scope.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Knowledge Base Update

```
docs(knowledge-base): clarify cash value cap applies to cash value only

What: Updated IUL primer — 8.5% cap is cash value only, not full death benefit.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

### Config / CLAUDE.md

```
chore(config): add CLAUDE.md for iul_knowledge_base directory

What: File map and compliance guardrails for IUL reference docs.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## 4. Commit Grouping

**Atomic commits (default):** One logical change per commit.
- Each commit is independently meaningful and reversible
- Group files that implement one complete change together

**Single commit (when changes are inseparable):**
- Multiple tightly related files that don't make sense apart
- Example: A new prototype and the ideation doc that defines its content

**Common patterns:**

```
# Starting a new project
1. chore(projects): scaffold Checkout_Redesign project folder and CLAUDE.md
2. docs(projects/checkout): add PRD v1
3. docs(projects/checkout): add ideation_1 with initial copy concepts

# Iterating on a prototype
1. feat(prototypes): add base iul-goals screen structure
2. feat(prototypes): add conditional children question to iul-goals
```

---

## 5. Best Practices

- **Write for future readers** — explain why, not just what
- **Be specific** — "update IUL primer with cash value floor clarification" not "update doc"
- **Keep focused** — one logical change per commit
- **Use present tense** — "add" not "added"

---

## 6. Issue Linking

Reference Linear issues in commit footers:

- `Closes ATHENA-123` — closes issue when PR merges
- `Fixes ATHENA-123` — same as Closes
- `Related to ATHENA-123` — links without closing

---

## 7. Quick Reference

| Type | When to Use | Example Subject |
|------|------------|-----------------|
| feat | New prototype, screen, or project file | `add iul-goals prototype screen` |
| fix | Correcting content or broken prototype | `fix death benefit cap wording in IUL primer` |
| docs | Documentation or guideline updates | `update markdown-guidelines for PM repo` |
| refactor | Reorganizing without changing content | `move Demo project into projects/ subdirectory` |
| chore | Config, CLAUDE.md files, tooling | `add CLAUDE.md for Onboarding_Project` |
| revert | Reverting a previous commit | `revert ideation_2 screen 3 copy changes` |
