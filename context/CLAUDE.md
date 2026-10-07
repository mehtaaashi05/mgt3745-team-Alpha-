# STANDARDS.md

Status: ACTIVE. Accountable: Aashi Mehta, Implementer.
This file is the source of truth for the project and overrides any conflict with `context/CLAUDE.md`. The stricter rule wins when requirements disagree.

## Merge Record

- Merged: The requirement from the HW5 standards to use role-distinguishing names such as `notes`, `candidate`, and `nextNotes` in `app.js` overrides vague names such as `data` or `value`. This is stricter and more specific than the general JavaScript naming rule.
- Merged: The requirement to avoid `innerHTML`, `outerHTML`, and `insertAdjacentHTML` on note content remains the project rule for user-entered text, even though the exact prompt may say it only matters for a specific task. The project keeps the stricter rule and documents the task-specific reminder in the prompt instead of in `CLAUDE.md`.
- Merged: The requirement that failed requests be shown to the user in the interface, not only in the console, is retained. This is stricter than a generic error-handling rule.
- Merged: No credential, token, secret, or personal data may ever be committed to the repository; database IDs are addresses and may appear in a config file only when they are not credentials.
- Merged: Comments explain why the code exists, not what the code does; they should remain minimal and focused on the invariant being protected.

## Documents

- Inline comments explain why a decision exists, not what the code does.
- Keep README files, architecture artifacts, and team governance files current with the project decisions and status.
- Write so a teammate or reviewer outside the original discussion can understand the artifact.
- If `STANDARDS.md` and `CLAUDE.md` disagree, `STANDARDS.md` is the source of truth and `CLAUDE.md` is repaired to match.

## Code (Phase 2)

- Use descriptive camelCase for JavaScript identifiers and kebab-case for new filenames.
- Use descriptive names for values that cross a browser/server boundary.
- Keep structure in `index.html`, presentation in `styles.css`, and behavior in `app.js`.
- Keep application code inside the IIFE in `app.js` so nothing becomes an accidental global.
- Use parameterized SQL or safe bind values rather than string concatenation with user input.
- Do not insert user-entered text with `innerHTML`, `outerHTML`, or `insertAdjacentHTML`; render text with DOM APIs and `textContent`.
- Show a failed request to the user on the page and do not throw it in the console.
- Never leave `console.log` calls or other debug output in committed code.
- Never commit credentials, tokens, keys, or personal data. Database identifiers may appear only when they are not credentials.
- Preserve the invariants that storage succeeds before the interface changes; do not reorder a successful save and the resulting UI update.

## Git

- Begin each commit message with an action verb and name the user-visible result; for example, `Keep note text after a failed save`.
- Work on a branch and merge into `main` only through a pull request reviewed by someone other than the author.
- Use the pull request description sections `What changed`, `RACI row`, `How to check it`, and `AI use`.
- End every pull request description with an AI Use line: `None` or a link to the relevant DDR.
- After branch protection is enabled, do not commit directly to `main`.
- Never put credentials in a commit, pull request, or repository document.

## Required AI Governance Alignment

- AI output is allowed only when the project RACI explicitly permits it and a human is accountable for the final artifact.
- The team must record delegated AI work in a DDR before relying on the output.
- The human owner verifies the artifact and is responsible for the final result.
- AI may not approve its own work, merge a pull request, or make team decisions on behalf of a person.

## Conflict Resolution Policy

When multiple rules overlap, the stricter one stands. The team uses this file as the normative requirement set for code quality, documentation, and repository hygiene.
