# MULTI_AGENT_PLAN — Sprint 1
# Agent: 00 — ROUTER (Technical Decomposition) | Standards: coding-standard v1.0, git-standard v1.0
# Generated: 2026-06-19T12:30:00Z
# Sprint: 1 | Sprint Goal: "Users can register, log in securely, and perform full CRUD on categorized tasks"

## Injected Historical Constraints
- [LESSON-SPRINT-0-001] Sprint 0 complete — Sprint 1 authorized
- [LESSON-SPRINT-0-002] All dates MUST be ISO-8601 UTC (schema, API, logs, updated_at fields)
- [LESSON-SPRINT-0-003] Gate 1 secrets scan non-negotiable — use env vars, never hardcode credentials

## Execution Model
Tasks within the same "Phase" can run in parallel. Each phase must complete before the next begins.

---

## Phase 1 — Foundation (Days 1–2)

| Task ID | Story ID | Task | Agent | Model | Input | Expected Output | Deadline |
|---------|----------|------|-------|-------|-------|----------------|---------|
| S1-T01 | STORY-001 | Write PostgreSQL migration SQL: create users + tasks tables, ENUMs, indexes | data-engineer | claude-opus-4-8 | TDD.md (schema section), SDD.md, LESSON-SPRINT-0-002 | `backend/migrations/001_init_schema.sql` | Day 1 EOD |
| S1-T02 | STORY-001 | Scaffold Node.js/Express backend: entry point, router, DB pool, health endpoint, .env config | fullstack-developer | claude-opus-4-8 | SDD.md, TDD.md, security-standards v1.0 (SEC-001, SEC-003) | `backend/` project with `src/index.js`, `src/db.js`, `src/routes/health.js` | Day 1 EOD |
| S1-T03 | STORY-001 | Scaffold React frontend: CRA or Vite, React Router DOM setup, AuthContext shell, .env config | fullstack-developer | claude-opus-4-8 | TDD.md (frontend section), SDD.md | `frontend/` project with routing structure | Day 2 EOD |
| S1-T04 | STORY-001 | Wireframes: Registration form, Login form, Dashboard + task list, Create task modal | ui-ux-designer | claude-sonnet-4-6 | PRD.md (personas), TDD.md, WCAG 2.1 AA | `agents/07_UI_UX_DESIGNER/memory/wireframes-sprint-1.md` | Day 2 EOD |

**Phase 1 Gate**: Backend health endpoint returns HTTP 200. Migration runs without error. React app renders root page. Wireframes approved by PO.

---

## Phase 2 — Authentication (Days 3–5)

| Task ID | Story ID | Task | Agent | Model | Input | Expected Output | Deadline |
|---------|----------|------|-------|-------|-------|----------------|---------|
| S1-T05 | STORY-002 | Implement POST /api/auth/register: input validation, bcrypt hash (12 rounds), user insert, JWT issue | fullstack-developer | claude-opus-4-8 | STORY-002 ACs, security-standards v1.0 (SEC-003,004,006,008), IDD.md | `backend/src/routes/auth.js` (register), `backend/src/services/authService.js` | Day 3 EOD |
| S1-T06 | STORY-002 | Frontend Registration form: controlled inputs, client-side validation, API integration, redirect on success | fullstack-developer | claude-opus-4-8 | STORY-002 ACs, S1-T04 wireframes | `frontend/src/pages/Register.jsx`, `frontend/src/services/api.js` | Day 4 EOD |
| S1-T07 | STORY-003 | Implement POST /api/auth/login: bcrypt compare, JWT RS256 issue, POST /api/auth/logout | fullstack-developer | claude-opus-4-8 | STORY-003 ACs, security-standards v1.0 (SEC-006) | `backend/src/routes/auth.js` (login, logout), updated authService | Day 4 EOD |
| S1-T08 | STORY-003 | Implement auth middleware: JWT RS256 validation, 401 on missing/expired/malformed tokens | fullstack-developer | claude-opus-4-8 | STORY-003 ACs, security-standards v1.0 (SEC-006,007) | `backend/src/middleware/authenticate.js` | Day 4 EOD |
| S1-T09 | STORY-003 | Frontend: Login form + AuthContext + ProtectedRoute + auth guard redirects | fullstack-developer | claude-opus-4-8 | STORY-003 ACs, S1-T04 wireframes | `frontend/src/pages/Login.jsx`, `frontend/src/context/AuthContext.jsx`, `frontend/src/components/ProtectedRoute.jsx` | Day 5 EOD |

