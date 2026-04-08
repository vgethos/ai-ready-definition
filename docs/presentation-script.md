# All-Hands Presentation: The 5 Levels of Working with AI

**Speaker:** Vlad Georgescu
**Format:** Live screenshare, 7-8 minutes
**Audience:** ~800 people, mixed technical levels
**Position:** Final session — other sessions covered basic AI usage

## Example Selection & Rationale

| Level | Example | Why This One |
|---|---|---|
| L3: Single Agentic Workflows | **Funnel capture tool** — deep-dive on automated funnel documentation (29 screens) | Relatable problem, shows the *practice* of automating the repetitive, compound returns (team reuse) |
| L4: Multi-Agent Orchestration | **Prototype factory + HQ orchestration** — insurability report built from L3 infrastructure, multi-agent goal decomposition with research pipeline woven in, feedback loops | Visually stunning, demonstrates L3 tools composing into orchestrated creation. Meta-reveal is the payoff |
| L5: Advanced Autonomous Solutioning | **Brief teaser** — forward-looking, currently in POC stage | Sets the trajectory without overselling |

**Narrative arc:** automate → compose → orchestrate. Each level funds the next.

## Full Script with Timing

### OPENING HOOK [0:00 - 0:30]

**On screen:** Title slide — clean, minimal. Just Vlad's name and a question.

**Say:**

> "Everyone who presented before me showed you what AI can do today — and it's genuinely useful stuff. Copilot, ChatGPT, document analysis. But I want to show you something different.
>
> I want to show you what becomes possible when you stop thinking of AI as a tool that answers questions... and start thinking of it as a tool that achieves goals.
>
> I think about working with AI in 5 levels — not by the tool you use, but by the ambition of the goal you set."

**Audience takeaway:** This session is about ambition, not features. The extra beat lets the audience settle in.

### LEVEL 1: BASIC PROMPTING [0:30 - 0:50]

**On screen:** The 5-level ladder visual — all levels visible, "ambition of goals" on the Y axis. Level 1 highlighted:

- L1: "Write this email for me"
- L2: "Help me analyze this document"
- L3: "I never want to document our funnel manually again"
- L4: "Ship a prototype with research, design, and code — from one sentence"
- L5: "Solve a complex problem end-to-end with minimal guidance"

**Say:**

> "*(point to L1)* Level 1: Basic Prompting. 'Write this email.' 'Fix this paragraph.' 'Summarize this article.' One-off requests, useful answers. You already know this — it's where everyone starts."

**Audience takeaway:** Quick acknowledgment. We're moving past this fast.

### LEVEL 2: ADVANCED PROMPTING [0:50 - 1:30]

**On screen:** Level 2 highlighted on the ladder.

**Say:**

> "*(point to L2)* Level 2: Advanced Prompting. The goals get more specific. 'Help me while I code.' 'Analyze this 50-page document and find the gaps.' 'Research this topic thoroughly and give me the key takeaways.' This is Copilot, document analysis, iterative back-and-forth work.
>
> Most teams are here today, and that's great. AI is a powerful assistant at this level. But notice the pattern — at levels 1 and 2, *you* are still doing the work. AI is helping you do it faster.
>
> *(gesture to L3-L5)* Now watch what happens when the goal changes from 'help me with this task' to 'I never want to do this task again.'"

**Audience takeaway:** Levels 1-2 are powerful but bounded — AI assists *you*. The jump to Level 3 changes the relationship entirely.

### LEVEL 3: SINGLE AGENTIC WORKFLOWS [1:30 - 3:20]

**The practice: Automating the repetitive**

**On screen:** The automated funnel documentation tool running — browser window + capture control panel side by side.

**Say:**

> "Level 3 is where AI starts working *for* you, not just *with* you. The goal changes completely. Let me show you what I mean with something everyone can relate to.
>
> I'm a PM, and I need to reference our consumer life insurance funnel constantly — in PRDs, in design reviews, in conversations with engineers. Our funnel is 29 screens long. Every time I needed to reference it, I was taking screenshots, pasting them into docs, writing descriptions by hand. Took an hour. Outdated the next week.
>
> So the goal: I never want to do this manually again."

**On screen:** Show the tool interface — browser + capture panel.

> "I built a tool. It opens a browser, I navigate through the funnel, and every time I click 'capture,' it takes a screenshot and sends it to AI. It reads the screenshot and writes a structured description of what the user sees, what they can do, what data they're entering."

**On screen:** Switch to the output — funnel-capture.md showing 2-3 screens of structured text.

