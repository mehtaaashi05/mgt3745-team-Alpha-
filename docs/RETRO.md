# RETRO.md: Learn-Loop Retrospective

The third step of Build-Measure-Learn for the Alpha group trip app: what the evals confirmed, what they refuted, and what we would build differently. Sections follow the order the Phase 3 assignment sets. Each section names its owner; every claim links to the file or pull request it comes from.

## 1. The RAT Verdict

*Owner: Aashi Mehta, Final Specifier.*

Assumption (Module 5): People will add moments during a trip, not after it. It was the riskiest because search, attribution, and sharing all depend on a record existing during the trip [EVALS.md](../context/EVALS.md).

Test we ran with real users: On 2026-10-20, Rishika Sikhakolli ran three interviews of about twelve minutes each, one person per interview, about each persons most recent trip, with their camera roll and group chat open. We asked about past behavior, not intention. The people were a full-time employee, an intern, and a student, on trips of 2 to 6 people. All three were prior interviewees from earlier project research, so they are not an independent sample, and nobody used the deployed build. Evidence: the RAT Results table in [EVALS.md](../context/EVALS.md) and [VALIDATION.md](VALIDATION.md).

Result:
Photos taken during the trip -  3 of 3 
Posted to the group chat during the trip - 2 of 3
Notes or captions written during the trip - 1 of 3 (the other 2 wrote them after)
Looked for something from the trip later - 2 of 3 (one searched by a word, one asked a person)
Verdict: confirmed for photos, refuted for notes, and untested for the product as built. Confirmed for photos. The record that exists during a trip is photos. Refuted for notes. This matches the failure condition we wrote in Phase 1: people take photos during trips but write anything down only afterward. Only one of three wrote text during the trip. Untested for the app. Our Phase 1 plan also named timestamps in Phase 2 that cluster after a trips end date. We did not run that test. The 7 moments in our test trip were created by teammates exercising the form, not by a group on a trip, so their timestamps say nothing about real behavior. A real test needed one real group using the build on one real trip, roughly a weekend plus a few hours to recruit and follow up with three or more people.

Where our own data disagreed. All 7 moments in the test trip carried a note, which the interviews say is the field people skip. We trust the interviews over the test trip, because teammates exercising a form are not travelers. [EVALS.md](../context/EVALS.md) reads the interviews as making search by place, date, or member more important than search by a word. This retrospective does not, because the only person who searched used a word. The sample is too small to rank the search paths.

What it changed: Nothing in the spec. F3-1 already allowed a moment with any one of photo, note, or place, so the interviews confirmed that rule instead of changing it. A change to F5-1 was proposed in [VALIDATION.md](VALIDATION.md) and never opened as a pull request, because three prior interviewees were too few to justify cutting or ranking word search. That is a check that changed nothing, and it is a finding about the check: the interviews were cheap and honest, but too small and too friendly to move a decision.

Limits: Three prior interviewees, one interviewer, one day, no use of the app. They ran inside the [DACI-001](DACI-001.md) trigger date of October 22 but after the Phase 2 briefs October 15 date for confirming users. No count here should be read as a rate.

## 2. Evals Against Plan

*Owner: Giancarlo Martinez-Saldana, Final Reviewer and Evaluator.*

Every check [EVALS.md](../context/EVALS.md) planned, plus the two checks the project ran that EVALS.md did not plan (the bolt.new probe and the HW6 builder runs), because both turned out to drive more change than the planned ones.

