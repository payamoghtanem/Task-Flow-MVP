# Workflow 5: Sprint Retrospective & Organizational Learning

## Purpose
Capture, synthesize, and institutionalize sprint learnings. Compact agent memories. Propose standard improvements. Generate sprint status report.

## Trigger
End of every sprint. Initiated by Scrum Master (03).

## Agents Involved
Scrum Master (03), Lesson Learner (21), Orchestrator (01), Product Owner (02)

---

## Step 1: Data Collection
**Agent**: Scrum Master (03)
**Input**:
- All agent `memory/` files (read-only survey)
- `TEST-REPORT.md` files from sprint
- `REVIEW-REPORT.md` files from sprint
- `product-management/sprints/current/blockers.md`
- `artifacts/audit-trail.md` (sprint entries)
- Velocity data from `memories/shared-context/`

**Process**:
1. Aggregate: stories completed, stories carried over, blockers encountered
2. Identify: slowest steps, most common failure modes, re-review loops
3. Calculate velocity delta vs. previous sprint

**Output**: Sprint data package in `memories/shared-context/retro-data-sprint-N.md`

---

## Step 2: Retro Facilitation
**Agent**: Scrum Master (03)
**Format**: Start/Stop/Continue (structured)

**Process**:
Produce retro summary in `ceremonies/retrospective.md`:
```
## Sprint N Retrospective — DATE

### What Went Well (Continue)
- [Evidence-backed observations]

### What Didn't Work (Stop)
- [Specific process failures with root cause hypothesis]

### What to Try (Start)
- [Concrete, testable improvements]

### Velocity
- Sprint N: [N] points
- Sprint N-1: [N] points
- Trend: ↑/↓/→
```

---

## Step 3: Lesson Extraction
**Agent**: Lesson Learner (21)
**Input**:
- Sprint data package from Step 1
- Retro summary from Step 2
- All blockers from sprint
- Any FAILED review or test reports

**Process**:
1. Extract ≥3 actionable, testable lessons
2. For each lesson:
   - Identify pattern category (Technical / Process / Team / Security / Compliance)
   - Determine root cause
   - Define measurable action
   - Check if this pattern is recurring (search central memory)
3. Format each as `LESSON-SPRINT-N-SEQ` template

**Output**: ≥3 lessons appended to `memories/central-lessons-learned/lessons-learned.md`

**Decision Gate**: If fewer than 3 insights extractable → return to Scrum Master (03) for deeper retrospective data.

---

## Step 4: Standards Update Proposals
**Agent**: Lesson Learner (21)
**Input**: Lessons from Step 3

**Process**:
1. For each lesson with `Standards Update Required: Yes`:
   - Draft specific change to relevant standard file
   - Mark change type: Addition / Modification / Deprecation
2. Submit proposals to Scrum Master (03) for approval

**Output**: Standards update proposals in agent memory (pending SM approval)

**Decision Gate**:
- Scrum Master (03) APPROVES: Lesson Learner (21) applies update + increments standard version
- Scrum Master (03) REJECTS: Proposal archived with rejection reason

---

## Step 5: Memory Compaction
**Agent**: Lesson Learner (21)
**Input**: All `agents/*/memory/` files

**Process**:
For each agent memory file:
1. Identify entries older than 2 sprints
2. Summarize old entries into ≤3 lines
3. Prune to ≤200 lines total
4. Preserve: active decisions, unresolved items, lessons not yet routed

**Output**: All `agents/*/memory/` files compacted to ≤200 lines

---

## Step 6: Sprint Status Report
**Agent**: Orchestrator (01)
**Input**:
- Velocity data
- Completed stories
- Lessons from Step 3
- Traceability matrix status

**Process**:
Generate `artifacts/product-status-report.md`:
```
## Product Status Report — Sprint N — DATE

### Sprint Summary
- Stories Committed: N | Delivered: N | Carried Over: N
- Velocity: N pts | Trend: ↑/↓/→
- Coverage: N% | Traceability: N% GREEN

### Key Accomplishments
[Bulleted list of shipped features]

### Blockers & Risks
[Active risks for next sprint]

### Next Sprint Preview
[Top 3 planned stories]

### Standards Changes Applied
[Any standard version bumps from this sprint]
```

---

## Step 7: Context Reset
**Agent**: Scrum Master (03) + Orchestrator (01)
**Process**:
1. Archive current sprint folder: `product-management/sprints/sprint-N/`
2. Create new sprint folder: `product-management/sprints/current/`
3. Reset `memories/shared-context/` with new sprint goals
4. Update `artifacts/kanban-board.md` — clear DONE column

**End State**: Org memory updated. Agent memories compacted. Standards versioned. New sprint ready.
