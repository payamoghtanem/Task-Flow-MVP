# Code Review Process — SOP v1.0

## Trigger
Activated when a PR is opened against `develop` or `main`. Runs automatically via Gate 2.

## Agents
- **Executor**: Code Reviewer (12) — READ-ONLY
- **Notified**: Fullstack Developer (08) on findings
- **Escalation**: Solution Architect (06) for architecture concerns

## Inputs
- PR diff
- Linked user story (Gherkin ACs)
- `standards/coding-standard/` (all files, v1.0)
- `frameworks/owasp/CLAUDE.md`
- `memories/central-lessons-learned/lessons-learned.md`

## Process Steps

### Step 1: Preparation (0-2 min)
1. Load linked user story and Gherkin ACs
2. Load applicable standards (naming, security, API)
3. Load lessons learned to check for known anti-patterns
4. Identify all changed files in PR diff

### Step 2: Automated Checks (parallel)
Run ALL of the following simultaneously:
- Naming convention compliance (`standards/coding-standard/naming-conventions.md`)
- Security pattern check (`standards/coding-standard/security-standards.md`)
- API design compliance (`standards/coding-standard/api-design-standards.md`) if API files changed
- OWASP Top-10 check (`frameworks/owasp/CLAUDE.md`)
- Known anti-pattern check (`memories/central-lessons-learned/`)

### Step 3: Manual Review
For each changed file:
1. Does the code implement exactly what the AC specifies? (no over-engineering)
2. Are all error paths handled and returning correct status codes?
3. Is there any code that should be in a different agent's scope?
4. Are there any performance concerns (N+1 queries, unbounded loops)?
5. Is there dead code or commented-out code?

### Step 4: Finding Classification
Each finding classified as:
| Severity | Description | PR Action |
|----------|-------------|-----------|
| P1 Critical | Security vuln, broken auth, data leak | FAIL — must fix |
| P2 High | Standards violation, logical error | FAIL — must fix |
| P3 Medium | Best practice improvement | PASS with comment |
| P4 Low | Style preference, minor cleanup | PASS with suggestion |

### Step 5: Verdict
- **PASS**: Zero P1/P2 findings. PR may proceed.
- **FAIL**: One or more P1/P2 findings. PR blocked. Developer notified.

### Step 6: Report
Produce `REVIEW-REPORT.md` with:
```
## Verdict: PASS | FAIL
## Standards Version: v1.0
## Findings
| Severity | File | Line | Rule | Description | Remediation |
|----------|------|------|------|-------------|-------------|
...
## AC Compliance: All ACs testable from implementation? Yes | No
```

## SLA
- Review must complete within 15 minutes of PR open
- Developer must respond to FAIL within 4 business hours
- Re-review within 30 minutes of developer fix

## Changelog
| Version | Date | Change |
|---------|------|--------|
| v1.0 | Sprint 0 | Initial SOP |
