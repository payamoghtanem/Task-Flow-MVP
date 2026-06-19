require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const healthRouter = require('./routes/health');

function createApp() {
  const app = express();

  app.use(helmet());

  app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    credentials: true,
  }));

  app.use(express.json({ limit: '10kb' }));

  app.use('/health', healthRouter);

  app.use((req, res) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_FOUND', message: 'Route not found' },
    });
  });

  app.use((err, req, res, _next) => {
    console.error(err.message);
    res.status(500).json({
      success: false,
      error: { code: 'INTERNAL_ERROR', message: 'Internal server error' },
    });
  });

  return app;
}

module.exports = createApp;
