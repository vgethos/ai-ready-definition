---
last_updated: 2026-02-25
last_exported: 2026-02-25
category: prd
---

# IUL Onboarding: Growth Story Variants — PRD v1

---

## Objective

**Problem:** Today's IUL onboarding flow has a single screen with high-level benefits before moving into the application. We don't know whether more education increases conversion, and we don't know which growth story — death benefit, cash value, or both — is the most compelling way to get users bought in enough to fill out the application and connect with an agent.

**Solution:** Test three distinct onboarding variants, each telling a different growth story, to identify which narrative drives the highest full-funnel conversion.

**What we're testing:** The growth story — specifically, *what users understand IUL to grow* — and whether expanding education in the onboarding flow helps or hurts conversion. The variants are designed so that if one wins, we learn something actionable about user motivation, not just messaging execution.

---

## Principles

1. **Each variant must be capable of producing a different winner.** If two variants could plausibly tie, they aren't different enough to test. The dimension being tested is the user's *primary belief* about what IUL does for them — not surface-level copy variation.

2. **The story drives the structure.** Screen count and sequence follow from the narrative logic, not the other way around. Every screen earns its place by advancing the story. Every question reinforces the education that precedes it.

3. **Questions and education are paired.** Each education screen is either preceded by a question that creates curiosity, or followed by a question that confirms understanding and advances intent. No screen is purely decorative.

4. **Compliance shapes language, not story.** Death benefit and cash value must be taught on separate screens. Market-linked growth language applies to cash value only. "Returns" is never used — "payout" is the approved substitute. These constraints are encoded into copy, not into variant design.

5. **Routing is consistent across all variants.** Users who select "protection only" or "specific time period" are routed to term across all three variants. This levels the playing field — conversion differences are attributable to story, not funnel shape.

6. **The back half of the flow is shared.** Beneficiary questions, children question (conditional), coverage question, permanent protection education, cash value access education, and the chaptering screen are identical across all variants. The variants diverge only in the first 2–3 education screens and their paired questions. This isolates the growth story as the variable being tested.

---

## Context

### Why This Experiment Now

The Q1 roadmap centers on a single strategic bet: making IUL simple to understand and exciting to buy. The thesis is that IUL has historically been sold to sophisticated buyers by agents — and that selling it D2C requires stripping the product down to a compelling growth story that anyone can grasp in seconds.

The current onboarding does not do this. It provides a single benefit summary screen and moves directly into the application. We have no evidence that users leave onboarding with a clear mental model of what they're buying or why they should be excited about it.

This experiment answers two questions simultaneously:
- Does expanding education in onboarding improve conversion at all? (Answered by comparing any variant to the current baseline.)
- Which growth story drives the most conversion? (Answered by comparing variants to each other.)

### What We Know About the Audience

Users arriving through our onboarding come primarily from two sources: Meta (comparison-hook creatives — IUL vs. 401k, IUL vs. S&P 500) and search/affiliate (whole life and IUL intent). Meta users arrive asking "is IUL the best place for my money?" — they're in comparison mode, not education mode. Search users arrive with varying levels of IUL familiarity.

Approximately 50% of users in transcript analysis explicitly ask about cash value by name. This is higher than the team expected — users are not unfamiliar with the term, and using it directly may reduce confusion rather than add jargon.

### The Shared Flow Structure

All three variants follow this sequence. The cells that differ across variants are marked.

| Screen | All Variants | Notes |
|--------|-------------|-------|
| 1 | Goals Q | Shared — protecting / growing / both |
| 2 | **[VARIANT]** Growth education | The hero screen — differs across A, B, C |
| 3 | Investment preference Q | Shared question; paired education differs in B |
| 4 | **[VARIANT]** Growth/safety education | Differs across A, B, C |
| 5 | Depends Q | Shared — who depends on you financially |
| 6 | Children Q | Shared — conditional on children being included |
| 7 | Coverage Q | Shared — what expenses would they need help with |
| 8 | Permanent protection ed | Shared structure; copy emphasis differs in B |
| 9 | Cash value interest Q | Shared |
| 10 | Cash value access ed | Shared |
| 11 | Chaptering screen | Shared |

---

## The Three Variants

### Variant A — Death Benefit Growth (Control)
*The thing that grows is what your family gets.*

