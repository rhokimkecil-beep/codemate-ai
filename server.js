const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ⚠️ Ganti dengan API Key kamu, atau set sebagai environment variable
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || 'sk-ant-api03-MASUKKAN-KEY-KAMU-DISINI';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint chat
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Format pesan tidak valid' });
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 2048,
        system: `Kamu adalah CodeMate, asisten coding yang expert dan ramah.
Kamu ahli dalam semua bahasa pemrograman dan topik teknologi.
Selalu jawab dalam Bahasa Indonesia yang natural dan mudah dipahami.
Ketika memberikan kode, gunakan format markdown dengan blok kode yang jelas.
Berikan penjelasan yang singkat tapi lengkap. Jika ada error, bantu debug dengan detail.`,
        messages
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Gagal menghubungi AI' });
    }

    const data = await response.json();
    res.json({ reply: data.content[0].text });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ CodeMate berjalan di http://localhost:${PORT}`);
});
