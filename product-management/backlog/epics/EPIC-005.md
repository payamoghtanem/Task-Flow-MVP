# EPIC-005: Account & Security Settings
# Agent: 02 — PRODUCT OWNER | Standards: coding-standard v1.0 | 2026-06-19T12:30:00Z

## Summary
Authenticated users can manage their account security: change password, request a password reset, log out from all sessions, and permanently delete their account.

## Business Value
Trust and control. Users need confidence that they control their data. Account deletion is also a GDPR Art. 17 (Right to Erasure) requirement.

**Source**: PRD.md EPIC-005, GDPR checklist v1.0 (Art. 17), frameworks/gdpr/gdpr-checklist.md

## Scope
- Change password (requires current password, new password bcrypt re-hash)
- Password reset via email token (requires email integration)
- Logout from all sessions (token invalidation)
- Delete account permanently (cascade delete all user tasks)

## Sprint Assignment
- **Sprint 3**: Implementation (requires Sprint 1 auth foundation + email service)

## Status
PLANNED — Sprint 3
