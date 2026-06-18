# Workflow 2: Implementation → Review → Test → Validate → Merge

## Purpose
Deliver a user story from code-ready to merged production artifact, passing all quality gates.

## Trigger
Router (00) emits dispatch packet targeting Fullstack Developer (08).

## Agents Involved
Fullstack Developer (08), Code Reviewer (12), Tester (13), Validator (14), Traceability Agent (15), Security Agent (16), GDPR Agent (17), Git Governance (19), CI/CD Agent (18)

---

## Step 1: Implementation
**Agent**: Fullstack Developer (08)
**Input**:
- Router dispatch packet (agent, skill, context_path, memory_refs)
- User story with Gherkin ACs: `product-management/backlog/stories/STORY-NNN.md`
- Architecture specs: `architecture/`
- Standards: `standards/coding-standard/` v1.0
- Anti-patterns: `memories/central-lessons-learned/lessons-learned.md`

**Process**:
1. Read Gherkin ACs — halt if missing (emit BLOCKED)
2. Read central lessons — avoid known anti-patterns
3. Implement feature per AC, architecture spec, and naming conventions
4. Zero hardcoded secrets, all env vars
5. Write `IMPLEMENTATION_SUMMARY.md` (≤300 tokens)

**Output**: Source code files + `IMPLEMENTATION_SUMMARY.md`

**Decision Gate**: If any AC is ambiguous → emit BLOCKED to PO (02). Do not guess.

---

## Step 2: Code Review (Automatic — Background)
**Agent**: Code Reviewer (12) — READ-ONLY
**Input**:
- PR diff
- All `standards/coding-standard/` files
- `frameworks/owasp/CLAUDE.md`
- `memories/central-lessons-learned/lessons-learned.md`

**Process**: Execute code review SOP (`procedures/code-review-process/CLAUDE.md`)

**Output**: `REVIEW-REPORT.md` with verdict: PASS or FAIL

**Decision Gate**:
- FAIL (P1/P2 findings) → Return to Step 1. Developer fixes and re-submits PR.
- PASS → Proceed to Step 3.

**SLA**: 15 minutes max.

---

## Step 3: Test Suite Execution
**Agent**: Tester (13)
**Input**:
- PR-merged source code
- Gherkin ACs from user story
- `standards/testing-standard/coverage-thresholds.md` v1.0

**Process**:
1. Map each Gherkin AC to a test case (1:1)
2. Generate unit, integration, E2E tests
3. Run test suite with coverage measurement
4. Report pass/fail/coverage

**Output**: Test files + `TEST-REPORT.md`

**Decision Gate**:
- Any test FAIL or coverage < 80% → emit DEPLOY_BLOCKED to CI/CD (18). Return to Step 1.
- PASS → Proceed to Step 4.

---

## Step 4: Acceptance Criteria Validation
**Agent**: Validator (14)
**Input**:
- `TEST-REPORT.md` from Step 3
- Original Gherkin ACs from user story
- NFR specifications from `memories/shared-context/`

**Process**:
1. For each Gherkin scenario: verify test evidence shows PASS
2. Validate NFRs: latency, error rate, accessibility
3. Confirm no AC was silently dropped

**Output**: `VALIDATION-REPORT.md` — verdict: PASS or FAIL

**Decision Gate**:
- FAIL → Return to Fullstack Developer (08) with specific gaps listed.
- PASS → Proceed to Step 5.

---

## Step 5: Traceability Mapping
**Agent**: Traceability & Compliance (15)
**Input**:
- `VALIDATION-REPORT.md`
- All `input_documents/` (READ-ONLY)
- `artifacts/compliance-traceability-matrix.md`

**Process**:
1. Map this story's requirements to: source doc → code → test → status
2. Update traceability matrix
3. Flag any RED gaps (unimplemented requirements)

**Output**: Updated `artifacts/compliance-traceability-matrix.md`

**Decision Gate**:
- RED gaps → Router (00) dispatches remediation to Developer (08) or Tester (13).
- No RED gaps → Proceed to Step 6.

---

## Step 6: Security & GDPR Clearance
**Agents**: Security Agent (16) + GDPR Agent (17) (run in parallel)
**Input**:
- Source code diff
- `frameworks/owasp/CLAUDE.md`
- `frameworks/gdpr/gdpr-checklist.md` (only if PII-touching code)

**Process**:
- Security (16): OWASP Top-10 check + SAST
- GDPR (17): GDPR checklist (if applicable)

**Output**:
- `SECURITY-REPORT.md` — PASS or BLOCKED
- `GDPR-REPORT.md` — PASS or BLOCKED (if applicable)

**Decision Gate**:
- Any BLOCKED → Halt. Developer (08) must remediate. Re-run Step 6.
- PASS → Proceed to Step 7.

---

## Step 7: PR Creation & Merge
**Agent**: Git Governance (19)
**Input**:
- All PASS reports from Steps 2-6
- Commit history (Conventional Commits)
- `standards/git-standard/git-commit-standards.md` v1.0

**Process**:
1. Validate all commits follow Conventional Commits format
2. Create PR with: description, linked story, test evidence links, reviewer assignments
3. Confirm Gate 1 + Gate 2 PASS
4. Execute merge (squash merge to develop)

**Output**: Merged SHA + `artifacts/audit-trail.md` entry

---

## Step 8: Staging Deploy & Smoke Test
**Agent**: CI/CD & Infrastructure (18)
**Input**:
- Merged commit SHA
- Deployment config

**Process**:
1. Trigger staging deploy pipeline
2. Execute smoke tests
3. If smoke tests fail → automatic rollback + alert Scrum Master (03)

**Output**: Deploy log + smoke test results

**End State**: Feature deployed to staging. Story moves to DONE on kanban board.
