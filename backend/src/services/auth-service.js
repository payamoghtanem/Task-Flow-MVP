const bcrypt = require('bcryptjs');
const pool = require('../db');
const { signAccessToken } = require('../utils/jwt');

const BCRYPT_ROUNDS = 12; // security-standards.md SEC-008: ≥12 rounds

// Dummy hash for constant-time compare when email not found (prevents timing-based user enumeration)
const DUMMY_HASH = '$2b$12$abcdefghijklmnopqrstuuVGOtbVH.pB5XAT.Rb0OAB/iQ9nYf1Da'; // nosemgrep: generic.secrets.security.detected-bcrypt-hash.detected-bcrypt-hash

async function register(email, password) {
  const existing = await pool.query('SELECT id FROM users WHERE email = $1', [email]);
  if (existing.rows.length > 0) {
    const err = new Error('An account with this email already exists');
    err.code = 'EMAIL_TAKEN';
    err.status = 409;
    throw err;
  }

  const passwordHash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const { rows } = await pool.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2) RETURNING id, email',
    [email, passwordHash]
  );

  const user = rows[0];
  const token = signAccessToken({ sub: user.id, email: user.email });

  return { user: { id: user.id, email: user.email }, token };
}

async function login(email, password) {
  const { rows } = await pool.query(
    'SELECT id, email, password_hash FROM users WHERE email = $1',
    [email]
  );

  const user = rows[0];

  // Always run bcrypt.compare to prevent timing oracle — STORY-003 AC Scenario 3
  const match = await bcrypt.compare(password, user ? user.password_hash : DUMMY_HASH);

  if (!user || !match) {
    const err = new Error('Invalid email or password');
    err.code = 'INVALID_CREDENTIALS';
    err.status = 401;
    throw err;
  }

  const token = signAccessToken({ sub: user.id, email: user.email });

  return { user: { id: user.id, email: user.email }, token };
}

module.exports = { register, login };
