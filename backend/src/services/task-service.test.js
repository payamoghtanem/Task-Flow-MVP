jest.mock('../db', () => ({ query: jest.fn() }));

const pool = require('../db');
const { createTask, getTasks, updateTaskStatus, deleteTask } = require('./task-service');

const USER_ID = 'user-abc';
const TASK_ID = 'task-xyz';
const TASK_ROW = {
  id: TASK_ID,
  title: 'My Task',
  category: 'PERSONAL',
  timeframe: 'DAILY',
  status: 'TODO',
  created_at: '2026-06-19T00:00:00.000Z',
};

beforeEach(() => jest.clearAllMocks());

describe('createTask — validation', () => {
  test('throws VALIDATION_ERROR for missing title', async () => {
    const err = await createTask(USER_ID, { title: '', category: 'PERSONAL', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.status).toBe(400);
    expect(pool.query).not.toHaveBeenCalled();
  });

  test('throws VALIDATION_ERROR for whitespace-only title', async () => {
    const err = await createTask(USER_ID, { title: '   ', category: 'PERSONAL', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  test('throws VALIDATION_ERROR for null title', async () => {
    const err = await createTask(USER_ID, { title: null, category: 'PERSONAL', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  test('throws VALIDATION_ERROR when title exceeds 100 chars', async () => {
    const err = await createTask(USER_ID, { title: 'a'.repeat(101), category: 'PERSONAL', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.message).toContain('100');
  });

  test('throws VALIDATION_ERROR for invalid category', async () => {
    const err = await createTask(USER_ID, { title: 'Task', category: 'INVALID', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.message).toContain('PERSONAL');
  });

  test('throws VALIDATION_ERROR for missing category', async () => {
    const err = await createTask(USER_ID, { title: 'Task', timeframe: 'DAILY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  test('throws VALIDATION_ERROR for invalid timeframe', async () => {
    const err = await createTask(USER_ID, { title: 'Task', category: 'PERSONAL', timeframe: 'YEARLY' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(err.message).toContain('DAILY');
  });

  test('throws VALIDATION_ERROR for missing timeframe', async () => {
    const err = await createTask(USER_ID, { title: 'Task', category: 'PERSONAL' }).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
  });
});

describe('createTask — success', () => {
  test('inserts with trimmed title and returns row', async () => {
    pool.query.mockResolvedValueOnce({ rows: [TASK_ROW] });

    const result = await createTask(USER_ID, { title: '  My Task  ', category: 'PERSONAL', timeframe: 'DAILY' });
    expect(result).toEqual(TASK_ROW);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('INSERT INTO tasks'),
      [USER_ID, 'My Task', 'PERSONAL', 'DAILY']
    );
  });

  test('accepts PROFESSIONAL category and MONTHLY timeframe', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ ...TASK_ROW, category: 'PROFESSIONAL', timeframe: 'MONTHLY' }] });
    const result = await createTask(USER_ID, { title: 'Work', category: 'PROFESSIONAL', timeframe: 'MONTHLY' });
    expect(result.category).toBe('PROFESSIONAL');
  });
});

describe('getTasks', () => {
  test('returns all rows for the user', async () => {
    pool.query.mockResolvedValueOnce({ rows: [TASK_ROW] });
    const result = await getTasks(USER_ID);
    expect(result).toEqual([TASK_ROW]);
    expect(pool.query).toHaveBeenCalledWith(
      expect.stringContaining('WHERE user_id = $1'),
      [USER_ID]
    );
  });

  test('returns empty array when user has no tasks', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const result = await getTasks(USER_ID);
    expect(result).toEqual([]);
  });
});

describe('updateTaskStatus', () => {
  test('throws VALIDATION_ERROR for invalid status', async () => {
    const err = await updateTaskStatus(TASK_ID, USER_ID, 'INVALID').catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
    expect(pool.query).not.toHaveBeenCalled();
  });

  test('throws VALIDATION_ERROR for missing status', async () => {
    const err = await updateTaskStatus(TASK_ID, USER_ID, undefined).catch((e) => e);
    expect(err.code).toBe('VALIDATION_ERROR');
  });

  test('throws NOT_FOUND (404) when task does not exist', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const err = await updateTaskStatus(TASK_ID, USER_ID, 'IN_PROGRESS').catch((e) => e);
    expect(err.code).toBe('NOT_FOUND');
    expect(err.status).toBe(404);
  });

  test('throws FORBIDDEN (403) when user does not own task', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ user_id: 'other-user' }] });
    const err = await updateTaskStatus(TASK_ID, USER_ID, 'IN_PROGRESS').catch((e) => e);
    expect(err.code).toBe('FORBIDDEN');
    expect(err.status).toBe(403);
  });

  test('updates status and returns updated row', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ user_id: USER_ID }] });
    const updated = { id: TASK_ID, status: 'IN_PROGRESS', updated_at: new Date().toISOString() };
    pool.query.mockResolvedValueOnce({ rows: [updated] });

    const result = await updateTaskStatus(TASK_ID, USER_ID, 'IN_PROGRESS');
    expect(result).toEqual(updated);
    expect(pool.query).toHaveBeenNthCalledWith(2,
      expect.stringContaining('UPDATE tasks SET status'),
      ['IN_PROGRESS', TASK_ID]
    );
  });

  test('accepts all valid statuses: TODO, IN_PROGRESS, DONE', async () => {
    for (const status of ['TODO', 'IN_PROGRESS', 'DONE']) {
      pool.query.mockResolvedValueOnce({ rows: [{ user_id: USER_ID }] });
      pool.query.mockResolvedValueOnce({ rows: [{ id: TASK_ID, status }] });
      const result = await updateTaskStatus(TASK_ID, USER_ID, status);
      expect(result.status).toBe(status);
    }
  });
});

describe('deleteTask', () => {
  test('throws NOT_FOUND (404) when task does not exist', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const err = await deleteTask(TASK_ID, USER_ID).catch((e) => e);
    expect(err.code).toBe('NOT_FOUND');
    expect(err.status).toBe(404);
  });

  test('throws FORBIDDEN (403) when user does not own task', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ user_id: 'other-user' }] });
    const err = await deleteTask(TASK_ID, USER_ID).catch((e) => e);
    expect(err.code).toBe('FORBIDDEN');
    expect(err.status).toBe(403);
  });

  test('deletes task and returns undefined on success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ user_id: USER_ID }] });
    pool.query.mockResolvedValueOnce({ rows: [] });

    await expect(deleteTask(TASK_ID, USER_ID)).resolves.toBeUndefined();
    expect(pool.query).toHaveBeenNthCalledWith(2, 'DELETE FROM tasks WHERE id = $1', [TASK_ID]);
  });
});
