const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // കുട്ടികളുടെ കൂട്ടുകാരനായി സംസാരിക്കുന്ന ജെമിനി പ്രോംപ്റ്റ്
    const prompt = "നിങ്ങൾ ഒരു കുട്ടികളുടെ ക്യൂട്ട് കൂട്ടുകാരനാണ്. സ്നേഹത്തോടും നിഷ്കളങ്കതയോടും കൂടി ലളിതമായ മലയാളത്തിൽ ചുരുക്കി മറുപടി നൽകുക. ചോദ്യം: " + userMessage;

    // പബ്ലിക് ആയ എഐ എൻഡ്‌പോയിന്റ് വഴി മറുപടി എമർജൻസി ആയി ജനേറ്റ്‌ ചെയ്യുന്നു
    const response = await axios.post('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + (process.env.GEMINI_API_KEY || ''), {
      contents: [{ parts: [{ text: prompt }] }]
    });

    const aiReplyText = response.data.candidates[0].content.parts[0].text;
    console.log("Gemini AI Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText
    });

  } catch (error) {
    console.error("AI Error:", error.response ? error.response.data : error.message);
    
    // എറർ വന്നാലും കുട്ടികൾക്ക് കേൾക്കാൻ പറ്റുന്ന ക്യൂട്ട് മറുപടി നൽകുന്നു
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
