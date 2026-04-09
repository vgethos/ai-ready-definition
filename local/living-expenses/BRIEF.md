# Living Expenses — Project Brief

## Background

Our coverage algorithm recommends coverage amount C based on affordability and conversion likelihood. To make C compelling, we break it down into three components:

1. **Mortgage** — sourced from what users told us
2. **Children's education** — $50K per child
3. **Family's living costs** — whatever's left over

The third component is the problem. Users didn't arrive at that number themselves, so it feels arbitrary, and they lower their coverage as a result.

## Hypothesis

If users feel like C is a reflection of what they said they need — rather than a number handed to them — they will have more conviction in it.

By asking users to self-state their needs, and then showing them how those needs produce C, we can increase user conviction.

**Key constraint:** C cannot change by more than ~$50K (to maintain affordability constraints). So user answers don't fundamentally change the math — they change how the math is explained back to them.

---

## The Three Sub-Problems

### 1. The Analytics Layer

The core challenge is a translation formula that converts a monthly living expense number into a defensible lump sum.

**The 4% rule** is the leading candidate: a lump sum invested conservatively can sustain indefinite withdrawals at 4% of the principal per year.

> If a user says $5,000/month → $5K × 12 / 4% = **$1.5M**

**Levers within the rule** (all defensible):
- Withdrawal rate: 3–5% range
- Inflation assumption
- Expected return on investment

Together these may give enough room to back-solve for a monthly number that maps to C for most users. We need a fallback for cases where no reasonable combination gets close enough to C.

**Action:** Build a "needs education engine" — similar to the social proof engine — that tests different assumptions (rate of return, inflation, etc.) and determines what % of users we can serve with the 4% rule vs. what fallbacks are needed.

---

### 2. Collecting User Inputs Without Friction

Key questions to resolve:

- Do we ask about all expense categories, or focus on monthly living expenses and retain flexibility on education?
- For "family's living costs": do we collect monthly expenses, or something else?
- **Anchor vs. precision tradeoff:** anchoring sacrifices precision but improves completion rate. The right answer depends on how much precision vs. anchoring helps us arrive at C, and how important precision is to user confidence in the lump sum.

---

### 3. Placement — Where We Ask and Where We Explain

This is the most important sub-problem. **Users need to see value from answering these questions.** Every question must feel like personalization, not justification.

**Analytical constraint on placement:** If we know that for a given user no monthly living expense number can translate to C, we shouldn't ask them for it at all. So these questions should only be asked **after backend approval**, when we know what C is.

---

## Principles

- C cannot change by more than ~$50K
- The translation formula (4% rule or otherwise) must be consistent and explainable if a user asks why
- Only ask questions we are going to use to convince users about C
- Ask about self-stated needs only after backend approval, when C is known
- Every question's framing should feel like **personalization**, not **justification** — we are learning about them, not defending a number we've decided on
- The experience of answering must feel delightful, not onerous

---

## Proposed Approaches

### A. Weave it into the Needs Education screen
Flip the screen so users input first. Ask for monthly living expenses (anchored range) before revealing the breakdown. Then the breakdown feels like it was built from what they just told us.

### B. Single question during the loading/personalization screen
The "sit tight as we review your application" screen already has a waiting moment. Use one of the three loading steps ("Personalizing your coverage") to ask a single quick question: *"What does your family spend monthly?"* It feels like the answer is going into the calculation, priming users to feel ownership over C before they ever see it.

### C. Single screen between Beneficiaries and Needs Education
After adding beneficiaries, users are in a "thinking about my family" mindset — emotionally primed. A single screen here asking *"To personalize your coverage recommendation, what would your family need monthly to maintain their lifestyle?"* would feel natural and low-friction before the coverage reveal.
