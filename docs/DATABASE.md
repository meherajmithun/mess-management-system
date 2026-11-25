# Database design

`Mess` owns `Membership`, `Room`, `Period`, `UtilityCategory`, `FundEntry` and `AuditLog`. `User` can have memberships and expiring sessions. Effective dated room rent and assignments permit historical occupancy modeling. `LedgerEntry` is a signed account entry with unique `sourceKey`, scoped to member, category and period. `FundEntry` is a separate grocery cash movement with unique `sourceKey`. `Statement` captures a period revision snapshot per member and account category.

The current initial migration is `backend/prisma/migrations/20261125000000_initial/migration.sql`. It was generated from `schema.prisma` and applied successfully to a temporary PostgreSQL 16 instance. Cross-table mess consistency and several domain check constraints still need stronger database enforcement; the application currently validates many of them in services.
