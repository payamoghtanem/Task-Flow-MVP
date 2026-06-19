const express = require('express');
const requireAuth = require('../middleware/auth');
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('../services/task-service');

const router = express.Router();

router.use(requireAuth);

// POST /api/tasks — STORY-004
router.post('/', async (req, res, next) => {
  try {
    const { title, category, timeframe } = req.body ?? {};
    const task = await createTask(req.user.sub, { title, category, timeframe });
    return res.status(201).json({ success: true, data: task, error: null });
  } catch (err) {
    if (err.code === 'VALIDATION_ERROR') {
      return res.status(400).json({ success: false, error: { code: err.code, message: err.message } });
    }
    next(err);
  }
});

// GET /api/tasks — STORY-004
router.get('/', async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user.sub);
    return res.status(200).json({ success: true, data: tasks, error: null });
  } catch (err) {
    next(err);
  }
});

// PATCH /api/tasks/:id — STORY-005
router.patch('/:id', async (req, res, next) => {
  try {
    const { status } = req.body ?? {};
    const task = await updateTaskStatus(req.params.id, req.user.sub, status);
    return res.status(200).json({ success: true, data: task, error: null });
  } catch (err) {
    if (err.code === 'VALIDATION_ERROR') {
      return res.status(400).json({ success: false, error: { code: err.code, message: err.message } });
    }
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ success: false, error: { code: err.code, message: err.message } });
    }
    if (err.code === 'FORBIDDEN') {
      return res.status(403).json({ success: false, error: { code: err.code, message: err.message } });
    }
    next(err);
  }
});

// DELETE /api/tasks/:id — STORY-005
router.delete('/:id', async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user.sub);
    return res.status(200).json({ success: true, data: { message: 'Task deleted successfully' }, error: null });
  } catch (err) {
    if (err.code === 'NOT_FOUND') {
      return res.status(404).json({ success: false, error: { code: err.code, message: err.message } });
    }
    if (err.code === 'FORBIDDEN') {
      return res.status(403).json({ success: false, error: { code: err.code, message: err.message } });
    }
    next(err);
  }
});

module.exports = router;
