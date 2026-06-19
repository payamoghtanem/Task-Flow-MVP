// Input validation — whitelist approach per security-standards.md SEC-003
// All validation at the API boundary; never trust client input

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateEmail(email) {
  if (!email || typeof email !== 'string') return 'Email is required';
  if (!EMAIL_REGEX.test(email.trim())) return 'Please enter a valid email address';
  if (email.length > 255) return 'Email must not exceed 255 characters';
  return null;
}

function validatePassword(password) {
  if (!password || typeof password !== 'string') return 'Password is required';
  if (password.length < 8) return 'Password must be at least 8 characters';
  return null;
}

module.exports = { validateEmail, validatePassword };
