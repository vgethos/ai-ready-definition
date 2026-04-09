---
last_updated: 2026-03-09
last_exported: 2026-03-09
category: planning
---

# IUL Q2 2026 Planning Brief

<!-- TOC -->
## Table of Contents
- [1. State of the Funnel Entering Q2](#1-state-of-the-funnel-entering-q2)
- [2. Key Metrics Summary](#2-key-metrics-summary)
- [3. Where Users Drop](#3-where-users-drop)
- [4. Opportunity Map](#4-opportunity-map)
- [5. Active Projects](#5-active-projects)
- [6. Open Questions](#6-open-questions)
- [7. Analytics Questions](#7-analytics-questions)
<!-- /TOC -->

---

## 1. State of the Funnel Entering Q2

**Volume has scaled 4x in 4 months** — IUL weekly users went from ~12k (Nov 2025) to ~44k (Feb 23). Approval volume followed: ~550/week in Jan → ~800/week by Feb. Meta is the primary growth driver, scaling to 1.2x+ pROAS. Q1 cost-per-approval dropped 30%, CAGB per approval up 14%.

**The scaling is creating funnel pressure.** NAP CVR dropped from ~27% (Nov) to ~16% (late Feb) as volume grew. Lead and approval CVR followed. The Approval/Lead ratio (~55%) stayed stable — the deterioration is happening pre-NAP, not in the interview. More users are entering the funnel but fewer are getting engaged enough to submit their email.

**Post-approval is a separate problem.** Connect rate (the key IUL metric) is structurally lower than Term: BH ~38%, NBH ~31%, vs. 50–60% for Term social. Closing even the BH/NBH 7pp gap would materially compound on the growing approval base. Activation follows directly from connect rate — BH ~11% activation vs. NBH ~7%.

**IUL cannot transmit without an agent call.** There is no self-serve path. Every improvement to connect rate goes directly to revenue.

---

## 2. Key Metrics Summary

### Post-Approval (Jan 5 – Feb 23 weekly avg)

| Metric | BH | NBH |
|---|---|---|
| Connect rate (Connected/Called) | 38.2% | 31.5% |
| Activated/Connected | 28.3% | 22.2% |
| Activation rate (Act/Approvals) | 10.9% | 7.2% |
| ARPU at activation | $2,009 | $2,469 |
| MR/Approval | $212 | $164 |

NBH ARPU is paradoxically higher — NBH users who do connect buy larger policies. But MR/Approval is much lower NBH because connect rate kills the volume. ARPU advantage doesn't offset it.

### Full Funnel Baseline (experiment control, n=8,732)

| Stage | CVR |
|---|---|
| LP → Pre-interview | 25.8% |
| Pre-interview → NAP | 18.0% |
| NAP → Email | 11.5% |
| Email → Lead | 8.9% |
| Lead → Approved | 5.1% |
| Approved → Transmitted | 0.40% |
| IUL Transmit/Approval | 9.3% |

### Channel Quality

| Channel | % Traffic | Approval CVR | MR/User |
|---|---|---|---|
| Social | 70% | 3.4% | $2.62 |
| Search | 15% | 12.0% | $17.84 |
| Video | 11% | 2.3% | $1.03 |
| Affiliate | 3% | 21.0% | $37.52 |

Search converts at 3.5x Social. Affiliate is 6x Social on approval and 14x on MR/User — but only 3% of traffic. Social is 70% of volume and the weakest converter; pre-NAP improvements compound most here.

### Product Comparison (avg Jan 5 – Feb 23)

| Product | Approvals/wk | % of Total | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|---|---|
| IUL | 674 | 27.6% | 9.3% | $2,144 | $190 |
| Prime/Choice Term | 421 | 17.3% | 9.0% | $3,704 | $323 |
| Trustage | 1,344 | 55.1% | 6.4% | $1,137 | $71 |

IUL and Prime/Choice Term convert at nearly identical rates post-approval (~9%). The revenue gap is entirely ARPU-driven. Trustage is the majority of approvals but generates 37% of IUL's MR/Approval and 22% of Prime/Choice Term's.

### IUL Intent Path Breakdown (BH, cumulative)

| Goal | Routing | % of Users | Lead CVR | NonTS Transmit/Approval |
|---|---|---|---|---|
| Both | IUL | 65% | 57.2% | 9.8% |
| Grow | IUL | 20% | 54.4% | 12.1% |
| Protect | Term | 15% | 52.7% | 12.0% |

"Both" is the dominant IUL segment. "Grow" users have the highest NonTS transmit rate — likely more motivated buyers.

---

## 3. Where Users Drop

Ranked by scale of opportunity:

1. **LP → Pre-interview: 74% drop** — The single largest loss in the funnel. Happens before NAP, before PII. Every other optimization is working on a fraction of this audience. NAP CVR is also declining week-over-week as volume scales, suggesting the incremental audience is lower intent.

2. **NAP → Email: ~36% drop** — Almost 1 in 3 users who see the product recommendation don't submit their email. Underexplored surface — users have intent but aren't converting to PII.

3. **Approved → Connected: ~62% drop (BH), ~69% drop (NBH)** — Connect rate is the post-approval choke point. Every unconnected approved user is a lost sale — IUL cannot close without a call.

4. **Connected → Activated: ~72% drop (BH)** — Once connected, activation is ~28% BH. Sales performance and lifecycle re-engagement are levers here, but this is mostly downstream of connect.

---

## 4. Opportunity Map

### Opportunity 1: Improve pre-NAP CVR
**Impact:** Highest scale — 74% of LP visitors never start. Scaling is making this worse.
**Levers:**
- LP copy and creative (IUL-specific framing vs. generic "Instant life insurance")
- Intent question UX — current multi-screen routing may be creating drop before users see the product pitch
- Onboarding simplification — the Q1 strategy (simplification + progressive excitement) is the right frame; execution is the question
**Context:** IUL vs. WL NAP CVR gap (~16–27% IUL vs. ~46–59% WL) is almost entirely pre-NAP. Approval/Lead is similar once users reach the interview. The intent questions and product framing are filtering harder than WL.

### Opportunity 2: Connect rate — Sales Direct surface
**Impact:** Direct revenue lever. 7pp BH/NBH gap + absolute BH rate of 38% both have room to move. Growing approval base amplifies every point of improvement.
**Levers:**
- Text Bridge (active test — see Active Projects): reframe Sales Direct page to prime users for incoming text and give them scheduling agency. Addresses call aversion (H2) and timing/readiness (H4).
- Price anxiety (H1): users want a number before committing to a call. Addressed in a separate project.
- Low conviction (H3): users don't understand IUL well enough to feel the call is worth it. Separate project.
- Agent humanization: IC V2 (Feb 2026) was confounded by video call mechanic — unresolved, designs available.
**Context:** BH connect rate (~38%) consistently outperforms NBH (~31%). The gap drives most of the BH vs. NBH revenue difference.

### Opportunity 3: NBH connect rate
**Impact:** NBH is ~31% connect rate vs. BH 38%. Approval volume is growing fast — NBH approvals represent a large and expanding pool. Closing even half the gap would compound significantly.
**Levers:** Text Bridge covers BH; NBH adaptation is the next step from BH learnings. Scheduling is especially high-value NBH (no agent available immediately).
**Context:** Current test holds NBH at control. NBH-specific variant should follow BH learnings.

### Opportunity 4: Self-serve checkout / post-approval experience
**Impact:** Q1 roadmap identified simplified self-serve checkout as a step-change for conversion. Approved users currently see Sales Direct immediately — no pricing, no growth projections, no self-serve path.
**Levers:**
- Show personalized growth projections (what they put in vs. what they get)
- Pre-approval framing: reframe actual approval as preliminary, drive urgency to connect for "final numbers"
- Price range on page: reduce sticker shock risk by setting expectations before the call
**Context:** This is Q1's "Simplified Checkout" initiative — status unclear going into Q2. Biggest post-approval surface after Sales Direct.

### Opportunity 5: Term → IUL cross-sell
**Impact:** ~30% of Term Ads funnel users show mixed intent or explicit interest in permanent life. Q1 experiment showed +5% lead/approval lift from just offering both products, but transmit rate was negative.
**Levers:** Post-approval experience for mixed-intent users that confidently routes to the right product. Q1 validated the hypothesis; Q2 needs the right execution.
**Context:** Term funnel is much larger than IUL. Even modest IUL conversion from Term traffic would be additive.

### Opportunity 6: Routing — "Both + Not Sure" → IUL
**Impact:** 18.8% of users (NBH dataset, n=23,851) select "Both" as their goal and "Not Sure" on coverage duration — currently routed to Term. This is a revenue-per-user bet, not a conversion fix.
**The data:**

| Segment | Routing | NonTS T/A |
|---|---|---|
| Both + Permanent | IUL | 7.1% |
| Protect | Term | 7.0% |
| Both + Not Sure | Term | 6.5% |
| Both + Term | Term | 4.1% |

"Both + Not Sure" converts at 6.5% in Term — close to "Protect" (7.0%), the cleanest Term segment. Term is not failing them on conversion. The case for routing to IUL is purely economic: IUL ARPU (~$2,000+) is dramatically higher than Term ARPU. A user who transmits IUL generates more revenue than one who transmits Term, so even if IUL routing lowers T/A slightly, the revenue per approved user could be higher.

**Hypothesis:** Route "Both + Not Sure" → IUL. Measure approval CVR, connect rate, and T/A vs. their current Term baseline.

**The economic case — with an important caveat:** The routing bet only holds if "Both + Not Sure" users in Term are being approved as **Trustage** ($71 MR/approval), in which case routing to IUL ($190 MR/approval) is a 2.7x revenue upgrade. If they're converting as **Prime/Choice Term** ($323 MR/approval), routing them to IUL ($190) would be a revenue downgrade. Product approval breakdown for this segment is unknown and needs to be pulled before building a PRD.

**Product MR/Approval comparison (avg Jan 5 – Feb 23):**

| Product | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|
| Prime/Choice Term | 9.0% | $3,704 | $323 |
| IUL | 9.3% | $2,144 | $190 |
| Trustage | 6.4% | $1,137 | $71 |

IUL and Prime/Choice Term have nearly identical act/approval rates — the revenue gap between them is entirely ARPU-driven. Trustage is the lowest-value product and represents 55% of all approvals.

**Risk:** "Not Sure" users have lower conviction than "Both + Permanent" — approval CVR and connect rate may be worse in the IUL path. We've never sent this segment to IUL, so the counterfactual is unknown.

**Required before PRD:** Pull product approval breakdown for "Both + Not Sure" users currently in Term. If most are Trustage approvals, the routing bet is strong. If they're Prime/Choice Term, the case weakens significantly.

**Note on "Both + Term" (4.1% T/A):** These users explicitly chose term duration and have the worst conversion of any segment — worse than clean Term intent users ("Protect" 7.0%). Don't reroute; they chose Term. But they may be lifecycle/cross-sell candidates post-approval.

### Opportunity 7: Channel mix
**Impact:** Affiliate (6x Social approval, 14x MR/User) and Search (3.5x Social) are dramatically higher quality but combined only 18% of traffic. Social is 70% of volume but the lowest converter.
**Levers:** Media investment shift toward higher-quality channels; better IUL-specific LP for search-intent users.
**Context:** Funnel optimizations compound most on Social (most volume) but unit economics improvements are fastest on Search/Affiliate.


---

## 5. Active Projects

### Sales Direct Text Bridge
- **Status:** PRD v2 complete, prototype in progress
- **Scope:** 4 variants (+ control) testing copy framing and scheduling UX on Sales Direct page, BH only
- **Hypothesis:** Users who can opt into a scheduled call via text are more likely to answer — replaces passive "we'll call you" with an explicit commitment mechanism
- **Primary metric:** Phone connect rate (BH)
- **See:** @docs/iul_projects/mar_2026/SalesDirectTextBridge/prd_text_bridge_v2.md

---

## 6. Open Questions

| Question | Why it matters |
|---|---|
| What is the scheduling mechanic in the text? (link, agent-text-back, other) | Blocks Text Bridge build |
| What is the status of self-serve checkout? | Biggest post-approval surface; Q1 said "on the cusp of launching" |
| What is the NBH connect rate strategy after Text Bridge BH learnings? | 31% NBH connect is a large pool with growing approvals |
| Is there a specific Q2 IUL ad spend and ROAS target? | Sizing the pre-NAP opportunity |
| What happened to the Term cross-sell post-approval experience from Q1? | +5% lead lift validated but transmit was negative — what's the next step? |
| Can we run a clean test of agent humanization on Sales Direct? | IC V2 was confounded; unresolved hypothesis with designs available |

---

## 7. Analytics Questions

Data pulls to prioritize with the analytics team before Q2 planning is finalized. Each question has a decision it unblocks.

### Q1 — IUL-origin vs Term-origin Trustage performance gap

**Pull:** Trustage act/approval rate, segmented by originating funnel path (IUL vs Term).

**Background:** When a user doesn't qualify for Ameritas IUL, they fall back to Trustage Term (then TAWL → GAWL). The same chain applies to Prime/Choice Term users. The current UX creates a mismatch for IUL-path users: NAP and interview frame the product as IUL (permanent, wealth-building), approval says "you've been approved," and then package select shows Trustage Term pricing and term language with no transition. Term-path users who fall to Trustage had term expectations all along.

**Hypothesis:** IUL-origin Trustage users activate at a meaningfully lower rate than Term-origin Trustage users due to the expectation mismatch.

**Decision it unblocks:** If the gap is confirmed, fixing the IUL→Trustage transition (package select copy, framing, expectation-setting pre-approval) becomes a concrete opportunity. If no gap, the issue may be product fit rather than UX and the intervention is different.

---

### Q2 — Product approval breakdown for "Both + Not Sure" users in Term

**Pull:** Of users who answered "Both" + "Not Sure" on coverage duration (currently routed to Term), what product did they ultimately get approved for? Break out by Trustage vs Prime/Choice Term (and further by Trustage Term / TAWL / GAWL if possible).

**Background:** "Both + Not Sure" is 18.8% of users and currently routes to Term. The case for rerouting them to IUL depends entirely on what they're being approved as in Term. If they're predominantly Trustage approvals ($71 MR/approval), IUL routing ($190 MR/approval) is a 2.7x revenue upgrade. If they're predominantly Prime/Choice Term ($323 MR/approval), IUL routing is a revenue downgrade.

**Decision it unblocks:** Go/no-go on the routing experiment (Opportunity 6). Blocks PRD.

---

### Q3 — NAP CVR decline: channel mix shift or within-channel degradation?

**Pull:** NAP CVR by channel, week over week from Nov 2025 to Feb 2026.

**Background:** IUL NAP CVR dropped from ~27% (Nov) to ~16% (late Feb) as volume scaled ~4x. Two possible causes: (a) channel mix shifted toward lower-converting channels (more Social, less Search/Affiliate), or (b) within-channel NAP CVR is genuinely declining — the incremental Social audience is lower intent.

**Decision it unblocks:** If the decline is channel mix, the fix is media allocation. If it's within-channel degradation, the fix is product/funnel (LP copy, intent question UX, onboarding). Different problems, different roadmaps.

---

### Q4 — BH coverage duration breakdown (equivalent of NBH routing data)

**Pull:** BH funnel breakdown by goals × coverage duration answer × routing, matching the NBH dataset structure.

**Background:** We have the NBH routing breakdown (n=23,851) showing "Both + Not Sure" = 18.8%, "Both + Permanent" = 29.1%, "Both + Term" = 16.8%. BH funnel data only shows by goals (Both/Grow/Protect) without the duration answer. Since intent questions don't vary by time of day, NBH is a reasonable proxy — but confirming BH volumes and conversion rates would strengthen any routing PRD.

**Decision it unblocks:** Validates NBH routing findings apply to BH. Strengthens or weakens the Opportunity 6 routing case.

---

### Q5 — IUL fallback rate to Trustage

**Pull:** Of users approved through the IUL path, what % were approved as Ameritas IUL vs Trustage Term vs TAWL vs GAWL?

**Background:** We know Trustage is 55% of all approvals across both paths, but we don't know how much of that volume originates from the IUL funnel specifically. The IUL→Trustage transition is a known UX problem (Opportunity 6 / Q1), but the scale is unknown. If the majority of IUL-path approvals fall to Trustage, it's one of the largest post-approval issues we have. If it's a minority, it's a meaningful but bounded problem.

**Decision it unblocks:** Sizes the IUL→Trustage transition opportunity. Determines whether fixing the handoff belongs in the top tier of Q2 priorities or is secondary to connect rate and pre-NAP work.

---

### Q6 — Pre-interview screen-level drop

**Pull:** Funnel drop rates at each screen within the pre-interview — goals screen, each intent question (coverage duration, dependents, expenses, wealth use), and the Step 1 intro — through to NAP.

**Background:** We know 74% of LP visitors never reach NAP, but the drop is attributed to the entire pre-interview as a block. We don't know whether users are abandoning at the goals screen (before answering anything), at the coverage duration question (the routing fork), or further in. Each has a different fix: if it's the goals screen, the problem is the proposition before any questions are answered; if it's the duration question, the framing of that specific question may be causing drop — which also connects directly to the routing discussion.

**Decision it unblocks:** Determines where to focus Opportunity 1 (pre-NAP CVR). Different screen-level drop points lead to entirely different interventions.

---

### Q7 — NAP → email drop rate by product (IUL NAP vs Term NAP)

**Pull:** NAP → email submission CVR, broken out by product shown on the NAP screen (IUL NAP vs Term NAP).

**Background:** ~36% of users who reach NAP don't submit their email — an underexplored drop. We don't know if that's split evenly between IUL and Term NAPs. Given WL NAP CVR is 46–59% vs IUL's 16–27%, it's likely the IUL NAP is driving most of the drop. If confirmed, the IUL product recommendation screen itself is the problem — not just the pre-NAP funnel — and the intervention is the NAP design and copy, not upstream intent questions.

**Decision it unblocks:** Determines whether the 36% NAP→email drop is an IUL-specific problem or a shared one. If IUL-specific, it becomes its own optimization surface separate from the broader pre-NAP CVR work.
