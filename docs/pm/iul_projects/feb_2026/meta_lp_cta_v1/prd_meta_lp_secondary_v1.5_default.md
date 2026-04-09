---
last_updated: 2026-02-25
category: prd
prototype: ethos-prototypes/prototypes/iul/feb_2026/meta_lp_cta_v1/meta-lp-cta-canvas.html
---

# Meta Landing Page CTA Optimization — PRD v2

## Objective

**Problem:** IUL LP currently has primary CTA only ("Check my price"). Low-intent visitors have no guided path — they either convert immediately or bounce. We're losing traffic at the moment of decision hesitation, when visitors are uncertain about whether to quote, what IUL is, or if it's relevant to them.

**Solution:** Add secondary CTA (inviting question + sub-paths) below the primary button to capture visitors at different hesitation points and guide them toward conversion.

**What we're testing:** 5 secondary CTA treatments, each addressing a distinct post-video hesitation. V2 is more tightly aligned to the *video_at_desk* creative — the highest-performing IUL ad (3x+ outperformance) — than v1 treatments were.

---

## What Changed from V1

V2 is a direct response to two inputs: Ash's review of v1 copy, and a deeper analysis of what the *video_at_desk* transcript actually answers — and what it leaves unresolved.

| V1 Test | V1 Inviting Q | V2 Disposition | Reason |
|---|---|---|---|
| A (Pricing) | "What will I pay?" | → C-v2: "What does IUL cost?" | Register shifted from fear-based to evaluative; matches the ad's own language ("look at the costs") |
| B (Confusion) | "How does IUL build wealth?" | Retired | Video already answers the full mechanism; this is sub-path territory, not an inviting question |
| C (Fit) | "Is this right for me?" | → B-v2: "Is IUL right for me?" | "IUL" sharpens the hook; sub-paths updated to echo the ad's specific language (borrow use cases, market growth) |
| D (Growth) | "How does IUL grow your money?" | Retired | Too similar to v1-B; mechanistic question already answered by the video; comparison gap is what actually remains |
| E (Paralysis) | "Not sure where to start?" | → E-v2: same, sub-paths updated | "What is an IUL?" removed (ad answers it); replaced with comparison + fit sub-paths more relevant to post-video state |

**New tests in v2:**
- **A-v2: "IUL vs. term: which wins?"** — comparison framing fills the biggest gap v1 ignored; Ash confirmed comparison questions ("Is IUL better than term?") are strong entry points
- **D-v2: "What would my family get?"** — legacy/death benefit angle was entirely absent from v1; product review notes confirm "3-5X for family" as the primary value proposition

**Design note:** Trust wreaths (Forbes Advisor + Business Insider laurel badges) must appear above the fold in all variant designs. Confirm placement in prototype before QA.

---

## Principles

1. **Low-intent visitors have distinct hesitations.** Pricing anxiety, fit skepticism, comparison indecision, and legacy questions are different. We test distinct hypotheses.

2. **The inviting question must match the hesitation.** A visitor afraid of pricing won't click "What would my family get?" They'll click "What does IUL cost?" The hook must speak to the actual concern.

3. **Sub-paths are not feature lists.** Sub-paths aren't a menu of things to learn; they're *different ways to think about the decision*. Each sub-path offers a distinct entry point.

4. **The primary CTA stays fixed.** All tests keep "Check my price" as primary. We isolate the secondary CTA variable.

5. **Proven patterns can compete.** Term's secondary CTA winner ("Not sure where to begin?" + 3 decision ramps) is a proven pattern. It competes as Test E.

6. **Character limit is real.** 30 characters max for inviting question to avoid wrapping on mobile.

7. **Match hesitation to funnel stage.** Visitors arriving from *video_at_desk* have partial product knowledge — the ad already handles "what is IUL," dual benefit, borrowing mechanics, S&P linkage, and the 0% floor. Secondary CTAs must assume this baseline. They answer post-video questions, not re-teach what the ad already explained.

---

## Context

### IUL Landing Page (Current)

- **Primary CTA only:** "Check my price"
- **No secondary path** — low-intent visitors have nowhere to go but convert or leave.

![IUL Landing Page — Current Hero](docs/iul_projects/feb_2026/meta_lp_cta_v1/current_hero_iul_meta_lp.png)

### Term Funnel (Winning Pattern — Reference for Test E)

