---
last_updated: 2026-02-24
category: prd
prototype: ethos-prototypes/prototypes/iul/feb_2026/meta_lp_cta_v1/meta-lp-cta-canvas.html
---

# Meta Landing Page CTA Optimization — PRD v1.5

## What Changed (v1 → v1.5)

**Trigger:** Ash's stakeholder feedback + deeper analysis of the video_at_desk creative.

**Core insight:** After watching the ad, users are not in "teach me more" mode. They just got a 90-second product education. Old Tests B and D asked users to re-learn what the video already covered. v1.5 replaces them with questions the video opened but didn't close: comparison to term, and what to do with the cash value.

| | v1 | v1.5 |
|---|---|---|
| Test A | Fear (Pricing) — keep | Fear (Pricing) — keep, minor copy tightening |
| Test B | Confusion ("How does IUL build wealth?") — **dropped** | Fit / Relevance ("Is IUL right for me?") — revised + stronger sub-paths |
| Test C | Skepticism ("Is this right for me?") — promoted | Comparison ("Is IUL better than term?") — **new** |
| Test D | Benefit Blindness ("How does IUL grow your money?") — **dropped** | Access / Borrowing ("What can I borrow against?") — **new** |
| Test E | Decision Paralysis (Term pattern) — keep | Decision Paralysis (Term pattern) — keep |

**New Principle 7:** Top-of-funnel questions must spark curiosity, not educate. The ad already teaches. The LP's job is to surface the gap the ad opened.

---

## Objective

**Problem:** IUL LP currently has primary CTA only ("Check my price"). Low-intent visitors have no guided path — they either convert immediately or bounce. We're losing traffic at the moment of decision hesitation, when visitors are uncertain about whether to quote, what IUL is, or if it's relevant to them.

**Solution:** Add secondary CTA (inviting question + sub-paths) below the primary button to capture visitors at different points of hesitation and guide them toward conversion.

**What we're testing:** 5 distinct secondary CTA treatments, each addressing a different reason why a visitor might hesitate before quoting.

---

## Principles

Before testing treatments, we commit to these beliefs:

