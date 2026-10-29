# CONTRIBUTIONS.md

The RACI matrices in [TEAM.md](../TEAM.md) say who was **Accountable** for each artifact in each phase. This file is their receipt: what that person actually shipped, as merged pull requests, which pieces were delegated to an AI tool, and the reviews they gave.

One table per phase, in the same order as the matrices. "Accountable for" lists only the rows where that member held the A, not the rows they were R, C, or I on, which is most of them. Delegated pieces are indexed with hours in [DDR-LOG.md](DDR-LOG.md).

Prepared by Semaj Johnson II, Phase 3 Architect, for the Phase 3 walkthrough. Verified against the merged pull request list on 2026-10-28.

## Phase 1: Decide

| Member (role) | Accountable for, per the Phase 1 RACI | Shipped | Delegated |
|---|---|---|---|
| **Rishika Sikhakolli** (Specifier) | PROJECT.md, USERS.md, FEATURES.md, PROBE-001 and DDR-001 | PROJECT.md (#11, #19), USERS.md (#20), FEATURES.md revised after the probe (#27, #34), PROBE-001 (#26, #35) | **DDR-001**: bolt.new specification probe against FEATURES.md. Six places the tool had to guess became PROBE-001. |
| **Giancarlo Martinez-Saldana** (Architect) | ARCHITECTURE.md | The Gate, with weights committed before scores: Build 93, Buy 40, Delegate 56 (#38, #54, #57). ADR-001, Workers and D1. Photo-storage Prediction Stake (#46) | None |
| **Aashi Mehta** (Implementer) | TEAM.md, STANDARDS.md, TOOLS.md, CLAUDE.md, CODEOWNERS and branch protection | Repo from the group template (#1), CODEOWNERS with two owners per path and bypass disabled (#7, #10, #12, #31), CLAUDE.md (#23), TOOLS.md (#22) | **DDR-002**: GitHub Copilot drafting the merged STANDARDS.md (#48, #49, #52). |
| **Semaj Johnson II** (Reviewer) | DACI-001, EVALS.md (OST, RAT, Prediction Stakes), README.md, pull request reviews | DACI-001 and its close (#13, #39), EVALS.md: Opportunity Solution Tree, the RAT, the stakes file (#47, #58), working agreement including the quiet-member clause (#6) | None |

## Phase 2: Build

| Member (role) | Accountable for, per the Phase 2 RACI | Shipped | Delegated |
|---|---|---|---|
| **Semaj Johnson II** (Specifier) | context/FEATURES.md, docs/VALIDATION.md | VALIDATION.md: three real user sessions, with three limitations stated against the team's own interest (#80). FEATURES.md: closed three F2 gaps found by running the spec through two builders (#68). RACI rotated to Phase 2 (#79) | **DDR-005**: Claude drafting VALIDATION.md. |
| **Aashi Mehta** (Architect) | context/ARCHITECTURE.md: ADR, D1 schema, diagram | ARCHITECTURE.md brought into line with the deployed D1 schema (#71), own Prediction Stake (#55) | None |
| **Giancarlo Martinez-Saldana** (Implementer) | db/, src/worker.js, public/, STYLE.md, SKILLS.md, TOOLS.md Cloudflare row, DDR-003 onward, README.md | Built and deployed F1 to F4: Worker, D1 schema and seed, pages (#66). STYLE.md and SKILLS.md merged from all four members' HW5 versions (#81). F3 spec gaps closed (#89). README See It Work and build status (#83, #87, #88) | **DDR-003**: Claude drafting the Worker, D1 schema, seed data, and pages. Every Must-be EARS row verified before commit (#90). |
| **Rishika Sikhakolli** (Reviewer) | TEAM.md, evals/, EVALS.md RAT test and stake resolutions, JUDGEMENT.md, pull request reviews | Four code evals, one per Must-be row with a server-side effect, each naming its EARS row (#74). JUDGEMENT.md, ten binary questions, two graders (#69, #72). Ran the RAT test on 2026-10-20 and resolved all four stakes (#73, #86) | **DDR-004**: Claude drafting the evals, eval results, and reviews (#84, #85). |

## Phase 3: Integrate

| Member (role) | Accountable for, per the Phase 3 RACI | Shipped | Delegated |
|---|---|---|---|
| **Aashi Mehta** (Specifier) | context/FEATURES.md, docs/VALIDATION.md | FEATURES.md Build Status for every feature with its evidence (#97). RETRO.md RAT verdict and spec findings (#99, #104). Phase 3 roster (#93). Individual retrospective (#102) | None |
| **Semaj Johnson II** (Architect) | context/ARCHITECTURE.md | ADR-002, the ADR history, the resolved revisit trigger, what the measurements changed, the diagram redrawn, the coherence check re-verified (#103). DEPLOY.md (#105). Individual retrospective (#107) | **DDR-006**: Claude drafting the Phase 3 architecture artifacts and the retrospective (#106). |
| **Rishika Sikhakolli** (Implementer) | db/, src/, public/, TOOLS.md, DDR-003 onward, README.md, the integrated build | Redeployed from her own Cloudflare account as the phase requires, with a new `database_id`, a TOOLS.md handoff row, and the eval header updated (#108). README for Phase 3 (#100). CODEOWNERS rotated (#94). Individual retrospective (#101) | Claude on the deploy steps and the TOOLS.md rows; every command run and checked by her. Recorded in DDR-LOG.md. |
| **Giancarlo Martinez-Saldana** (Reviewer / Evaluator) | TEAM.md, evals/, EVALS.md final state, JUDGEMENT.md, pull request reviews | Pruned the Context Scaffold: removed AGENTS.md as an unread template stub, with the reason in the pull request (#111). RETRO.md evals-against-plan, stakes, delegation-against-plan, and DDR-LOG.md (#113). EVALS.md final state and error-analysis log (#112). Individual retrospective (#114) | **DDR-007**, and DDR-LOG.md indexes every delegation across all three phases with hours. |

## Notable Reviews

Pull requests record the author, not the reviewer, so review work is invisible in every table above. These are the reviews that changed an artifact rather than approving it.

Counted across every pull request, including the ones closed without merging. A review counts here if it carried more than a sentence of substance. Bold marks whoever held the Reviewer role that phase.

| Reviewer | Phase 1 | Phase 2 | Phase 3 |
|---|---|---|---|
| Giancarlo Martinez-Saldana | 11 | 5 | **21** |
| Rishika Sikhakolli | 0 | **8** | 11 |
| Aashi Mehta | 0 | **8** | 1 |
| Semaj Johnson II | **5** | 5 | 2 |

**Giancarlo Martinez-Saldana.** Reviews in every phase, not only the one where he holds the role.

- Phase 1 (#22, #23): caught the governance files contradicting each other. TOOLS.md called the tool "GitHub Copilot in VS Code" while CLAUDE.md said "in Codespaces," and TOOLS.md trusted Claude with "first drafts" while CLAUDE.md listed Claude as Consulted only. Both were coherence failures between two files the rubric reads together.
- Phase 1 (#17): argued that Copilot drafting STANDARDS.md should be "R (A is Aashi)" rather than "C," because drafting is doing the work. That changed how the RACI records AI.
- Phase 2 (#84): asked DDR-004 to state that the RAT notes carried role descriptions only, citing CLAUDE.md's rule that AI receives no personal information.
- Phase 3 (#103): the sharpest review anyone gave. His own stake never sent a full-size photo to D1 without the shrink, so what was measured is that shrunk photos work, not where full-size ones break. He asked for ADR-002 and RETRO.md to agree on that distinction rather than letting his own prediction read as stronger than the evidence.
- Phase 3 (#100): traced three broken links that would land across other people's open pull requests, including one caused by his own #111.

**Rishika Sikhakolli.** Reviews by checking claims against what she did first-hand.

- Phase 3 (#113): verified the parts of RETRO.md describing her own Phase 2 work, naming each one she checked: the RAT interviews, the code evals, deliberately breaking F4-2, and the second grader.
- Phase 3 (#108): answered a reviewer's question about seed data by signing in as the demo account and confirming the Lisbon trip showed moments from all three members at the new URL, rather than asserting it.
- Phase 3 (#103): caught a fabricated detail in ADR-002, which claimed F7 was video moments. F7 is following people, and no feature in FEATURES.md proposes video.
- Phase 3 (#114): told the Final Reviewer his own retrospective understated him, because it omitted the pull request reviews he gave.

**Aashi Mehta.**

- Phase 3 (#103): re-verified the claim rather than the prose. She opened the Cloudflare D1 limits page, noted its 24 October update, confirmed the 2,000,000-byte figure ADR-002 depends on, and re-did the Gate arithmetic independently before commenting. She then caught that the missing trip date columns were credited to Phase 1 when the schema is a Phase 2 artifact.

**Semaj Johnson II.**

- Phase 3 (#97): traced the judgment-eval mapping question by question against JUDGEMENT.md and found that F3-2, a Must-be row, had no evidence in either column, while DDR-003 showed it had in fact been tested by hand. The file was underselling work the team had done.
- Phase 3 (#100): found that the README had moved to the Phase 3 URL while `wrangler.toml`, TOOLS.md, and the eval header still named the Phase 2 account, so a clean checkout would have deployed against the wrong database. Fixed in #108.

**Review effort tracked the Reviewer role from Phase 2 onward.** Rishika led Phase 2 while holding the role, and Giancarlo leads Phase 3 while holding it, by a wide margin. The rotation worked as designed in both.

**Phase 1 is the exception.** The Reviewer that phase wrote 5 substantive reviews while the Architect wrote 11. The role existed before the habit did, and the person who happened to read carefully was not the person assigned to.

**What changed is the kind of error review catches, not the amount.** Phase 1 reviews caught two governance files contradicting each other and a misassigned RACI letter. Phase 2 and Phase 3 reviews caught broken links, wrong file paths, and stale URLs. That is a reasonable shift once documents exist and code is deployed, but it means nothing in Phase 2 or Phase 3 review examined a decision. The one exception is Giancarlo on #103, which questioned what his own prediction had actually measured.

**One methodological warning for anyone recounting this.** Giancarlo reviews with inline comments on specific lines; the other three write review summaries. GitHub returns those from different endpoints, so counting one kind alone misreads the distribution badly. The numbers above include both.

## Two Honest Notes

**Two Phase 3 artifacts have no RACI row.** `docs/DEPLOY.md` and `docs/RETRO.md` are both named in the Phase 3 brief and neither appears in the Phase 3 matrix. DEPLOY.md was written by the Architect because the brief assigns it to that role. RETRO.md was written by the Specifier and the Reviewer between them, by section. Raised in review on the matrix pull request and recorded here rather than left implicit.

**Review counts are not in this file on purpose.** A count rewards approving quickly. The reviews above were chosen because an artifact changed as a result, which is the only test that matters. `is:pr reviewed-by:<username>` in this repository gives the full list for anyone who wants it.
