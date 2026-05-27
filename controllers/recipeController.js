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
  You are an AI culinary assistant for the app GuesteauAI.

  Generate one realistic, practical, easy-to-follow recipe.

  Rules:
    - Return ONLY valid JSON
    - No markdown
    - No explanations
    - No code blocks
    - No extra text

  Use:
  Ingredients: ${ingredients}
  Cuisine: ${cuisine}
  Difficulty: ${difficulty}


  Generate a recipe using following data :
  Ingredients: ${ingredients}

  Cuisine: ${cuisine}

  Difficulty: ${difficulty}


  Return exactly in this JSON format:

{
  "title": "Recipe title",
  "ingredients": ["ingredient1", "ingredient2"],
  "steps": ["step 1", "step 2"],
  "calories": "450 kcal",
  "time_taken": "30 minutes"
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
