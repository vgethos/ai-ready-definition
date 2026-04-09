# Presentation Slide Design Guidelines

These guidelines define the visual quality bar for all presentation slides. The reference implementation is `prototypes/ai-show-n-tell/components/InsurabilityScore.tsx` — every slide should match that level of craft.

---

## 1. Typography

**DO:**
- Use `font-serif` for slide titles/headings (one per slide, `text-3xl` to `text-6xl`)
- Use the sans-serif stack for all body text, labels, and captions
- Use `text-[14px]` for primary body text, `text-[13px]` for secondary, `text-[11px]` for uppercase labels
- Set uppercase labels with `tracking-[1px]` to `tracking-[1.5px]` and `font-medium`
- Quote text in display contexts: use `&ldquo;` / `&rdquo;` curly quotes, italic, `text-ink-60`

**DON'T:**
- Mix multiple heading sizes on one slide
- Use `text-lg` / `text-xl` for body content — keep body at `14px` and let the heading carry the weight
- Use bold (`font-bold`) on body text — use `font-medium` or `font-semibold` sparingly

**Reference pattern (InsurabilityScore):**
```tsx
<h1 className="font-serif text-[26px] text-ink leading-tight mb-1.5">
<p className="text-[14px] text-ink-60 leading-relaxed">
<div className="text-[11px] text-ink-40 uppercase tracking-[1.5px] font-medium mb-3.5">
```

---

## 2. Color Usage

Use ONLY these semantic color tokens. No hex codes in components.

| Token | Use for |
|---|---|
| `text-ink` | Primary headings, high-emphasis text |
| `text-ink-60` | Body text, descriptions |
| `text-ink-40` | Captions, labels, secondary metadata |
| `text-cypress` | Accent text, scores, positive indicators |
| `text-cypress-light` | Terminal highlights (on dark bg only) |
| `text-white` | Text on dark/cypress backgrounds |
| `bg-[#f5f5f5]` | Slide background (every slide) |
| `bg-white` | Cards, content containers |
| `bg-ink` | Dark panels (terminal mockups) |
| `bg-ink-80` | Terminal chrome bars |
| `bg-cypress` | Level badges, primary accent fills |
| `bg-subtle-2x` | Subtle pill backgrounds, progress bar tracks |
| `bg-cypress/10` | Soft accent backgrounds (active states) |
| `border-cypress/20` | Subtle accent borders |

**DON'T:**
- Use raw hex codes like `#056257` in JSX — use `bg-cypress` or `text-cypress`
- Use opacity modifiers below `/10` — they're invisible on screen
- Use `shadow-lg` or `shadow-2xl` — keep shadows to `shadow-sm` for cards. The reference uses zero card shadows; let bg contrast do the work

---

## 3. Layout & Spacing

**Every slide** uses this outer shell:
```tsx
<div className="h-screen w-screen flex flex-col items-center justify-center p-12 bg-[#f5f5f5]">
```

