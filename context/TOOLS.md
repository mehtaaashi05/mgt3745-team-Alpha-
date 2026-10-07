# CLAUDE.md

Status: ACTIVE. Accountable: Aashi Mehta, Implementer. This file is the team's AI governance policy and is the operational companion to `context/STANDARDS.md`.

## Approved Tools

- GitHub Copilot in VS Code: approved for drafting, summarizing, and review assistance, subject to this policy.
- bolt.new and StackBlitz: approved only for the required specification probe and only after the Specifier confirms the exact, non-sensitive input.
- No other AI tool is approved for this repository until the team formally records that decision.

## What AI May Do

AI may be Responsible or Consulted only when a RACI row explicitly assigns AI that role and a human person remains Accountable for the artifact.

Approved uses include:

- Drafting documentation and summaries for review by a human owner.
- Identifying missing assumptions, edge cases, and wording issues in project files.
- Suggesting review comments, test ideas, and wording improvements.
- Supporting repository hygiene when a human verifies the final output.

A human owner must verify and approve all AI output before the team relies on it or merges it.

## What AI May Never Do Here

- AI may never be Accountable for a repository artifact or project decision.
- AI may never approve its own work or merge a pull request.
- AI may never receive credentials, tokens, secrets, or real personal data.
- AI may never invent teammate agreement, user research findings, scores, or test results.
- AI may never replace the human review gate required for branch protection and PR approval.

## The DDR Rule

Any delegated AI work must be recorded in `docs/DDR-001.md` before the team relies on the output. The DDR must name:

- the tool and model used,
- the exact input or data that crossed the trust boundary,
- the human Accountable owner,
- the economic rationale for the delegated work,
- the verification performed,
- and the findings and follow-up actions.

The pull request description must end with an AI Use line: `None` or a link to the relevant DDR.

## AI Role Boundaries by RACI

AI may be Responsible or Consulted only when the project RACI explicitly permits it and a named human remains Accountable. In practice, the team expects AI use to be limited to:

- drafting or polishing documentation for `context/STANDARDS.md`, `context/TOOLS.md`, and `context/CLAUDE.md`, with Aashi Mehta as human Accountable,
- assisting the Specifier with summary work and risk spotting, with the Specifier as human Accountable,
- review assistance on pull requests, with the human reviewer serving as the accountable approver.

AI is never permitted to act as Accountable for a team artifact or for any decision that changes project direction.

## When We Disagree About AI Use

The team's AI Approver is Aashi Mehta. If a team member disputes an AI use, Aashi decides after consulting the affected file's human Accountable owner. If the decision is not documented in the relevant governance file, the disputed use is not approved.

## Required Review Standard

All AI-generated material must pass the same review questions as any other pull request:

- Does it trace to the user need, problem statement, or assignment requirement?
- Does it follow the team standards and governance files?
- Is anything sensitive or secret in it?
- Is the AI use documented in a DDR?
- Would a stranger understand it without additional explanation?
