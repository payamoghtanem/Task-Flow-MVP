# STORY-005: Update Task Status & Delete Tasks
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z
# Epic: EPIC-002
# Sprint: 1 | Story Points: 8 | Priority: P1 (HIGH — from BRD BR-003)

## User Story
As a **logged-in user**, I want to **update my task status and permanently delete tasks**, so that **I can track progress through my work and keep my task list clean and relevant**.

## INVEST Check
- **I**ndependent: Depends on STORY-004 (tasks must exist to update/delete)
- **N**egotiable: Status enum (TODO→IN_PROGRESS→DONE) fixed by BR-003 + TDD.md; delete is permanent per BR-003
- **V**aluable: Without status updates, tasks are just static notes — no progress tracking
- **E**stimable: 8 SP (PATCH + DELETE API + frontend status toggle + delete button + tests)
- **S**mall: Scoped to Update status + Delete (edit title/category/timeframe is Sprint 2)
- **T**estable: All scenarios below are binary pass/fail

## Acceptance Criteria

### Scenario 1: User updates task status to IN_PROGRESS
```gherkin
Given a logged-in user has a task with id "<uuid>" and status "TODO"
When they click the "Start" button on the task card
Then the frontend sends PATCH /api/tasks/<uuid> with body: { "status": "IN_PROGRESS" }
And the backend updates the task record's status to "IN_PROGRESS"
And updates the updated_at field to the current ISO-8601 UTC timestamp
And returns HTTP 200 with JSON body: { "success": true, "data": { "id": "<uuid>", "status": "IN_PROGRESS", "updated_at": "<ISO-8601>" } }
And the task card in the UI immediately reflects the new status without page reload
```

### Scenario 2: User marks task as DONE
```gherkin
Given a logged-in user has a task with status "IN_PROGRESS"
When they click the "Mark Done" button on the task card
Then the backend updates the task status to "DONE"
And returns HTTP 200 with the updated task data
And the task card shows a visual "Done" indicator (e.g., strikethrough or green checkmark)
```

### Scenario 3: Invalid status transition rejected
```gherkin
Given a logged-in user sends PATCH /api/tasks/<uuid> with body: { "status": "INVALID_STATUS" }
When the backend validates the request
Then it returns HTTP 400 with JSON body: { "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Status must be TODO, IN_PROGRESS, or DONE" } }
And the task record is not modified
```

### Scenario 4: User cannot update another user's task status
```gherkin
Given user Alice owns task with id "<task-uuid>"
And user Bob is logged in with a valid JWT
When Bob sends PATCH /api/tasks/<task-uuid> with Bob's JWT
Then the backend returns HTTP 403 with JSON body: { "success": false, "error": { "code": "FORBIDDEN", "message": "You do not have permission to modify this task" } }
And Alice's task status is not changed
```

### Scenario 5: User deletes a task
```gherkin
Given a logged-in user has a task with id "<uuid>"
When they click the "Delete" button and confirm the deletion
Then the frontend sends DELETE /api/tasks/<uuid> with the user's JWT
And the backend permanently removes the task record from the database
And returns HTTP 200 with JSON body: { "success": true, "data": { "message": "Task deleted successfully" } }
And the task is immediately removed from the task list in the UI without page reload
```

### Scenario 6: Deleting a non-existent task returns 404
```gherkin
Given a logged-in user sends DELETE /api/tasks/<nonexistent-uuid>
When the backend processes the request
Then it returns HTTP 404 with JSON body: { "success": false, "error": { "code": "NOT_FOUND", "message": "Task not found" } }
```

### Scenario 7: User cannot delete another user's task
```gherkin
Given user Alice owns task with id "<task-uuid>"
And user Bob is logged in with a valid JWT
When Bob sends DELETE /api/tasks/<task-uuid> with Bob's JWT
Then the backend returns HTTP 403 with JSON body: { "success": false, "error": { "code": "FORBIDDEN", "message": "You do not have permission to delete this task" } }
And Alice's task still exists in the database
```

### Scenario 8: Delete requires user confirmation
```gherkin
Given a logged-in user clicks the "Delete" button on a task
When the delete action is triggered in the UI
Then a confirmation dialog appears: "Are you sure you want to delete this task? This cannot be undone."
And the DELETE request is only sent if the user clicks "Confirm Delete"
And clicking "Cancel" dismisses the dialog without deleting the task
```

### Scenario 9: Task update API responds within performance target
```gherkin
Given a valid authenticated PATCH or DELETE /api/tasks/<uuid> request
When the server processes the request
Then the response is received within 500ms (P95)
```

## Technical Notes
- Endpoints: PATCH /api/tasks/:id (status update), DELETE /api/tasks/:id
- Authorization: jwt.sub (user_id) must match task.user_id — checked at service layer (SEC-007)
- Input validation: status value whitelist (SEC-003), parameterized SQL (SEC-004)
- updated_at: ISO-8601 UTC on every PATCH (LESSON-SPRINT-0-002)
- Frontend: status toggle buttons + delete button with confirmation modal on TaskCard component
- Standards: coding-standard v1.0, security-standards v1.0, api-design-standards v1.0

## Agent Assignment
- **Fullstack Developer (08)**: PATCH + DELETE API endpoints + frontend status toggle + delete with confirm

## Dependencies
- STORY-001 (scaffold + tasks schema)
- STORY-003 (auth middleware)
- STORY-004 (tasks must exist to update/delete)

## Definition of Ready
- [x] Gherkin ACs written and binary pass/fail
- [x] Estimated (8 SP)
- [x] Dependencies: STORY-001, STORY-003, STORY-004
- [x] Agent assigned: fullstack-developer
