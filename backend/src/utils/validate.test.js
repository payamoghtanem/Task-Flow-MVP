const { validateEmail, validatePassword } = require('./validate');

describe('validateEmail', () => {
  test('returns null for valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull();
  });

  test('returns null for email with subdomains', () => {
    expect(validateEmail('user@mail.example.com')).toBeNull();
  });

  test('returns error for null', () => {
    expect(validateEmail(null)).toBe('Email is required');
  });

  test('returns error for undefined', () => {
    expect(validateEmail(undefined)).toBe('Email is required');
  });

  test('returns error for non-string', () => {
    expect(validateEmail(123)).toBe('Email is required');
  });

  test('returns error for empty string', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  test('returns error for missing @', () => {
    expect(validateEmail('userexample.com')).toBe('Please enter a valid email address');
  });

  test('returns error for missing domain', () => {
    expect(validateEmail('user@')).toBe('Please enter a valid email address');
  });

  test('returns error for missing local part', () => {
    expect(validateEmail('@example.com')).toBe('Please enter a valid email address');
  });

  test('returns error when email exceeds 255 chars', () => {
    const long = 'a'.repeat(250) + '@b.com';
    expect(long.length).toBeGreaterThan(255);
    expect(validateEmail(long)).toBe('Email must not exceed 255 characters');
  });

  test('accepts email with leading/trailing whitespace (trims before check)', () => {
    expect(validateEmail('  user@example.com  ')).toBeNull();
  });
});

describe('validatePassword', () => {
  test('returns null for valid password', () => {
    expect(validatePassword('password1')).toBeNull();
  });

  test('returns null for exactly 8 characters', () => {
    expect(validatePassword('exactly8')).toBeNull();
  });

  test('returns error for null', () => {
    expect(validatePassword(null)).toBe('Password is required');
  });

  test('returns error for undefined', () => {
    expect(validatePassword(undefined)).toBe('Password is required');
  });

  test('returns error for non-string', () => {
    expect(validatePassword(12345678)).toBe('Password is required');
  });

  test('returns error for empty string', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  test('returns error for password shorter than 8 chars', () => {
    expect(validatePassword('short')).toBe('Password must be at least 8 characters');
  });

  test('returns error for 7-char password', () => {
    expect(validatePassword('1234567')).toBe('Password must be at least 8 characters');
  });
});
