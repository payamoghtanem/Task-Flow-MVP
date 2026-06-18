# Naming Conventions Standard — v1.0

## Scope
Applies to all source code written by any agent. Enforced by Code Reviewer (12) and Gate 1.

## 1. Files & Directories
| Context | Convention | Example |
|---------|-----------|---------|
| TypeScript/JavaScript files | kebab-case | `user-auth.service.ts` |
| Python files | snake_case | `user_auth_service.py` |
| React components | PascalCase | `UserProfile.tsx` |
| SQL files | snake_case with prefix | `001_create_users.sql` |
| Config files | kebab-case | `app-config.yaml` |
| Test files | `[name].test.ext` | `user-auth.test.ts` |
| Directory names | kebab-case | `user-management/` |

## 2. Variables & Constants
| Context | Convention | Example |
|---------|-----------|---------|
| Local variables | camelCase (TS/JS), snake_case (Python) | `userToken`, `user_token` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_COUNT` |
| Private class members | `_camelCase` (TS) | `_userId` |
| Boolean variables | `is/has/can/should` prefix | `isAuthenticated`, `hasPermission` |
| Environment variables | UPPER_SNAKE_CASE | `DATABASE_URL` |

## 3. Functions & Methods
| Context | Convention | Rule |
|---------|-----------|------|
| Functions | camelCase verb phrase | `getUserById()`, `validateEmail()` |
| Async functions | camelCase with Async suffix optional | `fetchUserAsync()` or `fetchUser()` |
| Event handlers | `handle` prefix | `handleSubmit()`, `handleUserClick()` |
| Transformers | `to/from` prefix | `toUserDTO()`, `fromApiResponse()` |
| Boolean return functions | `is/has/can` prefix | `isValidEmail()` |

## 4. Classes & Types
| Context | Convention | Example |
|---------|-----------|---------|
| Classes | PascalCase | `UserAuthService` |
| Interfaces (TS) | PascalCase, no `I` prefix | `UserProfile`, `AuthToken` |
| Type aliases (TS) | PascalCase | `UserId`, `ApiResponse<T>` |
| Enums | PascalCase name, UPPER_SNAKE members | `enum UserStatus { ACTIVE, SUSPENDED }` |
| DTOs | PascalCase + `DTO` suffix | `CreateUserDTO` |

## 5. Database
| Context | Convention | Example |
|---------|-----------|---------|
| Tables | snake_case, plural | `user_accounts` |
| Columns | snake_case | `created_at`, `user_id` |
| Primary keys | `id` | `id` |
| Foreign keys | `[table_singular]_id` | `user_id` |
| Indexes | `idx_[table]_[column(s)]` | `idx_users_email` |
| Constraints | `[type]_[table]_[column]` | `uq_users_email`, `fk_orders_user_id` |

## 6. API Routes
| Context | Convention | Example |
|---------|-----------|---------|
| Resource paths | lowercase, plural, kebab-case | `/api/v1/user-accounts` |
| Path parameters | camelCase | `/api/v1/users/{userId}` |
| Query parameters | camelCase | `?pageSize=10&sortBy=createdAt` |
| API versions | `v[N]` prefix | `/api/v1/`, `/api/v2/` |

## 7. Git Branches
| Type | Convention | Example |
|------|-----------|---------|
| Features | `feature/STORY-ID-short-desc` | `feature/STORY-42-user-auth` |
| Bug fixes | `fix/STORY-ID-short-desc` | `fix/STORY-99-login-redirect` |
| Releases | `release/vMAJOR.MINOR.PATCH` | `release/v1.2.0` |
| Hotfixes | `hotfix/vMAJOR.MINOR.PATCH` | `hotfix/v1.2.1` |
| Experiments | `experiment/short-desc` | `experiment/jwt-refresh-tokens` |

## Enforcement
- Code Reviewer (12) FAILS any PR violating these conventions (P2 finding)
- Automated lint rules enforce §1-3 where tooling supports it
- Database naming reviewed by Data Engineer (09) in schema reviews

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial standard | Solution Architect (06) |
