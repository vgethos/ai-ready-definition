---
last_updated: 2026-02-20
category: prototyping
---

# Ethos Prototyping System - Project Setup

## Overview

A Claude Code-based prototyping system for Ethos using plain HTML. Optimized for speed, consistency, easy sharing, and stakeholder iteration via Claude chat.

---

## Project Goals

1. **Speed**: Rapidly create new prototypes using documented patterns
2. **Consistency**: CLAUDE.md serves as the source of truth for design patterns
3. **Iteration**: Stakeholders can paste prototypes into Claude chat and iterate directly
4. **Sharing**: Single HTML files—no build step, no hosting, just share the file
5. **Engineering Communication**: Interactive prototypes demonstrate complex interactions
6. **Versioning**: Git for version control and history

---

## Key Decision: Plain HTML

**Why not Svelte/React?**

Compiled frameworks produce bundled output that stakeholders can't meaningfully edit in Claude chat. With plain HTML:

- The file you edit = the file you share = the file stakeholders iterate on
- No build step, no compilation, no tooling complexity
- Claude handles verbose HTML easily (300 lines is fine)
- Stakeholders can paste any prototype into Claude chat and say "change the button color" or "add a toggle"

**Where does speed come from?**

Not from framework abstractions, but from:
- CLAUDE.md patterns that Claude Code references automatically
- Documented component snippets ready to copy/adapt
- Consistent tokens and styles across all prototypes
- Git for versioning (no context window limitations)

---

## Project Structure

```
ethos-prototypes/
├── CLAUDE.md                     # THE KEY FILE - patterns, tokens, components (working tables + component library)
├── GUIDELINES.md                 # Design guidelines + canonical EDS token sources (Figma Typography, Colors, Spacing & Responsive)
├── tokens.css                    # Reference file (values get inlined into prototypes)
├── components/                   # HTML snippet reference library
│   ├── badge.html
│   ├── button-groups.html
│   ├── card.html
│   ├── checkbox.html
│   ├── disclaimer.html
│   ├── drawer.html
│   ├── header.html
│   ├── highlight-box.html
│   ├── input-dropdown.html
│   ├── input-field.html
│   ├── metric-row.html
│   ├── modal.html
│   ├── progress-bar.html
│   ├── radio-button.html
│   ├── slider-input.html
│   ├── tabs.html
│   ├── toggle.html
│   └── (graph.html when added)
├── prototypes/                   # Actual prototypes (self-contained HTML)
│   ├── iul-config.html
│   ├── policy-comparison.html
│   └── ...
├── assets/                       # Images if needed (rare)
└── README.md
```

---

## Minimal Tooling

```json
{
  "name": "ethos-prototypes",
  "private": true,
  "scripts": {
    "dev": "npx serve prototypes -p 3000",
    "new": "node scripts/new.js"
  },
  "devDependencies": {
    "serve": "^14.0.0"
  }
}
```

That's it. One optional dev server for live preview. Everything else is just files.

### Optional: Recording for Async Sharing

```json
{
  "devDependencies": {
    "serve": "^14.0.0",
    "puppeteer": "^22.0.0",
    "gif-encoder-2": "^1.0.0"
  },
  "scripts": {
    "dev": "npx serve prototypes -p 3000",
    "new": "node scripts/new.js",
    "record": "node scripts/record.js"
  }
}
```

---

## Design Tokens (Extracted So Far)

### tokens.css (Reference File)

