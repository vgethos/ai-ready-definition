---
last_updated: 2026-03-06
category: reference
---

# IUL Performance Metrics — Q1 2026

Five datasets, all exported 2026-03-06:
1. **Weekly BH/NBH results** — Jan 5–Feb 23, post-approval connect/activation metrics
2. **BH funnel by intent path** — cumulative, broken down by goals (both/grow/protect)
3. **NBH funnel by intent path + coverage duration** — cumulative, broken down by goals × coverage duration answer × routing (IUL/Term)
4. **Full funnel** — Nov 2025–Mar 2026, LP-to-activation for IUL vs Whole Life
5. **Weekly results by product approval** — Jan 5–Feb 23, IUL vs Prime/Choice Term vs Trustage

All activation figures use 30-day maturity. Recent weeks are partially projected.

---

## Metric Definitions

| Metric | Definition |
|---|---|
| Approvals | Users who completed the IUL interview and were approved |
| Connect rate | Connected / Called — share of approved users who actually spoke to an agent |
| Activated/Connected | Share of connected users who activated (purchased) |
| Activation rate | Activations / Approvals — overall conversion from approval to purchase |
| ARPU | Average revenue per user at activation |
| MR/Approval | Monthly revenue per approval at 30-day maturity |

---

## Weekly Data

### Connect Rate (Connected/Called)

| Week | BH | NBH |
|---|---|---|
| Jan 5 | 30.5% | 29.8% |
| Jan 12 | 42.8% | 30.2% |
| Jan 19 | 35.9% | 27.8% |
| Jan 26 | 40.7% | 33.6% |
| Feb 2 | 41.8% | 31.2% |
| Feb 9 | 37.3% | 31.3% |
| Feb 16 | 38.6% | 34.6% |
| Feb 23 | 38.0% | 33.8% |
| **Avg** | **38.2%** | **31.5%** |

### Activated/Connected Rate

| Week | BH | NBH |
|---|---|---|
| Jan 5 | 34.3% | 25.8% |
| Jan 12 | 26.1% | 22.1% |
| Jan 19 | 26.0% | 17.5% |
| Jan 26 | 30.7% | 21.3% |
| Feb 2 | 32.6% | 26.0% |
| Feb 9 | 26.8% | 21.3% |
| Feb 16 | 25.6% | 18.0% |
| Feb 23 | 24.5% | 25.7% |
| **Avg** | **28.3%** | **22.2%** |

### Overall Activation Rate (Activations/Approvals, 30d maturity)

| Week | BH | NBH |
|---|---|---|
| Jan 5 | 10.4% | 7.2% |
| Jan 12 | 10.4% | 6.4% |
| Jan 19 | 9.8% | 4.8% |
| Jan 26 | 12.6% | 6.9% |
| Feb 2 | 14.0% | 8.2% |
| Feb 9 | 9.6% | 6.7% |
| Feb 16 | 10.1% | 7.4% |
| Feb 23 | 10.3% | 10.1% |
| **Avg** | **10.9%** | **7.2%** |

### Weekly Approvals

| Week | BH | NBH | Total |
|---|---|---|---|
| Jan 5 | 347 | 222 | 569 |
| Jan 12 | 336 | 235 | 571 |
| Jan 19 | 295 | 207 | 502 |
| Jan 26 | 325 | 231 | 556 |
| Feb 2 | 365 | 339 | 704 |
| Feb 9 | 451 | 357 | 808 |
| Feb 16 | 515 | 394 | 909 |
| Feb 23 | 438 | 340 | 778 |

Approval volume grew ~60% from Jan to Feb (avg 550/week → avg 800/week).

### ARPU at Activation

| Week | BH | NBH |
|---|---|---|
| Jan 5 | $2,040 | $2,783 |
| Jan 12 | $1,655 | $2,649 |
| Jan 19 | $1,903 | $2,742 |
| Jan 26 | $1,896 | $2,554 |
| Feb 2 | $2,347 | $1,776 |
| Feb 9 | $2,086 | $3,229 |
| Feb 16 | $2,125 | $2,395 |
| Feb 23 | $2,020 | $1,620 |
| **Avg** | **$2,009** | **$2,469** |

