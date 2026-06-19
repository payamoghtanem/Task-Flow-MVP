const jwt = require('jsonwebtoken');
const crypto = require('crypto');

// Cache ephemeral dev keys across module lifetime so tokens stay valid within one process run
let _devKeys = null;

function getKeys() {
  if (process.env.JWT_PRIVATE_KEY_BASE64 && process.env.JWT_PUBLIC_KEY_BASE64) {
    return {
      privateKey: Buffer.from(process.env.JWT_PRIVATE_KEY_BASE64, 'base64').toString('utf8'),
      publicKey: Buffer.from(process.env.JWT_PUBLIC_KEY_BASE64, 'base64').toString('utf8'),
    };
  }

  if (process.env.NODE_ENV === 'production') {
    throw new Error('JWT_PRIVATE_KEY_BASE64 and JWT_PUBLIC_KEY_BASE64 must be set in production');
  }

  // Generate ephemeral RSA-2048 pair for development / test — invalidates on restart
  if (!_devKeys) {
    _devKeys = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: { type: 'spki', format: 'pem' },
      privateKeyEncoding: { type: 'pkcs8', format: 'pem' },
    });
    console.warn('[jwt] Using ephemeral RSA key pair — set JWT_PRIVATE/PUBLIC_KEY_BASE64 for persistence');
  }

  return { privateKey: _devKeys.privateKey, publicKey: _devKeys.publicKey };
}

function signAccessToken(payload) {
  const { privateKey } = getKeys();
  return jwt.sign(payload, privateKey, {
    algorithm: 'RS256',
    expiresIn: process.env.JWT_ACCESS_EXPIRY || '15m',
  });
}

function verifyAccessToken(token) {
  const { publicKey } = getKeys();
  return jwt.verify(token, publicKey, { algorithms: ['RS256'] });
}

module.exports = { signAccessToken, verifyAccessToken };
