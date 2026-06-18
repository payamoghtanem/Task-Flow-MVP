# OWASP Top-10 Agent Constraint Block — v1.0

## Purpose
This CLAUDE.md is loaded by Security Agent (16) and Code Reviewer (12) when performing security analysis. It defines binding constraints for all OWASP Top-10 categories.

## TRIGGER
Load this file whenever: reviewing code for security, performing threat model, auditing PRs, running pre-commit gate.

## OWASP A01: Broken Access Control
**Constraint**: Every API endpoint must verify authorization server-side. Frontend-only checks are INSUFFICIENT and constitute a P1 finding.
- ENFORCE: Middleware-level auth check on all authenticated routes
- BLOCK ON: Endpoint without authorization check, IDOR vulnerabilities, privilege escalation paths
- CHECK: Direct object references validated against authenticated user's permissions

## OWASP A02: Cryptographic Failures
**Constraint**: No deprecated cryptographic algorithms in any code path.
- BLOCK ON: MD5/SHA1 for passwords, DES/3DES, ECB mode, HS256 JWT in distributed systems
- ENFORCE: bcrypt/Argon2 for passwords, AES-256-GCM for encryption, TLS 1.2+ for transport
- CHECK: All cryptographic operations use approved library functions (not manual implementations)

## OWASP A03: Injection
**Constraint**: All external input must be parameterized or schema-validated before use in queries or commands.
- BLOCK ON: String concatenation in SQL, unsanitized user input in shell commands, template injection
- ENFORCE: ORM or parameterized queries for all DB access, schema validation at API boundary
- CHECK: No `eval()`, no `exec()`, no dynamic SQL string building

## OWASP A04: Insecure Design
**Constraint**: Every feature handling sensitive data or authentication must have a threat model.
- ENFORCE: Threat model in ADR for: auth flows, payment processing, PII storage, admin functions
- BLOCK ON: Authentication bypass paths, missing rate limiting on auth endpoints, no account lockout
- CHECK: Security requirements defined in Gherkin ACs (not afterthoughts)

## OWASP A05: Security Misconfiguration
**Constraint**: No default credentials, no unnecessary exposed services, security headers mandatory.
- BLOCK ON: Default credentials, debug mode in production, unnecessary HTTP methods enabled
- ENFORCE: Security headers on all responses (see `standards/coding-standard/api-design-standards.md` Rule API-010)
- CHECK: Error responses reveal no stack traces, file paths, or internal details

## OWASP A06: Vulnerable and Outdated Components
**Constraint**: No components with known Critical CVEs in production.
- BLOCK ON: Critical CVE unpatched, no lockfile (unpinned dependencies)
- ENFORCE: CVE scan on every PR (Gate 2)
- CHECK: All dependencies pinned in lockfile, no abandoned packages (>2 years inactive)

## OWASP A07: Identification and Authentication Failures
**Constraint**: All authentication must use industry-standard mechanisms with appropriate controls.
- BLOCK ON: Weak password policy (<12 chars, no complexity), no brute-force protection, session fixation
- ENFORCE: JWT RS256, HttpOnly cookies, PKCE for OAuth flows, MFA for admin accounts
- CHECK: Session invalidation on logout, password reset tokens single-use and time-limited

## OWASP A08: Software and Data Integrity Failures
**Constraint**: All external inputs (webhooks, plugins, CI artifacts) must be verified.
- BLOCK ON: Unsigned CI artifacts, unverified deserialization, auto-update without checksum verification
- ENFORCE: Sign all release artifacts, verify webhook signatures (HMAC), use lockfiles
- CHECK: Deserialization of untrusted data includes type validation

## OWASP A09: Security Logging and Monitoring Failures
**Constraint**: All security events must be logged with sufficient detail for incident investigation.
- BLOCK ON: Auth failures not logged, PII in logs, log injection via user input
- ENFORCE: Structured logging for: auth events, access denied, input validation failures, rate limit triggers
- CHECK: Log rotation and retention policy documented (GDPR-compliant)

## OWASP A10: Server-Side Request Forgery (SSRF)
**Constraint**: All outbound HTTP requests must use an allowlist of permitted destinations.
- BLOCK ON: User-controlled URLs used in server-side HTTP requests without validation
- ENFORCE: Outbound request allowlist, block private IP ranges (10.0.0.0/8, 172.16.0.0/12, 192.168.0.0/16)
- CHECK: Cloud metadata endpoints blocked (169.254.169.254)

## Severity Escalation
Any OWASP finding automatically classified as:
- Proven exploitability → P1 (PIPELINE BLOCKED)
- High likelihood → P2 (BLOCKED within 24h)
- Theoretical → P3 (Sprint backlog)
