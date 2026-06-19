jest.mock('../middleware/auth', () => (req, _res, next) => {
  req.user = { sub: 'user-1', email: 'test@example.com' };
  next();
});

jest.mock('../services/task-service', () => ({
  createTask: jest.fn(),
  getTasks: jest.fn(),
  updateTaskStatus: jest.fn(),
  deleteTask: jest.fn(),
}));

const request = require('supertest');
const createApp = require('../app');
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('../services/task-service');

const app = createApp();

const SAMPLE_TASK = {
  id: 'task-1',
  title: 'Test Task',
  category: 'PERSONAL',
  timeframe: 'DAILY',
  status: 'TODO',
  created_at: '2026-06-19T00:00:00.000Z',
};

beforeEach(() => jest.clearAllMocks());

describe('POST /api/tasks', () => {
  test('201 with created task on valid input', async () => {
    createTask.mockResolvedValueOnce(SAMPLE_TASK);

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Test Task', category: 'PERSONAL', timeframe: 'DAILY' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual(SAMPLE_TASK);
    expect(createTask).toHaveBeenCalledWith('user-1', { title: 'Test Task', category: 'PERSONAL', timeframe: 'DAILY' });
  });

  test('400 on VALIDATION_ERROR from service', async () => {
    const err = Object.assign(new Error('Task title is required'), { code: 'VALIDATION_ERROR' });
    createTask.mockRejectedValueOnce(err);

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: '', category: 'PERSONAL', timeframe: 'DAILY' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('500 for unexpected service error', async () => {
    createTask.mockRejectedValueOnce(new Error('DB error'));

    const res = await request(app)
      .post('/api/tasks')
      .send({ title: 'Task', category: 'PERSONAL', timeframe: 'DAILY' });
    expect(res.status).toBe(500);
  });
});

describe('GET /api/tasks', () => {
  test('200 with tasks array', async () => {
    getTasks.mockResolvedValueOnce([SAMPLE_TASK]);

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data).toEqual([SAMPLE_TASK]);
    expect(getTasks).toHaveBeenCalledWith('user-1');
  });

  test('200 with empty array for new user', async () => {
    getTasks.mockResolvedValueOnce([]);

    const res = await request(app).get('/api/tasks');
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual([]);
  });
});

describe('PATCH /api/tasks/:id', () => {
  test('200 with updated task on valid status change', async () => {
    const updated = { id: 'task-1', status: 'IN_PROGRESS', updated_at: '2026-06-19T01:00:00.000Z' };
    updateTaskStatus.mockResolvedValueOnce(updated);

    const res = await request(app)
      .patch('/api/tasks/task-1')
      .send({ status: 'IN_PROGRESS' });
    expect(res.status).toBe(200);
    expect(res.body.data).toEqual(updated);
    expect(updateTaskStatus).toHaveBeenCalledWith('task-1', 'user-1', 'IN_PROGRESS');
  });

  test('400 on VALIDATION_ERROR', async () => {
    const err = Object.assign(new Error('Status must be TODO, IN_PROGRESS, or DONE'), { code: 'VALIDATION_ERROR' });
    updateTaskStatus.mockRejectedValueOnce(err);

    const res = await request(app)
      .patch('/api/tasks/task-1')
      .send({ status: 'INVALID' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('404 when task not found', async () => {
    const err = Object.assign(new Error('Task not found'), { code: 'NOT_FOUND' });
    updateTaskStatus.mockRejectedValueOnce(err);

    const res = await request(app)
      .patch('/api/tasks/missing-id')
      .send({ status: 'DONE' });
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  test('403 when user does not own the task', async () => {
    const err = Object.assign(new Error('Forbidden'), { code: 'FORBIDDEN' });
    updateTaskStatus.mockRejectedValueOnce(err);

    const res = await request(app)
      .patch('/api/tasks/task-1')
      .send({ status: 'DONE' });
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });
});

describe('DELETE /api/tasks/:id', () => {
  test('200 with success message on delete', async () => {
    deleteTask.mockResolvedValueOnce(undefined);

    const res = await request(app).delete('/api/tasks/task-1');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('deleted');
    expect(deleteTask).toHaveBeenCalledWith('task-1', 'user-1');
  });

  test('404 when task not found', async () => {
    const err = Object.assign(new Error('Task not found'), { code: 'NOT_FOUND' });
    deleteTask.mockRejectedValueOnce(err);

    const res = await request(app).delete('/api/tasks/missing-id');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });

  test('403 when user does not own the task', async () => {
    const err = Object.assign(new Error('Forbidden'), { code: 'FORBIDDEN' });
    deleteTask.mockRejectedValueOnce(err);

    const res = await request(app).delete('/api/tasks/task-1');
    expect(res.status).toBe(403);
    expect(res.body.error.code).toBe('FORBIDDEN');
  });
});