**Content containers** should be width-constrained:
- Max `max-w-[480px]` for single-column content (like the reference's `max-w-[375px]`)
- Max `max-w-[700px]` for wide layouts (terminal mockups, multi-column)
- Never let content span the full viewport width

**Spacing rhythm — use the reference's spacing:**
- `mb-1.5` between heading and subtext
- `mb-6` or `mb-7` between major sections
- `mb-3.5` between a label and its content list
- `gap-4` between list items (factor rows in the reference)
- `px-5 py-3` for header bars
- `px-6 pt-4` for main content areas

**DON'T:**
- Use `mb-8`, `mb-10`, `mb-12`, `mb-14` between elements — these are too large and make slides feel empty. The reference never exceeds `mb-7`.
- Use different padding values in similar positions across slides
- Set card widths with arbitrary px values (`w-[160px]`, `w-[240px]`) — use max-width constraints instead

---

## 4. Cards & Containers

**Reference pattern:**
```tsx
<div className="w-full max-w-[375px] mx-auto bg-white min-h-screen">
```

**Presentation cards should feel like the factor rows, not like dashboard widgets:**

Good (data-dense, purposeful):
```tsx
<div className="flex justify-between mb-1.5">
  <span className="text-[14px] text-ink font-medium">{label}</span>
  <span className="text-[13px] text-cypress font-medium">{rating}</span>
</div>
<div className="rounded-full bg-subtle-2x overflow-hidden" style={{ height: 6 }}>
  <motion.div className="h-full rounded-full bg-cypress" ... />
</div>
```

Bad (generic card grid):
```tsx
<div className="bg-white rounded-xl shadow-sm p-8 flex flex-col items-center text-center w-[240px]">
  <Icon className="w-7 h-7 text-cypress mb-4" />
  <h3 className="text-base font-semibold">{title}</h3>
  <p className="text-sm text-ink-40">{description}</p>
</div>
```

The bad pattern produces slides that look like every AI-generated deck: icon + title + description in a centered card. **Avoid this pattern entirely.**

**Instead, use:**
- **Row-based layouts** (label left, value right, bar below) — like the factor rows
- **Terminal mockups** for process/flow content — but make them feel real (see section 6)
- **Single hero elements** with supporting text — like the score ring
- **Compact data lists** rather than spread-out card grids

---

## 5. Animation

**Use the reference's exact motion system:**

```tsx
const EASE = [0.22, 1, 0.36, 1] as const;
```

**Entrance patterns:**
- Fade + Y offset for text: `initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}`
- Fade + scale for focal elements: `initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}`
- Fade + X offset for list items: `initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}`

**Stagger pattern (from reference):**
```tsx
transition={{ duration: 0.35, ease: EASE, delay: 1.4 + i * 0.1 }}
```
- `0.1s` between items in a list
- Start delay relative to the parent element's entrance
- Duration `0.35s` for list items, `0.4-0.5s` for larger elements, `0.6-0.8s` for hero elements

**SVG ring/bar animation:**
```tsx
transition={{ duration: 0.8, ease: EASE, delay: 1.5 + i * 0.1 }}
```
- Bars/rings: `0.8s` duration, smooth ease
- Use `strokeDasharray` + `strokeDashoffset` for ring reveals

**DON'T:**
- Use spring animations except for the hero element (score ring entrance uses `type: "spring"`, nothing else does)
- Use durations longer than `1.2s` — the reference's longest animation is `1.2s`
- Animate SVG `pathLength` — it's unreliable. Use `strokeDashoffset` instead
- Over-animate. If an element doesn't need to animate, don't animate it. Static is fine.

---

## 6. Terminal Mockups

Terminal slides should feel like a real terminal, not a code block with window chrome.

**DO:**
```tsx
<div className="w-[700px] bg-ink rounded-2xl overflow-hidden">
  {/* Chrome bar */}
  <div className="flex items-center gap-2 px-4 py-3 bg-ink-80 border-b border-white/10">
    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
    <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
  </div>
  {/* Content */}
  <div className="px-5 py-4 font-mono text-sm leading-relaxed">
```

**Content guidelines for terminal text:**
- Commands: `text-cypress-light` with `$ ` prefix
- Status/progress lines: `text-cypress-light`, use real-looking checkmarks (`✓`)
- Results: `text-white`
- Don't right-align checkmarks to a fixed column — use natural spacing. Real terminals don't have columns.
- Keep terminal content to 8-12 lines max. More than that is unreadable on screenshare.

**DON'T:**
- Use `shadow-lg` on terminal windows — the dark bg provides enough contrast
- Put interactive buttons inside terminal mockups
- Mix terminal content with non-terminal content on the same slide

---

## 7. Interactive Reveal (Progressive Disclosure)

Some slides use keyboard handlers to reveal content step-by-step. This is appropriate for:
- The ladder slide (reveal levels one by one)
- The closing slide (accumulate skills)

**Rules for reveal slides:**
- Maximum 5 reveal steps per slide. More than that = split into multiple slides.
- The reveal handler must use capture phase (`addEventListener("keydown", handler, true)`) to fire before SlideController
- Always support backward (`ArrowLeft`) to undo reveals
- Let the event pass through to SlideController when all steps are revealed (forward) or none remain (backward)

**DON'T use progressive reveal for:**
- Slides where all content should be visible simultaneously (most L4 slides)
- Content that needs to be compared side by side (milestones, agent roster)
- The L4GoalSlide currently has 6 reveal steps — this is too many. It should be 2-3 max, or just auto-animate on entrance.

---

## 8. Slide Content Density

**Each slide should have ONE focal element:**
- TitleSlide: The headline
- LadderSlide: The staircase
- L3ToolSlide: The split-screen (browser + terminal)
- L4DiscoverySlide: The terminal
- L4MilestonesSlide: The milestone list
- L4TeamSlide: The team diagram
- ClosingSlide: The accumulating pills

**Signs a slide is overloaded:**
- Multiple visual "zones" competing for attention (e.g., a diagram AND a timeline AND agent cards)
- More than 3 levels of visual hierarchy on one slide
- Text that requires reading, not scanning (more than ~20 words in any single block)
- Custom SVG with hardcoded pixel positions (brittle, breaks at different resolutions)

**The L4TeamSlide is the worst offender:** It has a focal card, SVG bidirectional arrows with marker definitions, three agent cards, AND a 5-step iteration timeline. This should be 2 slides: one for the team structure, one for the review loop concept. Or better: cut the iteration timeline entirely — the script says "two, three, four rounds" verbally. The slide should show the team and the bidirectional arrows, nothing more.

---

## 9. L4 Section: Slide-by-Slide Specification

L4 is the hero of the presentation. It gets the most time (~3.5 minutes) and the most slides. The current L4 slides are too simplified and abstract. They need to tell the STORY of how orchestration actually works, step by step, revealing a new layer of sophistication on each slide.

**Delete all existing L4 slides** (L4IntroSlide, L4GoalSlide, L4DiscoverySlide, L4MilestonesSlide, L4TeamSlide, L4ReviewSlide) and replace with the following:

---

### Slide L4-1: The Goal

**Purpose:** Establish the starting point. Everything begins with a fuzzy, vague goal.

**Content:**
- "Level 4" badge + "Multi-Agent Orchestration" title
- A single prominent quote in the center:
  > "Create a nice presentation about how I work with AI for the Thursday morning company all-hands show and tell."
- Small label above the quote: "The Goal"
- Below: "This is fuzzy. It can be achieved in many ways."

**Visual approach:** Minimal. One focal element (the goal text). Let the vagueness of the goal speak for itself. No diagrams, no icons. Just the words.

---

### Slide L4-2: Goal → Milestones

**Purpose:** Show how the strategic agent breaks the fuzzy goal into concrete, sequential milestones.

**Content:**
- The goal at the top (smaller now, receding into context)
- A "Director Agent" node below it
- Arrow down to 3 milestones in a vertical or stepped layout:
  1. "Find the right narrative" — what's the message?
  2. "Create the presentation structure" — script, outline, storyboard
  3. "Visual polish & delivery prep" — animations, timing, rehearsal
- Visual emphasis: milestones are sequential. Milestone 1 enables 2, 2 enables 3. Show this with arrows or a connected flow.
- Caption: "Fuzzy goal → well-defined, sequential milestones. Each one is a self-contained body of work."

**Visual approach:** Use the factor-row pattern (label left, brief description right) rather than card grid. Show sequence, not parallelism.

**Key message (spoken):** "We took something pretty fuzzy and vague and turned it into something that's a lot more easy to conceptualize, to think about, to think through."

---

### Slide L4-3: One Agent Per Milestone

**Purpose:** Show that each milestone gets its own dedicated agent.

**Content:**
- The 3 milestones from the previous slide, each now paired with an agent:
  - Milestone 1 → "Narrative Agent" (only cares about finding the right story)
  - Milestone 2 → "Presentation Agent" (only cares about creating the structure)
  - Milestone 3 → "Polish Agent" (only cares about visual quality and delivery)
- Each agent node shows: agent name + one-line scope
- The Director Agent sits above, connected to all three
- Caption: "Each agent is only concerned with its milestone. It doesn't care about anything else."

**Visual approach:** Compact. The milestone rows from the previous slide now have agent badges next to them. Don't make this a complex diagram — it's the same list with agents attached.

**Key message (spoken):** "The director figured out the strategy. Now each milestone gets its own agent. That agent only cares about that body of work."

---

### Slide L4-4: Zoom Into Milestone 2

**Purpose:** Transition from the high-level view to the detailed view. "Now let's focus."

**Content:**
- Milestones 1 and 3 fade/dim to the sides
- Milestone 2 ("Create the presentation structure") is now the focal element, expanded
- Show what this agent has to work with:
  - The high-level goal (context from above)
  - Notes from the Director Agent
  - Output from Milestone 1 (the narrative: "5 levels of AI literacy, ambition scales with understanding")
- Caption: "This agent has a lot of context and a clear direction. Now it needs to figure out how to execute."

**Visual approach:** A zoomed-in view. The milestone is now a card with its inputs listed (goal, director notes, M1 output). This is the "setup" before we show the work loop.

---

### Slide L4-5: The Work Loop

**Purpose:** Show the core review cycle — agent does work, director reviews, feedback, iterate.

**Content:**
- Two nodes: "Milestone 2 Agent" and "Director Agent"
- A loop between them:
  1. Agent creates artifacts (script, storyboard, structure)
  2. → Sends to Director
  3. Director reviews: "Mostly right, but you missed X. I'd do Y because Z."
  4. → Agent iterates
  5. Loop continues (2-3 rounds)
  6. Director: "Good. Let's show Vlad."
  7. → Human review
- Show this as a simple back-and-forth flow, not a complex diagram. Two nodes, arrows going back and forth, with labels on each pass.

**Visual approach:** Keep it minimal. The back-and-forth IS the visual. Don't add a separate timeline or stepper — the loop arrows tell the story. Maybe show 2-3 "rounds" as stacked iterations with brief feedback labels.

**Key message (spoken):** "Agent creates the first draft. Sends it to the director. Director is like, this mostly looks right, but you missed this, and I'd do this differently because of this. Agent iterates. A few minutes later, sends it back. Either more feedback or 'this is good, let's show Vlad.' That's when I get to look at it."

---

### Slide L4-6: The Research Layer

**Purpose:** Reveal that it gets MORE interesting. Before writing, the agent can spawn research sub-agents.

**Content:**
- The Milestone 2 Agent is now shown spawning 3 research sub-agents BEFORE writing:
  1. "Research: AI adoption levels in the workforce, 2026"
  2. "Research: Most interesting ways people use AI for better/faster/more ambitious work"
  3. "Research: Best practices for AI show-and-tells — what resonates, what doesn't"
- Arrows: sub-agents → findings flow back to Milestone 2 Agent
- Then: "Only now does the agent write the first draft."

**Visual approach:** The milestone agent at center/top, three research tasks below it (use the factor-row pattern: numbered, with a one-line description). Arrows flowing back up. A clear "then →" indicator showing the draft comes AFTER research.

**Key message (spoken):** "But this could be even more interesting. This agent can choose not to start writing right away. Instead, it spawns sub-agents to do research first. One researches AI adoption trends. Another looks at how people are using AI for ambitious work. Another studies what resonates in AI show-and-tells. All their findings flow back. Only THEN does the agent write the first draft — now informed by real research."

---

### Slide L4-7: The Adversarial Review

**Purpose:** Add the final layer — before sending to the director, an adversarial agent pokes holes.

**Content:**
- The Milestone 2 Agent has its draft
- Before sending to Director, it spawns one more sub-agent: "Adversarial Reviewer"
- This agent's ONLY job: find flaws in thinking, things that might not resonate, stuff that's not correct
- They do a back-and-forth
- Only when the adversarial agent says "this is bulletproof" → send to Director

**Visual approach:** Two nodes (Milestone Agent ↔ Adversarial Agent) with a back-and-forth loop. Similar to the work loop slide but smaller, more contained. The punchline is: "Only when this agent says it's bulletproof does it go to the director."

**Key message (spoken):** "But it doesn't send the draft to the director right away. It spawns another sub-agent — an adversarial one. This agent's only job is to poke holes. Find flaws in thinking. Things that won't resonate. Things that aren't correct. They go back and forth. Only when the adversarial agent says 'I think this is bulletproof' does it go to the director."

---

### Slide L4-8: The Meta-Reveal

**Purpose:** The emotional peak. Everything the audience has been watching IS the output of what was just described.

**Content:**
- No new visual elements. Could be a clean slide with just text, or return to the goal from L4-1.
- The words do the work here:
  > "The narrative you've been hearing... the presentation you've been watching... the timing, the structure, the transitions between levels..."
  > "This is the output. Right now."
- Below (after pause): "The same pattern built a product prototype that shipped to engineering, and analyzed 10 user research interviews into evidence-based personas."

**Visual approach:** Minimal. Let the words land. Maybe fade in the text in 2-3 beats to match the spoken rhythm. No diagrams, no icons, no cards.

---

### Visual Language (from Vlad's mockups)

Reference screenshots are at:
- `.claude/image-cache/940FAB3A-01B1-4CFF-8E7F-CE6443043708/3.png` (L4-1: Goal only)
- `.claude/image-cache/940FAB3A-01B1-4CFF-8E7F-CE6443043708/4.png` (L4-1b: Goal + Agent Assigned)
- `.claude/image-cache/940FAB3A-01B1-4CFF-8E7F-CE6443043708/5.png` (L4-2: Goal → Agent → Milestones tree)
- `.claude/image-cache/940FAB3A-01B1-4CFF-8E7F-CE6443043708/6.png` (L4-3: Milestones → Agent per milestone)

**CRITICAL: These mockups define the exact visual language. Match them precisely.**

#### Element Vocabulary

**Goal Card:**
- White rounded card (`rounded-2xl`) with very subtle shadow
- "GOAL" label above in gray uppercase (`text-ink-40 text-[11px] uppercase tracking-[1.5px]`)
- Goal text in large serif font (`font-serif text-2xl` or larger), centered, in curly quotes
- Generous internal padding

**Agent Node:**
- Dark/black rounded pill (`bg-ink rounded-full` or large `rounded-3xl`)
- Pixel robot icon inside (use a simple inline SVG or emoji-style pixel art character — NOT Lucide icons)
- "AGENT ASSIGNED" text in white uppercase below the icon
- Each agent gets a DIFFERENT colored robot icon:
  - Director agent: orange/coral robot
  - Milestone 1 agent: yellow/lime robot
  - Milestone 2 agent: pink robot
  - Milestone 3 agent: teal/cyan robot
  - Sub-agents: can use additional colors

**Milestone Card:**
- White rounded card, similar to goal card but smaller
- "MILESTONE 1" / "MILESTONE 2" / "MILESTONE 3" label in gray uppercase
- Description text in serif font, bold, centered (e.g., "Decide on a topic", "Outline the narrative", "Polish presentation")

**Connecting Lines:**
- Thin gray lines (`stroke: #d4d4d4`, `strokeWidth: 1` or `1.5`)
- Straight vertical lines for parent→child connections
- Horizontal bracket/tree connector for branching (one vertical down, then horizontal span, then vertical down to each child)
- **NO arrows, NO markers, NO dashes.** Just simple thin lines.

#### Layout Principles

**Progressive build across slides:**
- L4-1: Goal card centered in the middle of the screen
- L4-1b (or progressive reveal): Goal card stays, agent node appears below it
- L4-2: Goal card shrinks and moves to upper portion. Agent node in middle. Tree branches down to 3 milestone cards in a row.
- L4-3: Same tree structure, but now each milestone has an agent node below it (different colored robots)
- Each subsequent slide maintains the spatial relationships from the previous slide — elements don't jump around

**Vertical hierarchy:**
- Goal at top
- Director agent below goal
- Milestones below director (in a row)
- Milestone agents below their milestones
- Sub-agents below their parent agents
- Everything flows top-to-bottom

**Massive whitespace:**
- The mockups have enormous breathing room. Elements are not cramped.
- The goal card is maybe 500-600px wide, centered in a full-screen slide
- Agent nodes are ~150-180px wide pills
- Milestone cards are ~200px wide each with gaps between them
- There's easily 60-80px of vertical space between tiers

#### What NOT to Do
- Do NOT use Lucide icons for agents. Use pixel robot characters (simple inline SVGs with a blocky/pixel-art aesthetic)
- Do NOT use card grids with icon + title + description layouts
- Do NOT add badges, progress bars, or status indicators to milestone cards
- Do NOT use SVG arrow markers or complex line drawing
- Do NOT add "Level 4" badges or serif section titles to these slides — the visual tree IS the content
- Do NOT fill empty space with captions or descriptions — whitespace is intentional

### Design Notes for All L4 Slides

- **Progressive complexity:** Each slide adds one new concept. L4-1 is dead simple (just the goal). By L4-7, the audience understands research sub-agents and adversarial review. They got there step by step.
- **Spatial continuity:** Elements from previous slides stay in place. The goal card is always at the top. The director agent is always below it. Milestones are always in their row. New elements appear below or adjacent to existing ones.
- **Same visual vocabulary throughout:** Every agent is a dark pill with a colored robot. Every milestone/goal is a white card. Every connection is a thin gray line. No exceptions.
- **Don't overload any single slide.** Each slide introduces ONE concept:
  - L4-1: The goal (then: agent assigned)
  - L4-2: Breaking it into milestones (tree structure)
  - L4-3: One agent per milestone (agents appear below milestones)
  - L4-4: Zooming into one milestone
  - L4-5: The work loop (agent ↔ director)
  - L4-6: Research sub-agents
  - L4-7: Adversarial review
  - L4-8: Meta-reveal

---

## 10. What "Good" Looks Like (Reference Patterns to Copy)

### The Score Ring Pattern
A single focal SVG element with:
- Background track: `stroke="#f3f7f7"` (subtle-2x)
- Animated progress: `stroke="#056257"` (cypress) with `strokeDashoffset` animation
- Center content: Large serif number + small uppercase label
- Spring entrance: `type: "spring", visualDuration: 0.6, bounce: 0.15`

**Use this pattern for:** Any single-metric hero element (e.g., the orchestrator node in L4).

### The Factor Row Pattern
A list of items, each with:
- Left: `text-[14px] text-ink font-medium` label
- Right: `text-[13px] text-cypress font-medium` rating/value
- Below: Thin progress bar (`height: 6px`) with `bg-subtle-2x` track and `bg-cypress` fill
- Staggered entrance: `delay: 1.4 + i * 0.1`

**Use this pattern for:** Milestones, agent lists, any structured data.

### The Social Proof Pill Pattern
An inline badge with:
- `inline-flex items-center gap-1.5 bg-subtle-2x px-3.5 py-1.5 rounded-full`
- Small icon (14px) + `text-[13px] text-cypress font-medium`

**Use this pattern for:** Status indicators, metadata tags, capability labels.

### The CTA Button Pattern
```tsx
<motion.button
  className="w-full min-h-[52px] bg-ink text-white font-medium text-[17px] rounded-lg"
  initial={{ opacity: 0, y: 8 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: EASE, delay: 1.8 }}
>
```

**Use this pattern for:** Any action element (though presentation slides rarely need buttons).
