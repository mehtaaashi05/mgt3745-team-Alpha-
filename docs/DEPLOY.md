# DEPLOY.md

Accountable: Semaj Johnson II, Phase 3 Architect. The deployed build and the Cloudflare account are the Implementer's (TOOLS.md); this file is the procedure, not the account.

Everything here was checked against the files on `main` on 2026-10-27. Where a step depends on an account rather than on the repository, it says so, because that is the step that breaks for anyone who is not the person who deployed it last.

## What Gets Deployed

One thing. `wrangler deploy` uploads a single Cloudflare Worker named `alpha-trips` that serves both the static pages and the API, bound to one D1 database named `alpha-db` (ADR-001). There is no file store, no second Worker, no build step, and no bundler. `public/` is uploaded as-is through the `ASSETS` binding.

| Piece | Where it lives | Binding |
|---|---|---|
| API and authorization | `src/worker.js` | none |
| Pages | `public/index.html`, `styles.css`, `app.js` | `ASSETS` |
| Database | `db/schema.sql`, `db/seed.sql` | `DB` → `alpha-db` |
| Deploy config | `wrangler.toml` | none |

## Prerequisites

| Requirement | Version | Why this version |
|---|---|---|
| Node.js | **22 or newer** | Set by the dependency, not by our code: `wrangler@^4.151.3` declares `engines: { "node": ">=22.0.0" }`, so nothing here deploys on an older Node. This file first recorded 22.7 for a different reason, which no longer applies. `evals/worker.test.js` uses `import` in a `.js` file, and before #108 `package.json` had no `"type": "module"`, so the evals ran only where automatic module-syntax detection is on by default, from 22.7. #108 added the field, which removes that constraint. The floor stands anyway because wrangler sets it higher. |
| wrangler | `^4.151.3` | Pinned in `package.json` as a devDependency. `npm install` is enough; do not install it globally, because a global wrangler can be a different major version than the config was written against. |
| A Cloudflare account | Free plan | Workers and D1 both fit the free plan at this size. |

`compatibility_date = "2026-10-01"` in `wrangler.toml` fixes the Workers runtime behavior. Leave it alone unless a change needs a newer runtime, and move it in the same pull request as that change.

## Deploying From a Clean Checkout

Steps 3 and 4 are the account-specific ones. Everything else is the same for anybody.

**1. Install.**

```
git clone https://github.com/mehtaaashi05/mgt3745-team-Alpha-.git
cd mgt3745-team-Alpha-
npm install
```

**2. Authenticate.**

```
npx wrangler login
```

This opens a browser and stores an OAuth token on *your* machine. On a headless machine or a Codespace it prints a URL to open instead, and the callback can take a minute to come back. That is normal, not a hang.

**3. Create your own D1 database, and put its id in `wrangler.toml`.** This is the step that stops a clean checkout from working, and the reason is worth understanding rather than copying past.

```
npx wrangler d1 create alpha-db
```

`wrangler.toml` currently carries `database_id = "2dc1093a-b345-4b24-a4a2-c4eec2be4efc"`, the database on Rishika's account, which deployed last on 2026-10-26. That id belongs to that account. It is an identifier and not a credential (STANDARDS.md), so it is committed on purpose, but **no other account can use it.** Deploying without replacing it either fails to find the database or silently binds to nothing. Paste the id the command above prints into the `[[d1_databases]]` block, and commit it in the same pull request that moves the deployment, so the file always describes the account that is actually serving.

**4. Create the schema and seed it.**

```
npm run db:remote
```

This runs `db/schema.sql` and then `db/seed.sql` against the live database.

> **This erases everything.** `db/schema.sql` opens with `DROP TABLE IF EXISTS` on all five tables, and `db/seed.sql` opens with `DELETE FROM` on all five. Run it to set a database up. Do not run it against a database that holds anything anyone wants to keep, including tester data from a validation session. For local work, `npm run db:local` does the same thing against a local SQLite file and touches nothing remote.

**5. Deploy.**

```
npm run deploy
```

Wrangler prints the live URL on success. It is `https://alpha-trips.<your-subdomain>.workers.dev`, which means **the URL changes when the account changes**, so README.md, the code-eval command in README.md, and the Cloudflare rows in TOOLS.md all have to move with it.

**6. Register a workers.dev subdomain, if the deploy asks.** On an account that has never deployed a Worker, the first `wrangler deploy` can succeed while the URL returns a 404 or "not found" until a workers.dev subdomain is registered for the account in the Cloudflare dashboard. A fresh Cloudflare account also has to have its email verified before any deploy is allowed; wrangler reports that as error code 10034 rather than in plain words.

## Secrets

**There are none, and that is a design outcome rather than an omission.**

No `wrangler secret put` has ever been run on this Worker, and there is nothing to run it on. The only two things `src/worker.js` reads from its environment are bindings, not values:

