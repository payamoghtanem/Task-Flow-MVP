# Git Commit Standards — v1.0

## Scope
All commits in this repository by any agent or human. Enforced by Git Governance Agent (19) and Gate 1.

## Conventional Commits Format
```
<type>(<scope>): <short description>

[optional body]

[optional footer]
```

### Types (Required)
| Type | When to Use |
|------|------------|
| `feat` | New feature or user-facing capability |
| `fix` | Bug fix |
| `docs` | Documentation changes only |
| `style` | Formatting, whitespace — no logic change |
| `refactor` | Code restructure — no feature change, no bug fix |
| `test` | Adding or updating tests |
| `chore` | Build process, dependency updates, tooling |
| `perf` | Performance improvement |
| `ci` | CI/CD pipeline changes |
| `security` | Security patch or hardening |
| `revert` | Reverting a previous commit |

### Rules
1. **Short description**: ≤72 characters, imperative mood ("add user auth" not "added user auth")
2. **Scope**: Optional but recommended — matches agent slug or module name
3. **Body**: Explain WHY (not what) — wrap at 72 chars
4. **Footer**: Reference story IDs: `Refs: STORY-42`, `Closes: STORY-99`
5. **Breaking changes**: Add `BREAKING CHANGE:` footer with migration instructions
6. **No WIP commits** to `main` or `develop` — squash before merge

### Examples
```
feat(auth): add JWT refresh token rotation

Implements sliding window refresh token rotation to reduce session
expiry friction without compromising security posture.

Refs: STORY-42
```

```
fix(api): correct 404 response on deleted user lookup

Previously returned 500 when soft-deleted user was queried.
Now correctly returns 404 with standard error envelope.

Closes: STORY-99
```

```
security: patch JWT algorithm confusion vulnerability

Fixes CVE-2024-XXXXX. Force RS256 algorithm in all JWT verifications
to prevent algorithm confusion attacks.

BREAKING CHANGE: HS256 tokens issued before this commit will be rejected.
Migration: Re-authenticate all active sessions.
```

## Branch Protection Rules
| Branch | Protection |
|--------|-----------|
| `main` | No direct push. PR required. Gate 1-3 PASS. 1 reviewer minimum. |
| `develop` | No direct push. PR required. Gate 1-2 PASS. |
| `release/*` | No direct push. CI/CD Agent gate required. |
| `feature/*` | Direct push allowed. Gate 1 PASS required. |
| `hotfix/*` | PR required. Expedited Gate 1-2. |

## Merge Strategy
- Feature → Develop: **Squash merge** (clean history)
- Develop → Main: **Merge commit** (preserve release boundary)
- Hotfix → Main: **Merge commit** + back-merge to develop

## Tag Format
- Release tags: `vMAJOR.MINOR.PATCH` (SemVer)
- Pre-release: `vMAJOR.MINOR.PATCH-rc.N`
- Sprint tags: `sprint-N-end` (internal tracking only)

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial git standards | Git Governance (19) |
