const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'your-database-host',   // ganti dengan host PlanetScale/ClearDB
  user: 'your-username',        // ganti dengan username database
  password: 'your-password',    // ganti dengan password database
  database: 'exam_portal'       // ganti dengan nama database
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

module.exports = db;
