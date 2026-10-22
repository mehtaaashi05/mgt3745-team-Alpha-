# SKILLS.md

Status: ACTIVE for Phase 2. Accountable: Giancarlo Martinez-Saldana, Phase 2 Implementer. Merged from all four members' HW5 versions (Aashi, Giancarlo, Rishika, Semaj); conflicts are marked **Merged:** in the Merge Record.

Reusable patterns and delegation guidance, written so an agent (or a stranger) could apply them next time. Each entry is under fifteen lines. Load on demand: read the heading first and the body only when it is relevant.

## Pattern: fetch with the failure shown on the page

**When:** any call from `public/app.js` to the Worker.
**Do:** wrap `fetch` in try/catch; treat a network failure ("Could not reach the server") and a failed response as different cases; on `!res.ok`, show the Worker's own `error` message in the status line with `textContent`; return before touching anything else on screen.
**Because:** the server's message names the problem (F1-2's "That username is taken"), and the caller must not change what the user sees until storage has succeeded (STANDARDS.md). In this app, `callApi` in `public/app.js` is the one place this lives.

## Pattern: add a field end to end (page → Worker → D1)

**When:** a feature needs one more value stored per row.
**Do, in order:**
1. EARS rows first, including the unwanted one (what is a bad value?) and "no value" if it is optional.
2. A migration with `ALTER TABLE ... ADD COLUMN`, and the same column in `db/schema.sql` for fresh databases.
3. Worker: validate (400 plus a reason), `bind()` the value, add it to the `SELECT`.
4. Page: a labelled input, sent in the request, rendered with `textContent`.
5. One code eval per EARS row, shown to fail on the old Worker.
6. Deploy order: database change, then `npm run deploy`, then `API=... npm test`.
**Because:** deploying the Worker before the column exists turns every save into a 500. (Giancarlo)

## Pattern: required fields are chosen before submit, not after

**When:** a field the Worker validates arrives on the same request as the rest of the entry.
**Do:** put it in the form and block submit while it is empty; never ask for it in a prompt after saving.
**Because:** in HW5 both bolt and AI Studio built a post-save prompt, which broke once the Worker required the field, since no endpoint updates a row after it exists. (Rishika)

## Delegation guidance: what to paste and what to forbid

**Paste, in order:** PROJECT, FEATURES (rows marked), STYLE, STANDARDS, TOOLS, then the current source files.
**One instruction line** naming the files it may touch, for example: "Build F3 in `public/` and `src/worker.js` only; do not add storage, origins, or dependencies."
**Say what it must not do, in a numbered list.** Tools follow numbered rules and do not infer prohibitions written as prose: no new storage mechanism (state lives in D1), no external origins, no new dependencies.
**Say which rows cannot be met** from the files allowed, so the tool asks instead of inventing storage. (All four members; prohibition list from Semaj)

## Delegation guidance: what to check first, in this order

1. The file list of the diff, and `package.json` for new dependencies.
2. Where new state is stored (D1 only, never `localStorage`).
3. `innerHTML` and concatenated SQL (STANDARDS.md bans both).
4. External origins in the HTML (fonts, scripts, styles).
5. Request field names against `src/worker.js`, and token names against STYLE.md.
**Because:** every real problem in HW5 was findable in these five places in under five minutes. (All four members)

## Delegation guidance: what tools reliably get wrong

- **HW5, bolt and AI Studio:** React or Tailwind scaffolds and unused dependencies around a three-file task; `localStorage` for new state; Google Fonts links; guessed field names; text boxes for dates; claiming a server row was done when they could not touch the server.
- **Phase 2, Claude drafting the build (DDR-003):** a CSS `display` rule that overrode the `hidden` attribute, so an empty photo preview showed as a broken image; a schema that drifted from the ARCHITECTURE.md draft (no `sessions` table there) until the two were reconciled; colors picked without STYLE.md, which failed WCAG 1.4.11 on input borders.
**So:** run the app and look at it, not just the diff, and compare schema, tokens, and field names against the team files. (All four members, plus this build)

## Merge Record

- **Merged:** all four members had a "fetch with the failure shown on the page" entry. Semaj's version is kept because it separates network failures from failed responses and shows the server's message verbatim, which is stricter. The "Because" line now points at this app instead of each member's HW5 ADR-002.
- **Merged:** the "what to paste" entries (all four) and Aashi's one-line-prompt entry were combined into one entry; Semaj's numbered prohibition list was added because it is stricter than a goal-only prompt.
- **Merged:** the "check first" lists were combined into one ordered list; Semaj's storage and `package.json` checks and Giancarlo's field-name check were added to the shared diff, SQL, and token checks.
- **Merged:** the "reliably wrong" notes from all four were combined, and a Phase 2 line was added from DDR-003 so the file reflects this build, not only HW5.
- Rishika's "category before submit" and Giancarlo's "add a field end to end" had no overlap with anyone else's and were kept as written, with HW5-only details removed.
