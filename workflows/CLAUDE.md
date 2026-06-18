# Workflows Directory

## Role
Step-by-step orchestration playbooks. Each workflow defines the exact sequence of agent activations, inputs, outputs, and decision gates for a recurring process.

## Scope
- In: 5 core team workflows with explicit agent/input/output at every step
- Out: Agent implementation details, standards content, backlog management

## Write Authority
Orchestrator (01) only. Updates require Scrum Master (03) approval.

## Workflows Index
1. `01-backlog-grooming-sprint-planning.md` — Workflow 1
2. `02-implementation-review-test-validate-merge.md` — Workflow 2
3. `03-requirements-traceability-compliance-audit.md` — Workflow 3
4. `04-blocker-incident-resolution.md` — Workflow 4
5. `05-sprint-retrospective-organizational-learning.md` — Workflow 5

## Constraints
- Workflows must be followed sequentially — no step skipping
- Every step specifies: agent, input, output, next step / decision gate
- Workflow deviations require Orchestrator (01) authorization
