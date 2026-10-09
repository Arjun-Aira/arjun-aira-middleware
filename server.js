const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const app = express();

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // മോഡൽ നെയിം കൃത്യമായി കോൺഫിഗർ ചെയ്യുന്നു
    const model = genAI.getGenerativeModel({ model: "models/gemini-1.5-flash" });

    const result = await model.generateContent(userMessage);
    const response = await result.response;
    const aiReplyText = response.text();

    console.log("Gemini Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText
    });

  } catch (error) {
    console.error("Middleware Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Middleware server running on port ' + PORT);
});
