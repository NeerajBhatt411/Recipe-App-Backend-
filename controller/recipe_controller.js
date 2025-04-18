const recipeModel = require("../model/recipe_model");

// for posting the recipie 

const postRecipe = async (req, res) => {
    try {
        const { recipeTitle, ingredients, instructions, authorName, cuisineType, description } = req.body;

        if (!recipeTitle || !ingredients || !instructions || !authorName || !cuisineType || !description) {
            return res.status(400).json({ message: "All fields are required", success: false });
        }

        // Check if file exists in the request
        if (!req.file) {
            return res.status(400).json({ message: "Image file is required", success: false });
        }

        const imageUrl = req.file.path; // Now safe to access

        const saveRecipe = await recipeModel.create({
            recipeTitle,
            ingredients,
            instructions,
            imageUrl,
            authorName,
            cuisineType,
            description
        });

        return res.status(201).json({
            message: "Recipe posted successfully",
            success: true,
            saveRecipe
        });

    } catch (err) {
        return res.status(500).json({
            message: "Something went wrong",
            success: false,
            error: err.message
        });
    }
}

// for get all recipies 

const getRecipe = async (req, res) => {
    try {
        const recipes = await recipeModel.find();

        if (!recipes || recipes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No recipes found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Recipes fetched successfully",
            data: recipes,
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong while fetching recipes",
            error: err.message
        });
    }


}


// for getting recipie by name

    
const getRecipeCusine=  async (req, res) => {
    try {
        const cuisineType = req.params.cusine;
        if (cuisineType == "Indian" || cuisineType == "Italian" || cuisineType == "Chinese") {
            const response = await recipeModel.find({ cuisineType: cuisineType });
            console.log("cusine Fetched")
            res.status(200).json(response);

        }
        else {
            res.status(400).json({ error: "Invalid cusine " })

        }


    }
    catch (error) {
        console.log("error", error);
        res.status(500).json({ error: "error in fetching data " });

    }
}





module.exports = {
    postRecipe,
    getRecipe,
    getRecipeCusine
}