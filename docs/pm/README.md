# consumer-product

PM workspace for the Ethos Consumer team — docs, PRDs, and prototypes, built around Claude Code.

> **New here?** Start with the [Setup Guide](docs/setup.md) — environment, dependencies, and plugin auth.

---

## Core Workflows

### Start a new project

1. Create a folder under `docs/iul_projects/` — currently organized by month (e.g., `feb_2026/ProjectName/`)
2. Run `/prd-gather-context` — Claude walks you through a structured session to clarify the problem, map user hesitations, and surface hypotheses. Saves as `context_[name].md`.
3. Run `/prd-generate` to scaffold a hypothesis-driven PRD with variants and success metrics. Saves as `prd_[name].md`.
4. Run `/prd-review` at any point for structured feedback across six quality dimensions

### Export and share a PRD

Run `/md-to-docx [path/to/prd.md]` — converts markdown to a formatted DOCX. The skill updates `last_exported` in frontmatter so you always know if your export is stale relative to the last edit.

### Build a prototype

1. From `ethos-prototypes/`, run `npm run dev` to start the local server at `http://localhost:5173`
2. Ask Claude to build a prototype — use `/frontend-design` for best results; it generates React + EDS v2 components with proper tokens automatically
3. Add the new `.tsx` file under `src/prototypes/iul/[mon_yyyy]/`, register the route in `App.tsx`, and add an entry in `prototypes/index.tsx`

Prototypes are React components in `ethos-prototypes/src/prototypes/`. See [ethos-prototypes/CLAUDE.md](ethos-prototypes/CLAUDE.md) for the full setup, component library, tokens, and conventions.

### Work with Jira and Figma

Just ask Claude directly — create or update Jira tickets, pull Figma context, or implement a design as a prototype. No special commands needed; both are configured and ready.

### Get a Second or Third Opinion (Gemini & Codex Agents)

**gemini-agent** and **codex-agent** give you a second and third take on anything — invoke either one for any task in this repo. They're not specialized for different things; they're just two more minds you can bring in.

```
Have the gemini-agent review this PRD and tell me what's missing.
Have the codex-agent take a crack at the Meta LP hero section.
Have both agents draft competing versions of this prototype.
```

Things they can help with (same as anything else you'd do here):
- Draft or pressure-test a PRD
- Brainstorm copy or UX approaches
- Review a prototype for design system compliance or accessibility
- Audit docs across a whole project or quarter at once
- Build a prototype section independently
- Test responsive behavior at 320px and 480px

**Model selection:** Both use sensible defaults — just ask. Specify a model if you want more power or speed:
- **Gemini**: auto-routing by default; `gemini-3.1-pro-preview` for deeper reasoning, `gemini-3-flash-preview` for quick passes
- **Codex**: `gpt-5.2-codex` by default; `gpt-5.3-codex` for harder problems, `gpt-5-codex-mini` for simple tasks

See the [Setup Guide](docs/setup.md#7-agent-clis-gemini--codex) to install and authenticate both CLIs.

### Commit and open a PR

- `/commit-to-github` — creates well-formatted commits with intelligent diff splitting
- `/generate-pr-description` — generates a comprehensive PR description following project guidelines

---

## Where Things Live

```
consumer-product/
├── docs/
│   ├── iul_projects/          # Your project work — organized by month, then project
│   ├── about_iul/             # Reference only — IUL/WL primers, roadmap (don't edit)
│   └── claude_documentation/  # Repo standards — markdown, commit, and PR guidelines
├── ethos-prototypes/          # React + EDS v2 prototypes — Vite app, one route per prototype
├── CLAUDE.md                  # What Claude reads to understand this workspace
└── docs/setup.md              # Environment setup and one-time configuration
```

**Adding project context:** Work out of `docs/iul_projects/`. Claude picks up files here automatically when you're working on that project — the more context you add, the better it performs.

**CLAUDE.md files:** Both the root `CLAUDE.md` and `ethos-prototypes/CLAUDE.md` are Claude's operating instructions for each directory. Don't edit them casually — changes affect how Claude behaves across all sessions.

---

## Keeping This README Current

If you add a skill, change the project structure, or update a workflow — update this file before merging. Claude will remind you, but the expectation is yours to own.

---

## Reference

- [Setup Guide](docs/setup.md) — environment setup, dependencies, plugin auth, browser tools
- [ethos-prototypes/CLAUDE.md](ethos-prototypes/CLAUDE.md) — React + EDS v2 setup, component library, design tokens, and prototype patterns
- [ethos-prototypes/GUIDELINES.md](ethos-prototypes/GUIDELINES.md) — canonical EDS Figma links
- [docs/claude_documentation/](docs/claude_documentation/) — markdown standards, commit and PR guidelines
