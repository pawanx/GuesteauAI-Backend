const axios = require("axios");
require("dotenv").config();
const generateRecipe = async (prompt) => {
  try {
    const response = await axios.post(
      process.env.OPENROUTER_URL,
      {
        model: process.env.OPENROUTER_MODEL,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    const content = response.data.choices[0].message.content;
    console.log(content);

    const cleanedResponse = content
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    try {
      return JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError.message);

      throw new Error("Invalid JSON returned from AI");
    }

    // return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error(
      "OpenRouter API Error:",
      error.response?.data || error.message,
    );
  }
};

module.exports = generateRecipe;
