// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set(); // Blacklist token untuk logout

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

  if (!token) {
    return res.status(401).json({ message: 'Token tidak ditemukan, silakan login' });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ message: 'Token sudah tidak valid, silakan login ulang' });
  }

  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded; // Menyimpan data user (id, role) ke request
    next();
  } catch (error) {
    return res.status(403).json({ message: 'Token tidak valid atau kadaluarsa' });
  }
};

module.exports = { authenticateToken, tokenBlacklist };