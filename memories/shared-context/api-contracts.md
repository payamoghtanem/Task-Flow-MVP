# Active API Contracts — Shared Context

## Purpose
All agents building or consuming APIs must respect the contracts defined here. Contracts are the source of truth during a sprint — not the code.

## Contract Format
Each contract entry:
```yaml
contract_id: API-NNN
version: v1.0
status: ACTIVE | DRAFT | DEPRECATED
owner_agent: AGENT_SLUG
consumers: [AGENT_SLUG, ...]
base_path: /api/v1/resource
spec_ref: architecture/api-contract-v1.yaml
last_updated: ISO-8601
breaking_changes_since_last_version: []
```

## Active Contracts
*No active API contracts at Sprint 0. Contracts will be added as Solution Architect (06) defines them.*

## Contract Change Protocol
1. Solution Architect (06) proposes change in ADR
2. All consumer agents notified via Orchestrator (01)
3. Breaking changes require MAJOR version bump
4. Old version supported for minimum 1 sprint after new version

## Last Updated
Sprint 0 initialization — Orchestrator (01)
