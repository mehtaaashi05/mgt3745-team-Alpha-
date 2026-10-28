# Individual Retrospective: Giancarlo Martinez-Saldana

## My Role in Each Phase

- **Phase 1, Architect.** I scored the problem options in DACI-001 (PR #38), wrote the Gate, ADR-001, and the architecture diagram in [ARCHITECTURE.md](../../context/ARCHITECTURE.md) (PRs #54 and #57), committed my Prediction Stake (PR #46), and fixed my handle in TEAM.md (PR #44). The first ARCHITECTURE.md was drafted by Aashi before I took it over.
- **Phase 2, Implementer.** I built and deployed the app from my Cloudflare account (PR #66), recorded the delegation in [DDR-003](../DDR-003.md) (PRs #66 and #90), took over the Cloudflare row in TOOLS.md (PR #65), updated CODEOWNERS for the new roles (PR #64), merged all four members' HW5 STYLE.md and SKILLS.md (PR #81), wrote the README's See It Work and Status sections (PRs #83, #87, #88), and turned my HW6 findings into F3 changes in FEATURES.md (PR #89) and issue #92. I reviewed PRs #61, #69, #72, #75, #84, #85, #86, and #91.
- **Phase 3, Reviewer and Evaluator.** I pruned the Context Scaffold, closed out [EVALS.md](../../context/EVALS.md) with the error-analysis log it had planned since Phase 1, wrote the Evals Against Plan, Stakes Resolved, and Delegation Against Plan sections of [RETRO.md](../RETRO.md), and started [DDR-LOG.md](../DDR-LOG.md).

## One Decision I Would Make Differently

**I would have tested my own Prediction Stake before building around it.** I predicted in Phase 1 that full-size phone photos would not fit in D1. Then, as Phase 2 Implementer, I shipped a build that shrinks every photo in the browser before upload (`shrinkPhoto` in `public/app.js`). The stake resolved as "correct," but only because my design avoided the case it predicted; we never uploaded a full-size photo straight to D1, so we still do not know where it breaks. The evidence is in the stake's own result in EVALS.md. The better order was one throwaway test, three full-size photos sent to the Worker without resizing, and then the design decision with a measurement behind it. If the test had shown D1 could hold them, we could have kept full-resolution photos; if not, ADR-002 (Semaj's record of the shrink decision, PR #103) would have had a measured limit to cite instead of a chosen one.

## The Artifact I Am Proudest Of

[DDR-003](../DDR-003.md). It records the largest delegation in the project honestly: a verification table with every Must-be EARS row, the bug found in review, a real F3-2 failure test on the deployed site after a first attempt with DevTools did not work (recorded rather than hidden), and a trace back to my HW6 comparison explaining why we did not use the builder HW6 recommended.

## My Delegation Record

| Phase | Tool | What I used it for | How I verified it |
|---|---|---|---|
| 1 | Claude | Drafted my DACI scoring table, the Gate scores, ADR-001 and the diagram, my stake wording, and PR review comments | I chose every score and the prediction myself, and recalculated every weighted total. I did not write a DDR for this, which CLAUDE.md required; it is listed in DDR-LOG.md under "Delegations Without a DDR." |
| HW6 | bolt.new, Google AI Studio | Each built F3 from the same prompt | Shared code eval, code reading, and screenshots ([my HW6 repo](https://github.com/GiancarloMartinez-Saldana/mgt3745-hw6)) |
| HW6 | Claude Code | Prompt, evals, comparison drafts | I reviewed every file and approved the weights before scoring |
| HW6 | ChatGPT | Second judgment grader | Its answers are recorded with the prompt it received; 10 of 10 agreement |
| 2 | Claude (Cowork) | The Worker, D1 schema and seed, pages, STYLE.md and SKILLS.md merge, and README sections | Ran every EARS row locally and on the live site (DDR-003); Rishika's code evals and an outside grader checked the build independently |
| 3 | Claude (Cowork) | Context review, EVALS.md close-out, my RETRO.md sections, DDR-LOG.md, and a draft of this page | I checked every claim against its source using the Claim Check in RETRO.md ([DDR-007](../DDR-007.md)) |

What I learned about delegating: the drafts were rarely wrong on facts I gave them, but twice they claimed more than had been verified (a Pass row written before I ran the test, and a test that turned out not to block the request). Both times the fix was the same: run it myself, then write down what actually happened.
