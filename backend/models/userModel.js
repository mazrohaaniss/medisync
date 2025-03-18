const db = require('../config/db');

const User = {
    create: (username, email, password, role, callback) => {
        const sql = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
        db.query(sql, [username, email, password, role], (err, result) => {
            if (err) {
                console.error('Kesalahan query:', err);
                return callback(err);
            }
            callback(null, result);
        });
    },

    findByUsername: (username, callback) => {
        const sql = 'SELECT * FROM users WHERE username = ?';
        db.query(sql, [username], (err, results) => {
            if (err) {
                console.error('Kesalahan query:', err);
                return callback(err);
            }
            callback(null, results[0]);
        });
    }
};

module.exports = User;