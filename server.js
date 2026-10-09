const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

const GEMINI_API_KEY = "AQ.Ab8RN6LR2Zt8RtxJDURVOrUiSlQt6Tj-6Yjwn5ANJ_bz7GTFng";

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    const promptText = "നിങ്ങൾ ഒരു കുട്ടികളുടെ ക്യൂട്ട് കൂട്ടുകാരനാണ്. സ്നേഹത്തോടും നിഷ്കളങ്കതയോടും കൂടി ലളിതമായ മലയാളത്തിൽ ചുരുക്കി മറുപടി നൽകുക. ചോദ്യം: " + userMessage;

    const geminiUrl = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY};
    
    const response = await axios.post(geminiUrl, {
      contents: [{
        parts: [{ text: promptText }]
      }]
    });

    const aiReplyText = response.data.candidates[0].content.parts[0].text;
    console.log("Gemini AI Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText.trim()
    });

  } catch (error) {
    console.error("AI Error:", error.response ? error.response.data : error.message);
    res.json({
      success: true,
      reply: "പാവം ഞാൻ! എനിക്ക് ഇപ്പോൾ അത് മനസ്സിലായില്ല, മറ്റൊരു ചോദ്യം ചോദിക്കൂ കൂട്ടുകാരാ."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Middleware server running on port ' + PORT);
});
