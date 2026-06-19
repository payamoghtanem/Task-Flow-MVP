jest.mock('../db', () => ({ query: jest.fn() }));
jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));
jest.mock('../utils/jwt', () => ({
  signAccessToken: jest.fn().mockReturnValue('mock.jwt.token'),
}));

const pool = require('../db');
const bcrypt = require('bcryptjs');
const { signAccessToken } = require('../utils/jwt');
const { register, login } = require('./auth-service');

beforeEach(() => jest.clearAllMocks());

describe('register', () => {
  test('throws EMAIL_TAKEN (409) when email already exists', async () => {
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'existing-id' }] });

    const err = await register('taken@example.com', 'password123').catch((e) => e);
    expect(err.code).toBe('EMAIL_TAKEN');
    expect(err.status).toBe(409);
    expect(err.message).toContain('already exists');
  });

  test('hashes password with 12 rounds', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce('$2b$12$hashed');
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'u1', email: 'new@example.com' }] });

    await register('new@example.com', 'password123');
    expect(bcrypt.hash).toHaveBeenCalledWith('password123', 12);
  });

  test('inserts user with parameterized query', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce('$2b$12$hashed');
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'u1', email: 'new@example.com' }] });

    await register('new@example.com', 'password123');
    expect(pool.query).toHaveBeenNthCalledWith(2,
      expect.stringContaining('INSERT INTO users'),
      ['new@example.com', '$2b$12$hashed']
    );
  });

  test('returns user and signed token on success', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.hash.mockResolvedValueOnce('$2b$12$hashed');
    pool.query.mockResolvedValueOnce({ rows: [{ id: 'u1', email: 'user@example.com' }] });

    const result = await register('user@example.com', 'password123');
    expect(result).toEqual({ user: { id: 'u1', email: 'user@example.com' }, token: 'mock.jwt.token' });
    expect(signAccessToken).toHaveBeenCalledWith({ sub: 'u1', email: 'user@example.com' });
  });
});

describe('login', () => {
  test('always calls bcrypt.compare even when user not found (timing safety)', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.compare.mockResolvedValueOnce(false);

    await login('ghost@example.com', 'password123').catch(() => {});
    expect(bcrypt.compare).toHaveBeenCalledTimes(1);
  });

  test('throws INVALID_CREDENTIALS (401) when user not found', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    bcrypt.compare.mockResolvedValueOnce(false);

    const err = await login('ghost@example.com', 'password123').catch((e) => e);
    expect(err.code).toBe('INVALID_CREDENTIALS');
    expect(err.status).toBe(401);
  });

  test('throws INVALID_CREDENTIALS when password is wrong', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 'u1', email: 'user@example.com', password_hash: '$2b$12$hash' }],
    });
    bcrypt.compare.mockResolvedValueOnce(false);

    const err = await login('user@example.com', 'wrongpass').catch((e) => e);
    expect(err.code).toBe('INVALID_CREDENTIALS');
  });

  test('returns user and token on successful login', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 'u1', email: 'user@example.com', password_hash: '$2b$12$hash' }],
    });
    bcrypt.compare.mockResolvedValueOnce(true);

    const result = await login('user@example.com', 'correct!pass');
    expect(result).toEqual({ user: { id: 'u1', email: 'user@example.com' }, token: 'mock.jwt.token' });
    expect(signAccessToken).toHaveBeenCalledWith({ sub: 'u1', email: 'user@example.com' });
  });
});
