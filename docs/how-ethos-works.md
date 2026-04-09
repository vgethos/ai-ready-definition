# How Ethos Works — Funnel Overview

## Top of Funnel — Acquisition

User clicks a Facebook ad and lands on ethos.com landing page.

## Mid-Funnel — The Interview (Questionnaire)

A long, multi-step questionnaire that collects everything needed to underwrite a life insurance policy:

### Personal & Family Info
- Family details (dependents, beneficiaries)
- Location / state of residence
- Income and employment

### Medical / Health Info
- Smoking status
- Hospitalization history
- Family history of cancer, heart disease, etc.
- Other health factors that influence eligibility and rate

### Final Interview Step
- Last question: "Which state issued your most recent driver's license?" (used for identity verification)
- CTA: "Last step before you can receive your unique Real Rate."

## Transition — Application Processing

After the interview, a loading/processing screen appears while the backend:
- Runs data through third-party source APIs
- Verifies applicant data
- Polls carrier APIs for rates
- Determines approval status

**What the user sees:**
- Personalized message: "[Name], sit tight as we review your application!"
- Animated progress indicators:
  1. Confirming identity
  2. Getting you the best rate
  3. Personalizing coverage
  4. Putting it all together
- Trustpilot social proof (4.8 stars / 9,000 reviews) + customer testimonial
- Completion message: "That took 3 seconds and saved you 6 weeks of time with Ethos!"

---

## Bottom of Funnel — Post-Approval Flow

### Experiment: Instant Coverage Interstitial (before Approval Screen)

> **Active experiment:** Inserts a new sequence between the processing screen and the approval screen to frame the approval as "instant coverage" and reinforce value.

**Screen A — Transition (loading):**
- "EVERYTHING LOOKS GOOD SO FAR" with loading animation

**Screen B — Instant Coverage Check:**
- "EVERYTHING LOOKS GOOD SO FAR"
- "Checking if you're approved for instant coverage"
- "This should take just a few seconds."
- **Benefits of instant coverage:**
  - Skip all medical exams and blood tests
  - Get a real rate — not just an estimate
  - Start coverage online within minutes

**Modified Approval Screen (replaces standard approval):**
- Headline changes to: "Congrats, [Name]! You're approved for **instant coverage**."
- Adds a "JUST 3 EASY STEPS LEFT" card:
  1. Select a beneficiary to receive your payout.
  2. See your rate and get your coverage options.
  3. Start coverage instantly whenever you're ready.
- CTA: "Next"
- Carrier trust card and estate planning upsell remain the same as standard approval.

---

### Screen 1: Approval Confirmation (Standard / Control)

**Headline:** "Congrats, [Name]! You're approved."
**Subhead:** "The hard part is over. You're just a few steps away from protecting your family."

**Carrier Trust Card:**
- "Your policy is backed by [Carrier Name]" (e.g., Banner Life Insurance Company)
- Credibility stats: #1 term life carrier in US, A+ AM Best rating, $1B+ claims paid in 2024

**Primary CTA:** "Add beneficiary"

**Below the fold — Estate Planning Upsell:**
- "Limited time offer" label
- "Your policy includes free online estate plans for you and your spouse"
- Value props: Legal Will, Power of Attorney, Trust & more / Step-by-step concierge / Vetted by attorneys
- Anchor pricing: "$898 retail value, $0 with any Ethos policy"

### Screen 2–3: Beneficiary Steps (Step 1 of 3: Beneficiaries)

> **Note:** There is an ongoing experiment where the beneficiary screens are removed from the bottom-of-funnel flow entirely.

#### Screen 2: Beneficiary Pre-Fill

**Progress bar:** 1. Beneficiaries → 2. Coverage → 3. Secure checkout

**Headline:** "Add your loved ones as beneficiaries"
**Subhead:** "We've suggested people based on your household information. You'll be able to confirm their details on the next screen."

- Pre-populated list of household members (from interview data) with select/add toggles
- "Add others" option
- Social proof nudge: "Most people choose a spouse or a child as their beneficiary. You can add more anytime after your purchase."

**CTA:** "Next"

#### Screen 3: Beneficiary Details

**Headline:** "Confirm your beneficiary details"
**Subhead:** "Your beneficiaries receive your life insurance money if you pass away. You can change them online at any time."

- Form per beneficiary: First name, Last name, Relationship (dropdown), Birthdate
- "Add another" link
- Optional: "Click here if policy notices should be mailed to an additional address"
- Same social proof nudge as previous screen

**CTA:** "Next"

### Screen 4: Coverage Recommendation (Step 2 of 3: Coverage)

**Headline:** "We calculated how much coverage you need"
**Subhead:** "This is what we recommend to help secure the future for [beneficiary names]. You can adjust this on the next screen."

**Recommended coverage card** showing total (e.g., $580,000) with a stacked bar and breakdown:
- **Family's living costs** — $360,000 — "Ensure your family doesn't have to make sacrifices to pay their bills."
- **Mortgage repayment** — $120,000 — "Cover your mortgage so your family can stay in their home without financial worry."
- **Children's education** — $100,000 — "Provide funds for college tuition to help secure your children's future."

Link: "How is your coverage calculated?"

**CTA:** "Next: See my rate"

### Screen 5: Rate Comparison (Step 2 of 3: Coverage)

