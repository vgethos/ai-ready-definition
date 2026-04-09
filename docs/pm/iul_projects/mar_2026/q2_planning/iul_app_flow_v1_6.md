---
last_updated: 2026-03-06
category: reference
---

# IUL Application Flow — v1.6

Reference doc for the IUL funnel as of Q1 2026. Sourced from Figma: IUL MVP Q3 (v1.6 experience frame).

The flow has four declared steps. Steps 1–2 happen in-app. Steps 3–4 (health/lifestyle and final rate) happen via agent call.

---

## Entry: Landing Page

**Screen:** Meta LP / paid social entry point

- Headline: "Instant life insurance"
- Trust signals: "No medical exams · No blood tests"
- Social proof: #1 No-exam Term Life Policy (Business Insider), Trusted Life Insurance Provider (Forbes Advisor)
- CTA: "CHECK MY PRICE" (amber/clover button on dark cypress background)

Multiple LP variants exist in Figma (darker green bg, no subcopy, concrete variant).

---

## IUL Intent Section

These screens come before Step 1. They determine product routing and are the IUL-specific questions.

### Goals Screen

**"Let's get started! What are your goals for life insurance?"**

| Option | Label | Description |
|---|---|---|
| Protect my loved ones | Protect | Cover your family's needs (tuition, mortgage, living expenses, etc.) |
| Grow my wealth | Grow | Invest more to build tax-advantaged wealth you can tap into later. |
| Both | Both | Protect your loved ones and grow your wealth—all in one policy. |

### Intent Questions by Path

Which questions are shown depends on the goals answer:

