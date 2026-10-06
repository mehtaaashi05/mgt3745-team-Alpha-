# TOOLS.md

Draft by Aashi Mehta, Implementer. The team has not yet confirmed its Phase 2
services or named the Specifier. The bolt.new probe is required but has not
been run. Never put credentials in this file or elsewhere in the repository.

| Service | Trusted with | Credentials live | Crossing statement | Switching cost |
|---|---|---|---|---|
| GitHub | This public repository, its source files, pull requests, reviews, and commit history | Each member's GitHub account; no credentials in the repository | Everything committed to this repository, including drafts and review comments, is stored by GitHub in a public repository. The team is accountable for its contents, and Aashi Mehta is accountable for repository settings as Implementer. | Low: clone the repository and move collaboration to another Git host |
| GitHub Copilot in VS Code | Project-document context and prompts supplied for drafting this Implementer documentation | Individual GitHub accounts; no credentials in the repository | Repository-document context and prompts supplied for this drafting assistance are sent to GitHub Copilot. Aashi Mehta is accountable for what is supplied and for reviewing all suggestions before use. | Low: turn it off and edit the documents directly |
| bolt.new and StackBlitz | The team's `context/FEATURES.md` and the single specification-probe prompt; actual input is pending | The Specifier's StackBlitz account; no credentials in the repository | The Specifier will send the agreed `FEATURES.md` and one prompt to bolt.new, operated by StackBlitz, for the required probe. The team's Specifier is accountable for the submitted material and review of the result; the Specifier has not yet been identified, and the probe has not been run. | Low: document assumptions and exclusions manually without using generated code |

Add a row before the team uses another external service. Update the bolt.new
row and `docs/DDR-001.md` after the probe with the actual input, date, and
accountable Specifier. Add Cloudflare, D1, Wrangler, or other product services
only if the team selects them for Phase 2.
