# Consumer Product — Ethos PM Workspace

Last Updated: 2026-03-02

## Commands

- `brew bundle` - Install system dependencies (pandoc, gh, node — see Brewfile)
- `npm install` - Install root doc tooling (gray-matter, markdown-toc)
- For prototypes, see @ethos-prototypes/CLAUDE.md

## Browser Tools

Two tools available for different workflows:

**agent-browser** — Automation, testing, web scraping, prototype testing
- Use when: Need to automate workflows, test multiple pages, navigate to new URLs
- The key advantage is that its much more token efficient than devtools.

**Chrome DevTools** — Reading & inspecting live tabs
- Use when: You already have a website/tab open you want me to read or interact with
- See @.claude/skills/chrome-devtools/SKILL.md for full tool reference

**Decision:** Automation/testing → agent-browser | Inspecting live tabs → DevTools

## Files

```
consumer-product/
├── docs/
│   ├── claude_documentation/ # Markdown + CLAUDE.md standards, official doc links
│   ├── git/                 # Commit and PR guidelines
│   ├── about_iul/           # Reference-only: IUL/WL primers, Q1 roadmap
│   ├── meetings/            # One file per meeting (see Common Tasks)
│   └── iul_projects/        # Project work — organized by month, then project
├── ethos-prototypes/        # React + EDS v2 prototypes — Vite app, routes per prototype
└── tools/
    └── pandoc/              # PRD → DOCX export: lua filter, reference.docx, styles
```

## Patterns

- **Prototyping** — Key workflow. See @ethos-prototypes/CLAUDE.md for setup, components, and tokens
- New project → new folder under `docs/iul_projects/` (currently organized by month)
- `about_iul/` is reference-only — don't edit without intent; these are source-of-truth docs
- All markdown files need YAML frontmatter with `last_updated` and `category` (required for all files)
- See @docs/claude_documentation/markdown-guidelines.md for markdown formatting and file reference standards
- See @docs/claude_documentation/claude-md-guidelines.md for CLAUDE.md standards
- Valid `category` values: `prd`, `ideation`, `copy`, `research`, `prototyping`, `planning`, `meeting-notes`, `knowledge-base`, `guide`, `reference`, `compliance`, `legal`

## Common Tasks

### Start a New Project
1. Create `docs/iul_projects/[mon_yyyy]/[ProjectName]/`
2. Add context doc as `context_[short_name].md` (`category: planning`) and PRD as `prd_[short_name].md` (`category: prd`) — snake_case, 2–4 words
3. Add `ideation_1.md` for copy/concept exploration (`category: ideation`)
4. If prototypes exist, create `src/prototypes/iul/[mon_yyyy]/[PrototypeName].tsx`, add a route in `App.tsx` and entry in `prototypes/index.tsx`, then add `prototype:` field to PRD frontmatter

### README Maintenance
When you add a skill, change the project structure, or update a core workflow, update `README.md` before merging. Remind the user if they forget.

### Add Meeting Notes
1. Create `docs/meetings/YYYY-MM-DD-[topic].md`
2. Add frontmatter: `last_updated: YYYY-MM-DD`, `category: meeting-notes`

### Work on Prototypes
- See @ethos-prototypes/CLAUDE.md for full setup and component library
- **Start with `/create-prototype`** — gathers context, flags gaps, assembles brief, then hands off to `/frontend-design`
- **`/frontend-design`** — generates high-quality React + EDS v2 code; use directly only if brief is already complete
- Prototypes are React components in `ethos-prototypes/src/prototypes/`; use `PhoneFrame` wrapper and import EDS from `src/eds.tsx`
- Deploy via Vercel or `npm run preview` locally; share `/iul/[route]` URL per prototype
- Requires `ethos-design-system-v2` cloned as sibling at `../ethos-design-system-v2`

### Documentation Standards
1. See @docs/claude_documentation/markdown-guidelines.md for markdown formatting and file reference standards. Always use `@` syntax for file references to ensure links are interactive and auto-updating.
2. See @docs/claude_documentation/claude-md-guidelines.md for CLAUDE.md metadata and structuring standards.