### MR at Maturity / Approval

| Week | BH | NBH |
|---|---|---|
| Jan 5 | $212 | $201 |
| Jan 12 | $172 | $169 |
| Jan 19 | $187 | $132 |
| Jan 26 | $239 | $177 |
| Feb 2 | $309 | $141 |
| Feb 9 | $182 | $190 |
| Feb 16 | $201 | $138 |
| Feb 23 | $196 | $167 |
| **Avg** | **$212** | **$164** |

---

---

## Experiment Control: Full Funnel Baseline

From a recent experiment on the IUL audience. Control group used as the Q2 planning baseline. n=8,732 users.

### Control Funnel (LP → Activation)

| Stage | % of Users | Count |
|---|---|---|
| Pre-interview started | 25.8% | ~2,252 |
| How It Works screen | 20.1% | ~1,755 |
| NAP screen | 18.0% | 1,568 |
| Confirm Eligibility started | 17.5% | ~1,528 |
| Email submitted | 11.5% | 1,008 |
| Identity created | 10.4% | 911 |
| Lead | 8.9% | 781 |
| Interview started | 8.5% | 742 |
| Interview completed | 6.5% | 567 |
| Approved | 5.1% | 446 |
| Transmitted | 0.40% | 35 |
| Activated | 0.32% | 28 |

**Key rates:**
- Transmit/Approval: 7.8%
- MR/User: $5.77
- Avg MR per transmitted policy: $1,441
- IUL Lead %: 5.0% (439 users) — IUL is ~56% of all leads
- IUL Transmit/Approval: 9.3% (17 transmits from 183 IUL approvals)

**Where users drop:**
- Biggest drop: LP → Pre-interview (74% of LP users never start)
- NAP → Email: ~36% drop (only 64% who see NAP submit email)
- Approved → Transmitted: 92% drop (7.8% transmit rate)

### Control Funnel by Channel

Only meaningful channels shown (n ≥ 100, non-zero conversions). Social = 70% of traffic.

| Channel | Users | % of total | Email CVR | Lead CVR | Approved CVR | Transmit CVR | MR/User |
|---|---|---|---|---|---|---|---|
| Social | 6,085 | 69.7% | 8.2% | 6.4% | 3.4% | 0.21% | $2.62 |
| Search | 1,306 | 15.0% | 23.8% | 18.9% | 12.0% | 1.23% | $17.84 |
| Video | 924 | 10.6% | 6.2% | 4.5% | 2.3% | 0.11% | $1.03 |
| Affiliate | 272 | 3.1% | 44.9% | 34.6% | 21.0% | 1.84% | $37.52 |

**Channel takeaways:**
- Search converts at 3.5× Social (12% vs. 3.4% approval) and generates 6.8× MR/User ($17.84 vs. $2.62)
- Affiliate is the highest-quality channel — 6× Social approval rate, 14× MR/User — but tiny share of traffic (3%)
- Video performs below Social on all metrics despite similar LP-entry intent framing
- Social is 70% of volume but the most bottom-heavy channel — large absolute opportunity if pre-NAP CVR can be improved

---

## BH Funnel by Intent Path

Cumulative BH data broken down by goals answer and product routing. "NonTS" = non-Trustage (users not underwritten via the Trustage partner).

| Goals | Routing | Users | % of total | Lead CVR | Approval CVR | Transmit CVR | NonTS Transmit/Approval |
|---|---|---|---|---|---|---|---|
| Both | IUL | 13,702 | 65.3% | 57.2% | 31.7% | 2.3% | 9.8% |
| Grow | IUL | 4,236 | 20.2% | 54.4% | 30.3% | 2.9% | 12.1% |
| Protect | Term | 3,041 | 14.5% | 52.7% | 29.5% | 3.3% | 12.0% |

