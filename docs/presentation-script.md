# All-Hands Presentation: The 5 Levels of Working with AI

**Speaker:** Vlad Georgescu
**Format:** Live screenshare, 7-8 minutes
**Audience:** ~800 people, mixed technical levels
**Position:** Final session — other sessions covered basic AI usage

## Example Selection & Rationale

| Level | Example | Why This One |
|---|---|---|
| L3: Single Agentic Workflows | **Funnel capture tool** — deep-dive on automated funnel documentation (29 screens) | Relatable problem, shows the *practice* of automating the repetitive, compound returns (team reuse) |
| L4: Multi-Agent Orchestration | **This presentation** — the entire talk was built by multi-agent orchestration starting from one vague goal | Meta and relatable (everyone does presentations), demonstrates exploration, milestone decomposition, specialized agents, review loops, adversarial review, human-in-the-loop. The audience is watching the output. |
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
- L4: "Build a complete presentation — narrative, visuals, delivery prep — from a single sentence"
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

> "Now, level 4. The goal gets much bigger — and much more vague."

### LEVEL 4: MULTI-AGENT ORCHESTRATION [3:20 - 6:50]

**The story: This presentation**

**Say:**

> "Level 4 is about combining multiple AI workflows — not running one agent, but orchestrating many. And I want to show you what that looks like with something you can all relate to: putting together a presentation."

#### The Goal [3:30 - 3:50]

**On screen:** Terminal showing the goal input: "Create a presentation about how I work with AI"

**Say:**

> "A few weeks ago, I knew I was going to present at this all-hands. And my goal was pretty vague: 'Create a presentation about how I work with AI.' That's it. I didn't have a narrative, I didn't have slides, I didn't know which examples to show. I just had the goal.
>
> So I assigned an agent to it."

#### Discovery [3:50 - 4:20]

**On screen:** Show agent exploring files — CLAUDE.md files, prototypes, artifacts on the machine.

**Say:**

> "The first thing the agent did was explore. It read through dozens of project files — instructions I've written, prototypes I've built, tools, research artifacts, things I'd honestly forgotten about. It synthesized a picture of what I'd been doing and what was worth presenting. That kind of synthesis across that many files? That's not something I'd do myself — I'd cherry-pick. The agent was thorough in a way I wouldn't have been.
>
> Then it asked me targeted follow-up questions — what's the audience like, what have other presenters covered, what do I want people to walk away thinking. It was filling in the gaps that files alone couldn't answer."

#### Milestone Decomposition [4:20 - 4:50]

**On screen:** Show the three milestones laid out.

**Say:**

> "Once it had enough context, the agent broke the goal down into three concrete milestones. First: align on the narrative — what's the message? I could talk about a million things, so let's choose the one that resonates for 800 people at an Ethos all-hands. Second: turn that narrative into an actual web-based presentation — what you're looking at right now. Third: delivery prep — dry runs, timing, feedback, confidence that this is going to go well today."

#### Why Multiple Agents [4:50 - 5:50]

**On screen:** Diagram showing orchestrator at center, connected to a roster of single-purpose agents — each with a name and one-line role: "Research Agent," "Narrative Agent," "Presentation Agent," "Audience Analyst," "Adversarial Reviewer," "Delivery Coach."

**Say:**

> "Now here's what makes this level 4 and not just 'I asked an AI to help me.' The main agent — the orchestrator — didn't do much of the actual work. Its job was to coordinate. It spun up *single-purpose* agents, each one doing one thing really well.
>
> A research agent studied what makes great demos land — looked at examples, pulled patterns, figured out what resonates with a mixed-technical audience. An audience analyst looked at the context: who's in the room, what have they already seen today, what's going to feel fresh versus redundant. A narrative agent took all of that research and turned it into a story — the levels framework, the examples, the transitions. A presentation agent turned that story into what you're looking at right now. And a delivery coach helped me with dry runs, timing, and pacing.
>
> And here's where the levels connect: these agents aren't generic. They're loaded with the same automated workflows I built at Level 3. The same funnel documentation, the same design integrations, the same project instructions. Level 3 tools became Level 4 agent specializations.
>
> Why single-purpose? Because after too much back-and-forth, a single agent starts to drift — it gets less sharp. Each specialized agent gets a fresh context window loaded only with the skills it needs. It stays focused and sharp.
>
> And then — this is the important part — review loops. When an agent finishes its work, the orchestrator reviews it. 'This section is too long.' 'The closing needs to be more practical.' The agent integrates that, sends it back. Two, three, four rounds. Each round polishes the quality. You can even have an adversarial reviewer whose only job is to poke holes and find flaws — and the implementing agent integrates that feedback too."

