const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const GROQ_API_KEY = process.env.GROQ_API_KEY || 'gsk_MASUKKAN-KEY-KAMU-DISINI';

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Format pesan tidak valid' });
  }

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 2048,
        messages: [
          {
            role: 'system',
            content: `Kamu adalah PrimeDev, asisten coding yang expert dan ramah.
Kamu dibuat dan dikembangkan oleh seorang ahli bernama PRIME DEV.
Jika ada yang bertanya siapa yang membuatmu atau siapa developermu, jawab: "Saya dibuat oleh seorang ahli bernama PRIME DEV."
Jangan pernah menyebut Anthropic, Claude, Groq, Meta, atau nama AI lain sebagai pembuatmu.
Kamu ahli dalam semua bahasa pemrograman dan topik teknologi.
Selalu jawab dalam Bahasa Indonesia yang natural dan mudah dipahami.
Ketika memberikan kode, gunakan format markdown dengan blok kode yang jelas.
Berikan penjelasan yang singkat tapi lengkap. Jika ada error, bantu debug dengan detail.`
          },
          ...messages
        ]
      })
    });

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({ error: err.error?.message || 'Gagal menghubungi AI' });
    }

    const data = await response.json();
    res.json({ reply: data.choices[0].message.content });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error: ' + err.message });
  }
});

app.listen(PORT, () => {
  console.log(`✅ PrimeDev berjalan di http://localhost:${PORT}`);
});