**Headline:** "Save up to $350 per year with Ethos"
**Subhead:** "See how your rate with carriers through Ethos compares to traditional insurers for $980K, 20-year coverage."

**Ethos rate card** (highlighted):
- Ethos logo + 4.8 Trustpilot rating
- **$4.21/day**

**Competitor comparison list** (each showing daily rate + annual cost difference):
- Mass Mutual — $8.37/day — ↑ $1,519 more per year
- National Western — $7.78/day — ↑ $1,303 more per year
- Columbian Financial Group — $7.57/day — ↑ $1,227 more per year

Disclaimer: Rates from Compulife, based on comparable policy terms, tailored to user's rate class.

**CTA:** "Next"

### Screen 6: Coverage Customization (Step 2 of 3: Coverage)

This is the most complex screen — the user configures their policy here.

**Headline:** "How much coverage do your loved ones need?"
**Subhead:** "We recommend $580K for 20 years. Need help? Try our calculator."

**Policy amount slider:**
- Range: $100K – $3M (Low ↔ High)
- Displays selected amount (e.g., $2,000,000)

**Term Length selector** (radio/pill options, e.g.):
- 20 years — $30/mo
- 30 years — $68/mo — $2.25/day *(Recommended)*
- 35 years — $90/mo
- "More options" link for additional terms
- Rate updates dynamically based on both coverage amount and term length

**Contextual explanation** (updates based on selected term):
- e.g., "Provides financial security through retirement — protecting your family while they rely on you most."
- "This will help cover their mortgage, tuition, and essential needs."

---

**Section: "How your coverage supports [beneficiary name]"**
- "Have peace of mind knowing your loved ones will have financial support for:"
- Icons: Living expenses, A place to live, The unforeseen, Funeral costs

**Section: "Calculate your needs"** (interactive calculator)
- Adjustable line items with +/- controls:
  - Living expenses — $400,000
  - Children's tuition — $50,000
  - Pay off mortgage — $450,000
  - Cover your funeral — $10,000
- **Total amount for your beneficiaries: $580,000**

**Social proof quote:**
> "Ethos is more affordable and offers more options than competitors." — King W.

**Trustpilot badge:** 4.8/5, 1,034 reviews

**CTA:** "Next"

### Screen 7: Pre-Checkout Interstitial

A brief loading/transition screen that reinforces confidence before entering payment.

**Label:** "GREAT CHOICE!"
**Headline:** "Immediate peace of mind, ultimate flexibility"

**Reassurance points (with icons):**
- 30-day money-back guarantee
- Cancel anytime, no fees
- You even get to keep your estate plan

### Screen 8: Secure Checkout (Step 3 of 3: Secure Checkout)

**Headline:** "You're one step away from protecting [beneficiary name]."
**Subhead:** "Nice work, [Name]. Just add payment and start your coverage."

**Payment section:**
- Payment method options: Bank account, Credit card
- Payment summary: e.g., $490.60/month ($975/mo shown as comparison?)
- 30-day money-back guarantee
- Cancel anytime

**Social proof nudge:** "You're in a good company: 38% people are protecting their family at 25% of their income."

**Policy summary:**
- Your Policy: Coverage $2,000,000 / Term length 30 years / Carrier Banner Life / Start date January 23, 2025 / Application VTFN
- Your Beneficiaries: e.g., Katy Aguirre-Clark
- Estate planning service: Includes will & trust, Limited time only!
- Your Details: Address, Last 4 SSN (editable)

**Note:** "You even get to keep your $498 estate plan."

---

**Below the fold — Trust & social proof stack:**

**Customer testimonial:**
> "My husband and 4 children are now protected. I feel like a huge weight was lifted off my shoulders." — Sandra M.

**Trustpilot:** Rated "Excellent" — Over 1,400 reviews

**Carrier trust block:**
- "Backed by America's #1 term life carrier" — Banner Life Insurance Company, trusted by millions
- Over $1 billion in claims paid in 2024
- A+ rated by A.M. Best
- 75+ years protecting families

**FAQ section: "Your questions, answered"**
- Will the carrier be around in 40 years?
- Will my rates go up?
- Can I cancel anytime?
- How do I file a claim?

**"Why over 500,000 families trust Ethos"**
- A+ rating from BBB
- Best Insurance Companies award

**Legal disclaimers and consent checkbox:**
- "By continuing, I confirm I've answered the application..."

**CTA:** "Start my coverage"

### Screen 9: SSN Confirmation (Post-Checkout Modal)

A bottom-sheet modal that appears after the user submits payment.

**Lock icon**
**Prompt:** "Please confirm the last 4 digits of your social security number"
- Input field showing masked SSN: `•••• ••• [last 4]`
- Norton Secured badge (powered by Symantec)

**CTA:** "Confirm"

### Screen 10: Confirmation / Success

**Banner:** "SHARE ETHOS WITH YOUR SPOUSE"
**Policy ID:** e.g., Policy X-2519

**Illustration:** Celebration hands

**Headline:** "Congrats, [Name] you're covered!"
**Link:** "Access your policy: Here"

**Body copy:** "You've taken an important step to help protect the future of those you care about. Your policy is now considered to be delivered, signed and accepted. You also acknowledge that your policy is suitable for you, based on your financial needs and circumstances."

**Disclaimer:** *Coverage is subject to payment confirmation

**Below:** "Take the next step to get your..." (likely estate planning upsell, cut off in screenshot)
