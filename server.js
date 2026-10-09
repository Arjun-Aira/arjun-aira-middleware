const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ success: false, error: "GEMINI_API_KEY is not set" });
    }

    let url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
    let headers = {
      'Content-Type': 'application/json'
    };

    // AQ. അല്ലെങ്കിൽ ya29. എന്ന് തുടങ്ങുന്ന ടോക്കൺ ആണെങ്കിൽ Bearer ഹെഡർ ആയി നൽകും
    if (apiKey.startsWith('AQ.') || apiKey.startsWith('ya29.')) {
      headers['Authorization'] = 'Bearer ' + apiKey;
    } else {
      url += '?key=' + apiKey;
    }

    const geminiResponse = await axios.post(url, {
      contents: [
        {
          parts: [{ text: userMessage }]
        }
      ]
    }, { headers });

    const aiReplyText = geminiResponse.data.candidates[0].content.parts[0].text;
    console.log("Gemini Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText
    });

  } catch (error) {
    console.error("Middleware Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ success: false, error: error.response ? JSON.stringify(error.response.data) : error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Middleware server running on port ' + PORT);
});
