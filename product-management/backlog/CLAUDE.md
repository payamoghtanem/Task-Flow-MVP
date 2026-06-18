# Product Backlog

## Role
Ordered list of all product work items. PO (02) owns priority order. Stories must meet Definition of Ready before sprint entry.

## File Structure
- `epics/EPIC-NNN.md` — Epic definitions with business goals
- `stories/STORY-NNN.md` — User stories with Gherkin ACs
- `features/FEATURE-NNN.md` — Feature briefs from Product Specialist (05)
- `grooming-log.md` — Grooming session records

## Story Template
```markdown
# STORY-NNN: [Title]
## Epic
EPIC-NNN

## User Story
As a [role], I want [goal] so that [value].

## Acceptance Criteria
**Scenario 1: [Happy Path]**
Given [context]
When [action]
Then [expected result]

**Scenario 2: [Error Path]**
Given [context]
When [invalid action]
Then [error handling]

## Non-Functional Requirements
- Performance: [e.g., API response < 200ms P95]
- Security: [e.g., requires authentication]
- Accessibility: [e.g., WCAG 2.1 AA]

## Estimate
[Story Points or T-Shirt Size]

## Status
DRAFT | READY | IN_SPRINT | DONE | REJECTED

## Dependencies
[STORY-NNN or NONE]
```

## Write Authority
Product Owner (02) + Product Specialist (05)