1. **Low-intent visitors have distinct hesitations.** Not all hesitation is the same. Some are afraid (worried about cost), some are uncertain (unsure if it's for them), some are comparing (has term, wondering if IUL is better), and some are curious about a specific benefit the ad surfaced. We test distinct hypotheses.

2. **The inviting question must match the hesitation.** A visitor afraid of pricing won't click "What can I borrow?" They'll click "What will I pay?" The hook must speak to their actual concern.

3. **Sub-paths are not feature lists.** Sub-paths aren't a menu of things to learn; they're *different ways to think about the decision*. Each sub-path offers a distinct lens or entry point.

4. **The primary CTA stays fixed.** All tests keep "Check my price" as primary. We isolate the secondary CTA variable: inviting question + sub-paths.

5. **Proven patterns can compete.** Term's secondary CTA winner ("Not sure where to begin?" + 3 decision-paralysis ramps) is a proven pattern. It competes against IUL-specific hypotheses.

6. **Character limit is real.** 30 characters max for inviting question to avoid wrapping on mobile.

7. **Top-of-funnel questions must spark, not educate.** After watching the ad, visitors aren't in "teach me more" mode — they're in "is this for me?" mode. Questions that invite more product education (e.g., "How does IUL build wealth?") are misaligned to where users are in their decision. The inviting question's job is to surface the gap the ad opened — not restate what the ad already taught. Onboarding handles the education.

---

## Context: Current State & Inspiration

### IUL Landing Page (Current)
- **Current secondary CTA:** None. Primary CTA only: "Check my price"
- **Limitation:** Single conversion path. Low-intent visitors have no guided option; they either convert immediately or leave.

![IUL Landing Page — Current Hero](docs/iul_projects/feb_2026/meta_lp_cta_v1/current_hero_iul_meta_lp.png)

### Term Funnel (Winning Pattern — Reference for Test E)
[Figma](https://www.figma.com/design/zuTaXroPYKZTECJnUFXwzZ/DualCTA-V2-Meta?node-id=46537-37727&t=s3GvQZ9vvcEzU4Q2-0)

- **Secondary CTA in place:** Below primary button, expandable
- **Winner:** "Not sure where to begin?" + 3 sub-paths: "Not sure what to buy?" / "What's my budget?" / "Need a quote fast?"
- **What makes it work:** Addresses decision paralysis by offering three different entry ramps (product clarity, affordability, speed). Visitors choose *where to start* in their decision journey.
- **IUL context:** Term traffic is warm (knows what life insurance is). IUL traffic on Meta is cold (unfamiliar with the product). We'll test this proven pattern (Test E) alongside IUL-specific hypotheses to see if decision paralysis or a specific hesitation matters most.

**Design reference:**
![Mobile: Secondary CTA stacked layout](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile.png>)

![Mobile: Secondary CTA expanded](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile - Expanded.png>)

### Meta IUL Ads: Winning Creative — Video at Desk

**Highest performer:** "video_at_desk" — 3x+ outperforms other IUL creatives. A 90-second conversational explainer covering: product definition, dual benefit (death benefit + cash value), borrowing mechanics and use cases, market growth via S&P 500 index, 0% floor downside protection.

**Closing hook (verbatim):** *"If you're curious if an IUL fits your long-term goals, Ethos has an IUL option where you can look at the features, the costs, and how it lines up with your larger financial or estate plan to decide if it's right for you."*

**What the video fully teaches (don't re-ask on the LP):**
- What IUL is and how it works
- That it has both a death benefit and a cash value component
- That you can borrow against cash value for anything — no restrictions
- That it tracks a market index (S&P 500) with a 0% floor
- Specific use cases: renovate a house, buy a house, pay for kids' college

**What the video plants but doesn't close — these are the LP's openings:**

| Gap the video opens | Test that addresses it |
|---|---|
| "What will this cost me?" — video says to check costs, quotes no number | Test A |
| "Is this actually right for someone like me?" — the video's literal send-off question | Test B |
| "Is this better than my term policy?" — video never makes this comparison | Test C |
| "How does the borrowing work in my situation?" — video teases it, doesn't detail it | Test D |
| "I don't know where to start" — general decision paralysis | Test E |

**v1.5 hypothesis:** Tests anchored to gaps the video opens will outperform tests that re-teach what the video already answered (v1 Tests B and D).

---

## Secondary CTA Design Pattern

**Structure:** Primary button ("Check my price") + expandable secondary question with 3 sub-paths

**Behavior:**

- Visitor sees inviting question below primary CTA
- Click → expands to reveal 3 sub-paths
- Each sub-path is clickable and leads toward eventual quote

**Design specs:**

- Position: Below primary button (hero section)
- Style: Outlined/link-style (low visual weight)
- Max character width: ~30 characters (no wrapping on mobile)
- Responsive: Stacks on mobile, side-by-side on desktop
- Reference: Term's design pattern (proven to work)

---

## Five Test Treatments

**All tests use primary CTA: "Check my price"**

Inviting question and sub-paths vary based on hypothesis.

**Tests A–D are IUL-specific hypotheses. Test E is the proven Term pattern, included as a control/validation test. Descriptions below are in narrative order (A–D: IUL-specific; E: proven control). The Testing Strategy table re-ranks by validation strength (E first, then B, A, D, C).**

---

### **Test A: Fear (Pricing Anxiety) — Conviction: 8/10 (IUL-specific)**

```
PRIMARY CTA:     Check my price
INVITING Q:      What will I pay?
├─ Sub-path 1:   How much per month?
├─ Sub-path 2:   How does it compare to term?
└─ Sub-path 3:   What affects my rate?
```

**Hypothesis:** Low-intent visitor fears sticker shock. They want cost transparency before quoting. By offering it upfront, we reduce the hesitation barrier.

**Why this works:** The video tells users to "look at the costs" — then gives them no number. That gap drives hesitation. "What will I pay?" closes it. Visitor learns that IUL pricing varies by age, health, and carrier — and can estimate their own range before committing to a quote.

**Video connection:** The closing line names costs as a reason to visit Ethos. This test delivers on that promise directly.

**User motivation:** "I want to know if I can afford this before I quote."

**Vocabulary precision:**
- "How much per month?" = Monthly cost — the number people actually budget with, not total or lifetime
- "How does it compare to term?" = IUL vs. term cost; lets user benchmark against the product they likely know
- "What affects my rate?" = Surfaces what they can and can't control (age/health vs. coverage amount)

---

### **Test B: Fit / Relevance — Conviction: 9/10 (IUL-specific)**

```
PRIMARY CTA:     Check my price
INVITING Q:      Is IUL right for me?
├─ Sub-path 1:   Will it protect my family?
├─ Sub-path 2:   How does it build my wealth?
└─ Sub-path 3:   Can I access my cash value?
```

**Hypothesis:** Low-intent visitor is uncertain whether IUL is designed for someone like them. They need to self-evaluate fit by mapping to their own goal before they'll quote.

**Why this works:** The video's closing hook is literally "if you're curious if an IUL fits your long-term goals." Users arrive already primed with this question. By presenting three concrete goals (protection, growth, access), we let users self-select into the scenario that matches them. Moves from "am I the right type of person?" to "which of these describes me?" — more empowering, less gatekeep-y.

**Video connection:** This is the direct pickup from the video's closing line. The video opens the question; this test closes it.

**User motivation:** "I want to know if this solves a problem I actually have."

**Sub-path rationale:**
- "Will it protect my family?" = Standard insurance use case. Death benefit to beneficiaries. Video confirmed IUL does this.
- "How does it build my wealth?" = IUL's distinctive cash value growth proposition. Users who heard "build wealth while you're alive" will click here.
- "Can I access my cash value?" = The borrowing use case the video emphasized for 30 seconds. Users who lit up at "renovate, buy a house, college" will click here.

**Vocabulary precision:**
- "Is IUL right for me?" vs. v1's "Is this right for me?" — naming the product sets expectations and reduces ambiguity about what they're evaluating
- Sub-paths are questions, not statements — they feel like a destination ("take me to the answer") rather than a self-identification quiz

---

### **Test C: Comparison (Term vs. IUL) — Conviction: 7/10 (IUL-specific, new in v1.5)**

```
PRIMARY CTA:     Check my price
INVITING Q:      Is IUL better than term?
├─ Sub-path 1:   What does term not give me?
├─ Sub-path 2:   Can my death benefit grow?
└─ Sub-path 3:   How do the costs compare?
```

**Hypothesis:** A segment of Meta visitors is insurance-aware — they have term or have considered it. The video doesn't make the IUL vs. term comparison. These users are asking "what does IUL give me that term doesn't?" and the LP currently has no answer for them. By surfacing the comparison, we help them make a more informed decision.

**Why this works:** Term is the most familiar life insurance product. Many IUL prospects either have it or know about it. The video never contrasts the two — which means insurance-aware visitors are making their own comparison, possibly incorrectly. This test gives them a structured path to work through it.

**Video connection:** The video doesn't compare to term. This is the gap. Users who already have term and are evaluating whether to switch or supplement have nowhere to go on the current LP.

**User motivation:** "I want to understand what IUL gives me that my term policy doesn't."

**Vocabulary precision:**
- "Is IUL better than term?" = Direct comparison. "Better" is intentionally subjective — it invites users to evaluate on their own terms (cost? growth? access?)
- "What does term not give me?" = Frames IUL as additive to what they know. Curiosity-driven; works for users who have term or are considering it
- "Can my death benefit grow?" = Term has a static death benefit; IUL's can grow — this is the core differentiator. Phrased as a question to create intrigue
- "How do the costs compare?" = IUL generally costs more than term. This sub-path is for cost-sensitive users; honest, not avoidant

---

### **Test D: Access / Borrowing (Video Continuity) — Conviction: 8/10 (IUL-specific, new in v1.5)**

```
PRIMARY CTA:     Check my price
INVITING Q:      What can I borrow against?
├─ Sub-path 1:   Can I fund a big purchase?
├─ Sub-path 2:   Can I use it in an emergency?
└─ Sub-path 3:   Can I use it for college?
```

**Hypothesis:** The video's most-emphasized benefit is borrowing against cash value — it spends 30 seconds on it, more than any other topic, and names specific use cases verbatim. Visitors who clicked through because of that section arrive asking "how does this work for me?" This test gives them a direct path from that curiosity to the quote.

**Why this works:** The video says you CAN borrow — but doesn't say how much, when, or what the mechanics are. The gap between "I can borrow against this" and "I want to quote" is exactly what this test bridges. Each sub-path maps to a use case the video named explicitly.

**Video connection:** This is the most literal video-to-LP continuity of any test in v1.5. Sub-paths map directly to the video's examples: "renovate your house, buy a house, pay for your kids' college education."

**User motivation:** "I want to know if IUL can fund the specific thing I have in mind."

**Sub-path rationale:**
- "Can I fund a big purchase?" = Covers home renovation and major purchases (video's first two examples). "Can I" creates pull — user wants confirmation
- "Can I use it in an emergency?" = Safety net framing — cash value as financial insurance you can actually use. Most relatable for risk-averse users
- "Can I use it for college?" = Specific use case the video named verbatim. Highly relatable for parents; concrete enough to drive self-selection

**Vocabulary precision:**
- "What can I borrow against?" = Echoes the video's language: "borrowing against it." Ad-to-LP continuity is deliberate
- Sub-paths open with "Can I..." — this phrasing creates desire for confirmation; the user wants to hear "yes, and here's how"

---

### **Test E: Decision Paralysis (Term-Inspired Pattern) — Conviction: 9/10 (Proven on Term, Control Test)**

```
PRIMARY CTA:     Check my price
INVITING Q:      Not sure where to start?
├─ Sub-path 1:   What is an IUL?
├─ Sub-path 2:   What will it cost me?
└─ Sub-path 3:   Is it right for me?
```

**Hypothesis:** Low-intent visitor is frozen by too many unknowns. They don't know where to begin (product clarity, cost, or fit). By offering three distinct entry ramps, we let them start wherever feels most relevant. **This is a proven pattern from Term; we're testing if decision paralysis (not a specific hesitation) is the real issue.**

**Why this works:** Proven pattern on Term. Addresses decision paralysis by treating it as a prioritization problem: which concern matters most to me? Visitor chooses their entry point and momentum builds from there.

**User motivation:** "I don't know where to start, so I need guidance on what to tackle first."

**Vocabulary precision:**
- "What is an IUL?" = Product education ramp — for users who watched the video but didn't retain it, or came in from a different ad
- "What will it cost me?" = Affordability question (what's the financial commitment?)
- "Is it right for me?" = Relevance question (does this solve my problem?)

**Why this is the control test:**
- If E dominates: Decision paralysis is the real barrier — proven Term pattern works for IUL too
- If A–D outperform E: IUL-specific hesitations matter more than general paralysis
- This validates whether the proven Term pattern translates directly to IUL, or if IUL traffic needs its own approach

---

## Testing Strategy

**Test ordering note:** The table below ranks tests by validation strength (E = proven on Term; A–D = IUL-specific). The individual descriptions above are ordered by hypothesis richness (A–D: IUL-specific; E: control). Both orderings matter for different reasons:
- **Validation strength order** (table) helps understand which approach has prior evidence backing it
- **Narrative/hypothesis order** (descriptions) keeps the story coherent — IUL-specific hypotheses first, proven control pattern last

| Test | Conviction | Hypothesis | Inviting Q | If this wins, it means... |
|---|---|---|---|---|
| **E** | 9/10 (Proven) | Decision Paralysis (Term pattern) | "Not sure where to start?" | Decision paralysis is the real barrier — proven Term pattern works for IUL too |
| **B** | 9/10 (Highest) | Fit / Relevance | "Is IUL right for me?" | Fit uncertainty is the barrier — visitors need to self-select into a goal before they'll quote |
| **A** | 8/10 | Fear (Pricing) | "What will I pay?" | Pricing anxiety is the barrier — cost transparency before quoting removes hesitation |
| **D** | 8/10 | Access / Borrowing | "What can I borrow against?" | The borrowing use case is the conversion driver — video continuity matters |
| **C** | 7/10 | Comparison (Term vs. IUL) | "Is IUL better than term?" | Insurance-aware visitors are a real segment — comparison framing unlocks their intent |

**Approach:** Run all 5 tests in parallel to isolate which hesitation matters most to Meta traffic. See Success Metrics for the full tracking plan.

---

## Success Metrics

### Primary Metric
- **Inviting question click rate by variant** (which hypothesis resonates most?)
  - If E dominates: Decision paralysis is real (proven pattern works for IUL too)
  - If A dominates: Pricing anxiety is the barrier
  - If B dominates: Fit uncertainty is the barrier
  - If C dominates: Term comparison is the barrier for insurance-aware visitors
  - If D dominates: Borrowing use case is the primary curiosity driver

### Secondary Metrics
- **Sub-path selection distribution** (within each variant, which specific sub-path gets clicked?)
  - If A users concentrate on "How does it compare to term?" → benchmarking matters more than raw cost
  - If B users concentrate on "Can I access my cash value?" → video's borrowing hook is the conversion signal
  - If C users concentrate on "What does term not give me?" → cross-sell/upgrade framing is the key angle
  - If D users concentrate on a specific use case → naming the use case matters more than the general access question
- **Landing → Lead conversion rate by variant** (vs. baseline with primary CTA only)
- **Pre-Interview Start rate by variant** (secondary indicator of engagement)
- **Quote completion rate by variant** (do secondary CTA users convert at equal or higher rates than primary-CTA-only?)

### Hypothesis Validation
- **E (Decision Paralysis):** High click rate + balanced sub-path distribution (users spread across all 3) = decision paralysis was real
- **A (Fear):** High click rate + concentrated on cost-related sub-paths = pricing clarity matters
- **B (Fit):** High click rate + concentrated on goal-matching sub-paths + high funnel conversion = goal self-selection matters
- **C (Comparison):** High click rate + concentrated on "I already have term" = comparison segment is real and worth building for
- **D (Access):** High click rate + concentrated on specific use case sub-paths = naming the use case beats the general access question

### Analysis Questions
- Which hesitation is real for Meta traffic? (Primary learning)
- Do secondary CTA users eventually quote at equal or higher rates than primary-CTA-only? (Quality validation)
- Is there segmentation? (Insurance-aware visitors prefer C; use-case-motivated visitors prefer D; price-sensitive prefer A) (Bonus learning)

---

## Constraints & Assumptions

1. **Primary CTA fixed:** All tests keep "Check my price" as the primary button. Only secondary CTA varies.
2. **Design pattern fixed:** Secondary CTA uses outlined/link style, positioned below primary button, expandable on click.
3. **Character limit:** Inviting questions must be ≤30 characters to avoid wrapping on mobile.
4. **One treatment per visitor:** Each variant is mutually exclusive; no mixing of treatments.
5. **Traffic split:** Equal 20% allocation across all 5 variants. Minimum run duration TBD based on traffic volume and required statistical significance (recommend 95% confidence, 2-week minimum).
6. **Baseline:** Current primary-CTA-only conversion rate to be confirmed before launch — needed to evaluate whether secondary CTA variants lift or hurt overall conversion.
7. **Sub-path destinations:** Each sub-path must link to a defined destination (modal, drawer, or page). Destinations TBD during copy refinement and design; eng will need these to build.
8. **Meta traffic context:** Cold audience, high volume, short attention span, attraction to narrative over specs.
9. **Video-ad continuity:** Traffic for this test arrives primarily via video_at_desk. Test hypotheses are anchored to gaps that ad opens — not topics it already covered.

---

## Next Steps

1. **Stakeholder review:** Confirm updated test hypotheses (especially new Tests C and D) align with business priorities
2. **Copy refinement:** Finalize sub-path language; confirm sub-path destinations (modal, drawer, or page)
3. **Implement & QA:** Build test variants in LP with design pattern
4. **Launch & monitor:** Run all 5 tests in parallel (or staggered if platform constraints apply)
   - Track inviting question click rate
   - Track sub-path selection
   - Track funnel metrics (landing → lead → pre-interview → quote)
5. **Analyze & iterate:**
   - Identify winning hypothesis
   - Winner becomes new baseline for future tests
   - Segmentation analysis: do insurance-aware visitors (C), use-case-motivated visitors (D), or price-sensitive visitors (A) show up as distinct groups?
