# Insurability Report Prototype

## What This Is

A design prototype for a new screen in the Ethos life insurance bottom-of-funnel flow. The screen shows applicants their "insurability score" after they complete the health interview. **Shipping next week** — used for stakeholder alignment, then engineers rebuild from the prototype.

**Two personas:**
- **Top tier** (score ~92): Get them excited about their great rate
- **Non-top tier** (score ~68): Set reasonable expectations — their rate may be higher than expected

## Funnel Placement

The score screen fits into this sequence (all will be built into this prototype):
1. Interstitial — "computing your results"
2. **Insurability score screen** ← this is the main focus
3. Interstitial — "finding the right carrier & policy"
4. Approval screen — "congrats, you're approved"

The full flow should be navigable end-to-end.

## Current State

- **Variant I is the working variant** — iterate on this by default
- Variants A–H and J–L are archived explorations; preserve them but keep them out of the way
- Two versions of the score screen are needed: one for top-tier, one for non-top-tier
- Motion/animation still needed — a hero moment on the score reveal that feels polished but not overdone
- Desktop layout does not exist yet; mobile-first since 80% of traffic is mobile

## Tech Stack

- Next.js 14 (App Router), React 18, TypeScript
- Tailwind CSS v4 (`@tailwindcss/postcss`)
- Motion (Framer Motion v12) for animations
- DialKit for live design controls overlay
- Agentation for dev tooling
- Fonts: Inter (`--font-sans`, body), Portada (`--font-display`, headings — local OTF in `fonts/`)

## Project Structure

```
app/
  layout.tsx        — Root layout, font loading, providers
  page.tsx          — Main prototype: variant I + DialKit controls
  globals.css       — Tailwind + Ethos brand color/font theme tokens
components/
  CanvasLayout.tsx  — Dark canvas wrapper with title + PhoneFrame
  PhoneFrame.tsx    — 375×812 mobile phone chrome (stakeholders view on desktop)
  EthosHeader.tsx   — Ethos logo + help phone number header bar
  DialProvider.tsx  — DialKit root
  AgentationProvider.tsx — Agentation root
fonts/              — Portada OTF (Regular, SemiBold, Bold)
public/             — Static images (family.png, trophy.png)
```

## Design Tokens

Ethos brand colors in `globals.css` as Tailwind theme tokens:
- `canvas` (#131111) — dark presentation background
- `cypress-100` (#056257), `cypress-150`, `cypress-10`, `cypress-5` — primary greens
- `forest` (#054742) — deep green
- `gray-100/80/60/20/5` — neutral scale

## Conventions

- Everything renders inside `PhoneFrame` (375px mobile viewport) — stakeholders view on desktop laptops
- Use Ethos brand colors from theme tokens, not hardcoded hex
- Portada for display/headings, Inter for body
- Make design intent clear: good naming, comments on spacing/animation intent so engineers can understand what's intentional vs incidental
- The score gauge uses SVG arcs — Variant I has a 5-tier segmented gauge with a needle indicator

## Commands

```bash
npm run dev    # Start dev server
npm run build  # Production build
```