| Check | Planned? | Ran? | Result | Did it change anything the team did? |
|---|---|---|---|---|
| Code evals F1-2, F2-2, F3-3, F4-2 (`evals/worker.test.js`) | Yes | Yes, 2026-10-21, deployed Worker | 4 of 4 pass; deliberately breaking F4-2 made its test fail (DDR-004) | **No.** They passed on the first run against the deployed build, so they confirmed the build rather than changing it. Their value was the README status and the proof, through the deliberate break, that they can fail. |
| Judgment eval, ten questions, two graders ([JUDGEMENT.md](JUDGEMENT.md)) | Yes | Yes, 2026-10-20 | 10 of 10 Yes from both graders, 100% agreement | **No.** Every answer was Yes, so the rubric never separated a working row from a weak one. Two planned questions were dropped (search terms kept on an empty result, because F5 was not built; and a private trip invisible to non-members), and no question covered F3-2. A rubric that cannot produce a No is a finding about the rubric. |
| Error-analysis log | Yes | Partly in Phase 2 (tests and judgment only, "no failures"); completed in Phase 3 | 25 failures, led by silent specs (11) and documents drifting from code (6) | **Not during the build**, because it did not exist yet. Written in Phase 3, it is the clearest record of where the project's failures came from. |
| RAT test, three interviews | Yes | Yes, 2026-10-20 | Mixed: photos during the trip 3 of 3; notes written during the trip 1 of 3 | **On paper.** It supported keeping the note optional (F3-1) and ranking search by place, date, and member above search by note (F5-1), as recorded in VALIDATION.md. F5 was not built, so the second change never reached the product. |
| Prediction Stakes (four members) | Yes | All resolved 2026-10-21 | See section 3 | **One did.** Giancarlo's photo stake shaped the build before it was tested: the Phase 2 code shrinks every photo in the browser, so the stake was settled by design rather than by measurement. |
| bolt.new specification probe ([PROBE-001](PROBE-001.md)) | Not in EVALS.md (Phase 1, DDR-001) | Yes, 2026-10-07 | 6 assumptions, 5 of them spec gaps | **Yes.** Each gap became an EARS row or an exclusion in FEATURES.md. |
| HW6 builder comparisons (issues #59, #76, #92) | Not in EVALS.md | Yes, 2026-10-15 to 2026-10-21 | 3 F2 gaps and 3 F3 gaps | **Partly.** The F3 changes merged to `main` in PR #89. The F2 changes in PR #68 merged into the side branch `review/f2-spec-gaps`, so `main` never received them, although issue #59 has since been closed. |

**What this table says.** The checks the team planned in Phase 1 all ran and all passed, and none of them changed what the team built. The checks the team did not plan, giving the spec to a builder and watching it guess, changed the spec every time. Our planned evals measured whether the build matched the spec; nothing we planned measured whether the spec was complete, and that is where most of the failures were.

## 3. Stakes Resolved

*Owner: Giancarlo Martinez-Saldana, Final Reviewer and Evaluator.* All four stakes were committed in Phase 1 (2026-10-07 and 2026-10-08), before any Phase 2 code; no new stakes were added in Phase 2. Each is copied unchanged from [EVALS.md](../context/EVALS.md), with its resolution beneath.

#### Semaj Johnson II, Reviewer — committed 2026-10-07

**Prediction:** Fewer than half of the moments created during Phase 2 testing will carry all three of photo, note, and place. F3-1 allows any one of the three, and I expect people to use that permission constantly rather than occasionally.

**How we will check:** Count every moment created across all test trips and sort by how many of the three fields it has. If half or more carry all three, this prediction is wrong.

**Confidence:** 75%

**Why:** F3 exists because capture has to be fast enough to beat the group chat. Anything that makes a moment take longer gets skipped in the moment it was meant to capture. If this is right, F4-1 and F5-1 both need to read well against mostly-partial records, and the trip view cannot assume a note is there.

**How we will check:** Watch three people open a multi-member test trip without instruction and note what they say first.

***Result (2026-10-21):** Correct. 3 of 7 moments in the test trip carried all three of photo, note, and place, below the half his prediction named. The sample is one trip with 4 accounts, so the margin is thin.*

#### Rishika Sikhakolli, Specifier — committed 2026-10-08

**Prediction:** People might have things they want to add to the trip feeds that don't have all three criteria (photo, review, location name). F3-1 makes the note optional, members will mostly post a photo and a place, so searching by a word from the note (F5-1) will find fewer moments than searching by place, date, or member.

**How we will check:** During user testing, count what is added across all test trips. If the majority f them include a note, this prediction is wrong.

**Confidence:** 60%

**Why:** Profile 1 shares quickly and has little patience for writing, and the probe showed that requiring all three fields was a guess, so F3-1 now lets people skip the note. Profile 2 wants to say more than a caption, which is why I am not more confident. If this is right, F5 should treat place, date, and member as the main ways to search.

***Result (2026-10-21):** Wrong. 7 of 7 moments in the test trip included a note, the opposite of the prediction: people skipped the photo or place, not the note. Searching by a word from the note (F5-1) would have found every moment.*

#### Aashi Mehta, Implementer — committed 2026-10-08

**Tight:** F4 will not be tested properly because we will only have a few dummy accounts created to test the features. In order to test the feature, we need to multiple accounts who are all part of various trips. 

***Result (2026-10-21):** F4 was tested with 4 real accounts in one shared trip, and all three F4 judgment questions (Q8–Q10) passed with both graders, including deleting someone else's moment, which was refused.*

**Loose:** F3 will be used a lot during Phase 2, because we will be conducting tests to see that our features work properly and know how to deal with errors. 

***Result (2026-10-21):** F3 was the most-used feature in testing: 7 moments were added to the test trip, but that is a small sample from one trip.*

**Open:** Likes and comments are allow when trips are shared publicly, but if the creator doesn’t want to share them publicly, can the trip participants still comment?

***Result (2026-10-21):** Not answerable in Phase 2. Likes and comments (F8) were not built, so whether trip members can comment on an unshared trip is still open. A tester did in fact voice a desire for comment/like ability.*

#### Giancarlo (Architect), committed 2026-10-08

**Prediction:** Storing trip photos directly in D1 will not work at real phone-photo sizes. Before F3 (Add a moment) passes with photos taken on a phone, the team will need a separate file store (such as Cloudflare R2) or will have to shrink photos in the browser before upload.

**How we will check:** During Phase 2, three members each add one full-size phone photo to a test trip. If all three save and display through Workers and D1 alone, with no added service or resizing step, this prediction is wrong.

**Confidence:** 70%

**Why:** D1 is built for rows of text and numbers, not large files, and phone photos are often several megabytes. ADR-001 names only Workers and D1, so if this is right, ADR-001 will need a revision in Phase 2.

***Result (2026-10-21):** Correct. 3 of 3 phone photos saved and displayed on Workers and D1 with no added storage service, but only because the build shrinks every photo in the browser before upload (`shrinkPhoto` in `public/app.js`, capped at 700,000 characters by the Worker).*

### Where Our Predictions Were Systematically Off

Three patterns, in order of how much they affected the results. First, **every stake was resolved against one test trip of 7 moments filled in by teammates**, the sample Aashi's Tight stake warned about. Semaj's stake (fewer than half of moments carry all three fields) came out correct, and Rishika's (members will skip the note) came out wrong, but the three real users in the RAT interviews said the opposite of our test trip: they skip notes. On the better evidence, Rishika's direction was right and the test trip was wrong. Second, **we predicted user behavior and then measured our own behavior**; no stake was resolved with a real user using the deployed app. Third, **the only purely technical stake was not tested independently**: Giancarlo predicted full-size photos would fail on Workers and D1, and the build he wrote resizes every photo before upload, so "correct" means the prediction shaped the design, not that a measurement confirmed it.

## 4. Delegation Against Plan

*Owner: Giancarlo Martinez-Saldana, Final Reviewer.* Sources: the Phase 1 and Phase 2 RACI matrices in [TEAM.md](../TEAM.md), [DACI-001](DACI-001.md), and [DDR-LOG.md](DDR-LOG.md).

### Planned Versus What Happened

| Artifact or decision | Plan (Phase 1 or 2 RACI) | What happened | Human Accountable |
|---|---|---|---|
| bolt.new probe | AI R, Rishika A | As planned (DDR-001) | Rishika |
| STANDARDS.md | AI C | Copilot drafted the merge, so AI was R (DDR-002) | Aashi |
| ARCHITECTURE.md (Gate, ADR-001, diagram) | AI C | Claude drafted the scores, ADR, and diagram, so AI was R. No DDR was written (see DDR-LOG, "Delegations Without a DDR"). | Giancarlo (Phase 1) |
| DACI-001 | No AI ("–") | Claude drafted one member's private scoring table; the scores were his. The Decision, Dissent, and reopen trigger were written by the Driver. No DDR. | Semaj (Driver), Rishika (Approver) |
| Worker, D1 schema and seed, pages | AI R for code, C for schema (Phase 2) | Claude drafted all of it (DDR-003) | Giancarlo |
| STYLE.md and SKILLS.md | AI C (Phase 2) | Claude drafted the merge from four HW5 files, so AI was R; PR #81 points to DDR-003, which does not list it | Giancarlo |
| Code evals and judgment eval | AI C for evals, R for JUDGEMENT.md (Phase 2) | Claude drafted both (DDR-004) | Rishika |
| VALIDATION.md | No AI (Phase 2) | Claude drafted it from the RAT table (DDR-005) | Semaj |
| README.md | No AI (Phase 2) | Claude drafted the See It Work, Status, and AI Use sections (PRs #83, #87, #88) | Giancarlo |
| DACI decision, every Approver, every merge | Human only (CLAUDE.md) | Held. No AI approved, merged, or was named Accountable anywhere. | Each named owner |

### What Changed and Why

The plan put AI mostly in the Consulted column; in practice AI was Responsible for a first draft of almost every artifact after Phase 1. The plan changed because the Phase 2 workload (a deployed build plus evals in two weeks) made drafting the cheapest place to save time, and CLAUDE.md was updated in PR #65 to allow it. What held throughout was Accountability: every row has one named person, and no AI tool approved or merged anything. What did not hold was the DDR rule: at least four delegations have no DDR of their own, all of them in Phase 1 or in pieces folded into a larger DDR.

One risk the plan did not foresee: **the same tool drafted the build (DDR-003) and the evals that graded it (DDR-004).** Three human checks offset it: Rishika broke F4-2 on purpose to prove the code evals can fail, an outside second grader answered the judgment questions independently, and Giancarlo ran a real F3-2 failure on the deployed site by hand.

### Net Hours Delegated

Summed from [DDR-LOG.md](DDR-LOG.md): about **30.0 hours** of work estimated by hand, done in about **10.0 hours** with delegation, a net saving of about **20.0 hours** across seven DDRs. DDR-003 (the build) alone accounts for 7.0 of those hours. The delegations without a DDR are not counted, so the true figure is higher, and every number is the DDR author's own estimate, not a measurement.

## 5. What We Would Build Differently

*Owner: the whole team.* Three decisions, each tied to a measurement. Drafted by Giancarlo from the evidence above; the team edits or replaces them.

1. **Probe every Must-be feature with a builder before building it.** Measurement: silent specs caused 11 of 25 failures in the error-analysis log, and every one was found by a builder guessing, not by the team reading the spec. The probe and HW6 covered only parts of F2 and F3.
2. **Resolve stakes and test features with real users on the deployed app, not with a teammate test trip.** Measurement: the test trip had a note on 7 of 7 moments, while the RAT interviews found only 1 of 3 people writing notes during a trip. Two stakes were resolved on the weaker evidence.
3. **Write judgment questions that can fail, and cover every EARS row, including failure paths.** Measurement: 10 of 10 questions came back Yes from both graders, and none covered F3-2, the one row whose only checks were a simulated failure and a hand test.

## 6. Spec Findings

*Owner: Aashi Mehta, Final Specifier.*

Every change to [FEATURES.md](../context/FEATURES.md) that the project forced, in the order it happened. "Forced by" names the evidence, and "PR" is the pull request that made the change.

| Row	| Change | Forced by | PR |
|---|---|---|---|
| F1-1 |	Now requires an email as well as a username and password | PROBE-001, guess 1: bolt assumed email at sign-up | [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) |
| F3-1 | Partial moments allowed: any one of photo, note, or place | PROBE-001, guess 3 | [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865)  |
| F3-3 (new) | Refuse a moment with nothing in it | PROBE-001, guess 3 | [#89](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/89) |
| F4-1 | Shows "whichever of photo, note, and place it has" | PROBE-001, guess 3 | [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) |
| F7-1, F7-3 (new) | Main feed shows all shared trips; followed people in a separate section | PROBE-001, guess 2 | [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) | 
| F6-3 (new) | A creator can unshare a trip | PROBE-001, guess 5 |  [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) |
| F2-3 (new) | One reusable invite link per trip | PROBE-001, guess 6 |  [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) |
| X6 | Trip cover photos and descriptions excluded | PROBE-001, guess 4 |  [#34](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/commit/b6097752303cbdb7e46e935f769b9e95fcd58865) |
| F3-1 | "Signed-in member" and "account name (F1)" | Phase 2 review (HW6) - Changed occurred because bolt.new added its own required name field and AI Studio invented two members |  [#89](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/89) |
| F3-2 | "review" corrected to "moment", "location" to "place" | Phase 2 review (HW6) - wording changed to match F3-1 and F3-3|  [#89](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/89) |
| F3-3 | Whitespace-only notes and places count as empty | Phase 2 review (HW6) - Both builders assumed this, but the row never said it. |  [#89](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/89) |
| X7 (new) | F3 has no name field or sample data | Phase 2 review (HW6) - to match F3 | [#89](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/89) |
| Build Status (new section) | Records which features are built and what verified them | Phase 3 reconciliation: F5 to F8 were not built and the file did not say so |	[#97](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/pull/97) |


What the findings say. Most spec changes came before any code did: [PROBE-001.md](PROBE-001.md) changed or added eight rows in Phase 1 by showing six places where a tool had to guess. Phase 2 review changed fewer rows and mostly tightened wording. The Phase 3 changes record that features were not built, rather than changing what they should do. No real-user finding changed an EARS row, which is consistent with the RAT verdict above.

## Claim Check (Evaluator)

The Phase 3 assignment says an assistant that helped build a feature is never its only grader, and Claude drafted sections 2 to 5 (DDR-007). Giancarlo checked each claim below against its source himself.

| Claim | Source | Checked by Giancarlo (type Yes after checking) |
|---|---|---|
| Code evals 4 of 4 pass on 2026-10-21; F4-2 deliberately broken failed | DDR-004, Verification  | Yes |
| Judgment eval 10 of 10 Yes, 100% agreement, no F3-2 question | JUDGEMENT.md  | Yes |
| RAT: photos during 3 of 3, notes during 1 of 3 | EVALS.md, RAT Results  | Yes |
| Test trip: 7 of 7 moments had a note; 3 of 7 had all three fields | EVALS.md, Rishika's and Semaj's results  | Yes |
| PR #68 merged into `review/f2-spec-gaps`, not `main` | PR #68 base branch; FEATURES.md on `main` has no F2 change from it  | Yes |
| Error-analysis log totals 25 failures, 11 from silent specs | EVALS.md, Error-Analysis Log  | Yes |
| Net hours: 30.0 by hand, 10.0 actual, 20.0 saved | DDR-LOG.md, each DDR's Economic Rationale  | Yes |
| No AI approved or merged a PR | PR merge and review history  | Yes |
