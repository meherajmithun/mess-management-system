# Accounting rules

All persisted money is integer paisa (`BIGINT`). API amounts are decimal strings. `allocate` uses exact integer proportional allocation, floors each share and assigns leftover paisa by largest remainder, then stable member ID. No floating point participates in posting.

The `LedgerEntry` signed amount is positive for member payment or credit, negative for charge or refund. RENT, UTILITY and MEAL are separate balances. Posted entries use unique source keys and must be reversed with an audited counter-entry, never edited. `FundEntry` is separate from member accounts. Meal deposit adds fund cash; advance issue deducts cash but does not create grocery expense; advance-funded approved purchase consumes outstanding advance only. Direct approved purchase deducts cash. Returned advance adds cash. Personal spending awaits reimbursement.

Closing requires a confirmed calculation at the current period revision, no pending payment or purchase, and settled advances. It posts meal charges and statement snapshots in a serializable transaction. The proposal has additional requirements beyond this implementation; see `docs/IMPLEMENTATION_PLAN.md` and README for release status.
