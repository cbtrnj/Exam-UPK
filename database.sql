-- Buat database
CREATE DATABASE IF NOT EXISTS exam_portal;
USE exam_portal;

-- Tabel user (login + blokir)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  blocked BOOLEAN DEFAULT FALSE
);

-- Tabel soal (pilihan ganda/uraian)
CREATE TABLE questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  subject VARCHAR(50),
  question TEXT,
  option_a VARCHAR(255),
  option_b VARCHAR(255),
  option_c VARCHAR(255),
  option_d VARCHAR(255),
  correct_option CHAR(1)
);

-- Tabel jawaban siswa
CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(50),
  answer_link TEXT, -- bisa link Google Drive (Matematika) atau teks jawaban (mapel lain)
  FOREIGN KEY (user_id) REFERENCES users(id)
);
