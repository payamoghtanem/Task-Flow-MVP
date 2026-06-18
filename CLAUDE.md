# Agile AI Product Team — Root System Contract

## Identity
This repository is the operating system for a 22-agent AI software product team running inside Claude Code. Agents are organized by role, isolated by directory, and orchestrated via structured dispatch packets.

## Orchestration Rules
- All incoming tasks MUST pass through `agents/00_ROUTER/` before any agent executes
- Router outputs a JSON dispatch packet — no agent may begin work without one
- Scrum ceremonies are defined in `ceremonies/`; agents must not improvise process
- Every agent output must cite the standards version it was written against

## Directory Contracts
| Path | Purpose | Write Authority |
|------|---------|----------------|
| `agents/` | 22 agent workspaces | Owner agent only |
| `standards/` | Coding, security, API, git, testing, AI standards | Lesson Learner + Architect |
| `frameworks/` | Scrum DoD, GDPR, OWASP | Scrum Master + Architect |
| `procedures/` | Code review, release, incident SOPs | Orchestrator |
| `ceremonies/` | Sprint ceremonies scripts | Scrum Master + PO |
| `input_documents/` | Business Case, BRD, PRD, SDD, TDD, IDD | READ-ONLY for all agents |
| `product-management/` | Backlog, roadmap, sprint tasks | PO + Scrum Master |
| `memories/shared-context/` | Sprint goals, API contracts, blockers | Orchestrator + Scrum Master |
| `memories/central-lessons-learned/` | Org lessons | Lesson Learner ONLY |
| `artifacts/` | Kanban, traceability matrix, audit trail | Designated agents |
| `architecture/` | C4 models, ADRs | Solution Architect |
| `workflows/` | Step-by-step orchestration flows | Orchestrator |

## Non-Negotiable Rules
1. Never load another agent's `memory/` directory directly
2. Never commit secrets, PII, or credentials anywhere in this repo
3. Code Reviewer (12) has READ-ONLY access — it never writes source code
4. Lesson Learner (21) is the ONLY writer to `memories/central-lessons-learned/`
5. Router (00) output is ALWAYS a JSON dispatch packet
6. All standards are immutable during sprint execution
7. Coverage < 80% blocks all deploys
8. Any P1 security finding blocks the pipeline immediately

## Agent Index
00_ROUTER | 01_ORCHESTRATOR | 02_PRODUCT_OWNER | 03_SCRUM_MASTER | 04_PRODUCT_ANALYST | 05_PRODUCT_SPECIALIST | 06_SOLUTION_ARCHITECT | 07_UI_UX_DESIGNER | 08_FULLSTACK_DEVELOPER | 09_DATA_ENGINEER | 10_DATA_SCIENTIST | 11_AI_ENGINEER | 12_CODE_REVIEWER | 13_TESTER | 14_VALIDATOR | 15_REQUIREMENTS_TRACEABILITY_AND_COMPLIANCE | 16_SECURITY_AGENT | 17_GDPR_AND_COMPLIANCE | 18_CICD_AND_INFRASTRUCTURE | 19_GIT_GITHUB_GOVERNANCE | 20_CLOUD_PLATFORM_ENGINEER | 21_LESSON_LEARNER

## Standards Versions (Updated by Lesson Learner)
- coding-standard: v1.0
- git-standard: v1.0
- testing-standard: v1.0
- security-standards: v1.0
- api-design-standards: v1.0
- ai-development-standard: v1.0
