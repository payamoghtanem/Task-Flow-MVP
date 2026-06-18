# Backlog Grooming — Ceremony Script v1.0

## Participants
Product Owner (02), Product Analyst (04), Scrum Master (03) [facilitator]

## Time Box
Max 2 hours. Weekly cadence.

## Inputs
- Latest analysis report from Product Analyst (04)
- Current backlog: `product-management/backlog/`
- Lessons: `memories/central-lessons-learned/lessons-learned.md`

## Agenda

### 1. Backlog Health Check (15 min)
- Count stories in READY state (have full Gherkin ACs)
- Count stories in DRAFT state (ACs missing or incomplete)
- Target: ≥2-sprint runway in READY state

### 2. New Story Review (45 min)
For each new story proposed by PO:
- [ ] "As a [role] I want [goal] so that [value]" — complete?
- [ ] ≥1 Gherkin scenario (Given/When/Then)?
- [ ] All terms defined (no ambiguous language)?
- [ ] Dependencies identified?
- [ ] Estimated (points or T-shirt size)?
- If ALL ✓: mark READY. Else: mark DRAFT, assign refinement action.

### 3. Backlog Prioritization (30 min)
- Stack-rank using: Business Value × Risk matrix
- Top N stories (N = expected sprint velocity) are sprint candidates
- PO makes final call — SM documents rationale

### 4. Existing Story Refinement (20 min)
- Review top DRAFT stories — can any be completed to READY today?
- Flag stories stuck in DRAFT >2 sprints for potential removal

### 5. Close (10 min)
- Confirm READY runway count
- List stories moved DRAFT→READY this session
- Identify items needing stakeholder input before next session

## Output
Updated `product-management/backlog/` with READY/DRAFT status on all stories.
Session notes in `product-management/backlog/grooming-log.md`.
