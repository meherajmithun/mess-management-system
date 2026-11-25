# API status

Base path: `/api/v1`. All state-changing requests require the `csrf` cookie and matching `x-csrf-token` header; obtain it from `GET /auth/csrf`. Sessions use an HttpOnly `sid` cookie. `POST /auth/login` and `POST /auth/logout` create and revoke sessions.

Authenticated reads: `GET /auth/me`, `/overview`, `/periods`, `/payments`, `/statements`, `/rooms`, `/utilities`, `/meal?periodId=...`, `/bazar`. Managers can also read `/members`, `/audit` and `/meal/calculation?periodId=...`.

Writes implemented: `POST /periods`, `/payments`, `/payments/:id/review`, `/rooms`, `/rooms/:id/assign`, `/rent/flat`, `/rooms/:id/rent`, `/rent/post`, `/utilities`, `/meal/summary`, `/meal/daily`, `/bazar/assignments`, `/bazar/advances`, `/bazar/advances/:id/return`, `/bazar/purchases`, `/bazar/purchases/:id/review`, `/periods/:id/confirm-calculation`, `/periods/:id/close`. `GET /rent/preview?periodId=...` previews prorated room rent. Posting blocks vacant days until a resolution workflow is implemented.

Amounts are decimal strings in BDT. Dates use ISO `YYYY-MM-DD`; months use `YYYY-MM`. Errors return `{ "error": "..." }`, with `fields` for Zod validation errors. Pending member payment/purchase submissions do not affect official balances until manager approval.
