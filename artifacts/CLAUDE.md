# Artifacts Directory

## Role
Repository for all team-generated deliverables: kanban board, compliance traceability matrix, audit trail, status reports, and sprint reports.

## Scope
- In: Kanban board, traceability matrix, audit trail, product status reports, sprint reports, compliance reports
- Out: Source code, test files, agent definitions, standards content

## Write Authority
| Artifact | Write Agent |
|----------|------------|
| `kanban-board.md` | Scrum Master (03) |
| `compliance-traceability-matrix.md` | Traceability Agent (15) |
| `audit-trail.md` | All agents (append) + CI/CD Agent (18) |
| `product-status-report.md` | Orchestrator (01) |
| `sprint-reports/` | Respective report-producing agents |

## Read Authority
ALL agents have read access.

## Constraints
- Audit trail is append-only — never overwrite entries
- Traceability matrix is the legal compliance record — never delete entries
- Status reports archived per sprint — never overwrite previous sprint reports
