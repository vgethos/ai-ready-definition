---
last_updated: 2026-02-24
category: reference
---

# IUL Ads — Creative Documentation

This directory documents all Ethos IUL ad creatives: copy variants, visual design specs, and technical details.

## Files

```
meta/
├── video_at_desk.md              # Home desk scene video — 3 variants + transcript
├── video_podcaster.md            # Podcaster scene video — 1 variant + transcript
├── IUL_vs_401k_Ad_Description.md         # Venn diagram comparison
├── IUL_vs_401k_Table_Ad_Description.md   # Two-column table comparison
├── IUL_vs_Retirement_Accounts_Ad_Description.md # Four-column grid
├── IUL_vs_SP500_Ad_Description.md        # Pie chart comparison
└── CLAUDE.md                     # This file
```

## File Structure (All Creatives)

Every ad file follows this pattern:

1. **Frontmatter** — Metadata (format, reference ID)
2. **Variant(s)** — Post Body, Subtext, Sub-subtext, CTA (structured as bullet list)
3. **Visual Design** — Layout description, component details, branding placement
4. **Footnotes/Disclosures** — Compliance disclaimers with superscript references

Videos also include:
- **Scene Description** — What's happening on screen
- **Transcript** — Word-for-word copy with timestamps in code block

Comparison ads also include:
- **Layout** — Visual structure (Venn diagram, table, grid, pie chart)
- **Headline** — Main comparison title
- **Comparison structure** — Feature lists or tables with checkmarks

## Patterns

- Fields like "Post Body", "Subtext", "CTA" are **bold** and formatted as bullet list items
- Visual layout descriptions use h3 subheaders for clarity
- Video timestamps are in code blocks for readability
- Comparison tables use markdown pipes; pie charts use bullet lists
- All footnotes numbered (1, 2, 3...) with matching superscripts in content

## Gotchas

- Reference IDs (e.g., 2025OLTH-3081) are immutable — don't change them
- Video timestamps map to specific script sections — verify alignment if editing
- Comparison features should stay consistent across similar ad types (e.g., all 401(k) comparisons)
- Compliance disclaimers are non-negotiable — every footnote reference must have a matching disclosure

## Channel Performance (Jan 1 – Feb 15, 2026)

Meta's share of total IUL traffic across the funnel:

| Funnel Stage | Meta Share |
|--------------|------------|
| Traffic | 66% |
| Leads | 45% |
| Approvals | 42% |
| Activations | 28% |
| Revenue | 25% |

---

## Common Tasks

### Add a New Video Creative
1. Copy `video_at_desk.md` or `video_podcaster.md` as starting point
2. Update title, format if needed, add new reference ID
3. Fill in Scene Description and Transcript (copy from video source)
4. Add 1–3 variants with Post Body, Subtext, Sub-subtext, CTA
5. Update `last_updated` date

### Add a New Comparison Ad
1. Copy nearest comparison file (Venn, table, or grid)
2. Update title and reference ID
3. Modify Layout description and Headline for new comparison
4. Update feature lists/table rows to match comparison
5. Add/remove disclaimers as needed; renumber footnotes

### Update Variant Copy
1. Find the file and variant section
2. Update bullet-list fields (Post Body, Subtext, Sub-subtext, CTA)
3. Update `last_updated` date
4. Verify compliance language per @docs/about_iul/CLAUDE.md