> "The result: a 29-screen text document of our entire funnel. Structured, searchable, shareable. I run it whenever the funnel changes.
>
> But here's what separates level 3 from level 2. I spent a couple of hours building this. Now 10 people on my team use it without doing that work themselves. Level 2 helps *you*. Level 3 helps your *team*. That's the compound return."

**Audience takeaway:** Level 3 = automate the repetitive, not just get one-time answers. The investment compounds because it helps your whole team.

**Transition to L4:**

> "Now, level 4. This is where it gets really interesting. The goal: 'Don't just automate one workflow — orchestrate many of them together.'"

### LEVEL 4: MULTI-AGENT ORCHESTRATION [3:20 - 6:50]

**The concept**

**Say:**

> "Level 4 is about combining multiple AI workflows — not running one tool, but orchestrating many. And the examples I'm about to show you are only possible because the level 3 investments already existed."

#### Part 1: Prototype Factory [3:30 - 4:15]

**On screen:** The insurability report prototype — score screen with the animated gauge, persona toggle visible.

**Say:**

> "We needed a new experience for our customers — an insurability score screen. Something that shows applicants where they stand after their health interview. This didn't exist anywhere. No designs, no wireframes, just a hypothesis.
>
> This is NOT 'AI wrote some code.' This is what happens when a dozen level 3 investments start compounding. AI has access to our design system — it knows our components. It knows our brand conventions through project instructions I've written. Live tuning lets me adjust animation timing and spacing in real-time. A visual feedback loop lets me point at a UI element and say 'fix that spacing.'"

**On screen:** Click through the 4-screen flow: loading interstitial → score reveal → carrier matching → approval.

> "Four screens. Animated transitions. A score gauge that shifts color by tier. Two personas with different messaging. This prototype shipped to our engineering team — they're building from working code, not a mockup."

**Audience takeaway:** Level 3 tools compose into creation capability. The prototype is the visual wow; the compounding is the insight.

#### Part 2: The Orchestration Layer [4:15 - 6:30]

**On screen:** Terminal showing the HQ system — goal input → milestone decomposition.

**Say:**

> "Now here's where it all comes together. I have a system where I can give AI a high-level goal — not a task, not a step-by-step plan, just a goal. And what happens next isn't a chatbot producing output. It's a team forming.
>
> A director agent analyzes the goal and decomposes it into milestones. It assigns each milestone to a specialist agent — and this part matters: each specialist has different skills and context loaded. One agent analyzed 10 user research interviews and generated evidence-based profiles. Another used that research — along with the same funnel documentation from Level 3 — to inform the prototype. Another wrote a speaker script. They're feeding into each other's work.
>
> *(beat)* A few days ago, I typed this:"

**On screen:** Show the original goal input: "Put together a quick demo/presentation for company all-hands"

> "The director created milestones: narrative design, presentation build, and demo preparation. It assigned a specialist to each one.
>
> But here's what makes this orchestration and not just delegation. The specialists build on each other's outputs. The narrative agent researched my codebase, evaluated candidate examples, and wrote a speaker script. The director reviewed it and sent revision notes back — 'make the closing more practical,' 'emphasize how the levels compound.' Just like a real manager giving feedback.
>
> The narrative agent revised the script. Then the presentation agent used that revised script to build visuals. There are feedback loops, not just handoffs. The agents are collaborating."

**On screen:** Show the milestone breakdown, revision notes, and agent output artifacts.

> "And here's where all the levels tie together. Remember those level 3 automated workflows? The funnel documentation, the design integrations? Those became the *specializations* I assigned to agents. The infrastructure from every previous level compounds into this team's capabilities."

#### Part 3: The Meta-Reveal [6:30 - 6:50]

**Say:**

> "*(look at audience)* That revised speaker script... is what I'm reading from right now.
>
> *(pause for effect)*
>
> My job was judgment, direction, taste, and decision-making — not tedious execution. That's always been true of my role. AI just makes the separation explicit."

**Audience takeaway:** Level 4 = AI agents forming a specialized, collaborating team with feedback loops, reviews, and shared context. L3 tools become L4 specializations. The meta-reveal makes it visceral.

### LEVEL 5: ADVANCED AUTONOMOUS SOLUTIONING [6:50 - 7:20]

**On screen:** Level 5 highlighted on the ladder — slightly dimmed, with "POC" label.

**Say:**

