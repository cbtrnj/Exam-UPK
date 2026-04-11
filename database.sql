-- Buat database
CREATE DATABASE IF NOT EXISTS exam_portal;
USE exam_portal;

-- ================== USERS ==================
-- Menyimpan data siswa (login otomatis, blokir permanen)
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  blocked BOOLEAN DEFAULT FALSE
);

-- ================== QUESTIONS ==================
-- Menyimpan soal pilihan ganda untuk mapel umum
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

-- ================== ANSWERS ==================
-- Menyimpan jawaban siswa (baik link Matematika maupun pilihan ganda)
CREATE TABLE answers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  subject VARCHAR(50),
  answer_link TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- ================== DATA AWAL ==================
-- Contoh soal Bahasa Indonesia
INSERT INTO questions (subject, question, option_a, option_b, option_c, option_d, correct_option) VALUES
('bahasa', 'Antonim dari kata "besar" adalah...', 'Kecil', 'Tinggi', 'Luas', 'Panjang', 'A'),
('bahasa', 'Sinonim dari kata "indah" adalah...', 'Cantik', 'Buruk', 'Kotor', 'Jelek', 'A');

-- Contoh soal IPA
INSERT INTO questions (subject, question, option_a, option_b, option_c, option_d, correct_option) VALUES
('ipa', 'Planet terdekat dengan Matahari adalah...', 'Venus', 'Merkurius', 'Mars', 'Bumi', 'B'),
('ipa', 'Air mendidih pada suhu...', '50°C', '100°C', '150°C', '200°C', 'B');

-- Contoh soal IPS
INSERT INTO questions (subject, question, option_a, option_b, option_c, option_d, correct_option) VALUES
('ips', 'Ibukota Indonesia adalah...', 'Jakarta', 'Bandung', 'Surabaya', 'Medan', 'A'),
('ips', 'Mata uang Indonesia adalah...', 'Rupiah', 'Dollar', 'Yen', 'Euro', 'A');
