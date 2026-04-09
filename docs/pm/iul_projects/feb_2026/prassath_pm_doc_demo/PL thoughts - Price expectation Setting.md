---
last_updated: 2026-02-20
category: ideation
---

# Price Expectation Setting

> These are Prassath's rough thoughts from Claude brainstorming just to paint a clear picture of the problem and potential solution space. I'm not married to any particular solution. Comments and critique are more than welcome.

---

## Problem Statement

Ethos advertises life insurance starting at ~$30/month for a $1M policy, footnoted as the rate for a healthy 30-year-old. This price is real, and it's critical to driving site traffic — a low price point removes the biggest psychological barrier to even considering life insurance. But life insurance pricing is personal. Age, health, coverage amount, term length, and carrier all affect the final rate.

By the time a consumer completes our funnel and sees their approved price, many experience sticker shock. We need to close the gap between the ad price and the approved price before they get approved, so the final number feels like a personal discovery rather than a broken promise.

I can imagine us doing this in a few different places in the funnel:

1. Early in the pre-interview, where we just reset the expectation more generally.
   a. Fastest reset and feels authentic.
2. After we collect somebody's age.
   a. Pretty close to the above, may feel more personalized as we can tailor.
3. After product determined
   a. We can set a more realistic range for a given product line.
   b. >50% of our users won't be approved for $1M policies. So, this can also help ground things a bit more.
4. Deeper in the interview process, after we have a pretty good idea about somebody's health class.
   a. This would allow us to put that particular person's number right in the middle. Whereas when we do it early, for standard substandard users, the price may end up being the higher end of whatever original expectation we set. These are also the people that'll experience the most shock.

---

## Principles

**Educational, not defensive.** We're not apologizing for the $30 ad or preemptively explaining why the price will be higher. We're teaching people something true and intuitive: life insurance pricing varies based on who you are. The tone is informative and confident.

**Zero friction.** This is a visual and messaging moment, not an interactive tool. No inputs, no calculators, no sliders. The consumer absorbs the variability passively and moves into the funnel with recalibrated expectations. It should feel like a natural part of the page, not a speed bump.

**Lead with age, layer in complexity gently.** Age is the simplest and most intuitive driver of price variability — everyone understands that a 50-year-old pays more than a 30-year-old. Most concepts should lean on age as the primary explanatory variable. A couple of treatments can hint that health also matters, but this should be additive and easy to grasp, not the core message. The goal is to convey that pricing varies — not to teach the full pricing model.

**Keep the cards clean.** Each data point a consumer sees should be minimal: a name, an age, a health descriptor, and a price. Coverage and term details are consistent across all examples and belong in a footnote, not on every card. Less text means faster comprehension and less cognitive load.

**Normalize the range, don't scare with it.** Every price in the range should feel reasonable and expected. A $120/month policy isn't "expensive" — it's just where that person lands. The visual language should make the full spectrum feel like normal territory.

**Reinforce the Ethos value prop.** Every concept would close with the core message: Ethos checks multiple carriers to find the best rate for YOU.

---

## Concept 1: The Spectrum

**Headline**
*"Life insurance is surprisingly affordable — and your price depends on you."*

**Subheadline**
*"Ethos checks multiple carriers to find your best rate in about 5 minutes."*

**Visual**

A horizontal gradient bar — green on the left shifting to amber on the right. Four price points plotted along it with minimal labels:

| Price | Profile |
|-------|---------|
| $24/mo | Age 30, excellent health |
| $48/mo | Age 35, good health |
| $68/mo | Age 40, average health |
| $128/mo | Age 50, some health issues |

*\* All rates shown for $1M coverage, 20-year term. Actual rates vary by carrier.*

**Why It Works**

Simple and intuitive. Age goes up, price goes up — everyone gets this immediately. The health descriptors are soft and general (excellent, good, average, some health issues) rather than clinical, so they feel approachable rather than intimidating. The gradient makes the full range feel continuous and normal. A 50-year-old seeing $128/mo isn't shocked because the visual has already shown them the full landscape.

---

## Concept 2: The People Wall

