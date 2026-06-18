# Product Management Directory

## Role
Central workspace for backlog management, sprint execution, and roadmap tracking.

## Write Authority
| Path | Write Agent |
|------|------------|
| `backlog/` | Product Owner (02), Product Specialist (05) |
| `sprints/` | Scrum Master (03), Router (00) |
| `roadmap.yaml` | Product Owner (02), Orchestrator (01) |

## Directory Structure
```
product-management/
├── backlog/
│   ├── epics/          # EPIC-NNN.md files
│   ├── stories/        # STORY-NNN.md files
│   ├── features/       # FEATURE-NNN.md files
│   └── grooming-log.md # Backlog grooming session notes
├── sprints/
│   ├── current/        # Active sprint workspace
│   │   ├── tasks.md          # Sprint task list
│   │   ├── blockers.md       # Active blockers
│   │   └── MULTI_AGENT_PLAN.md  # Router dispatch plan
│   └── sprint-N/       # Archived sprints
└── roadmap.yaml        # Product roadmap
```

## Constraints
- No story enters a sprint without Gherkin ACs (Definition of Ready)
- `sprints/current/` is reset at sprint end
- Backlog is ordered at all times (PO maintains priority)
