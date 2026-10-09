const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

// നിങ്ങൾ നൽകിയ ജെമിനി എപിഐ കീ
const GEMINI_API_KEY = "AQ.Ab8RN6LR2Zt8RtxJDURVOrUiSlQt6Tj-6Yjwn5ANJ_bz7GTFng";

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // കുട്ടികളുടെ ക്യൂട്ട് കൂട്ടുകാരനായി സംസാരിക്കാൻ ജെമിനിയോട് ആവശ്യപ്പെടുന്ന പ്രോംപ്റ്റ്
    const promptText = "നിങ്ങൾ ഒരു കുട്ടികളുടെ ക്യൂട്ട് കൂട്ടുകാരനാണ്. സ്നേഹത്തോടും നിഷ്കളങ്കതയോടും കൂടി ലളിതമായ മലയാളത്തിൽ ചുരുക്കി മറുപടി നൽകുക. ചോദ്യം: " + userMessage;

    // ജെമിനിയുടെ ഒഫീഷ്യൽ HTTP API ലേക്ക് റിക്വസ്റ്റ് അയക്കുന്നു
    const geminiUrl = https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY};
    
    const response = await axios.post(geminiUrl, {
      contents: [{
        parts: [{ text: promptText }]
      }]
    });

    // ജെമിനി നൽകിയ മറുപടി എടുക്കുന്നു
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
