# System Context — Agile AI Product Team

## Status
DRAFT — Sprint 0

## System Boundary
The Agile AI Product Team is a fully automated software development system composed of 22 specialized AI agents coordinated by a Router and Orchestrator. It ingests business requirements and produces shippable software artifacts.

## External Actors
| Actor | Role | Interface |
|-------|------|-----------|
| Human Product Stakeholder | Provides business requirements, approves epics | `input_documents/` |
| External LLM APIs | Model inference for each agent | HTTPS / Anthropic SDK |
| Version Control (GitHub) | Source of truth for code | Git / GitHub API |
| Cloud Platform | Deployment target | IaC via Agent 20 |
| CI/CD Pipeline | Quality gate enforcement | GitHub Actions |

## System Components
| Component | Description |
|-----------|-------------|
| Router (00) | Classifies tasks, dispatches to agents |
| Orchestrator (01) | Multi-sprint planning and coordination |
| Product Agents (02-05) | Requirements, backlog, analysis |
| Engineering Agents (06-11) | Architecture, design, implementation |
| Quality Agents (12-15) | Review, test, validate, trace |
| Compliance Agents (16-17) | Security, GDPR |
| DevOps Agents (18-20) | CI/CD, Git, Cloud |
| Learning Agent (21) | Lessons, standards improvement |

## Data Flows
1. Stakeholder → `input_documents/` → Product Agents → Backlog
2. Backlog → Router → Engineering Agents → Code
3. Code → Quality Agents → Compliance Agents → Git Agent → Merge
4. Merge → CI/CD Agent → Cloud Platform → Deployed Product
5. Sprint End → Lesson Learner → `memories/central-lessons-learned/` → Router (next sprint)
