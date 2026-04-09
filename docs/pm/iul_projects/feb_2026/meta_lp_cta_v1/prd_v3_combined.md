---
last_updated: 2026-02-26
last_exported: 2026-02-26
category: prd
---

# Meta Landing Page CTA Optimization — PRD

## Objective

**Problem:** IUL LP currently has primary CTA only ("Check my price"). Low-intent visitors have no guided path — they either convert immediately or bounce. We're losing traffic at the moment of decision hesitation, when visitors are uncertain about whether to quote, what IUL is, or if it's relevant to them.

**Solution:** Add secondary CTA (inviting question + sub-paths) below the primary button to capture visitors at different hesitation points and guide them toward conversion.

**What we're testing:** 5 secondary CTA treatments, each addressing a distinct post-video hesitation. These tests are tightly aligned to the *video_at_desk* creative — the highest-performing IUL ad (3x+ outperformance).

---

## Principles

1. **Low-intent visitors have distinct hesitations.** Pricing anxiety, fit skepticism, comparison indecision, and legacy questions are different. We test distinct hypotheses.

2. **The inviting question must match the hesitation.** A visitor afraid of pricing won't click "What would my family get?" They'll click "What does IUL cost?" The hook must speak to the actual concern.

3. **Sub-paths are not feature lists.** They're *different ways to think about the decision* — each offers a distinct entry point or lens.

4. **The primary CTA stays fixed.** All tests keep "Check my price" as primary. We isolate the secondary CTA variable.

5. **Proven patterns can compete.** Term's secondary CTA winner ("Not sure where to begin?" + 3 decision ramps) competes as Test E.

6. **Character limit is real.** 30 characters max for inviting question to avoid wrapping on mobile.

7. **Top-of-funnel questions must spark curiosity, not educate.** After watching the ad, visitors aren't in "teach me more" mode — they're in "is this for me?" mode. Questions that invite more product education (e.g., "How does IUL build wealth?") are misaligned. The inviting question's job is to surface the gap the ad opened — not restate what the ad already taught. Onboarding handles education.

8. **Match hesitation to funnel stage.** Visitors arriving from *video_at_desk* have partial product knowledge. Secondary CTAs must assume this baseline — they answer post-video questions, not re-teach what the ad explained.

---

## Context

### IUL Landing Page (Current)

- **Primary CTA only:** "Check my price"
- **No secondary path** — low-intent visitors have nowhere to go but convert or leave.

### Term Funnel (Winning Pattern — Reference for Test E)

- **Winner:** "Not sure where to begin?" + "Not sure what to buy?" / "What's my budget?" / "Need a quote fast?"
- **Why it works:** Treats decision paralysis as a prioritization problem. Visitors choose where to start — product clarity, affordability, or speed.
- **Lesson:** Don't re-teach what the ad already covered. Give visitors entry ramps that pick up where the video left off.

---

### Video at Desk: Winning Creative Analysis

The highest-performing IUL ad (3x+) is a man at his home desk explaining IUL conversationally.

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
| "How does IUL compare to term — is it an upgrade or either/or?" | Comparison/positioning | **Test A** |
| "Is this right for MY situation specifically?" | Fit skepticism | **Test B** |
| "What does this actually cost?" | Post-education pricing | **Test C** |
| "What would my family actually receive?" | Legacy/death benefit | **Test D** |
| "I'm interested but don't know where to start" | Decision paralysis | **Test E** |

**Compelling questions the ad raises but doesn't resolve:**

- "Is IUL better than term?" — The ad positions IUL as a step up from regular life insurance. Natural comparison question follows.
- "Is IUL better than whole life?" — The ad explains permanent insurance but doesn't name alternatives.
- "Is there a cap on my growth?" — The ad mentions the 0% floor but never the growth cap. Savvy users notice this immediately.
- "What's the realistic expected return?" — The ad implies S&P-like upside with protection; users want a range.
- "What would my family actually receive?" — The ad names the death benefit but gives no sense of scale or calculation.
- "How does contribution level affect my coverage?" — The more you contribute, the more your wealth can grow, the more protection you can get.

**Questions that are NOT good inviting questions (redundant with the video):**

