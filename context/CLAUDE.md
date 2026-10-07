# STANDARDS.md

Status: ACTIVE. Accountable: Aashi Mehta, Implementer.
This file is the source of truth for the project. When `STANDARDS.md` and `context/CLAUDE.md` disagree, `STANDARDS.md` is normative and the AI policy file is repaired to match it.

## Merge Record

- Merged: The HW5 rule requiring role-distinguishing names such as `notes`, `candidate`, and `nextNotes` in `app.js` is stricter than generic naming guidance and is retained. It prevents the drift back toward generic names such as `data` or `value`.
- Merged: The HW5 rule requiring comments to explain why a code path exists, not what it does, is retained and kept minimal. This is stricter than a broad commenting requirement and prevents noisy, self-evident comments.
- Merged: The requirement to keep storage and interface updates ordered correctly is retained. Storage must succeed before the interface changes so the UI stays in sync with the actual persisted state.
- Merged: The rule not to use `innerHTML`, `outerHTML`, or `insertAdjacentHTML` for user-entered note content is retained. Render user text through DOM APIs and `textContent` instead.
- Merged: The requirement to show failed requests to the user on the page and never only in the console is retained. This is stricter than a generic error-handling rule.
- Merged: No credential, token, secret, or private personal data may be committed to the repository. Database identifiers may appear only when they are not credentials.
- Merged: The requirement to keep the README current and to write so a teammate outside the original discussion can understand the artifact is retained.

## Documents

- Inline comments explain why the code exists, not what it does.
- Keep the README, governance files, and architecture records current with the project decisions and status.
- Write so a teammate or reviewer outside the discussion can understand the artifact.
- If the repository standards and the AI usage policy disagree, the stricter rule wins.

## Code (Phase 2)

- Use descriptive camelCase for JavaScript identifiers and kebab-case for new filenames.
- Use descriptive names for values crossing a browser/server boundary.
- Keep structure in `index.html`, presentation in `styles.css`, and behavior in `app.js`.
- Keep application code inside the IIFE in `app.js` so nothing becomes an accidental global.
- Use parameterized SQL or safe bind values instead of concatenating user input into a query.
- Do not insert user-entered text with `innerHTML`, `outerHTML`, or `insertAdjacentHTML`; render text with DOM APIs and `textContent`.
- Show a failed request to the user on the page and do not throw it in the console.
- Remove `console.log` calls and other debug output before committing.
- Never commit credentials, tokens, keys, or personal data. Database identifiers may appear only when they are not credentials.
- Preserve the invariant that storage succeeds before the interface changes. Do not change the visible state before the write has succeeded.

## Git

- Begin each commit message with an action verb and name the user-visible result. Example: `Keep note text after a failed save`.
- Work on a branch and merge into `main` only through a pull request reviewed by someone other than the author.
- Use the pull request description sections `What changed`, `RACI row`, `How to check it`, and `AI use`.
- End every pull request description with an AI Use line: `None` or a link to the relevant DDR.
- After branch protection is enabled, do not commit directly to `main`.
- Never put credentials in a commit, pull request, or repository document.

## AI Governance Alignment

- AI output is allowed only when the project RACI explicitly permits it and a human is accountable for the final artifact.
- The team must record delegated AI work in a DDR before relying on the output.
- The human owner verifies the artifact and remains responsible for the final result.
- AI may never approve its own work, merge a pull request, or make team decisions on behalf of a person.

## Conflict Resolution Policy

When multiple rules overlap, the stricter rule wins. This file is the normative requirement set for code quality, documentation, and repository hygiene.
