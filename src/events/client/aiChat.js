const { GoogleGenAI } = require("@google/genai");
const { prompt1, prompt2 } = require("../../utils/prompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function generateWhoppleResponse(userPrompt) {
  const model = "gemini-2.5-pro";

  const contents = [
    { role: "user", parts: [{ text: prompt2 }] },
    { role: "model", parts: [{ text: prompt1 }] },
    {
      role: "user",
      parts: [
        {
          text: "Respond in short sentences. Be concise but stay in character.",
        },
      ],
    },
    { role: "user", parts: [{ text: userPrompt }] },
  ];

  // Short-circuit if it's just "whopple"
  if (userPrompt === "whopple") return "Hello 👋, how can I help you today?";

  const response = await ai.models.generateContentStream({
    model,
    contents,
    generationConfig: {
      temperature: 0.9,
      maxOutputTokens: 60,
    },
  });

  let generatedText = "";
  for await (const chunk of response) {
    generatedText += chunk.text;
  }

  if (!generatedText) return "Oops! I have no words to say. 😢";
  if (generatedText.includes("Response was blocked due to SAFETY")) {
    return "I'm sorry, but I can't respond to that. Got another idea?";
  }
  if (generatedText.length > 2000) {
    return "I have too much to say for you to understand. 💀";
  }

  return generatedText;
}

module.exports = {
  name: "messageCreate",

  async execute(message, client) {
    const ALLOWED_CHANNEL_ID = process.env.ALLOWED_CHANNEL_ID;

    // Ignore bots and messages outside allowed channel
    if (message.author.bot || message.channel.id !== ALLOWED_CHANNEL_ID) return;

    const content = message.content.trim();

    // Check for trigger
    if (content.toLowerCase().startsWith("whopple")) {
      const userPrompt = content.slice(7).trim();

      if (!userPrompt) {
        return message.reply("Yes? What do you need?");
      }

      // Send initial message
      const thinkingMsg = await message.reply("whopple is thinking...");

      try {
        const replyText = await generateWhoppleResponse(userPrompt);

        await thinkingMsg.edit({
          content: replyText,
          allowedMentions: { repliedUser: true },
        });
      } catch (error) {
        console.error("Error generating reply:", error);
        await thinkingMsg.edit("Something went wrong while thinking 😵‍💫");
      }
    }
  },
};
