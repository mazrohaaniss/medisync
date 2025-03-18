const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const tokenBlacklist = new Set();

const authController = {
    register: (req, res) => {
        const { username, email, password, role } = req.body;
        console.log('Data diterima:', { username, email, password, role });

        const validRoles = ['produsen', 'pbf', 'apotek'];
        if (!validRoles.includes(role)) {
            return res.status(400).json({ message: 'Role tidak valid' });
        }

        User.create(username, email, password, role, (err, result) => {
            if (err) {
                console.error('Kesalahan saat membuat user:', err);
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'Username atau email sudah digunakan' });
                }
                return res.status(500).json({ message: 'Kesalahan server', error: err.message });
            }
            res.status(201).json({ message: 'Registrasi berhasil, silakan login' });
        });
    },

    login: (req, res) => {
        const { username, password } = req.body;
        User.findByUsername(username, (err, user) => {
            if (err) return res.status(500).json({ error: err.message });
            if (!user) return res.status(401).json({ message: 'User tidak ditemukan' });
            if (password !== user.password) return res.status(401).json({ message: 'Password salah' });

            const token = jwt.sign({ id: user.id, role: user.role }, 'secret_key', { expiresIn: '1h' });
            res.json({ token, role: user.role, username: user.username });
        });
    },

    logout: (req, res) => {
        try {
            const token = req.headers.authorization?.split(' ')[1];
            if (!token) return res.status(401).json({ message: 'Token tidak ditemukan' });
            tokenBlacklist.add(token);
            res.json({ message: 'Logout berhasil' });
        } catch (error) {
            res.status(500).json({ error: 'Terjadi kesalahan saat logout: ' + error.message });
        }
    }
};

module.exports = authController;