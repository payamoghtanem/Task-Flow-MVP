# STORY-002: User Registration
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z
# Epic: EPIC-001
# Sprint: 1 | Story Points: 8 | Priority: P1 (HIGH — from BRD BR-001)

## User Story
As a **new user**, I want to **register with my email address and a password**, so that **I can create a personal TaskFlow account and begin managing my tasks**.

## INVEST Check
- **I**ndependent: Depends on STORY-001 (scaffold) only
- **N**egotiable: Email+password auth specified by BR-001; bcrypt+JWT specified by TDD.md
- **V**aluable: No user can access any feature without registration
- **E**stimable: 8 SP (backend API + frontend form + tests)
- **S**mall: Single feature: registration flow end-to-end
- **T**estable: Gherkin scenarios below are binary pass/fail

## Acceptance Criteria

### Scenario 1: Successful registration
```gherkin
Given a new user navigates to /register
When they enter a valid email (format: user@domain.tld) and a password (≥8 characters)
And they submit the registration form
Then the backend hashes the password with bcrypt (≥12 salt rounds)
And creates a new user record in the users table with a UUID id
And returns HTTP 201 with JSON body: { "success": true, "data": { "id": "<uuid>", "email": "<email>" } }
And the response does NOT contain the password_hash field
And the user is automatically logged in (JWT issued)
And they are redirected to /dashboard
```

### Scenario 2: Duplicate email rejected
```gherkin
Given a user with email "alice@example.com" already exists in the database
When a new registration attempt is made with email "alice@example.com"
Then the backend returns HTTP 409 with JSON body: { "success": false, "error": { "code": "EMAIL_TAKEN", "message": "An account with this email already exists" } }
And no new user record is created in the database
```

### Scenario 3: Invalid email format rejected
```gherkin
Given a new user is on the registration form
When they enter an invalid email (e.g., "notanemail", "user@", "@domain.com")
And they submit the form
Then the frontend displays a validation error: "Please enter a valid email address"
And the form is NOT submitted to the backend
```

### Scenario 4: Weak password rejected
```gherkin
Given a new user is on the registration form
When they enter a password shorter than 8 characters
And they submit the form
Then the frontend displays a validation error: "Password must be at least 8 characters"
And the form is NOT submitted to the backend
```

### Scenario 5: Password not stored in plaintext
```gherkin
Given a user registers with password "MyPassword123"
When the user record is created in the database
Then the users.password_hash column stores a bcrypt hash (starts with "$2b$")
And the hash was generated with ≥12 salt rounds
And the plaintext password "MyPassword123" is NOT present anywhere in the database or logs
```

### Scenario 6: Registration API input sanitization
```gherkin
Given an attacker sends POST /api/auth/register with SQL injection in the email field (e.g., "' OR 1=1--@test.com")
When the backend processes the request
Then it rejects the request with HTTP 400 (invalid email format)
And no SQL query is executed with unsanitized input (parameterized queries enforced)
And no unhandled error leaks stack traces in the response
```

### Scenario 7: PII not exposed in logs
```gherkin
Given a user registration request is processed (success or failure)
When the application logs the request
Then the logs do NOT contain the user's plaintext password
And the logs do NOT contain the full email address (partial masking acceptable)
And no PII appears in application error logs
```

## Technical Notes
- Endpoint: POST /api/auth/register
- Request body: { "email": string, "password": string }
- Response format: per IDD.md JSON API shell: { "success": bool, "data": {...}, "error": null | { code, message } }
- bcrypt salt rounds: 12 (security-standards.md SEC-008 overrides TDD.md "min 10")
- JWT issued on registration: RS256, access token ≤15min (security-standards.md SEC-006)
- Input validation at API boundary (whitelist approach per security-standards.md SEC-003)
- Parameterized queries only — no string concatenation in SQL (SEC-004)
- Standards: coding-standard v1.0, security-standards v1.0, api-design-standards v1.0

## Agent Assignment
- **Fullstack Developer (08)**: Backend API (POST /api/auth/register) + Frontend Registration form

## Dependencies
- STORY-001 (database schema must exist)

## Definition of Ready
- [x] Gherkin ACs written and binary pass/fail
- [x] Estimated (8 SP)
- [x] Dependencies: STORY-001 (scaffold + schema)
- [x] Agent assigned: fullstack-developer
