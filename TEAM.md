# TEAM.md

## Working Agreement

The practices below are proposed defaults to make the team agreement
actionable. Confirm or revise them together at the next team check-in.

- **Meetings.** Meet daily on Oct 6, Oct 7, and Oct 8.
- **Channel.** Use the team's imessage group chat to communicate and email chain to send files. Put artifact decisions and requested changes in the relevant GitHub pull
  request so they remain part of the project record.
- **Response time.** Acknowledge direct team messages within 15 hours on
  weekdays and 24 hours on weekends, even if a full answer will take longer.
- **Quiet member clause.** At 48 hours without a response, send one concise
  follow-up with the request and a clear reply deadline. At 72 hours, reassign
  time-sensitive work that can proceed without that member and notify the
  team. At 96 hours, email the instructor with the dates and channels of
  attempted contact and the impact on the work. The team reports that it has
  already emailed Giancarlo multiple times without a reply; because those
  attempts have not restored contact, the team should notify the instructor
  now and add the actual attempt dates when available. Do not attribute a
  response or agreement to a member who has not replied.
- **Disagreement.** First state the disputed decision and evidence in the
  relevant pull request. If unresolved, the person driving the decision writes
  a DACI with options and trade-offs. Select an Approver by lot from the
  consulted members who are not the Driver; record the person and decision in
  the DACI. The Approver decides after hearing the affected artifact owner.
- **Dates.** The course's published deadlines govern. Before implementation,
  complete and review the Specifier's project, user, and feature requirements
  and the Architect's ADR. Check progress at the weekly meeting. Add the
  actual course checkpoint dates here when the team confirms them.

## Roster

| Name | Phase 1 role | GitHub | Contact hours (ET) |
|---|---|---|---|
| Aashi Mehta | Implementer | [@mehtaaashi05](https://github.com/mehtaaashi05) | 9am to 7pm |
| Giancarlo Martinez-Saldana | Architect; quiet member (no reply to multiple team emails, as reported by the team) | [@GiancarloMartinez-Saldana](https://github.com/GiancarloMartinez-Saldana) | N/A |
| Rishika Sikhakoli | Specifier | [@rishikasikhakolli](https://github.com/rishikasikhakolli) |  9am to 7pm |
| Semaj Johnson II | Reviewer | [@semajjohnson](https://github.com/semajjohnson) | 9am to 7pm  |

## RACI Matrix (Phase 1)

R = Responsible, A = Accountable, C = Consulted, I = Informed. Each row has
one human Accountable owner. AI tools may assist only as shown and are never
Accountable. For prediction stakes, each member is accountable for their own
entry.

| Artifact | Specifier | Architect | Implementer | Reviewer | AI tools |
|---|---|---|---|---|---|
| TEAM.md | C | C | A/R | C | I |
| docs/DACI-001.md | C | A/R | C | C | I |
| context/PROJECT.md | A/R | C | I | C | I |
| context/USERS.md | A/R | C | I | C | I |
| context/FEATURES.md | A/R | C | I | C | I |
| context/ARCHITECTURE.md | C | A/R | C | C | I |
| context/STANDARDS.md, TOOLS.md, CLAUDE.md | C | C | A/R | C | I |
| .github/CODEOWNERS and branch protection | I | C | A/R | C | I |
| docs/PROBE-001.md | A/R | I | C | C | R (probe only; Specifier remains A) |
| docs/DDR-001.md | A | I | R | C | I |
| context/EVALS.md (OST, RAT) | C | C | I | A/R | I |
| context/EVALS.md (Prediction Stakes) | A/R (own entry) | A/R (own entry) | A/R (own entry) | A/R (own entry) | I |
| Pull request reviews | I | C | C | A/R | I |
| README.md | C | C | A/R | C | I |

AI is never Accountable. Any AI Responsible assignment requires the named
human Accountable owner in the same row. The bolt.new probe may be run only by
the Specifier after checking the service terms and approving the exact input;
its generated code is not retained.

## Rotation Plan

This rotation fulfills the course rule that no member repeats a role. Phase 1
assignments are confirmed as reported by the team. Phase 2 and Final entries
are proposed to complete the plan and need team confirmation, particularly
from Giancarlo before treating his proposed assignments as agreed.

| Member | Phase 1 | Phase 2 (proposed) | Final (proposed) |
|---|---|---|---|
| Aashi Mehta | Implementer | Reviewer | Specifier |
| Giancarlo Martinez-Saldana | Architect | Implementer | Reviewer |
| Rishika Sikhakoli | Specifier | Architect | Implementer |
| Semaj Johnson II | Reviewer | Specifier | Architect |

## Meeting Log

| Date and time (ET) | Status | Decision or note | Recorded by |
|---|---|---|---|
| 2026-10-06 5:00 PM | Held | Team confirmed Phase 1 roles: Aashi (Implementer), Giancarlo (Architect), Rishika (Specifier), Semaj (Reviewer), and agreed to the Build/Buy/Delegate weights in `context/ARCHITECTURE.md`. The team reports multiple unanswered emails to Giancarlo; dates of individual attempts were not provided. | Aashi Mehta |
| 2026-10-07 5:00 PM | Scheduled | Planned team meeting. | Aashi Mehta |
| 2026-10-08 12:00 PM | Scheduled | Planned team meeting. | Aashi Mehta |
