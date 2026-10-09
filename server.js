const express = require('express');
const { GoogleGenAI } = require('@google/genai');
const app = express();

app.use(express.json());

// ജെമിനി എഐ ഒഫിഷ്യൽ ക്ലയന്റ് സജ്ജീകരിക്കുന്നു
const ai = new GoogleGenAI();

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // കുട്ടികളുടെ ക്യൂട്ട് കൂട്ടുകാരനായി മറുപടി നൽകാൻ ജെമിനിയോട് ആവശ്യപ്പെടുന്നു
    const prompt = "നിങ്ങൾ കുട്ടികളുടെ ഒരു ക്യൂട്ട് കൂട്ടുകാരനാണ്. സ്നേഹത്തോടും നിഷ്കളങ്കതയോടും കൂടി ലളിതമായ മലയാളത്തിൽ ചുരുക്കി മറുപടി നൽകുക. ചോദ്യം: " + userMessage;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    const aiReplyText = response.text;
    console.log("Real Gemini AI Reply:", aiReplyText);

    res.json({
      success: true,
      reply: aiReplyText
    });

  } catch (error) {
    console.error("AI Error:", error.message);
    res.json({
      success: true,
      reply: "പാവം ഞാൻ! എനിക്ക് ഇപ്പോൾ അത് ശരിക്ക് മനസ്സിലായില്ല, മറ്റൊരു ചോദ്യം ചോദിക്കൂ കൂട്ടുകാരാ."
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Middleware server running on port ' + PORT);
});
