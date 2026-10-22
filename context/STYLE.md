---
# Tokens: what a machine reads. Every token is a CSS custom property of the
# same name on :root in public/styles.css, and the stylesheet uses the names,
# never the raw values, so this file and the code agree.
color-primary: "#123552"
color-on-primary: "#FFFFFF"
color-text: "#172B40"
color-muted: "#46586B"
color-background: "#F7F9FB"
color-surface: "#FFFFFF"
color-focus: "#B16D00"
color-error: "#922020"
color-success: "#1D4D2B"
color-border: "#526578"
color-divider: "#B8C5D0"
font-body: "Arial, Helvetica, sans-serif"
font-heading: "Georgia, 'Times New Roman', serif"
font-size-min: 16px
space-unit: 8px
radius: 4px
target-min: 44px
measure-max: 44rem
---

# STYLE.md

Status: ACTIVE for Phase 2. Accountable: Giancarlo Martinez-Saldana, Phase 2 Implementer. Merged from all four members' HW5 versions (Aashi, Giancarlo, Rishika, Semaj). Where two rules conflicted, the stricter one was kept; each choice is marked **Merged:** in the Merge Record.

Tokens above, rationale below. One sentence per token.

## Rationale

- **color-primary** (`#123552`): a dark navy reserved for the main action on each screen (Sign up, Create trip, Add moment), so the one thing a member came to do is the one thing that draws the eye.
- **color-on-primary** (`#FFFFFF`): white text on primary buttons at 12.68:1, because a button that is hard to read is a button that gets mis-tapped.
- **color-text** (`#172B40`): near-black blue that matches the primary and keeps 13.67:1 on the page background, readable on a phone in daylight, which is where members add moments.
- **color-muted** (`#46586B`): timestamps and helper text sit one step back from names and notes, still at 6.94:1, so the hierarchy is visual rather than a contrast sacrifice.
- **color-background** (`#F7F9FB`): a cool off-white page so a long trip doesn't glare, while photos sit on white cards and stay the loudest thing on screen.
- **color-surface** (`#FFFFFF`): white cards and inputs, so the places you read and type stand apart from the page and photos never compete with tinted chrome.
- **color-focus** (`#B16D00`): an ochre used only for keyboard focus outlines, unlike every other color here, so a keyboard user always knows where they are.
- **color-error** (`#922020`): dark red for failure messages only, never decoration, so red on this app always means "that was not saved."
- **color-success** (`#1D4D2B`): dark green at similar weight to the error color, so a confirmation and a refusal carry equal importance.
- **color-border** (`#526578`): input and secondary-button edges at 6.01:1 on white, so fields are findable by people with low vision (WCAG 1.4.11).
- **color-divider** (`#B8C5D0`): the line between moments and trips; decorative only, never the only thing separating two controls.
- **font-body**: one system sans-serif stack that is already on every device, so text renders the same on a phone, a Codespace, and a grader's browser with no download.
- **font-heading**: Georgia, also already installed everywhere, gives trip names a travel-journal feel without loading a font file.
- **font-size-min** (`16px`): nothing smaller than the browser default, including timestamps and helper text, because members read this on phones.
- **space-unit** (`8px`): all padding and margins are multiples of 8px, so nothing is eyeballed.
- **radius** (`4px`): one corner radius everywhere, slight enough to look tappable without looking like a toy.
- **target-min** (`44px`): every button, including Delete and Sign out, is at least 44px tall, so a destructive action is as easy to hit as a safe one.
- **measure-max** (`44rem`): content caps near 75 characters per line, because a trip is read like a journal before it is used like a tool.

## Contrast

Checked 2026-10-22 with the WCAG 2.x relative-luminance formula (the one the WebAIM Contrast Checker uses). AA needs 4.5:1 for text and 3:1 for UI components and focus indicators.

| Pair | Ratio | Needed | Result |
|---|---:|---:|---|
| color-on-primary on color-primary (buttons) | 12.68:1 | 4.5:1 | Pass (AAA) |
| color-text on color-background (body) | 13.67:1 | 4.5:1 | Pass (AAA) |
| color-text on color-surface (cards, inputs) | 14.42:1 | 4.5:1 | Pass (AAA) |
| color-primary on color-surface (headings, secondary buttons) | 12.68:1 | 4.5:1 | Pass (AAA) |
| color-muted on color-surface (timestamps) | 7.32:1 | 4.5:1 | Pass (AAA) |
| color-error on color-background (error message) | 8.12:1 | 4.5:1 | Pass (AAA) |
| color-success on color-background (confirmation) | 9.26:1 | 4.5:1 | Pass (AAA) |
| color-border on color-surface (input edge) | 6.01:1 | 3:1 | Pass |
| color-focus on color-background (focus ring) | 3.93:1 | 3:1 | Pass |
| color-focus on color-surface (focus ring on cards) | 4.15:1 | 3:1 | Pass |
| color-divider on color-surface (row line) | 1.76:1 | n/a | Decorative, exempt |

