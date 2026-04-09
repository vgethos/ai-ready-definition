---
last_updated: 2026-02-25
category: prd
prototype: ethos-prototypes/prototypes/iul/feb_2026/meta_lp_cta_v1/meta-lp-cta-canvas.html
---

# Meta Landing Page CTA Optimization — PRD v2

## Objective

**Problem:** IUL LP currently has primary CTA only ("Check my price"). Low-intent visitors have no guided path—they either convert immediately or bounce. We're losing traffic at the moment of decision hesitation, when visitors are uncertain about whether to quote, what IUL is, or if it's relevant to them.

**Solution:** Add secondary CTA (inviting question + sub-paths) below the primary button to capture visitors at different points of hesitation and guide them toward conversion.

**What we're testing:** 5 distinct secondary CTA treatments, each addressing a different reason why a visitor might hesitate before quoting.

---

## Principles

Before testing treatments, we commit to these beliefs:

1. **Low-intent visitors have distinct hesitations.** Not all hesitation is the same. Some are confused (don't understand the product), some are afraid (worried about cost), some are skeptical (unsure if it's for them), and some don't see the value prop yet. We test distinct hypotheses.

2. **The inviting question must match the hesitation.** A visitor afraid of pricing won't click "What's the wealth angle?" They'll click "What's the real cost?" The hook must speak to their actual concern.

3. **Sub-paths are not feature lists.** Sub-paths aren't a menu of things to learn; they're *different ways to think about the decision*. Each sub-path offers a distinct lens or entry point.

4. **The primary CTA stays fixed.** All tests keep "Check my price" as primary. We isolate the secondary CTA variable: inviting question + sub-paths.

5. **Proven patterns can compete.** Term's secondary CTA winner ("Not sure where to begin?" + 3 decision-paralysis ramps) is a proven pattern. It competes against IUL-specific hypotheses.

6. **Character limit is real:** 30 characters max for inviting question to avoid wrapping on mobile.

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
- **IUL context:** Term traffic is warm (knows what life insurance is). IUL traffic on Meta is cold (unfamiliar with the product). **We'll test this proven pattern (Test E) alongside IUL-specific hypotheses (Tests A-D) to see if decision paralysis or a specific hesitation matters most.**

**Design reference:**
![Mobile: Secondary CTA stacked layout](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile.png>)

![Mobile: Secondary CTA expanded](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile - Expanded.png>)

### Meta IUL Ads: Winning Creative Insights
- **Highest performer:** "video_at_desk" — 3x+ outperforms other IUL creatives
- **Format:** Conversational, educational, benefit-focused
- **Key themes and test connections:**
  - Opens with product education: "Do you know what is an IUL?" → supports **Test B** (confusion/product education hypothesis)
  - Emphasizes dual benefit: death benefit + cash value growth → supports **Test D** (benefit blindness hypothesis)
  - Use cases: renovate, buy house, pay for college → supports **Test C** ("I want accessible emergency funds" sub-path)
  - Downside protection: "0% floor" protects against market losses → supports **Test B** ("How does downside protection work?" sub-path)
  - Closing hook: "If you're curious if an IUL fits your long-term goals" → supports **Test C** (skepticism/fit hypothesis)

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

**Tests A-D are IUL-specific hypotheses ordered by conviction/novelty (richest first). Test E is the proven Term pattern, included as a control/validation test. Descriptions below are in narrative order (A–D: IUL-specific; E: proven control). The Testing Strategy table re-ranks by validation strength (E first, then B, A, D, C). Both orderings are intentional — see Testing Strategy for the full rationale.**

---

### **Test A: Fear (Pricing Anxiety) — Conviction: 8/10 (IUL-specific)**

```
PRIMARY CTA:     Check my price
INVITING Q:      What will I pay?
├─ Sub-path 1:   How much will I pay each month?
├─ Sub-path 2:   How does it compare to term?
└─ Sub-path 3:   What factors affect my rate?
```

**Hypothesis:** Low-intent visitor fears sticker shock on pricing. They want cost transparency before quoting. By offering it upfront, we reduce the hesitation barrier.

**Why this works:** Visitor learns that IUL pricing varies by age, health, and carrier—and understands their own cost range before committing to a quote. The mystery that drives hesitation is removed.

**User motivation:** "I want to know if I can afford this before I quote."

**Vocabulary precision:**

