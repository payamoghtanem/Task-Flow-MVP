# Sprint Tasks — Sprint 1
# Agent: 03 — SCRUM MASTER | Standards: git-standard v1.0 | 2026-06-19T12:30:00Z
# Sprint Goal: "Users can register, log in securely, and perform full CRUD on categorized tasks"
# Sprint Duration: 2026-06-19 → 2026-07-03 | Total: 37 SP

---

## Sprint 0 — Initialization (ARCHIVED)

| Task ID | Story ID | Title | Agent | Status | Started | Completed |
|---------|----------|-------|-------|--------|---------|-----------|
| SPRINT-0-001 | EPIC-001 | Initialize repository structure | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-002 | EPIC-001 | Create 22 agent CLAUDE.md files | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-003 | EPIC-001 | Establish coding standards v1.0 | solution-architect | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-004 | EPIC-001 | Establish security standards v1.0 | security-agent | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-005 | EPIC-001 | Establish API design standards v1.0 | solution-architect | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-006 | EPIC-001 | Define Definition of Done v1.0 | scrum-master | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-007 | EPIC-001 | Create GDPR checklist v1.0 | gdpr-compliance | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-008 | EPIC-001 | Create OWASP constraint block v1.0 | security-agent | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-009 | EPIC-001 | Define code review SOP v1.0 | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-010 | EPIC-001 | Define release SOP v1.0 | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-011 | EPIC-001 | Define incident SOP v1.0 | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-012 | EPIC-001 | Define 5 orchestration workflows | orchestrator | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-013 | EPIC-001 | Configure model-mapping.yaml | router | DONE | Sprint 0 | Sprint 0 |
| SPRINT-0-014 | EPIC-001 | Define CI/CD quality gates | cicd-infrastructure | DONE | Sprint 0 | Sprint 0 |

---

## Sprint 1 — Core MVP

### Phase 1 — Foundation

| Task ID | Story ID | Title | Agent | Model | Status | Started | Completed |
|---------|----------|-------|-------|-------|--------|---------|-----------|
| S1-T01 | STORY-001 | Write PostgreSQL migration SQL (users + tasks tables, ENUMs, indexes) | data-engineer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T02 | STORY-001 | Scaffold Node.js/Express backend (entry, router, DB pool, health endpoint) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T03 | STORY-001 | Scaffold React frontend (Vite/CRA, React Router DOM, AuthContext shell) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T04 | STORY-001 | Wireframes: Registration, Login, Dashboard, Create Task | ui-ux-designer | claude-sonnet-4-6 | BACKLOG | — | — |

### Phase 2 — Authentication

| Task ID | Story ID | Title | Agent | Model | Status | Started | Completed |
|---------|----------|-------|-------|-------|--------|---------|-----------|
| S1-T05 | STORY-002 | Implement POST /api/auth/register (bcrypt 12 rounds, JWT issue) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T06 | STORY-002 | Frontend Registration form (validation, API integration, redirect) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T07 | STORY-003 | Implement POST /api/auth/login + POST /api/auth/logout (JWT RS256) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T08 | STORY-003 | Auth middleware (JWT RS256 validation, 401 handling) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T09 | STORY-003 | Frontend Login form + AuthContext + ProtectedRoute | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |

### Phase 3 — Task Management

| Task ID | Story ID | Title | Agent | Model | Status | Started | Completed |
|---------|----------|-------|-------|-------|--------|---------|-----------|
| S1-T10 | STORY-004 | Implement POST /api/tasks (create task, user-scoped) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T11 | STORY-004 | Implement GET /api/tasks (list tasks, user-scoped) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T12 | STORY-004 | Frontend Dashboard (task list + create task form) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T13 | STORY-005 | Implement PATCH /api/tasks/:id (status update, ownership check, updated_at ISO-8601) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T14 | STORY-005 | Implement DELETE /api/tasks/:id (ownership check, 404 handling) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |
| S1-T15 | STORY-005 | Frontend TaskCard (status toggle buttons + delete confirmation modal) | fullstack-developer | claude-opus-4-8 | BACKLOG | — | — |

### Phase 4 — Quality Gates

| Task ID | Story ID | Title | Agent | Model | Status | Started | Completed |
|---------|----------|-------|-------|-------|--------|---------|-----------|
| S1-T16 | ALL | Write unit tests (authService, taskService, middleware) — coverage ≥80% | tester | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T17 | ALL | Write integration tests (all API endpoints with supertest) — coverage ≥80% | tester | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T18 | ALL | Code review (all source vs coding-standard v1.0 + OWASP) — READ-ONLY | code-reviewer | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T19 | ALL | Security scan (SAST + secrets + CVE + JWT/bcrypt review) — P1 = BLOCK | security-agent | claude-opus-4-8 | BACKLOG | — | — |
| S1-T20 | ALL | GDPR review (auth PII handling, data minimization, retention) | gdpr-compliance | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T21 | ALL | Validate all Gherkin ACs (binary PASS/FAIL per scenario) | validator | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T22 | ALL | Requirements traceability (BRD BR-001/002/003 → code → tests) — no RED gaps | requirements-traceability-compliance | claude-sonnet-4-6 | BACKLOG | — | — |
| S1-T23 | ALL | Create PR + merge feature branches to develop | git-github-governance | claude-haiku-4-5 | BACKLOG | — | — |
| S1-T24 | ALL | CI/CD staging deploy + Gate 3-4 (coverage, smoke tests, GDPR) | cicd-infrastructure | claude-sonnet-4-6 | BACKLOG | — | — |

---

## Sprint 1 Summary
- **Stories**: 5 (STORY-001 through STORY-005)
- **Story Points**: 37 SP
- **Tasks**: 24
- **Agents**: data-engineer, fullstack-developer (primary), ui-ux-designer, tester, code-reviewer, security-agent, gdpr-compliance, validator, requirements-traceability-compliance, git-github-governance, cicd-infrastructure
- **Critical Path**: S1-T01 → S1-T05 → S1-T08 → S1-T10 → S1-T16 → S1-T22 → S1-T23 → S1-T24

## Sprint 2 Preview (Backlog)
- Dashboard: Time-Horizon Views (EPIC-003)
- Context Switching + Category Filter (EPIC-004)
- Email Verification (EPIC-001 continued)
- Task editing (EPIC-002 continued)
