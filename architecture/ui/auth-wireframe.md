# Auth Wireframes — Registration & Login
# Agent: 07 — UI/UX DESIGNER | Standards: coding-standard v1.0 | WCAG 2.1 AA
# Generated: 2026-06-19T13:00:00Z
# Design tokens reference: architecture/ui/design-tokens.yaml
# Stories covered: STORY-002 (Registration), STORY-003 (Login)

---

## Screen 1 — Registration (/register)

### Layout
Responsive centered card. Single-column. Max-width 420px centered on page.
Background: color.neutral.bg (#f9fafb)

```
┌─────────────────────────────────────────┐
│                                         │  ← viewport min 320px
│  ┌───────────────────────────────────┐  │
│  │           [TaskFlow Logo]         │  │  ← 32px text, color.primary
│  │       Create your account         │  │  ← typography.2xl, weight.bold
│  │                                   │  │
│  │  Email address                    │  │  ← label: typography.sm, weight.medium
│  │  ┌─────────────────────────────┐  │  │
│  │  │  email@example.com          │  │  ← input: type="email", autocomplete="email"
│  │  └─────────────────────────────┘  │  │  ← border: color.neutral.border, radius.base
│  │                                   │  │
│  │  Password                         │  │  ← label: typography.sm, weight.medium
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ••••••••            [👁]   │  │  ← input: type="password", toggle visibility
│  │  └─────────────────────────────┘  │  │  ← aria-label="Toggle password visibility"
│  │  Min. 8 characters                │  │  ← hint text: typography.xs, color.text_muted
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │      Create Account         │  │  ← button: bg color.primary, text white
│  │  └─────────────────────────────┘  │  │  ← full width, min-height 44px (WCAG 2.5.5)
│  │                                   │  │  ← aria-busy="true" while submitting
│  │  Already have an account?         │  │
│  │  [Log in]                         │  │  ← anchor → /login, color.primary
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Error States

**Inline validation (client-side, on blur + submit):**
```
│  Email address                            │
│  ┌─────────────────────────────────────┐  │
│  │  notanemail                         │  │  ← border: color.feedback.error_border
│  └─────────────────────────────────────┘  │  ← bg: color.feedback.error_bg
│  ⚠ Please enter a valid email address    │  ← color.feedback.error, typography.sm
│                                           │  ← role="alert" for screen readers
```

**API error (email taken — HTTP 409):**
```
│  ┌─────────────────────────────────────┐  │
│  │  ⚠ An account with this email      │  │  ← color.feedback.error_bg background
│  │     already exists. Log in instead. │  │  ← role="alert", links to /login
│  └─────────────────────────────────────┘  │
```

**Loading state:**
```
│  ┌─────────────────────────────────────┐  │
│  │  [spinner]  Creating account...     │  │  ← button disabled, aria-busy="true"
│  └─────────────────────────────────────┘  │
```

### Accessibility Checklist (WCAG 2.1 AA)
- [ ] All inputs have `<label>` with matching `for`/`id`
- [ ] Error messages use `role="alert"` for live announcement
- [ ] Focus moves to first error field on failed submit
- [ ] Password toggle button has `aria-label="Show/Hide password"`
- [ ] Submit button disabled state communicated via `aria-disabled`
- [ ] Tab order: email → password → toggle → submit → login link
- [ ] Color contrast: all text ≥4.5:1 against background
- [ ] Form validates on submit AND on field blur (not on keypress — disruptive)

### Component Spec
```
<AuthCard>
  <Logo />
  <h1>Create your account</h1>
  <form onSubmit={handleRegister}>
    <FormField label="Email address" error={errors.email}>
      <input type="email" autoComplete="email" required />
    </FormField>
    <FormField label="Password" hint="Min. 8 characters" error={errors.password}>
      <PasswordInput autoComplete="new-password" minLength={8} required />
    </FormField>
    <SubmitButton loading={isLoading}>Create Account</SubmitButton>
    <ApiError error={apiError} />
  </form>
  <p>Already have an account? <Link to="/login">Log in</Link></p>
</AuthCard>
```

---

## Screen 2 — Login (/login)

### Layout
Identical container/card layout to Registration. Max-width 420px centered.

```
┌─────────────────────────────────────────┐
│                                         │
│  ┌───────────────────────────────────┐  │
│  │           [TaskFlow Logo]         │  │
│  │       Welcome back                │  │  ← typography.2xl, weight.bold
│  │                                   │  │
│  │  Email address                    │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  email@example.com          │  │  ← type="email", autocomplete="email"
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Password                         │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │  ••••••••            [👁]   │  │  ← type="password", autocomplete="current-password"
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  ┌─────────────────────────────┐  │  │
│  │  │          Log In             │  │  ← bg color.primary, full width, 44px min-height
│  │  └─────────────────────────────┘  │  │
│  │                                   │  │
│  │  Don't have an account?           │  │
│  │  [Sign up for free]               │  │  ← anchor → /register, color.primary
│  └───────────────────────────────────┘  │
│                                         │
└─────────────────────────────────────────┘
```

### Error States

**Invalid credentials (HTTP 401):**
```
│  ┌─────────────────────────────────────┐  │
│  │  ⚠ Invalid email or password.      │  │  ← role="alert"
│  │     Please try again.              │  │  ← Intentionally vague — no user enumeration
│  └─────────────────────────────────────┘  │
```

**Session expired (redirect from protected route):**
```
│  ┌─────────────────────────────────────┐  │
│  │  ℹ Your session has expired.       │  │  ← info style (amber), role="status"
│  │     Please log in again.           │  │
│  └─────────────────────────────────────┘  │
```

### Accessibility Checklist (WCAG 2.1 AA)
- [ ] `autocomplete="current-password"` on password input (aids password managers)
- [ ] Error message does NOT say "wrong password" — prevents user enumeration
- [ ] Focus returns to email input after failed login (not top of page)
- [ ] Submit on Enter key in any field
- [ ] Redirect message shown when arriving from expired session (via location.state)

### Component Spec
```
<AuthCard>
  <Logo />
  <h1>Welcome back</h1>
  {location.state?.expired && <SessionExpiredBanner />}
  <form onSubmit={handleLogin}>
    <FormField label="Email address" error={errors.email}>
      <input type="email" autoComplete="email" required />
    </FormField>
    <FormField label="Password" error={errors.password}>
      <PasswordInput autoComplete="current-password" required />
    </FormField>
    <SubmitButton loading={isLoading}>Log In</SubmitButton>
    <ApiError error={apiError} />
  </form>
  <p>Don't have an account? <Link to="/register">Sign up for free</Link></p>
</AuthCard>
```

---

## Shared Component: AuthCard

```css
.auth-card {
  background: var(--color-surface);       /* white */
  border-radius: var(--radius-lg);        /* 12px */
  box-shadow: var(--shadow-md);
  padding: var(--spacing-8);              /* 32px */
  width: 100%;
  max-width: 420px;
  margin: var(--spacing-16) auto;        /* 64px top/bottom auto left/right */
}

@media (max-width: 480px) {
  .auth-card {
    border-radius: 0;
    box-shadow: none;
    margin: 0;
    min-height: 100vh;
    padding: var(--spacing-6);
  }
}
```

## Shared Component: FormField

Props: `label`, `hint`, `error`, `children`

```
┌──────────────────────────────────────┐
│  {label}                  [required] │  ← label element, typography.sm, weight.medium
│  {hint text if provided}             │  ← typography.xs, color.text_muted
│  ┌────────────────────────────────┐  │
│  │  {input}                       │  │  ← border: 1px solid color.neutral.border
│  └────────────────────────────────┘  │  ← on error: color.feedback.error_border
│  ⚠ {error message}                  │  ← role="alert", typography.sm, color.error
└──────────────────────────────────────┘
```

## Shared Component: PasswordInput

Toggle between `type="password"` and `type="text"`.
Button: icon-only (eye/eye-slash SVG), `aria-label="Show password"` / `"Hide password"`.
Min tap target 44×44px.

---

*Auth Wireframes produced by Agent 07 (UI/UX DESIGNER) | WCAG 2.1 AA | design-tokens.yaml v1.0 | 2026-06-19T13:00:00Z*
