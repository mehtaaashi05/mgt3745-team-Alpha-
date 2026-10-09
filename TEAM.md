# TEAM.md

## Working Agreement

- **Meetings.** Tuesdays and Thursdays immediately after class, and Wednesdays at 5:00 PM ET on Zoom. Thirty minutes unless an artifact is blocked. The Reviewer keeps time and posts the decisions to the Meeting Log.
- **Channel.** A group text thread for scheduling and quick questions. Anything that changes an artifact goes in a pull request comment instead, so the decision lives next to the file it changed.
- **Response time.** Within 12 hours on weekdays, within 24 hours on weekends. If you will be out of reach for longer than that, say so in the thread before you go.
- **Quiet member clause.** At 48 hours with no response, any member messages them directly and the Implementer reassigns nothing yet. At 72 hours, the team names a stand-in for the missing artifact in the Meeting Log, and the original owner keeps authorship if they return before the deadline. At 96 hours, the Reviewer emails the instructor with this clause and the dates, and the team proceeds without that member's artifact rather than waiting.
- **Disagreement.** Anyone can call a disagreement. If it is about what the product should do, it becomes a DACI and the Driver is whoever is Accountable for the affected file. The Approver is drawn by lot unless the team agrees on one. Dissent is recorded in one sentence in the DACI rather than argued twice.
- **Dates.** Weights committed Oct 7. Scores and DACI-001 closed Oct 7. Role artifacts open as pull requests Oct 7. Prediction Stakes and the bolt probe Oct 7. Reviews finished and README written Oct 8. Submitted by 11:59 PM ET Oct 8.

## Roster

| Name | Role | GitHub | Contact hours (ET) |
|---|---|---|---|
| Semaj Johnson II | Reviewer | @semajjohnson | 9am–7pm |
| Aashi Mehta | Implementer | @mehtaaashi05 | 9am–7pm |
| Rishika Sikhakolli | Specifier | @rishikasikhakolli | 9am–8pm |
| Giancarlo | Architect | @GiancarloMartinez-Saldana | 9am–7pm |

## RACI Matrix (Phase 1)

R = Responsible (does the work), A = Accountable (answers for it; exactly one person, always a person), C = Consulted (asked before), I = Informed (told after). AI tools may be R or C and are never A. Every row where AI is R names the human A beside it.

| Artifact | Specifier (Rishika) | Architect (Giancarlo) | Implementer (Aashi) | Reviewer (Semaj) | AI tools |
|---|---|---|---|---|---|
| TEAM.md | R | R | R, A | R | – |
| docs/DACI-001.md | R | R | R | R, A | – |
| context/PROJECT.md | R, A | C | I | C | C |
| context/USERS.md | R, A | I | I | C | – |
| context/FEATURES.md | R, A | C | I | C | C |
| context/ARCHITECTURE.md | C | R, A | C | C | C |
| context/STANDARDS.md, TOOLS.md, CLAUDE.md | I | C | R, A | C | C |
| .github/CODEOWNERS and branch protection | I | I | R, A | C | – |
| docs/PROBE-001.md and docs/DDR-001.md | A | I | R (DDR) | C | R (probe; A is Rishika) |
| context/EVALS.md (OST, RAT) | C | C | I | R, A | – |
| context/EVALS.md (Prediction Stakes) | R | R | R | R, A | – |
| Pull request reviews | R | R | R | R, A | – |
| README.md | C | C | C | R, A | C |

## Rotation Plan

| Member | Phase 1 | Phase 2 | Final |
|---|---|---|---|
| Semaj Johnson II | Reviewer | Specifier | Architect |
| Aashi Mehta | Implementer | Reviewer | Specifier |
| Rishika Sikhakolli | Specifier | Architect | Implementer |
| Giancarlo | Architect | Implementer | Reviewer |

Nobody holds the same role twice, and every role is filled in every phase.

## Meeting Log

| Date | Decision or note | Recorded by |
|---|---|---|
| 2026-10-07 | Session 1: Team formed and roles assigned — Rishika Specifier, Giancarlo Architect, Aashi Implementer, Semaj Reviewer, rotating after Phase 1 so nobody repeats. Agreed which member's HW1 problem to build, to be recorded formally in DACI-001 with weights committed before scores and a dated reopen trigger. Working agreement drafted: meetings Tuesdays and Thursdays after class plus Wednesdays at 5:00 PM ET, 12-hour weekday and 24-hour weekend response time, quiet-member escalation at 48, 72, and 96 hours, and disagreements about the product becoming a DACI driven by the file's Accountable owner. | Semaj |
| 2026-10-07 | Session 2: Aashi created `mgt3745-team-Alpha` from the group template and invited everyone; roster PRs opened as each member's first PR. Semaj's PR (#4) merged after correcting a deleted table separator row. Rishika's (#3) conflicts with TEAM.md after #4 merged and was reviewed with resolution instructions. Aashi's (#5) is clean but lists her role as "Architect and Implementer," which applies only to teams of three; correction requested. Several PR descriptions are missing the team format and the required AI Use line, raised in review. Branch protection and CODEOWNERS to be enabled only after the last roster PR merges, two owners per path, bypass disabled. Remaining before the Oct 8 deadline: DACI-001 closed, role artifacts opened as PRs, one Prediction Stake per member, the bolt.new probe with PROBE-001.md and DDR-001, and the README. | Semaj |
