const User = require('../models/userModel');
const jwt = require('jsonwebtoken');

// Untuk menyimpan token yang telah logout (blacklist)
// Kita gunakan Set sederhana untuk contoh ini; idealnya gunakan Redis
const tokenBlacklist = new Set();

const authController = {
    // Register
    register: (req, res) => {
        const { username, email, password, role } = req.body;

        // Validasi role
        const validRoles = ['produsen', 'pbf', 'apotek'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Role tidak valid' });
        }

        // Simpan user ke database via model
        User.create(username, email, password, role, (err, result) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Username atau email sudah digunakan' });
                }
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: 'Registrasi berhasil, silakan login' });
        });
    },

    // Login
    login: (req, res) => {
        const { username, password } = req.body;

        // Cari user via model
        User.findByUsername(username, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });

            // Cek password (plain text)
            if (password !== user.password) return res.status(401).json({ message: 'Password salah' });

            // Buat token JWT
            const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
            res.json({ token, role: user.role, username: user.username });
        });
    },

    // Logout
    logout: (req, res) => {
        try {
            // Ambil token dari header Authorization
            const token = req.headers.authorization?.split(' ')[1]; // Format: Bearer <token>

            if (!token) {
                return res.status(401).json({ message: 'Token tidak ditemukan' });
            }

            // Tambahkan token ke blacklist
            tokenBlacklist.add(token);

            res.json({ message: 'Logout berhasil' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat logout: ' + error.message });
        }
    }
};

module.exports = authController;