# Central Lessons Learned — Organizational Memory

## Role
Append-only organizational knowledge base. Contains all lessons, patterns, anti-patterns, and improvement actions extracted from sprints.

## SOLE WRITE AUTHORITY
**Lesson Learner (21) ONLY.**
No other agent, human, or script may write to this directory.
Violations constitute a critical process failure.

## Read Authority
ALL agents. Router (00) actively injects constraints from this memory into every dispatch packet.

## Entry Format
See `LESSON-SPRINT-N-SEQ` template in `lessons-learned.md`.

## Archival Policy
- Lessons are NEVER deleted
- Entries older than 10 sprints are moved to `archive/` but remain readable
- Archive format: `archive/lessons-sprint-N.md`

## Index Structure
Lessons indexed by:
1. Sprint number
2. Pattern Category (Technical | Process | Team | Security | Compliance)
3. Standards Reference (if applicable)
4. Recurring flag (first occurrence vs. recurrence)

## Constraints
- Append-only: never overwrite or delete entries
- Every entry must have an actionable, measurable improvement action
- Standards update proposals submitted to Scrum Master (03) for approval