**Core hypothesis:** Users convert better when the primary value proposition is a large, tangible payout for their family. The 3–5x multiplier — what your family could get relative to what you put in — is the emotional anchor.

**Story sequence:**
1. IUL covers your family and can grow what they get
2. Part of your IUL grows with the market — up to 8.5% — and is safe from dips
3. [Back half: who depends on you, coverage needs, permanent protection, cash value access]

**Hero visualization:** Two-bar chart. Left bar: "What you put in." Right bar: "What your family could get" — visually unmissable, labeled 3–5x. The right bar must be so obviously larger that users grasp the ROI before reading the headline. Bar chart preferred over line graph for this comparison — cleaner and more direct.

**Key compliance constraint:** No market language on the death benefit screen. "Your death benefit grows with the market" is not permissible. The 3–5x framing is about total policy value, not market-linked returns. Market growth language is introduced only on the cash value education screen.

**What a win teaches us:** Users convert better when led with a large, concrete family payout. Legacy motivation — not personal financial gain — is the primary driver for this audience.

---

### Variant B — Cash Value Growth
*The thing that grows is yours to use while you're alive.*

**Core hypothesis:** Users convert better when the primary value proposition is personal financial gain — money they can access tax-free for retirement, emergencies, and opportunities. The death benefit is real and present, but it's the supporting character.

**Story sequence:**
1. IUL builds cash value — real savings that grow over time
2. You can access that cash while you're alive — for anything
3. And it's protected from market losses while it grows
4. [Permanent protection introduced as the bonus closer: "and your family is covered from day one"]

**Note on sequencing:** Access (screen 3) precedes loss protection (screen 4) deliberately. The emotional peak — "this money is yours to spend" — lands before the safety net is added. Protection is a reassurance after the exciting part, not a speed bump before it.

**Hero visualization:** Two-bar chart. Left bar: "What you put in." Right bar: "What you could have" — segmented into two stacked portions. Bottom segment (muted teal): "Family's payout." Top segment (bright teal): "Yours to access." The top segment is visually emphasized — taller and brighter — making clear that the accessible portion is the story. Multiplier label (e.g. "4.6x more") anchors the ROI.

**Permanent protection screen copy adjustment:** Variant A leads with protection. Variant B's version of this screen should lead with the cash value story and close with protection as the additive benefit — "And while your savings grow, your family is covered from day one." Same information, different emphasis, consistent with B's narrative.

**What a win teaches us:** Personal financial gain — money the user can access while alive — outperforms family legacy as the primary growth hook. Retirement income and emergency access are more motivating than inheritance for this audience.

---

### Variant C — Dual Growth (Equal Weight)
*Both grow simultaneously. The story speaks to everyone.*

**Core hypothesis:** A and B each make a bet on which user motivation dominates — legacy or personal gain. That bet will be right for some users and wrong for others. C doesn't make that bet. By giving equal weight to both growth stories from the very first education screen, C speaks to the full spectrum of users regardless of what brought them in. The hypothesis is that a story with no losers outperforms a story that resonates deeply with some users and misses others entirely.

**The key distinction from A and B:** A leads with the death benefit and introduces cash value late. B leads with cash value and introduces the death benefit late as a bonus. In both cases, the user who doesn't identify with the lead story has to wait — and may disengage before the story gets to them. C introduces both immediately, at equal weight, so every user sees something that speaks to them in the first 30 seconds.

**Story sequence:**
1. An IUL builds two things at once — savings you can use while you're alive, and a payout for your family
2. Both grow with the market, and neither can lose value when it dips
3. When the market grows, both grow. When it dips, neither goes down.
4. [Back half: who depends on you, coverage needs, permanent protection, cash value access]

**Hero visualization:** Single vertical bar split into two clearly labeled stacked segments. Bottom segment (darker teal): "Family's payout." Top segment (bright teal): "Yours to access." Both segments are equal in visual weight — neither dominates. Left comparison bar: "What you put in." Label: "3–5x total." The split bar is the visual proof of the dual growth claim — one policy, two outputs, shown simultaneously. This is the key differentiator from A (one bar, one story) and B (one bar, segmented but with explicit hierarchy).

The personalization layer — where the emphasized segment reflects the user's Screen 1 answer — is a desirable enhancement but not load-bearing. Even without conditional rendering, the visualization tells the dual growth story clearly. The equal-weight version is the baseline; personalized emphasis is a stretch goal if engineering supports it.

