# Individual Retrospective: Rishika Sikhakolli

## My role in each phase

**Phase 1, Specifier.** The team built my HW1 travel-photo problem, reframed as a shared group-trip record. I was Accountable for [PROJECT.md](../../context/PROJECT.md), [USERS.md](../../context/USERS.md), and [FEATURES.md](../../context/FEATURES.md), and for the bolt.new specification probe ([PROBE-001](../PROBE-001.md). I turned each assumption bolt.new made into an EARS row or an exclusion, which is where the rows marked (probe) come from. I also approved ADR-001 and committed my Prediction Stake in [EVALS.md](../../context/EVALS.md).

**Phase 2, Reviewer/Evaluator.** I wrote the four code evals in [evals/worker.test.js](../../evals/worker.test.js), which passed 4 of 4 against the deployed Worker. I ran the judgment eval in [JUDGEMENT.md](../JUDGEMENT.md) with a second grader (10 of 10, 100% agreement), ran the three RAT interviews, and resolved every member's Prediction Stake in EVALS.md. In addition, as reviewer, I reviewed the team's PRs. From my HW6 comparison, I opened [issue #76](https://github.com/mehtaaashi05/mgt3745-team-Alpha-/issues/76), which led to the F3 changes merged in PR #89. I also kept the Meeting Log for Sessions 3 and 4.

**Phase 3, Implementer.** I redeployed the build from my own Cloudflare account to https://alpha-trips.travlr.workers.dev, updated [README.md](../../README.md) to pass the stranger test, recorded the Phase 3 rotation in [TEAM.md](../../TEAM.md) and [CODEOWNERS](../../.github/CODEOWNERS), and produced the recording.

## One decision I would make differently

As Phase 1 Specifier, I wrote F2 without a start or end date for a trip. The RAT in EVALS.md says it would be shown false in Phase 2 by "moments whose timestamps cluster after a trip's end date," but the schema in [ARCHITECTURE.md](../../context/ARCHITECTURE.md) notes that trips have no end date, so that build signal could never be measured. Without it, the RAT verdict rests only on interviews, which came back mixed. 3 of 3 people took photos during the trip, but only 1 of 3 wrote notes during it. Meanwhile, 7 of 7 moments in our test session had a note, but the testers added them after their trip (a friend group's trip to Virginia) rather than during it. If I had added one EARS row asking for trip dates in F2, the team could have compared each moment's timestamp to its trip's dates and given the riskiest assumption a measured answer instead of an interview-based one.

## The artifact I am proudest of

[evals/worker.test.js](../../evals/worker.test.js). My first draft of the code evals was written before the Worker existed and guessed the routes wrong, so I rewrote it against the real `src/worker.js` in the simple one-test-per-row style from HW6. Each test names its EARS row (F1-2, F2-2, F3-3, F4-2) and checks one refusal. I am proudest of it because it is evidence that the build it passed 4 of 4 on the Phase 2 deployment and again on my Phase 3 deployment. Also, when the F4-2 rule was broken on purpose in a local copy, that test failed, which shows the tests catch real bugs.

## My delegation record

| Phase | Tool | What I used it for | How I verified it |
|---|---|---|---|
| 1 | bolt.new | The specification probe: one prompt from FEATURES.md, to find what the spec left unsaid ([DDR-001](../DDR-001.md)) | Semaj and I compared each screen against FEATURES.md and turned every guess into an EARS row or exclusion |
| 1 | Claude | Critique of my drafts of PROJECT.md, USERS.md, and FEATURES.md (Consulted only) | I rewrote every section myself and kept only suggestions I could trace to a user profile or the probe |
| 2 | Claude | Drafting the code evals, the judgment eval questions, the format of the RAT and stake results, and my review comments ([DDR-004](../DDR-004.md)) | Ran the code evals myself against the deployed Worker (4 of 4); a second grader answered the judgment eval separately (100% agreement); every number in EVALS.md came from my own interviews and test session; I read each pull request before posting a review |
| 3 | Claude | Drafting README edits, the deployment steps, and this retrospective ([DDR-LOG.md](../DDR-LOG.md)) | Ran the deployment and the code evals myself on my live URL, and rewrote much of this file after thorough review |
