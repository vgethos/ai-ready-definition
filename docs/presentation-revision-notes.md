# Presentation Script — Revision Notes

These are notes for revising the speaker script (docs/presentation-script.md). The overall structure and example selections are good. These notes address what needs to change in the second draft.

---

## 1. Make "ambition of goals" the spine, not just a mention

Each level should OPEN with the goal stated plainly. The audience should feel the jump in scope at each step. The framework visual should show the goals, not just level labels:

- L1: "Spell this word right"
- L2: "Write this email for me"
- L3: "Help me while I code"
- L4: "Analyze this 50-page document"
- L5: "I never want to document our funnel manually again"
- L6: "Build me a product that doesn't exist yet"
- L7: "Prepare my all-hands presentation"

The throughline of the entire talk is: the scope of ambition increases as you go from L1 to L7. Every transition, every example, every visual should reinforce this.

## 2. L5: Show breadth before depth

The funnel capture is the deep-dive story, but L5 should first establish that this is a *practice*, not a one-off. Quick flash of the breadth:

- Custom slash-command skills (/prd-generate, /create-prototype)
- MCP connections to Figma, Jira, Notion, Chrome
- DialKit for live parameter tuning
- Agentation for visual UI feedback
- The funnel capture tool

Each one eliminates a manual workflow. Then deep-dive on funnel capture as the concrete, relatable example.

Also emphasize the **shareability / compound returns**: "I spent 2 hours building this. Now 10 people on my team use it without doing that work themselves." This is what separates L5 from L4 — L4 helps you, L5 helps your team.

## 3. L6: The composition insight

L6 is NOT "AI wrote code." L6 is: "I composed a dozen L5 tools into a system that can create things that didn't exist before."

The insurability report prototype worked because:
- Claude has access to our design system (EDS v2) as a local dependency
- It knows our brand conventions via CLAUDE.md project instructions
- DialKit lets me tune animation parameters in real-time without re-prompting
- Agentation lets me point at UI issues and have them fixed via MCP

**L6 = L5 tools compounding.** That's the real insight, and it's what makes L5 investment worth it. The prototype is the visual wow moment, but the message is about compound returns from infrastructure investment.

## 4. L7: It's a team, not a hierarchy

The meta-reveal ("this script is what I'm reading") still works, but the setup should focus on **how agents work together like a real team**, not just "boss delegates to workers."

What's actually happening in multi-agent workflows:

- A director **decomposes** the goal into milestones
- Specialists **build on each other's outputs** — the narrative agent's script informs what the presentation agent builds
- The director **reviews** milestone work and sends revision notes back (exactly like a real manager would)
- Agents **share context** — discoveries from one specialist flow to others
- There are **feedback loops**, not just handoffs — work goes back for iteration

The audience's mental model of "AI doing work" is probably "I give instructions, it produces output." L7 shatters that: AI agents are collaborating with each other — delegating, reviewing, revising, coordinating dependencies. The working dynamics between agents look like a functioning team.

The setup in the script should convey this:

- "I gave it a goal"
- "It figured out what milestones were needed"
- "It assigned specialist agents to each one"
- "Those specialists built on each other's work — one did research, the next used that research to write a script"
- "The director reviewed the script, gave notes, sent it back for revision — just like a real team"
- "I made the final calls, but the coordination between agents was real"

**Specialization matters.** Each agent has different skills and context loaded — one is focused on strategic thinking and research, another on copywriting, another on design evaluation, another on writing code. This isn't arbitrary. Every skill/instruction you give an agent takes up context and makes it less focused. A generalist agent with 50 skills is worse than a specialist agent with 5 relevant ones. Just like you wouldn't hire one person to do strategy, copywriting, design, and engineering — you build a team of specialists.

And here's where the levels tie together: the skills you built at L5 become the **specializations** you assign to agents at L7. The infrastructure investment from every previous level compounds into the team's capabilities.

The wow isn't that AI did the work — it's that AI agents formed a specialized, collaborating team with feedback loops, reviews, and shared context. Be careful not to let the audience reduce this to "so AI wrote your talk?" — the emphasis should be on the collaboration, coordination, and specialization dynamics.

**Framing the human role:** Do NOT be defensive ("I'm not saying AI did everything"). Instead, own it confidently: "My job is judgment, direction, taste, and decision-making — not tedious execution. That's always been true. AI just makes the separation explicit." This reframes the whole talk: AI lets you spend all your time on the highest-leverage parts of your job.

## 5. Revised closing

Drop "Same technology. Bigger thinking." as the final line. The closing should be practical and honest:

The key message: **the investment is sequential, and each level funds the next.** Don't skip levels. Each level teaches you something about how AI works, where it breaks, what you need to change in your setup. By the time you get to L5 or 6, you've built the intuition and infrastructure to actually make it work. Skip levels and you'll get frustrated and disappointed.

Something along these lines:
> "If you're at level 2 or 3 today — great. Don't try to jump to level 6. Go to the next level. Get comfortable. Then think a little bigger. Each level teaches you where AI breaks and what you need to change in your setup to make it reliable. Put in the work, level by level, and it compounds. By the time you reach level 6 or 7, you'll have earned it — and you'll actually know how to make it work."

The call to action is: figure out what level you're at, and start thinking about the next one. That's it. That's actionable for everyone in the room regardless of where they are.

---

## 6. Post-revision feedback (after reviewing the second draft)

These are additional notes based on reviewing the revised script. Apply on top of the changes already made.

### 6a. L5 breadth montage needs a clear visual direction

The script says "quick montage / grid" but doesn't specify what this looks like on screen. This should be a simple grid — maybe 5-6 tiles, each with an icon and a short label (e.g., "Figma ↔ Claude", "One-click PRDs", "Live design tuning"). Shown for 5-10 seconds max while Vlad narrates over it. The visual should feel like glancing at a toolbelt, not reading a feature list.

### 6b. Remove "Playwright" and other tech jargon from on-screen descriptions

Delivery note #7 says "don't over-explain tech" but the on-screen descriptions in the screen flow still reference technical names. The spoken words are clean, but make sure on-screen text is also jargon-free. The audience doesn't need to see "Playwright + Claude" — they need to see "Automated funnel documentation tool."

### 6c. Reframe the human role in L7 — don't be defensive

Replace the current line "I'm not saying AI did everything — I reviewed it, I refined it, I made the final calls" with something more confident and owning:

> "My job is judgment, direction, taste, and decision-making — not tedious execution. That's always been true. AI just makes the separation explicit."

This reframes AI from "helper I still had to supervise" to "system that lets me spend all my time on the highest-leverage parts of my job." It's a stronger, more confident position.

---

## Summary of changes

| Section | Current | Revision |
|---|---|---|
| Spine | Framework mentioned, then examples | Goals stated at each level, escalation is visceral |
| L5 | Funnel capture only | Breadth flash (skills, MCP, DialKit, Agentation) → funnel capture deep-dive → shareability point |
| L6 | "I described it, AI generated it" | Composition story: L5 tools compounding → creation that wasn't possible before |
| L7 | Meta-reveal focus | Agents as a team (review, iterate, build on each other), not just delegation. Then meta-reveal as payoff |
| Closing | "Same technology. Bigger thinking." | Sequential investment, don't skip levels, each level funds the next, concrete call to action |