```css
/* ===========================================
   ETHOS DESIGN TOKENS
   Reference file - inline these values into prototypes
   =========================================== */

:root {
  /* -------- Colors -------- */
  
  /* Primary */
  --color-primary: #056257;
  --color-primary-dark: #044a41;
  
  /* Neutrals */
  --color-black: #1a1a1a;
  --color-gray-900: #333333;
  --color-gray-600: #666666;
  --color-gray-400: #999999;
  --color-gray-200: #e0e0e0;
  --color-gray-100: #f0f0f0;
  --color-white: #ffffff;
  
  /* Backgrounds */
  --color-bg-page: #f9f9f9;
  --color-bg-surface: #ffffff;
  --color-bg-highlight: #f0f7f4;
  
  /* Semantic (need confirmation) */
  --color-success: #056257;
  --color-error: #dc2626;
  --color-warning: #f59e0b;
  --color-info: #3b82f6;
  
  /* -------- Typography -------- */
  
  /* Font family - need to confirm */
  --font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
  
  /* Font sizes */
  --text-xs: 11px;
  --text-sm: 13px;
  --text-base: 15px;
  --text-lg: 16px;
  --text-xl: 20px;
  --text-2xl: 24px;
  --text-3xl: 28px;
  --text-4xl: 36px;
  
  /* Font weights */
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line heights */
  --leading-tight: 1.2;
  --leading-normal: 1.4;
  --leading-relaxed: 1.6;
  
  /* -------- Spacing -------- */
  
  /* Base unit: 8px */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  
  /* Layout */
  --page-padding: 16px;       /* 16px on each side */
  --content-max-width: 480px; /* Largest mobile */
  --content-min-width: 320px; /* Smallest mobile */
  
  /* -------- Borders -------- */
  
  --radius-sm: 6px;
  --radius-md: 11px;
  --radius-lg: 12px;
  --radius-full: 9999px;
  
  --border-width: 1px;
  --border-color: #e0e0e0;
  
  /* -------- Shadows -------- */
  
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.08);
}
```

---

## CLAUDE.md (The Consistency Engine)

This is the most important file. It tells Claude Code exactly how to build Ethos prototypes.

```markdown
# Ethos Prototyping System

## Quick Start

To create a new prototype:
1. Copy an existing prototype from `prototypes/` as a starting point, OR
2. Start fresh using the boilerplate below

## Design Principles

- Mobile-first: max-width 480px, min-width 320px
- Page padding: 16px horizontal
- All prototypes are self-contained single HTML files
- Inline all CSS in a <style> tag
- Inline all JS in a <script> tag at the end of <body>

## Boilerplate

Every prototype starts with this structure:

​```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Prototype Name] - Ethos</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
            background-color: #f9f9f9;
            padding: 16px;
            max-width: 480px;
            margin: 0 auto;
            color: #1a1a1a;
            line-height: 1.4;
        }
        
        /* Component styles go here */
    </style>
</head>
<body>
    <!-- Content goes here -->
    
    <script>
        // Interactivity goes here
    </script>
</body>
</html>
​```

## Color Palette

| Token | Value | Usage |
|-------|-------|-------|
| Primary | #056257 | Buttons, accents, links |
| Primary Dark | #044a41 | Hover states |
| Black | #1a1a1a | Headings, primary text |
| Gray 900 | #333333 | Secondary text |
| Gray 600 | #666666 | Muted text, subtitles |
| Gray 400 | #999999 | Disabled text, placeholders |
| Gray 200 | #e0e0e0 | Borders, dividers |
| Gray 100 | #f0f0f0 | Light backgrounds |
| White | #ffffff | Cards, surfaces |
| Page BG | #f9f9f9 | Page background |
| Highlight BG | #f0f7f4 | Callout backgrounds |
| Error | #dc2626 | Error states |
| Warning | #f59e0b | Warning states |
| Info | #3b82f6 | Info states, secondary actions |

## Typography

| Element | Size | Weight | Color |
|---------|------|--------|-------|
| H1 | 28px | 700 | #1a1a1a |
| H2 | 24px | 600 | #1a1a1a |
| H3 | 20px | 600 | #1a1a1a |
| Body | 15px | 400 | #1a1a1a |
| Body muted | 15px | 400 | #666666 |
| Small | 13px | 400 | #666666 |
| Caption | 11px | 400 | #999999 |
| Label | 14px | 400 | #666666 |
| Value (large) | 24-36px | 600-700 | #1a1a1a |

## Spacing Scale

4px, 8px, 12px, 16px, 20px, 24px, 32px, 40px, 48px

Standard spacing:
- Between sections: 24-32px
- Inside cards: 24px padding
- Between related elements: 12-16px
- Between label and input: 8-12px

## Border Radius

- Small (badges, inputs): 6px
- Medium (badges): 11px
- Large (cards, buttons): 12px
- Full (pills): 9999px

## Components

### Header

​```html
<div class="header">
    <span class="back-arrow">←</span>
    <span class="logo">ETHOS</span>
    <div class="help">
        <span>NEED HELP?</span>
        <span class="help-number">(415) 275-9050</span>
    </div>
</div>

