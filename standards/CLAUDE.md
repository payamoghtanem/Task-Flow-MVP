# Standards Directory

## Role
Central, immutable source of truth for all engineering conventions. All agents must cite the standard version used in every output. Standards are frozen during sprint execution.

## Scope
- In: Naming conventions, security rules, API design patterns, git commit format, test coverage thresholds, AI prompt versioning
- Out: Agent execution, task routing, backlog management, code implementation

## Write Authority
Updates require: Lesson Learner (21) proposal + Scrum Master (03) sign-off. Version bump required on every change.

## Standards Index
- `coding-standard/naming-conventions.md` — v1.0
- `coding-standard/security-standards.md` — v1.0
- `coding-standard/api-design-standards.md` — v1.0
- `git-standard/git-commit-standards.md` — v1.0
- `testing-standard/coverage-thresholds.md` — v1.0
- `ai-development-standard/prompt-versioning.md` — v1.0

## Constraints
- Immutable during sprint execution
- All agents must cite standard version in outputs
- Conflicts resolved by Scrum Master (03)
- No agent may override standards locally
