---
last_updated: 2026-03-03
category: guide
---

# Setup Guide

Everything you need to get your environment ready for this repo. Do this once when you first join.

**Time:** ~15–20 minutes.

---

## Before You Start

**Prerequisites:**
- A Mac (these instructions assume macOS)
- A GitHub account with access to the `getethos` org — [request access here](https://ethoslife.freshservice.com/support/catalog/items/48)
- Homebrew — the Mac package manager. If you don't have it:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

**How to open Terminal:** Press `Cmd + Space`, type `Terminal`, press `Enter`.

**What "project root" means:** The `consumer-product/` folder you'll clone in §1. Most commands must be run from there. When in doubt, run `cd ~/Projects/consumer-product` to get back.

---

## 1. Clone the Repo

Install the GitHub CLI and authenticate so you can access private repos:

```bash
brew install gh
gh auth login
# Follow prompts: select GitHub.com → HTTPS → authenticate with browser
```

Then clone the repo into a `Projects` folder:

```bash
mkdir -p ~/Projects
cd ~/Projects
gh repo clone getethos/consumer-product
cd consumer-product
```

You're now in the **project root**.

---

## 2. Install System Dependencies

From the project root, install all required system tools:

```bash
brew bundle
```

This installs: git, gh (GitHub CLI), node, and pandoc (for PRD → DOCX export).

---

## 3. Install Root Node Dependencies

```bash
npm install
```

This installs doc tooling used at the root level (`gray-matter`, `markdown-toc`).

---

## 4. Set Up EDS v2 (required for prototypes)

The prototypes use the Ethos Design System v2, which lives in a sibling repo and must be built locally. One-time step.

**4.1 Clone EDS v2 as a sibling repo**

Both repos must live in the same parent folder (`~/Projects/`):

```bash
cd ~/Projects
gh repo clone getethos/ethos-design-system-v2
```

Your folder structure should look like:
```
~/Projects/
├── consumer-product/            ← this repo
└── ethos-design-system-v2/      ← EDS v2 clone
```

**4.2 Enable Yarn**

EDS v2 uses Yarn 4. Enable it via corepack (bundled with Node):

```bash
corepack enable
```

**4.3 Build EDS v2**

```bash
cd ~/Projects/ethos-design-system-v2
yarn install
yarn build
```

A successful build prints something like:
```
dist/assets/index.css   77.61 kB
dist/index.js          402.72 kB
✓ built in 2.47s
```

You only need to re-run this if you pull updates to EDS v2.

---

## 5. Install and Run Prototypes

```bash
cd ~/Projects/consumer-product/ethos-prototypes
npm install
npm run dev
# Serves at http://localhost:5173
```

Open `http://localhost:5173` in your browser — you should see the prototype index.

**You're up and running.** The sections below cover contributing setup and optional tools.

---

## 6. Configure Git (for contributing)

If you plan to commit code or create branches, configure Git with your name and email:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@getethos.com"
```

Verify everything is working:

```bash
git --version
gh auth status
```

---

## 7. Claude Code: PM System Prompt

Load `pm-system-prompt.md` when starting a Claude Code session focused on PM work. This primes Claude as a PM thinking partner — challenging assumptions, pressure-testing UX flows, and ensuring language precision.

**Command (works from anywhere in the repo):**

```bash
claude --system-prompt "$(cat $(git rev-parse --show-toplevel)/pm-system-prompt.md)"
```

**Optional: Set up a shell alias**

Find your shell:

```bash
echo $SHELL
# Prints something like /bin/zsh or /bin/bash
```

| Your shell | Config file | Reload command |
|-----------|-------------|----------------|
| zsh | `~/.zshrc` | `source ~/.zshrc` |
| bash | `~/.bashrc` | `source ~/.bashrc` |
| fish | `~/.config/fish/config.fish` | `source ~/.config/fish/config.fish` |

Add this line to your config file:

```bash
alias ethos='claude --system-prompt "$(cat $(git rev-parse --show-toplevel)/pm-system-prompt.md)"'
```

After reloading, run `ethos` from anywhere in the repo instead of the full command.

---

## 8. Plugin Authentication

This repo connects to Figma and Atlassian (Jira). Authenticate once to enable those features.

1. Open Claude Code and type `/plugin` in the terminal or command palette
2. You'll see a list of available MCP plugins
3. Authenticate each one by selecting it and following the prompts:
   - **Figma** — needed for design-to-code workflows and pulling design context
   - **Atlassian (Jira)** — needed for Jira ticket creation, search, and Confluence
   - **Slack** - TBD - not working yet

Authentication is stored securely and reused across sessions. You only need to do this once per machine.

---

## 9. Browser Tools

Two tools are available depending on your task:

| Tool | Best for | Token usage |
|------|----------|-------------|
| **agent-browser** | Automation, prototype testing, web scraping | Low |
| **Chrome DevTools** | Inspecting a live tab you already have open | Higher |

### Chrome DevTools (Remote Debugging)

1. Open Chrome
2. Go to `chrome://inspect/#remote-debugging`
3. Check **"Allow remote debugging for this browser instance"**

Claude Code will now be able to connect to your running Chrome instance automatically.

### Agent-Browser

Install and set up Chromium — both steps are required for agent-browser to work:

```bash
npm install -g agent-browser
agent-browser install
```

Once installed, just ask Claude Code to use it:

```
Take a screenshot of localhost:5173
Test the prototype at http://localhost:5173/iul/my-prototype
```

---

## 10. Agent CLIs (Gemini & Codex)

This repo includes `gemini-agent` and `codex-agent` — CLI wrappers that give Claude a second opinion on large-context analysis and code execution tasks.

### Gemini CLI

Gemini provides 1M token context for analyzing entire directories (all PRDs, all prototypes, etc.).

```bash
npm install -g @google/gemini-cli
gemini auth   # opens browser to authenticate with your Google account
gemini -p "Say hello"   # verify it works
```

### Codex CLI

Codex executes code, builds prototypes, and runs scripts in isolated sandboxes.

```bash
npm install -g @openai/codex
codex login   # requires OpenAI API key (get from https://platform.openai.com/api-keys)
codex exec --sandbox read-only "echo 'Codex is ready'"   # verify
```

Once installed, ask Claude to use them:

```
Have the gemini-agent review all Q1 PRDs for consistency
Have the codex-agent build the Meta LP hero prototype
```

See `.claude/agents/gemini-agent.md` and `.claude/agents/codex-agent.md` for full details.

---

## Commands Quick Reference

| Command | Location | What it does |
|---------|----------|--------------|
| `brew bundle` | Project root | Install system dependencies |
| `npm install` | Project root | Install doc tooling |
| `yarn install && yarn build` | `~/Projects/ethos-design-system-v2/` | Build EDS v2 (one-time) |
| `npm install` | `ethos-prototypes/` | Install prototype dependencies |
| `npm run dev` | `ethos-prototypes/` | Serve prototypes at localhost:5173 |
| `npm run build` | `ethos-prototypes/` | Production build (required before Vercel deploy) |
| `gemini auth` | Anywhere | Authenticate Gemini CLI (one-time) |
| `codex login` | Anywhere | Authenticate Codex CLI (one-time) |
