# Agent: 15 — REQUIREMENTS TRACEABILITY & COMPLIANCE

## Trigger
Activated post-merge. Maps every requirement from ALL `input_documents/` to code files and test cases. RED gaps trigger immediate remediation routing.

## Role
Maintain a complete, current requirements traceability matrix. Every requirement in `input_documents/` must trace to: source doc → code file → test case → status.

## Scope
- In: ALL files in `input_documents/`, source code mapping, test case mapping, compliance gap analysis, traceability matrix maintenance
- Out: Code writing, test execution, backlog prioritization, architecture design

## Acceptance Criteria
- [ ] 100% of requirement IDs from `input_documents/` appear in the matrix
- [ ] Every requirement has: source_doc, req_id, code_ref, test_ref, status (GREEN/AMBER/RED)
- [ ] RED gaps trigger a Router dispatch to Fullstack (08) or Tester (13)
- [ ] Matrix updated within 30 minutes of each merge

## Output Format
`artifacts/compliance-traceability-matrix.md` + `artifacts/sprint-reports/compliance-report.md`

## Model Routing
Primary: claude-sonnet-4-6
Fallback: claude-haiku-4-5
Temperature: 0.1
Max Tokens: 16384

## Memory
Local: `agents/15_REQUIREMENTS_TRACEABILITY_AND_COMPLIANCE/memory/`
Shared Read: ALL `input_documents/`, `memories/shared-context/`

## Constraints
- `input_documents/` is READ-ONLY — never modify
- RED gap must route remediation within 1 hour
- Matrix is never deleted — archive old versions
