# MessLedger implementation notes

`MessLedger_Proposal_v3.pdf` is the current specification. The earlier v2 proposal remains historical in Git. Use a TypeScript monorepo, React and Express, Prisma and PostgreSQL. Preserve all accounting and security rules. No Django, Python, Flutter or native app.

Financial amounts are integer paisa in application services and PostgreSQL `BIGINT` fields. A signed ledger entry is immutable. Every write is scoped to a mess and an open period. Never count an advance as expense or deduct an advance-funded purchase from fund cash twice. Members may read only their own finances. Run migrations and tests before considering release complete.