<style>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
}
.back-arrow {
    font-size: 24px;
    color: #333;
    cursor: pointer;
}
.logo {
    font-weight: 600;
    font-size: 20px;
    letter-spacing: 2px;
}
.help {
    text-align: right;
    font-size: 11px;
    color: #666;
}
.help-number {
    display: block;
    font-weight: 600;
    color: #333;
}
</style>
​```

### Progress Bar

​```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 70%"></div>
</div>

<style>
.progress-bar {
    height: 4px;
    background-color: #e0e0e0;
    margin-bottom: 24px;
    border-radius: 2px;
}
.progress-fill {
    height: 100%;
    background-color: #056257;
    border-radius: 2px;
    transition: width 0.3s ease;
}
</style>
​```

### Card

​```html
<div class="card">
    <!-- Card content -->
</div>

<style>
.card {
    background: #ffffff;
    border-radius: 12px;
    padding: 24px;
    margin-bottom: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.06);
}
</style>
​```

### Button (Primary)

​```html
<button class="btn btn-primary">Continue</button>

<style>
.btn {
    width: 100%;
    padding: 16px 24px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: background-color 0.2s ease;
}
.btn-primary {
    background-color: #056257;
    color: #ffffff;
}
.btn-primary:hover {
    background-color: #044a41;
}
.btn-primary:disabled {
    background-color: #e0e0e0;
    color: #999999;
    cursor: not-allowed;
}
</style>
​```

### Button (Secondary)

​```html
<button class="btn btn-secondary">Back</button>

<style>
.btn-secondary {
    background-color: #ffffff;
    color: #1a1a1a;
    border: 1px solid #e0e0e0;
}
.btn-secondary:hover {
    background-color: #f9f9f9;
}
</style>
​```

### Slider Input

​```html
<div class="slider-container">
    <div class="slider-label">Monthly contribution</div>
    <div class="slider-value">
        $<span id="sliderValue">300</span>
        <span class="slider-value-suffix">per month</span>
    </div>
    <input type="range" class="slider" id="slider" min="100" max="500" value="300" step="10">
    <div class="slider-range">
        <span>$100</span>
        <span>$500</span>
    </div>
</div>

<style>
.slider-container {
    margin-bottom: 20px;
}
.slider-label {
    font-size: 14px;
    color: #666666;
    margin-bottom: 8px;
}
.slider-value {
    font-size: 36px;
    font-weight: 700;
    color: #056257;
    margin-bottom: 16px;
}
.slider-value-suffix {
    font-size: 14px;
    font-weight: 400;
    color: #999999;
    margin-left: 4px;
}
.slider {
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background: #e0e0e0;
    outline: none;
    -webkit-appearance: none;
}
.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #056257;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
.slider-range {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    color: #999999;
    margin-top: 8px;
}
</style>

<script>
const slider = document.getElementById('slider');
const sliderValue = document.getElementById('sliderValue');
slider.addEventListener('input', () => {
    sliderValue.textContent = slider.value;
});
</script>
​```

### Metric Row

​```html
<div class="metric-row">
    <div class="metric-left">
        <span class="metric-label">Total contributed</span>
        <span class="metric-sublabel">Over 30 years</span>
    </div>
    <span class="metric-value">$108,000</span>
</div>

<style>
.metric-row {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    padding: 16px 0;
    border-bottom: 1px solid #f0f0f0;
}
.metric-row:last-of-type {
    border-bottom: none;
}
.metric-left {
    display: flex;
    flex-direction: column;
}
.metric-label {
    font-size: 15px;
    color: #333333;
}
.metric-sublabel {
    font-size: 13px;
    color: #999999;
    margin-top: 2px;
}
.metric-value {
    font-size: 24px;
    font-weight: 600;
    color: #1a1a1a;
}
</style>
​```

### Highlight Box

​```html
<div class="highlight-box">
    <div class="highlight-title">Your Growth Potential</div>
    <div class="highlight-text">
        Your contributions could grow to $862,000—that's 8x your investment.
    </div>
</div>

<style>
.highlight-box {
    background-color: #f0f7f4;
    border-left: 3px solid #056257;
    padding: 16px;
    border-radius: 6px;
    margin-top: 20px;
}
.highlight-title {
    font-size: 12px;
    font-weight: 600;
    color: #056257;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 6px;
}
.highlight-text {
    font-size: 15px;
    color: #1a1a1a;
    line-height: 1.4;
}
</style>
​```

### Badge

​```html
<!-- Solid variants -->
<span class="badge badge-primary">Label</span>
<span class="badge badge-dark">Label</span>
<span class="badge badge-gray">Label</span>
<span class="badge badge-info">Label</span>

