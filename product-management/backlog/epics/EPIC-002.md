# EPIC-002: Task Lifecycle Management
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z

## Summary
Authenticated users can create, view, update, and delete tasks with category and timeframe metadata. This is the core value proposition of TaskFlow — organizing life by context and time horizon.

## Business Value
Without task management, TaskFlow is just an auth system. This epic delivers the primary reason users sign up: a structured, context-aware place to manage their tasks.

**Source**: BRD.md BR-002 (HIGH), BR-003 (HIGH), PRD.md EPIC-002, business-case.md: "context-aware task management"

## Scope
- Create task (title, category: PERSONAL|PROFESSIONAL, timeframe: DAILY|WEEKLY|MONTHLY, status: TODO)
- View task list (all tasks for authenticated user)
- Update task status (TODO → IN_PROGRESS → DONE)
- Edit task title, category, timeframe
- Delete task (permanent)

## Out of Scope (This Epic)
- Time-horizon dashboard views (EPIC-003)
- Context filtering toggle (EPIC-004)
- Task sorting/search (backlog, future)

## Sprint Assignment
- **Sprint 1**: STORY-004 (Create + View Tasks), STORY-005 (Update Status + Delete)
- **Sprint 2**: Full task editing, bulk operations

## Acceptance Criteria (Epic-level)
- All high-priority BRD task requirements (BR-002, BR-003) implemented and tested
- Tasks are user-scoped — user A cannot see user B's tasks
- All CRUD operations return <500ms P95
- Test coverage ≥80% on all task code
- Traceability matrix shows BR-002, BR-003 → code → test: GREEN

## Traceability
| Requirement | Source |
|------------|--------|
| BR-002: Task Creation | BRD.md |
| BR-003: Task Management | BRD.md |
| EPIC-002: Task Lifecycle | PRD.md |
| Task schema (category, timeframe, status ENUMs) | TDD.md |
| UUID primary keys + user_id FK | TDD.md |
| Indexes on user_id, timeframe, category | SDD.md, TDD.md |

## Status
ACTIVE — Sprint 1 in progress