| Screen | Protect | Grow | Both |
|---|---|---|---|
| How long do you want to be covered for? | No | Yes | Yes |
| Who depends on you financially? (#43) | Yes | No | Yes |
| What expenses do you want insurance to cover? (#45) | Yes | No | Yes |
| How do you want to use insurance to grow wealth? (#44) | No | Yes | Yes |

### Product Routing (determined here)

| Goals answer | Coverage duration answer | Product |
|---|---|---|
| Protect | — | Term |
| Grow | — | IUL |
| Both | The next 10 to 40 years | Term |
| Both | I'm not sure | Term |
| Both | My whole life | IUL |

### Intent Questions

**"How long do you want to be covered for?"** *(Grow, Both)*
- The next 10 to 40 years — "Stay covered until the mortgage is paid, the kids grow up, or you retire."
- My whole life — "Stay covered (and potentially pay premiums) your entire life."
- I'm not sure — "We'll guide you along the way."

**"Who depends on you financially?"** (#43) *(Protect, Both)* — Select all that apply
- Spouse or partner, Children, Parents, Other

**"What expenses do you want insurance to cover after you're gone?"** (#45) *(Protect, Both)* — Select all that apply
- My mortgage, My children's tuition, My end-of-life expenses, My family's living expenses

**"How do you want to use insurance to grow wealth?"** (#44) *(Grow, Both)* — Select all that apply
- Build savings with less risk
- Save for major life goals (retirement, tuition, etc.)
- Take advantage of tax-advantaged growth
- Leave a legacy for loved ones

---

## Step 1: Understand Your Coverage Needs

**Intro screen:** "Great! We'll get your coverage options in as little as 5 minutes."

Shows the 4-step journey:
1. Understand your coverage needs ← current
2. Confirm your eligibility
3. Provide health and lifestyle info
4. Get your final rate

CTA: "Next: Coverage Needs"

### Common Questions (all users)

Questions 1–4 auto-advance on selection (no "Next" tap needed).

| # | Question | Input type | Options |
|---|---|---|---|
| 1 | Provide your sex at birth | Radio | Male, Female |
| 2 | How is your health? | Radio | Average, Great, Excellent |
| 3 | Do you currently use nicotine products? | Radio | Yes, No |
| 4 | How many children do you have under 18? | Radio | 0, 1, 2, 3, 4+ |

### Term-Path Questions (Protect, or Both + 10–40 years/not sure)

| # | Question | Input type | Options |
|---|---|---|---|
| 5 | About how much remaining debt/mortgage do you have? | Slider | $0 – $1M+ |
| 6 | Do you have an idea of how much coverage you'd like? | Radio | Yes, I'm not sure |
| 7 | How much coverage are you looking for? | Slider | $0 – $5M+ (shown only if Q6 = Yes) |

### IUL-Path Questions (Grow, or Both + whole life)

| # | Question | Input type | Options |
|---|---|---|---|
| 5 | Do you have an Estate Plan or Will in place? | Radio | Yes, No, I'm not sure |

**Note:** Q5 "Yes" triggers an affirmation interstitial: "Nice! You're ahead of the pack. Less than half of American adults have an estate plan or will. FYI, eligible policyholders with Ethos have access to estate planning tools, all for free." → CTA: "Next"

---

## Transition: Step 2 Preview

**Screen:** "Up next: Confirm your eligibility"

- Shows progress: Step 1 complete (checkmark), Step 2 active, Steps 3–4 greyed
- Trustpilot social proof quote: *"The ease of answering questions, determining coverage, and instant decision on approval is game-changing. Love it!"* — Maestra A.
- CTA: "Next: Confirm Eligibility"

---

## Step 2: Confirm Your Eligibility

### Eligibility Questions

| # | Question | Input type | Notes |
|---|---|---|---|
| 9 | What country were you born in? | Dropdown | Default: United States |
| 10 | What state were you born in? | Dropdown | Select... |
| 11 | Are you a citizen or permanent resident of the USA? | Radio | U.S. Citizen, Permanent Resident (Green Card), None of the above |
| 12 | What's your zip code? | Text input | |
| 13 | What's your birthdate? | Date input | mm/dd/yyyy |
| 14 | What's your name? | Form fields | Legal first, M.I., last, suffix |
| 15 | What's your email? | Text input + reCAPTCHA | "Already have an account? Log in" |
| — | Loading screen | — | Full-screen spinner while identity is verified (app.stage.ethoslife.com) |
| 16 | What is your primary residential address? | Address selection | Pre-populated options from zip; "None of the Above" option |
| 17 | What are the last 4 digits of your mobile phone number? | Radio | Pre-populated masked numbers; "None of the above" option |

**Notes:**
- Q11 "None of the above" routes user out → Term insurance / software activation flow
- Q14 includes full consent acknowledgment: HIPAA Authorization, E-Sign Consent, Phone/SMS Consent, Consumer Report Authorization, MIB Pre-notice & Authorization, Insurance Practices, Replacement Notice, Terms of Use, Privacy Policy
- Q15 CTA disabled until email is entered and reCAPTCHA is completed
- The loading screen after email is where identity verification runs before surfacing the address options

### Post-Eligibility Screens (all users)

After Q17 (last 4 digits of phone), three more screens before entering the interview:

**Check your phone** — SMS OTP verification
- "Enter the code we sent to (•••) •••-XXXX"
- 6-digit code entry
- "Didn't get a code? Request a new code in 16s"

**Loading screen** — Dark green background, spinner
- "You're on your way to protecting your loved ones..."

**How did you hear about us?** — Dropdown (Select...) → CTA: "Next"

---

## Transition: Step 3 Preview (all users)

**Screen:** "Up next" — shows Steps 1 and 2 with checkmarks, Step 3 "Provide health & lifestyle info" active, Step 4 "Get your final rate" queued.

CTA: "Next: Health and lifestyle"

After this screen, users reach the **NAP screen** (product recommendation), then are routed to the Term or IUL interview.

---

## Steps 3–4: Health Interview

### NAP Screen (product recommendation)

Shown after the Step 3 transition, before the interview. Tells the user which product they're getting and why.

**Term NAP:** "Term life insurance sounds like a good fit!"
- Explains term as fixed-period, fixed-price coverage for financial obligations
- Beneficiary icons: Spouse/partner, Children, Parent, Other
- Benefits: Income replacement, Children's tuition, Mortgage coverage, Burial costs

**IUL NAP:** "Sounds like you need a permanent life policy, which also builds wealth"
- Explains IUL as whole-life coverage that grows tax-advantaged funds
- Beneficiary icons: Spouse/partner, Children, Parent, You
- Benefits: Stay protected for life, Grow tax-advantaged wealth, Access funds when needed

### Health Interview

Out of scope — owned by a separate team. Users are routed to the Term or IUL interview after NAP.

### IUL Interview → Sales Direct

The IUL interview ends with the **Sales Direct screen** — the final in-app screen before handoff to an agent:

- Headline: "Great news—you've been pre-approved for Indexed Universal Life!"
- Agent photo with blue verification badge
- Body: "Get ready to grow your savings while protecting your family. We'll call you in 10 minutes to get you approved and design the right plan."
- URL: ethoslife.com (no app chrome)

An outbound call is triggered automatically. The agent conducts the remainder of the IUL interview by phone. IUL cannot be purchased without the agent call — there is no self-serve transmit path.

---

## Terminology

| Term | Definition |
|---|---|
| Pre-interview | Everything from LP through NAP — the funnel before the interview. In practice refers to the content before NAP, since PII/eligibility is already highly optimized. |
| NAP | Product recommendation screen (Term or IUL). Shown after the Step 3 transition. |
| Interview | Steps 3–4. Health and lifestyle questions. Owned by a separate team. |
| Lead | User has reached the start of the interview. Lead records are created when the user completes the PII section (email submission), but the lead is counted at interview start. |
| Approved | User has completed the interview and been approved for coverage. |
| Transmit | User purchases a policy. |
| Activation | Payment goes through. Policy is active. |
| Connect rate | IUL-specific metric. The rate at which approved users actually speak with an agent after reaching Sales Direct. The key success metric for IUL since the product cannot transmit without an agent call. |
| Sales Direct | The final in-app screen for IUL users. Shown after the IUL interview. Triggers an outbound agent call. |

---

## Product Approval Hierarchy

When a user completes the interview, they are evaluated for their primary product first. If they don't qualify, they fall back through a chain of alternatives. The fallback logic is the same for both the IUL and Term paths.

### IUL Path (Ameritas IUL → Trustage fallback)

| Priority | Product | Trigger |
|---|---|---|
| 1 | Ameritas IUL | Primary — user qualified |
| 2 | Trustage Term | Didn't qualify for Ameritas IUL |
| 3 | TAWL (Trustage Advantaged Whole Life) | Didn't qualify for Trustage Term |
| 4 | GAWL (Guaranteed Advantage Whole Life) | Didn't qualify for TAWL |

### Term Path (Prime/Choice Term → Trustage fallback)

| Priority | Product | Trigger |
|---|---|---|
| 1 | Prime/Choice Term | Primary — user qualified |
| 2 | Trustage Term | Didn't qualify for Prime/Choice Term |
| 3 | TAWL | Didn't qualify for Trustage Term |
| 4 | GAWL | Didn't qualify for TAWL |

### Notes

- **Trustage products are largely outside product control** — eligibility is determined by Trustage underwriting; we cannot prevent users from falling to Trustage products.
- **IUL → Trustage fallback creates an experience mismatch.** Users are told "we recommend IUL" (permanent, wealth-building) throughout onboarding and the NAP screen, approved, then land on package select showing Trustage Term pricing and term language with no transition or explanation. Term-path users who fall to Trustage Term had term expectations all along, so the fallback is less disorienting.
- **In the data**, Trustage approvals are reported as a single bucket regardless of originating path (IUL or Term). No current breakdown exists by originating funnel.

---

## Off-Flow Branches

| Trigger | Destination |
|---|---|
| Citizenship = "None of the above" | Term insurance + software activation flow |
| User eligible for LSA/WL/Ameritas | Separate product path |
| IUL approval | Sales Direct → outbound agent call → IUL interview |

---

## Key Observations for Q2 Planning

- **The Sales Direct page is the last thing users see before the agent call** — this is the surface with the most intervention potential for connect-rate experiments (e.g. Text Bridge)
- **No pricing is shown anywhere in the app flow** — users complete the full funnel without seeing a number; price is revealed on the agent call
- **The "health and lifestyle" step (Step 3) is agent-gated** — there is no in-app health questionnaire for IUL; all health underwriting happens on the call
- **NAP comes after eligibility** — the product recommendation screen comes after the user has already submitted name, email, address, and phone verification
- **Intent is captured upfront** — goals, dependents, coverage horizon, and wealth use are all collected before Step 1, giving the agent rich context before the call
- **The LP is generic** — entry copy ("Instant life insurance") is Term-centric; IUL users self-select through the intent questionnaire
