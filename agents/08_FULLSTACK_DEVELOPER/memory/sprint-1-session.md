# Fullstack Developer Sprint 1 Session Log
# Agent: 08 — FULLSTACK DEVELOPER | Standards: coding-standard v1.0
# Last Updated: 2026-06-19T12:50:00Z

## Active Sprint
Sprint 1 — "Users can register, log in securely, and perform full CRUD on categorized tasks"

## Completed Tasks
- S1-T01 (co-authored with Data Engineer): DB migration SQL ✓
- S1-T02: Node.js/Express backend scaffold ✓
- S1-T03: React frontend scaffold ✓
- S1-T05: POST /api/auth/register ✓
- S1-T07: POST /api/auth/login + POST /api/auth/logout ✓

## In Progress
- S1-T06: Registration form UI (NEXT — frontend)
- S1-T08: Auth middleware JWT verification (NEXT — backend)

## Architecture Decisions
- App factory pattern: createApp() in app.js, server.listen() in index.js (testability)
- CommonJS modules (not ESM) — Node 18+, simple, wide ecosystem support
- bcryptjs over bcrypt — no native build step, same API (salt rounds enforced at service layer: ≥12)
- pg Pool with DATABASE_URL — single env var for all Postgres environments
- helmet() + cors() applied globally before routes

## Architecture Decisions — Auth (S1-T05/S1-T07)
- JWT RS256: private/public key pair stored as base64 env vars (JWT_PRIVATE_KEY_BASE64, JWT_PUBLIC_KEY_BASE64)
- Dev/test: ephemeral RSA-2048 generated via crypto.generateKeyPairSync(), cached in module — tokens valid per process lifetime
- Production guard: throws if JWT key env vars absent when NODE_ENV=production
- Timing oracle prevention: bcrypt.compare() always runs against DUMMY_HASH when user not found (STORY-003 AC Scenario 3)
- BCRYPT_ROUNDS=12 — SEC-008 overrides TDD.md "min 10"; strictest standard wins
- Logout is stateless (client-side token discard) — server-side blacklist deferred to Sprint 2
- Token storage on frontend: localStorage (dev) — security-standards.md SEC-006 recommends HttpOnly cookie for production (flag for Security Agent review)

## Pending Decisions (for S1-T08/S1-T09)
- Auth middleware: verifyAccessToken() from jwt.js, attach decoded payload to req.user, 401 on failure

## Constraints Applied
- [SEC-001] Zero hardcoded values — all from process.env
- [SEC-003] Input validation at system boundaries (to be enforced per-route)
- [naming-conventions v1.0] kebab-case files, camelCase variables, router → createApp factory

## Files Owned
backend/ (all files)