<!-- Outline variants -->
<span class="badge badge-outline-primary">Label</span>
<span class="badge badge-outline-dark">Label</span>

<style>
.badge {
    display: inline-flex;
    align-items: center;
    padding: 4px 6px;
    border-radius: 11px;
    font-size: 13px;
    font-weight: 500;
}
.badge-primary {
    background-color: #056257;
    color: #ffffff;
}
.badge-dark {
    background-color: #1a1a1a;
    color: #ffffff;
}
.badge-gray {
    background-color: #e0e0e0;
    color: #333333;
}
.badge-info {
    background-color: #3b82f6;
    color: #ffffff;
}
.badge-outline-primary {
    background-color: transparent;
    color: #056257;
    border: 1px solid #056257;
}
.badge-outline-dark {
    background-color: transparent;
    color: #1a1a1a;
    border: 1px solid #1a1a1a;
}
</style>
​```

### Text Input

​```html
<div class="input-group">
    <label class="input-label" for="email">Email address</label>
    <input type="email" class="input" id="email" placeholder="you@example.com">
</div>

<!-- Error state -->
<div class="input-group input-error">
    <label class="input-label" for="email2">Email address</label>
    <input type="email" class="input" id="email2" value="invalid">
    <span class="input-error-message">Please enter a valid email</span>
</div>

<style>
.input-group {
    margin-bottom: 16px;
}
.input-label {
    display: block;
    font-size: 14px;
    font-weight: 500;
    color: #333333;
    margin-bottom: 8px;
}
.input {
    width: 100%;
    padding: 12px 16px;
    font-size: 16px;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s ease;
}
.input:focus {
    border-color: #056257;
}
.input::placeholder {
    color: #999999;
}
.input-error .input {
    border-color: #dc2626;
}
.input-error-message {
    display: block;
    font-size: 13px;
    color: #dc2626;
    margin-top: 6px;
}
</style>
​```

### Disclaimer Text

​```html
<p class="disclaimer">
    Projected values assume a 6% illustrated rate. Actual performance will vary.
</p>

<style>
.disclaimer {
    font-size: 11px;
    color: #999999;
    line-height: 1.4;
    margin-top: 20px;
}
</style>
​```

## Interactive Patterns

### Reactive Calculations

For prototypes with sliders/inputs that update other values:

​```javascript
// Get elements
const slider = document.getElementById('slider');
const output = document.getElementById('output');

// Calculate derived values
function calculate(value) {
    const total = value * 12 * 30;
    const growth = Math.round(total * 2.6);
    return { total, growth };
}

// Update UI
function updateUI() {
    const value = parseInt(slider.value);
    const { total, growth } = calculate(value);
    
    document.getElementById('total').textContent = total.toLocaleString();
    document.getElementById('growth').textContent = growth.toLocaleString();
}

// Listen for changes
slider.addEventListener('input', updateUI);

// Initialize
updateUI();
​```

### Format Helpers

​```javascript
function formatCurrency(amount) {
    return '$' + amount.toLocaleString();
}

function formatCompact(amount) {
    if (amount >= 1000000) return '$' + (amount / 1000000).toFixed(1) + 'M';
    if (amount >= 1000) return '$' + (amount / 1000).toFixed(0) + 'k';
    return '$' + amount;
}
​```

## File Naming

- Use kebab-case: `policy-comparison.html`
- Be descriptive: `iul-growth-calculator.html` not `test1.html`

## Checklist Before Sharing

- [ ] Title tag is descriptive
- [ ] All interactivity works
- [ ] Colors match Ethos palette
- [ ] Tested at 480px and 320px widths
- [ ] No external dependencies (everything inlined)
```

---

## Workflow

### Creating a New Prototype

**In Claude Code:**
```
"Create a new prototype for comparing term vs whole life policies. 
Use the header, cards, and a toggle to switch between views."
```

Claude Code reads CLAUDE.md and builds it with correct patterns.

**Manually:**
1. Copy an existing prototype
2. Modify as needed

### Iterating

**You in Claude Code:**
```
"Add an input field for age that updates the projections"
```

**Stakeholder in Claude chat:**
```
[pastes entire HTML file]
"Change the primary color to blue and add a back button"
```

