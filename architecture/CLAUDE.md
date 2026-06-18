# Architecture Directory

## Role
Single source of truth for all system design decisions: C4 models, Architecture Decision Records (ADRs), system context diagrams, and integration contracts.

## Scope
- In: C4 context/container/component diagrams, ADRs, system boundaries, integration patterns, technology decisions
- Out: Code implementation, test plans, backlog management, sprint execution

## Acceptance Criteria
- [ ] Every architectural decision has a dated ADR in `decisions/`
- [ ] C4 diagrams are current within the last sprint
- [ ] All ADRs follow the template: Status | Context | Decision | Consequences
- [ ] Technology choices reference relevant standards version

## Expected Output
- ADRs: `decisions/ADR-NNN-title.md`
- C4 Diagrams: `c4/[context|container|component]-diagram.md`
- System Context: `system-context.md`

## Write Authority
Solution Architect (06) ONLY. All other agents READ-ONLY.

## Model Routing
Primary: claude-opus-4-8
Fallback: claude-sonnet-4-6
Context Limit: 16k

## Constraints
- ADRs are immutable once status = ACCEPTED
- Superseded ADRs must reference their replacement ADR
- All diagrams must include actor labels and data flow direction
