# Workflow 3: Requirements Traceability & Compliance Audit

## Purpose
Ensure every requirement in every input document traces to implemented code and verified tests. Zero gaps permitted.

## Trigger
Post-merge (automated). Also triggered on-demand by Orchestrator (01) for compliance reviews.

## Agents Involved
Traceability & Compliance (15), Router (00), Fullstack Developer (08), Tester (13)

---

## Step 1: Full Document Scan
**Agent**: Traceability & Compliance (15)
**Input**: ALL files in `input_documents/` (READ-ONLY)

**Process**:
1. Parse all documents: Business Case, BRD, PRD, SDD, TDD, IDD
2. Extract every requirement with its ID (e.g., BRD-001, PRD-045)
3. Build complete requirement registry

**Output**: Internal requirement registry (working state in agent memory)

---

## Step 2: Code & Test Mapping
**Agent**: Traceability & Compliance (15)
**Input**:
- Requirement registry from Step 1
- Source code file index
- Test file index
- Previous `artifacts/compliance-traceability-matrix.md`

**Process**:
For each requirement ID:
1. Search source code for implementation references
2. Search test files for test coverage
3. Assign status:
   - GREEN: req_id → code_ref exists + test_ref exists + tests PASS
   - AMBER: req_id → code_ref exists but no test_ref
   - RED: req_id → no code_ref (unimplemented)

**Output**: Draft updated `artifacts/compliance-traceability-matrix.md`

---

## Step 3: Gap Analysis
**Agent**: Traceability & Compliance (15)
**Input**: Draft matrix from Step 2

**Process**:
1. Count RED gaps (unimplemented requirements)
2. Count AMBER gaps (untested requirements)
3. Generate compliance summary

**Output**: `artifacts/sprint-reports/compliance-report.md`
```
## Compliance Summary — Sprint N — Date
| Status | Count | % of Total |
|--------|-------|-----------|
| GREEN | 142 | 87.2% |
| AMBER | 15 | 9.2% |
| RED | 6 | 3.7% |

### RED Gaps (MUST REMEDIATE)
| Req ID | Source Doc | Description | Assigned To |
|--------|-----------|-------------|-------------|
```

---

## Step 4: Remediation Dispatch
**Agent**: Router (00)
**Input**: `artifacts/sprint-reports/compliance-report.md` — RED and AMBER gaps

**Process**:
For each RED gap:
1. Create remediation task
2. Dispatch to Fullstack Developer (08) for implementation
3. Deadline: within current sprint if capacity allows; else next sprint P1

For each AMBER gap:
1. Create test task
2. Dispatch to Tester (13)
3. Deadline: within current sprint

**Output**: Dispatch packets per gap + updated `artifacts/kanban-board.md`

---

## Step 5: Matrix Finalization
**Agent**: Traceability & Compliance (15)
**Trigger**: After all RED gaps resolved and re-verified

**Process**:
1. Re-run Steps 1-3
2. Confirm zero RED gaps
3. Publish final matrix

**Output**: Final `artifacts/compliance-traceability-matrix.md`

**End State**: All requirements have GREEN or AMBER status. RED gaps eliminated.
