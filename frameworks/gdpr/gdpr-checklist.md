# GDPR Compliance Checklist — v1.0

## Purpose
Executed by GDPR & Compliance Agent (17) before any deploy touching PII data. Binary pass/fail per item. Non-compliance is a P1 blocker.

## Article Reference Index
| Checklist Section | GDPR Articles |
|-------------------|--------------|
| Lawful Basis | Art. 5, 6, 7, 9 |
| Data Subject Rights | Art. 15-22 |
| Data Minimization | Art. 5(1)(c) |
| Retention | Art. 5(1)(e) |
| Security | Art. 25, 32 |
| Breach Notification | Art. 33, 34 |
| Data Transfers | Art. 44-49 |
| DPO & Records | Art. 30, 37 |

---

## SECTION 1: Lawful Basis
- [ ] **ART6-01**: Every PII field has a documented lawful basis (consent / contract / legal obligation / vital interest / public task / legitimate interest)
- [ ] **ART7-01**: Where consent is the basis, consent is explicit, granular, revocable, and logged with timestamp
- [ ] **ART6-02**: Purpose of processing is documented and limited to stated purpose (purpose limitation)
- [ ] **ART9-01**: Special category data (health, biometric, racial, political) has explicit legal basis documented

## SECTION 2: Data Subject Rights
- [ ] **ART15-01**: Right of access implemented — users can export their data within 30 days
- [ ] **ART16-01**: Right to rectification implemented — users can correct inaccurate data
- [ ] **ART17-01**: Right to erasure (right to be forgotten) implemented and tested — full data deletion path verified
- [ ] **ART18-01**: Right to restriction implemented — ability to freeze processing without deletion
- [ ] **ART20-01**: Right to portability — structured machine-readable export (JSON/CSV) available
- [ ] **ART21-01**: Right to object — opt-out mechanism implemented for non-contractual processing
- [ ] **ART22-01**: Automated decision-making — if used, human review option available and documented

## SECTION 3: Data Minimization & Purpose Limitation
- [ ] **ART5C-01**: Only strictly necessary PII fields are collected — no speculative collection
- [ ] **ART5C-02**: Every PII field has documented: purpose, legal basis, retention period
- [ ] **ART5C-03**: Pseudonymization applied wherever direct identification is not required

## SECTION 4: Retention & Deletion
- [ ] **ART5E-01**: Retention policy documented per data category (e.g., transaction data: 7 years, session logs: 90 days)
- [ ] **ART5E-02**: Automated deletion job exists for expired data — documented and tested
- [ ] **ART5E-03**: Backup deletion policy aligned with main retention policy

## SECTION 5: Security Measures
- [ ] **ART32-01**: PII at rest encrypted (AES-256 or equivalent)
- [ ] **ART32-02**: PII in transit encrypted (TLS 1.2+ minimum)
- [ ] **ART32-03**: Access to PII systems requires authentication + authorization
- [ ] **ART32-04**: PII access logged with: who, when, what, why
- [ ] **ART25-01**: Privacy by design verified — PII not accessible to components that don't need it

## SECTION 6: Breach Notification Readiness
- [ ] **ART33-01**: Breach detection mechanism documented (monitoring, alerting)
- [ ] **ART33-02**: Breach response runbook exists at `procedures/incident-process/CLAUDE.md`
- [ ] **ART33-03**: 72-hour notification path to DPA documented
- [ ] **ART34-01**: High-risk breach communication plan to data subjects documented

## SECTION 7: Data Transfers
- [ ] **ART44-01**: If PII transferred outside EEA, transfer mechanism documented (Adequacy Decision / SCCs / BCRs)
- [ ] **ART44-02**: Third-party processors have signed DPA (Data Processing Agreement)
- [ ] **ART28-01**: All sub-processors listed and contractually bound

## SECTION 8: Records & DPO
- [ ] **ART30-01**: Record of Processing Activities (ROPA) entry created for this data flow
- [ ] **ART30-02**: ROPA includes: controller, processor, purpose, categories, recipients, transfers, retention
- [ ] **ART37-01**: DPO designated and contacted if processing is high-risk

## Verdict
**ALL items must be ✓ PASS for GDPR clearance.**
Any ✗ FAIL = P1 Blocker → Deploy halted until resolved.

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial GDPR checklist | GDPR Agent (17) |
