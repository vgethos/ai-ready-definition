---
last_updated: 2026-02-18
category: reference
---

# CLAUDE.md Format Style Guide

<!-- TOC -->
## Table of Contents
- [1. Critical Requirement](#1-critical-requirement)
- [2. Purpose of CLAUDE.md Files](#2-purpose-of-claudemd-files)
- [3. What Goes Where: CLAUDE.md vs Style Guides](#3-what-goes-where-claudemd-vs-style-guides)
  - [3.1 CLAUDE.md = Directory Operating Manual](#31-claudemd--directory-operating-manual)
  - [3.2 Style Guides = Universal Standards](#32-style-guides--universal-standards)
  - [3.3 Boundary Rule](#33-boundary-rule)
- [4. Content Guidelines](#4-content-guidelines)
  - [4.1 DO Include (Priority Order)](#41-do-include-priority-order)
  - [4.2 DON'T Include](#42-dont-include)
- [5. Quality Checklist](#5-quality-checklist)
- [6. When NOT to Create a CLAUDE.md](#6-when-not-to-create-a-claudemd)
- [7. Good CLAUDE.md Example](#7-good-claudemd-example)
- [8. Common Mistakes](#8-common-mistakes)
- [9. Maintenance & Freshness](#9-maintenance--freshness)
  - [9.1 Staleness Indicators](#91-staleness-indicators)
  - [9.2 Update Triggers](#92-update-triggers)
  - [9.3 Quick Update Process](#93-quick-update-process)
<!-- /TOC -->

This guide defines the standard format and content requirements for all CLAUDE.md files throughout the project.

---

## 1. Critical Requirement

**🚨 Every CLAUDE.md file MUST be 100-200 lines total. Shorter is better. Every line must provide critical value.**

---

## 2. Purpose of CLAUDE.md Files

CLAUDE.md files transform Claude Code from a generic assistant into a **specialized, project-aware developer** for each directory.

**Core Principle**: Maximum efficiency. Every word counts. Be ruthlessly concise.

---

## 3. What Goes Where: CLAUDE.md vs Style Guides

**Key Principle**: CLAUDE.md never defines standards - it documents how standards manifest locally

| CLAUDE.md (100-200 lines) | Style Guides (unlimited) |
|---------------------------|-------------------------|
| **Directory-specific CONTEXT** | **Project-wide STANDARDS** |
| Commands for THIS directory | Universal patterns |
| Local gotchas & quirks | Coding conventions |
| "Run `npm test:unit` here" | "All tests use Jest" |
| "iul-goals.html breaks at 320px" | "Test all prototypes at 320px" |
| Actual file examples | Abstract best practices |
| Local pattern implementations | Pattern definitions |

### 3.1 CLAUDE.md = Directory Operating Manual
- What commands to run HERE
- What breaks in THIS directory
- Which files are important HERE
- How universal standards apply HERE
- Local exceptions with reasons

### 3.2 Style Guides = Universal Standards
- Security requirements
- Code formatting rules
- Testing philosophies
- Architecture decisions
- Naming conventions

### 3.3 Boundary Rule
**Conflicts indicate wrong layering**. If content could appear in both:
- Universal standard → Style Guide
- Directory-specific → CLAUDE.md

---

## 4. Content Guidelines

### 4.1 DO Include (Priority Order)

✅ **Commands** (CRITICAL)
- `npm run dev` - Serve prototypes at localhost:3000
- `npm run new` - Scaffold a new prototype file

✅ **Gotchas** (CRITICAL)
- All CSS/JS must be inlined — no external files when sharing
- Test at 320px and 480px; layouts break at narrow widths
- TrinHand font requires `@font-face` if used outside Figma

✅ **Files Section** (ESSENTIAL)
```
prototypes/
├── iul-goals.html           # Goals selection screen
├── iul-refined-tabs.html    # Tabbed coverage view
└── eds-components-mobile.html  # Component reference
```
Note: Combine structure + key files in one "Files" section

✅ **Local Patterns** (ESSENTIAL)
- Duplicate nearest prototype as starting point, then modify
- Copy component markup from `components/` — never link externally
- Use tokens from CLAUDE.md; canonical values in GUIDELINES.md

✅ **Common Tasks** (VITAL)
```markdown
### Add a Prototype
1. Duplicate closest existing file from prototypes/
2. Update <title> and visible headings
3. Verify colors match CLAUDE.md token table
4. Test at 320px and 480px before sharing
```

### 4.2 DON'T Include

❌ **Universal standards** - These belong in style guides

❌ **Project-wide patterns** - Document in style guides, reference from CLAUDE.md

❌ **Long explanations** - Bullet points only

❌ **Duplicate content** - Reference style guides with `@path#section`

❌ **Other directories** - Stay laser-focused on THIS directory

❌ **Historical context** - Current state only

❌ **Anything non-critical** - If it's nice-to-know, delete it

---

## 5. Quality Checklist

Before committing a CLAUDE.md file:

- [ ] **100-200 lines MAXIMUM** (count them!)
- [ ] **Last Updated date** at top (YYYY-MM-DD format)
- [ ] Located in directory root
- [ ] Commands section at top
- [ ] Only CRITICAL information
- [ ] Bullet points only (no paragraphs)
- [ ] Zero duplication with style guides
- [ ] References style guides for standards
- [ ] Documents local context only
- [ ] Current code examples
- [ ] Includes gotchas/warnings
- [ ] Every line adds value
- [ ] No conflicts with style guides (check boundaries)

---

## 6. When NOT to Create a CLAUDE.md

Don't create if:
- No special commands needed
- No local gotchas
- Standard patterns only
- <3 files in directory
- Nothing critical to know

---

## 7. Good CLAUDE.md Example

```markdown
# Ethos Prototypes — HTML Component & Prototype Library

Last Updated: 2026-02-18

## Commands
- `npm run dev` - Serve prototypes at localhost:3000
- `npm run new` - Scaffold a new prototype file

## Files
ethos-prototypes/
├── prototypes/              # Finished shareable prototypes
├── components/              # Reusable HTML/CSS snippets
├── tokens.css               # EDS design tokens
└── GUIDELINES.md            # Token + Figma references

## Patterns
- All prototypes are self-contained single HTML files (inline CSS + JS)
- Copy from components/ into prototypes — never link externally
- Mobile-first: max-width 480px, min-width 320px
- Use phone-frame boilerplate from CLAUDE.md as starting point

## Gotchas
- No external dependencies — everything must be inlined before sharing
- Test at both 320px and 480px; layouts break at narrow widths
- TrinHand font requires @font-face if used outside Figma
```

**Note: Files section shows both structure AND important files together**

---

## 8. Common Mistakes

| Mistake | Solution |
|---------|----------|
| **Too Long** - 300+ lines of "nice to know" | **Concise** - 150 lines of "must know" |
| **Too Generic** - "Contains HTML files" | **Specific** - "IUL onboarding prototype screens" |
| **Paragraphs** - Long explanations | **Bullets** - Quick facts |
| **Duplicating** - Rewriting style guides | **Referencing** - Link to style guides |

---

## 9. Maintenance & Freshness

### 9.1 Staleness Indicators
- **Last Updated >30 days ago** = Review required
- **Last Updated >90 days ago** = Likely stale
- **Commands fail** = Update immediately
- **Gotchas no longer apply** = Remove immediately

### 9.2 Update Triggers
- Code changes in directory
- New dependencies added
- Test commands change
- Build process changes
- New gotchas discovered
- Monthly review if high-traffic directory

### 9.3 Quick Update Process
```bash
# Update date when making changes (macOS)
sed -i '' 's/Last Updated: .*/Last Updated: 2026-02-18/' CLAUDE.md

# Check line count
wc -l CLAUDE.md
```
