# CLAUDE.md

Status: DRAFT pending team confirmation. Accountable: Aashi Mehta,
Implementer. `context/STANDARDS.md` is the source of truth for coding and
repository practices. If this file conflicts with it, repair this file.

## Tool Approval

No AI tool is recorded as team-approved yet; the team's Approver and explicit
RACI assignments are still pending. GitHub Copilot in VS Code is proposed for
drafting and review assistance, subject to this policy and the applicable RACI
row. The required bolt.new specification probe is owned by the Specifier and
must use one approved, non-sensitive prompt with no follow-ups. Do not submit
credentials, secrets, or personal data.

## What AI May Do

- AI may be Responsible or Consulted only when the artifact's RACI row
  explicitly assigns that role and names a human Accountable owner.
- AI may draft, summarize, suggest, and identify possible issues. The named
  human owner verifies the result and is responsible for the final artifact.
- AI may not make or represent team decisions, research findings, votes,
  approvals, test results, or teammate agreement on behalf of a person.

## What AI May Never Do

- AI may never be Accountable, approve its own work, or merge a pull request.
- AI may never receive credentials, tokens, secrets, or real users' private
  personal data.
- AI-generated work may never be merged without human verification and the
  required independent pull-request review.

## Persistent Coding Instructions

- Follow `context/STANDARDS.md`; in particular, keep structure in
  `index.html`, presentation in `styles.css`, and behavior in `app.js`.
- Keep application code inside an IIFE. Use descriptive camelCase identifiers
  for variables/functions, `UPPER_SNAKE_CASE` for constants, and kebab-case
  for new ids, classes, and filenames (except the required app filenames).
- Do not add third-party libraries or external network/API calls unless a
  superseding ADR explicitly approves them.
- Do not render user-provided values with `innerHTML`; do not commit debug
  output, credentials, tokens, or keys.
- Keep changes scoped to the requested behavior and report verification
  honestly.

## Task-Specific Prompt Snippets

Use the first snippet only for work that touches the review form or saving:

> This task touches the review form or review persistence. Keep every form
> control labeled and put messages in `#form-error` and `#save-status`, with
> appropriate announced/live-region behavior. Reject missing values required
> by the approved `FEATURES.md` before calling the save function. A failed
> save means the storage write itself failed; when that happens, leave all
> typed values in their inputs and do not change the displayed review list.
> Show the failure on the page without an uncaught console error. Test this
> path with `?failSave` in the URL.

Use the second snippet only for work that loads, saves, or renders reviews:

> This task touches reviews. Never save, load, or display a review that is
> missing a field required by the approved `FEATURES.md`. Validate required
> fields both at submit and when loading stored reviews. Do not assume that a
> reviewer name is collected or required unless `FEATURES.md` says so.

## Delegation Record

Record delegated AI work in a DDR before relying on its output. The DDR names
the tool and model/version when available, input and data crossing the trust
boundary, the human Accountable owner, economic rationale, verification, and
findings. The required bolt.new probe is recorded in `docs/DDR-001.md`; that
record is currently prepared and does not claim the probe has run. The
Specifier owns the probe, and the Implementer maintains its DDR.

## Disagreement

The team's Approver, once named in `docs/DACI-001.md`, decides disputed AI use
after consulting the affected artifact's Accountable owner. Record the decision
and rationale in a DACI. Until an Approver is identified and decides, do not
proceed with disputed AI use.