## Refusals

Things this interface will never do, and the Law of UX each would break (lawsofux.com).

1. **No color-only signaling.** Every error and confirmation is written in words in the announced status line. A red border alone says only *that* something failed, not *why*. Breaks WCAG 1.4.1, which this team treats as a design law. (Semaj)
2. **Delete is never smaller, fainter, or further away than Save, and never icon-only.** "Delete my moment" is a full-size, labelled button next to the moment it removes. Breaks **Fitts's Law**: hiding or shrinking the exit makes it slow on purpose. (Giancarlo, Semaj, Rishika)
3. **No modal interrupts an entry.** Errors appear inline in the status line, and a failed save keeps the photo, note, and place on screen (F3-2). Breaks **Jakob's Law** and user control: people expect a form to report problems in place. (Aashi, Giancarlo)
4. **No fonts, stylesheets, or scripts from another origin.** Every new origin would be a TOOLS.md row and a crossing; a typeface is not worth one. (Semaj)
5. **No autoplay, countdowns, or decorative animation.** A trip record should not compete for attention while someone is reading it. Breaks the **Doherty Threshold** and adds cognitive load. (Giancarlo, Aashi)
6. **No sidebars or layouts that rearrange themselves.** One column, the same order on every screen. Breaks **Hick's Law** and **Jakob's Law**. (Rishika)

## Sources

- **Admired:** GOV.UK forms for direct labels and restrained spacing (Aashi); Instagram's feed, where a plain white canvas keeps every photo the loudest thing on the page (Rishika); Bandcamp's single accent color and generous line length (Semaj); iPhone Settings → Subscriptions, a calm list with nothing moving (Giancarlo).
- **Resented:** streaming home screens with autoplaying previews (Giancarlo); notification-heavy social feeds (Aashi); Apple Music's icon-only destructive menus (Semaj); Reddit's cluttered sidebars (Rishika).

## Merge Record

- **Merged:** `color-primary` `#123552` (Giancarlo, Semaj) over `#051E39` (Aashi) and `#DD2A7B` (Rishika). Rishika's pink measured 4.47:1 on white, under the 4.5:1 text minimum; the navy passes at 12.68:1 and two members already shared it.
- **Merged:** `color-text` `#172B40` (Giancarlo, Semaj) over `#1A1A1A` (Aashi, Rishika). Both pass; the navy-black matches the primary.
- **Merged:** `color-background` `#F7F9FB` page with `#FFFFFF` cards keeps Giancarlo and Semaj's off-white and Aashi and Rishika's white, with photos on white cards as Rishika's rationale asked.
- **Merged:** one accent, `color-focus` `#B16D00`, restricted to focus outlines (Giancarlo, Semaj). Aashi's gold `#B39051` (2.99:1) and Rishika's green `#00C853` (2.24:1) both fail as text; the stricter rule is to have no text-capable accent at all.
- **Merged:** `color-error` `#922020` (Giancarlo, Semaj, 8.12:1) over `#A02020` (Aashi); the darker red has more contrast.
- **Merged:** `font-size-min` 16px (Giancarlo) over 14px (Aashi, Rishika, Semaj); the larger minimum is stricter.
- **Merged:** `font-body` system Arial stack (Giancarlo, Semaj, Aashi) over Roboto (Rishika), because Roboto would need a download and Semaj's refusal 4 forbids another origin. Rishika's Georgia headings are kept, since Georgia is already installed.
- **Merged:** `radius` 4px (Aashi, Rishika, Semaj) over 0.3rem (Giancarlo); `space-unit` 8px was common to three members.
- **Merged:** `color-border` (Giancarlo) and `color-muted`, `color-success`, `measure-max`, `target-min` (Semaj) added; only one member had each, and none conflicted. Semaj's `color-chip` was left out because the app has no chips.
- **Merged:** HW5 image links (`docs/style-admired.png`, `docs/Instagram.md`, and others) were not carried over because those files are not in this repository.
- Applying this file changed `public/styles.css`: the Phase 2 draft's input borders measured 1.42:1, under the 3:1 that `color-border` requires, and the timestamps were below 16px.
