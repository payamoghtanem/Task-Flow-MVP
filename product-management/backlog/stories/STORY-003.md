# STORY-003: User Login & JWT Authentication Middleware
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z
# Epic: EPIC-001
# Sprint: 1 | Story Points: 8 | Priority: P1 (HIGH — from BRD BR-001)

## User Story
As a **registered user**, I want to **log in with my email and password**, so that **I can securely access my task dashboard and all protected features**.

## INVEST Check
- **I**ndependent: Depends on STORY-001, STORY-002 (user must exist to log in)
- **N**egotiable: JWT RS256 + ≤15min expiry non-negotiable per security-standards.md SEC-006
- **V**aluable: Returning users cannot access their tasks without login
- **E**stimable: 8 SP (login API + middleware + frontend + tests)
- **S**mall: Single feature: authentication + session management
- **T**estable: All scenarios below are binary pass/fail

## Acceptance Criteria

### Scenario 1: Successful login
```gherkin
Given a registered user with email "alice@example.com" and password "SecurePass123"
When they navigate to /login and submit valid credentials
Then the backend verifies the password against the stored bcrypt hash
And returns HTTP 200 with JSON body: { "success": true, "data": { "token": "<jwt>", "user": { "id": "<uuid>", "email": "alice@example.com" } } }
And the JWT is a valid RS256-signed token with expiry ≤15 minutes from issuance
And the user is redirected to /dashboard
```

### Scenario 2: Invalid credentials rejected
```gherkin
Given a registered user with email "alice@example.com"
When they submit login with the wrong password "WrongPassword"
Then the backend returns HTTP 401 with JSON body: { "success": false, "error": { "code": "INVALID_CREDENTIALS", "message": "Invalid email or password" } }
And the error message does NOT specify whether the email or password was wrong (prevents user enumeration)
```

### Scenario 3: Non-existent email rejected
```gherkin
Given no user with email "ghost@example.com" exists in the database
When a login attempt is made with "ghost@example.com"
Then the backend returns HTTP 401 with the same error message as Scenario 2
And the response time is consistent with a valid-email failed login (no timing oracle)
```

### Scenario 4: Protected routes require valid JWT
```gherkin
Given an unauthenticated user (no token or expired token)
When they attempt to access any route other than /login or /register
Then the backend middleware returns HTTP 401 with JSON body: { "success": false, "error": { "code": "UNAUTHORIZED", "message": "Authentication required" } }
And the frontend auth guard redirects them to /login
```

### Scenario 5: Expired JWT rejected
```gherkin
Given a user has a JWT that was issued more than 15 minutes ago
When they make an API request with the expired token in the Authorization: Bearer header
Then the backend returns HTTP 401 with JSON body: { "success": false, "error": { "code": "TOKEN_EXPIRED", "message": "Session expired. Please log in again" } }
```

### Scenario 6: Malformed JWT rejected
```gherkin
Given an attacker sends a request with a malformed Authorization header (e.g., "Bearer invalid.token.here")
When the auth middleware processes the request
Then it returns HTTP 401 with code "INVALID_TOKEN"
And does not crash the server or leak stack traces
```

### Scenario 7: Logout invalidates session
```gherkin
Given a logged-in user with a valid JWT
When they click logout (POST /api/auth/logout)
Then the backend returns HTTP 200 confirming logout
And the frontend removes the JWT from storage
And subsequent requests with the old token are rejected with HTTP 401
```

### Scenario 8: Frontend redirects authenticated users away from login
```gherkin
Given a user is already logged in with a valid JWT
When they navigate to /login or /register
Then the frontend auth guard redirects them to /dashboard
And the login/register forms are not displayed
```

## Technical Notes
- Login endpoint: POST /api/auth/login
- Auth middleware: validates JWT on all routes except /api/auth/register and /api/auth/login
- JWT: RS256 algorithm, access token ≤15min expiry (SEC-006)
- Frontend: React Context API for auth state, React Router DOM auth guard
- Token storage: localStorage (noted for future SEC-006 review — HttpOnly cookie preferred in production)
- Logout: POST /api/auth/logout — frontend clears token; server-side token blacklist is Sprint 2+
- Standards: coding-standard v1.0, security-standards v1.0 (SEC-006), api-design-standards v1.0

## Agent Assignment
- **Fullstack Developer (08)**: Login API + auth middleware + frontend login form + auth context

## Dependencies
- STORY-001 (scaffold + schema)
- STORY-002 (users must exist in database)

## Definition of Ready
- [x] Gherkin ACs written and binary pass/fail
- [x] Estimated (8 SP)
- [x] Dependencies: STORY-001, STORY-002
- [x] Agent assigned: fullstack-developer
