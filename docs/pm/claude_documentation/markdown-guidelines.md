---
last_updated: 2026-02-24
category: reference
---

# Markdown Documentation Standards

<!-- TOC -->
## Table of Contents
- [1. Scope](#1-scope)
- [2. Required Elements](#2-required-elements)
  - [2.1 Metadata Section](#21-metadata-section)
  - [2.2 Table of Contents](#22-table-of-contents)
  - [2.3 Section Separators](#23-section-separators)
- [3. File Size Guidelines](#3-file-size-guidelines)
  - [3.1 Size Limits](#31-size-limits)
  - [3.2 Splitting Large Files](#32-splitting-large-files)
- [4. Formatting Standards](#4-formatting-standards)
  - [4.1 Heading Structure](#41-heading-structure)
  - [4.2 Standard Markdown](#42-standard-markdown)
  - [4.3 File References](#43-file-references)
- [5. Metadata Categories](#5-metadata-categories)
- [6. PRD Export Tracking](#6-prd-export-tracking)
- [7. What NOT to Include](#7-what-not-to-include)
<!-- /TOC -->

---

## 1. Scope

**Applies to:** All markdown files in the repository (excluding CLAUDE.md files, auto-generated docs, progress tracking files)

**CLAUDE.md files:** Follow @docs/claude_documentation/claude-md-guidelines.md instead

**Frontmatter requirement:** Every markdown file must have YAML frontmatter (see Section 2.1)

**Additional structure requirements (files >100 lines only):**
- Table of Contents (Section 2.2)
- Section Separators (Section 2.3)

**Enforcement:** Update `last_updated` manually when editing content; regenerate TOC if you have hooks configured

---

## 2. Required Elements

### 2.1 Metadata Section

Every qualifying markdown file must include YAML frontmatter:

```yaml
---
last_updated: 2025-01-18        # Auto-updated on content changes
version: 1.0.0                   # Optional - only for specs/APIs (see below)
category: planning               # Single value from defined list
---
```

**Field Descriptions:**
- `last_updated`: ISO 8601 date (YYYY-MM-DD), auto-updated on content changes
- `version`: OPTIONAL - Only for formal specs/APIs requiring version tracking
- `category`: Single category from predefined list (see Section 5)

### 2.2 Table of Contents

**For files >100 lines only:** Place auto-generated TOC between `<!-- TOC -->` and `<!-- /TOC -->` markers. TOC includes h2 and h3 only (max 2 levels).

For files ≤100 lines, TOC is optional.

### 2.3 Section Separators

**For files >100 lines only:** Add `---` horizontal rules between major sections (h2).

For files ≤100 lines, section separators are optional.

---

## 3. File Size Guidelines

### 3.1 Size Limits

- **500 lines**: Absolute maximum for any markdown file
- **300 lines**: Recommended target for most documentation
- **200 lines**: Ideal for frequently accessed docs
- **All files**: Must have YAML frontmatter (see Section 2.1)
- **>100 lines**: Must include Table of Contents and Section Separators

### 3.2 Splitting Large Files

When a file exceeds 500 lines, split it:
1. Create directory with original filename (minus .md)
2. Add CLAUDE.md as index/overview
3. Create focused files for each major section (150-300 lines each)
4. Cross-reference with relative links

---

## 4. Formatting Standards

### 4.1 Heading Structure

**Format:**
- h1: Document title only (one per file)
- h2: Major sections with outline numbering (`## 1. Section Name`)
- h3: Subsections with decimal numbering (`### 1.1 Subsection`)
- h4+: Detailed topics (no numbering, not in TOC)

**Example:**
```markdown
# Document Title

## 1. Major Section
### 1.1 First Subsection
#### Implementation Details
### 1.2 Second Subsection

## 2. Another Major Section
```

### 4.2 Standard Markdown

Follow standard markdown conventions:
- Use `-` for bullets (not `*` or `+`), indent sub-items 2 spaces
- Use fenced code blocks with language specified (` ```python `)
- Use `|` pipes for tables with header separator row
- Use `- [ ]` for checklists
- Single blank line between paragraphs and around code blocks/tables
- No trailing whitespace

### 4.3 File References

**Always use `@` syntax for file references:**
- Format: `@path/to/file.ext` (e.g., `@docs/claude_documentation/markdown-guidelines.md`)
- Creates interactive links in Claude's interface
- Auto-updates if files are renamed or moved
- Provides better navigation and tracking

**Never use backticks for file paths:**
- Backticks should only be used for inline code, commands, or code snippets
- File paths in backticks don't create references and won't update if files move

**Examples:**
```markdown
# Correct - file references:
See @backend/api/api_handlers/CLAUDE.md for API patterns
Check @.claude/commands/prepare-pr-for-merge.md for PR prep
The config is in @backend/config.py

# Correct - commands and code:
Run `npm test` to test
Use `calculate_total()` function
Execute `python scripts/migrate.py`

# Incorrect - don't do this:
See `backend/api/handlers.py` for examples  ❌
Check the file `docs/CLAUDE.md`  ❌
```

---

## 5. Metadata Categories

Valid `category` values: `prd`, `ideation`, `copy`, `research`, `prototyping`, `planning`, `meeting-notes`, `knowledge-base`, `guide`, `reference`, `compliance`, `legal`

---

## 6. PRD Export Tracking

**For PRD files only:** Add an optional `last_exported` field to track DOCX export dates.

```yaml
---
last_updated: 2026-02-24
last_exported: 2026-02-24
category: prd
---
```

**Pattern:**
- Update `last_exported` every time you export the PRD to DOCX (the `/md-to-docx` skill does this automatically)
- If `last_exported` is older than `last_updated`, the DOCX is stale—re-export before sharing
- No enforcement needed; just a visual check before distribution

**Example:**
- MD `last_updated`: 2026-02-24 ✓ (current)
- MD `last_exported`: 2026-02-20 ✗ (4 days old—DOCX may be stale)

---

## 7. What NOT to Include

- HTML tags, inline styles, or colors
- Code blocks for non-code content
- Multiple h1 headings or deeply nested headings (h5, h6)
- Manual TOC or section numbering (use auto-generation)
