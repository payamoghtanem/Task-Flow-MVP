# Workflow 4: Blocker & Incident Resolution

## Purpose
Detect, escalate, resolve, and learn from blockers and incidents with minimal sprint disruption.

## Trigger
Any agent writes status BLOCKED to `product-management/sprints/current/blockers.md`.

## Agents Involved
Any agent (detector), Scrum Master (03), Router (00), Lesson Learner (21), applicable implementation agents

---

## Step 1: Blocker Registration
**Agent**: Any (the blocked agent)
**Input**: The blocking condition encountered

**Process**:
1. Write to `product-management/sprints/current/blockers.md`:
```markdown
## BLOCKER-[N]
- Task ID: SPRINT-N-TASK-SEQ
- Blocked Agent: AGENT_SLUG
- Blocked Since: ISO-8601
- Reason: [Precise description — missing input, failing AC, security block, etc.]
- Resolution Required From: AGENT_SLUG or HUMAN
- Impact: [Which downstream tasks are blocked]
- Status: OPEN
```
2. Emit structured BLOCKED status in handoff packet

**Output**: Blocker entry in blockers.md

---

## Step 2: Blocker Detection & Triage
**Agent**: Scrum Master (03)
**Input**: `product-management/sprints/current/blockers.md`

**Process**:
1. Monitor blockers.md on each standup cycle
2. Classify blocker type:
   - **Technical**: Missing implementation, failing test, integration error
   - **Requirements**: Ambiguous AC, conflicting requirements
   - **External**: Dependency on external system/human
   - **Security/Compliance**: P1 gate block
3. Assess sprint impact: which tasks depend on this?
4. Set priority: Sprint-critical vs. next-sprint

**Output**: Triage analysis appended to blocker entry

---

## Step 3: Dependency Analysis & Reassignment
**Agent**: Router (00)
**Input**: Triage from Step 2

**Process**:
1. Map all tasks depending on the blocked task
2. Options assessment:
   - **Reassign**: Route to different agent if skills overlap
   - **Resequence**: Move blocked task, pull forward independent work
   - **Escalate**: Human input needed
   - **Pause**: Block downstream tasks until resolved
3. Issue revised dispatch packets

**Output**: Updated `product-management/sprints/current/MULTI_AGENT_PLAN.md` + new dispatch packets

**Decision Gate**:
- External blocker (human needed) → Notify Orchestrator (01), escalate to human
- Technical blocker (resolvable in sprint) → Dispatch resolution task

---

## Step 4: Resolution Execution
**Agent**: Assigned agent (per Router dispatch)
**Input**: Resolution task dispatch packet

**Process**: Execute the resolution (implementation fix, AC clarification, dependency resolution)

**Output**: Resolution artifact + updated blocker entry: Status → RESOLVED

---

## Step 5: Lesson Capture
**Agent**: Lesson Learner (21)
**Input**:
- Resolved blocker entry
- Root cause analysis from resolving agent

**Process**:
1. Extract blocker pattern: type, root cause, resolution time, impact
2. Generate lesson entry
3. Assess: Is this a recurring pattern? Does a standard need updating?

**Output**: Lesson entry appended to `memories/central-lessons-learned/lessons-learned.md`

**End State**: Blocker resolved, sprint back on track, lesson captured for future prevention.