Both work seamlessly because the source IS the output.

### Sharing

Just send the `.html` file. Done.
- Slack: drag and drop
- Email: attach
- Figma: paste link or screenshot

### Version Control

```bash
git add prototypes/iul-config.html
git commit -m "Add age input, update projections"
git push
```

---

## What Still Needs To Be Provided

### High Priority

1. **Full color palette from Figma** — especially:
   - All brand colors with names
   - Text color hierarchy
   - Any colors I'm missing

2. **Typography from Figma** — especially:
   - Actual font family name (is it a custom font?)
   - Confirm size scale

3. **Design foundation token extraction** — all 15 pages now linked; need screenshots or Dev Mode exports from:
   - **Elevation** — exact shadow values (offsets, blur, spread, color/opacity)
   - **Radius** — full border-radius scale with named tokens
   - **Overlays** — backdrop opacity, blur, color values
   - **Avatar** — sizing, initials vs image, color variants

### Medium Priority

4. **Component coverage** — 11 EDS component pages still to implement (see Mapping section above; need Figma links first)
5. **Functional Icons** — icon set, sizing, usage guidelines (for replacing Unicode placeholders)

---

## EDS Figma Pages – Inventory & Mapping

Inventory of all pages in the Ethos Design System (Figma) for prototyping implementation. Green = form/atom-level, Yellow = layout/navigation, Purple = organism/complex.

### Figma links (canonical nodes for implementation)

#### Design Foundations (atoms / tokens)

| Page | Node ID | Figma link | Prototyping Relevance | Status |
|------|---------|------------|----------------------|--------|
| **Assets** | 40751:10306 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40751-10306) | Low | Not extracted |
| **Avatar** | 40185:55203 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40185-55203) | High | Not extracted — used in Card & Modal, need sizing/color specs |
| **Colors** (tokens) | 39506:35586 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39506-35586) | High | Partially extracted — Teal, Grays, semantic in tokens.css |
| **Decorative Icons** | 39627:28781 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39627-28781) | Low | Not extracted |
| **Elevation** | 39200:8439 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39200-8439) | High | Not extracted — shadow-sm/md/lg are guesses, need exact values |
| **Ethos Logo** | 38888:8401 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=38888-8401) | Medium | Not extracted — logo variants for header component |
| **Functional Icons** | 39627:31718 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39627-31718) | Medium | Not extracted — currently using Unicode (←, ×, ⌕) |
| **Grid and Spacing** (tokens) | 39506:23819 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39506-23819) | High | Partially extracted — spacing scale + layout in tokens.css |
| **Illustrations** | 44008:28650 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=44008-28650) | Low | Not extracted |
| **Media Items** | 39510:25122 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39510-25122) | Low | Not extracted |
| **Overlays** | 39834:30842 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39834-30842) | High | Not extracted — backdrop opacity/blur for Modal & Drawer |
| **Photography** | 40299:58404 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40299-58404) | Low | Not extracted |
| **Radius** | 39065:8736 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39065-8736) | High | Not extracted — radius-sm/md/lg/full may not match Figma |
| **Shapes** | 40825:231 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40825-231) | Low | Not extracted |
| **Typography** (tokens) | 39056:8643 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39056-8643) | High | Partially extracted — font sizes/weights in tokens.css, font family unconfirmed (Cambria/TrinHand?) |

#### Components (molecules / organisms)

| Component | Node ID | Figma link | Status |
|-----------|---------|------------|--------|
| **Input Field** (+ Input Text Area) | 39932:31804 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39932-31804) | Implemented |
| **Toggle** | 39886:31258 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39886-31258) | Implemented |
| **Checkbox** (+ Checkbox Card, forms) | 39612:25952 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39612-25952) | Implemented |
| **Radio Button** (+ Tooltip) | 39622:28187 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39622-28187) | Implemented |
| **Input Dropdown** | 39932:33399 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39932-33399) | Implemented |
| **Button Groups** | 40922:29332 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40922-29332) | Implemented |
| **Card** (+ Modal) | 39557:26616 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39557-26616) | Implemented |
| **Tabs** | 40093:50153 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40093-50153) | Implemented |
| **Drawers** | 41280:23683 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41280-23683) | Implemented |
| **Modals** | 41280:23684 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41280-23684) | Implemented (as Modal) |

*(Node IDs use colon in API, hyphen in URL.)*

#### Molecules

