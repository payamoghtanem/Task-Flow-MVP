# Sprint Planning — Ceremony Script v1.0

## Participants
Scrum Master (03) [facilitator], Product Owner (02), Router (00)

## Time Box
Max 2 hours. Every sprint start.

## Inputs
- READY stories from backlog
- Velocity history in `memories/shared-context/sprint-goals.md`
- `agents/00_ROUTER/model-mapping.yaml`

## Agenda

### 1. Sprint Goal Definition (20 min)
- PO proposes sprint goal (one sentence describing the sprint's value)
- SM validates: achievable within capacity?
- Sprint goal written to `memories/shared-context/sprint-goals.md`

### 2. Story Selection (30 min)
- Pull READY stories from backlog top
- SM calculates capacity: historical velocity × focus factor (0.7)
- Stories selected until capacity reached
- PO confirms priority order

### 3. Technical Decomposition (40 min)
- Router (00) decomposes each story into technical tasks
- Each task gets: agent assignment, estimated effort, dependencies
- Tasks written to `product-management/sprints/current/tasks.md`

### 4. Commitment Confirmation (20 min)
- SM reads back sprint commitment (goal + stories + tasks)
- PO confirms: this delivers the sprint goal?
- Confirm: zero stories without Gherkin ACs in commitment

### 5. Kanban Setup (10 min)
- All sprint tasks entered in `artifacts/kanban-board.md` → BACKLOG column
- `product-management/sprints/current/blockers.md` cleared

## Output
- `product-management/sprints/current/tasks.md` (finalized)
- `memories/shared-context/sprint-goals.md` (sprint goal + capacity)
- `artifacts/kanban-board.md` (populated)
