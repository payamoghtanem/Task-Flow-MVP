# Memory Architecture

## Three-Tier Memory System

### Tier 1 — Agent Local Memory
**Path**: `agents/[SLUG]/memory/`
**Scope**: Ephemeral sprint context, recent decisions, active ticket state
**Written by**: Own agent ONLY
**Read by**: Own agent only (never loaded into other agents' context)
**Pruned by**: Lesson Learner (21) after each sprint
**Hard limit**: ≤200 lines per file
**Never contains**: PII, credentials, secrets
**Format**: Append-only markdown log with ISO-8601 timestamps

### Tier 2 — Shared Sprint Context
**Path**: `memories/shared-context/`
**Scope**: Current sprint goals, architecture diagrams, API contracts, standards versions, active blockers
**Written by**: Orchestrator (01) + Scrum Master (03) ONLY
**Read by**: ALL agents (read-only during sprint execution)
**Reset**: At start of each new sprint by Orchestrator (01)
**Files**: `sprint-goals.md`, `api-contracts.md`, `active-blockers.md`, `standup-log.md`

### Tier 3 — Organizational Learning
**Path**: `memories/central-lessons-learned/`
**Scope**: Lessons learned, patterns, best practices, failure analysis, improvement actions
**Written by**: Lesson Learner (21) ONLY — append-only
**Read by**: Router (00) injects historical constraints into future dispatches; ALL agents may read
**Indexed by**: Sprint, Pattern Category, Standards Reference
**Never deleted**: Archive old entries to `archive/` — never overwrite

## Memory Rules for ALL Agents
1. Load own local memory at session start
2. Write updates to local memory before session end
3. Never load another agent's memory directly
4. Never write to `memories/shared-context/` (except Orchestrator + Scrum Master)
5. Route lessons to Lesson Learner (21) via structured handoff packet
6. Memory files are NOT committed to git — they are runtime state