| Page | Node ID | Figma link | Overlaps With | Status |
|------|---------|------------|---------------|--------|
| **Badges** | 40093:48088 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40093-48088) | Badge in CLAUDE.md (legacy) | Not extracted — may have more variants |
| **Banner** | 40209:56952 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56952) | — | Not implemented |
| **Breadcrumbs** | 40209:56956 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56956) | — | Not implemented |
| **Buttons** | 39567:26672 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39567-26672) | Button Groups (implemented), Button primary/secondary in CLAUDE.md | Partially implemented — may have more variants |
| **Carousel Controls** | 40209:56960 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56960) | Carousels (organism, not yet linked) | Not implemented |
| **Content Dividers** | 41466:60351 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41466-60351) | — | Not implemented |
| **Dividers** | 39612:25951 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39612-25951) | — | Not implemented |
| **File Uploads** | 41411:105925 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41411-105925) | — | Not implemented |
| **Inline Alerts** | 40209:56961 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56961) | Highlight Box in CLAUDE.md (legacy) | Not extracted — likely more structured |
| **Lists** | 39948:44623 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39948-44623) | Metric Row in CLAUDE.md (legacy) | Not extracted — likely more variants |
| **Message Bar** | 40209:56953 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56953) | — | Not implemented |
| **Pagination** | 40209:56957 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56957) | — | Not implemented |
| **Progress Indicator** | 40209:56955 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56955) | Progress Bar in CLAUDE.md (legacy) | Not extracted — likely more variants |
| **Progress Steps** | 40390:62733 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40390-62733) | — | Not implemented |
| **Slider** | 40093:48087 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40093-48087) | Slider Input in CLAUDE.md (legacy) | Not extracted — may differ from legacy |
| **Spinner** | 40209:56954 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40209-56954) | — | Not implemented |
| **Tabs** | 40093:50153 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40093-50153) | Tabs (implemented) | Implemented — same node as component |
| **Tags** | 40083:47990 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40083-47990) | Badge in CLAUDE.md (legacy) | Not extracted — may have more variants |
| **Text Pairing** | 39622:26242 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39622-26242) | — | Not implemented |
| **Tooltip** | 40093:70401 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40093-70401) | — | Not implemented |

#### Form Elements

| Page | Node ID | Figma link | Overlaps With | Status |
|------|---------|------------|---------------|--------|
| **Checkbox** | 39612:25952 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39612-25952) | Checkbox (implemented) | Implemented — same node as component |
| **Decorative Radio Buttons** | 39713:30310 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39713-30310) | — | Not implemented — card-style radio options |
| **Input Dropdown** | 39932:33399 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39932-33399) | Input Dropdown (implemented) | Implemented — same node as component |
| **Input Fields** | 39932:31804 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39932-31804) | Input Field (implemented) | Implemented — same node as component |
| **Mobile Takeover** | 46152:7248 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=46152-7248) | — | Not implemented — full-screen mobile pattern |
| **Popovers** | 39934:43130 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39934-43130) | — | Not implemented — floating content panels |
| **Radio Buttons** | 39622:28187 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39622-28187) | Radio Button (implemented) | Implemented — same node as component |
| **Toggle** | 39886:31258 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39886-31258) | Toggle (implemented) | Implemented — same node as component |
| **Search Input** | 39932:42861 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39932-42861) | — | Not implemented — search field with icon |

#### Organisms