**Phase 2 Gate**: Registration creates user in DB. Login returns valid JWT. Auth middleware rejects unauthenticated requests. Frontend guards work.

---

## Phase 3 — Task Management (Days 6–8)

| Task ID | Story ID | Task | Agent | Model | Input | Expected Output | Deadline |
|---------|----------|------|-------|-------|-------|----------------|---------|
| S1-T10 | STORY-004 | Implement POST /api/tasks: auth required, input validation, insert with user_id from JWT, return 201 | fullstack-developer | claude-opus-4-8 | STORY-004 ACs, TDD.md, security-standards v1.0 (SEC-003,004,007) | `backend/src/routes/tasks.js` (create), `backend/src/services/taskService.js` | Day 6 EOD |
| S1-T11 | STORY-004 | Implement GET /api/tasks: auth required, filter by jwt.sub (user_id), return task array | fullstack-developer | claude-opus-4-8 | STORY-004 ACs, TDD.md | `backend/src/routes/tasks.js` (list) | Day 6 EOD |
| S1-T12 | STORY-004 | Frontend: Dashboard with task list + create task form/modal: controlled inputs, API integration | fullstack-developer | claude-opus-4-8 | STORY-004 ACs, S1-T04 wireframes | `frontend/src/pages/Dashboard.jsx`, `frontend/src/components/TaskList.jsx`, `frontend/src/components/CreateTaskForm.jsx` | Day 7 EOD |
| S1-T13 | STORY-005 | Implement PATCH /api/tasks/:id: auth required, ownership check (jwt.sub === task.user_id), status validation, update updated_at ISO-8601 UTC | fullstack-developer | claude-opus-4-8 | STORY-005 ACs, security-standards v1.0 (SEC-007), LESSON-SPRINT-0-002 | `backend/src/routes/tasks.js` (update) | Day 7 EOD |
| S1-T14 | STORY-005 | Implement DELETE /api/tasks/:id: auth required, ownership check, permanent delete, 404 if not found | fullstack-developer | claude-opus-4-8 | STORY-005 ACs, security-standards v1.0 (SEC-007) | `backend/src/routes/tasks.js` (delete) | Day 7 EOD |
| S1-T15 | STORY-005 | Frontend: TaskCard component with status toggle buttons (TODO→IN_PROGRESS→DONE) + delete with confirmation modal | fullstack-developer | claude-opus-4-8 | STORY-005 ACs, S1-T04 wireframes | `frontend/src/components/TaskCard.jsx`, `frontend/src/components/ConfirmDialog.jsx` | Day 8 EOD |

**Phase 3 Gate**: Full task CRUD works end-to-end. User isolation enforced (403 on cross-user access). Status transitions valid.

---

## Phase 4 — Quality Gates (Days 9–10)

