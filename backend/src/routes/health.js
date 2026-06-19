const express = require('express');
const pool = require('../db');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      success: true,
      data: {
        status: 'ok',
        timestamp: new Date().toISOString(),
      },
    });
  } catch {
    res.status(503).json({
      success: false,
      error: { code: 'DB_UNAVAILABLE', message: 'Database connection failed' },
    });
  }
});

module.exports = router;
