const express = require('express');
const { register, login } = require('../services/auth-service');
const { validateEmail, validatePassword } = require('../utils/validate');

const router = express.Router();

// POST /api/auth/register — STORY-002
router.post('/register', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};

    const emailErr = validateEmail(email);
    if (emailErr) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: emailErr } });
    }

    const passwordErr = validatePassword(password);
    if (passwordErr) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: passwordErr } });
    }

    const { user, token } = await register(email.trim().toLowerCase(), password);

    return res.status(201).json({ success: true, data: { user, token }, error: null });
  } catch (err) {
    if (err.code === 'EMAIL_TAKEN') {
      return res.status(409).json({ success: false, error: { code: err.code, message: err.message } });
    }
    next(err);
  }
});

// POST /api/auth/login — STORY-003
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body ?? {};

    const emailErr = validateEmail(email);
    if (emailErr) {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: emailErr } });
    }

    if (!password || typeof password !== 'string') {
      return res.status(400).json({ success: false, error: { code: 'VALIDATION_ERROR', message: 'Password is required' } });
    }

    const { user, token } = await login(email.trim().toLowerCase(), password);

    return res.status(200).json({ success: true, data: { user, token }, error: null });
  } catch (err) {
    if (err.code === 'INVALID_CREDENTIALS') {
      return res.status(401).json({ success: false, error: { code: err.code, message: err.message } });
    }
    next(err);
  }
});

// POST /api/auth/logout — STORY-003
// JWT is stateless: logout is client-side token discard. Server-side blacklist is Sprint 2.
router.post('/logout', (_req, res) => {
  res.json({ success: true, data: { message: 'Logged out successfully' }, error: null });
});

module.exports = router;
