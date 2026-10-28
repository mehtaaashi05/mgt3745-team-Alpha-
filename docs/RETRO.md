# 1. The RAT verdict

Assumption (Module 5): People will add moments during a trip, not after it. It was the riskiest because search, attribution, and sharing all depend on a record existing during the trip [EVALS.md](../context/EVALS.md).

Test we ran with real users: On 2026-10-20, Rishika Sikhakolli ran three interviews of about twelve minutes each, one person per interview, about each persons most recent trip, with their camera roll and group chat open. We asked about past behavior, not intention. The people were a full-time employee, an intern, and a student, on trips of 2 to 6 people. All three were prior interviewees from earlier project research, so they are not an independent sample, and nobody used the deployed build. Evidence: the RAT Results table in [EVALS.md](../context/EVALS.md) and [VALIDATION.md](../docs/VALIDATION.md).

Result:
Photos taken during the trip -  3 of 3 
Posted to the group chat during the trip - 2 of 3
Notes or captions written during the trip - 1 of 3 (the other 2 wrote them after)
Looked for something from the trip later - 2 of 3 (one searched by a word, one asked a person)
Verdict: confirmed for photos, refuted for notes, and untested for the product as built. Confirmed for photos. The record that exists during a trip is photos. Refuted for notes. This matches the failure condition we wrote in Phase 1: people take photos during trips but write anything down only afterward. Only one of three wrote text during the trip. Untested for the app. Our Phase 1 plan also named timestamps in Phase 2 that cluster after a trips end date. We did not run that test. The 7 moments in our test trip were created by teammates exercising the form, not by a group on a trip, so their timestamps say nothing about real behavior. A real test needed one real group using the build on one real trip, roughly a weekend plus a few hours to recruit and follow up with three or more people.

Where our own data disagreed. All 7 moments in the test trip carried a note, which the interviews say is the field people skip. We trust the interviews over the test trip, because teammates exercising a form are not travelers. [EVALS.md](../context/EVALS.md) reads the interviews as making search by place, date, or member more important than search by a word. This retrospective does not, because the only person who searched used a word. The sample is too small to rank the search paths.

What it changed: Nothing in the spec. F3-1 already allowed a moment with any one of photo, note, or place, so the interviews confirmed that rule instead of changing it. A change to F5-1 was proposed in [VALIDATION.md](../docs/VALIDATION.md) and never opened as a pull request, because three prior interviewees were too few to justify cutting or ranking word search. That is a check that changed nothing, and it is a finding about the check: the interviews were cheap and honest, but too small and too friendly to move a decision.

Limits: Three prior interviewees, one interviewer, one day, no use of the app. They ran inside the [DACI-001](../docs/DACI-001) trigger date of October 22 but after the Phase 2 briefs October 15 date for confirming users. No count here should be read as a rate.

# Spec Findings
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


What the findings say. Most spec changes came before any code did: [PROBE-001.md](docs/PROBLE-001.md) changed or added eight rows in Phase 1 by showing six places where a tool had to guess. Phase 2 review changed fewer rows and mostly tightened wording. The Phase 3 changes record that features were not built, rather than changing what they should do. No real-user finding changed an EARS row, which is consistent with the RAT verdict above.
