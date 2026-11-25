# MessLedger

MessLedger is a work in progress TypeScript monorepo for a Bangladeshi bachelor mess. The current product specification is [MessLedger_Proposal_v3.pdf](MessLedger_Proposal_v3.pdf); the v2 proposal remains historical in Git. The current implementation is **not deployment ready**: see the gap list below before using it with real money.

## Implemented in this iteration

- PostgreSQL schema and initial migration for messes, users, sessions, rooms, periods, utilities, three account ledger categories, meals, bazar assignments, advances, purchases, fund entries, statements and audit.
- Exact integer paisa allocation, signed account/fund entries, session login with Argon2id, CSRF checks, rate limited login, role and mess scoped API routes.
- API routes for payment submission/review, room creation/assignment, utility posting, meal summary/daily entry, bazar assignments, advances/returns, purchase submission/review, meal calculation confirmation and period close.
- Responsive React shell with role-aware navigation, dashboard, payment workflow, basic record views, English/Bangla translations, PWA manifest and app-shell service worker.
- Fictional eight-member seed, unit tests and one PostgreSQL-backed integration test.

## Critical gaps before release

The current app does **not** satisfy the full proposal. Rent allocation posting and proration, vacancy handling, utility member-day proration, detailed meal completeness and mode transitions, physical meal-sheet PDFs, grocery mixed funding and reimbursements, refunds and reversals, close/reopen revision flow, CSV/PDF statements, secure file uploads, invitations/password reset, advanced tables/charts, complete bilingual copy, and comprehensive E2E/security testing remain. Personal purchase liability and manager top-ups have schema concepts but incomplete services. Period closing needs additional reconciliation gates and opening snapshot logic. Do not use this build for actual financial settlement.

The dependency audit currently reports five production dependency advisories, including Prisma tooling and i18next. These need review and remediation before deployment.

## Local setup

Requirements: Node 22+, npm 10+, Docker Compose and PostgreSQL 16. No production credentials are bundled.

```sh
docker compose -f infra/compose.yml up -d
cp backend/.env.example backend/.env
npm ci
npm run db:generate
npm run db:migrate
DEMO_PASSWORD='choose-a-unique-development-password' npm run db:seed
npm run dev
```

Open `http://localhost:5173`. The fictional manager phone is `01700000000`; fictional member phones are `01700000001` through `01700000007`. All use the `DEMO_PASSWORD` supplied during seeding. Do not expose the development database or dev server on a public network. The Vite server listens on all interfaces for local phone testing; use your machine's LAN address and trusted Wi-Fi only.

`backend/.env` is loaded when the server is started with your shell environment or an environment loader. For example, from `backend`, `set -a; source .env; set +a; npm run dev`. The root `npm run dev` starts both workspaces after environment variables are loaded.

## Checks

```sh
npm run typecheck
npm test
npm run build
```

Set `TEST_DATABASE_URL` and `DATABASE_URL` to an isolated seeded PostgreSQL database plus `DEMO_PASSWORD` to run the backend integration test. Without `TEST_DATABASE_URL`, the integration test is skipped. Never target a production database for tests.

## Production notes

Serve frontend and API under the same HTTPS origin. Set `NODE_ENV=production`, a private PostgreSQL URL and allowed hosts at the reverse proxy. Apply migrations with `npx prisma migrate deploy` before starting `backend/dist/server.js`. Back up PostgreSQL with `pg_dump` and verify a `pg_restore` into a separate database. This implementation requires the critical gaps above to be closed and security reviewed before public deployment.
