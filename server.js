const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());

// Koneksi database
const db = mysql.createConnection({
  host: 'your-database-host',   // ganti sesuai host PlanetScale/ClearDB
  user: 'your-username',        // ganti sesuai username
  password: 'your-password',    // ganti sesuai password
  database: 'exam_portal'       // ganti sesuai nama database
});

db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

// ================== LOGIN ==================
// Login tanpa password, auto-generate user
app.post('/login', (req, res) => {
  const {username} = req.body;
  db.query("SELECT * FROM users WHERE username=?", [username], (err, result) => {
    if (err) return res.status(500).json({error:err});
    if (result.length === 0) {
      // kalau nama belum ada, otomatis buat akun baru
      db.query("INSERT INTO users (username, blocked) VALUES (?,0)", [username], (err2) => {
        if (err2) return res.status(500).json({error:err2});
        return res.json({success:true});
      });
    } else {
      if (result[0].blocked) return res.json({success:false, blocked:true});
      res.json({success:true, user_id: result[0].id});
    }
  });
});

// ================== QUESTIONS ==================
// Ambil soal per subject
app.get('/questions/:subject', (req, res) => {
  const subject = req.params.subject;
  db.query("SELECT * FROM questions WHERE subject=?", [subject], (err, result) => {
    if (err) return res.status(500).json({error:err});
    res.json(result);
  });
});

// ================== ANSWERS ==================
// Submit jawaban Matematika (link Google Drive)
app.post('/submitMath', (req, res) => {
  const {user_id, subject, answer_link} = req.body;
  db.query("INSERT INTO answers (user_id, subject, answer_link) VALUES (?,?,?)",
    [user_id, subject, answer_link],
    (err) => {
      if (err) return res.status(500).json({error:err});
      res.json({success:true});
    });
});

// Submit jawaban pilihan ganda
app.post('/submitAnswer', (req, res) => {
  const {user_id, subject, answers} = req.body;
  answers.forEach(ans => {
    db.query("INSERT INTO answers (user_id, subject, answer_link) VALUES (?,?,?)",
      [user_id, subject, `Q${ans.question_id}: ${ans.answer}`],
      (err) => {
        if (err) console.error(err);
      });
  });
  res.json({success:true});
});

// ================== BLOCK SYSTEM ==================
// Blokir siswa (dipanggil otomatis dari frontend anti-cheat)
app.post('/blockUser', (req, res) => {
  const {username} = req.body;
  db.query("UPDATE users SET blocked=1 WHERE username=?", [username], (err) => {
    if (err) return res.status(500).json({error:err});
    res.json({success:true});
  });
});

// Admin unblock siswa
app.post('/unblockUser', (req, res) => {
  const {username} = req.body;
  db.query("UPDATE users SET blocked=0 WHERE username=?", [username], (err) => {
    if (err) return res.status(500).json({error:err});
    res.json({success:true});
  });
});

// ================== ADMIN VIEW ==================
// Lihat jawaban siswa
app.get('/getAnswers/:user_id', (req, res) => {
  const user_id = req.params.user_id;
  db.query("SELECT * FROM answers WHERE user_id=?", [user_id], (err, result) => {
    if (err) return res.status(500).json({error:err});
    res.json(result);
  });
});

// ================== SERVER ==================
app.listen(3000, () => console.log("Server running on port 3000"));
