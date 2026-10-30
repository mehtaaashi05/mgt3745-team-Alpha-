# DDR-LOG.md

Every delegation decision record in this repository, in order, with the hours each one reports. Each row links to the full record. Maintained by the Reviewer; anyone who writes a new DDR adds a row in the same pull request.

## Log

| DDR | Phase | Date | Tool | What was delegated | Accountable | By hand (est.) | Actual | Net saved |
|---|---|---|---|---|---|---:|---:|---:|
| [DDR-001](DDR-001.md) | 1 | 2026-10-07 | bolt.new | Specification probe of FEATURES.md; findings in PROBE-001.md | Rishika | 2.0 h | 1.0 h | 1.0 h |
| [DDR-002](DDR-002.md) | 1 | 2026-10-06 | GitHub Copilot | Merging members' HW5 standards into STANDARDS.md | Aashi | 2.5 h | 1.0 h | 1.5 h |
| [DDR-003](DDR-003.md) | 2 | 2026-10-20 | Claude (Cowork) | Worker, D1 schema and seed, and pages for F1 to F4 | Giancarlo | 9.0 h | 2.0 h | 7.0 h |
| [DDR-004](DDR-004.md) | 2 | 2026-10-21 | Claude | Code evals, judgment eval questions, eval results wording, a Meeting Log entry, PR reviews | Rishika | 6.0 h | 2.5 h | 3.5 h |
| [DDR-005](DDR-005.md) | 2 | 2026-10-22 | Claude | Drafting VALIDATION.md from the RAT results | Semaj | 1.5 h | 0.7 h | 0.8 h |
| [DDR-006](DDR-006.md) | 3 | 2026-10-27 | Claude | ARCHITECTURE.md final (ADR-002, ADR history, diagram), DEPLOY.md, and an individual retrospective | Semaj | 4.0 h | 1.3 h | 2.7 h |
| [DDR-007](DDR-007.md) | 3 | 2026-10-27 | Claude (Cowork) | Context pruning review, EVALS.md final status and error log, three RETRO.md sections, this log, an individual retrospective | Giancarlo | 5.0 h | 1.5 h | 3.5 h |
| [DDR-008](DDR-008.md) | 3 | 2026-10-26 | Claude | Redeploy steps and PR #108 changes, README edits, Phase 3 RACI rows, an individual retrospective draft, the recording script, PR descriptions and reviews | Rishika | 5.0 h | 2.0 h | 3.0 h |
| [DDR-009](DDR-009.md) | 3 | 2026-10-29 | Claude | Rubric review of README and RETRO, and drafted fixes for both | Giancarlo | 1.5 h | 0.5 h | 1.0 h |
| **Total** | | | | | | **36.5 h** | **12.5 h** | **24.0 h** |

"By hand" and "Actual" are each DDR's own estimates; DDR-003's "8 to 10 hours" is counted as 9; DDR-006's "about four hours" and "roughly 80 minutes" are counted as 4.0 and 1.3 (its own text rounds the saving to about 2.5). Phase 3 recording and integration DDRs, if any, are added by their owners.

## Delegations Without a DDR

Recorded here so the log is honest about its gaps, not only its entries.

- **Phase 1, ARCHITECTURE.md.** Claude drafted the Gate scores, ADR-001, and the diagram for Giancarlo (PRs #54 and #57). The PR descriptions name Claude in their AI use lines, but no DDR was written, although CLAUDE.md's DDR rule requires one for anything beyond a single line. An unmerged branch, `implementer/phase1-docs`, also holds a Copilot draft of an earlier ARCHITECTURE.md with its own draft DDR that never reached `main`.
- **Phase 1, DACI-001 scores and Prediction Stake wording.** Claude drafted Giancarlo's scoring table and stake wording (PRs #38 and #46); the scores and prediction were his. No DDR.
- **Phase 2, STYLE.md and SKILLS.md merge and README sections.** Claude drafted these for Giancarlo (PRs #81, #83, #87, #88); each PR's AI use line points to DDR-003, whose task list does not name them.
- **HW6 builder runs.** bolt.new, Google AI Studio, Claude Code, and ChatGPT were used in each member's individual HW6 repository and recorded in those repositories' DDRs, not here; their findings reached this repository as issues #59, #76, and #92 and PRs #68 and #89.
