const generateRecipe = require("../services/openrouter");

const createRecipe = async (req, res) => {
  try {
    const { ingredients, cuisine, difficulty } = req.body;

    if (!ingredients || !cuisine || !difficulty) {
      return res.status(401).json({
        success: false,
        message: "All fields are required.",
      });
    }

    const prompt = `
    You are a assistant for an app named GusteauAI and you need to create recipes based on given ingredients, cuisine type and difficulty by the user.
    Return the response stricly in json format only. Don't add extra text or suggestions in the response. Your job is to ONLY return valid JSON.DO NOT:
    - write explanations
    - write markdown
    - write headings
    - write sample text
    - write code blocks


    Generate a recipe using following data :
    Ingredients: ${ingredients}

    Cuisine: ${cuisine}

    Difficulty: ${difficulty}

    Return in this format: 

    {
    title :
    ingredients : 
    steps : 
    calories :
    }
    `;

    const recipe = await generateRecipe(prompt);

    res.status(200).json({
      success: true,
      message: "Recipe generated successfully",
      recipe,
    });
  } catch (error) {
    console.log("Server failed to generate recipe", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate recipe.",
    });
  }
};

module.exports = createRecipe;
