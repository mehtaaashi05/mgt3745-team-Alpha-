# STANDARDS.md

Draft based on Aashi Mehta's HW5 standards. The Implementer is responsible
for merging all four members' HW5 versions. The other versions have not yet
been received, so this is not represented as a completed team merge. Mark
each conflict resolution **Merged:** and record the choice; retain the
stricter rule when rules conflict.

## Documents

- Inline comments explain why, not what.
- Keep the README current with project decisions and status.
- Write so a teammate or reviewer outside the discussion can understand the
  artifact.

## Code (Phase 2)

- Use camelCase for JavaScript identifiers and kebab-case for new filenames.
- Use descriptive names for values crossing a browser/server boundary.
- Use prepared/parameterized SQL statements; never concatenate user input
  into a query.
- Show failed requests to the user in the interface, not only in the console.
- Do not leave `console.log` calls in committed code.
- Never commit credentials, tokens, or keys. Database identifiers may be
  committed only when they are not credentials.

## Git

- Begin each commit message with an action verb and name the user-visible
  result. Example: `Keep note text after a failed save`.
- Work on a branch and merge into `main` only through a pull request reviewed
  by someone other than its author.
- Use the pull request description sections `What changed`, `RACI row`,
  `How to check it`, and `AI use`.
- End every pull request description with an AI Use line: `None` or a link to
  the applicable DDR.
- After branch protection is enabled, do not commit directly to `main`.
- Never put credentials in a commit, pull request, or repository document.

## Merge Record

Pending: the other members' HW5 standards have not been received, so conflicts,
stricter-rule choices, and any dissent cannot yet be recorded. Update this
section when the team provides its versions; mark each actual conflict
resolution **Merged:** and identify the rules and members involved.
