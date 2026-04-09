# Ethos Prototypes

Interactive product prototypes built with React + [EDS v2](https://github.com/getethos/ethos-design-system-v2). Each prototype is a route in a single Vite app — share a `/iul/[route]` URL for stakeholder reviews, or deploy to Vercel.

## Quick Start

> **Prerequisite:** EDS v2 must be cloned and built as a sibling repo before `npm install` will work. See [docs/setup.md §8](../docs/setup.md) for the one-time setup.

```bash
npm install
npm run dev
# → http://localhost:5173
```

## Commands

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server at localhost:5173 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview production build locally |

## Adding a Prototype

**1. Create the component**

`src/prototypes/iul/[mon_yyyy]/PrototypeName.tsx`

```tsx
import PhoneFrame from '../../../components/PhoneFrame';
import { Button } from '../../../eds';

export default function MyPrototype() {
  return (
    <PhoneFrame>
      {/* prototype content */}
      <Button buttonTitle="Get started" variant="primary" size="md" />
    </PhoneFrame>
  );
}
```

**2. Register the route** — in `src/App.tsx`:

```tsx
import MyPrototype from './prototypes/iul/mar_2026/MyPrototype';
// ...
<Route path="/iul/my-prototype" element={<MyPrototype />} />
```

**3. Add to the index** — in `src/prototypes/index.tsx`:

```ts
{ path: '/iul/my-prototype', title: 'My Prototype', description: '...', month: 'Mar 2026' }
```

## EDS v2 Components

Always import from `src/eds.tsx` (not the package directly — handles React type compatibility):

```tsx
import { Button, Input, RadioButton, Badge, Modal, Icon, Spinner } from '../../eds';
```

Available components: `Button`, `Input`, `RadioButton`, `CheckboxInput`, `Badge`, `Modal`, `Icon`, `ProgressBar`, `Spinner`, `Accordion`, `Banner`

To use additional EDS components, add a typed wrapper to `src/eds.tsx`.

## Design Tokens

EDS v2 CSS variables are available everywhere:

```css
color: var(--cypress);        /* #056257 — primary green */
color: var(--dark-cypress);   /* #05594f */
color: var(--night-60);       /* #7e7e7e — muted text */
border-color: var(--night-20);/* #d4d4d4 — borders */
background: var(--citrine);   /* #e7fd7f — accent lime */
```

Fonts: `NewTheinhardt` (body), `Cambon` (headlines) — declared in `src/index.css`, no `@font-face` needed in prototypes.

## Deployment (Vercel)

1. Push branch to GitHub
2. In Vercel: set **Root Directory** to `ethos-prototypes/`, **Build Command** to `npm run build`, **Output** to `dist`
3. Share the `/iul/[route]` URL for specific prototypes

`vercel.json` handles SPA rewrites so direct URLs work.

## Project Structure

```
ethos-prototypes/
├── src/
│   ├── eds.tsx                        # EDS v2 adapter — import components from here
│   ├── App.tsx                        # React Router — register routes here
│   ├── index.css                      # Tailwind + fonts + phone-frame base styles
│   ├── components/
│   │   └── PhoneFrame.tsx             # Mobile phone frame wrapper
│   └── prototypes/
│       ├── index.tsx                  # Prototype index page
│       └── iul/feb_2026/
│           └── MetaLpCtaV1.tsx        # Sample prototype
├── public/fonts/                      # EDS v2 woff2 fonts
├── package.json                       # EDS v2 via file:../../ethos-design-system-v2
├── vercel.json                        # SPA rewrites
└── CLAUDE.md                          # Claude Code context for this directory
```
