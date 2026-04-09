# Ethos Design System

## 1. Visual Theme & Atmosphere

Ethos is a life insurance company that replaces the intimidating, institutional feel of traditional insurance with warmth, clarity, and trust. The visual system centers on **Cypress green** (`#056257`) — a deep, confident teal-green that communicates stability without feeling corporate. It's paired with generous whitespace, soft shadows, and a type system that balances authority (Portada for headlines) with approachability (Hauss for body text).

The overall impression is calm, modern, and human — closer to a fintech product than an insurance company. Surfaces are clean and white, accents are purposeful, and the UI never overwhelms. Every screen should feel like a conversation, not a form.

**Key Characteristics:**
- Cypress green (`#056257`) as the singular brand accent — used for CTAs, active states, and emphasis
- Portada (weight 600) for headlines — a warm serif with geometric structure
- Hauss (weight 400/500) for body and UI — a clean, highly legible sans-serif
- White surfaces with subtle gray borders and soft multi-layer shadows
- Conservative border-radius (8px standard) — rounded but not playful
- Warm neutral grays (Night scale) instead of blue-tinted grays
- Material Icons (outlined) for iconography
- Mobile-first responsive design with phone/tablet/laptop/desktop breakpoints

## 2. Color Palette & Roles

### Primary Brand
- **Cypress** (`#056257`): Primary accent. CTAs, links, active states, progress indicators. The heart of the brand.
- **Dark Cypress** (`#05594f`): Hover states on primary elements, emphasis.
- **Bright Cypress** (`#078476`): Secondary accent, lighter interactive elements.
- **Light Cypress** (`#e3f8f6`): Tinted surfaces, selected state backgrounds.
- **White Cypress** (`#f5fffe`): Barely-there tint for subtle surface differentiation.

### Primary Scale (for fine-grained usage)
| Token | Hex | Use |
|-------|-----|-----|
| PrimaryCypress5 | `#f3f7f7` | Lightest tinted background |
| PrimaryCypress10 | `#e6efee` | Subtle highlight |
| PrimaryCypress15 | `#dae7e6` | Focus ring fill |
| PrimaryCypress25 | `#c0d8d5` | Muted accent |
| PrimaryCypress50 | `#82b0ab` | Disabled accent |
| PrimaryCypress75 | `#438981` | Secondary accent |
| PrimaryCypress100 | `#056257` | Core brand color |
| PrimaryCypress125 | `#05594f` | Hover/emphasis |
| PrimaryCypress150 | `#04463e` | Strong emphasis |
| PrimaryCypress175 | `#033630` | Deep emphasis |
| PrimaryCypress200 | `#022925` | Darkest brand |

### Secondary Colors
- **Spearmint** (`#0a9742`): Success, positive outcomes, approvals.
- **Ocean** (`#336cc3`): Informational, links in neutral contexts, help text.
- **Salamander** (`#f26d00`): Warnings, attention, urgency without alarm.

### Neutrals — Night Scale (Cool Grays)
| Token | Hex | Use |
|-------|-----|-----|
| Night-5 | `#f4f4f4` | Subtle backgrounds, disabled surfaces |
| Night-10 | `#e9e9e9` | Borders, dividers |
| Night-20 | `#d4d4d4` | Default input borders |
| Night-40 | `#a9a9a9` | Muted text, placeholders |
| Night-60 | `#7e7e7e` | Secondary text, hints |
| Night-80 | `#525252` | Tertiary headings |
| Night-100 | `#272727` | Primary text, headings |

### Neutrals — Truffle Scale (Warm Grays)
- Truffle-5 (`#fdfdfb`) through Truffle-100 (`#d8d4b2`): Used for warm surface tints and decorative backgrounds.

### Decorative
- **Citrine** (`#e7fd7f`): Highlight, decorative accent, badges. A bright yellow-green.
- **Dark Citrine** (`#c6e04a`): Citrine emphasis.
- **Clover** (`#34dc91`): Positive decorative, illustrations.
- **Bright Clover** (`#59f8b1`): Light decorative accent.
- **Neptune** (`#0b4368`): Dark blue for contrast sections, illustrations.
- **Peachy** scale: Warm decorative tints for cards and backgrounds.
- **Lime** scale: Fresh green decorative tints.

### Utility / Status
| Status | Solid | Use |
|--------|-------|-----|
| Error | `#f44b40` (Carmine Red) | Validation errors, destructive actions |
| Warning | `#f49640` (Royal Orange) | Warnings, caution states |
| Success | `#056257` (Cypress) | Success confirmations |
| Info | `#336cc3` (Ocean) | Informational messages |

