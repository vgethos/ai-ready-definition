# Ethos Prototypes — React + EDS v2

Last Updated: 2026-03-04

## Commands

- `npm run dev` - Serve at localhost:5173
- `npm run build` - Production build (required before Vercel deploy)
- `npm run preview` - Preview production build locally

## Quick Start

**Start with `/create-prototype`** — gathers context (funnel stage, hypothesis, variants), flags gaps, and assembles a brief before handing off to `/frontend-design`.

Use `/frontend-design` directly only if the brief is already complete.

After generating code, adapt it to use EDS v2 components from `src/eds.tsx`.

## Files

```
ethos-prototypes/
├── src/
│   ├── eds.tsx               # EDS v2 adapter — import all EDS components from here
│   ├── App.tsx               # React Router — add new prototype routes here
│   ├── index.css             # Global styles: Tailwind + fonts + phone-frame
│   ├── components/
│   │   └── PhoneFrame.tsx    # Mobile frame wrapper — use in every prototype
│   └── prototypes/
│       ├── index.tsx         # Prototype index — sections: Canonical, IUL
│       └── iul/
│           ├── feb_2026/
│           │   └── MetaLpCtaV1.tsx          # Single prototype
│           └── mar_2026/
│               ├── IulGoals.tsx             # Single prototype
│               └── guaranteed_vs_non/       # Grouped experiment (multiple variants)
│                   ├── PolicyV1Cards.tsx
│                   ├── PolicyV2Chart.tsx
│                   └── PolicyV3Ranges.tsx
├── public/fonts/             # EDS v2 fonts (woff2) — already loaded in index.css
├── package.json              # EDS v2 via file:../../ethos-design-system-v2
├── vercel.json               # SPA rewrites for Vercel
└── CLAUDE.md                 # This file
```

## Adding a Prototype

### Single prototype (3 steps)

**1. Create the file**
`src/prototypes/iul/[mon_yyyy]/[PrototypeName].tsx`

Use `PhoneFrame` as outer wrapper. Import EDS from `src/eds.tsx`.

**2. Add the route** — `src/App.tsx`:
```tsx
import MyPrototype from './prototypes/iul/mar_2026/MyPrototype';
<Route path="/iul/my-prototype" element={<MyPrototype />} />
```

**3. Add to the index** — in `src/prototypes/index.tsx`:
- Shared design pattern → add to `canonical.variants`
- Product-area experiment → add to the matching `productAreas` entry (or add a new area)

---

### Grouped experiment (multiple variants)

When you have 2+ variants of the same concept, group them in a shared subfolder.

**1. Create the folder and files**
```
src/prototypes/iul/[mon_yyyy]/[experiment_name]/
  VariantA.tsx
  VariantB.tsx
  VariantC.tsx
```
Imports go one level deeper: use `../../../../components/PhoneFrame`, `../../../../styles`.

**2. Add routes** — `src/App.tsx`:
```tsx
import VariantA from './prototypes/iul/mar_2026/experiment_name/VariantA';
<Route path="/iul/experiment-name/v1" element={<VariantA />} />
```

**3. Add a group to the index** — add to the matching `productAreas` entry in `src/prototypes/index.tsx`:
```ts
{
  name: 'Experiment Name',
  month: 'Mar 2026',
  variants: [
    { path: '/iul/experiment-name/v1', title: 'V1 — Variant A', description: '...', month: 'Mar 2026' },
  ],
}
```

## EDS v2 Components

Import from `src/eds.tsx` (NOT directly from the package — keeps prototype imports clean):
```tsx
import { Button, Input, RadioButton, Badge, Modal } from '../../eds';
```

Available: `Button`, `ProgressBar`, `Icon`, `Badge`, `Input`, `Modal`,
`CheckboxInput`, `RadioButton`, `Spinner`, `Accordion`, `Banner`

To use additional EDS components, add a typed wrapper to `src/eds.tsx`.

## Design Tokens

EDS v2 CSS variables are injected globally. Use directly:
```css
color: var(--cypress);               /* #056257 — primary green */
background: var(--dark-cypress);     /* #05594f */
color: var(--night-60);              /* #7e7e7e — muted text */
border-color: var(--night-20);       /* #d4d4d4 — borders */
```

Key variables: `--cypress`, `--dark-cypress`, `--night-5` thru `--night-100`,
`--white`, `--citrine`, `--clover`

Fonts: `NewTheinhardt` (body), `Cambon` (headlines)

## Patterns