**Notes:**
- "Both" is by far the largest IUL segment — 65% of BH IUL users
- Lead and approval CVR are similar across all three paths (~53–57% lead, ~30–32% approval)
- "Grow" users have the highest NonTS transmit/approval rate (12.1%) among IUL paths
- Term ("protect") transmits at a slightly higher overall rate (3.3%) than IUL paths — consistent with IUL requiring an agent call to close

---

## NBH Funnel by Intent Path + Coverage Duration

NBH-only data. Unlike BH, NBH asks "both" users a **coverage duration question** (permanent / term / not sure) that determines IUL vs Term routing. "Grow" and "protect" users are not asked this question — they route directly to IUL and Term respectively.

Because these questions don't vary by time of day, this data is stable for routing analysis. NBH is the right place to understand what's working (and not) in the routing logic before applying insights to BH.

n=23,851 NBH users. Exported 2026-03-06.

| Goals | Coverage Duration | Routing | Users | % of Total | Lead CVR | Approval CVR | NonTS Approval CVR | NonTS Transmit/Approval |
|---|---|---|---|---|---|---|---|---|
| Both | Permanent | IUL | 6,928 | 29.1% | 59.5% | 33.6% | 14.8% | 7.1% |
| Both | Not Sure | Term | 4,472 | 18.8% | 47.6% | 24.9% | 9.6% | 6.5% |
| Both | Term | Term | 4,006 | 16.8% | 47.3% | 26.5% | 11.1% | 4.1% |
| Grow | — | IUL | 4,858 | 20.4% | 51.3% | 29.0% | 13.7% | 7.1% |
| Protect | — | Term | 3,587 | 15.0% | 49.3% | 26.5% | 11.1% | 7.0% |

**Notes:**
- "Both + Permanent" is the largest single segment (29%) and has the highest conversion at every stage — approval CVR 33.6%, NonTS Transmit/Approval 7.1%
- "Both + Not Sure" routes to Term but converts worse than "Both + Term" on NonTS Transmit/Approval (6.5% vs 4.1%... actually comparable); approval CVR is noticeably lower (24.9% vs 26.5%)
- "Both + Term" routes to Term but has the lowest NonTS Transmit/Approval of any segment (4.1%) — users who self-select term coverage within the "both" goal may be less motivated IUL buyers
- "Grow" routes to IUL and performs similarly to "Both + Permanent" on NonTS Transmit/Approval (7.1% each) — strong signal for IUL intent
- "Protect" routes to Term and performs on par with "Grow" on NonTS Transmit/Approval (7.0%) — term is the right fit
- The NBH NonTS Transmit/Approval rates (4–7%) are lower than BH rates (9–12%), consistent with the overall BH/NBH gap driven by connect rate

---

## Full Funnel — IUL vs Whole Life (Nov 2025–Mar 2026)

Weekly data from LP entry to activation. Measured at journey start time (not approval).

### IUL Full Funnel

| Week | Users | NAP CVR | Lead CVR | Approval CVR | Approval/Lead | Act/Approval |
|---|---|---|---|---|---|---|
| Nov 10 | 11,761 | 27.7% | 15.8% | 8.6% | 54.5% | 6.7% |
| Nov 17 | 12,059 | 27.0% | 14.3% | 7.8% | 54.4% | 7.4% |
| Nov 24 | 6,151 | 27.1% | 14.2% | 8.3% | 58.1% | 8.5% |
| Dec 1 | 8,542 | 26.3% | 13.3% | 7.6% | 56.9% | 8.5% |
| Dec 8 | 13,308 | 27.2% | 14.0% | 7.8% | 55.8% | 7.3% |
| Dec 15 | 14,352 | 23.4% | 12.2% | 6.6% | 53.9% | 6.5% |
| Dec 22 | 9,149 | 21.5% | 11.0% | 6.2% | 56.9% | 6.7% |
| Dec 29 | 16,319 | 28.0% | 15.3% | 8.6% | 56.1% | 7.5% |
| Jan 5 | 18,666 | 24.2% | 12.9% | 7.5% | 58.4% | 7.0% |
| Jan 12 | 18,881 | 25.3% | 13.5% | 7.7% | 57.3% | 6.7% |
| Jan 19 | 18,895 | 23.1% | 12.1% | 7.0% | 57.4% | 7.1% |
| Jan 26 | 17,732 | 24.6% | 13.3% | 7.3% | 54.8% | 7.4% |
| Feb 2 | 22,368 | 24.7% | 14.1% | 7.8% | 55.5% | 7.2% |
| Feb 9 | 25,226 | 30.6% | 16.6% | 8.8% | 53.0% | 7.3% |
| Feb 16 | 40,540 | 19.2% | 10.4% | 5.8% | 55.6% | 6.6% |
| Feb 23 | 43,940 | 16.1% | 8.6% | 4.8% | 55.3% | 6.1% |
| Mar 2 | 20,556 | 17.2% | 9.4% | 5.3% | 55.7% | 3.9% |

