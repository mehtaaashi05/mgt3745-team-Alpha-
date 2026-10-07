# TOOLS.md

Accountable: Aashi Mehta, Implementer. Status: proposed tool register; team
approval and the Phase 2 hosting/data choices are pending. Do not put
credentials in this file or elsewhere in the repository.

| Service | Trusted with | Credentials live | Data crossing the boundary | Switching cost |
|---|---|---|---|---|
| GitHub | The project repository, source files, issues, pull requests, reviews, and commit history | Each member's own GitHub account; no credentials in the repository | The configured origin is `mehtaaashi05/mgt3745-team-Alpha-`. Committed material and collaboration activity are stored by GitHub. Aashi Mehta is the Implementer's contact for repository settings; team ownership and branch-protection status still need confirmation. | Low to moderate: clone the Git repository and move collaboration to another Git host. |
| GitHub Copilot in VS Code | Project files and prompts explicitly supplied for drafting or review | Each user's own GitHub account; no credentials in the repository | This drafting task supplied project documentation and the travel-review concept/standards to Copilot. Do not provide secrets or real-user private data. A human artifact owner must verify suggestions. Team approval and a RACI assignment for each use are pending. | Low: turn it off and continue editing directly. |
| bolt.new / StackBlitz | Only the approved `context/FEATURES.md` and one specification-probe prompt | The Specifier's own StackBlitz account; no credentials in the repository | The required probe has not been run. Before submission, the Specifier must check the service's terms, approve the exact input, and record the actual model/version, date, prompt, and any additional submitted data in `docs/DDR-001.md` and `docs/PROBE-001.md`. Do not keep generated code. | Low: document assumptions and exclusions manually without generated output. |

No hosting, database, analytics, image-hosting, or other product service has
been selected. The proposed first architecture is browser-only; it must not
send user reviews or photos to an unapproved service. Add a row and obtain the
team's approval before using another external service. Update this register
and the applicable DDR when a service is actually selected or used.
