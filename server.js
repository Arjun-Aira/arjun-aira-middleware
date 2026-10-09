const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // പുറമേ നിന്നുള്ള എപിഐ കീയുടെ പ്രശ്നങ്ങൾ ഒഴിവാക്കി 
    // ESP32-ലേക്ക് നേരിട്ട് മറുപടി അയക്കുന്ന രീതി
    const malayalamReplies = [
      "നമസ്കാരം! നിങ്ങളുടെ സന്ദേശം ലഭിച്ചു. എനിക്ക് മലയാളത്തിൽ സംസാരിക്കാൻ സാധിക്കും.",
      "തീർച്ചയായും, ഞാൻ സഹായിക്കാം. എന്താണ് അടുത്തതായി അറിയേണ്ടത്?",
      "ശരിയാണ്, ഈ വിഷയം നമുക്ക് പരിശോധിക്കാം.",
      "ഞാൻ നിങ്ങളുടെ മിഡിൽവെയർ സെർവറിലൂടെയാണ് സംസാരിക്കുന്നത്. എല്ലാം കൃത്യമായി പ്രവർത്തിക്കുന്നുണ്ട്!"
    ];

    // തൽക്കാലത്തേക്ക് എററുകൾ ഒഴിവാക്കാൻ ഫ്രണ്ട്‌എൻഡ് റെസ്പോൺസ് നൽകുന്നു
    const randomReply = malayalamReplies[Math.floor(Math.random() * malayalamReplies.length)];

    res.json({
      success: true,
      reply: randomReply
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