### Whole Life Full Funnel (comparison)

| Week | Users | NAP CVR | Lead CVR | Approval CVR | Approval/Lead | Act/Approval |
|---|---|---|---|---|---|---|
| Nov 10 | 2,787 | 58.5% | 27.1% | 15.2% | 56.3% | 7.1% |
| Jan 5 | 3,827 | 48.2% | 24.1% | 15.3% | 63.5% | 8.5% |
| Jan 26 | 5,004 | 47.6% | 23.7% | 13.6% | 57.6% | 9.7% |
| Feb 16 | 4,454 | 45.9% | 21.2% | 12.8% | 60.0% | 6.0% |
| Feb 23 | 3,619 | 45.9% | 22.5% | 13.6% | 60.6% | 4.5% |

---

## Weekly Results by Product Approval

Jan 5 – Feb 23. Source: Weekly Results Meeting by Product Approval, exported 2026-03-06.

### IUL

| Week | Approvals | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|---|
| Jan 5 | 582 | 8.9% | $2,269 | $203 |
| Jan 12 | 577 | 8.7% | $1,953 | $169 |
| Jan 19 | 499 | 7.8% | $2,118 | $166 |
| Jan 26 | 561 | 10.2% | $2,081 | $211 |
| Feb 2 | 681 | 11.5% | $2,157 | $234 |
| Feb 9 | 810 | 8.2% | $2,366 | $176 |
| Feb 16 | 911 | 9.1% | $2,326 | $182 |
| Feb 23 | 773 | 9.8% | $1,881 | $178 |
| **Avg** | **674** | **9.3%** | **$2,144** | **$190** |

### Prime/Choice Term

| Week | Approvals | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|---|
| Jan 5 | 398 | 8.0% | $3,940 | $307 |
| Jan 12 | 404 | 8.4% | $3,847 | $295 |
| Jan 19 | 347 | 9.5% | $3,533 | $316 |
| Jan 26 | 348 | 10.2% | $2,740 | $268 |
| Feb 2 | 434 | 8.4% | $4,704 | $394 |
| Feb 9 | 464 | 9.0% | $3,541 | $330 |
| Feb 16 | 518 | 9.4% | $3,921 | $359 |
| Feb 23 | 455 | 8.8% | $3,405 | $312 |
| **Avg** | **421** | **9.0%** | **$3,704** | **$323** |

### Trustage

| Week | Approvals | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|---|
| Jan 5 | 1,096 | 6.0% | $1,340 | $77 |
| Jan 12 | 1,186 | 6.4% | $997 | $61 |
| Jan 19 | 1,089 | 7.0% | $1,020 | $70 |
| Jan 26 | 1,114 | 7.4% | $1,093 | $78 |
| Feb 2 | 1,420 | 6.0% | $1,213 | $72 |
| Feb 9 | 1,579 | 6.3% | $1,190 | $74 |
| Feb 16 | 1,693 | 6.1% | $1,115 | $68 |
| Feb 23 | 1,575 | 6.0% | $1,129 | $64 |
| **Avg** | **1,344** | **6.4%** | **$1,137** | **$71** |

