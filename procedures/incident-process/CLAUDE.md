# Incident Process — SOP v1.0

## Trigger
Activated by: production error rate spike, security alert, data breach detection, smoke test failure, or human escalation.

## Severity Levels
| Level | Definition | Response SLA |
|-------|-----------|-------------|
| P1 Critical | Data breach, complete outage, security compromise | 15 min response, 2h resolution target |
| P2 High | Major feature broken, significant performance degradation | 1h response, 8h resolution target |
| P3 Medium | Partial feature failure, elevated error rate | 4h response, 24h resolution target |
| P4 Low | Minor bug in non-critical path | Next sprint |

## Agents
- **Detection**: CI/CD Agent (18), Security Agent (16), or any agent
- **Triage**: Scrum Master (03)
- **Coordination**: Orchestrator (01)
- **Resolution**: Fullstack Developer (08), Data Engineer (09), Cloud Platform (20) (as applicable)
- **Comms**: Scrum Master (03)
- **Post-Mortem**: Lesson Learner (21)

## Process Steps

### Step 1: Detection & Alert
Any agent detecting an incident:
1. Write to `product-management/sprints/current/blockers.md`:
```
## INCIDENT-[N]
- Severity: P[1-4]
- Detected: ISO-8601 timestamp
- Detected By: AGENT_SLUG
- Description: [One sentence]
- Affected: [System/feature/users]
- Status: OPEN
```
2. Notify Scrum Master (03) immediately.

### Step 2: Triage (Scrum Master)
1. Confirm severity level
2. Assemble response team (router dispatch)
3. Assign Incident Commander (Orchestrator (01) for P1/P2)
4. Open incident channel / tracking entry in `artifacts/audit-trail.md`

### Step 3: Containment
Incident Commander directs:
- P1: Immediate rollback if recent deploy suspected → `procedures/release-process/CLAUDE.md §Rollback`
- P2: Feature flag off / circuit breaker open
- P3-P4: Hotfix branch created

### Step 4: Root Cause Analysis
Fullstack Developer (08) + applicable specialist:
1. Reproduce issue in staging
2. Identify root cause (not just symptoms)
3. Document: what happened, why it happened, what was the blast radius

### Step 5: Fix & Verification
1. Hotfix branch: `hotfix/vMAJOR.MINOR.PATCH`
2. Code Reviewer (12): Expedited review (15 min SLA for P1/P2)
3. Tester (13): Regression test on fix
4. Security Agent (16): Security check if security-related
5. CI/CD Agent (18): Deploy to staging + smoke tests

### Step 6: Production Fix Deploy
1. Git Governance (19): Emergency PR (`hotfix/vX.Y.Z` → `main`)
2. Require: Orchestrator (01) approval (P1/P2 single approver)
3. CI/CD Agent (18): Deploy + monitor

### Step 7: Incident Close & Communication
1. Update `product-management/sprints/current/blockers.md` → Status: RESOLVED
2. Write incident summary in `artifacts/audit-trail.md`
3. If GDPR-relevant (data breach): `frameworks/gdpr/gdpr-checklist.md` §ART33 — 72h notification clock

### Step 8: Post-Mortem
Lesson Learner (21) within 48h of P1/P2 resolution:
1. Produce post-mortem document
2. Extract lessons → append to `memories/central-lessons-learned/`
3. Identify standard/procedure updates needed
4. Propose follow-up tasks to PO (02) for backlog

## Blameless Post-Mortem Template
```markdown
## Post-Mortem: INCIDENT-[N]
### Timeline
[What happened, when, in chronological order]
### Root Cause
[The underlying systemic cause — not the human action]
### Impact
[Users affected, data affected, duration, business impact]
### What Went Well
[Detection, response, comms]
### What Could Be Improved
[Process gaps, missing monitoring, insufficient tests]
### Action Items
| Action | Owner | Due | Status |
|--------|-------|-----|--------|
```

## Changelog
| Version | Date | Change |
|---------|------|--------|
| v1.0 | Sprint 0 | Initial incident SOP |
