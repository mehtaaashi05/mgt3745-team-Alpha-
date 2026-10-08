# TOOLS.md

One row per external service. No credentials in this file, ever.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| GitHub | All files and commit history; each member's access token | Each member's GitHub account | Everything in this repository, including every draft and review comment, is stored by GitHub (Microsoft) in a public repository. The team is accountable, and Aashi answers for its settings. | Low: git clone anywhere |
| GitHub Copilot (Codespaces) | Repository contents as context for suggestions | Each member's GitHub account | Any file open in the editor may be sent to Copilot as context, so nothing sensitive is ever in the repository. Each member is accountable for what Copilot sees in their session. | Low: turn it off |
| Claude (chat) | Context files pasted for critique | Each member's own Anthropic account | Only files from /context and /docs are pasted into Claude, by the member doing the pasting, who is accountable for what they paste. | Low: stop using it |
| bolt.new and StackBlitz | FEATURES.md for the specification probe | Rishika's StackBlitz account | FEATURES.md crossed to bolt.new and StackBlitz on 2026-10-06 for the probe; no customer data, synthetic or otherwise, was included. Rishika is accountable. | Low: output is not kept in the repository |
| Cloudflare Workers and D1 (Phase 2, planned) | User-entered place data, synthetic reviews, and request metadata including IP addresses | Aashi's Cloudflare account; wrangler token in their codespace | Place entries typed into the field and the review list will be stored on D1 under Cloudflare's free-tier terms, in a region we do not choose. Aashi is accountable until rotation. | Medium: export with wrangler d1 export, rewrite one Worker |
| wrangler (npm) | Deploy access to the Cloudflare account | Token inside the codespace | An npm package maintained by Cloudflare runs with deploy rights to our account. The Implementer is accountable for its version and configuration. | Low: replaceable by the Cloudflare dashboard |
