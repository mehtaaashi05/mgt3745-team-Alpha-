# STANDARDS.md

Merged from three members' HW5 versions by Aashi Mehta, Implementer. Where two rules conflicted, the stricter one was kept; each such choice is marked **Merged:**. Giancarlo did not provide HW5 standards, so the team proceeded with the standards from the three available members.

## Documents

- Markdown, one H1 per file, headings in title case.
- No em dashes. Use a colon, a comma, parentheses, or two sentences. **Merged:** Rishika and Semaj already required this; Aashi did not specify.
- Tables for anything compared across more than two items.
- Every EARS row has an ID (F1-1) and traces to a job statement in USERS.md.
- Dates as YYYY-MM-DD in records; plain dates in prose.
- Inline comments explain why, not what. Keep them minimal.
- Keep the README current with each deployed change.

## Code (Phase 2)

- JavaScript modules, `const` by default, no `var`.
- Use descriptive camelCase for identifiers and kebab-case for new filenames. Short conventional names like `event`, `index`, and `item` are fine when their role is obvious.
- Use descriptive names for values that cross a browser/server boundary.
- `textContent` for any user-supplied text. Never `innerHTML` with user data. **Merged:** Aashi's HW5 explicitly forbade `innerHTML`, `outerHTML`, and `insertAdjacentHTML` for note content; this is the stricter rule.
- SQL through `prepare().bind()` only. **Merged:** Never concatenate user input into a query; Aashi's rule applies.
- Every `fetch` checks `res.ok` and shows the user a message on failure.
- No `console.log` in committed code.
- No secrets, tokens, or location links in the repository, ever. Database identifiers may appear only when they are not credentials.
- Keep structure in `index.html`, presentation in `styles.css`, and behavior in `app.js`.
- Keep application code inside the IIFE in `app.js` so nothing becomes an accidental global.
- Preserve the invariant that storage succeeds before the interface changes; do not change the visible state before the write has succeeded.
- Every form control has a label, and success and error messages appear in announced elements. When a save fails, the user's typed input stays in the fields.

## Git

- Branch names: `role/short-description`, lowercase, hyphens. Example: `spec/features-kano`.
- One artifact per pull request where possible.
- Commit messages: `FILE: what changed`. Example: `USERS.md: merge four profiles into three`. Begin each message with an action verb and name the user-visible result.
- Pull request description has four parts: What changed, RACI row, How to check it, AI use.
- Work on a branch and merge into `main` only through a pull request reviewed by someone other than the author.
- Never put credentials in a commit, pull request, or repository document.

## If STANDARDS.md and CLAUDE.md disagree

STANDARDS.md is normative. Repair CLAUDE.md to match rather than following them separately.
