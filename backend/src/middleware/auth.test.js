jest.mock('../utils/jwt', () => ({
  verifyAccessToken: jest.fn(),
}));

const requireAuth = require('./auth');
const { verifyAccessToken } = require('../utils/jwt');

describe('requireAuth middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = { headers: {} };
    res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    next = jest.fn();
    jest.clearAllMocks();
  });

  test('401 UNAUTHORIZED when no Authorization header', () => {
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.objectContaining({ code: 'UNAUTHORIZED' }) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('401 UNAUTHORIZED when header does not start with Bearer', () => {
    req.headers.authorization = 'Basic dXNlcjpwYXNz';
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.objectContaining({ code: 'UNAUTHORIZED' }) })
    );
  });

  test('401 UNAUTHORIZED for Bearer with empty token', () => {
    req.headers.authorization = 'Bearer ';
    verifyAccessToken.mockImplementation(() => { throw new Error('invalid'); });
    requireAuth(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  test('calls next and sets req.user on valid token', () => {
    req.headers.authorization = 'Bearer valid.token.here';
    const userData = { sub: 'user-1', email: 'test@example.com' };
    verifyAccessToken.mockReturnValue(userData);

    requireAuth(req, res, next);

    expect(req.user).toEqual(userData);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
  });

  test('401 TOKEN_EXPIRED when token is expired', () => {
    req.headers.authorization = 'Bearer expired.token.here';
    const err = Object.assign(new Error('jwt expired'), { name: 'TokenExpiredError' });
    verifyAccessToken.mockImplementation(() => { throw err; });

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.objectContaining({ code: 'TOKEN_EXPIRED' }) })
    );
    expect(next).not.toHaveBeenCalled();
  });

  test('401 INVALID_TOKEN for other verification errors', () => {
    req.headers.authorization = 'Bearer bad.token.here';
    verifyAccessToken.mockImplementation(() => { throw new Error('invalid signature'); });

    requireAuth(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ error: expect.objectContaining({ code: 'INVALID_TOKEN' }) })
    );
  });
});
