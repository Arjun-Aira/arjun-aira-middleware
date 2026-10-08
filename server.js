const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    const apiKey = process.env.GEMINI_API_KEY;

    const geminiResponse = await axios.post(
      https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey},
      {
        contents: [{ parts: [{ text: userMessage }] }]
      }
    );

    const aiReplyText = geminiResponse.data.candidates[0].content.parts[0].text;
    console.log("Gemini Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText
    });

  }ചatch (error) {
    console.error("Middleware Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(Middleware server running on port ${PORT});
});