### Semantic Theme Tokens (CSS Variables)
Use these for all UI surfaces — they enable future theming:

**Backgrounds:**
- `--theme-bg-surface`: `#ffffff` — Cards, panels, modals
- `--theme-bg-subtle`: `#f4f4f4` — Secondary surfaces
- `--theme-bg-muted`: `#d4d4d4` — Muted/disabled surfaces
- `--theme-bg-canvas`: `#a9a9a9` — Deep background
- `--theme-bg-hover`: `#a9a9a9` — Hover states
- `--theme-bg-hover-light`: `#e9e9e9` — Light hover states

**Foreground (Text):**
- `--theme-fg-default`: `#272727` — Primary text
- `--theme-fg-subtle`: `#525252` — Secondary text
- `--theme-fg-subtle-2x`: `#7e7e7e` — Tertiary/hint text
- `--theme-fg-subtle-3x`: `#a9a9a9` — Placeholder text
- `--theme-fg-disabled`: `#7e7e7e` — Disabled text
- `--theme-fg-strongest`: `#000000` — Maximum contrast

**Accent:**
- `--theme-accent-default`: `#056257` — Primary interactive
- `--theme-accent-emphasis`: `#04463e` — Hover/active
- `--theme-accent-emphasis-2x`: `#033630` — Pressed
- `--theme-accent-subtle`: `#82b0ab` — Muted accent
- `--theme-accent-on-accent`: `#ffffff` — Text on accent backgrounds

**Borders:**
- `--theme-border-default`: Night-20 — Standard borders
- `--theme-border-subtle`: Night-5 — Light borders
- `--theme-border-emphasis`: Night-40 — Strong borders

**Input:**
- `--theme-input-border-default`: `#d4d4d4`
- `--theme-input-border-hover`: `#d4d4d4`
- `--theme-input-fg-placeholder`: `#7e7e7e`
- `--theme-input-fg-filled`: `#272727`

## 3. Typography Rules

### Font Families
- **Portada** (serif): Headlines, display text, hero copy. Warm, authoritative, distinctive.
- **Hauss** (sans-serif): Body text, UI elements, buttons, labels, inputs. Clean, modern, highly legible.
- **Material Icons**: Iconography (filled, outlined, round variants).

### Headline Hierarchy (Portada)

| Role | Size (Desktop) | Size (Mobile) | Weight | Line Height | Letter Spacing |
|------|---------------|---------------|--------|-------------|----------------|
| Display XL | 86px | 52px | 600 | 104px / 60px | -2% |
| Display L | 69px | 44px | 600 | 84px / 52px | -2% |
| Display M | 44px | 35px | 600 | 56px / 44px | -2% |
| Title L | 35px | 28px | 600 | 44px / 36px | -1% |
| Title M | 28px | 23px | 600 | 36px / 28px | -1% |
| Title S | 23px | 18px | 500 | 28px / 24px | -1% |
| Title XS | 18px | 16px | 700 | 24px / 22px | 0% |

### Body & UI Hierarchy (Hauss)

| Role | Size | Weight | Line Height | Letter Spacing | Use |
|------|------|--------|-------------|----------------|-----|
| Text 2XL | 35px | 400 | 44px | 0% | Large feature text |
| Text XL | 28px | 400 | 36px | 0% | Subheadings |
| Text L | 23px | 400 | 28px | 0% | Lead paragraphs |
| Text M | 18px | 400 | 24px | 0% | Standard body |
| Text S | 14px | 400 | 20px | 0% | Small body, captions |
| Text XS | 12px | 400 | 20px | 0% | Fine print, metadata |
| Label | 12px | 500 | 18px | 0.75% | Form labels, tags |
| Eyebrow L | 12px | 500 | 18px | 8% | Section labels (uppercase) |
| Eyebrow S | 10px | 500 | 14px | 6% | Small labels (uppercase) |
| Legal | 10px | 400 | 14px | 0.75% | Disclaimers, legal text |

### Font Weights
| Weight | Name | Use |
|--------|------|-----|
| 400 | Regular | Body text, descriptions |
| 500 | Medium | UI elements, buttons, labels, navigation |
| 600 | Semibold | Headlines (Portada) |
| 700 | Bold | Emphasis, Title XS, strong labels |

### Principles
- Portada headlines create warmth and trust — they feel human, not corporate
- Hauss body text prioritizes legibility — it disappears in service of content
- Negative letter-spacing (-2% to -1%) on headlines keeps them tight and modern
- Positive letter-spacing (0.75%–8%) on labels and eyebrows aids scannability at small sizes
- Never use NewTheinhardt or Cambon — they are legacy fonts from EDS v1

