# API Design Standards — v1.0

## Scope
All REST and GraphQL APIs produced by Fullstack Developer (08), Data Engineer (09), and AI Engineer (11). Reviewed by Code Reviewer (12) and Solution Architect (06).

## 1. REST API Design
### RULE API-001: Resource Naming
- Resources are nouns, plural, lowercase, kebab-case: `/api/v1/user-accounts`
- Never use verbs in paths: ❌ `/api/getUser` ✓ `GET /api/v1/users/{userId}`
- Nested resources show ownership: `/api/v1/users/{userId}/orders`
- Maximum nesting depth: 2 levels

### RULE API-002: HTTP Methods
| Method | Use | Idempotent | Body |
|--------|-----|-----------|------|
| GET | Retrieve resource(s) | Yes | No |
| POST | Create resource | No | Yes |
| PUT | Replace full resource | Yes | Yes |
| PATCH | Partial update | No | Yes |
| DELETE | Remove resource | Yes | No |

### RULE API-003: HTTP Status Codes
| Code | Meaning | When to Use |
|------|---------|------------|
| 200 | OK | Successful GET, PUT, PATCH |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Validation failure — include error detail |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but no permission |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Duplicate resource, version conflict |
| 422 | Unprocessable Entity | Semantic validation failure |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |
| 503 | Service Unavailable | Dependency down, circuit open |

### RULE API-004: Response Format
All API responses use this envelope:
```json
{
  "data": { /* resource or array */ },
  "meta": {
    "request_id": "uuid-v4",
    "timestamp": "ISO-8601",
    "version": "v1"
  },
  "errors": null
}
```
Error response:
```json
{
  "data": null,
  "meta": { "request_id": "uuid-v4", "timestamp": "ISO-8601" },
  "errors": [
    { "code": "VALIDATION_ERROR", "field": "email", "message": "Must be a valid email address" }
  ]
}
```

### RULE API-005: Pagination
All list endpoints support cursor-based pagination:
```json
{
  "data": [...],
  "meta": {
    "next_cursor": "base64-encoded-cursor",
    "has_more": true,
    "total": 142,
    "page_size": 20
  }
}
```
Query params: `?cursor=<value>&page_size=<1-100>&sort_by=<field>&sort_dir=asc|desc`

### RULE API-006: Versioning
- Version in URL path: `/api/v1/`, `/api/v2/`
- Breaking changes require new version
- Old versions supported for minimum 6 months after new version
- Deprecation header: `Deprecation: true`, `Sunset: <RFC-7231 date>`

### RULE API-007: Rate Limiting
All public endpoints must implement rate limiting:
- Headers returned: `X-RateLimit-Limit`, `X-RateLimit-Remaining`, `X-RateLimit-Reset`
- Exceeded: `429 Too Many Requests` with `Retry-After` header

## 2. Request Validation
### RULE API-008: Input Schema
- All request bodies validated via OpenAPI 3.x schema (or equivalent)
- Schema defines: required fields, types, formats, min/max lengths, patterns
- Additional properties: `false` by default
- Validation errors return 400 with field-level error detail (Rule API-004)

## 3. API Documentation
### RULE API-009: OpenAPI Specification
- Every API must have an OpenAPI 3.x spec in `architecture/api-contract-vN.yaml`
- Spec includes: description, all parameters, all responses, authentication scheme, examples
- Spec is source of truth — generated code must match spec

## 4. Security Headers
### RULE API-010: Required Headers
All responses must include:
```
Content-Type: application/json; charset=utf-8
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

## Changelog
| Version | Date | Change | Author |
|---------|------|--------|--------|
| v1.0 | Sprint 0 | Initial API standards | Solution Architect (06) |
