const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const app = express();
app.use(bodyParser.json());

// Login
app.post('/login', (req, res) => {
  const {username, password} = req.body;
  db.query("SELECT * FROM users WHERE username=? AND password=?", [username, password], (err, result) => {
    if (err) return res.status(500).json({error:err});
    if (result.length === 0) return res.json({success:false});
    if (result[0].blocked) return res.json({success:false, blocked:true});
    res.json({success:true});
  });
});

// Get questions
app.get('/questions/:subject', (req, res) => {
  const subject = req.params.subject;
  db.query("SELECT * FROM questions WHERE subject=?", [subject], (err, result) => {
    if (err) return res.status(500).json({error:err});
    res.json(result);
  });
});

// Submit answer (untuk link Google Drive Matematika)
app.post('/submitAnswer', (req, res) => {
  const {user_id, subject, answer_link} = req.body;
  db.query("INSERT INTO answers (user_id, subject, answer_link) VALUES (?,?,?)",
    [user_id, subject, answer_link],
    (err) => {
      if (err) return res.status(500).json({error:err});
      res.json({success:true});
    });
});

// Block user
app.post('/blockUser', (req, res) => {
  const {username} = req.body;
  db.query("UPDATE users SET blocked=1 WHERE username=?", [username], (err) => {
    if (err) return res.status(500).json({error:err});
    res.json({success:true});
  });
});

// Admin unblock
app.post('/unblockUser', (req, res) => {
  const {username} = req.body;
  db.query("UPDATE users SET blocked=0 WHERE username=?", [username], (err) => {
    if (err) return res.status(500).json({error:err});
    res.json({success:true});
  });
});

app.listen(3000, () => console.log("Server running on port 3000"));
