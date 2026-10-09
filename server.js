const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    console.log("Received from ESP32:", userMessage);

    // കുട്ടികൾക്കായി ഒരു ക്യൂട്ട് കൂട്ടുകാരന്റെ ഭാവത്തിൽ ഓട്ടോമാറ്റിക് ആയി മറുപടി നിർമ്മിക്കുന്നു
    let automaticReply = "";

    if (userMessage.includes("പാട്ട്") || userMessage.includes("song")) {
      automaticReply = "ലാ ലാ ലാ... വാവ ഉറങ്ങാൻ പാട്ടു പാടാം, അമ്മിഞ്ഞപ്പാൽ കുടിച്ചു സുഖമായി ഉറങ്ങിക്കോളൂ കൂട്ടുകാരാ!";
    } else if (userMessage.includes("കഥ") || userMessage.includes("story")) {
      automaticReply = "ഒരിക്കൽ ഒരു കുട്ടി മുയൽക്കുട്ടി ഉണ്ടായിരുന്നു. അത് അമ്മ മുയലിന്റെ കൂടെ ചാടി ചാടി നടന്നു കഥ കേട്ടു!";
    } else {
      // പൊതുവായ ചോദ്യങ്ങൾക്ക് ഓട്ടോമാറ്റിക് ആയി മറുപടി നൽകുന്നു
      automaticReply = "ഓഹോ! അത് വളരെ നല്ലൊരു ചോദ്യമാണല്ലോ, എനിക്കും അത് വളരെ ഇഷ്ടപ്പെട്ടു!";
    }

    console.log("Generated Automatic Reply:", automaticReply);

    res.json({
      success: true,
      reply: automaticReply
    });

  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Middleware server running on port ' + PORT);
});
