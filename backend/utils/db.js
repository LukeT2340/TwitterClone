const mysql = require('mysql2');

// Database information
const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    password: 'National$1',
    database: 'my_db_01'
});

// Adds user to the users table in MySQL database
const addUser = (username, hashedPassword, email) => {
    return new Promise((resolve, reject) => {
        const dateRegistered = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format date as YYYY-MM-DD HH:MM:SS
        const query =  'INSERT INTO users (name, handle, hashed_password, date_registered, email) VALUES (?, ?, ?, ?, ?)';
        db.query(
            query,
            [username, username.toLowerCase(), hashedPassword, dateRegistered, email],
            (err, result) => {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            }
        );
    });
};

// Function to execute MySQL queries
const query = (sql, params, callback) => {
    db.getConnection((err, connection) => {
      if (err) {
        callback(err, null);
        return;
      }
      connection.query(sql, params, (err, results) => {
        connection.release();
        if (err) {
          callback(err, null);
          return;
        }
        callback(null, results);
      });
    });
  };
  
module.exports = { addUser, query };