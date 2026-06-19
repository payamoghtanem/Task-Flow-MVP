jest.mock('../services/auth-service', () => ({
  register: jest.fn(),
  login: jest.fn(),
}));

const request = require('supertest');
const createApp = require('../app');
const { register, login } = require('../services/auth-service');

const app = createApp();

beforeEach(() => jest.clearAllMocks());

describe('POST /api/auth/register', () => {
  test('400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ password: 'password123' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('400 when email is invalid format', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'notanemail', password: 'password123' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('400 when password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('400 when password is too short', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com', password: 'short' });
    expect(res.status).toBe(400);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  test('409 when email is already taken', async () => {
    const err = Object.assign(new Error('An account with this email already exists'), { code: 'EMAIL_TAKEN' });
    register.mockRejectedValueOnce(err);

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'taken@example.com', password: 'password123' });
    expect(res.status).toBe(409);
    expect(res.body.error.code).toBe('EMAIL_TAKEN');
    expect(res.body.success).toBe(false);
  });

  test('201 with user and token on valid registration', async () => {
    register.mockResolvedValueOnce({ user: { id: 'u1', email: 'new@example.com' }, token: 'jwt.token' });

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'new@example.com', password: 'password123' });
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.user.email).toBe('new@example.com');
    expect(res.body.data.token).toBe('jwt.token');
    expect(register).toHaveBeenCalledWith('new@example.com', 'password123');
  });

  test('lowercases email before calling register', async () => {
    register.mockResolvedValueOnce({ user: { id: 'u1', email: 'user@example.com' }, token: 'tok' });

    await request(app)
      .post('/api/auth/register')
      .send({ email: 'USER@EXAMPLE.COM', password: 'password123' });
    expect(register).toHaveBeenCalledWith('user@example.com', 'password123');
  });

  test('500 is handled by express error handler for unexpected errors', async () => {
    register.mockRejectedValueOnce(new Error('DB connection refused'));

    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'user@example.com', password: 'password123' });
    expect(res.status).toBe(500);
  });
});

describe('POST /api/auth/login', () => {
  test('400 when email is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ password: 'password123' });
    expect(res.status).toBe(400);
  });

  test('400 when password is missing', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com' });
    expect(res.status).toBe(400);
    expect(res.body.error.message).toBe('Password is required');
  });

  test('400 when password is non-string', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 123 });
    expect(res.status).toBe(400);
  });

  test('401 on invalid credentials', async () => {
    const err = Object.assign(new Error('Invalid email or password'), { code: 'INVALID_CREDENTIALS' });
    login.mockRejectedValueOnce(err);

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'wrongpass' });
    expect(res.status).toBe(401);
    expect(res.body.error.code).toBe('INVALID_CREDENTIALS');
  });

  test('200 with user and token on successful login', async () => {
    login.mockResolvedValueOnce({ user: { id: 'u1', email: 'user@example.com' }, token: 'jwt.token' });

    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password123' });
    expect(res.status).toBe(200);
    expect(res.body.data.token).toBe('jwt.token');
    expect(login).toHaveBeenCalledWith('user@example.com', 'password123');
  });
});

describe('POST /api/auth/logout', () => {
  test('200 with success message (stateless)', async () => {
    const res = await request(app).post('/api/auth/logout').send({});
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.message).toContain('Logged out');
  });
});

describe('app middleware', () => {
  test('404 for unknown routes', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.status).toBe(404);
    expect(res.body.error.code).toBe('NOT_FOUND');
  });
});