[Figma](https://www.figma.com/design/zuTaXroPYKZTECJnUFXwzZ/DualCTA-V2-Meta?node-id=46537-37727&t=s3GvQZ9vvcEzU4Q2-0)

- **Winner:** "Not sure where to begin?" + "Not sure what to buy?" / "What's my budget?" / "Need a quote fast?"
- **Why it works:** Treats decision paralysis as a prioritization problem. Visitors choose where to start — product clarity, affordability, or speed.
- **Lesson for IUL v2:** Don't re-teach what the ad already covered. Give visitors entry ramps that pick up where the video left off.

**Design reference:**

![Mobile: Secondary CTA stacked layout](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile.png>)

![Mobile: Secondary CTA expanded](<docs/iul_projects/feb_2026/meta_lp_cta_v1/Current Design - Secondary CTA - Mobile - Expanded.png>)

### Video at Desk: Winning Creative Analysis

The highest-performing IUL ad (3x+) is a man at his home desk explaining IUL conversationally. He's educating someone off-camera — low pressure, benefit-focused, no hard sell.

**What the video teaches — the knowledge a visitor arrives with:**

| Timestamp | Concept taught | User takeaway |
|---|---|---|
| 0:00–0:07 | IUL = indexed universal life, permanent life insurance | "OK, it's a type of permanent life insurance" |
| 0:07–0:17 | Death benefit + cash value = two components | "I get protection AND something I can use while alive" |
| 0:18–0:32 | Borrow against cash value; no restrictions | "I can borrow for anything — house, college, renovations" |
| 0:33–0:42 | Death benefit is generally tax-free | "My beneficiaries get the payout tax-free" |
| 0:42–1:05 | Cash value grows with S&P 500; 0% floor | "My cash value grows like the market, but can't go below zero" |
| 1:06–1:21 | Ad close: "look at the features, the costs, how it lines up with your financial/estate plan" | "Go evaluate fit and costs on Ethos" |

**What the video DOESN'T answer — residual hesitations on the LP:**

| Residual question | Hesitation type | Test |
|---|---|---|
| "How does IUL compare to term — is it an upgrade or an either/or?" | Comparison/positioning | **Test A** |
| "Is this right for MY situation specifically?" | Fit skepticism | **Test B** |
| "What does this actually cost?" | Post-education pricing | **Test C** |
| "What would my family actually receive?" | Legacy/death benefit | **Test D** |
| "I'm interested but don't know where to start" | Decision paralysis | **Test E** |

**Compelling questions the ad raises but v1 didn't capture:**

- "Is IUL better than term?" — The ad positions IUL as a step up from "regular" life insurance. The natural question is explicit comparison.
- "Is IUL better than whole life?" — The ad explains permanent insurance but doesn't name alternatives.
- "Is there a cap on my growth?" — The ad mentions the 0% floor but never the growth cap. Savvy users notice this gap immediately.
- "What's the realistic expected return?" — The ad implies S&P-like upside but with protection; users want a range.
- "What would my family actually receive?" — The ad names the death benefit and says it's tax-free but gives no sense of scale or calculation.
- "How does contribution level affect my coverage?" — Ash's insight: "the more you contribute, the more your wealth can grow, the more protection you can get."

**Questions that are NOT good inviting questions for v2 (redundant with the video):**

- "How does IUL build wealth?" → The video covers this at 0:07–1:05. Don't repeat it.
- "How does downside protection work?" → Covered at 0:42. Strong sub-path candidate, not a top-level hook.
- "What can I borrow against?" → Covered at 0:18. Good sub-path, not an entry question.
- "What is an IUL?" → Only valid for visitors who missed the video. Kept as a sub-path in Test E only.

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
- **Trust wreaths:** Forbes Advisor + Business Insider laurel badges must be visible above the fold without scrolling. Confirm placement in prototype before QA.
- Reference: Term's design pattern (proven to work)

---

## Five Test Treatments

**All tests use primary CTA: "Check my price"**

---

### **Test A: Comparison (IUL vs. Term) — Conviction: 9/10**

```
PRIMARY CTA:     Check my price
INVITING Q:      IUL vs. term: which wins?
├─ Sub-path 1:   I have term — should I switch?
├─ Sub-path 2:   What does term leave out?
└─ Sub-path 3:   Can I have both?
```

**Hypothesis:** Visitors from this ad are life insurance-aware — the video positions IUL as a step up from "regular" life insurance and explains its advantages over direct market investing. Their real hesitation is comparative: "is this better than what I know?" The inviting question validates that context and promises to resolve it.

**Why this is new territory:** V1 had no comparison test. But comparison is the most natural next question after the video's educational arc. Ash explicitly named "Is IUL a better option than term life?" as a strong entry question. This test captures visitors who are past basic education and asking the real decision question.

**Why these sub-paths:** They address the three comparison scenarios a term-aware visitor actually faces: (1) I already have term — is switching worth it? (2) I'm evaluating term — what am I giving up by choosing it? (3) I want protection + growth — do I need to pick one?

**User motivation:** "I already know what term is. Tell me how IUL compares so I can make an informed decision."

**Sub-path precision:**

- "I have term — should I switch?" = Current term holders comparing products; the upgrade question
- "What does term leave out?" = Positions the IUL conversation for visitors without existing coverage; the "what am I missing?" angle
- "Can I have both?" = Addresses the fear of canceling existing coverage; reduces the decision to "addition" rather than "replacement"

---

### **Test B: Personal Fit (The Video's Own Closing Arc) — Conviction: 9/10**

```
PRIMARY CTA:     Check my price
INVITING Q:      Is IUL right for me?
├─ Sub-path 1:   Is IUL right for protecting my family?
├─ Sub-path 2:   Can I use the money while I'm alive?
└─ Sub-path 3:   Can I grow money without the risk?
```

**Hypothesis:** The video ends with exactly this question — "decide if it's right for you." This inviting question picks up the ad's own thread. Visitors who engaged with the full video are already in this evaluative mode. The CTA is the natural continuation of where the ad leaves them.

**Why "IUL" in the question:** Ash confirmed "Is IUL right for me?" is stronger than the generic "Is this right for me?" The brand-product specificity anchors the evaluation.

**Why these sub-paths (and why they're different from v1):** V1 used "I want accessible emergency funds" — which doesn't echo the video. These sub-paths are directly pulled from the video's narrative: (1) death benefit = family protection, (2) borrowing mechanic = cash available while alive, (3) S&P + 0% floor = market growth with protection. Each is phrased as a question so the visitor feels they're being taken directly to the answer they care about most.

**User motivation:** "I get what IUL does. Does it actually fit someone like me?"

**Sub-path precision:**

- "Is IUL right for protecting my family?" = The death benefit use case; standard insurance purpose; visitor with a protection-first mindset self-selects here
- "Can I use the money while I'm alive?" = The cash value + borrowing mechanic; renovate, buy house, college — the specific use cases the video named
- "Can I grow money without the risk?" = The 0% floor concept; market-linked upside without downside risk; directly echoes the video's "max down is 0, not negative"

**Compliance note:** "Market growth, safely" refers to the cash value component only. Sub-path destination copy must clarify this to avoid implying the death benefit grows with the market.

---

### **Test C: Post-Education Pricing — Conviction: 8/10**

```
PRIMARY CTA:     Check my price
INVITING Q:      What does IUL cost?
├─ Sub-path 1:   What's the monthly range?
├─ Sub-path 2:   Is it more than term?
└─ Sub-path 3:   What affects my premium?
```

**Hypothesis:** The video explicitly closes with "you can look at the features, the costs." Cost is the one thing the video promises to reveal but doesn't. A visitor ready to evaluate costs is close to quoting — this test captures the almost-converted visitor.

**Why this advances v1-A ("What will I pay?"):** The register shift matters. "What will I pay?" implies fear and sticker shock — pricing anxiety framing. "What does IUL cost?" is neutral and evaluative — it matches the video's own language ("look at the costs"). Post-video visitors are in evaluation mode, not anxiety mode. The framing should meet them there.

**Sub-path 2 cross-reference:** "Is it more than term?" directly connects to Test A's comparison angle. This makes Test C partially double-duty — pricing AND comparison — which increases the likelihood of a click from comparison-minded visitors even if they don't click Test A.

**User motivation:** "This sounds good. Now I need to know the actual numbers before I decide."

**Sub-path precision:**

- "What's the monthly range?" = Monthly commitment; most accessible cost framing (not total, not lifetime)
- "Is it more than term?" = IUL cost vs. term cost; allows the visitor to benchmark against the product they know
- "What affects my premium?" = Age, health, coverage amount — the variables that make cost personal

---

### **Test D: Legacy (Death Benefit as the Primary Value Prop) — Conviction: 7/10**

```
PRIMARY CTA:     Check my price
INVITING Q:      What would my family get?
├─ Sub-path 1:   How much goes to my family?
├─ Sub-path 2:   When does the benefit start?
└─ Sub-path 3:   Is the payout tax-free?
```

**Hypothesis:** A meaningful segment of post-video visitors is legacy-motivated. The video names the death benefit and says it's "generally tax-free" — but never quantifies what a family would receive. The product review notes confirm the team's belief that "3-5X return for family" is the primary IUL value proposition. This test addresses visitors whose primary question is not "what can I use while alive?" but "what happens for my family when I'm gone?"

**Why this is new territory:** V1 had no test for the legacy angle. All five v1 tests addressed the living benefits of IUL (cash value, borrowing, pricing) or general fit. This test inverts the frame: the death benefit — not the cash value — is the entry point.

**Why the sub-paths address the ad's "generally":** The video says "generally tax-free." A careful viewer notices "generally" is a qualifier. Sub-path 3 ("Is the payout tax-free?") invites that viewer to get clarity rather than letting the qualifier become a source of doubt.

**User motivation:** "I understand IUL has living benefits. But I'm really thinking about what my family gets. How does that work?"

**Sub-path precision:**

- "How much goes to my family?" = Death benefit amount question; triggers the coverage/payout discussion
- "When does the benefit start?" = Day-one coverage question; removes the fear that there's a waiting period
- "Is the payout tax-free?" = Addresses the "generally" qualifier from the video; invites clarity rather than leaving doubt

---

### **Test E: Decision Paralysis (Term-Inspired Control) — Conviction: 8/10**

```
PRIMARY CTA:     Check my price
INVITING Q:      Not sure where to start?
├─ Sub-path 1:   Is IUL right for me?
├─ Sub-path 2:   What will it cost?
└─ Sub-path 3:   IUL vs. term — which is better?
```

**Hypothesis:** A subset of post-video visitors is still frozen by too many unknowns. Some watched partially, some scrolled, some engaged but still don't know which question to tackle first. By offering three labeled entry ramps, we let them choose where to begin. This is the proven Term pattern — the question is whether it translates to IUL cold traffic.

**Key upgrade from v1-E:** V1 kept "What is an IUL?" as sub-path 1. But the video answers that question explicitly. Presenting "What is an IUL?" as a sub-path signals we don't trust the ad — and may feel patronizing to an engaged viewer. Sub-path 1 is replaced with "Is IUL right for me?" (the ad's actual closing prompt). Sub-path 3 is upgraded from the generic "Is it right for me?" to "IUL vs. term — which is better?" — the comparison question the video creates but doesn't resolve.

**Why this is the control test:** If E outperforms A-D, decision paralysis (not a specific hesitation like pricing or comparison) is the primary barrier, and the proven Term pattern translates to IUL. If A-D outperforms E, IUL-specific hesitations matter more.

**User motivation:** "I watched the video and I'm interested. But I don't know what to look at first."

---

## Testing Strategy

**Note on ordering:** The table below ranks tests by validation strength. The individual test descriptions above are ordered by conviction/novelty (A-D: IUL-specific hypotheses; E: proven control). Both orderings are intentional.

| Test | Conviction | Core hypothesis | Inviting Q | If this wins... |
|---|---|---|---|---|
| **B** | 9/10 | Fit evaluation — ad's own arc | "Is IUL right for me?" | The video perfectly primes the fit question; visitors are already in evaluation mode |
| **A** | 9/10 | Comparison positioning | "IUL vs. term: which wins?" | Visitors are in upgrade/comparison mode — they need a decision lens, not more education |
| **E** | 8/10 (Proven) | Decision paralysis | "Not sure where to start?" | Decision paralysis is the primary barrier; proven Term pattern translates to IUL |
| **C** | 8/10 | Post-education pricing | "What does IUL cost?" | Cost is the unresolved question the video explicitly promises to address; pricing transparency unlocks conversion |
| **D** | 7/10 | Legacy/death benefit | "What would my family get?" | A high-intent legacy segment is present in Meta traffic; the death benefit entry point outperforms living-benefit framing |

**Approach:** Run all 5 tests in parallel (equal traffic split). See Success Metrics for the full tracking plan.

---

## Success Metrics

### Primary Metric

- **Inviting question click rate by variant** — which hesitation resonates most with Meta traffic?
  - If B wins: Fit evaluation is the real barrier; the video perfectly primes this question
  - If A wins: Comparison framing is the strongest hook; visitors are in IUL-vs-term mode
  - If C wins: Cost evaluation (post-education) is the barrier; pricing transparency is what converts
  - If D wins: Legacy-motivated visitors are a meaningful segment with distinct high-intent behavior
  - If E wins: Decision paralysis beats specific hesitations; proven Term pattern works for IUL

### Secondary Metrics

- **Sub-path selection distribution** — within each variant, which sub-path gets clicked most?
  - If A users concentrate on "I have term — should I switch?" → existing term holders are the key segment
  - If A users concentrate on "Can I have both?" → fear of canceling existing coverage is the real comparison concern
  - If B users concentrate on one sub-path → the self-selection mechanic works; one benefit dimension dominates
  - If C users concentrate on "Is it more than term?" → comparison is the pricing concern, not sticker shock
  - If D users concentrate on "Is the payout tax-free?" → the "generally" qualifier is creating doubt
- **Landing → Lead conversion rate by variant** (vs. primary-CTA-only baseline)
- **Pre-Interview Start rate by variant**
- **Quote completion rate by variant** — do secondary CTA users convert at equal or higher rates than primary-CTA-only users?

### Hypothesis Validation

| Test | Validation signal |
|---|---|
| **A** (Comparison) | High click rate + concentration in "I have term" sub-path = existing term holders are key upgrade segment |
| **B** (Fit) | High click rate + distribution across sub-paths (self-selection working) + higher-than-average quote completion |
| **C** (Pricing) | High click rate + concentration on "Is it more than term?" = comparison, not sticker shock, is the real cost concern |
| **D** (Legacy) | High click rate + higher average age in segment + strong downstream conversion = legacy segment is present and high-intent |
| **E** (Paralysis) | High click rate + balanced sub-path distribution = decision paralysis was the real barrier across all hesitation types |

### Analysis Questions

- Which hesitation is real for Meta traffic arriving via *video_at_desk*? (Primary learning)
- Do secondary CTA users quote at equal or higher rates than primary-CTA-only users? (Quality validation)
- Is there a comparison-specific segment (A + E sub-path 3 concentrated)? (Bonus learning — informs next test)
- Does the legacy segment (D) convert at a different rate from the living-benefits segment (B, C)? (Segmentation hypothesis)

---

## Constraints & Assumptions

1. **Primary CTA fixed:** "Check my price" across all tests. Only secondary CTA varies.
2. **Design pattern fixed:** Outlined/link style, positioned below primary button, expandable on click.
3. **Character limit:** Inviting questions ≤30 characters (all v2 questions confirmed within limit).
4. **Trust wreaths above fold:** Forbes Advisor + Business Insider laurel badges must be visible without scroll. Confirm in prototype before handoff to eng.
5. **One treatment per visitor:** Variants are mutually exclusive; no mixing of treatments.
6. **Traffic split:** Equal 20% allocation across all 5 variants. Minimum 2-week run, 95% confidence target.
7. **Baseline needed:** Primary-CTA-only conversion rate to be confirmed before launch — needed to evaluate whether secondary CTA variants lift or hurt overall conversion.
8. **Sub-path destinations:** Each sub-path requires a defined destination (modal, drawer, or page). TBD during copy refinement; eng needs these to build.
9. **Compliance review required:** B-v2 sub-path 3 ("I want market growth, safely") and D-v2 sub-path 1 ("How much goes to my family?") both need copy review before build to ensure cash value and death benefit language is not conflated.
10. **Meta traffic context:** Cold-to-warm audience (warmed by *video_at_desk*), short attention span, attracted by narrative over specs.
11. **Video assumption:** Analysis assumes a significant share of LP visitors arrived via *video_at_desk* traffic. If traffic source mix shifts materially, hesitation profiles may change and test prioritization should be revisited.

---

## Next Steps

1. **Stakeholder review:** Confirm all 5 hypotheses align with business priorities and conversion goals
2. **Copy refinement:** Finalize sub-path language; flag B-v2 sub-path 3 and D-v2 sub-path 1 for compliance review; define destinations (modal, drawer, or page) for each sub-path — eng needs these to build
3. **Design:** Build test variants; confirm trust wreaths above fold before handoff
4. **Implement & QA**
5. **Launch & monitor:**
   - Track inviting question click rate by variant
   - Track sub-path selection distribution
   - Track funnel metrics (landing → lead → pre-interview → quote)
6. **Analyze & iterate:**
   - Identify which hesitation matters most to Meta traffic from *video_at_desk*
   - Winner becomes new baseline for next test iteration
   - Run segmentation analysis: do different visitor segments (age, existing coverage, engagement level) respond differently to comparison vs. fit vs. legacy?
