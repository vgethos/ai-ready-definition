---
last_updated: 2026-03-04
category: planning
---

# Context: Sales Direct Text Bridge

## Problem Statement

IUL users who reach the post-approval "sales direct" page are not answering Ethos outbound calls at high enough rates. IUL connect rate is 35–40% vs. 50–60% for Term social users. The gap is consistent across all channels and call timing is identical — this is not a channel mix or speed-to-call problem.

The current page is passive: it tells users "we'll call you in 10 minutes" and gives them no agency. Ethos already texts users before calling, but the text does not mention scheduling.

**If we don't solve this:** A meaningful share of approved IUL users never connect with a sales agent and don't purchase. IUL requires a phone call to complete — there's no self-serve path to transmit.

---

## User Research Signal

*Source: Ethos IUL Users Exploratory, November 2025 (n=11 moderated interviews)*

Three hesitations confirmed across non-buyers:

1. **Price anxiety** — Users wanted pricing before committing to a call. *"I don't want to talk to you until I know if it's worth my time."* Being addressed in separate projects.

2. **Call aversion** — Users anticipated sales pressure and avoided it. *"When they say 'you've got to talk to an agent,' it's like, oh crap."* Complex product = longer, more intense call expected. This is the focus of this test.

3. **Timing / readiness** — Users completed the form without expecting an immediate call. *"It was during a break at work. I had 15–20 minutes. It wasn't an opportune time."* Related to call aversion — users didn't opt in to a call right now.

Key finding: buyers who connected described the call positively — they expected it and were ready for it. The gap isn't the call itself. It's that non-buyers felt ambushed by it.

---

## Precedent

**Instant Connect V2 (Feb 2026)** — Tested agent humanization (name + photo) and explicit video call framing.

- V2 video join rate: 8% vs. 45% in V1 — significant drop
- But overall connect rate (phone + video): 36% in both V1 and V2
- Drop happened at the offer screen, before the call — video call framing was likely the main confounder, not agent humanization
- Cannot cleanly isolate effect of showing agent info from the video call mechanic

**Implication:** We don't have a clean read on agent humanization for regular phone calls. IC V2 designs remain useful as visual inspiration. The scheduling/text approach is a different mechanism and not tested.

---

## Hypothesis

**Hesitation:** IUL users don't answer outbound calls because the call feels like an unwanted interruption — they never explicitly committed to talking right now.

**Treatment:** On the sales direct page, tell users a text is coming and that they can use it to schedule a call at a time that works for them.

**Mechanism:** A scheduled call is an opt-in commitment. Users who choose a time are more mentally prepared and more likely to answer. Users who would have ignored a cold call may engage via text and convert to a scheduled call. Net effect: higher phone connect rate.

**Conviction:** 7/10 — Strong directional logic from research, but no direct precedent for text-first on this surface.

---

## Constraints

- Text infrastructure exists; Ethos already texts users pre-call — copy is fully changeable
- Page copy fully changeable
- Applies to both business hours (BH) and non-business hours (NBH) — scheduling is especially valuable NBH
- No BH/NBH agent-availability complexity (any agent can take any call)
- Hard endpoint: phone call is required. Text is a bridge, not a destination — cannot transmit via text alone

**Open question:** What is the scheduling mechanic in the text? Link to a time-slot picker, agent-texted reply, or other? Needs to be defined before build.

---

## Success Metrics

- **Primary:** Phone connect rate (calls answered / approved users) — must go up
- **Secondary:** Time-to-connect (does scheduling shift connects later? net positive or negative on connect volume?)
- **Hypothesis validation:** If call aversion is the driver, scheduled calls should connect at a materially higher rate than unscheduled — confirming the opt-in mechanism is working

---

## Scope & Next Steps

- [ ] Define scheduling mechanic (link vs. agent-text-back vs. other)
- [ ] Define NBH variant — scheduling likely more prominent when agents aren't immediately available
- [ ] Run `/prd-generate`
- [ ] Run `/prd-review`
- [ ] Build prototype to test page copy + layout

---

