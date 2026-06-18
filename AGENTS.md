# Universal Agent Baseline — Tool-Agnostic Rules

This file applies to ALL agents regardless of framework, model, or runtime.

## Universal Constraints
1. **Single Responsibility**: Each agent executes exactly one role. Never scope-creep.
2. **Dispatch Required**: No agent starts work without a Router dispatch packet.
3. **Standards Citation**: Every output artifact must cite the standard version used.
4. **Memory Hygiene**: Local memory (`agents/[SLUG]/memory/`) stays ≤200 lines. Prune on sprint end.
5. **No Secrets**: Credentials, tokens, API keys, PII — never written anywhere in this repo.
6. **Handoff Format**: Inter-agent handoffs are structured markdown with: INPUT, OUTPUT, STATUS, NEXT_AGENT.
7. **Fail Fast**: If input violates acceptance criteria, output a structured BLOCKED status — never guess.
8. **Idempotency**: Re-running an agent on the same input must produce the same output.
9. **Audit Trail**: All state changes append to `artifacts/audit-trail.md`.
10. **Lesson Routing**: Lessons, patterns, and failures go to Lesson Learner (21) via structured handoff — never written directly.

## Handoff Packet Format
```json
{
  "from_agent": "AGENT_SLUG",
  "to_agent": "AGENT_SLUG",
  "task_id": "SPRINT-N-TASK-SEQ",
  "status": "COMPLETE | BLOCKED | NEEDS_REVIEW",
  "input_ref": "path/to/input",
  "output_ref": "path/to/output",
  "standards_version": "v1.0",
  "notes": "One-line human-readable summary"
}
```

## Blocked Status Format
```json
{
  "status": "BLOCKED",
  "agent": "AGENT_SLUG",
  "task_id": "SPRINT-N-TASK-SEQ",
  "reason": "Precise reason — missing input, failing criterion, etc.",
  "resolution_required_from": "AGENT_SLUG or HUMAN",
  "blocking_since": "ISO-8601 timestamp"
}
```

## Memory Tiers (Read-Only Reference)
- **Tier 1 Local** (`agents/[SLUG]/memory/`): Own-agent only. ≤200 lines. Never read by others.
- **Tier 2 Shared** (`memories/shared-context/`): Read by all. Written by Orchestrator (01) + Scrum Master (03).
- **Tier 3 Org** (`memories/central-lessons-learned/`): Read by all. Written by Lesson Learner (21) ONLY.

## CI/CD Gate Summary
| Gate | Trigger | Blocker Condition |
|------|---------|------------------|
| Gate 1 | Pre-commit | P1 security finding or secret detected |
| Gate 2 | PR Open | Code Reviewer FAIL verdict |
| Gate 3 | PR Merge | Coverage < 80% or RED traceability gaps |
| Gate 4 | Post-Deploy | Smoke test failure |
| Gate 5 | Sprint End | Lesson Learner not completed |
