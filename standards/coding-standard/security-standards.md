# Security Standards — v1.0

## Scope
Applies to all code, configuration, and infrastructure managed by any agent. Enforced at Gate 1 (pre-commit) and Gate 2 (PR review) by Security Agent (16).

## 1. Secrets Management
### RULE SEC-001: Zero Secrets in Code
- NEVER hardcode: API keys, passwords, tokens, private keys, connection strings, certificates, or credentials in any file.
- ALL secrets must be loaded from: environment variables, secrets manager (AWS Secrets Manager / HashiCorp Vault / GCP Secret Manager), or CI/CD secret store.
- Violation severity: **P1 — PIPELINE BLOCKED**

### RULE SEC-002: Secret Scanning Patterns
The following patterns trigger immediate block:
- Regex: `[A-Za-z0-9+/]{40,}` in non-test files (potential base64 secret)
- Patterns: `password\s*=\s*['"][^'"]+['"]`, `api_key\s*=`, `secret\s*=`, `token\s*=`
- Private key headers: `-----BEGIN (RSA|EC|OPENSSH) PRIVATE KEY-----`
- AWS patterns: `AKIA[0-9A-Z]{16}`, `aws_secret_access_key`
- GitHub tokens: `ghp_[A-Za-z0-9]{36}`, `ghs_[A-Za-z0-9]{36}`

## 2. Input Validation
### RULE SEC-003: Validate All Input at System Boundaries
- All user input must be validated BEFORE processing (whitelist approach)
- Use schema validation libraries (Zod, Pydantic, Joi) — not manual string checks
- Reject and return structured error on invalid input — never silently sanitize

### RULE SEC-004: SQL Injection Prevention
- ALWAYS use parameterized queries or ORMs — NEVER string concatenation in SQL
- Example ❌: `"SELECT * FROM users WHERE id = " + userId`
- Example ✓: `db.query("SELECT * FROM users WHERE id = $1", [userId])`

### RULE SEC-005: XSS Prevention
- All user-generated content rendered in HTML must be escaped
- React: use JSX (auto-escapes) — never `dangerouslySetInnerHTML` with user content
- Server-rendered templates: use auto-escaping templating engines

## 3. Authentication & Authorization
### RULE SEC-006: JWT Standards
- Algorithm: RS256 minimum (never HS256 with shared secrets in distributed systems)
- Expiry: Access tokens ≤15 minutes, Refresh tokens ≤7 days
- Storage: HttpOnly cookies for web; secure storage for mobile
- Validation: Always verify signature, expiry, issuer, audience on EVERY request

### RULE SEC-007: Authorization Checks
- Check authorization at the handler level AND the service level (defense in depth)
- Never infer permissions from frontend state — always validate server-side
- Use RBAC or ABAC — never hardcode role checks as string comparisons

## 4. Cryptography
### RULE SEC-008: Approved Algorithms Only
- Hashing passwords: bcrypt (cost ≥12) or Argon2id — NEVER MD5/SHA1/SHA256 for passwords
- Data encryption: AES-256-GCM — NEVER DES, 3DES, or ECB mode
- TLS: 1.2 minimum, 1.3 preferred — no SSLv2/3/TLSv1.0/1.1
- Key length: RSA ≥2048, EC ≥256

## 5. Dependency Security
### RULE SEC-009: Dependency Management
- All dependencies must be pinned to exact versions in lockfiles
- CVE scan on every PR (automated via Gate 2)
- Critical CVE: PIPELINE BLOCKED until patched
- High CVE: Must be tracked as a security task in backlog within 48h
- Never use abandoned packages (last commit > 2 years, no maintainer response)

## 6. PII & Data Protection
### RULE SEC-010: PII Handling
- PII fields must be identified in data model documentation
- PII never in: logs, error messages, URLs, analytics events
- PII at rest: encrypted using approved algorithms
- PII in transit: TLS 1.2+ always

## 7. OWASP Top-10 Checklist (Quick Reference)
See `frameworks/owasp/CLAUDE.md` for full agent constraint block.

| # | Category | Minimum Control |
|---|---------|----------------|
| A01 | Broken Access Control | RBAC + server-side checks |
| A02 | Cryptographic Failures | AES-256-GCM, no MD5/SHA1 for passwords |
| A03 | Injection | Parameterized queries, schema validation |
| A04 | Insecure Design | Threat model per feature |
| A05 | Security Misconfiguration | No default creds, headers hardened |
| A06 | Vulnerable Components | Gate 2 CVE scan |
| A07 | Auth Failures | JWT RS256, short expiry, HttpOnly |
| A08 | Integrity Failures | Sign artifacts, verify checksums |
| A09 | Logging Failures | Structured logs, no PII in logs |
| A10 | SSRF | Whitelist outbound requests |

## Severity Definitions
| Level | Description | Action |
|-------|-------------|--------|
| P1 Critical | Exploitable, data breach risk | PIPELINE BLOCKED immediately |
| P2 High | Significant risk, requires remediation | BLOCKED within 24h |
| P3 Medium | Should fix in current sprint | Track in backlog |
| P4 Low | Best practice improvement | Next sprint if capacity |

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial security standards | Security Agent (16) |