> "There's a Level 5, and it's where this is heading. AI that can take a complex, multi-step problem — the kind that today requires weeks of cross-functional work — and solve it end-to-end with minimal guidance. Not just executing tasks, but reasoning through the full problem space autonomously.
>
> Right now this is in proof-of-concept stage. But the trajectory is clear: every level makes the next one possible. The same way level 3 automated workflows funded level 4 orchestration, level 4 orchestration is building toward level 5 autonomy."

**Audience takeaway:** The future is visible from here. Grounded in "solving complex problems," not sci-fi.

### CLOSING [7:20 - 7:50]

**On screen:** The 5-level ladder again, with L3-L4 highlighted. A line connecting each level to the next with "funds →" between them.

**Say:**

> "Here's what I want you to take away. The investment is sequential, and each level funds the next. The tools I built at level 3 became the infrastructure that made level 4 orchestration possible. You can't skip levels. Each one teaches you where AI breaks and what you need to change to make it reliable.
>
> If you're at level 1 or 2 today — great. Don't try to jump to level 4. Go to the next level. Get comfortable. Then think a little bigger. Put in the work, level by level, and it compounds."

**Audience takeaway:** Figure out what level you're at. Start thinking about the next one. Each level teaches you something and funds the next. The investment compounds.

## Screen Flow Summary

| Timing | On Screen |
|---|---|
| 0:00 | Title slide with hook question |
| 0:30 | 5-level ladder — goals on Y axis |
| 1:30 | Automated funnel documentation tool (browser + panel) |
| 2:20 | funnel-capture.md output (structured text) |
| 3:30 | Insurability report prototype (score screen, 4-screen flow) |
| 4:15 | Terminal: HQ system with goal input |
| 4:45 | Goal input: "Put together a quick demo/presentation for company all-hands" |
| 5:00 | Milestone breakdown + revision notes + agent artifacts |
| 6:30 | Meta-reveal moment (no screen change needed — let the words land) |
| 6:50 | 5-level ladder with L5 highlighted, "POC" label |
| 7:20 | 5-level ladder (L3-L4 highlighted, "funds →" connections) |

## Transition Language Reference

| From → To | Transition |
|---|---|
| Opening → L1 | "I think about working with AI in 5 levels — not by the tool you use, but by the ambition of the goal you set." |
| L1 → L2 | "Level 2: Advanced Prompting. The goals get more specific." |
| L2 → L3 | "Now watch what happens when the goal changes from 'help me with this task' to 'I never want to do this task again.'" |
| L3 → L4 | "Now, level 4. This is where it gets really interesting. The goal: 'Don't just automate one workflow — orchestrate many of them together.'" |
| L4 reveal → L5 | "There's a Level 5, and it's where this is heading." |
| L5 → Closing | "Here's what I want you to take away. The investment is sequential, and each level funds the next." |

## Key Delivery Notes

1. **State the goal first at each level.** The audience should feel the jump in scope before you explain anything. The goal IS the hook.
2. **L1-L2: Move fast, don't linger.** These levels are acknowledgment, not content. The audience knows this stuff. Get to Level 3 within 90 seconds.
3. **The L2→L3 transition is the fulcrum.** "Help me with this task" vs. "I never want to do this task again" — this is where the talk shifts from familiar to new. Land it clearly.
4. **L3: One strong story beats a montage.** Go straight into the funnel capture problem. Don't list other tools — the audience has no context for them. The funnel story IS the proof that Level 3 is a practice. End on shareability — "10 people use it."
5. **L4: Prototype then orchestration.** The prototype is the visual wow that earns attention. The orchestration layer is the conceptual wow that earns understanding. The research pipeline is woven into the orchestration narrative to show agents feeding into each other — don't treat it as a separate demo.
6. **L4: Team, not hierarchy.** Emphasize collaboration: specialists building on each other's work, director sending revision notes back, feedback loops. Don't let the audience reduce this to "AI wrote your talk." Own the human role confidently — judgment, direction, taste — not defensively.
7. **The meta-reveal needs the pause.** "That speaker script... is what I'm reading from right now." Pause before AND after. Let it land. This is the emotional peak of the talk.
8. **L5: Understate, don't oversell.** "Proof-of-concept stage" is honest and credible. Frame it as solving complex problems end-to-end, not autonomous problem discovery. The audience will project the potential themselves.
9. **Closing is practical.** No inspirational fluff. "Don't skip levels. Go to the next one. It compounds." This is actionable for everyone regardless of where they are.
10. **Don't over-explain tech.** No one needs to hear "Playwright" or "Framer Motion." They need to feel the escalation of ambition and understand the compounding principle.