#### Human in the Loop [5:50 - 6:20]

**On screen:** Show the executive summary / review interface the orchestrator prepared for Vlad.

**Say:**

> "At some point, the orchestrator decides: this is ready for human review. It prepares an executive summary for me — here's the work that's been done, here are the decisions we've made, here are open questions. I can review a lot of work very quickly and in a very concise way. If I spot a flawed assumption, I point it out, and the agents go back and integrate that.
>
> My role is judgment, direction, and taste. The agents handle the research, the iteration, the coordination. Some milestones run in parallel, some are sequential because they depend on each other. But the work comes together step by step."

#### The Meta-Reveal [6:20 - 6:50]

**Say:**

> "*(look at audience, pause)*
>
> So the narrative you've been hearing... the presentation you've been watching... the timing, the structure, the transitions between levels...
>
> *(beat)*
>
> This is the output. Right now. This is what multi-agent orchestration produced.
>
> *(pause for effect)*
>
> And this is a small example. The same orchestration pattern built a product prototype that shipped to our engineering team, and analyzed 10 user research interviews into evidence-based personas. The pattern is the same — the goals are different."

**Audience takeaway:** Level 4 = multiple specialized agents with an orchestrator, review loops, adversarial feedback, and human-in-the-loop. The audience just experienced the output firsthand. The meta-reveal makes it visceral — they didn't just hear about orchestration, they watched it.

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
| 3:30 | Terminal: goal input "Create a presentation about how I work with AI" |
| 3:50 | Agent exploring files — CLAUDE.md files, prototypes, artifacts |
| 4:20 | Three milestones laid out (narrative, presentation build, delivery prep) |
| 4:50 | Diagram: orchestrator at center, roster of single-purpose agents (Research, Narrative, Presentation, Audience Analyst, Adversarial Reviewer, Delivery Coach) |
| 5:50 | Executive summary / review interface prepared for Vlad |
| 6:20 | Meta-reveal moment (no screen change needed — let the words land) |
| 6:50 | 5-level ladder with L5 highlighted, "POC" label |
| 7:20 | 5-level ladder (L3-L4 highlighted, "funds →" connections) |

## Transition Language Reference

| From → To | Transition |
|---|---|
| Opening → L1 | "I think about working with AI in 5 levels — not by the tool you use, but by the ambition of the goal you set." |
| L1 → L2 | "Level 2: Advanced Prompting. The goals get more specific." |
| L2 → L3 | "Now watch what happens when the goal changes from 'help me with this task' to 'I never want to do this task again.'" |
| L3 → L4 | "Level 4 is about combining multiple AI workflows — not running one agent, but orchestrating many. And I want to show you what that looks like with something you can all relate to: putting together a presentation." |
| L4 reveal → L5 | "There's a Level 5, and it's where this is heading." |
| L5 → Closing | "Here's what I want you to take away. The investment is sequential, and each level funds the next." |

## Key Delivery Notes

1. **State the goal first at each level.** The audience should feel the jump in scope before you explain anything. The goal IS the hook.
2. **L1-L2: Move fast, don't linger.** These levels are acknowledgment, not content. The audience knows this stuff. Get to Level 3 within 90 seconds.
3. **The L2→L3 transition is the fulcrum.** "Help me with this task" vs. "I never want to do this task again" — this is where the talk shifts from familiar to new. Land it clearly.
4. **L3: One strong story beats a montage.** Go straight into the funnel capture problem. Don't list other tools — the audience has no context for them. The funnel story IS the proof that Level 3 is a practice. End on shareability — "10 people use it."
5. **L4: One story, five concepts.** The presentation story naturally demonstrates exploration, decomposition, specialization, review loops, and human-in-the-loop — don't let it feel like a feature list. Tell the story, and the concepts emerge from it.
6. **L4: Own the human role.** Don't let the audience reduce this to "AI made your talk." The agents handled research, iteration, and coordination. YOU handled judgment, direction, and taste. Say it confidently, not defensively.
7. **The meta-reveal needs the pause.** "That speaker script... is what I'm reading from right now." Pause before AND after. Let it land. This is the emotional peak of the talk.
8. **L5: Understate, don't oversell.** "Proof-of-concept stage" is honest and credible. Frame it as solving complex problems end-to-end, not autonomous problem discovery. The audience will project the potential themselves.
9. **Closing is practical.** No inspirational fluff. "Don't skip levels. Go to the next one. It compounds." This is actionable for everyone regardless of where they are.
10. **Don't over-explain tech.** No one needs to hear "Playwright" or "Framer Motion." They need to feel the escalation of ambition and understand the compounding principle.
