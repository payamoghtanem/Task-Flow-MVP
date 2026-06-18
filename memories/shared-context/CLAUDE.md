# Shared Sprint Context

## Role
Read-only reference for all agents during sprint execution. Contains current sprint state that all agents need.

## Write Authority
Orchestrator (01) + Scrum Master (03) ONLY.

## Files in This Directory
- `sprint-goals.md` — Current sprint goal, velocity, capacity
- `api-contracts.md` — Active API contracts agents must respect
- `active-blockers.md` — Current blockers summary
- `standup-log.md` — Aggregated daily standups
- `retro-data-sprint-N.md` — Sprint retro data (written at sprint end)

## Reset Policy
Reset at start of each new sprint. Previous sprint data archived to `memories/archive/sprint-N/`.

## Constraints
- ALL agents have read access
- ONLY Orchestrator (01) and Scrum Master (03) may write
- Files are the source of truth for current sprint state