- "How does IUL build wealth?" → Covered at 0:07–1:05.
- "How does downside protection work?" → Covered at 0:42. Strong sub-path candidate, not a top-level hook.
- "What can I borrow against?" → Covered at 0:18. Good sub-path, not an entry question.
- "What is an IUL?" → Only valid for visitors who missed the video. Kept as sub-path in Test E only.

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
- Trust wreaths: Forbes Advisor + Business Insider laurel badges must be visible above the fold without scrolling. Confirm placement in prototype before QA.
- Reference: Term's design pattern (proven to work)

---

## Five Test Treatments

**All tests use primary CTA: "Check my price"**

**A** — IUL vs. term: which wins?
- I have term — should I switch?
- What does term leave out?
- Can I have both?

**B** — Is IUL right for me?
- Is IUL right for protecting my family?
- Can I use the money while I'm alive?
- Can I grow money without the risk?

**C** — What does IUL cost?
- What's the monthly range?
- Is it more than term?
- What affects my premium?

**D** — What would my family get?
- How much goes to my family?
- When does the benefit start?
- Is the payout tax-free?

**E** — Not sure where to start?
- Is IUL right for me?
- What will it cost?
- IUL vs. term — which is better?

---

### Test A: Comparison (IUL vs. Term) — Conviction: 9/10

```
PRIMARY CTA:     Check my price
INVITING Q:      IUL vs. term: which wins?    [26 chars ✓]
├─ Sub-path 1:   I have term — should I switch?
├─ Sub-path 2:   What does term leave out?
└─ Sub-path 3:   Can I have both?
```

**Hypothesis:** Visitors from this ad are life insurance-aware — the video positions IUL as a step up from "regular" life insurance. Their real hesitation is comparative: "is this better than what I know?" The inviting question validates that context and promises to resolve it.

**Why this matters:** Comparison is the most natural next question after the video's educational arc. The video never makes the IUL vs. term comparison — these users are forming their own comparison, possibly incorrectly. This test gives them a structured path to work through it.

**Why these sub-paths:** They address the three comparison scenarios a term-aware visitor actually faces: (1) I already have term — is switching worth it? (2) I'm evaluating term — what am I giving up by choosing it? (3) I want both protection and growth — do I need to pick one?

**User motivation:** "I already know what term is. Tell me how IUL compares so I can make an informed decision."

**Sub-path precision:**
- "I have term — should I switch?" = Current term holders; the upgrade question
- "What does term leave out?" = For visitors without existing coverage; the "what am I missing?" angle
- "Can I have both?" = Addresses fear of canceling existing coverage; reframes decision as addition rather than replacement

---

### Test B: Personal Fit (The Video's Own Closing Arc) — Conviction: 9/10

```
PRIMARY CTA:     Check my price
INVITING Q:      Is IUL right for me?         [21 chars ✓]
├─ Sub-path 1:   Is IUL right for protecting my family?
├─ Sub-path 2:   Can I use the money while I'm alive?
└─ Sub-path 3:   Can I grow money without the risk?
```

**Hypothesis:** The video ends with exactly this question — "decide if it's right for you." This CTA is the natural continuation of where the ad leaves visitors. Users who engaged with the full video are already in evaluative mode.

**Why "IUL" in the question:** "Is IUL right for me?" is stronger than the generic "Is this right for me?" — naming the product anchors the evaluation.

**Why these sub-paths:** These sub-paths are directly pulled from the video's narrative: (1) death benefit = family protection, (2) borrowing mechanic = cash available while alive, (3) S&P + 0% floor = market growth with protection. Each is phrased as a question so the visitor feels they're being taken directly to the answer they care about most.

**User motivation:** "I get what IUL does. Does it actually fit someone like me?"

**Sub-path precision:**
- "Is IUL right for protecting my family?" = Death benefit use case; protection-first visitors self-select here
- "Can I use the money while I'm alive?" = Cash value + borrowing mechanic; the specific use cases the video named
- "Can I grow money without the risk?" = The 0% floor concept; directly echoes the video's "max down is 0, not negative"

**Compliance note:** Sub-path 3 ("Can I grow money without the risk?") and any destination copy must clarify this refers to the cash value component only. Must not imply the death benefit grows with the market.

---

### Test C: Post-Education Pricing — Conviction: 8/10

```
PRIMARY CTA:     Check my price
INVITING Q:      What does IUL cost?          [19 chars ✓]
├─ Sub-path 1:   What's the monthly range?
├─ Sub-path 2:   Is it more than term?
└─ Sub-path 3:   What affects my premium?
```

