# CLAUDE.md

Status: DRAFT. Accountable: Aashi Mehta, Implementer. This policy is a
conservative starting point and must be confirmed by the team's Approver.
Until an Approver is named in `docs/DACI-001.md`, do not treat a disputed AI
use as approved.

## Approved Tools

This list is proposed and pending confirmation by the team's Approver.

- GitHub Copilot in VS Code: proposed for drafting and review assistance,
  subject to this policy and the applicable RACI assignment.
- bolt.new (StackBlitz): required for the specification probe. The Specifier
  must approve the exact, non-sensitive input before it is submitted.
- No other AI tool is approved until the team's Approver records that decision.

## What AI May Do

- AI may be Responsible or Consulted only for a RACI row that explicitly
  assigns it that role and names a human Accountable owner.
- AI may draft, summarize, suggest, and identify possible issues. A human
  owner verifies the result and is responsible for the final artifact.
- AI may not make or represent team decisions, user-research findings, or
  approvals on behalf of a person.

## What AI May Never Do Here

- AI may never be Accountable, approve its own work, or merge a pull request.
- AI may never receive credentials, tokens, secrets, or real users' private
  personal data.
- AI may never invent teammate agreement, user evidence, scores, test results,
  or tool-probe findings.
- AI-generated work may never be merged without human verification and the
  required independent pull-request review.

## The DDR Rule

Record delegated AI work in a DDR before relying on its output. The DDR names
the tool and model, input and data crossing the trust boundary, the human
Accountable owner, economic rationale, verification performed, and findings.
The pull request description links the DDR. For the required bolt.new probe,
the Specifier is Accountable and the Implementer maintains `docs/DDR-001.md`.

## When We Disagree About AI Use

The team's Approver, named in `docs/DACI-001.md`, decides after consulting the
affected artifact's Accountable owner. Record the decision and rationale in a
DACI. Until that Approver is identified and decides, do not proceed with the
disputed use.
