# Test Coverage Thresholds — v1.0

## Scope
All code written by Fullstack Developer (08), Data Engineer (09), and AI Engineer (11). Enforced by Tester (13) at Gate 3.

## Coverage Requirements
| Coverage Type | Threshold | Block Condition |
|---------------|-----------|----------------|
| Line Coverage | ≥ 80% | < 80% → DEPLOY BLOCKED |
| Branch Coverage | ≥ 75% | < 75% → DEPLOY BLOCKED |
| Function Coverage | ≥ 85% | < 85% → DEPLOY BLOCKED |
| Statement Coverage | ≥ 80% | < 80% → DEPLOY BLOCKED |

## Coverage by Component Type
| Component | Required Coverage | Rationale |
|-----------|-----------------|-----------|
| Business logic / Services | 90% | High business risk |
| API route handlers | 85% | External interface |
| Data access layer | 80% | Data integrity risk |
| Utility functions | 85% | Reused widely |
| UI components (unit) | 70% | Visual testing supplements |
| Configuration/constants | Excluded | Not executable logic |
| Generated code | Excluded | Tool-generated |
| Migration scripts | 80% (reversibility) | Data safety |

## Test Categories (Mandatory)
| Category | Scope | Tool Examples | Minimum Count |
|----------|-------|-------------|---------------|
| Unit tests | Single function/class, all deps mocked | Jest, pytest, Go test | 1 per public function |
| Integration tests | Module boundaries, real deps where feasible | Supertest, pytest-integration | 1 per API endpoint |
| E2E tests | Full user flows (happy path + error) | Playwright, Cypress | 1 per Gherkin AC |
| Contract tests | API contract validation | Pact | 1 per external API |

## Coverage Exclusion Rules
Files/patterns that may be excluded (must be documented):
- `*.config.*`, `*.constants.*` — configuration only
- `migrations/` — covered by integration tests
- `__generated__/` — tool-generated
- `*.mock.*`, `*.fixture.*`, `*.stub.*` — test support files
- `index.ts` barrel exports — no logic

Exclusion must be declared in `.coveragerc` or `jest.config.ts` with comment explaining why.

## Reporting Format
Tester (13) produces `TEST-REPORT.md` with:
```
## Coverage Summary
| Metric | Target | Actual | Status |
|--------|--------|--------|--------|
| Line | ≥80% | 84.2% | ✓ PASS |
| Branch | ≥75% | 78.1% | ✓ PASS |
| Function | ≥85% | 86.4% | ✓ PASS |
| Statement | ≥80% | 83.9% | ✓ PASS |

## Test Results
- Total: 247
- Passed: 244
- Failed: 3
- Skipped: 0

## Failed Tests
[List each failed test with: name, AC reference, expected, actual, repro steps]
```

## Enforcement Chain
1. Tester (13) runs coverage report
2. If any threshold not met → emit `DEPLOY_BLOCKED` status
3. CI/CD Agent (18) receives `DEPLOY_BLOCKED` → halts pipeline
4. Fullstack Developer (08) receives remediation task
5. Re-run Tester (13) after fix

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial thresholds | Tester (13) + Scrum Master (03) |
