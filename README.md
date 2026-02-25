# 🤖 CodeMate AI — Asisten Coding

Aplikasi chatbot AI untuk tanya-jawab seputar coding, powered by Claude (Anthropic).
Pengguna **tidak perlu memasukkan API key** — sudah tersimpan di server.

---

## 📁 Struktur Project

```
codemate-ai/
├── server.js        ← Backend (Node.js + Express)
├── package.json     ← Daftar dependencies
├── .env             ← API Key (buat sendiri, jangan di-upload ke GitHub!)
└── public/
    └── index.html   ← Frontend (otomatis disajikan oleh server)
```

---

## 🚀 Cara Jalankan di Lokal

### 1. Install Node.js
Download di https://nodejs.org (versi 18 ke atas)

### 2. Install dependencies
```bash
npm install
```

### 3. Buat file `.env`
Buat file bernama `.env` di root folder, isi dengan:
```
ANTHROPIC_API_KEY=sk-ant-api03-MASUKKAN-KEY-KAMU
```
API Key bisa didapat di: https://console.anthropic.com

### 4. Jalankan server
```bash
npm start
```

### 5. Buka browser
Akses di: http://localhost:3000

---

## ☁️ Deploy Gratis ke Railway

1. Buat akun di https://railway.app
2. Klik **"New Project"** → **"Deploy from GitHub"**
3. Upload/push project ini ke GitHub kamu
4. Hubungkan repo ke Railway
5. Di Railway, buka tab **"Variables"** → tambahkan:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-api03-...` (API key kamu)
6. Railway akan otomatis deploy — dapat URL publik!

---

## ☁️ Deploy Gratis ke Render

1. Buat akun di https://render.com
2. Klik **"New Web Service"**
3. Hubungkan GitHub repo
4. Setting:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
5. Di tab **"Environment"** → tambahkan `ANTHROPIC_API_KEY`
6. Klik Deploy!

---

## ⚠️ Catatan Penting

- **Jangan pernah** memasukkan API key langsung di `server.js` dan upload ke GitHub publik!
- Selalu gunakan environment variable (`.env` atau dashboard hosting)
- File `.env` sudah otomatis diabaikan jika kamu tambahkan `.gitignore`

---

## 💰 Estimasi Biaya

Model yang digunakan: `claude-haiku-4-5` (model tercepat & termurah)
- Input: $0.80 / 1 juta token
- Output: $4.00 / 1 juta token
- 1 pesan rata-rata ≈ 500 token = sekitar $0.002 (sangat murah!)

Anthropic memberikan **free credit** untuk pengguna baru.
