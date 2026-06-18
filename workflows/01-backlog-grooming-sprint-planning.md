# Workflow 1: Backlog Grooming & Sprint Planning

## Purpose
Transform raw business requirements into a sprint-ready task list with clear ownership.

## Trigger
Start of sprint planning cycle or when backlog falls below 2-sprint runway.

## Agents Involved
Product Analyst (04), Product Owner (02), Scrum Master (03), Router (00)

---

## Step 1: Document Analysis
**Agent**: Product Analyst (04)
**Input**:
- ALL files in `input_documents/` (READ-ONLY)
- `memories/shared-context/sprint-goals.md`

**Process**:
1. Parse all business documents for requirements, KPIs, constraints
2. Extract user personas from stakeholder descriptions
3. Identify data-backed prioritization signals
4. Map requirements to measurable outcomes

**Output**: `artifacts/sprint-reports/analysis-sprint-N.md`
- Sections: KPIs | Personas | Key Insights | Prioritization Signals
- Every claim cites source document + section

**Decision Gate**: Output reviewed by PO (02) — if insights insufficient, return to Step 1 with clarification.

---

## Step 2: Epic & Story Creation
**Agent**: Product Owner (02)
**Input**:
- `artifacts/sprint-reports/analysis-sprint-N.md` (from Step 1)
- `product-management/backlog/` (existing items)
- `memories/shared-context/`

**Process**:
1. Create/update Epics for themes identified in analysis
2. Decompose Epics into User Stories (As a / I want / So that)
3. Write Gherkin ACs for each story (Given/When/Then)
4. Apply INVEST principle check to each story
5. Prioritize by: business value × risk

**Output**:
- Epics: `product-management/backlog/epics/EPIC-NNN.md`
- Stories: `product-management/backlog/stories/STORY-NNN.md`

**Decision Gate**: Each story must have ≥1 Gherkin scenario. Stories without ACs → BLOCKED, returned to Step 2.

---

## Step 3: Capacity Planning
**Agent**: Scrum Master (03)
**Input**:
- `memories/shared-context/sprint-goals.md` (velocity history)
- Team capacity (agent availability)
- `product-management/sprints/current/blockers.md`

**Process**:
1. Calculate available sprint capacity based on historical velocity
2. Account for known blockers and carryover
3. Identify sprint goal (primary theme)
4. Set sprint commitment ceiling

**Output**: Sprint capacity plan in `memories/shared-context/sprint-goals.md`

**Decision Gate**: If capacity < minimum viable sprint (3 stories) → escalate to Orchestrator (01).

---

## Step 4: Technical Decomposition & Dispatch
**Agent**: Router (00)
**Input**:
- Prioritized stories from Step 2
- Sprint capacity from Step 3
- `agents/00_ROUTER/model-mapping.yaml`
- `memories/central-lessons-learned/lessons-learned.md`

**Process**:
1. Decompose each story into technical tasks
2. Assign each task to appropriate agent slug
3. Inject historical constraints from Tier 3 memory
4. Produce dispatch packets for each task

**Output**: `product-management/sprints/current/MULTI_AGENT_PLAN.md`
Format: Table with columns: Task ID | Story ID | Agent | Model | Input | Expected Output | Deadline

**Decision Gate**: Any task without clear agent assignment → BLOCKED, return to PO (02) for AC refinement.

---

## Step 5: Sprint Backlog Finalization
**Agents**: Product Owner (02) + Scrum Master (03)
**Input**:
- `product-management/sprints/current/MULTI_AGENT_PLAN.md`
- Sprint capacity plan

**Process**:
1. Validate task count fits capacity
2. PO confirms business priority ordering
3. SM confirms Definition of Ready for each story
4. Lock sprint backlog

**Output**:
- `product-management/sprints/current/tasks.md` — Sprint task list
- Updated `artifacts/kanban-board.md` — All tasks in BACKLOG column

**End State**: Sprint is RUNNING. All agents have dispatch packets.