| Page | Node ID | Figma link | Overlaps With | Status |
|------|---------|------------|---------------|--------|
| **Accordion** | 40921:2748 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40921-2748) | — | Not implemented |
| **Button Groups** | 40922:29332 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40922-29332) | Button Groups (implemented) | Implemented — same node as component |
| **Cards** | 39557:26616 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=39557-26616) | Card (implemented) | Implemented — same node as component |
| **Chart** | 41829:65665 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41829-65665) | — | Not implemented |
| **Carousels** | 40921:2745 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=40921-2745) | Carousel Controls (molecule) | Not implemented |
| **Drawers** | 41280:23683 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41280-23683) | Drawer (implemented) | Implemented — same node as component |
| **Forms** | 41351:56423 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41351-56423) | — | Not implemented — full form layout patterns |
| **Modals** | 41280:23684 | [Open in Figma](https://www.figma.com/design/MDyfWqupmhziMQSWCOmIV4/Ethos-Design-System--EDS-?node-id=41280-23684) | Modal (implemented) | Implemented — same node as component |

### Inventory Summary

**All EDS Figma pages are now linked.** Total: 52 unique pages across 4 categories.

| Category | Pages | Linked | Implemented | New to build |
|----------|-------|--------|-------------|-------------|
| Foundations (atoms/tokens) | 15 | 15 | 3 partially extracted | 7 high-relevance to extract |
| Molecules | 20 | 20 | 1 (Tabs) | 12 new + 7 overlaps to reconcile |
| Form Elements | 9 | 9 | 5 | 4 new |
| Organisms | 8 | 8 | 4 | 4 new |
| **Total** | **52** | **52** | **13** | **~27 new + 7 reconcile** |

### Mapping to prototyping system

**Implemented as component files (10):** Button Groups, Input Field, Toggle, Checkbox, Radio Button, Input Dropdown, Card, Modal, Tabs, Drawer.

**Documented in CLAUDE.md (legacy snippets):** Header, Progress Bar, Slider Input, Metric Row, Highlight Box, Badge, Text Input, Disclaimer.

**Foundation tokens to extract (7 high-relevance):** Avatar, Colors (expand), Elevation, Grid and Spacing (expand), Overlays, Radius, Typography (expand).

**Molecule overlaps to reconcile with legacy snippets (7):** Badges, Buttons, Inline Alerts, Lists, Progress Indicator, Slider, Tags.

**New components to implement (20):**
- Molecules: Banner, Breadcrumbs, Carousel Controls, Content Dividers, Dividers, File Uploads, Message Bar, Pagination, Progress Steps, Spinner, Text Pairing, Tooltip
- Form Elements: Decorative Radio Buttons, Mobile Takeover, Popovers, Search Input
- Organisms: Accordion, Chart, Carousels, Forms

**Implementation order (suggested):**
1. Extract foundation tokens from high-relevance pages (Elevation, Radius, Overlays, Avatar) into `tokens.css` + CLAUDE.md
2. Reconcile molecule overlaps with legacy snippets (Badges, Buttons, Inline Alerts, Lists, Progress Indicator, Slider, Tags)
3. Build high-use new components (Accordion, Search Input, Tooltip, Banner, Inline Alerts, Dividers, Progress Steps, Forms)
4. Build lower-priority components (Breadcrumbs, Pagination, File Uploads, Message Bar, Carousel Controls, Carousels, Content Dividers, Spinner, Decorative Radio Buttons, Mobile Takeover, Popovers, Chart, Text Pairing)

---

## Next Steps in Claude Code

1. ~~Create the folder structure~~ Done
2. ~~Add CLAUDE.md~~ Done
3. ~~Add tokens.css as reference~~ Done
4. ~~Document EDS pages~~ **Done — all 52 Figma pages linked across foundations, molecules, form elements, and organisms**
5. ~~Implement initial component HTML files~~ Done (10 components)
6. ~~Create component demos~~ Done (mobile + desktop)
7. ~~Add foundation token structure~~ **Done** — Elevation, Radius, Overlays, Avatar added to `tokens.css`, CLAUDE.md, and GUIDELINES.md with Figma node links. Replace placeholder values with exact EDS values from Figma (Dev Mode or screenshots) when available.
8. ~~Reconcile molecule overlaps with legacy CLAUDE.md snippets~~ **Done** — Created `badge.html`, `progress-bar.html`, `slider-input.html`, `metric-row.html`, `highlight-box.html`, `header.html`, `disclaimer.html`; updated CLAUDE.md with Legacy vs EDS mapping table and Figma links.
9. ~~Build remaining components~~ **Done** — Accordion, Search Input, Tooltip, Banner, Dividers, Progress Steps, Breadcrumbs, Pagination, File Upload, Message Bar, Carousel, Spinner, Decorative Radio, Text Pairing, Chart, Popover added as component files and integrated into `eds-components-mobile.html` and `eds-components-desktop.html` with full interactivity.
10. Recreate IUL prototype using the documented patterns
11. Test the workflow: create a new prototype from scratch

---

## Context

- **User:** Juan, Product at Ethos (insurtech)
- **Use case:** Rapid interactive mobile prototypes for IUL and other insurance products
- **Stakeholders:** Leaders who iterate in Claude chat, engineers who reference for implementation
- **Key requirement:** Shareable without hosting, editable by anyone with Claude access
