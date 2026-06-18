# Release Process — SOP v1.0

## Trigger
Initiated by Scrum Master (03) at end of sprint, or by Orchestrator (01) for hotfix.

## Agents
- **Orchestrator**: Scrum Master (03) initiates, Orchestrator (01) coordinates
- **Execution**: CI/CD Agent (18), Git Governance Agent (19), Cloud Platform (20)
- **Quality**: Tester (13), Validator (14), Security Agent (16), GDPR Agent (17)

## Pre-Release Checklist
- [ ] All sprint stories meet Definition of Done (`frameworks/scrum/definition-of-done.md`)
- [ ] Coverage ≥ 80% confirmed (Gate 3 PASS)
- [ ] Traceability matrix has zero RED gaps (Gate 3 PASS)
- [ ] Security scan PASS (Gate 1 + Gate 2)
- [ ] GDPR check completed if PII-touching code deployed (Gate 4)

## Process Steps

### Step 1: Release Branch Creation
```
Git Governance (19): git checkout -b release/vMAJOR.MINOR.PATCH
```
- Version determined by: feat → MINOR, fix → PATCH, BREAKING CHANGE → MAJOR

### Step 2: Release Candidate Testing
1. Tester (13): Full regression suite on release branch
2. If failures: STOP. Route to Fullstack Developer (08). No release until clean.
3. Coverage report attached to release notes.

### Step 3: Security Final Scan
Security Agent (16): Run full scan on release candidate.
- Any P1/P2 finding → STOP. Release blocked until patched.

### Step 4: GDPR Check (if applicable)
GDPR Agent (17): Run GDPR checklist if PII-touching code in release.
- Any FAIL → STOP. Legal clearance required.

### Step 5: Changelog Generation
Git Governance (19): Generate changelog from Conventional Commits since last release.
Format:
```
## v1.2.0 — YYYY-MM-DD
### Features
- feat(auth): add JWT refresh token rotation (STORY-42)
### Bug Fixes
- fix(api): correct 404 on deleted user (STORY-99)
### Security
- security: patch JWT algorithm confusion (CVE-2024-XXXXX)
```

### Step 6: PR and Merge
1. Git Governance (19): Create PR from `release/vX.Y.Z` → `main`
2. Require: Solution Architect (06) + Scrum Master (03) approval
3. Gate 1-3 must PASS on release PR
4. Merge strategy: Merge commit (preserve release boundary)
5. Back-merge: `main` → `develop` immediately after release merge

### Step 7: Tag and Publish
```
Git Governance (19):
git tag -a vMAJOR.MINOR.PATCH -m "Release vMAJOR.MINOR.PATCH"
git push origin vMAJOR.MINOR.PATCH
```

### Step 8: Production Deploy
CI/CD Agent (18):
1. Trigger production deploy pipeline
2. Monitor deployment progress
3. Run smoke tests (Gate 4)
4. If smoke tests fail → automatic rollback + alert

### Step 9: Post-Release
1. Lesson Learner (21): Capture release notes and observations
2. Scrum Master (03): Update velocity and close sprint
3. Orchestrator (01): Generate product status report

## Rollback Procedure
If Gate 4 fails after production deploy:
1. CI/CD Agent (18): Automatic rollback to previous tagged release
2. Alert Scrum Master (03) + Orchestrator (01)
3. Incident opened via `procedures/incident-process/CLAUDE.md`

## Changelog
| Version | Date | Change |
|---------|------|--------|
| v1.0 | Sprint 0 | Initial release SOP |