## 4. Component Styling

### Buttons

**Primary (Cypress)**
- Background: `#056257`
- Text: `#ffffff`
- Hover: `#05594f`
- Radius: 8px
- Font: Hauss, weight 500
- Sizes: xs (28px), sm (36px), md (48px), lg (64px), xl (80px)
- Use: Primary CTA — "Get my quote", "Continue", "Apply now"

**Primary Dark**
- Background: `#04463e`
- Text: `#ffffff`
- Use: CTAs on light green backgrounds

**Secondary (Gray Outline)**
- Background: transparent
- Border: 1px solid Night-20
- Text: Night-100
- Hover: Night-5 background
- Use: Secondary actions — "Learn more", "Go back"

**Black Solid**
- Background: Night-100 (`#272727`)
- Text: `#ffffff`
- Use: High-contrast alternative CTA

**Salamander**
- Background: `#f26d00`
- Text: `#ffffff`
- Use: Urgent/attention actions

**Link**
- Background: transparent
- Text: `#056257`
- Decoration: underline
- Use: Inline text links, tertiary actions

**Button Sizes:**
| Size | Height | Font Size | Padding |
|------|--------|-----------|---------|
| xs | 28px | 12px | compact |
| sm | 36px | 14px | 8px 16px |
| md | 48px | 16px | 12px 20px |
| lg | 64px | 18px | 16px 24px |
| xl | 80px | 24px | 20px 32px |

### Inputs

**Text Input**
- Background: `#ffffff`
- Border: 1px solid `#d4d4d4`
- Focus: 1px solid `#056257` + focus ring (`0px 0px 0px 4px #dae7e6`)
- Error: 1px solid `#f44b40` + error ring (`0px 0px 0px 4px #fde4e2`)
- Label: Night-100, 12px Hauss medium
- Placeholder: `#7e7e7e`
- Input text: `#272727`
- Sizes: sm (48px), md (56px), lg (80px)
- Radius: 8px
- Supports: leading/trailing Material Icons, mask input, hint text, error message

### Cards & Containers
- Background: `#ffffff`
- Border: 1px solid Night-10 (`#e9e9e9`)
- Radius: 8px (standard), 16px (featured)
- Shadow: `--shadow-md` for standard, `--shadow-lg` for elevated
- Padding: 16px–24px

### Badges
- Radius: full pill (50px)
- Sizes: sm (20px), md (24px), lg (28px)
- Variants: solid (filled bg), light (tinted bg), outline (border only)
- Colors: primary (Cypress), black, gray, info (Ocean), warning (Salamander), error (Carmine Red), success (Spearmint)

### Modals
- Background: `#ffffff`
- Overlay: semi-transparent black
- Radius: 16px
- Max width: 400px (desktop), full-width with bottom sheet (mobile)
- Padding: 24px (desktop), 16px (mobile)
- Shadow: `--shadow-2xl`
- Supports: title, variant icon (success/error/warning/info), action buttons, outside click dismiss

### Alerts
- Variants: default, success, info, warning, error
- Each has an icon, title, and optional description
- Background: tinted variant color at 5% opacity
- Border-left: 3px solid variant color

### Progress Bar
- Height: 8px
- Background: Night-10
- Fill: `#056257` (Cypress)
- Supports: rounded variant, tooltip with percentage

### Accordion
- Clean expand/collapse with icon left or right
- Border-bottom separator between items
- Content area with standard body text

## 5. Layout Principles

### Spacing Scale
| Token | Value | Use |
|-------|-------|-----|
| `--spacing-xxs` | 2px | Micro adjustments |
| `--spacing-xs` | 4px | Icon gaps, tight spacing |
| `--spacing-sm` | 8px | Compact element spacing |
| `--spacing-md` | 12px | Default inner padding |
| `--spacing-lg` | 16px | Standard spacing (base unit) |
| `--spacing-xl` | 20px | Comfortable spacing |
| `--spacing-2xl` | 24px | Section inner padding |
| `--spacing-3xl` | 32px | Section gaps |
| `--spacing-4xl` | 64px | Major section separation |

### Sizing Scale
| Token | Value | Use |
|-------|-------|-----|
| `--sizing-xs` | 24px | Small icons, indicators |
| `--sizing-sm` | 32px | Compact controls |
| `--sizing-md` | 40px | Default control height |
| `--sizing-lg` | 48px | Standard input/button |
| `--sizing-xl` | 64px | Large controls |