**Headline**
*"Every price is personal."*

**Subheadline**
*"Ethos checks rates from multiple carriers to find yours. Takes about 5 minutes."*

**Visual**

Four persona cards in a clean grid. No photos — just a name, age, health descriptor, and price:

| | | | |
|---|---|---|---|
| **Sarah, 30** | **James, 35** | **Mike, 45** | **Tom, 50** |
| Excellent health | Good health | Some health issues | Average health |
| **$27/mo** | **$48/mo** | **$92/mo** | **$118/mo** |

*\* All rates shown for $1M coverage, 20-year term. Actual rates vary by carrier.*

**Why It Works**

People scan for the person closest to their age and anchor to that number. The cards are dead simple — name, age, health, price. No extra details to process. The persona format makes variability feel human and relatable rather than abstract. The soft health descriptors (excellent, good, some health issues, average) keep things approachable without requiring the consumer to map specific conditions to themselves.

---

## Concept 3: The Comparison Pair

This concept goes beyond age to show that health also affects pricing. A more targeted treatment for audiences who may benefit from understanding this additional dimension.

**Headline**
*"Same age. Different price."*

**Subheadline**
*"Your health and carrier match also shape your rate. That's why Ethos checks multiple carriers — to find your lowest rate. Takes about 5 minutes."*

**Visual**

Two cards, side by side. Same age, different health, different prices:

| | |
|---|---|
| **Kevin, 38** | **Brian, 38** |
| Excellent health | Some health issues |
| **$38/mo** | **$94/mo** |

*\* All rates shown for $1M coverage, 20-year term. Actual rates vary by carrier.*

**Why It Works**

By holding age constant and changing only health, this isolates a single insight: health matters too. It's the most visceral of the concepts and the simplest to build — two cards and one takeaway. The cards are ultra-clean: name, age, health, price. Nothing else to read or process.

---

## Concept 4: The Staircase

**Headline**
*"Your age is the starting point. Your health fills in the rest."*

**Subheadline**
*"At every age, rates range based on your health and which carrier fits you best. Ethos finds where you land. Takes about 5 minutes."*

**Visual**

A bar chart with four age groups. Each age has a range bar showing the spread from healthy to health conditions:

| Age | Excellent health | Some health issues |
|-----|-----------------|-------------------|
| 30 | ~$24/mo | ~$45/mo |
| 35 | ~$36/mo | ~$75/mo |
| 40 | ~$52/mo | ~$105/mo |
| 50 | ~$82/mo | ~$155/mo |

*\* All rates shown for $1M coverage, 20-year term. Actual rates vary by carrier.*

**Why It Works**

The age staircase is intuitive and expected. The range within each step is the new information — but it's presented simply as "excellent health" vs. "some health issues," not specific conditions. People walk away thinking "I wonder where I fall within my age bracket" rather than "I should pay $30." This is a good option to test with audiences who are comfortable with slightly more information density.

---

## Concept 5: The Ticker

**Headline**
*"Thousands of people find their price with Ethos every day."*

**Subheadline**
*"We check multiple carriers to find you the best rate — takes about 5 minutes."*

**Visual**

A slow-scrolling or auto-cycling feed showing anonymized recent Ethos quotes. Each entry is just age, health, and price:

| Profile | Price |
|---------|-------|
| Age 29, excellent health | $21/mo |
| Age 32, good health | $28/mo |
| Age 37, average health | $54/mo |
| Age 41, some health issues | $79/mo |
| Age 44, good health | $65/mo |
| Age 48, average health | $96/mo |
| Age 53, some health issues | $124/mo |

*\* All rates shown for $1M coverage, 20-year term. Actual rates vary by carrier.*

**Why It Works**

Borrows the "X people just booked this hotel" social proof pattern but repurposes it for expectation-setting. The scrolling motion creates a feeling of volume and normalcy. Each entry is just three things — age, health, price — so it's scannable at a glance. The variety does the teaching passively. Nobody reads a chart; they watch prices scroll by and intuitively absorb that there's a wide range. Builds urgency and social proof simultaneously.