**Screen 3 — Safety education:** After establishing that both pools grow simultaneously, the natural third beat is that both are protected. "When the market grows, both grow. When it dips, neither goes down." This claim is true regardless of DB configuration, requires no knowledge of where the user will land in terms of product setup, and advances the dual growth story naturally — it's the same safety message A and B carry, reframed to apply to both pools at once.

This replaces an earlier version of Screen 3 that taught the independence of the two pools (borrowing from cash value doesn't reduce the death benefit). That claim is configuration-dependent — it's only true for the level DB configuration, and we don't know which configuration the user is in at this point in the flow. It was cut to eliminate the compliance exposure entirely.

**What a win teaches us:** Neither legacy nor personal gain dominates as a primary motivator — the audience is genuinely mixed, and a story that speaks to both outperforms a story optimized for one. This would suggest the right long-term approach is an equal-weight narrative across all touchpoints, rather than segmenting messaging by assumed motivation.

---

## What Winning Looks Like

| If this wins... | The learning is... | The implication is... |
|---|---|---|
| **A** (Death benefit) | Legacy motivation — what family gets — is the primary driver | Double down on 3–5x multiplier across all touchpoints; sales scripts should lead with family payout |
| **B** (Cash value) | Personal financial gain outperforms family legacy as a hook | Reorient ad creative and lifecycle messaging toward retirement income and access; death benefit becomes the bonus |
| **C** (Dual growth) | Resolving felt tension converts better than leading with one benefit | The "you don't have to choose" frame should permeate ads, onboarding, and sales; agents should surface the tradeoff question early |
| **None beats baseline** | More education in onboarding doesn't help — or hurts | The current single-screen approach is sufficient; focus shifts to post-approval experience |

---

## Open Questions

**OQ1 — Additive DB configuration lock**
No longer a blocker for any variant. C's Screen 3 was redesigned to use the safety story ("both pools are protected from market dips") which is true regardless of DB configuration. The additive DB question remains open as a product decision but doesn't affect this experiment.

**OQ2 — Personalization feasibility for C Screen 2**
Does the front-end support conditional visual emphasis based on Screen 1 answer? If not, C needs a redesign before it's worth testing.

**OQ3 — B Screen 4 dollar amounts**
The use case cards (retirement: $150k, emergency: $70k, etc.) are illustrative but will feel like promises. If post-approval numbers come in lower, there's a trust gap right before the sales handoff. Are these amounts compliant as illustrative examples, or do they need to be removed in favor of "see your real numbers after approval"?

**OQ4 — Permanent protection screen copy for B**
B's version of Screen 8 needs rewritten copy that leads with cash value and closes with protection as the additive benefit. This is a small but meaningful change — needs to be produced before build.

**OQ5 — Baseline measurement**
What is the current conversion rate for the single-screen onboarding baseline? This is the reference point for determining whether expanded education helps at all. Needs to be confirmed before launch.

---

## Success Metrics

**Primary metric:** Full-funnel conversion rate by variant — application completion and agent connect rate.

**Secondary metrics:**
- Drop-off rate by screen within each variant (identifies where each story loses users)
- Agent transmit rate by variant (did the story create excited buyers or confused ones?)
- Time on each education screen (proxy for engagement and comprehension)

**Hypothesis validation signals:**
- If A wins: drop-off concentrates at cash value screens in B and C; users who selected "protecting my family" in Q1 over-index for A
- If B wins: drop-off concentrates at death benefit screens in A; Meta traffic (comparison-hook users) over-indexes for B
- If C wins: users who selected "both" in Q1 over-index for C; the borrowing resolution screen (C Screen 3) has low drop-off, confirming the objection was real
- If none beats baseline: drop-off is spread across education screens in all variants; users want to get to their numbers faster, not learn more

---

## Constraints

1. **Routing is fixed:** Protection-only and term-intent users route out of IUL across all variants. Conversion differences are attributable to story, not audience composition.
2. **Back half is shared:** Screens 5–11 are identical across variants. Only screens 2–4 and the permanent protection screen copy differ.
3. **One question per screen:** Established team decision. No screen combines a question with a new concept introduction.
4. **Compliance constraints are non-negotiable:**
   - Death benefit and cash value taught on separate screens
   - No market language in death benefit context
   - "Returns" → "payout" throughout
   - "Tax-free" requires disclosure: *"Tax-free assumes policy doesn't lapse. Consult your tax advisor."*
   - C Screen 3 requires additive DB sign-off before build
5. **Character limit:** Education screen headlines should be readable at a glance. If the most interesting thing on a screen is in the subtext, rewrite the headline.
6. **Comparisons are out of scope for this experiment.** Meta-specific comparison hooks (IUL vs. 401k, IUL vs. S&P 500) are a follow-up experiment. Embedding comparison screens in one variant but not others would confound the growth story signal.

---

## Appendix: Other Dimensions to Test

This experiment isolates the growth story as the variable. The following dimensions are explicitly out of scope here but represent natural follow-on experiments once we have a winning growth story to build from.

---

### Comparison Stories

A and B establish that the right growth story matters. The next question is whether framing IUL against a known alternative — rather than in isolation — drives higher conversion for users who arrive in comparison mode. Meta is the most relevant channel here: our best-performing creatives are already comparison-format (IUL vs. 401k, IUL vs. S&P 500), meaning a meaningful share of Meta traffic arrives already asking "is IUL better than what I have?"

**IUL vs. 401k**
The most natural comparison for accumulation-focused users. Key differentiators: no IRS contribution limits, tax-free loans vs. taxable withdrawals, downside protection, death benefit. The onboarding story would open by acknowledging the comparison hook — "already contributing to a 401k?" — and build the IUL case against that baseline. Internal sales materials and ad creative for this comparison already exist and could inform copy.

**IUL vs. Buy Term, Invest the Difference (BTID)**
The most adversarial comparison — this is the Dave Ramsey objection. Users who arrive with this frame are skeptical and need to be convinced, not just informed. The core argument: BTID can outperform on paper but requires perfect discipline, full market exposure, and leaves no permanent coverage. IUL's participating loan structure means the money you borrow never stops compounding — a mechanic BTID comparisons typically ignore. High-conviction story for financially literate users but requires more explanation than other comparisons.

**IUL vs. S&P 500**
Speaks to investment-minded users who are evaluating IUL as a financial vehicle, not a protection product. The story centers on the asymmetry: same upside (up to the cap), zero downside, plus a death benefit the market can't provide. Simpler than the BTID comparison and likely a better fit for the Meta audience.

**When to run this:** After a winning growth story is established from this experiment. The comparison story should be layered on top of the winning growth narrative — not tested in isolation. If B wins, the IUL vs. 401k comparison is a natural complement. If A wins, IUL vs. BTID may be more relevant (legacy-motivated users are often already term holders).

---

### DB Configuration

This experiment treats the product as a single entity. In reality, users will land in one of two DB configurations — level or increasing-to-level — which tell meaningfully different stories about what their family receives and how cash value interacts with the death benefit.

**Level DB**
Death benefit is fixed from day one. Cash value grows separately and is the user's to access — it does not add to the family payout. Best for users whose primary goal is guaranteeing a specific inheritance amount. The story is clean and simple: your family gets a fixed amount, and you build a separate pool of savings.

**Increasing to Level DB**
Death benefit grows alongside cash value early in the policy, then levels off. During the increasing phase, cash value effectively goes to the family in addition to the face value — accessing it feels less like taking from them. Best for users who want flexibility and maximum growth. More complex to explain, but potentially more exciting for accumulation-focused users.

**Why this matters for onboarding:** The two configurations require meaningfully different copy on the cash value access and permanent protection screens — particularly around what the family receives and how borrowing affects the payout. Testing whether users convert better when shown the level or increasing story could inform both product defaults and messaging. This is likely a lower-priority experiment than comparison stories, but becomes more relevant as volume scales and we have enough data to segment by configuration.

---

## Next Steps

1. **Resolve OQ1 (additive DB lock) and OQ2 (personalization feasibility)** before committing C to build — both are potential blockers
2. **Write final copy** for all variant-specific screens (B hero ed, C hero ed, C Screen 3, B permanent protection screen)
3. **Compliance review** of C Screen 3 and B Screen 4 dollar amounts
4. **Confirm baseline** conversion rate for current single-screen onboarding
5. **Prototype** full 11-screen flows for each variant
6. **Design review** — confirm hero visualization is unmissable without reading the headline in all three variants; bar chart rendering confirmed before handoff
7. **Engineering feasibility** — confirm conditional rendering for C Screen 2 personalization
8. **Launch**
