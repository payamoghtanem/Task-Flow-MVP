# Agile AI Product Team — Complete User Manual

**Version**: 1.0 | **Date**: 2026-06-18 | **Audience**: All operators, from first-time users to advanced teams

---

## Table of Contents

1. [What This System Is and What It Does](#1-what-this-system-is-and-what-it-does)
2. [System Architecture at a Glance](#2-system-architecture-at-a-glance)
3. [The 22 Agents — Who They Are and What They Do](#3-the-22-agents--who-they-are-and-what-they-do)
4. [Before You Start — Input Documents](#4-before-you-start--input-documents)
5. [Three Modes of Operation](#5-three-modes-of-operation)
6. [The Complete Sprint Lifecycle — Step by Step](#6-the-complete-sprint-lifecycle--step-by-step)
7. [The Five Workflows in Detail](#7-the-five-workflows-in-detail)
8. [Quality Gates — Automated Safeguards](#8-quality-gates--automated-safeguards)
9. [The Memory System — How the Team Remembers](#9-the-memory-system--how-the-team-remembers)
10. [Steering and Navigating the Team](#10-steering-and-navigating-the-team)
11. [Blockers — How to Detect and Resolve Them](#11-blockers--how-to-detect-and-resolve-them)
12. [Standards and Governance](#12-standards-and-governance)
13. [Quick Reference Cards](#13-quick-reference-cards)
14. [Frequently Asked Questions](#14-frequently-asked-questions)

---

## 1. What This System Is and What It Does

### The Big Picture

The **Agile AI Product Team** is a fully autonomous, multi-agent software development system that runs inside **Claude Code**. It simulates a complete, professional Agile software delivery team — analysts, architects, developers, testers, security reviewers, GDPR officers, DevOps engineers — all powered by AI agents that communicate, collaborate, and hand off work to each other using structured protocols.

Instead of one monolithic AI doing everything, **22 specialized agents** each own a single role. They receive structured work orders (dispatch packets), execute their specific responsibility, produce documented outputs, and hand off to the next agent — exactly as a real human Agile team would operate.

### What It Enables You to Do

| Starting Point | End Result |
|----------------|------------|
| A business idea written in plain English | A backlog of prioritized, Gherkin-tested user stories |
| A user story | Reviewed, tested, security-cleared, deployed code |
| A failed test or security alert | Root-cause analysis, fix, re-validation, re-deploy |
| A sprint ending | Compacted memories, lessons institutionalized, new sprint ready |
| Raw business requirements | Full traceability from requirement → code → test → deploy |

### Design Philosophy

- **Single responsibility**: Each agent does exactly one thing and refuses to scope-creep.
- **No agent starts without a dispatch packet** from the Router (Agent 00). This prevents chaos.
- **Every output cites the standard version** it was written against. Nothing drifts silently.
- **Human control is always available**. You can intercept, override, or inject feedback at any step.
- **Organizational memory is persistent**. Lessons learned in Sprint 1 protect Sprint 5.

---

## 2. System Architecture at a Glance

### Directory Structure

```
Agile-AI-Product-Team/
│
├── CLAUDE.md                    ← Root system contract (rules for everything)
├── AGENTS.md                    ← Universal rules all agents obey
│
├── input_documents/             ← YOUR business documents go HERE (READ-ONLY)
│   ├── business-case.md         ← Why this product exists
│   ├── BRD.md                   ← Business requirements
│   ├── PRD.md                   ← Product requirements (epic-level)
│   ├── SDD.md                   ← System design requirements
│   ├── TDD.md                   ← Technical design specs
│   └── IDD.md                   ← Integration design
│
├── agents/                      ← 22 agent workspaces
│   ├── 00_ROUTER/               ← EVERY task enters here first
│   ├── 01_ORCHESTRATOR/
│   ├── 02_PRODUCT_OWNER/
│   ├── ...
│   └── 21_LESSON_LEARNER/
│
├── product-management/          ← Backlog, roadmap, sprint tasks
│   ├── backlog/
│   ├── roadmap.yaml
│   └── sprints/current/
│
├── workflows/                   ← 5 step-by-step orchestration playbooks
├── ceremonies/                  ← Scrum ceremony scripts
├── standards/                   ← Coding, git, testing, security, API, AI standards
├── frameworks/                  ← Scrum DoD, GDPR checklist, OWASP constraints
├── procedures/                  ← Code review, release, incident SOPs
│
├── memories/
│   ├── shared-context/          ← Sprint goals, API contracts, blockers (shared)
│   └── central-lessons-learned/ ← Org-wide lessons (append-only)
│
├── architecture/                ← C4 diagrams, ADRs, API contracts
├── artifacts/                   ← Kanban board, traceability matrix, audit trail
│
└── .github/workflows/           ← 5 automated CI/CD quality gates
```

### Information Flow

```
YOU (Human/Operator)
        │
        ▼ (place documents)
input_documents/
        │
        ▼ (triggers)
00_ROUTER  ──── dispatch packet ────► 01_ORCHESTRATOR
        │                                    │
        │                                    ▼
        │                       04_PRODUCT_ANALYST
        │                                    │
        │                                    ▼
        │                         02_PRODUCT_OWNER  (epics, stories, ACs)
        │                                    │
        │                                    ▼
        │                         03_SCRUM_MASTER  (capacity, ceremonies)
        │                                    │
        │                         ◄──────────┘
        │
        ▼ (dispatch per task)
08_FULLSTACK_DEVELOPER
        │
        ▼
12_CODE_REVIEWER (read-only)
        │
        ▼
13_TESTER
        │
        ▼
14_VALIDATOR
        │
        ▼
15_REQUIREMENTS_TRACEABILITY
        │
        ▼
16_SECURITY + 17_GDPR (parallel)
        │
        ▼
19_GIT_GITHUB_GOVERNANCE (PR + merge)
        │
        ▼
18_CICD_INFRASTRUCTURE (deploy + smoke tests)
        │
        ▼
21_LESSON_LEARNER (sprint end: capture, compact, evolve)
```

---

## 3. The 22 Agents — Who They Are and What They Do

### Group 1: Control Plane (The Brain)

| # | Agent | Role | Model | When It Activates |
|---|-------|------|-------|-------------------|
| 00 | **ROUTER** | Classifies every incoming task, selects the right agent, emits a JSON dispatch packet. Never executes tasks itself. | Haiku (fast) | Every single task, always first |
| 01 | **ORCHESTRATOR** | Multi-sprint planning, coordinates between agents, owns sprint timelines and blockers | Opus (powerful) | Sprint planning, escalations, complex coordination |

**The Router is the single entry point for all work.** Think of it as the receptionist and dispatcher of the entire team. You never talk to developers directly — you talk to the Router, which figures out who should handle what.

### Group 2: Product & Requirements (Discovery)

| # | Agent | Role | When It Activates |
|---|-------|------|-------------------|
| 02 | **PRODUCT OWNER** | Writes epics, user stories (As a / I want / So that), Gherkin acceptance criteria (Given/When/Then), applies INVEST principles | Backlog grooming, story creation |
| 03 | **SCRUM MASTER** | Facilitates ceremonies, tracks velocity, manages blockers, writes to shared memory | Sprint planning, retrospectives, daily standups, blocker resolution |
| 04 | **PRODUCT ANALYST** | Analyzes business documents, extracts KPIs, identifies personas, provides prioritization signals | When new input documents land |
| 05 | **PRODUCT SPECIALIST** | Domain expertise, feature specifications, domain-specific validation | Complex domain features |

### Group 3: Engineering (Build)

| # | Agent | Role | When It Activates |
|---|-------|------|-------------------|
| 06 | **SOLUTION ARCHITECT** | C4 architecture diagrams, Architecture Decision Records (ADRs), API contracts, technology selection | Sprint start, new features, architecture changes |
| 07 | **UI/UX DESIGNER** | Wireframes, user flows, WCAG 2.1 AA accessibility specs | UI stories |
| 08 | **FULLSTACK DEVELOPER** | Implements code per Gherkin ACs, architecture specs, naming conventions. Largest context window (32K tokens) | Any implementation task |
| 09 | **DATA ENGINEER** | Database schemas, ETL pipelines, migrations, data contracts | Data-related stories |
| 10 | **DATA SCIENTIST** | EDA, statistical analysis, experiment design, model evaluation | Analytics and ML stories |
| 11 | **AI ENGINEER** | Prompt engineering, RAG pipelines, LLM integrations, model evaluation | AI/LLM feature stories |

### Group 4: Quality (Verify)

| # | Agent | Role | Special Constraint |
|---|-------|------|--------------------|
| 12 | **CODE REVIEWER** | Reviews PR diffs against standards, OWASP Top-10, naming conventions. Produces PASS/FAIL verdict | **READ-ONLY — never writes code** |
| 13 | **TESTER** | Generates unit/integration/E2E tests mapped 1:1 to Gherkin ACs. Enforces ≥80% coverage | Blocks deploy if coverage < 80% |
| 14 | **VALIDATOR** | Binary PASS/FAIL on all Gherkin acceptance criteria using test evidence | Blocks story closure if any AC fails |
| 15 | **REQUIREMENTS TRACEABILITY** | Maps every requirement to code and test. Produces GREEN/AMBER/RED status | RED gaps block merge |

### Group 5: Compliance (Protect)

| # | Agent | Role | Trigger |
|---|-------|------|---------|
| 16 | **SECURITY AGENT** | SAST, secrets scanning, OWASP threat modeling. P1 findings halt everything | Every PR with security-relevant changes |
| 17 | **GDPR & COMPLIANCE** | 28-item GDPR checklist, data protection impact assessment | Any code touching PII or user data |

### Group 6: DevOps (Ship)

| # | Agent | Role | Trigger |
|---|-------|------|---------|
| 18 | **CI/CD & INFRASTRUCTURE** | Manages all 5 quality gates, staging deploys, smoke tests, rollback | Post-merge, post-deploy |
| 19 | **GIT/GITHUB GOVERNANCE** | Validates Conventional Commits, creates PRs, enforces branch strategy, executes merges | Temperature 0.0 — fully deterministic |
| 20 | **CLOUD PLATFORM ENGINEER** | Terraform/Pulumi IaC, cloud resource provisioning, environment management | Infrastructure changes |

### Group 7: Learning (Evolve)

| # | Agent | Role | Special Authority |
|---|-------|------|-------------------|
| 21 | **LESSON LEARNER** | Extracts ≥3 lessons per sprint, proposes standard updates, compacts all agent memories | **SOLE writer to `memories/central-lessons-learned/`** |

---

## 4. Before You Start — Input Documents

### What Documents to Prepare

Before Sprint 1, place your business documents in `input_documents/`. These are the **only files the team can never modify** — they are your immutable source of truth.

| File | What to Write | Minimum Content |
|------|---------------|-----------------|
| `business-case.md` | Why this product? ROI, strategic fit, market opportunity | 1-2 pages: problem statement, target market, expected return |
| `BRD.md` | Business Requirements Document — what the business needs | Functional requirements numbered BR-001, BR-002, ... |
| `PRD.md` | Product Requirements — user-facing features at epic level | User personas + epic descriptions |
| `SDD.md` | System Design — technical architecture requirements | Tech stack preferences, scalability needs, integration points |
| `TDD.md` | Technical Design — implementation specifications | Key technical constraints, performance requirements |
| `IDD.md` | Integration Design — external systems and APIs | Third-party services, authentication mechanisms, data formats |

### Minimum Viable Input (To Get Started)

You don't need all 6 documents to begin. The **absolute minimum** is:

1. **`BRD.md`** — At least 5 numbered business requirements
2. **`PRD.md`** — At least 3 user personas and 5 epic descriptions

The Product Analyst (04) can work with just these two. Other agents will flag AMBER status on traceability if other documents are missing, but the team can still produce a working sprint.

### Document Format Guidelines

For each requirement in your `BRD.md`, use this format:

```markdown
## BR-001: User Authentication
**Priority**: HIGH
**Description**: Users must be able to register and log in securely.
**Acceptance**: System supports email/password and OAuth. Passwords hashed with bcrypt.
**Source**: Business Case §3.2
```

For epics in your `PRD.md`, use:

```markdown
## EPIC-001: User Onboarding
**User Persona**: New User (Sarah, 28, non-technical)
**Business Goal**: Reduce onboarding friction to <3 minutes
**Stories**: Registration, Profile Setup, Email Verification, Guided Tour
```

### What Happens After You Place Documents

1. Product Analyst (04) reads all documents → extracts KPIs, personas, priorities
2. Product Owner (02) transforms analysis → epics and user stories with Gherkin ACs
3. Scrum Master (03) checks capacity → sets sprint goal
4. Router (00) decomposes stories → dispatch packets for developers
5. Engineering pipeline begins automatically

---

## 5. Three Modes of Operation

This system supports three distinct operational modes. Choose based on your preference for control and automation.

---

### Mode A: Manual Mode (Full Human Control)

**When to use**: Learning the system, sensitive projects, high-stakes decisions, when you want to review and approve every step.

**How it works**: You activate each agent one at a time, review its output, and decide whether to proceed, send it back for revision, or override.

**Step-by-step**:

1. **Place your input documents** in `input_documents/`
2. **Open Claude Code** and navigate to this repository
3. **Prompt the Router directly**:
   ```
   @00_ROUTER: New task — analyze input_documents/ and initiate Sprint 1 planning.
   ```
4. **Review the dispatch packet** the Router outputs (JSON). Check the assigned agent is correct.
5. **Activate the next agent** by copy-pasting the dispatch packet:
   ```
   @04_PRODUCT_ANALYST: Execute dispatch packet: [paste packet here]
   ```
6. **Review the output** (`artifacts/sprint-reports/analysis-sprint-1.md`)
7. **Accept or reject**: If satisfied, activate the next agent. If not, say:
   ```
   @04_PRODUCT_ANALYST: The KPI analysis is missing performance metrics. 
   Re-analyze BRD §4 and add latency and throughput KPIs.
   ```
8. **Repeat** for each agent in the chain.

**Review checkpoints** (where to stop and check):
- After Product Analyst output (are KPIs correct?)
- After Product Owner stories (do the Gherkin ACs accurately reflect your intent?)
- After Architecture review (do the C4 diagrams match your system vision?)
- After Code Review report (do you agree with the severity ratings?)
- Before merge (final human approval)

---

### Mode B: Human-in-the-Loop (Supervised Automation)

**When to use**: Most real-world usage. Agents run sequences automatically, but you're asked to approve at critical decision gates.

**How it works**: You trigger a workflow, agents execute steps automatically and hand off to each other, but the system pauses and waits for your approval at defined checkpoints.

**Checkpoint locations** (system waits for human approval):
1. After backlog grooming — you approve the sprint backlog before work begins
2. After architecture decisions — you approve new ADRs
3. After Code Review FAIL — you decide whether to fix or override
4. After Security BLOCKED — you review the finding and authorize remediation
5. Before production deploy — you give final go/no-go

**How to trigger a supervised workflow**:
```
Start Workflow 1 (backlog grooming) for Sprint 1. 
Pause for my approval after story creation before proceeding to capacity planning.
Input documents are in input_documents/.
```

**How to approve and continue**:
```
The sprint backlog looks good. Approved. Proceed to Step 3 (capacity planning).
```

**How to send back**:
```
Story STORY-003 has weak acceptance criteria. The "When" clause is vague. 
Send back to Product Owner (02) with this note: 
"When the user submits the form" needs to specify which form fields are validated.
```

**How to override a BLOCKED status**:
```
I accept the risk on SEC-002 (medium severity). Override the security block on 
STORY-005 and proceed to merge. Log this override in the audit trail.
```

---

### Mode C: Autopilot (Fully Autonomous)

**When to use**: Routine sprints on well-defined backlogs, overnight runs, when you trust the system and want maximum throughput.

**How it works**: You issue a high-level command and the entire pipeline runs end-to-end — from backlog grooming through deployment — with agents handling all handoffs automatically. You review the final sprint report.

**How to initiate**:
```
Run Sprint 2 in autopilot mode. 
Sprint goal: Complete the user authentication epic (EPIC-001, stories STORY-001 through STORY-005).
Auto-approve gates unless: P1 security finding, GDPR block, or coverage drops below 80%.
Generate a sprint status report when complete.
```

**What happens automatically**:
1. Router classifies and decomposes all stories → dispatch packets
2. Product Analyst analyzes context → sprint analysis
3. Product Owner refines stories → Gherkin ACs locked
4. Scrum Master confirms capacity → sprint committed
5. Fullstack Developer implements story by story
6. Code Reviewer reviews each PR → PASS/FAIL
7. Tester runs test suite → coverage checked
8. Validator verifies all ACs → PASS/FAIL
9. Traceability Agent updates matrix → RED gaps checked
10. Security + GDPR clearance → parallel review
11. Git Governance merges → conventional commits enforced
12. CI/CD deploys to staging → smoke tests
13. Lesson Learner captures lessons → memory updated
14. Orchestrator generates sprint report

**Autopilot stops automatically when**:
- A P1 security finding is detected (Gate 1)
- Code Reviewer returns FAIL verdict (Gate 2)
- Coverage falls below 80% (Gate 3)
- Smoke tests fail (Gate 4)
- A BLOCKED status cannot be resolved without human input

In these cases, the system outputs a `BLOCKED` packet and waits for you.

---

## 6. The Complete Sprint Lifecycle — Step by Step

### Pre-Sprint: Setup (One Time)

```
Day 0:
1. Clone this repository
2. Place documents in input_documents/
3. Review and customize standards/ if needed
4. Set sprint goals in memories/shared-context/sprint-goals.md
5. Done. System is ready.
```

### Sprint 0: Initialization (Run Once to Bootstrap)

Sprint 0 is already complete in this repository. It established:
- All agent CLAUDE.md files (their operating instructions)
- All standards at v1.0
- All frameworks and procedures
- Empty kanban board and traceability matrix
- Seed lessons in central memory

You start from Sprint 1.

### Sprint N: Standard Sprint Execution

#### Phase 1: Planning (Days 1-2)

```
Human action: Trigger Workflow 1
├── Product Analyst reads input_documents/ → KPI and persona analysis
├── Product Owner writes stories with Gherkin ACs
├── Scrum Master calculates capacity → sets sprint commitment
├── Router decomposes stories → dispatch packets
└── Output: tasks.md locked, kanban board populated
```

Human checkpoints in Phase 1:
- Review sprint analysis: Are the KPIs right?
- Review story list: Do the Gherkin ACs capture your intent?
- Approve sprint commitment: Is the scope right for this sprint?

#### Phase 2: Implementation (Days 2-8)

Each story runs Workflow 2 in sequence:
```
For each story in sprint backlog:
├── Router dispatches to appropriate engineering agent (06, 07, 08, 09, 10, or 11)
├── Agent implements per Gherkin ACs + standards
├── Code Reviewer (12) reviews PR [READ-ONLY, PASS/FAIL]
├── Tester (13) generates and runs tests [≥80% coverage required]
├── Validator (14) verifies all ACs [binary PASS/FAIL]
├── Traceability Agent (15) updates matrix [no RED gaps allowed]
├── Security (16) + GDPR (17) run in parallel
├── Git Governance (19) creates PR and merges
└── CI/CD (18) deploys to staging + smoke tests
```

Human checkpoints in Phase 2:
- Code Review FAIL: Review findings, decide fix or override
- Security BLOCKED: Evaluate finding, authorize remediation
- AC validation FAIL: Clarify ambiguous requirements
- Smoke test failure: Investigate root cause

#### Phase 3: Sprint End (Day 9-10)

```
Human action: Trigger Workflow 5 (or trigger Gate 5 GitHub Action)
├── Scrum Master runs retrospective data collection
├── Scrum Master facilitates structured retro (Start/Stop/Continue)
├── Lesson Learner extracts ≥3 lessons → central-lessons-learned/
├── Lesson Learner proposes standard updates [SM approval required]
├── Lesson Learner compacts all agent memories to ≤200 lines
├── Orchestrator generates sprint status report
└── Scrum Master + Orchestrator reset context for next sprint
```

Human actions at sprint end:
- Attend (read) the retrospective report
- Approve or reject proposed standards updates
- Set goals for next sprint

---

## 7. The Five Workflows in Detail

### Workflow 1: Backlog Grooming & Sprint Planning

**File**: `workflows/01-backlog-grooming-sprint-planning.md`

**When to run**: Start of every sprint, or when backlog falls below 2-sprint runway.

**Input you provide**: Documents in `input_documents/` + sprint goals in `memories/shared-context/sprint-goals.md`

**Steps**:
1. Product Analyst (04) analyzes all input documents → extracts KPIs, personas, priorities
2. Product Owner (02) creates epics and stories with Gherkin ACs → INVEST check
3. Scrum Master (03) calculates capacity → sets sprint ceiling
4. Router (00) decomposes stories → technical dispatch packets per agent
5. PO (02) + SM (03) finalize sprint backlog → lock it

**Output**: `product-management/sprints/current/tasks.md` + populated kanban board

**Key rule**: Every story must have at least 1 Gherkin scenario (Given/When/Then) before it can enter a sprint.

---

### Workflow 2: Implementation → Review → Test → Validate → Merge

**File**: `workflows/02-implementation-review-test-validate-merge.md`

**When to run**: Once per story, triggered by Router dispatch packet.

**The 8 steps in order**:

| Step | Agent | Input | Output | Gate |
|------|-------|-------|--------|------|
| 1 | Fullstack Dev (08) | Story + ACs + architecture | Source code + summary | BLOCKED if AC ambiguous |
| 2 | Code Reviewer (12) | PR diff + standards | REVIEW-REPORT.md | FAIL → back to Step 1 |
| 3 | Tester (13) | Code + ACs | Tests + TEST-REPORT.md | <80% coverage → BLOCKED |
| 4 | Validator (14) | TEST-REPORT + ACs | VALIDATION-REPORT.md | FAIL → back to Step 1 |
| 5 | Traceability (15) | VALIDATION + input docs | Updated matrix | RED gaps → fix |
| 6 | Security (16) + GDPR (17) | Code diff | SECURITY/GDPR reports | P1 → HALT |
| 7 | Git Governance (19) | All reports | Merged SHA | Commits must be Conventional |
| 8 | CI/CD (18) | Merged SHA | Deploy + smoke tests | Fail → rollback |

---

### Workflow 3: Requirements Traceability & Compliance Audit

**File**: `workflows/03-requirements-traceability-compliance-audit.md`

**When to run**: After every story merge, or on-demand before a release.

**Purpose**: Prove that every business requirement is implemented, tested, and traceable.

**Output**: `artifacts/compliance-traceability-matrix.md` with GREEN/AMBER/RED status per requirement.

**Compliance threshold**: ≥90% GREEN = compliant release. Below this blocks production.

---

### Workflow 4: Blocker & Incident Resolution

**File**: `workflows/04-blocker-incident-resolution.md`

**When to run**: Any time an agent emits a BLOCKED status or production incident occurs.

**Steps**:
1. Any agent detects a blocker → emits structured BLOCKED JSON
2. Scrum Master (03) triages severity (P1/P2/P3/P4)
3. Router (00) dispatches to the right resolution agent
4. Resolution agent fixes and re-runs the blocked step
5. Lesson Learner (21) captures the incident pattern

**P1 incidents** (production down, data breach risk, security exploit): Immediate escalation, human notification required.

---

### Workflow 5: Sprint Retrospective & Organizational Learning

**File**: `workflows/05-sprint-retrospective-organizational-learning.md`

**When to run**: End of every sprint.

**Steps**:
1. Scrum Master aggregates sprint data (velocity, blockers, failures)
2. Scrum Master produces Start/Stop/Continue retro
3. Lesson Learner extracts ≥3 actionable lessons → appended to central memory
4. Lesson Learner proposes standard updates (SM approval required)
5. Lesson Learner compacts all agent memories to ≤200 lines each
6. Orchestrator generates sprint status report
7. Context reset: archive sprint, create new sprint folder

**Why this matters**: Lessons extracted here are injected into every future Router dispatch packet. The team genuinely gets smarter each sprint.

---

## 8. Quality Gates — Automated Safeguards

Five GitHub Actions workflows run automatically. They are your automated immune system.

### Gate 1: Pre-Commit Security (gate1-pre-commit.yml)

**Triggers on**: Every push to any branch, every PR

**What it checks**:
- **Gitleaks**: Scans for hardcoded secrets, API keys, tokens, passwords
- **Semgrep SAST**: Static analysis against OWASP Top-10, security audit rules, secret patterns
- **Trivy**: Dependency CVE scan for CRITICAL and HIGH vulnerabilities

**What blocks the pipeline**: Any secret detected, any P1 SAST finding, any CRITICAL CVE

**Why it matters**: Stops security problems before they enter the codebase. Non-negotiable.

---

### Gate 2: PR Code Review (gate2-pr-open.yml)

**Triggers on**: PR opened, updated, or reopened to main/develop

**What it checks**:
- Conventional Commits format validation (commitlint)
- Naming convention compliance (standards/coding-standard/)
- OWASP security review
- Existence and verdict of REVIEW-REPORT.md

**What blocks the pipeline**: FAIL verdict in REVIEW-REPORT.md, missing REVIEW-REPORT.md, non-conforming commits

---

### Gate 3: Post-Merge Quality (gate3-pr-merge.yml)

**Triggers on**: Push to main or develop

**What it checks**:
- Test coverage: Lines ≥80%, Branches ≥75%, Functions ≥85%, Statements ≥80%
- Traceability matrix: No RED gaps allowed

**What blocks the pipeline**: Coverage below any threshold, RED traceability gaps

**Why 80%**: Empirically validated threshold. Below this, bugs escape to production at significantly higher rates.

---

### Gate 4: Post-Deploy Verification (gate4-post-deploy.yml)

**Triggers on**: After staging deploy completes

**What it checks**:
- Smoke tests: health check, critical path, auth flow
- GDPR clearance: if PII-touching code was deployed
- Lesson capture: deploy notes recorded

**What triggers rollback**: Smoke test failure. Automatic. No human needed.

---

### Gate 5: Sprint End (gate5-sprint-end.yml)

**Triggers on**: Manual dispatch (`workflow_dispatch`)

**How to trigger**:
1. Go to GitHub Actions → Gate 5 — Sprint End
2. Click "Run workflow"
3. Enter the sprint number
4. Run

**What it does**:
1. Compacts all agent memories to ≤200 lines (Lesson Learner)
2. Reviews standards for update proposals
3. Generates sprint status report (Orchestrator)
4. Archives audit trail (immutable, signed)

---

## 9. The Memory System — How the Team Remembers

The team has three memory tiers, each with different access rules.

### Tier 1: Local Agent Memory

**Location**: `agents/[AGENT_NAME]/memory/`

**Who can read it**: The agent that owns it ONLY. Other agents are prohibited from reading it.

**Who can write it**: The owner agent only.

**Size limit**: ≤200 lines. Compacted at sprint end by Lesson Learner.

**What's stored**: Agent-specific working notes, task context, interim decisions.

**Example**: `agents/08_FULLSTACK_DEVELOPER/memory/` might contain notes about architecture patterns used in the current feature, or a reminder about a library constraint encountered.

---

### Tier 2: Shared Context Memory

**Location**: `memories/shared-context/`

**Who can read it**: All agents.

**Who can write it**: Orchestrator (01) and Scrum Master (03) only.

**Contents**:
- `sprint-goals.md` — Current sprint goal, velocity history, capacity
- `api-contracts.md` — Shared API specifications all agents must respect
- `active-blockers.md` — Current blockers with owner and resolution status

**Update frequency**: Updated at sprint start, when blockers emerge, when API contracts change.

---

### Tier 3: Central Organizational Memory

**Location**: `memories/central-lessons-learned/`

**Who can read it**: All agents (injected into every Router dispatch packet).

**Who can write it**: **Lesson Learner (21) ONLY**. This is a hard architectural constraint.

**Contents**: `lessons-learned.md` — Accumulated lessons from all sprints. Append-only. Never deleted.

**Format per lesson**:
```markdown
## LESSON-SPRINT-N-001
**Category**: Technical | Process | Team | Security | Compliance
**Root Cause**: What actually went wrong
**Action**: Specific, measurable change to apply
**Standard Update Required**: Yes/No
**Applied To Standards**: standards/[file].md
```

**Why this tier matters**: The Router injects these lessons into every dispatch packet. A lesson about a security vulnerability from Sprint 2 automatically protects Sprint 10. The team's institutional knowledge compounds over time.

---

## 10. Steering and Navigating the Team

### How to Direct Specific Agents

To activate a specific agent, reference it by number or name in your prompt. Always go through the Router first unless you're overriding.

**Correct way** (through Router):
```
@ROUTER: I need to create a new user story for the payment feature. 
Dispatch to the appropriate agent.
```

**Override way** (direct, use when you know exactly what you need):
```
@PRODUCT_OWNER: Create a user story for "Download invoice as PDF". 
Requirements: User can download any past invoice as PDF. 
PDF includes company logo and invoice line items.
```

**Inject context for any agent**:
```
@FULLSTACK_DEVELOPER: Implement STORY-012 (PDF invoice download).
Additional context: we're using the `pdfkit` library (already installed).
The invoice data is in the Invoice model, field `line_items` as JSON array.
```

### How to Change Sprint Priority Mid-Sprint

```
@SCRUM_MASTER: Escalate STORY-008 (customer data export) to top priority. 
Move it to the top of the in-progress queue. 
Reason: Client demo on Friday requires this feature.
Update the kanban board.
```

### How to Pause the Team

```
@ORCHESTRATOR: PAUSE all current work. 
We have a production incident. Initiate Workflow 4.
Active tasks should save their state to their local memory before pausing.
```

### How to Resume After Pause

```
@ORCHESTRATOR: RESUME sprint. 
Incident resolved (see incident report in artifacts/audit-trail.md, entry 2026-06-18).
Resume all paused tasks from their saved state.
```

### How to Change a Standard

Standards are immutable during sprint execution. To propose a change:

```
@LESSON_LEARNER: Propose an update to standards/coding-standard/security-standards.md.
Proposed change: Add rule SEC-011 — all database queries must use parameterized statements.
Rationale: We had a SQL injection finding in Sprint 2 (LESSON-SPRINT-2-003).
Submit to Scrum Master for approval.
```

The Scrum Master will approve or reject, and only then will Lesson Learner apply the update and increment the version number.

### How to Review What the Team Has Produced

Key artifacts to check regularly:

| What to Check | Where to Look |
|---------------|---------------|
| What's in progress | `artifacts/kanban-board.md` |
| Are all requirements covered? | `artifacts/compliance-traceability-matrix.md` |
| What happened and when? | `artifacts/audit-trail.md` |
| What did the team learn? | `memories/central-lessons-learned/lessons-learned.md` |
| What are the current blockers? | `memories/shared-context/active-blockers.md` |
| Sprint status summary | `artifacts/product-status-report.md` (after sprint end) |
| What code was reviewed? | `REVIEW-REPORT.md` in PR branches |
| Did all tests pass? | `TEST-REPORT.md` in PR branches |

---

## 11. Blockers — How to Detect and Resolve Them

### What a Blocker Looks Like

When an agent hits a problem it cannot resolve, it emits a structured JSON:

```json
{
  "status": "BLOCKED",
  "agent": "08_FULLSTACK_DEVELOPER",
  "task_id": "SPRINT-1-TASK-03",
  "reason": "Gherkin AC for STORY-005 Step 3 is ambiguous — 'invalid input' is not defined",
  "resolution_required_from": "02_PRODUCT_OWNER",
  "blocking_since": "2026-06-18T14:30:00Z"
}
```

### Common Blockers and How to Handle Them

| Blocker Type | Root Cause | Your Action |
|---|---|---|
| **AC Ambiguous** | Story acceptance criteria are vague | Clarify the AC with Product Owner |
| **Missing Input Document** | Agent needs a document not in `input_documents/` | Add the document, re-trigger the agent |
| **Coverage < 80%** | Not enough test coverage | Ask Tester (13) to cover the specific untested paths |
| **P1 Security Finding** | Serious security vulnerability in code | Ask Developer (08) to fix specifically: SEC-NNN finding |
| **RED Traceability Gap** | A business requirement has no code implementation | Check if the requirement is in scope for this sprint; if yes, create a story |
| **Smoke Test Failure** | Production deploy broke something | Ask CI/CD (18) for rollback, then investigate root cause |
| **GDPR Block** | PII-touching code without GDPR clearance | Route to GDPR Agent (17) with the data flow description |

### Escalation Path

```
Agent detects problem
        │
        ▼
Emit BLOCKED JSON (to artifacts/audit-trail.md + shared-context/active-blockers.md)
        │
        ▼
Scrum Master (03) triages severity
        │
        ├── P1 (Production/Security) ────► Immediate human notification
        │                                   Orchestrator (01) coordinates war room
        │
        ├── P2 (Sprint blocker) ──────────► Orchestrator dispatches fix agent
        │                                   Human approves fix approach
        │
        ├── P3 (Story blocker) ──────────► Route back to appropriate agent
        │                                   Human may clarify requirements
        │
        └── P4 (Informational) ──────────► Log and continue
                                            No human action required
```

---

## 12. Standards and Governance

### The Six Standards (All at v1.0)

| Standard | File | What It Governs |
|----------|------|-----------------|
| **Coding Standard** | `standards/coding-standard/naming-conventions.md` | File names, variables, functions, classes, DB columns, API routes, git branches |
| **Security Standards** | `standards/coding-standard/security-standards.md` | Rules SEC-001 to SEC-010, OWASP alignment |
| **API Design** | `standards/coding-standard/api-design-standards.md` | REST design rules API-001 to API-010, response envelopes, pagination |
| **Git Standard** | `standards/git-standard/git-commit-standards.md` | Conventional Commits, branch protection, merge strategies |
| **Testing Standard** | `standards/testing-standard/coverage-thresholds.md` | Line ≥80%, Branch ≥75%, Function ≥85%, Statement ≥80% |
| **AI Development** | `standards/ai-development-standard/prompt-versioning.md` | Prompt file format, semantic versioning, cost tracking |

### Commit Message Format (Required)

All commits must follow **Conventional Commits**:

```
<type>(<scope>): <description>

type: feat | fix | docs | style | refactor | test | chore | ci | perf | security
scope: component or module affected (optional)

Examples:
feat(auth): add email verification flow
fix(api): handle null userId in /users/:id endpoint
test(payment): add unit tests for stripe webhook handler
security(auth): rotate JWT signing key and add expiry validation
```

Non-conforming commits are rejected at Gate 2.

### How Standards Evolve

```
Sprint N encounter ──► Lesson Learner extracts lesson
        │
        ▼
"Standards Update Required: Yes" in lesson entry
        │
        ▼
Lesson Learner drafts specific change to standard file
        │
        ▼
Scrum Master (03) approves or rejects
        │
        ▼ (if approved)
Lesson Learner applies change + increments version number (e.g., v1.0 → v1.1)
        │
        ▼
New version cited in all subsequent agent outputs
```

---

## 13. Quick Reference Cards

### Card A: Starting a New Sprint

```bash
# 1. Place/update your input documents
cp your-brd.md input_documents/BRD.md
cp your-prd.md input_documents/PRD.md

# 2. Set sprint goals
# Edit: memories/shared-context/sprint-goals.md
# Add sprint number, goal statement, start/end dates

# 3. Trigger sprint planning
# In Claude Code, type:
"@ROUTER: Initiate Sprint [N] planning. 
 Run Workflow 1. Input documents are ready in input_documents/.
 Sprint goal: [your sprint goal here]."

# 4. Review and approve the sprint backlog
# Check: product-management/sprints/current/tasks.md
# Approve or send stories back for revision

# 5. Kick off implementation
"@ORCHESTRATOR: Sprint [N] backlog approved. Begin implementation. Run Workflow 2 for each story."
```

### Card B: Checking Sprint Status

```
To see sprint board:        → artifacts/kanban-board.md
To see what's blocked:      → memories/shared-context/active-blockers.md
To see quality metrics:     → artifacts/compliance-traceability-matrix.md
To see all audit history:   → artifacts/audit-trail.md
To see team lessons:        → memories/central-lessons-learned/lessons-learned.md
To see current sprint tasks: → product-management/sprints/current/tasks.md
```

### Card C: Closing a Sprint

```
1. Trigger Gate 5 in GitHub Actions:
   → Actions tab → "Gate 5 — Sprint End" → Run workflow → Enter sprint number

2. In Claude Code:
   "@ORCHESTRATOR: End Sprint [N]. Run Workflow 5 in full."

3. Review the sprint report:
   → artifacts/product-status-report.md

4. Approve/reject lesson-driven standard updates:
   "@SCRUM_MASTER: I approve the update to security-standards.md (add SEC-011). 
    Apply it. I reject the update to naming-conventions.md — reason: too prescriptive."

5. Set next sprint goals:
   → Edit memories/shared-context/sprint-goals.md
```

### Card D: Emergency Stop and Rollback

```
1. HALT everything:
   "@ORCHESTRATOR: HALT all agents immediately. Production incident declared."

2. Trigger rollback (if deploy-related):
   "@CICD_INFRASTRUCTURE: Execute rollback procedure per 
    procedures/release-process/CLAUDE.md §Rollback"

3. Open incident:
   "@SCRUM_MASTER: Open P1 incident. 
    Symptoms: [describe what's broken]
    Suspected cause: [your hypothesis]"

4. Investigate:
   "@SECURITY_AGENT: Review recent commits in staging for [specific concern]"

5. Close incident:
   "@LESSON_LEARNER: Incident resolved. 
    Capture as a lesson: [root cause, action taken, prevention measure]"
```

### Card E: Agent Model Reference

| Task Complexity | Model | Agents |
|-----------------|-------|--------|
| Fast, deterministic | Haiku | Router (00), Git Governance (19), Lesson Learner (21) |
| Balanced | Sonnet | Scrum Master (03), Analyst (04), Tester (13), Validator (14), Compliance (15,17), CI/CD (18,20) |
| Deep reasoning | Opus | Orchestrator (01), PO (02), Architect (06), Developer (08), Data Engineer (09), AI Engineer (11), Security (16) |

---

## 14. Frequently Asked Questions

**Q: What if I don't have all 6 input documents?**

A: Start with BRD.md and PRD.md as a minimum. The traceability matrix will show AMBER status for uncovered areas, but the team can still function. Add documents progressively as your project matures.

---

**Q: Can I skip the Router and talk directly to an agent?**

A: Yes, in Manual Mode. Direct invocation is allowed and useful for targeted tasks ("just review this specific file for security issues"). But for full sprint workflows, always route through the Router so dispatch packets are created and audit logs are maintained.

---

**Q: An agent gave a wrong answer. What do I do?**

A: Send it back with a correction. Example:
```
@PRODUCT_OWNER: Story STORY-003 is incorrect. The acceptance criteria says 
"user can delete account" but our BRD §5.3 specifies account deactivation only 
(soft delete, data retained 90 days). Please revise the Gherkin ACs accordingly.
```
The agent will revise and resubmit. The correction is logged in the audit trail.

---

**Q: How do I add a new agent or modify an existing one?**

A: Edit the agent's `CLAUDE.md` file in `agents/[AGENT_NAME]/CLAUDE.md`. The CLAUDE.md file is the agent's operating instructions. Changing it changes how the agent behaves from that point forward. Changes should be proposed through the standards update process for governance.

---

**Q: How do I add a completely new type of agent?**

A: Create a new directory under `agents/`, write its `CLAUDE.md`, add it to the Router's `model-mapping.yaml`, and update the root `CLAUDE.md` agent index. Document the new agent's trigger conditions, scope, and handoff format.

---

**Q: What if two agents conflict?**

A: The Orchestrator (01) is the arbiter. Example:
```
@ORCHESTRATOR: Conflict resolution needed. 
Security Agent (16) says we must use AES-256 encryption.
Fullstack Developer (08) says the library we're using only supports AES-128.
Please resolve and dispatch updated constraints.
```

---

**Q: How do I see what model each agent uses?**

A: Check `agents/00_ROUTER/model-mapping.yaml`. All model assignments, temperatures, and token limits are documented there.

---

**Q: Can I run this without GitHub Actions (CI/CD gates)?**

A: Yes. The quality gates are automated enforcement but the agents can execute their roles manually via Claude Code even without GitHub Actions. The gates add automation; the agents work regardless.

---

**Q: What should I do when a sprint is going too slow?**

A: Check `memories/shared-context/active-blockers.md` for what's blocked. Common causes:
1. Stories with ambiguous ACs (fix: clarify with Product Owner)
2. Too many stories in sprint (fix: reduce scope)
3. Recurring review failures (fix: ask Lesson Learner to extract patterns)
4. Security/GDPR blocks (fix: address compliance issues early next sprint)

---

**Q: How does the team get smarter over time?**

A: Through Tier 3 memory (`memories/central-lessons-learned/`). The Lesson Learner appends lessons each sprint. The Router injects these lessons into every new dispatch packet. So if Sprint 2 had a SQL injection issue, every developer dispatch packet from Sprint 3 onward will contain the constraint "avoid raw SQL queries — use parameterized statements (LESSON-SPRINT-2-003)".

---

*This manual covers the complete operation of the Agile AI Product Team repository. For architecture details, see `architecture/system-context.md`. For specific agent behavior, see the CLAUDE.md file in each agent's directory. For standards, see `standards/`. For frameworks, see `frameworks/`.*

*Manual maintained by: Orchestrator (01) + Scrum Master (03) | Updated: Sprint 0 baseline*