- "How much will I pay each month?" = Monthly cost (not total, not lifetime)
- "How does it compare to term?" = IUL cost vs. term cost (lets user benchmark against familiar product)
- "What factors affect my rate?" = What I can't control (age, health) vs. can (coverage amount, term length)

---

### **Test B: Confusion (Product Education) — Conviction: 9/10 (IUL-specific, highest)**

```
PRIMARY CTA:     Check my price
INVITING Q:      How does IUL build wealth?
├─ Sub-path 1:   How do I protect AND build wealth?
├─ Sub-path 2:   What can I borrow against?
└─ Sub-path 3:   How does downside protection work?
```

**Hypothesis:** Low-intent visitor doesn't understand what IUL is or why it's different. They need the benefit story (not the product spec) before they'll quote.

**Why this works:** Meta traffic is attracted by narrative. By leading with concrete benefits ("protect AND build," "borrow against"), we teach through *what it does for them*. This respects how people learn on social.

**User motivation:** "I want to understand why IUL is different from regular life insurance."

**Vocabulary precision:**

- "How do I protect AND build wealth?" = IUL is dual-benefit (death protection + cash growth), not one or the other
- "What can I borrow against?" = Cash value isn't locked away—you can access it while alive
- "How does downside protection work?" = When markets fall, your cash value won't (0% floor). This is the differentiator from direct market investing.

---

### **Test C: Skepticism (Personal Fit) — Conviction: 7/10 (IUL-specific)**

```
PRIMARY CTA:     Check my price
INVITING Q:      Is this right for me?
├─ Sub-path 1:   I want to protect my family
├─ Sub-path 2:   I want to build long-term wealth
└─ Sub-path 3:   I want accessible emergency funds
```

**Hypothesis:** Low-intent visitor is skeptical it's designed for them. They want to self-evaluate fit by mapping to their own financial goal.

**Why this works:** By presenting concrete goals ("I want to protect my family," "I want to build long-term wealth") rather than asking a closed question, we let users self-select into the scenario that matches them. This moves from "am I good enough for this?" to "which of these describes me?" More empowering, less gatekeep-y.

**User motivation:** "I want to know if this solves a problem I actually have."

**Vocabulary precision:**

- "I want to protect my family" = Standard insurance use case. Does IUL do this? Yes.
- "I want to build long-term wealth" = IUL adds a wealth component on top of protection. Does this matter to me?
- "I want accessible emergency funds" = Can I tap my cash value for non-emergency needs (college, renovation, emergency)? Yes.

---

### **Test D: Benefit Blindness (Death Benefit as Wealth) — Conviction: 8/10 (IUL-specific)**

```
PRIMARY CTA:     Check my price
INVITING Q:      How does IUL grow your money?
├─ Sub-path 1:   How much could my death benefit grow?
├─ Sub-path 2:   How do I get market growth safely?
└─ Sub-path 3:   Can I use my growth while alive?
```

**Hypothesis:** Low-intent visitor doesn't see the death benefit as a wealth-building tool. They think "death benefit = static payout." Once positioned as a growing asset tied to markets (with downside protection), motivation shifts from "do I need insurance?" to "how do I access this growth?"

**Why this works:** This is genuinely novel positioning. Most life insurance has a static death benefit. IUL's allows growth. Each sub-path explains why this matters: upside (emotional benefit for family), mechanism (how growth works), access (practical benefit for you).

**User motivation:** "I want to understand how insurance can be an investment."

**Vocabulary precision:**

- "How does IUL grow your money?" = Death benefit + cash value can both increase over time, tied to market index performance — with downside protection
- "How much could my death benefit grow?" = Growth is tied to market index (capped upside, but not unlimited)
- "How do I get market growth safely?" = You get market-like returns (S&P 500, etc.) BUT you're protected when markets drop (0% floor, so no losses)
- "Can I use my growth while alive?" = You can borrow against your cash value during your lifetime (not just leave it to heirs)

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

**Why this works:** Proven pattern on Term. Addresses decision paralysis by treating it as a prioritization problem: which concern matters most to me? Visitor chooses their entry point and momentum builds.

**User motivation:** "I don't know where to start, so I need guidance on what to tackle first."

**Vocabulary precision:**

