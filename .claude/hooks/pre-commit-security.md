# Pre-Commit Security Gate — Hook Definition

## Hook ID
`pre-commit-security-v1.0`

## Trigger
Every `git commit` in this repository.

## Executing Agent
Security Agent (16) — `agents/16_SECURITY_AGENT/`

## Steps (Executed in Order)
1. **Secrets Scan**: Scan all staged files for patterns matching API keys, tokens, passwords, private keys, connection strings.
   - Pattern library: `standards/coding-standard/security-standards.md §SECRETS`
   - On match → PIPELINE BLOCKED + alert written to `artifacts/audit-trail.md`

2. **SAST Scan**: Static analysis of all staged `.py`, `.ts`, `.js`, `.go`, `.java`, `.sh` files.
   - Check against OWASP Top-10: `frameworks/owasp/CLAUDE.md`
   - P1 finding (Critical/High) → PIPELINE BLOCKED
   - P2/P3 findings → WARNING logged, commit proceeds

3. **Dependency Check**: Scan `requirements.txt`, `package.json`, `go.mod`, `pom.xml` for known CVEs.
   - Severity CRITICAL → PIPELINE BLOCKED
   - Severity HIGH → WARNING

4. **PII Detection**: Scan for email patterns, phone numbers, SSNs, credit card numbers in staged files.
   - Any match → PIPELINE BLOCKED

## Block Output Format
```json
{
  "gate": "pre-commit-security",
  "status": "BLOCKED",
  "findings": [
    {
      "severity": "P1",
      "type": "SECRET_DETECTED | SAST_CRITICAL | PII_FOUND | CVE_CRITICAL",
      "file": "relative/path/to/file.ext",
      "line": 42,
      "detail": "Human-readable description"
    }
  ],
  "timestamp": "ISO-8601",
  "resolution": "Remove finding and recommit"
}
```

## Pass Output Format
```json
{
  "gate": "pre-commit-security",
  "status": "PASS",
  "warnings": [],
  "timestamp": "ISO-8601"
}
```

## Escalation
All BLOCKED events are written to `artifacts/audit-trail.md` and flagged to Security Agent (16) for review within 1 business day.
