# AI Prompt Versioning Standard — v1.0

## Scope
All prompts, system instructions, and LLM configurations managed by AI Engineer (11) and any agent embedding prompts in code.

## Prompt File Format
Every prompt is stored as a versioned markdown file:
```
agents/11_AI_ENGINEER/skills/prompts/PROMPT-[NNN]-[name].md
```

### Prompt File Template
```markdown
# Prompt: PROMPT-[NNN]-[descriptive-name]

## Metadata
| Field | Value |
|-------|-------|
| Version | v[MAJOR].[MINOR] |
| Status | DRAFT \| ACTIVE \| DEPRECATED |
| Author | AI Engineer (11) |
| Created | ISO-8601 date |
| Last Modified | ISO-8601 date |
| Model Target | claude-opus-4-8 (primary), claude-sonnet-4-6 (fallback) |
| Temperature | [0.0 – 1.0] |
| Max Tokens | [N] |
| Use Case | [One sentence] |

## System Prompt
[Full system prompt text]

## User Prompt Template
[Template with {{variable}} placeholders]

## Variables
| Variable | Type | Description | Example |
|----------|------|-------------|---------|
| {{variable_name}} | string | Description | "example value" |

## Expected Output Format
[Describe structure, type, constraints]

## Evaluation Criteria
| Criterion | Measurement | Target |
|-----------|-------------|--------|
| Accuracy | [How measured] | ≥ [target]% |
| Latency P50 | Median response time | ≤ [N]ms |
| Latency P99 | 99th percentile | ≤ [N]ms |
| Cost per call | API cost estimate | ≤ $[N] |

## Eval Results
| Version | Date | Accuracy | P50 | P99 | Cost | Notes |
|---------|------|----------|-----|-----|------|-------|
| v1.0 | [date] | [%] | [ms] | [ms] | [$] | Initial |

## Changelog
| Version | Date | Change | Reason |
|---------|------|--------|--------|
| v1.0 | [date] | Initial version | [reason] |
```

## Versioning Rules
### Semantic Versioning for Prompts
- **MAJOR** bump: System prompt rewritten or use case changes — requires new eval suite
- **MINOR** bump: Variable additions, output format changes — requires regression eval
- **Patch** updates not used — all changes are at least MINOR

### Version Control Rules
1. Every prompt change requires a new version (no overwriting)
2. Previous prompt versions are archived — never deleted
3. DEPRECATED prompts kept for 2 sprints before archival
4. ACTIVE prompts must have passed eval criteria before deployment

## Model Assignment
Prompts must declare the target model. Model changes require MAJOR version bump. Model assignments from `agents/00_ROUTER/model-mapping.yaml` take precedence.

## Fallback Chain
```yaml
primary: claude-opus-4-8
fallback: claude-sonnet-4-6
last_resort: claude-haiku-4-5
timeout_ms: 30000
retry_count: 3
```

## A/B Testing Protocol
When comparing prompt versions:
1. Run both versions against identical eval dataset (min 100 samples)
2. Statistical significance: p < 0.05
3. Winner must beat baseline on: accuracy, cost, latency
4. Document results in Eval Results table

## Cost Tracking
All LLM calls must log:
```json
{
  "prompt_id": "PROMPT-001",
  "prompt_version": "v1.2",
  "model": "claude-opus-4-8",
  "input_tokens": 1204,
  "output_tokens": 387,
  "cost_usd": 0.0042,
  "latency_ms": 1820,
  "timestamp": "ISO-8601"
}
```

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial prompt versioning standard | AI Engineer (11) |
