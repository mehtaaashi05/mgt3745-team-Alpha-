# ARCHITECTURE.md

Status: ACTIVE. Accountable: Giancarlo (Architect); completed by Aashi Mehta as acting architect because the assigned architect is a silent member and the team proceeded without him. This file is the architecture record for the team problem selected in `docs/DACI-001.md`.

## The Gate: Build, Buy, or Delegate

### Weights (committed before scores)

| Criterion | Weight (1-5) | Why this weight |
|---|---:|---|
| Need: is the capability central to the team outcome? | 5 | This decision is about the team's core product behavior, so the architecture must serve the user need directly. |
| Speed to a credible demo in three weeks | 5 | Phase 1 and Phase 2 are time-boxed, so a lightweight delivery path is essential. |
| Team fit and maintainability | 4 | The team has a small, distributed group and needs a simple architecture we can all understand and review. |
| Data and compliance risk | 4 | Browser-to-server data movement must be explicit, limited, and easy to explain. |
| Switching cost from prior course work | 3 | We are taking the course stack seriously and using prior experience to keep the architecture simpler and less risky. |

### Scores

| Option | Build in-house MVP | Buy managed service | Delegate to external provider |
|---|---:|---:|---:|
| Need: solve the actual team problem | 5 | 3 | 2 |
| Speed to demo | 5 | 4 | 3 |
| Team skill fit | 5 | 4 | 2 |
| Data/compliance risk | 4 | 4 | 3 |
| Switching cost | 4 | 3 | 2 |
| Weighted total | 90 | 72 | 48 |

### Decision

The team should build the core experience in a browser-first app and buy managed server-side services only where the course or product requires them. The project will delegate only the infrastructure boundaries (hosting, database, and external API calls) that are not the product's core logic. This keeps the core product in our control while avoiding a custom server stack the team cannot sustain in three weeks.

## ADR-001: Browser-first app with a minimal managed backend

- **Status:** Accepted. Approver: Aashi Mehta.

### Context

The team needs a solution that can be built within the course time box, can be reviewed by a small team, and does not expose credentials or private user data in the repository. The critical crossing is user input and generated output leaving the browser, moving to a vendor-managed server or database service under the vendor's terms, and then being stored or processed before being returned to the browser. This crossing must be named, limited, and accountable. The accountable owner for that boundary is Aashi Mehta, Implementer, with the Specifier owning feature intent and the Architect owning the design decision.

### Decision Drivers

- Keep the user-visible experience in the browser for fast iteration.
- Use a managed server or database only for the necessary persistence and API boundaries.
- Keep the repository credential-free and avoid storing secrets or personal data.
- Make the architecture easy to explain in a short review and easy to maintain by a student team.

### Options Considered

1. Build the entire product as a single browser-only app with local storage or a local mock store.
2. Build a lightweight browser app with a managed backend service for data storage and API calls.
3. Delegate the core product logic to a third-party SaaS provider and only build a thin wrapper.

### Decision

Use a browser-first application with a small server-side boundary for persistence and vendor-managed processing. In the course context, the likely crossing is browser-to-Cloudflare Worker or similar managed runtime; the Worker calls a managed database (for example D1/SQLite-like persistence) and returns only the minimal data needed to render the interface. No secret or credential lives in the repository, and the trust boundary is explicitly documented in `context/TOOLS.md` and `docs/DDR-001.md`.

### Consequences

- The team gains a straightforward build path and a clearer separation between client behavior and backend persistence.
- Data handling becomes more explicit, which improves reviewability and auditability.
- A managed vendor introduces operational constraints, vendor terms, and a harder-to-avoid dependency for the storage boundary.
- Some product behaviors become slower to change because any schema or API contract update must be coordinated across the browser and server boundary.
- A smaller backend means that some policy and data-processing decisions become less flexible than a fully custom app.

### Revisit Trigger

This ADR should be revisited if the team adds a data-retention requirement, user accounts, external vendor APIs beyond the original scope, or a platform requirement that makes the cloud boundary materially different from the current browser-first architecture.

## Architecture Diagram

```mermaid
flowchart LR
    U[User Browser] --> UI[Web UI / DOM]
    UI --> V[Validation and client-side state]
    V --> P[Cloudflare Worker or managed API boundary]
    P --> D[(Managed database / persistence)]
    P --> E[External service call if required]
    D --> P
    P --> UI
```

This diagram matches ADR-001: the browser remains the primary experience, while the managed boundary is explicitly treated as the only place where data crosses out of the browser and into vendor infrastructure.