**Hypothesis:** The video explicitly closes with "you can look at the features, the costs." Cost is the one thing the video promises to reveal but doesn't. A visitor ready to evaluate costs is close to quoting — this test captures the almost-converted visitor.

**Why "What does IUL cost?":** The register matters here. "What does IUL cost?" is neutral and evaluative — it matches the video's own language ("look at the costs"). Post-video visitors are in evaluation mode, not anxiety mode.

**User motivation:** "This sounds good. Now I need to know the actual numbers before I decide."

**Sub-path precision:**
- "What's the monthly range?" = Monthly commitment; the number people actually budget with
- "Is it more than term?" = Allows the visitor to benchmark against the product they know; also connects this test to Test A's comparison angle
- "What affects my premium?" = Age, health, coverage amount — the variables that make cost personal

---

### Test D: Legacy (Death Benefit as Primary Value Prop) — Conviction: 7/10

```
PRIMARY CTA:     Check my price
INVITING Q:      What would my family get?    [25 chars ✓]
├─ Sub-path 1:   How much goes to my family?
├─ Sub-path 2:   When does the benefit start?
└─ Sub-path 3:   Is the payout tax-free?
```

**Hypothesis:** A meaningful segment of post-video visitors is legacy-motivated. The video names the death benefit and says it's "generally tax-free" — but never quantifies what a family would receive. This test inverts the frame by putting the death benefit — not cash value — as the entry point.

**Why this matters:** This test addresses visitors whose primary question is "what happens for my family when I'm gone?" — a fundamentally different motivation from living benefits. The video says "generally tax-free" — a careful viewer notices that qualifier. This test invites that viewer to get clarity rather than letting it become a source of doubt.

**User motivation:** "I understand IUL has living benefits. But I'm really thinking about what my family gets. How does that work?"

**Sub-path precision:**
- "How much goes to my family?" = Death benefit amount; triggers the coverage/payout discussion
- "When does the benefit start?" = Day-one coverage question; removes fear of a waiting period
- "Is the payout tax-free?" = Addresses the "generally" qualifier from the video; invites clarity rather than leaving doubt

**Compliance flag:** Sub-path destinations must use "payout" not "returns." "Tax-free" claims require the disclosure: *"Tax-free assumes policy doesn't lapse. Consult your tax advisor."*

---

### Test E: Decision Paralysis (Term-Inspired Control) — Conviction: 8/10

```
PRIMARY CTA:     Check my price
INVITING Q:      Not sure where to start?     [25 chars ✓]
├─ Sub-path 1:   Is IUL right for me?
├─ Sub-path 2:   What will it cost?
└─ Sub-path 3:   IUL vs. term — which is better?
```

**Hypothesis:** A subset of post-video visitors is still frozen. Some watched partially, some engaged but don't know which question to tackle first. By offering three labeled entry ramps, we let them choose where to begin. This is a proven Term pattern — the question is whether it translates to IUL cold traffic.

**Why these sub-paths:** Instead of "What is an IUL?" (which the video answers explicitly and may feel patronizing), we use "Is IUL right for me?" (the ad's actual closing prompt) and "IUL vs. term — which is better?" (the comparison the video creates but doesn't resolve).

**Why this is the control test:** If E outperforms A–D, decision paralysis (not a specific hesitation) is the primary barrier, and the proven Term pattern translates to IUL. If A–D outperform E, IUL-specific hesitations matter more.

**User motivation:** "I watched the video and I'm interested. But I don't know what to look at first."

---

## Testing Strategy

| Test | Conviction | Core hypothesis | Inviting Q | If this wins... |
|---|---|---|---|---|
| **B** | 9/10 | Fit evaluation — ad's own arc | "Is IUL right for me?" | The video perfectly primes the fit question; visitors are already in evaluation mode |
| **A** | 9/10 | Comparison positioning | "IUL vs. term: which wins?" | Visitors are in upgrade/comparison mode — they need a decision lens, not more education |
| **E** | 8/10 (Proven) | Decision paralysis | "Not sure where to start?" | Proven Term pattern translates to IUL; paralysis beats specific hesitations |
| **C** | 8/10 | Post-education pricing | "What does IUL cost?" | Cost is the unresolved question the video promises to address; transparency unlocks conversion |
| **D** | 7/10 | Legacy/death benefit | "What would my family get?" | A high-intent legacy segment exists in Meta traffic; death benefit entry outperforms living-benefit framing |