## Appendix: Full Hesitation Map & Treatment Brainstorm

| # | Hesitation | Research evidence | Severity |
|---|---|---|---|
| 1 | **Price anxiety** — no number, call feels like a prerequisite to getting one | *"I want to see the cost. I don't want to talk to you until I know if it's worth my time."* Multiple NC/NP quoted this | High |
| 2 | **Call aversion** — expects sales pressure | *"When they say 'you've got to talk to an agent,' it's like, oh crap."* Explicit avoidance of perceived hard sell | High |
| 3 | **Low conviction** — doesn't understand IUL well enough to feel the call is worth it | Most users knew nothing about IUL before Ethos. Without rep education, they couldn't self-qualify | Medium-High |
| 4 | **Timing / readiness** *(new)* — completed the form without expecting a call would happen immediately | *"It was during a break at work... I had 15–20 minutes. It wasn't an opportune time."* | Medium |

All four hesitations surfaced during context gathering. H2 and H4 are the focus of this test. H1 and H3 are being addressed in separate projects.

---

### H1: Price Anxiety

**Hesitation:** Users want a price before committing to a call. If they can't get one, they move on.
**Research:** *"I don't want to talk to you until I know if it's worth my time. If your price is way too high, why am I going to waste my time?"* Multiple NC/NP quoted this as the primary reason for dropping out.
**Status:** Being addressed in a separate project.

Treatments considered:
- **Price range on page** — Show estimated monthly cost range before the call. Reduces risk of committing to a conversation with no price intel. Risk: sticker shock may cause drop-off before the call.
- **"What you'll find out" reframe** — Tell users the call is where they get their exact rate. Repositions the call as the answer to the price question rather than a barrier in front of it.

---

### H2: Call Aversion ← focus of this test

**Hesitation:** Users anticipate sales pressure and avoid the call. IUL is more complex than Term, so they expect the conversation to be longer and more intense.
**Research:** *"When they say 'you've got to talk to an agent,' it's like, oh crap. I didn't want to have to go through that again."*

Treatments considered:
- **Text bridge** ← chosen — Inform users a text is coming and they can schedule via it. Reduces cold-call surprise; gives users agency over timing.
- **Explicit call reframe** — "This isn't a sales call. It's 10 minutes to confirm your rate. No pressure to buy today." Directly defuses the anticipated hard sell.
- **Agent humanization** — Show agent name, photo, one-liner. Turns an anonymous call into a known person. Inconclusive from IC V2 (confounded by video call mechanic — see Precedent section). Designs available as inspiration.

---

### H3: Low Conviction / Complexity

**Hesitation:** Users don't understand IUL well enough to know if the call is worth their time. They can't self-qualify before the agent gate.
**Research:** Most users knew nothing about IUL before Ethos. Rep education was a key deciding factor for buyers — non-buyers didn't have enough conviction to push through.
**Status:** Being addressed in a separate project.

Treatments considered:
- **Call agenda** — Break down the 10-minute call into concrete steps: "(1) get your exact rate, (2) see coverage options, (3) ask questions — no obligation." Demystifies the call for users who don't know what to expect.
- **IUL benefit reinforcement** — Echo the top-resonating benefits from research (cash value, lifelong coverage, market gains without downside). Re-anchors why they started this in the first place.

---

### H4: Timing / Readiness

**Hesitation:** Users completed the questionnaire without expecting a call to happen immediately. When the call comes, they're in the middle of something else.
**Research:** *"It was during a break at work. I had 15–20 minutes. If I had known I had to talk to someone, I probably wouldn't have started."*
**Note:** Closely related to H2 — addressed by the scheduling mechanic in the text bridge treatment.

Treatments considered:
- **Countdown + commitment signal** — Show a visible countdown ("Your agent will call in 9:47. Keep your phone nearby."). Creates anticipation and a micro-commitment; harder to ignore a call you're watching approach.
- **Scheduling option on page** — "Can't talk in 10 minutes? Schedule for later." Catches users who are about to abandon due to timing. Risk: delays same-day connects.
