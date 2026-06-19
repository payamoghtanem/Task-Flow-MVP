const pool = require('../db');

const VALID_CATEGORIES = ['PERSONAL', 'PROFESSIONAL'];
const VALID_TIMEFRAMES = ['DAILY', 'WEEKLY', 'MONTHLY'];
const VALID_STATUSES = ['TODO', 'IN_PROGRESS', 'DONE'];

function validationError(message) {
  const err = new Error(message);
  err.code = 'VALIDATION_ERROR';
  err.status = 400;
  return err;
}

function validateTaskInput({ title, category, timeframe }) {
  if (!title || typeof title !== 'string' || !title.trim()) {
    throw validationError('Task title is required');
  }
  if (title.trim().length > 100) {
    throw validationError('Title must not exceed 100 characters');
  }
  if (!category || !VALID_CATEGORIES.includes(category)) {
    throw validationError('Category must be PERSONAL or PROFESSIONAL');
  }
  if (!timeframe || !VALID_TIMEFRAMES.includes(timeframe)) {
    throw validationError('Timeframe must be DAILY, WEEKLY, or MONTHLY');
  }
}

async function createTask(userId, { title, category, timeframe }) {
  validateTaskInput({ title, category, timeframe });

  const { rows } = await pool.query(
    `INSERT INTO tasks (user_id, title, category, timeframe)
     VALUES ($1, $2, $3, $4)
     RETURNING id, title, category, timeframe, status, created_at`,
    [userId, title.trim(), category, timeframe]
  );

  return rows[0];
}

async function getTasks(userId) {
  const { rows } = await pool.query(
    `SELECT id, title, category, timeframe, status, created_at, updated_at
     FROM tasks
     WHERE user_id = $1
     ORDER BY created_at DESC`,
    [userId]
  );

  return rows;
}

async function updateTaskStatus(taskId, userId, status) {
  if (!status || !VALID_STATUSES.includes(status)) {
    throw validationError('Status must be TODO, IN_PROGRESS, or DONE');
  }

  const existing = await pool.query('SELECT user_id FROM tasks WHERE id = $1', [taskId]);

  if (existing.rows.length === 0) {
    const err = new Error('Task not found');
    err.code = 'NOT_FOUND';
    err.status = 404;
    throw err;
  }

  if (existing.rows[0].user_id !== userId) {
    const err = new Error('You do not have permission to modify this task');
    err.code = 'FORBIDDEN';
    err.status = 403;
    throw err;
  }

  const { rows } = await pool.query(
    `UPDATE tasks SET status = $1, updated_at = NOW()
     WHERE id = $2
     RETURNING id, status, updated_at`,
    [status, taskId]
  );

  return rows[0];
}

async function deleteTask(taskId, userId) {
  const existing = await pool.query('SELECT user_id FROM tasks WHERE id = $1', [taskId]);

  if (existing.rows.length === 0) {
    const err = new Error('Task not found');
    err.code = 'NOT_FOUND';
    err.status = 404;
    throw err;
  }

  if (existing.rows[0].user_id !== userId) {
    const err = new Error('You do not have permission to delete this task');
    err.code = 'FORBIDDEN';
    err.status = 403;
    throw err;
  }

  await pool.query('DELETE FROM tasks WHERE id = $1', [taskId]);
}

module.exports = { createTask, getTasks, updateTaskStatus, deleteTask };
