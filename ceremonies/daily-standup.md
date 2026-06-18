# Daily Standup — Ceremony Script v1.0

## Participants
All active agents + Scrum Master (03) [facilitator]

## Time Box
15 minutes HARD limit. Daily.

## Format
Each agent reports exactly 3 items (max 3 lines):
```
AGENT: [AGENT_SLUG]
1. DONE: [What was completed since last standup]
2. DOING: [What is in progress today]
3. BLOCKED: [Anything blocking — or NONE]
```

## Process
1. Each agent appends standup entry to `memories/shared-context/standup-log.md`
2. Scrum Master (03) reads all entries
3. For any BLOCKED entries:
   - Update `product-management/sprints/current/blockers.md`
   - Trigger Workflow 4 (Blocker Resolution) if new blocker
4. Velocity check: if >2 stories not moved in 48h → flag to Orchestrator (01)

## Output
Updated `memories/shared-context/standup-log.md`
Updated `artifacts/kanban-board.md` (task status column updates)