- "What is an IUL?" = Product education (what is this thing?)
- "What will it cost me?" = Affordability question (what's the financial commitment?)
- "Is it right for me?" = Relevance question (does this solve my problem?)

**Why this is a control test:**

- If E dominates all others in click rate, decision paralysis was the real barrier (not a specific hesitation like pricing fear or product confusion)
- If A-D outperform E, IUL-specific hesitations matter more than general decision paralysis
- This validates whether the proven Term pattern translates directly to IUL, or if IUL needs its own approach

---

## Testing Strategy

**Test ordering note:** The table below ranks tests by validation strength (E = proven on Term, A-D = IUL-specific hypotheses). The individual test descriptions above are ordered by novelty/hypothesis richness (A-D first, E as control). Both orderings matter for different reasons:
- **Validation strength order** (table) helps us understand which approach is backed by prior evidence
- **Narrative/hypothesis order** (descriptions) keeps the story coherent—IUL-specific hypotheses first, proven control pattern last

| Test | Conviction | Hypothesis | Inviting Q | If this wins, it means... |
|---|---|---|---|---|
| **E** | 9/10 (Proven) | Decision Paralysis (Term pattern) | "Not sure where to start?" | Decision paralysis is the real barrier — the proven Term pattern works for IUL too |
| **B** | 9/10 (Highest) | Confusion (Product Ed) | "How does IUL build wealth?" | Product confusion is the barrier — visitors need the benefit story before they'll quote |
| **A** | 8/10 | Fear (Pricing) | "What will I pay?" | Pricing anxiety is the barrier — cost transparency before quoting removes hesitation |
| **D** | 8/10 | Benefit Blindness (Growth) | "What if your death benefit grew?" | Visitors don't see IUL as a wealth tool — repositioning the death benefit unlocks intent |
| **C** | 7/10 | Skepticism (Fit) | "Is this right for me?" | Fit skepticism is the barrier — goal-matching sub-paths let visitors self-select in |

**Approach:** Run all 5 tests in parallel to isolate which hesitation matters most to Meta traffic. See Success Metrics for the full tracking plan.

---

## Success Metrics

### Primary Metric
- **Inviting question click rate by variant** (which hypothesis resonates most?)
  - This tells us which hesitation matters most to Meta traffic
  - If E dominates: Decision paralysis is real (proven pattern works for IUL too)
  - If A dominates: Pricing anxiety is the barrier
  - If B dominates: Product confusion is the barrier
  - And so on

### Secondary Metrics
- **Sub-path selection distribution** (within each variant, which specific sub-path gets clicked?)
  - If A users concentrate on "Compare to term" → benchmarking matters
  - If B users concentrate on "Protect AND build wealth" → dual-benefit narrative matters
  - If D users concentrate on "Can I use my growth while alive?" → access/liquidity matters
- **Landing → Lead conversion rate by variant** (vs. baseline with primary CTA only)
- **Pre-Interview Start rate by variant** (secondary indicator of engagement)
- **Quote completion rate by variant** (do secondary CTA users convert at equal or higher rates than primary-CTA-only?)

### Hypothesis Validation
- **E (Decision Paralysis):** High click rate + balanced sub-path distribution (users spread across all 3) = decision paralysis was real
- **A (Fear):** High click rate + concentrated on cost-related sub-paths = pricing clarity matters
- **B (Confusion):** High click rate + concentrated on education sub-paths + longer time-on-page = product education matters
- **C (Skepticism):** High click rate + concentrated on goal-matching sub-paths + high conversion = fit-matching matters
- **D (Benefit Blindness):** High click rate + concentrated on growth/access sub-paths = death-benefit-as-growth positioning matters

### Analysis Questions
- Which hesitation is real for Meta traffic? (Primary learning)
- Do secondary CTA users eventually quote at equal or higher rates than primary-CTA-only? (Quality validation)
- Is there segmentation? (Older visitors prefer A, younger prefer D, etc.) (Bonus learning)

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
9. **Video insights translate:** High-performing Meta creative themes (dual benefit, downside protection, use cases) inform copy strategy.

---

## Next Steps

1. **Stakeholder review:** Confirm all 5 test hypotheses align with business priorities and conversion goals
2. **Copy refinement:** Finalize sub-path language to ensure clarity and consistency across all 5 variants
3. **Implement & QA:** Build test variants in LP with design pattern
4. **Launch & monitor:** Run all 5 tests in parallel (or staggered if platform constraints apply)
   - Track inviting question click rate
   - Track sub-path selection
   - Track funnel metrics (landing → lead → pre-interview → quote)
5. **Analyze & iterate:**
   - Identify winning hypothesis (which hesitation matters most to Meta traffic?)
   - Winner becomes new baseline for future tests
   - Consider segmentation analysis (do different user segments respond to different hypotheses?)
