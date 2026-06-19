# STORY-004: Create & View Tasks
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z
# Epic: EPIC-002
# Sprint: 1 | Story Points: 8 | Priority: P1 (HIGH — from BRD BR-002)

## User Story
As a **logged-in user**, I want to **create tasks with a title, category, and timeframe, and view all my tasks**, so that **I can organize my personal and professional responsibilities in one place**.

## INVEST Check
- **I**ndependent: Depends on STORY-001 + STORY-003 (user must be authenticated)
- **N**egotiable: task fields (title, category, timeframe, status) fixed by BR-002 + TDD.md
- **V**aluable: First deliverable of product's core value — without this, there is no TaskFlow
- **E**stimable: 8 SP (POST + GET API + frontend create form + task list)
- **S**mall: Scoped to Create + Read only (Update/Delete in STORY-005)
- **T**estable: All scenarios below are binary pass/fail

## Acceptance Criteria

### Scenario 1: Authenticated user creates a task successfully
```gherkin
Given a logged-in user is on the /dashboard page
When they fill in the create task form with title "Buy groceries", category "PERSONAL", timeframe "DAILY"
And they click "Add Task"
Then the backend creates a new task record with:
  - id: a new UUID
  - user_id: the authenticated user's UUID
  - title: "Buy groceries"
  - category: "PERSONAL"
  - timeframe: "DAILY"
  - status: "TODO" (default)
  - created_at and updated_at: current ISO-8601 UTC timestamp
And returns HTTP 201 with JSON body: { "success": true, "data": { "id": "<uuid>", "title": "Buy groceries", "category": "PERSONAL", "timeframe": "DAILY", "status": "TODO", "created_at": "<ISO-8601>" } }
And the new task appears in the task list without page reload
```

### Scenario 2: Task list shows only authenticated user's tasks
```gherkin
Given user Alice has 3 tasks and user Bob has 2 tasks
When Alice calls GET /api/tasks with her valid JWT
Then the backend returns HTTP 200 with exactly 3 tasks belonging to Alice
And Bob's 2 tasks are NOT included in the response
And each task contains: id, title, category, timeframe, status, created_at
```

### Scenario 3: Task title is required
```gherkin
Given a logged-in user is on the create task form
When they submit the form with an empty title field
Then the frontend displays a validation error: "Task title is required"
And the form is NOT submitted to the backend
```

### Scenario 4: Task title length limit enforced
```gherkin
Given a logged-in user submits a task with a title longer than 100 characters
When the request reaches the backend
Then the backend returns HTTP 400 with JSON body: { "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Title must not exceed 100 characters" } }
And no task record is created in the database
```

### Scenario 5: Invalid category value rejected
```gherkin
Given a logged-in user sends POST /api/tasks with category "HOBBIES" (not in ENUM)
When the backend validates the request
Then it returns HTTP 400 with JSON body: { "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Category must be PERSONAL or PROFESSIONAL" } }
```

### Scenario 6: Invalid timeframe value rejected
```gherkin
Given a logged-in user sends POST /api/tasks with timeframe "YEARLY" (not in ENUM)
When the backend validates the request
Then it returns HTTP 400 with JSON body: { "success": false, "error": { "code": "VALIDATION_ERROR", "message": "Timeframe must be DAILY, WEEKLY, or MONTHLY" } }
```

### Scenario 7: Unauthenticated request to create task is rejected
```gherkin
Given a request to POST /api/tasks with no Authorization header
When the auth middleware processes the request
Then it returns HTTP 401 before the task handler executes
And no task record is created in the database
```

### Scenario 8: Task creation API responds within performance target
```gherkin
Given a valid authenticated POST /api/tasks request
When the server processes the request
Then the response is received within 500ms (P95 measured in integration tests)
```

### Scenario 9: Empty task list returns valid empty response
```gherkin
Given a newly registered user with no tasks
When they call GET /api/tasks
Then the backend returns HTTP 200 with JSON body: { "success": true, "data": [] }
And the frontend displays an empty state message: "No tasks yet. Add your first task!"
```

## Technical Notes
- Endpoints: POST /api/tasks, GET /api/tasks
- All requests require Authorization: Bearer {jwt} header
- task.user_id = jwt.sub (extracted from validated JWT payload)
- Input validation: whitelist approach (SEC-003), parameterized SQL (SEC-004)
- Response format: IDD.md JSON API shell
- Frontend: task list component + create task form with controlled inputs
- Standards: coding-standard v1.0, security-standards v1.0, api-design-standards v1.0

## Agent Assignment
- **Fullstack Developer (08)**: Task CRUD API (POST + GET) + Frontend task list + create form

## Dependencies
- STORY-001 (scaffold + tasks schema)
- STORY-003 (JWT auth middleware must be in place)

## Definition of Ready
- [x] Gherkin ACs written and binary pass/fail
- [x] Estimated (8 SP)
- [x] Dependencies: STORY-001, STORY-003
- [x] Agent assigned: fullstack-developer