| Task ID | Story ID | Task | Agent | Model | Input | Expected Output | Deadline |
|---------|----------|------|-------|-------|-------|----------------|---------|
| S1-T16 | ALL | Write unit tests: authService, taskService (all functions), auth middleware | tester | claude-sonnet-4-6 | STORY-001–005 ACs, testing-standard v1.0, all source files | `backend/src/**/*.test.js`, coverage ≥80% | Day 9 EOD |
| S1-T17 | ALL | Write integration tests: all API endpoints with supertest (auth flow + task CRUD + error cases) | tester | claude-sonnet-4-6 | STORY-001–005 ACs, testing-standard v1.0 | `backend/src/tests/integration/*.test.js`, coverage ≥80% | Day 9 EOD |
| S1-T18 | ALL | Code review: all backend + frontend against coding-standard v1.0 + OWASP Top-10 | code-reviewer | claude-sonnet-4-6 | All source code, coding-standard v1.0, frameworks/owasp/CLAUDE.md | Code review report with PASS/FAIL per file | Day 9 EOD |
| S1-T19 | ALL | Security scan: SAST (Semgrep), secrets scan (Gitleaks), CVE scan (Trivy), JWT + bcrypt review | security-agent | claude-opus-4-8 | All source code, security-standards v1.0 | Security report — any P1 = pipeline BLOCKED | Day 9 EOD |
| S1-T20 | ALL | GDPR review: user registration PII handling, password storage, data minimization, retention policy | gdpr-compliance | claude-sonnet-4-6 | Auth implementation, frameworks/gdpr/gdpr-checklist.md | GDPR clearance or P1 blocker | Day 9 EOD |
| S1-T21 | ALL | Validate all Gherkin ACs: binary PASS/FAIL for each scenario in STORY-001 through STORY-005 | validator | claude-sonnet-4-6 | STORY-001–005, running application | Validation report — PASS/FAIL per scenario | Day 10 EOD |
| S1-T22 | ALL | Requirements traceability: map BRD BR-001/002/003 → STORY-001–005 → source code → tests → status | requirements-traceability-compliance | claude-sonnet-4-6 | BRD.md, PRD.md, all stories, source code, test files | `artifacts/compliance-traceability-matrix.md` updated — no RED gaps | Day 10 EOD |
| S1-T23 | ALL | Create feature branch, PR, merge to develop after all quality gates PASS | git-github-governance | claude-haiku-4-5 (temp 0.0) | Approved source code, git-standard v1.0 | PR merged to develop branch | Day 10 EOD |
| S1-T24 | ALL | CI/CD: staging deploy, run Gate 3-4 quality gates (coverage, smoke tests, GDPR clearance) | cicd-infrastructure | claude-sonnet-4-6 | develop branch, .github/workflows/gate*.yml | Staging URL + all gates PASSED | Day 10 EOD |

**Phase 4 Gate**: Coverage ≥80%, no P1 security findings, GDPR cleared, all Gherkin ACs PASS, no RED traceability gaps, PR merged, staging deployed.

---

## Dependency Graph

```
S1-T01 (DB Schema)
S1-T02 (Backend Scaffold) ─── both Day 1, parallel
    ↓
S1-T03 (Frontend Scaffold)
S1-T04 (Wireframes) ─── both Day 2, parallel
    ↓
S1-T05 (Register API)
S1-T07 (Login API) ─── Day 3-4, parallel
    ↓
S1-T06 (Register UI)
S1-T08 (Auth Middleware)
S1-T09 (Login UI + AuthContext) ─── Day 4-5, parallel
    ↓
S1-T10 (POST /tasks)
S1-T11 (GET /tasks) ─── Day 6, parallel
    ↓
S1-T12 (Dashboard UI)
S1-T13 (PATCH /tasks/:id)
S1-T14 (DELETE /tasks/:id) ─── Day 7, parallel
    ↓
S1-T15 (TaskCard UI) ─── Day 8
    ↓
S1-T16, S1-T17, S1-T18, S1-T19, S1-T20 ─── Day 9, parallel
    ↓
S1-T21, S1-T22 ─── Day 10, parallel
    ↓
S1-T23, S1-T24 ─── Day 10, sequential (PR then deploy)
```

## Blocking Rules (from Workflow 2)
- S1-T19 (Security): Any P1 finding → pipeline HALTED, no merge
- S1-T16/T17 (Testing): Coverage <80% → deploy BLOCKED
- S1-T22 (Traceability): RED gap → merge BLOCKED
- S1-T20 (GDPR): Non-compliance → deploy BLOCKED
- S1-T18 (Code Review): FAIL verdict → development team notified, fix required before merge

## Total Tasks: 24
## Critical Path: S1-T01 → S1-T05 → S1-T08 → S1-T10 → S1-T16 → S1-T22 → S1-T23 → S1-T24
