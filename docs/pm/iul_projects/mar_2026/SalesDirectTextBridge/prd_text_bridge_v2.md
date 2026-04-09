---
last_updated: 2026-03-05
last_exported: 2026-03-05
category: prd
---

# PRD: Sales Direct Text Bridge

<!-- TOC -->
## Table of Contents
- [1. Objective](#1-objective)
- [2. Principles](#2-principles)
- [3. Context](#3-context)
- [4. Design Pattern](#4-design-pattern)
- [5. Test Variants](#5-test-variants)
- [6. Success Metrics](#6-success-metrics)
- [7. Constraints & Assumptions](#7-constraints--assumptions)
- [8. Next Steps](#8-next-steps)
<!-- /TOC -->

---

## 1. Objective

**Problem:** IUL users who reach the post-approval "sales direct" page are not answering outbound calls at high enough rates (35–40% vs. 50–60% for Term social users). The current page is passive — it tells users a call is coming in 10 minutes and gives them no agency. Research confirms users feel ambushed; they never explicitly committed to talking right now. If we don't solve this, a meaningful share of approved IUL users never connect with a sales agent and don't purchase. IUL requires a phone call — there is no self-serve path to transmit.

**Solution approach:** Reframe the sales direct page to prime users for the incoming text and give them agency over the call — either by surfacing a scheduling option on the page, or by shifting the copy to set expectations that the text is the entry point.

**What we're testing:** 4 variants against a passive-page control, each addressing a distinct mechanism for improving phone connect rate in BH.

---

## 2. Principles

1. **The test covers two dimensions** — copy framing (Variants B, C, D) and UX pattern (Variant A). Variants must differ on what users understand about the text or their agency, not on unrelated layout or visual elements.
2. **The phone call is the hard endpoint** — text is a bridge, not a destination. No variant may suggest users can complete the purchase or transmit via text alone.
3. **"Skip the line—call now" is fixed** — this CTA label and placement must stay identical across all variants to isolate copy and UX effects.
4. **Success is validated per mechanism, not just by aggregate lift** — we need behavioral signals (scheduling pick rate, time-to-connect, text response rate) to confirm which hypothesis is real, not just which variant wins.
5. **BH is the primary scope** — NBH adaptation follows from BH learnings. NBH users see control for this test.
6. **Agent avatar is not the variable** — IC V2 (Feb 2026) showed agent humanization is confounded by other mechanics. Avatar is held fixed across all variants.

---

## 3. Context

See `context_text_bridge.md` for full background. The current sales direct page gives users no agency: it states a call is coming in 10 minutes with no mention of the text Ethos already sends. Research confirms two hesitations driving non-answers: call aversion (users anticipate sales pressure and avoid the call) and timing/readiness (users weren't mentally prepared for an immediate call when they completed the questionnaire). The text infrastructure already exists — copy is fully changeable. Instant Connect V2 (Feb 2026) cannot cleanly inform this test: it confounded agent humanization with a video call mechanic on a different surface.

---

## 4. Design Pattern

**What changes:** Page headline, body copy, and optionally the page UI (Variant A only). All variants retain the "Skip the line—call now" CTA.

**What stays fixed:** Agent avatar placement, page layout structure, CTA label and style, text send timing (text fires on page load, same as current).

**Behavioral specs:**

- Text fires automatically on page load for all variants — page copy sets expectations for a text that has already been sent or is in transit
- Variant A adds an on-page time-slot picker; scheduling mechanic (how it is powered) is out of scope for this PRD and defined separately
- All variants are BH-only; NBH users see control

**Design constraints:**

- No variant may imply the text replaces the call or that users can complete the purchase via text
- Copy must not introduce new IUL benefit claims not supported by the product
- Variant A's scheduling UI must be additive — page must function normally if the user skips the picker

---

## 5. Test Variants

### Control: Passive Wait Page (Current)

**What changes:** N/A — this is the baseline.

**Copy (observed):**

- Headline: "Great news - you've been pre-approved for Indexed Universal Life!"
- Body: "Get ready to grow your savings while protecting your family. We'll call you in 10 minutes to get you approved and design the right plan."
- CTA: "Skip the line—call now"

**Why it underperforms:** Users receive no information about the text, no agency over timing, and no expectation-setting that primes them for outreach. The call arrives cold.

---

### Variant A: On-Page Scheduling UI

**What changes:** An on-page time-slot picker is added below the headline. Users select a call time directly on the page before leaving. The text confirms the scheduled time — it is not the scheduling mechanism. Headline and body copy updated to reflect the scheduling option.

**Proposed copy:**

- Headline: "You're pre-approved — when's a good time to go over your plan?"
- Body: "One of our IUL experts is ready to walk you through your coverage and help you finalize everything. Pick a time below and they'll call you then — no surprise calls, no pressure."
- [Time-slot picker UI]
- CTA: "Skip the line—call now"

**Hypothesis:** Users who are call-averse or mid-task when they complete the questionnaire will use a visible on-page scheduler to commit to a call at a time that works — converting a likely non-answer into a confirmed, opted-into connect.

**Mechanism:** Commitment and consistency: an explicit scheduling choice creates a personal contract with the user's future self. A user who picked "3:30 PM" is not receiving a cold call — they are receiving a call they agreed to. This transforms the psychological frame from interruption to appointment. The scheduler also surfaces timing agency in the moment users are most primed to act (immediately post-approval), rather than delegating it to a later text interaction.

**User motivation:** "I was in the middle of something, but I could pick 3:30. So I actually showed up — because I'd agreed to it."

---

### Variant B: Expectation + Low Commitment Copy

**What changes:** Page copy is rewritten to name the text explicitly and position it as a low-commitment entry point. Users can find a good time via text and ask questions over text. No UI change beyond copy. Scheduling happens via the text, not on the page.

**Proposed copy:**

- Headline: "You're pre-approved — check your texts!"
- Body: "We just sent you a text from one of our IUL experts so you don't have to wait around wondering when we'll call. Reply to find a time that works for you, or ask any questions you have first. We're here when you're ready."
- CTA: "Skip the line—call now"

**Hypothesis:** Priming users that a text is coming — and framing it as a low-commitment exchange (find a time, ask questions) — reduces call aversion by repositioning the first agent touchpoint from a surprise inbound call to a familiar, opt-in text interaction.

**Mechanism:** The frame shift from "wait for a call" to "check your phone for a text" lowers the perceived stakes of the next interaction. Texting is a medium users associate with personal control and low pressure. Naming what's coming (a text, not a call) removes the element of surprise that makes ignoring an outbound call feel like a reasonable response.

**User motivation:** "I didn't want a random call out of nowhere. But a text asking when I want to talk? That I can handle."

**Copy notes:** Previous draft said "find a good time to get you approved" — removed because users are already approved at this point. The updated body avoids re-triggering approval uncertainty.

---

### Variant C: Agency / Control Copy

**What changes:** Page copy emphasizes user control over when the call happens — more emphatic on timing agency than Variant B. The text is framed as the tool users control, not just a scheduled touchpoint. No UI change.

**Proposed copy:**

- Headline: "You're in charge of when we talk."
- Body: "We just sent you a text. Reply to pick a time that actually works for you and your IUL expert will call then — not before. No surprise calls, no pressure. Just a conversation on your terms, when you're ready for it."
- CTA: "Skip the line—call now"

**Hypothesis:** Users who didn't mentally commit to an immediate call when completing the questionnaire will engage more if they're given explicit agency over timing — not just informed a text is coming, but told they are the ones choosing when the call happens.

**Mechanism:** Autonomy framing: when users perceive they are choosing to receive a call rather than receiving one passively, the psychological frame shifts from interruption to self-directed action. This directly addresses the timing/readiness hesitation — the decision to talk feels like the user's, not Ethos's. Stronger than Variant B's low-commitment framing because it makes the agency explicit, not implied. "Not before" is a specific trust signal — it's a promise that the cold call isn't coming regardless.

**User motivation:** "I wasn't ready to talk right then, but knowing I could pick my own time made it feel like my decision — not theirs."

---

### Variant D: Value Anchoring / Reveal Copy

**What changes:** Page copy leads with the concrete value already waiting for the user — their rate, coverage, and cash value details — and positions the text as the delivery mechanism for that information. No UI change.

**Proposed copy:**

- Headline: "Your rate and coverage details are ready and waiting."
- Body: "We just texted you so your IUL expert can walk you through everything — your monthly rate, your death benefit amount, and how your cash value could grow over time. Reply to the text and they'll take you through it all."
- CTA: "Skip the line—call now"

**Hypothesis:** Users who disengage after approval do so partly because the page doesn't show them what they're getting next. Anchoring on specific outputs already ready for them (rate, coverage, cash value) creates pull — the text becomes the delivery of something they want, not a scheduling ask from a stranger.

**Mechanism:** Value anchoring and curiosity gap: naming concrete outputs (rate, coverage, cash value growth) that the user came for but hasn't yet received reframes the text from "agent outreach" to "your results delivery." Users engage with the text because they believe it contains their information — not because they're being asked to schedule a conversation. This addresses low-conviction disengagement more than timing hesitation.

**User motivation:** "Once I saw my rate was actually ready and waiting, I wanted to know what it was. The text felt like it had something in it for me."

**Copy risk to monitor:** This variant assumes users are already curious about their specific numbers. If they haven't formed that curiosity during onboarding, "cash value growth" may not land. Track text engagement rate to confirm the curiosity hook is working.

---

## 6. Success Metrics

**Primary:** Phone connect rate (calls answered / approved BH users) — must increase vs. control across winning variants.

**Secondary:**

- Time-to-connect: Does scheduling shift connects later in the day? Net effect on same-day connect volume?
- Variant A only: Scheduling pick rate (users who interact with the time-slot picker) and scheduled-call connect rate vs. unscheduled
- "Skip the line—call now" CTA click rate across variants — a meaningful drop signals a variant is suppressing immediate connects without replacing them

**Hypothesis validation:**

- **Variant A:** If the commitment device is the driver, scheduled calls should connect at a materially higher rate than unscheduled — confirming the mechanism, not just traffic sorting
- **Variant B:** If expectation-setting is the driver, connect rate improves without meaningful change in time-to-connect — users are more ready for the call, not deferring it
- **Variant C:** If timing agency is the driver, connect rate improves and time-to-connect shifts slightly later (users are scheduling around their availability), but same-day connect volume holds
- **Variant D:** If value anchoring is the driver, connect rate improves and text response rate (or open/engagement rate if measurable) is higher than other variants — users are engaging with the text faster because they believe it contains their results

---

## 7. Constraints & Assumptions

**Fixed:**

- Text infrastructure: Ethos already sends a pre-call text; copy is fully changeable
- Phone call is the required transmission endpoint — no variant changes this
- "Skip the line—call now" CTA label and placement are fixed across all variants
- BH scope only; NBH users see control for this test

**Assumed:**

- Text fires on page load for all variants, same timing as control
- Variant A scheduling mechanic TBD — this PRD treats the picker as a UI component; backend integration defined separately
- Sufficient BH traffic to reach significance within a reasonable test window

**Open questions:**

- Variant A: What powers the time-slot picker? Link to external scheduler, agent-text-back, or other? Needs resolution before build.
- Agent avatar is held fixed across control and all variants — not a variable in this test.

---

## 8. Next Steps

- [ ] Resolve Variant A scheduling mechanic (link vs. agent-text-back vs. other) before build
- [ ] Run `/prd-review` for quality audit
- [ ] Share with stakeholders (design, eng, sales ops)
- [ ] Build prototypes for Variant A UI and B/C/D copy treatments
- [ ] Implement and launch (BH only)
- [ ] Analyze: validate per-variant hypothesis before declaring a winner
