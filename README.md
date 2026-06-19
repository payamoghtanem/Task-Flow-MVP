# Agile AI Product Team

> A fully autonomous, 22-agent AI software delivery team running inside Claude Code — from business requirements to deployed, tested, security-cleared code.

---

## What Is This?

**Agile AI Product Team** is a production-ready operating system for AI-driven software development. It models a complete Agile team as 22 specialized Claude agents — each owning a single role, communicating through structured dispatch packets, and enforcing professional-grade standards at every step.

Drop in your business requirements. The team plans sprints, writes code, reviews it, tests it, checks security and GDPR compliance, manages Git, deploys to staging, and institutionalizes lessons learned — all autonomously, with human oversight at exactly the checkpoints you choose.

---

## Key Features

- **22 specialized agents** — each with a single responsibility, its own memory, and a defined model assignment (Haiku / Sonnet / Opus)
- **5 automated CI/CD quality gates** — secrets scanning, SAST, code review, coverage enforcement, smoke tests
- **Three operating modes** — Manual (full human control), Human-in-the-Loop (approve at checkpoints), Autopilot (fully autonomous)
- **Persistent organizational memory** — lessons from Sprint 1 protect Sprint 10
- **Standards-first** — coding, security, API, git, testing, and AI development standards enforced at every step
- **GDPR + OWASP compliance baked in** — not bolted on after the fact
- **Complete traceability** — every requirement traced from source document → code → test → deploy

---

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/payamoghtanem/Agile-AI-Product-Team.git
cd Agile-AI-Product-Team
```

### 2. Open in Claude Code

```bash
claude .
```

### 3. Place Your Business Documents

Add your requirements to `input_documents/`:

```
input_documents/
├── BRD.md          ← Business Requirements Document (required)
├── PRD.md          ← Product Requirements Document (required)
├── SDD.md          ← System Design Document (optional)
├── TDD.md          ← Technical Design Document (optional)
├── IDD.md          ← Integration Design Document (optional)
└── business-case.md ← Business Case (optional)
```

### 4. Start Sprint Planning

```
@ROUTER: Initiate Sprint 1 planning. Input documents are ready in input_documents/.
Sprint goal: [describe your sprint goal here].
```

That's it. The team takes it from there.

---

## The 22 Agents

| # | Agent | Role | Model |
|---|-------|------|-------|
| 00 | **Router** | Classifies every task, emits JSON dispatch packets. Entry point for all work. | Haiku |
| 01 | **Orchestrator** | Multi-sprint planning, agent coordination, escalation handling | Opus |
| 02 | **Product Owner** | Epics, user stories (Given/When/Then Gherkin ACs), INVEST validation | Opus |
| 03 | **Scrum Master** | Ceremonies, velocity tracking, blocker management, shared memory | Sonnet |
| 04 | **Product Analyst** | Business document analysis, KPI extraction, persona definition | Sonnet |
| 05 | **Product Specialist** | Domain expertise, feature specifications | Sonnet |
| 06 | **Solution Architect** | C4 diagrams, ADRs, API contracts, technology decisions | Opus |
| 07 | **UI/UX Designer** | Wireframes, user flows, WCAG 2.1 AA compliance | Sonnet |
| 08 | **Fullstack Developer** | Code implementation per ACs and architecture (32K context) | Opus |
| 09 | **Data Engineer** | Schemas, ETL pipelines, migrations, data contracts | Opus |
| 10 | **Data Scientist** | EDA, experiments, model evaluation | Sonnet |
| 11 | **AI Engineer** | Prompt engineering, RAG pipelines, LLM integrations | Opus |
| 12 | **Code Reviewer** | PR review against standards + OWASP. READ-ONLY — never writes code | Sonnet |
| 13 | **Tester** | Unit/integration/E2E tests, coverage ≥ 80% enforcement | Sonnet |
| 14 | **Validator** | Binary PASS/FAIL on every Gherkin acceptance criterion | Sonnet |
| 15 | **Traceability & Compliance** | Maps every requirement to code and test, GREEN/AMBER/RED status | Sonnet |
| 16 | **Security Agent** | SAST, secrets scan, OWASP threat modeling. P1 findings halt everything | Opus |
| 17 | **GDPR & Compliance** | 28-item GDPR checklist, data protection review for PII-touching code | Sonnet |
| 18 | **CI/CD & Infrastructure** | All 5 quality gates, staging deploys, smoke tests, rollback | Sonnet |
| 19 | **Git/GitHub Governance** | Conventional Commits enforcement, PR creation, branch strategy | Haiku (temp 0.0) |
| 20 | **Cloud Platform Engineer** | Terraform/Pulumi IaC, cloud resource provisioning | Sonnet |
| 21 | **Lesson Learner** | Extracts ≥3 lessons/sprint, evolves standards, compacts all memories | Haiku |

---

## The Five Workflows

| # | Workflow | Trigger | Agents |
|---|----------|---------|--------|
| 1 | **Backlog Grooming & Sprint Planning** | Sprint start | 04 → 02 → 03 → 00 → 02+03 |
| 2 | **Implementation → Review → Test → Validate → Merge** | Per story | 08 → 12 → 13 → 14 → 15 → 16+17 → 19 → 18 |
| 3 | **Requirements Traceability & Compliance Audit** | Pre-release / on-demand | 15 → all input docs |
| 4 | **Blocker & Incident Resolution** | Any BLOCKED status | Any → 03 → 00 → assigned → 21 |
| 5 | **Sprint Retrospective & Organizational Learning** | Sprint end | 03 → 21 → 01 → context reset |

---

## Quality Gates (CI/CD)

Five GitHub Actions workflows run automatically:

| Gate | File | Trigger | Checks |
|------|------|---------|--------|
| **Gate 1** | `gate1-pre-commit.yml` | Every push & PR | Gitleaks secrets scan · Semgrep SAST · Trivy CVE scan |
| **Gate 2** | `gate2-pr-open.yml` | PR opened/updated | Conventional Commits · Code review verdict · OWASP |
| **Gate 3** | `gate3-pr-merge.yml` | Push to main/develop | Coverage ≥ 80% · No RED traceability gaps |
| **Gate 4** | `gate4-post-deploy.yml` | After staging deploy | Smoke tests · GDPR clearance |
| **Gate 5** | `gate5-sprint-end.yml` | Manual dispatch | Memory compaction · Standards review · Sprint report |

Any P1 security finding, coverage below 80%, or smoke test failure **halts the pipeline immediately**.

---

## Three Operating Modes

### Manual
You approve every agent handoff. Full visibility and control at each step. Ideal for learning the system or high-stakes projects.

### Human-in-the-Loop
Agents run sequences automatically but pause at defined checkpoints (story approval, architecture review, security findings, pre-production deploy) and wait for your go/no-go.

### Autopilot
Issue a single sprint command. The entire pipeline — from backlog grooming through deployment — runs unattended. The system stops only on P1 security findings, coverage failures, or unresolvable BLOCKED states.

```
# Example autopilot command
@ORCHESTRATOR: Run Sprint 2 in autopilot mode.
Sprint goal: Complete the user authentication epic (STORY-001 through STORY-005).
Auto-approve gates unless: P1 security finding, GDPR block, or coverage < 80%.
Generate a sprint status report when complete.
```

---

## Memory Architecture

The team uses a three-tier memory system:

```
Tier 1 — Local (agents/[NAME]/memory/)
  Each agent's private working notes. ≤200 lines. Not visible to other agents.