---

## Success Metrics

### Primary Metric
**Inviting question click rate by variant** — which hesitation resonates most with Meta traffic?

### Secondary Metrics
- **Sub-path selection distribution** within each variant
  - If A users concentrate on "I have term — should I switch?" → existing term holders are the key upgrade segment
  - If B users concentrate on one sub-path → one benefit dimension dominates; self-selection mechanic is working
  - If C users concentrate on "Is it more than term?" → comparison is the pricing concern, not sticker shock
  - If D users concentrate on "Is the payout tax-free?" → the "generally" qualifier is creating doubt
- **Landing → Lead conversion rate by variant** vs. primary-CTA-only baseline
- **Pre-Interview Start rate by variant**
- **Quote completion rate by variant** — do secondary CTA users convert at equal or higher rates than primary-only users?

### Hypothesis Validation Table

| Test | Validation signal |
|---|---|
| **A** (Comparison) | High click rate + concentration in "I have term" = existing term holders are key upgrade segment |
| **B** (Fit) | High click rate + distribution across sub-paths (self-selection working) + higher-than-average quote completion |
| **C** (Pricing) | High click rate + concentration on "Is it more than term?" = comparison, not sticker shock, is the real cost concern |
| **D** (Legacy) | High click rate + higher average age in segment + strong downstream conversion = legacy segment is present and high-intent |
| **E** (Paralysis) | High click rate + balanced sub-path distribution = decision paralysis was the real barrier across all types |

### Analysis Questions
- Which hesitation is real for Meta traffic arriving via *video_at_desk*? (Primary learning)
- Do secondary CTA users quote at equal or higher rates than primary-only users? (Quality validation)
- Is there a comparison-specific segment (A + E sub-path 3 concentrated)?
- Does the legacy segment (D) convert at a different rate from the living-benefits segment (B, C)?

---

## Constraints & Assumptions

1. **Primary CTA fixed:** "Check my price" across all tests. Only secondary CTA varies.
2. **Design pattern fixed:** Outlined/link style, positioned below primary button, expandable on click.
3. **Character limit:** Inviting questions ≤30 characters. All questions confirmed within limit.
4. **Trust wreaths above fold:** Forbes Advisor + Business Insider laurel badges must be visible without scroll. Confirm in prototype before handoff to eng.
5. **One treatment per visitor:** Variants are mutually exclusive.
6. **Traffic split:** Equal 20% allocation across all 5 variants. Minimum 2-week run, 95% confidence target.
7. **Baseline needed:** Primary-CTA-only conversion rate to be confirmed before launch.
8. **Sub-path destinations:** Each sub-path requires a defined destination (modal, drawer, or page). TBD during copy refinement; eng needs these to build.
9. **Compliance review required:** Test B sub-path 3 ("Can I grow money without the risk?") and Test D sub-path 1 ("How much goes to my family?") both need copy review before build to ensure cash value and death benefit language is not conflated. All "tax-free" claims require the disclosure: *"Tax-free assumes policy doesn't lapse. Consult your tax advisor."*
10. **Meta traffic context:** Cold-to-warm audience (warmed by *video_at_desk*), short attention span, attracted by narrative over specs.
11. **Video assumption:** Analysis assumes a significant share of LP visitors arrived via *video_at_desk*. If traffic source mix shifts materially, hesitation profiles may change and test prioritization should be revisited.

---

## Next Steps

1. **Stakeholder review:** Confirm all 5 hypotheses align with business priorities
2. **Copy refinement:** Finalize sub-path language; flag B sub-path 3 and D sub-path 1 for compliance review; define sub-path destinations — eng needs these to build
3. **Design:** Build test variants; confirm trust wreaths above fold before handoff
4. **Implement & QA**
5. **Launch & monitor:** Track inviting question click rate, sub-path selection, and full funnel metrics (landing → lead → pre-interview → quote)
6. **Analyze & iterate:** Identify which hesitation matters most → winner becomes new baseline. Run segmentation analysis: do different visitor segments (age, existing coverage, engagement level) respond differently to comparison vs. fit vs. legacy?
