# PROBE-001: bolt.new Specification Probe

| | |
|---|---|
| Date | 2026-10-07> |
| Accountable | Specifier |
| Responsible | bolt.new (one prompt, no follow-ups) |
| Input | context/FEATURES.md as of commit `features/rishikasikhakolli`, nothing else |
| Delegation record | docs/DDR-001.md |
| Code kept | None |

## What bolt Had to Guess

| # | What bolt assumed | Why it had to guess | Change to FEATURES.md |
|---|---|---|---|
| 1 | Sign-up requires an email address | F1-1 names a username and password but says nothing about how an account is recovered or contacted. | Revised F1-1: WHEN a person signs up with an email, a username, and a password, the app shall create an account and sign them in. |
| 2 | The main feed shows all shared trips, not just trips from followed people | F7-1 and F8-1 say shared trips appear on the main feed but never say who sees them. | New F8-3: The app shall show all shared trips on the main feed, with trips from followed people in a separate section. |
| 3 | A moment can be saved with any of photo, note, or place missing | F3-1 lists all three without saying whether each is required. | Revised F3-1: WHEN a member submits a moment with at least one of a photo, note, or place, the app shall add it to the trip, labeled with the member's name. New F3-3: IF a member submits a moment with no photo, note, or place, THEN the app shall refuse and add nothing. Revised F4-1 to show "whichever of photo, note, and place it has." |
| 4 | Trips have an optional cover photo and description | F2-1 only says a trip has a name. | New X6: Trip cover photos and descriptions. A trip has only a name in Phase 2. |
| 5 | A creator can unshare a shared trip | F9-2 refers to unshared trips, but no row says how a trip becomes unshared. | New F7-3: WHEN the trip's creator unshares a trip, the app shall make it private again and remove it from the main feed. |
| 6 | Invite links are tokens, and a trip can have several | F2-1 says "an invite link" without saying whether there is one or many. | New F2-3: The app shall give each trip one reusable invite link. |
