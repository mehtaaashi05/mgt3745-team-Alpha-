# Individual Retrospective — Semaj Johnson II

## My Role in Each Phase

**Phase 1, Reviewer.** Accountable for [DACI-001](../DACI-001.md), the Opportunity Solution Tree and the RAT in [EVALS.md](../../context/EVALS.md), the Prediction Stakes file, [README.md](../../README.md), and pull request reviews. I drafted the working agreement's quiet-member escalation clause and kept the Meeting Log for Sessions 1 and 2.

**Phase 2, Specifier.** Accountable for [context/FEATURES.md](../../context/FEATURES.md) and [docs/VALIDATION.md](../VALIDATION.md). Merged pull requests: #79, rotating the RACI matrix to Phase 2 and bringing the dates forward, and #80, VALIDATION.md.

**Phase 3, Architect.** Accountable for the final state of [context/ARCHITECTURE.md](../../context/ARCHITECTURE.md) and for [docs/DEPLOY.md](../DEPLOY.md). I wrote ADR-002.

## One Decision I Would Make Differently

As Phase 2 Specifier I was Accountable for how the user validation ran, and I let all three sessions be conversations about past trips. Nobody touched the deployed app. I would require one session where a person outside the team used the live build.

The evidence is that two of our own measurements answered the same question in opposite directions. The RAT found 1 of 3 people wrote notes during a trip. The test trip that Rishika's Prediction Stake was resolved against carried a note on 7 of 7 moments. Both numbers are in EVALS.md, a few hundred words apart. The second one is not a finding about users — it is a finding about four teammates filling in a form in one sitting, which is what VALIDATION.md says about it. Every stake resolution in that file rests on that one trip.

Fixing it would have cost one person and about fifteen minutes. Not fixing it shows up in ADR-002, where "1280 pixels is untested with members" sits as a consequence of a decision we did measure, left unverified because no member was ever in front of the thing we built.

## The Artifact I Am Proudest Of

[docs/VALIDATION.md](../VALIDATION.md), and specifically that it argues against itself. It states three limitations in writing: I was not present for any session, the sessions ran five days past the date our own brief set, and nobody used the build. It also records the finding that undercuts our test data rather than burying it.

That artifact and the decision above are the same file, which I think is the honest shape of this. I am proud of the record and not of the research design it records. A validation document that reported only the good news would have been faster to write and worth much less to whoever reads EVALS.md next.

## My Delegation Record

| Tool | What I used it for | How I verified it |
|---|---|---|
| Claude | Phase 1: critique of EVALS.md and README, Consulted only. Phase 2: drafted VALIDATION.md ([DDR-005](../DDR-005.md)). Phase 3: drafted the ARCHITECTURE.md additions and DEPLOY.md ([DDR-006](../DDR-006.md)). | Checked every claim against the file it named rather than against whether it read well. It described all three validation participants as prior interviewees; Rishika's HW2 research was two interviews, so at most two could be, and I corrected it before merge. In Phase 3 it reported that TEAM.md had not been rotated — it had read a stale branch, and `main` was already rotated. I checked `main` before redoing finished work. |
| bolt.new | Phase 1 specification probe ([DDR-001](../DDR-001.md)), and one of the two builders in my HW5 and HW6. | Compared generated output against FEATURES.md row by row; the probe's six guesses became [PROBE-001](../PROBE-001.md). In HW6 I wrote one shared test and ran it against both builders' invite-code generators instead of trusting either build's own description of itself. |
| Google AI Studio (Gemini 3.8) | HW6: the second builder, and the second grader on my judgment eval. | It returned 24 of 24 agreement with me, which I did not accept at face value. I audited its evidence and found it cited a test file that was never in the packet I sent, and one citation pointed at a screenshot showing the opposite of the claim it supported. Both are recorded in my HW6 JUDGMENT.md, and it is why Gemini grading a Gemini build is named as a conflict in that repository's DDRs rather than left implicit. |

**The pattern worth carrying forward.** The failure mode was never a tool inventing something obviously wrong. It was a tool restating something true about a *different* artifact. The findings Claude carried into my HW6 comparison — unused dependencies, no `innerHTML`, invented colors — were all true of my HW5 builds and false of the HW6 ones, and I only caught them by reopening the actual build archives. The same shape appeared twice more: a stale branch read as current, and a participant count carried over from a different study. Verification has to be against the specific artifact in front of you, not against whether the sentence sounds like something that was true once.
