# Definition of Done — v1.0

## Purpose
A story is DONE only when ALL criteria below are met. No exceptions. No partial credit. Enforced by Scrum Master (03) and Validator (14).

## Criteria

### Code Quality ✓
- [ ] Code passes all naming convention rules (`standards/coding-standard/naming-conventions.md` v1.0)
- [ ] No `TODO`, `FIXME`, `HACK`, or `XXX` comments left in merged code
- [ ] No `console.log`, `print()`, `debugger` statements in production code
- [ ] Zero TypeScript `any` types or Python untyped functions
- [ ] No hardcoded configuration values — all via env vars

### Testing ✓
- [ ] Unit tests written for all new functions/methods
- [ ] Integration tests written for all new API endpoints
- [ ] Test coverage ≥ 80% on new code (`standards/testing-standard/coverage-thresholds.md` v1.0)
- [ ] All tests pass in CI (Gate 3)
- [ ] E2E test covers happy path and primary error path

### Review & Validation ✓
- [ ] Code Reviewer (12) verdict: **PASS** (zero P1/P2 findings)
- [ ] Validator (14) verdict: **PASS** (all Gherkin ACs satisfied)
- [ ] Security Agent (16) verdict: **PASS** (zero P1 findings)
- [ ] GDPR Agent (17) cleared if PII is involved

### Traceability ✓
- [ ] All story requirements mapped in `artifacts/compliance-traceability-matrix.md`
- [ ] No RED gaps in requirements traceability matrix
- [ ] Story ID referenced in all commit messages

### Documentation ✓
- [ ] API changes reflected in OpenAPI spec (`architecture/api-contract-vN.yaml`)
- [ ] README updated if setup steps changed
- [ ] Architecture decision recorded in ADR if new technology or pattern introduced

### Deployment ✓
- [ ] PR merged to `develop` via Git Governance Agent (19)
- [ ] CI/CD Gate 3 PASSED (coverage + traceability)
- [ ] Deployed to staging successfully (Gate 4)
- [ ] Smoke tests PASS on staging

### Ceremony ✓
- [ ] Story demonstrated in Sprint Review
- [ ] Velocity updated in Scrum Master (03) memory
- [ ] Lesson opportunities noted for Lesson Learner (21)

## Definition of Ready (for Sprint Entry)
Before entering a sprint, a story must have:
- [ ] Gherkin acceptance criteria written (all Given/When/Then scenarios)
- [ ] Story estimated (points or T-shirt size)
- [ ] Dependencies identified and available
- [ ] Design specs available if UI work involved

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial DoD | Scrum Master (03) + PO (02) |
