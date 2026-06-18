# Input Documents Directory

## Role
Primary source of truth for all business requirements. These documents are the authoritative, unalterable record of what the product must do.

## CRITICAL CONSTRAINT
**READ-ONLY for ALL agents without exception.**
No agent may create, modify, delete, or overwrite any file in `input_documents/`.
Violations are a critical governance failure.

## Expected Documents
| Document | Purpose | Owner (Human) |
|----------|---------|--------------|
| `business-case.md` | Business justification, ROI, strategic fit | Stakeholder |
| `BRD.md` | Business Requirements Document — functional requirements | Business Analyst |
| `PRD.md` | Product Requirements Document — user stories at epic level | Product Manager |
| `SDD.md` | System Design Document — technical architecture requirements | Solution Architect |
| `TDD.md` | Technical Design Document — implementation specifications | Tech Lead |
| `IDD.md` | Integration Design Document — external integrations | Integration Architect |

## Placement
Place all source documents here before Sprint 1. Product Analyst (04) and Traceability Agent (15) will read them.

## Agents That Read These Documents
- Product Analyst (04): Analysis and KPI extraction
- Product Owner (02): Story creation
- Traceability Agent (15): Requirements traceability
- All others: Reference only

## Access Log
All reads logged to `artifacts/audit-trail.md` by the reading agent.
