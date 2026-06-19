const { signAccessToken, verifyAccessToken } = require('./jwt');

describe('signAccessToken / verifyAccessToken', () => {
  test('returns a JWT string', () => {
    const token = signAccessToken({ sub: 'u1', email: 'a@b.com' });
    expect(typeof token).toBe('string');
    expect(token.split('.')).toHaveLength(3);
  });

  test('decoded payload contains sub and email', () => {
    const token = signAccessToken({ sub: 'u1', email: 'a@b.com' });
    const decoded = verifyAccessToken(token);
    expect(decoded.sub).toBe('u1');
    expect(decoded.email).toBe('a@b.com');
  });

  test('decoded payload includes iat and exp', () => {
    const token = signAccessToken({ sub: 'u1' });
    const decoded = verifyAccessToken(token);
    expect(decoded.iat).toBeDefined();
    expect(decoded.exp).toBeDefined();
    expect(decoded.exp).toBeGreaterThan(decoded.iat);
  });

  test('throws for a completely invalid token', () => {
    expect(() => verifyAccessToken('not.a.valid')).toThrow();
  });

  test('throws for a tampered signature', () => {
    const token = signAccessToken({ sub: 'u1' });
    const [header, payload] = token.split('.');
    expect(() => verifyAccessToken(`${header}.${payload}.invalidsig`)).toThrow();
  });

  test('throws for an empty string', () => {
    expect(() => verifyAccessToken('')).toThrow();
  });

  test('uses env var JWT_ACCESS_EXPIRY when set', () => {
    const original = process.env.JWT_ACCESS_EXPIRY;
    process.env.JWT_ACCESS_EXPIRY = '1h';
    const token = signAccessToken({ sub: 'u2' });
    const decoded = verifyAccessToken(token);
    expect(decoded.exp - decoded.iat).toBe(3600);
    process.env.JWT_ACCESS_EXPIRY = original;
  });
});

describe('getKeys — production guard', () => {
  test('throws in production without env keys', () => {
    const originalEnv = process.env.NODE_ENV;
    const originalPriv = process.env.JWT_PRIVATE_KEY_BASE64;
    const originalPub = process.env.JWT_PUBLIC_KEY_BASE64;

    process.env.NODE_ENV = 'production';
    delete process.env.JWT_PRIVATE_KEY_BASE64;
    delete process.env.JWT_PUBLIC_KEY_BASE64;

    // Clear module cache so getKeys re-evaluates env vars
    jest.resetModules();
    const { signAccessToken: freshSign } = require('./jwt');

    expect(() => freshSign({ sub: 'u1' })).toThrow(
      'JWT_PRIVATE_KEY_BASE64 and JWT_PUBLIC_KEY_BASE64 must be set in production'
    );

    process.env.NODE_ENV = originalEnv;
    if (originalPriv) process.env.JWT_PRIVATE_KEY_BASE64 = originalPriv;
    if (originalPub) process.env.JWT_PUBLIC_KEY_BASE64 = originalPub;
  });
});