### Grid & Container
- Mobile-first approach
- Content max-width: ~1200px on desktop
- Generous padding on mobile (16px sides)
- Single column on phone, 2-column on tablet, multi-column on desktop
- Insurance forms: single-column centered layout, max-width 480px for focused input

### Whitespace Philosophy
- **Breathing room matters**: Life insurance is a serious topic — whitespace creates calm and reduces cognitive load.
- **Progressive disclosure**: Show one question at a time on mobile. Don't overwhelm.
- **Visual hierarchy through space**: Use 32px–64px between sections, 8px–16px between related elements.

### Border Radius Scale
| Token | Value | Use |
|-------|-------|-----|
| `--radii-0` | 2px | Subtle rounding |
| `--radii-1` | 4px | Small elements |
| `--radii-2` | 8px | Buttons, inputs, cards (standard) |
| `--radii-4` | 16px | Modals, featured cards |
| `--radii-5` | 32px | Large pills |
| `--radii-6` | 50px | Badges, tags |
| `--radii-7` | 100px | Full pill buttons |

## 6. Depth & Elevation

| Level | Shadow | Use |
|-------|--------|-----|
| Level 0 (Flat) | None | Page background, inline elements |
| Level 1 (XS) | `0px 1px 2px 0px #1018280d` | Subtle lift, hover hint |
| Level 2 (SM) | `0px 1px 2px 0px #1018280f, 0px 1px 3px 0px #1018281a` | Cards, list items |
| Level 3 (MD) | `0px 2px 4px -2px #1018280f, 0px 4px 8px -2px #1018281a` | Dropdowns, elevated cards |
| Level 4 (LG) | `0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814` | Popovers, floating elements |
| Level 5 (XL) | `0px 8px 8px -4px #10182808, 0px 20px 24px -4px #10182814` | Modals, dialogs |
| Level 6 (2XL) | `0px 24px 48px -12px #1018282e` | Toast notifications |
| Level 7 (3XL) | `0px 32px 64px -12px #10182824` | Fullscreen overlays |

### Focus Rings
| Context | Ring | Use |
|---------|------|-----|
| Primary | `0px 0px 0px 4px #dae7e6` | Default focus on interactive elements |
| Gray | `0px 0px 0px 4px #f4f4f4` | Focus on neutral elements |
| Info | `0px 0px 0px 4px #e0e9f6` | Focus on info-styled elements |
| Warning | `0px 0px 0px 4px #f3e7da` | Focus on warning elements |
| Error | `0px 0px 0px 4px #fde4e2` | Focus on error-state elements |

### Shadow Philosophy
Ethos shadows use a neutral warm tone (`#101828` base) with very low opacity, creating soft, natural elevation. Negative spread values keep shadows tight and controlled. The system avoids dramatic depth — everything should feel grounded and trustworthy.

## 7. Do's and Don'ts

### Do
- Use **Hauss** for all body text, UI labels, buttons, and form elements
- Use **Portada** for all headlines, display text, and hero copy
- Use `#056257` (Cypress) as the primary interactive color for CTAs, links, and active states
- Use Night-100 (`#272727`) for primary text — never pure black (`#000000`)
- Use the semantic theme CSS variables (`--theme-*`) for all colors to enable theming
- Use the spacing scale (`--spacing-*`) for consistent rhythm
- Keep border-radius at 8px for standard elements (buttons, inputs, cards)
- Use Material Icons (outlined variant) for all iconography
- Design mobile-first — single column, one question at a time for forms
- Use focus rings on all interactive elements for accessibility
- Use soft, multi-layer shadows — the UI should feel calm, not dramatic

### Don't
- Don't use NewTheinhardt or Cambon — they are legacy EDS v1 fonts
- Don't hardcode hex colors — always use CSS variables or design tokens
- Don't use pure black (`#000000`) for text — use Night-100 (`#272727`)
- Don't use border-radius larger than 16px on cards or containers
- Don't use Salamander orange for primary CTAs — it's for warnings and urgency only
- Don't use heavy shadows (high opacity, large blur) — keep elevation subtle
- Don't use positive letter-spacing on headlines — Portada tracks tight (-2% to -1%)
- Don't mix serif (Portada) into body text — it's for headlines only
- Don't use more than one accent color per screen — Cypress carries the brand
- Don't skip the focus ring on interactive elements — accessibility is non-negotiable
- Don't crowd the UI — life insurance decisions need breathing room

## 8. Responsive Behavior

