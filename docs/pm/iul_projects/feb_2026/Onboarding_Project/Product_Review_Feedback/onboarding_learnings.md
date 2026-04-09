---
last_updated: 2026-02-24
category: knowledge-base
---

# IUL Onboarding: Product Learnings

Scoped to the IUL onboarding funnel. For IUL-wide compliance and terminology rules, see `iul-review-standards.md`.

---

## Status Definitions

- **Validated** — evidence-backed: A/B test result, compliance sign-off, or hard data. Source noted.
- **Decision** — deliberately chosen by the team. Treat as current direction unless explicitly revisited. Not an empirical finding.
- **Working hypothesis** — believed but not yet tested. Strong prior, not a fact.
- **Open question** — unresolved. Do not encode as any of the above until answered.

---

## User Behavior

**[Validated] ~50% of users in transcripts explicitly ask about cash value by name.**
Users are not unfamiliar with the term. Using "cash value" directly may reduce confusion rather than add jargon.
*Source: Transcript analysis, referenced 2/24/26 (Juan)*

**[Validated] Meta users arrive via comparison hooks (IUL vs. 401k, S&P 500, CDs).**
Their primary question is "is IUL the best place for my money?" — not "what is IUL?" The flow should meet them there.
*Source: Q1 2026 Roadmap*

**[Working hypothesis] Not mentioning cash value early in the inheritance variant creates drop-off risk from Meta traffic.**
Meta ads reference "money you can use during your lifetime." If the flow doesn't echo this early, users who arrived for that reason may disengage before reaching it.
*Basis: Jeff's risk call, 2/24/26. Logical inference — not tested.*

---

## Messaging

**[Validated] Both the growth story AND the safety story must be told.**
Communicating only "it won't go down" undersells the product. Growth narrative must be present.
*Source: Team consensus, 2/17/26*

**[Validated] Cash value must be introduced as additive — not competing with the death benefit story.**
Framing: "There's more to your policy." Not a trade-off, not a complication.
*Source: Team consensus, 2/17/26*

**[Working hypothesis] "Cash value" used directly outperforms euphemisms like "wealth you can use while alive."**
~50% of users already use the term. Hypothesis: directness reduces confusion rather than adding jargon.
*Basis: Juan's observation + transcript data, 2/24/26. Not tested as a copy variant.*

**[Working hypothesis] Combining 8.5% growth + 3–5X in one variant risks confusing users.**
These are two different growth framings (annual rate vs. lifetime multiple). Users shown both without clear separation may struggle to reconcile them.
*Basis: Ash's concern, 2/24/26. Not tested.*

---

## Flow & Structure

**[Decision] Agreed flow sequence:**

| Step | Screen | Notes |
|---|---|---|
| 1 | Death benefit education | "Your family gets 4–5X what you put in." No market language. |
| 2 | Investment preference question | Risk tolerance framing: "slow growth guaranteed" vs. "higher growth, no downside." Introduces guaranteed vs. non-guaranteed. |
| 3 | Family protection questions | Who depends on you + children + what to leave behind. |
| 4 | Cash value usage question | "What do you want to use it for?" Retirement, emergencies, milestones. Explain borrowing mechanics. |
| 5 | Transition to PII | Chapter screen before collecting personal information. |

**[Decision] One question per screen throughout.**
*Source: Team consensus, 2/16/26*

**[Decision] Death benefit and cash value are taught on separate screens.**
Death benefit screen: 3–5X framing, no market language.
Cash value screen: market growth, 0% floor, borrowing mechanics.
*Source: Team consensus, 2/16/26*

**[Decision] Children question is conditional** — only shown when children are included in coverage.
*Source: Team decision, 2/16/26*

**[Decision] Wills and trust question removed from the flow.**
*Source: Team decision, 2/16/26*

**[Decision] Transitional chapter screen before PII collection.**
*Source: Team decision, 2/16/26*

**[Working hypothesis] Single-screen ROI visualization outperforms two-screen version.**
Keeping the 3–5X claim and the visual proof on the same screen increases immediate comprehension.
*Basis: Ash's direction, 2/24/26. Not yet tested.*

---

## Visualization

**[Working hypothesis] Bar chart outperforms line graph for ROI visualization in this experience.**
Bar chart makes input vs. output immediately legible. Line graph requires users to read the legend and trace two lines.
*Basis: Team preference, Prassath + Ash, 2/24/26. Not formally A/B tested. May not generalize to other surfaces.*

**[Working hypothesis] The right bar in the ROI chart must be visually unmissable without reading the headline.**
If users have to read the headline to understand the visual, the visual isn't doing its job.
*Basis: Ash's feedback, 2/24/26.*

**[Working hypothesis] Yellow and red lines in the growth/safety graph should overlap slightly.**
Makes the comparison between IUL performance and market performance immediately readable.
*Basis: Prassath's suggestion, confirmed by Jeff as consistent with other feedback, 2/24/26.*

---

## Variants

**[Working hypothesis] The inheritance vs. cash value variant distinction is too subtle to produce meaningfully different test results.**
Users outside the team cannot reliably spot the difference. Variants that aren't materially different will produce noisy results.
*Basis: Prassath's observation (showed to 3 people), 2/24/26. Not formally validated.*

**[Working hypothesis] If testing inheritance vs. cash value variants, the cash value variant must prominently feature 8.5% as its headline differentiator.**
It's the only compliance-permissible distinguisher between the two variants. If it's in subtext, the variants aren't distinct enough to test.
*Basis: Ash's feedback, 2/24/26.*

---

## User Routing

**[Working hypothesis] Users who select "guaranteed returns" in a risk tolerance question should be routed to term life, not IUL.**
Forcing IUL on users who explicitly want certainty likely creates post-approval drop-off.
*Basis: Team brainstorm, 2/16/26. Not tested.*

---

## Open Questions

**OQ1. What happens after year 20 that makes projections non-guaranteed?**
Affects how and when we disclose projection uncertainty in the flow.

**OQ2. Can users pause premium contributions?**
Flagged as unresolved in `whats_an_iul.md`. Affects cash value access messaging.

**OQ3. Is there a version of the inheritance variant that incorporates 8.5% without compliance exposure?**
Ash's proposal: try weaving it into the second screen with precise wording. Needs sign-off from Adrian and Troy before locking.

**OQ4. What's the right moment to introduce guaranteed vs. non-guaranteed concepts?**
Too early may undermine the growth story. Too late creates trust issues at the bottom of the funnel.

**OQ5. Is the additive death benefit (not level DB) up to age 65 a locked product decision?**
2/16/26 notes say the team was "orienting toward" this. Unclear if finalized.