### Product Comparison Summary (avg Jan 5 – Feb 23)

| Product | Avg Approvals/wk | % of Total | Act/Approval | ARPU | MR/Approval |
|---|---|---|---|---|---|
| IUL | 674 | 27.6% | 9.3% | $2,144 | $190 |
| Prime/Choice Term | 421 | 17.3% | 9.0% | $3,704 | $323 |
| Trustage | 1,344 | 55.1% | 6.4% | $1,137 | $71 |

**Key observations:**
- Prime/Choice Term generates the highest MR/Approval ($323) — 1.7x IUL ($190) and 4.5x Trustage ($71)
- IUL and Prime/Choice Term have nearly identical act/approval rates (9.3% vs 9.0%) — the revenue gap is entirely ARPU-driven, not conversion-driven
- Trustage is 55% of all approvals but the lowest-value product by a wide margin; Trustage MR/Approval ($71) is 37% of IUL and 22% of Prime/Choice Term
- IUL approval volume is growing faster than Term: IUL went from 499 (Jan 19) to 911 (Feb 16); Prime/Choice Term from 347 to 518 over the same period

---

## Key Takeaways for Q2 Planning

**The biggest funnel drop is at the very top**
- 74% of LP visitors never start the pre-interview. That's the largest single drop in the funnel — and it's all before NAP.
- Pre-interview conversion (LP → NAP) is the biggest relative gap to close at scale.

**NAP → Email has a meaningful drop**
- ~36% of users who see the NAP screen don't submit their email. Almost 1 in 3 users exits after seeing the product recommendation.
- This is an underexplored optimization surface in the pre-interview.

**Connect rate is the primary post-approval revenue lever**
- BH connect rate (~38%) consistently outperforms NBH (~31%). The 7pp gap drives most of the BH vs. NBH revenue difference.
- BH converts at ~11% approval-to-activation vs. NBH ~7%. Closing the NBH connect rate gap would compound on a rapidly growing approval base.

**Volume is scaling fast — and funnel CVR is under pressure**
- IUL weekly users grew from ~12k (Nov) to ~44k (Feb 23) — nearly 4x in 4 months.
- As volume scaled, NAP CVR dropped sharply: ~27% in Nov → ~16% in late Feb. Lead and approval CVR followed.
- Approval/Lead ratio (~55%) has stayed stable — the drop is happening pre-NAP, not in the interview.

**IUL vs. Whole Life funnel gap is significant**
- WL NAP CVR is ~46–59% vs. IUL ~16–27%. WL lead CVR ~22–27% vs. IUL ~9–17%.
- Approval/Lead is similar (~60% WL vs. ~56% IUL) — once users reach the interview, they convert at comparable rates.
- The gap is almost entirely pre-NAP. IUL intent questions and product framing are filtering harder than WL.

**Channel quality varies dramatically**
- Search converts at 3.5× Social (12% vs. 3.4% approval) and generates 6.8× MR/User ($17.84 vs. $2.62).
- Affiliate is the highest-quality channel — 6× Social approval rate, 14× MR/User — but only 3% of traffic.
- Video performs below Social on all metrics despite similar volume.
- Social is 70% of volume but the weakest-converting channel — pre-NAP improvements compound most here.

**"Both" is the dominant IUL segment**
- 65% of BH IUL users selected "Both" as their goal. "Grow" is 20%. Both paths have similar lead and approval CVRs.
- "Grow" users have a slightly higher NonTS transmit/approval rate (12.1% vs. 9.8%) — more motivated buyers.

**NBH ARPU is paradoxically higher ($2,469 vs. $2,009)**
- NBH users who do connect and activate buy larger policies — likely a selection effect.
- But MR/Approval is much lower NBH ($164 vs. $212) because connect rate kills the volume. ARPU advantage doesn't offset it.