### Breakpoints
| Name | Range | Key Changes |
|------|-------|-------------|
| Phone | 0–599px | Single column, stacked layout, bottom-sheet modals, 16px side padding |
| Tablet | 600–899px | 2-column grids, expanded padding, side-by-side buttons |
| Laptop | 900–1199px | Full card grids, sidebar layouts possible |
| Desktop | 1200px+ | Maximum content width, generous margins, multi-column |

### Typography Scaling
- Display XL: 86px (desktop) → 52px (mobile)
- Display L: 69px → 44px
- Display M: 44px → 35px
- Title L: 35px → 28px
- Title M: 28px → 23px
- Body sizes remain consistent across breakpoints

### Collapsing Strategy
- **Forms**: Always single-column, centered, max-width 480px on all breakpoints
- **Hero sections**: Reduce headline size, stack CTA buttons vertically on mobile
- **Cards**: 3-column → 2-column → single stacked column
- **Modals**: Centered dialog (desktop) → bottom sheet pinned to bottom (mobile)
- **Navigation**: Horizontal links → hamburger menu
- **Section spacing**: 64px → 32px on mobile
- **Buttons**: Full-width on mobile, auto-width on desktop

### Touch Targets
- Minimum 48px touch target on mobile (md button size)
- Inputs are 56px (md) on mobile for comfortable tapping
- Adequate spacing (8px minimum) between tappable elements

## 9. Agent Prompt Guide

### Quick Color Reference
| Role | Color | Hex |
|------|-------|-----|
| Primary CTA | Cypress | `#056257` |
| CTA Hover | Dark Cypress | `#05594f` |
| Background | White | `#ffffff` |
| Heading text | Night-100 | `#272727` |
| Body text | Night-80 | `#525252` |
| Muted text | Night-60 | `#7e7e7e` |
| Placeholder | Night-40 | `#a9a9a9` |
| Border | Night-20 | `#d4d4d4` |
| Subtle bg | Night-5 | `#f4f4f4` |
| Error | Carmine Red | `#f44b40` |
| Warning | Royal Orange | `#f49640` |
| Success | Spearmint | `#0a9742` |
| Info | Ocean | `#336cc3` |

### EDS v2 Component Import
```tsx
import {
  Button, Input, CheckboxInput, RadioButton, SquareRadioButton,
  Badge, Banner, Modal, Accordion, Icon, ProgressBar, ProgressSteps,
  Spinner, Stepper, Dropdown, SearchSelectInput, Tooltip, Alert,
  TextArea, FileUpload, ToggleComponent, ContentCheckboxInput, MessageBar
} from '@getethos/ethos-design-system-v2';
```

### Example Component Prompts

**Insurance form screen:**
"Create a single-column form centered at max-width 480px. Portada Title M (28px, weight 600, -1% tracking) for the question. Hauss Text M (18px) for the description in Night-60. Use EDS v2 Input components at md size (56px height) with labels. Primary Button (Cypress, md size, full-width on mobile). Progress bar at top showing completion percentage."

**Hero section:**
"White background. Portada Display M (44px desktop, 35px mobile, weight 600, -2% tracking, Night-100 text). Hauss Text L (23px, Night-60) for subtitle. Two buttons: primary Cypress CTA (md size) and secondary grayOutline (md size). 64px vertical spacing between hero and next section."

**Card grid:**
"White cards with 1px solid #e9e9e9 border, 8px radius, shadow-sm. Portada Title S (23px, weight 500) for card title. Hauss Text S (14px, Night-60) for description. 24px internal padding. 3-column grid on desktop, 2 on tablet, stacked on mobile with 16px gap."

**Success confirmation:**
"Use EDS v2 Modal with variant='success'. Portada Title M (28px) for 'You're all set'. Hauss Text M (18px, Night-60) for the confirmation message. Primary Button to continue. Spearmint green (#0a9742) check icon."

### Iteration Guide
1. Always reach for EDS v2 components first — Button, Input, Modal, Badge, etc.
2. Use Portada for any text that functions as a headline or title
3. Use Hauss for everything else — body, labels, buttons, navigation
4. Cypress green is the only accent color for interactive elements
5. Use `--theme-*` CSS variables for colors, never hardcoded hex in component styles
6. Default border-radius is 8px — use 16px only for modals and featured cards
7. Shadows are soft and low-opacity — the UI should feel grounded, not floating
8. Mobile forms: one question per screen, single column, full-width buttons
9. Always include focus rings and proper disabled states for accessibility
10. When in doubt, add more whitespace — calm and clarity over density