- Every prototype wraps content in `<PhoneFrame>` (390px max-width, phone shadow)
- Use Tailwind for layout; use EDS components for interactive elements
- Add variant switcher (pill tab nav using `Link`) for A/B test prototypes — links between sibling routes
- Add click feedback panels to show interaction tracking for stakeholder demos

### App Screen Header (canonical pattern)

**Always use this for app/onboarding/BOF screens.** Canonical reference: `src/prototypes/iul/mar_2026/IulGoals.tsx`

```tsx
// EthosLogo — cypress fill, copy exactly from IulGoals.tsx
function EthosLogo() { /* svg with fill="var(--cypress)" */ }

// TopBar — logo left, bell icon + "Need help?" + phone right
<header style={{ background: '#fff', padding: '16px 20px 0', flexShrink: 0 }}>
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
    <EthosLogo />
    <div style={{ textAlign: 'right' }}>
      <div style={{ fontSize: '11px', color: 'var(--night-60)', display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'flex-end', marginBottom: '2px' }}>
        {/* bell icon svg */} Need help?
      </div>
      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--cypress)' }}>
        (415) 275-9050
      </div>
    </div>
  </div>
</header>
```

**Do not use text `"ETHOS"` or `CAM` letterSpacing for the wordmark** — always use the SVG logo with `fill="var(--cypress)"`.

### LP Prototype Recipe

Verified from `staging.ethos.com` computed styles. Import `lp`, `lpColors` from `src/styles.ts`.
**Canonical reference:** `src/prototypes/iul/feb_2026/MetaLpCtaV1.tsx`

| Section | Element | Style |
|---|---|---|
| Hero | background | `lpColors.heroBg` (`var(--dark-cypress)`) |
| Hero | headline | `lp.displayM` + `textAlign:'center'` + `color:'white'` |
| Hero | body | `lp.bodyL` + `textAlign:'center'` + `color:'rgba(255,255,255,0.9)'` |
| Hero | primary CTA | `<Button variant="clover">` |
| Hero | secondary CTA | `<Button variant="whiteOutline">` |
| Content | background | `lpColors.sectionBg` (`#faf9f5`) |
| Content | section heading | `lp.displayM` + `textAlign:'center'` + `color:lpColors.darkText` |
| Content | section subtitle | `lp.bodyM` + `textAlign:'center'` + `color:lpColors.darkText` |
| Content | card title | `lp.cardTitle` + `color:lpColors.cardTitle` + `textAlign:'center'` |
| Content | card description | `lp.bodyM` + `color:lpColors.mutedText` + `textAlign:'center'` |
| Content | card layout | `flexDirection:'column'`, `alignItems:'center'`, icon on top |

App prototypes (onboarding flows): white background, Cambon h1, NewTheinhardt body — see `type` in `src/styles.ts`.

## Deployment (Vercel)

1. Push branch to GitHub
2. Vercel auto-deploys (root: `ethos-prototypes/`, build: `npm run build`, output: `dist`)
3. Share the `/iul/[route]` URL for specific prototypes

## Verified Type Scale

Sourced from `app.ethos.com` computed styles. Import from `src/styles.ts` — do not hardcode:

```tsx
import { type, ui } from '../../styles';
// <h1 style={type.h1}>
// <div style={type.cardTitle}>
// <div style={type.cardDescription}>
// <button style={{ ...ui.button, ...type.button }}>
```

| Element | Font | Size | Weight | Line-height |
|---|---|---|---|---|
| h1 / screen heading | Cambon | 28px | **700** | 31px |
| Card title | NewTheinhardt | 18px | 500 | 26px |
| Card description | NewTheinhardt | 16px | 400 | 24px |
| CTA button | NewTheinhardt | 18px | 500 | 26px |

| Element | Border-radius | Padding |
|---|---|---|
| Selection card | 4px | 15px 18px |
| CTA button | 8px | 18px |

## Gotchas

- EDS v2 requires `../../ethos-design-system-v2` to be cloned as a sibling — see setup in root README
- **EDS v2 is now 2.0.0 / React 19 native** — prototypes also run React 19; rebuild EDS (`cd ../ethos-design-system-v2 && yarn && yarn build`) after pulling new EDS changes
- Always import EDS components from `src/eds.tsx`, not the package directly
- `public/fonts/` fonts are pre-loaded in `index.css` — no `@font-face` needed in prototypes
- Run `npm run build` before deploying to Vercel to catch type errors
- **Cambon-Bold.otf** (`public/fonts/`) is required for `fontWeight: 700` headings — it's not in the woff2 set. Already copied from `ethos-design-system-v2/src/fonts/`
- `forwardRef` is deprecated in React 19 (refs are now regular props) — don't rely on it in new prototype code
