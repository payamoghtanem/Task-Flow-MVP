# Central Lessons Learned

## Entry Template
```markdown
## LESSON-SPRINT-[N]-[SEQ]
- **Category:** Technical | Process | Team | Security | Compliance
- **Pattern:** [What happened — specific and observable]
- **Root Cause:** [Why it happened — systemic cause, not symptom]
- **Impact:** [What was affected — agents, stories, velocity, quality]
- **Action:** [What to do differently — specific, testable, and binary]
- **Owner Agent:** [agent-slug]
- **Standards Update Required:** Yes/No → [standards/path/file.md v?.?]
- **Recurring:** Yes/No
- **Sprint:** N
```

---

## LESSON-SPRINT-0-001
- **Category:** Process
- **Pattern:** All team standards, frameworks, and procedures initialized in Sprint 0 before any development work begins.
- **Root Cause:** Absence of baseline rules causes inconsistent agent behavior and rework in later sprints.
- **Impact:** Sprint 0 velocity = 0 feature stories; foundational investment for all future sprints.
- **Action:** Every new team instance must complete Sprint 0 (standards + agent setup) before Sprint 1. Never skip.
- **Owner Agent:** orchestrator
- **Standards Update Required:** No
- **Recurring:** No
- **Sprint:** 0

## LESSON-SPRINT-0-002
- **Category:** Technical
- **Pattern:** Date/time values must use ISO-8601 UTC format across all systems to prevent format mismatch between API and database.
- **Root Cause:** Different agents using local time formats caused integration failures in similar systems.
- **Impact:** Data inconsistency, test failures, debugging overhead.
- **Action:** All date/time fields in schemas, APIs, and logs must use ISO-8601 UTC. Enforced in `standards/coding-standard/api-design-standards.md` and Data Engineer (09) CLAUDE.md.
- **Owner Agent:** data-engineer
- **Standards Update Required:** No (already embedded in v1.0)
- **Recurring:** Yes — watch for this in every sprint
- **Sprint:** 0

## LESSON-SPRINT-0-003
- **Category:** Security
- **Pattern:** Hardcoded secrets in configuration files are the most common source of credential leaks.
- **Root Cause:** Developer convenience overriding security protocol during rapid prototyping.
- **Impact:** Potential credential exposure, P1 security finding, pipeline block.
- **Action:** Gate 1 secrets scan is non-negotiable. Any hardcoded secret = BLOCKED. Use env vars + secrets manager always.
- **Owner Agent:** security-agent
- **Standards Update Required:** No (embedded in security-standards.md v1.0)
- **Recurring:** Yes — enforce on every commit
- **Sprint:** 0
