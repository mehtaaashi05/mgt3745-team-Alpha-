# Alpha: A Group Trip Record

## What

A shared trip record: everyone on a group trip adds photos, notes, and places as they happen, so the group can find what happened, where, and who added it long after the trip ends.

## Team

| Member | Phase 1 | Phase 2 | Final |
|---|---|---|---|
| Semaj Johnson II | Reviewer | Specifier | Architect |
| Aashi Mehta | Implementer | Architect | Specifier |
| Rishika Sikhakolli | Specifier | Reviewer | Implementer |
| Giancarlo | Architect | Implementer | Reviewer |

Working agreement, RACI matrix, and rotation plan: [TEAM.md](TEAM.md).

## See It Work

**Live app:** https://alpha-trips.mgt3745-hw4-giancarlo.workers.dev

**Try it with a demo account** (synthetic data only): sign in as `bea_s` with password `alpha-demo-pass`, then open [Lisbon spring break](https://alpha-trips.mgt3745-hw4-giancarlo.workers.dev/#/trip/1) to see moments from three members in the order they were added.

![The Lisbon spring break trip on the live app, signed in as the demo account bea_s: the trip's three members, and the Add a moment form refusing an empty moment with "Add a photo, a note, or a place." (F3-3)](docs/img/see-it-work.png)

**Run it locally:** `npm install`, then `npm run db:local`, then `npm run dev`, and open http://localhost:8787.

**Run the code evals:** `npm test`

## Status

Phase 1 decided four things: which problem to build (DACI-001), what to build (FEATURES.md), where it runs (ADR-001), and what would prove it works (EVALS.md). Phase 2 builds F1 (Accounts), F2 (Creating a trip and inviting members), F3 (Add a moment to a trip), and F4 (Trip view with who added what) first, because the riskiest assumption lives in these.

### Phase 2 Build Status

Deployed 2026-10-20 on Cloudflare Workers and D1, as ADR-001 decided, from Giancarlo's Cloudflare account (TOOLS.md).

| Feature | EARS rows | Manual check ([DDR-003](docs/DDR-003.md)) | Code eval (`npm test`) |
|---|---|---|---|
| F1 Accounts | F1-1, F1-2 | Pass | Pending |
| F2 Create a trip and invite members | F2-1, F2-2, F2-3 | Pass | Pending |
| F3 Add a moment to a trip | F3-1, F3-2, F3-3 | Pass | Pending |
| F4 Trip view with who added what | F4-1, F4-2 | Pass | Pending |

Performance and Attractive features (F5 to F8) are not built yet.


## Links, in Reading Order

1. [TEAM.md](TEAM.md): who owns what
2. [docs/DACI-001.md](docs/DACI-001.md): why this problem
3. [context/PROJECT.md](context/PROJECT.md): the problem, reframed
4. [context/USERS.md](context/USERS.md): users and their jobs
5. [context/FEATURES.md](context/FEATURES.md): Kano and EARS
6. [docs/PROBE-001.md](docs/PROBE-001.md): what bolt.new had to guess
7. [context/ARCHITECTURE.md](context/ARCHITECTURE.md): the Gate, ADR-001, the diagram
8. [context/EVALS.md](context/EVALS.md): the tree, the RAT, every member's stake
9. [context/CLAUDE.md](context/CLAUDE.md), [context/STANDARDS.md](context/STANDARDS.md), [context/TOOLS.md](context/TOOLS.md): how we work
10. [docs/DDR-001.md](docs/DDR-001.md): the probe delegation
11. [docs/DDR-002.md](docs/DDR-002.md): Copilot drafting the merged STANDARDS.md
12. [docs/DDR-003.md](docs/DDR-003.md): Claude drafting the Phase 2 Worker, D1 schema, seed data, and pages
13. Code: [src/worker.js](src/worker.js) (API), [public/](public/) (pages), [db/schema.sql](db/schema.sql) and [db/seed.sql](db/seed.sql) (D1), [wrangler.toml](wrangler.toml) (deployment)
14. Previews: [STYLE.md](context/STYLE.md), [SKILLS.md](context/SKILLS.md), [AGENTS.md](context/AGENTS.md)

## AI Use

In Phase 1, AI tools were Responsible for one task (the bolt.new specification probe, DDR-001) and Consulted on 4 (drafting and critiquing of PROJECT.md, FEATURES.md, ARCHITECTURE.md, README.md, STANDARDS.md, TOOLS.md, and CLAUDE.md). No AI output was committed without a named reviewer. Nothing bolt.new generated is in this repository.

In Phase 2, Claude was Responsible for drafting the Worker, D1 schema, seed data, and pages ([DDR-003](docs/DDR-003.md)); Giancarlo is Accountable and verified every Must-be EARS row before committing. Copilot's drafting of STANDARDS.md is recorded in [DDR-002](docs/DDR-002.md).
