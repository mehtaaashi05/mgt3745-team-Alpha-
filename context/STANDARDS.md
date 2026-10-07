# Standards

Status: MERGED DRAFT for team confirmation. Accountable: Aashi Mehta,
Implementer. Inputs received: the Implementer's initial draft and standards
from Teammates 1 and 2. The same standards text was included twice earlier and
is treated as one input, not as two submissions. Giancarlo Martinez-Saldana
has not provided a standards submission; the team reports he has not replied
to multiple emails. Team confirmation of this draft is still pending.

## Documents

- Keep project decisions, status, and links current in `README.md`.
- Update `README.md` with each release tag.
- Write artifacts so a teammate or reviewer who was not in the discussion can
  understand them.
- Do not invent research, approvals, votes, tool-probe findings, or teammate
  agreement. Mark missing evidence as pending.

## Code

1. Use descriptive camelCase for JavaScript variables and functions. Short
   conventional names such as `event` and `index` are fine when their role is
   obvious. Use `UPPER_SNAKE_CASE` for constants.
2. Use kebab-case for new file names, HTML ids, and CSS classes, except for
   the required application filenames `index.html`, `styles.css`, and
   `app.js`.
3. Keep structure in `index.html`, presentation in `styles.css`, and behavior
   in `app.js`. Use lexical scope and keep application code inside an IIFE so
   it does not create accidental globals. Use browser-native web technologies
   only: no third-party libraries and no external network/API calls unless a
   superseding ADR explicitly approves them.
4. Comments explain why code exists, not what it does. Keep comments that
   record scope boundaries or past decisions. Remove `console.log` and other
   temporary debug output before submitting.
5. Commit messages name the user-visible behavior that changed and why, such
   as `Keep review details after a failed save`, not `update app.js`.
6. Never insert user-provided text with `innerHTML`. Render place names,
   reviewer names (if collected), cities, categories, and review text using
   safe DOM construction and `textContent`.
7. Every form control has a label. Success and error messages must be
   perceivable and announced. For a task that changes form saving, preserve
   entered values and leave the displayed list unchanged when the storage
   write fails; reject missing required fields before attempting the save.
   Follow the task-specific prompt in `CLAUDE.md` and test the write-failure
   path with `?failSave` in the URL.
8. Do not add product-specific required fields that are not in the approved
   feature requirements. In particular, the pool-item rule that every item
   must show a source name does not define travel-review authorship; follow
   `FEATURES.md` for whether a reviewer name is collected or required.
9. If a later approved architecture uses SQL, pass all user values through
   parameter binding such as `bind()`; never concatenate user input into SQL.
   The proposed first prototype has no SQL database.
10. Do not commit credentials, tokens, or keys. Non-secret database
    identifiers may appear in configuration when a future approved
    architecture requires them.
11. Show failed requests or storage writes to the user in the page. Handle
    failures without uncaught console errors or temporary debug output.

## Git and Review

- Work on a branch and merge into `main` through a pull request reviewed by
  someone other than its author.
- Use pull request sections `What changed`, `RACI row`, `How to check it`, and
  `AI use`.
- End each pull request description with `AI Use: None` or a link to the
  applicable delegation record.
- Do not commit directly to `main` after branch protection is enabled.
- Never put credentials in a commit, pull request, or repository document.

## Merge Record

The following choices reconcile the Implementer's draft with Teammates 1 and
2. They are Implementer merge decisions for review, not a claim of team
approval:

- **Merged:** Teammates 1 and 2 both require descriptive camelCase. Use
  `UPPER_SNAKE_CASE` for constants as Teammate 1 specifies, and descriptive
  camelCase for variables/functions; keep short conventional names where
  clear.
- **Merged:** The separate HTML/CSS/JavaScript files and lexical scope
  requirements from Teammate 1 align with Teammate 2's required IIFE. Keep all
  three requirements.
- **Merged:** Teammate 1 specifies kebab-case for ids, classes, and files.
  Apply it to new filenames and DOM/CSS names while preserving the three
  required application filenames.
- **Merged:** Both submissions require `textContent` rather than `innerHTML`,
  labels and perceivable feedback, meaningful commit messages, safe SQL
  binding, no committed credentials, and no debug logging; retain these rules.
- **Merged:** Teammate 2's split test places form-save failure details in a
  task-specific prompt. The persistent standard requires accessible
  feedback/input preservation for relevant changes; the selectors and
  `?failSave` test live in `CLAUDE.md`, not as requirements for unrelated
  tasks.
- **Adapted:** Teammate 2's requirement that every pool item display a source
  name is specific to that teammate's pool app. It is not imposed on travel
  reviews; whether a review author name is required must come from the
  approved `FEATURES.md`.
- **Merged:** Teammate 1 asks for README updates with each release tag; retain
  this as a documentation/release practice.

The copies supplied earlier were identical and are counted as one input.
Invite Giancarlo to review this draft if he becomes available, and confirm the
reconciled draft with the team and record any dissent before marking the
standards team-approved.
