# STORY-001: Project Scaffold & Database Schema
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z
# Epic: EPIC-001 + EPIC-002 (shared prerequisite)
# Sprint: 1 | Story Points: 5 | Priority: P0 (blocking all other stories)

## User Story
As the **development team**, we want a **fully scaffolded project with an initialized database schema**, so that **all other Sprint 1 stories have a working foundation to build on**.

## INVEST Check
- **I**ndependent: Yes — no dependency on other Sprint 1 stories
- **N**egotiable: Schema fields fixed by TDD.md; scaffold tech fixed by SDD.md
- **V**aluable: Critical path blocker — zero other stories can start without this
- **E**stimable: 5 SP (Data Engineer + Fullstack Developer, ~1 day)
- **S**mall: Single deliverable: runnable scaffold + schema migration
- **T**estable: Database connects, tables exist, app server starts

## Acceptance Criteria

### Scenario 1: Backend scaffold starts without errors
```gherkin
Given the development environment has Node.js ≥18 and PostgreSQL ≥14 installed
When the developer runs `npm install && npm start` in the backend directory
Then the Express server starts on port 3001
And returns HTTP 200 on GET /health
And responds within 2000ms
```

### Scenario 2: Database schema is correctly initialized
```gherkin
Given the PostgreSQL connection string is set in environment variable DATABASE_URL
When the migration script `npm run migrate` is executed
Then a table named "users" exists with columns: id (UUID PK), email (VARCHAR UNIQUE), password_hash (VARCHAR), created_at (TIMESTAMP)
And a table named "tasks" exists with columns: id (UUID PK), user_id (UUID FK → users.id), title (VARCHAR 100), category (ENUM: PERSONAL|PROFESSIONAL), timeframe (ENUM: DAILY|WEEKLY|MONTHLY), status (ENUM: TODO|IN_PROGRESS|DONE), created_at (TIMESTAMP), updated_at (TIMESTAMP)
And indexes exist on tasks.user_id, tasks.timeframe, tasks.category
```

### Scenario 3: Frontend scaffold starts without errors
```gherkin
Given the development environment has Node.js ≥18 installed
When the developer runs `npm install && npm start` in the frontend directory
Then the React application starts on port 3000
And the browser renders the root HTML page without JavaScript errors
And the initial SPA load completes within 2000ms on a 4G connection simulation
```

### Scenario 4: No secrets in code
```gherkin
Given the scaffold code is committed to the repository
When Gate 1 (gitleaks secrets scan) runs on the commit
Then zero secrets, tokens, passwords, or API keys are found in any file
And all configuration uses environment variables via .env files
And .env files are in .gitignore
```

### Scenario 5: Database connections use environment variables
```gherkin
Given the backend application is starting
When it initializes the PostgreSQL connection pool
Then it reads the connection string exclusively from the DATABASE_URL environment variable
And does not contain any hardcoded connection strings, usernames, or passwords
```

## Technical Notes
- Backend: Node.js + Express.js (from SDD.md)
- Frontend: React SPA, React Router DOM, React Context API (from TDD.md)
- Database: PostgreSQL, UUID primary keys (from TDD.md)
- All ENUMs: category (PERSONAL, PROFESSIONAL), timeframe (DAILY, WEEKLY, MONTHLY), status (TODO, IN_PROGRESS, DONE)
- bcrypt and jsonwebtoken packages must be installed (for STORY-002, STORY-003)
- Standards: coding-standard v1.0, security-standards v1.0, git-standard v1.0

## Agent Assignment
- **Data Engineer (09)**: Write SQL migration files
- **Fullstack Developer (08)**: Backend scaffold (Express app, DB connection pool, health endpoint) + React scaffold

## Definition of Ready
- [x] Gherkin ACs written and binary pass/fail
- [x] Estimated (5 SP)
- [x] Dependencies: None (first story)
- [x] Agent assigned: data-engineer + fullstack-developer