Tier 2 — Shared (memories/shared-context/)
  Sprint goals, API contracts, active blockers. Readable by all agents.
  Written by Orchestrator (01) and Scrum Master (03) only.

Tier 3 — Organizational (memories/central-lessons-learned/)
  Accumulated lessons from all sprints. Readable by all agents.
  Written by Lesson Learner (21) ONLY. Injected into every Router dispatch packet.
```

Tier 3 is what makes the team compound in capability — a security lesson from Sprint 2 automatically constrains every developer dispatch in Sprint 10.

---

## Standards

All standards are at **v1.0**, enforced by every agent, and can only be updated through the Lesson Learner → Scrum Master approval cycle.

| Standard | Path |
|----------|------|
| Naming Conventions | `standards/coding-standard/naming-conventions.md` |
| Security Rules (SEC-001–010) | `standards/coding-standard/security-standards.md` |
| API Design (API-001–010) | `standards/coding-standard/api-design-standards.md` |
| Git & Commit Rules | `standards/git-standard/git-commit-standards.md` |
| Coverage Thresholds | `standards/testing-standard/coverage-thresholds.md` |
| AI/Prompt Versioning | `standards/ai-development-standard/prompt-versioning.md` |

---

## Repository Structure

```
.
├── CLAUDE.md                         Root system contract
├── AGENTS.md                         Universal rules for all agents
├── USER-MANUAL.md                    Complete operator manual (1,000+ lines)
│
├── agents/                           22 agent workspaces (00–21)
│   └── [AGENT]/
│       ├── CLAUDE.md                 Agent operating instructions
│       └── memory/                   Agent-local memory (private)
│
├── input_documents/                  YOUR DOCUMENTS GO HERE (read-only)
├── product-management/               Backlog, roadmap, sprint tasks
├── workflows/                        5 step-by-step orchestration playbooks
├── ceremonies/                       Scrum ceremony scripts
├── standards/                        All 6 standards
├── frameworks/                       Scrum DoD, GDPR checklist, OWASP
├── procedures/                       Code review, release, incident SOPs
├── architecture/                     C4 diagrams, ADRs
├── memories/                         Shared + organizational memory
├── artifacts/                        Kanban board, traceability matrix, audit trail
└── .github/workflows/                5 CI/CD quality gate definitions
```

---

## Non-Negotiable Rules

1. Every task passes through **Router (00)** before any agent executes
2. No agent reads another agent's `memory/` directory
3. **Code Reviewer (12)** is READ-ONLY — it never writes source code
4. **Lesson Learner (21)** is the sole writer to `memories/central-lessons-learned/`
5. No secrets, credentials, or PII committed anywhere in this repo
6. Standards are **immutable during sprint execution**
7. Coverage < 80% blocks all deploys
8. Any P1 security finding **halts the pipeline immediately**

---

## Full Documentation

For complete operational instructions, see **[USER-MANUAL.md](./USER-MANUAL.md)**, which covers:

- Step-by-step sprint lifecycle (Day 0 through sprint end)
- All 5 workflows with agent/input/output tables
- All 5 CI/CD gates explained in detail
- Exact prompts for steering, pausing, resuming, and overriding agents
- Blocker detection and escalation paths
- How standards evolve over sprints
- Quick-reference command cards
- FAQ

---

## License

This repository is the operating system for an AI product team. All agent configurations, standards, frameworks, and workflows are project-specific. See individual files for authorship and version history.

---

*Maintained by the Agile AI Product Team — Orchestrator (01) + Scrum Master (03)*
*Standards Version: v1.0 | Sprint: 0 (baseline)*