| Name | Kind | Where it lives |
|---|---|---|
| `DB` | D1 binding | `wrangler.toml` |
| `ASSETS` | Static-assets binding | `wrangler.toml` |

Those are the only `env.` references in the Worker. There is no API key, no signing secret, and no third-party token, because the Worker calls nothing outside Cloudflare.

Two things look like credentials and are not:

- **`database_id` in `wrangler.toml`** is an account-scoped identifier, not a secret (STANDARDS.md). It is useless without authenticated access to the account that owns it. See step 3 for why it still has to change per account.
- **The demo sign-in for the seeded accounts** is synthetic test data for three invented people on `example.com` addresses, and it is published in README.md and `db/seed.sql` on purpose so a grader can sign in. `db/seed.sql` stores PBKDF2-SHA256 hashes of it, never the password itself, in the same `pbkdf2$iterations$salt$hash` format the Worker writes for real sign-ups.

The one real credential in the system is **the wrangler OAuth token on the deploying member's own machine**, created by `wrangler login` and never in the repository. It is the whole deploy capability for the account, so it does not get shared, pasted into a chat, or committed. Moving the deployment to another member means that member runs `wrangler login` themselves; it never means copying a token.

## Model Configuration

**The project calls no model.** There is no AI Gateway, no Workers AI binding, no model proxy, and no outbound request of any kind from `src/worker.js`. Its only `fetch` calls are its own handler and `env.ASSETS.fetch(request)`, which is internal to the Worker. Nothing to configure, and nothing to rotate.

AI tools were used to *build* this project, which is a separate thing and is recorded in `context/TOOLS.md` and the DDRs in `docs/`. No model runs at request time.

## Verifying a Deploy

Run these in order. Each one fails differently, which is the point.

1. **The pages are served.** Open the live URL. A sign-in form means the `ASSETS` binding works. A 404 means step 6.
2. **The database is bound and seeded.** Sign in with the demo account from README.md and open the seeded trip. Moments from three members in added order means `DB` is bound and `npm run db:remote` ran. A sign-in that fails for a seeded account almost always means the schema exists but the seed did not run.
3. **The API behaves.** Run the four code evals against the deployed Worker:

```
API=https://alpha-trips.<your-subdomain>.workers.dev npm test
```

Expect four passing tests, one each for F1-2, F2-2, F3-3, and F4-2. These sign up throwaway accounts against the live database, so they leave rows behind by design: they use a timestamp to keep usernames unique so the suite can be run again. `fetch failed` on every test means `API` is wrong or unset, not that the Worker is broken.

4. **A photo round-trips.** Add a moment with a photo taken on a phone. ADR-002 is the only reason this works; if it fails, that ADR's revisit trigger is what to read.

## Moving the Deployment to Another Member's Account

**This has already been done once, and the procedure below is the record of it rather than a plan.** The deployment moved from Giancarlo's Cloudflare account to Rishika's on 2026-10-26, and the repository caught up when #108 merged on 2026-10-29. Every item was completed and verified on `main`; this is what a future move would repeat.

| Step | Done in the 2026-10-26 move |
|---|---|
| New owner runs steps 1 through 6 under their own account | Yes. Rishika ran `wrangler login`, `wrangler d1 create alpha-db`, `npm run db:remote`, `npm run deploy` |
| Replace `database_id` in `wrangler.toml` | Yes, `2dc1093a-b345-4b24-a4a2-c4eec2be4efc` |
| Update the live URL everywhere it appears: README.md See It Work, the code-eval command, the `evals/worker.test.js` header | Yes, all three now point at `alpha-trips.travlr.workers.dev` |
| Update the Cloudflare and wrangler rows in `context/TOOLS.md` with the accountable member and the date | Yes, Rishika accountable from 2026-10-26, previous owners kept in the row |
| Record the move in `context/ARCHITECTURE.md` | Yes, under "Resolved in Phase 3" |
| Re-run the verification above against the new URL | Yes, four code evals pass; the demo account and the seeded trip were confirmed by hand |

Two things a future move should know, both learned from this one. The repository changes belong in the **same pull request** as the deploy, because the README pointed at the new URL for a day while `wrangler.toml` still named the old database, and a clean checkout in that window would have deployed against the wrong account. And the old deployment keeps serving until its owner deletes the Worker, so decide in the pull request which URL is canonical rather than afterward.

## What This File Does Not Cover

- **Rollback.** There is none beyond `git revert` and redeploy. Wrangler keeps previous versions in the Cloudflare dashboard, but the team has never used them and this file will not pretend otherwise.
- **Migrations.** `db/schema.sql` is a create-from-scratch script, not a migration. Changing the schema on a database with data in it is unsolved here; `npm run db:remote` would erase it.
- **Custom domains, staging, and CI.** The project deploys straight to one workers.dev URL from a member's laptop. There is no staging environment and no deploy on merge.
