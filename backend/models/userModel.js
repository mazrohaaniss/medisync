const db = require('../config/db');

const User = {
    // Buat user baru (register)
    create: (username, email, password, role, callback) => {
        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, password, role], (err, result) => {
            if (err) return callback(err);
            callback(null, result);
        });
    },

    // Cari user berdasarkan username (login)
    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]); // Mengembalikan user pertama atau undefined
        });
    }
};

module.exports = User;