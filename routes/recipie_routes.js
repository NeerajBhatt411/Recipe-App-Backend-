const express = require('express');
const router = express.Router();
const { postRecipe ,getRecipe, getRecipeCusine} = require("./../controller/recipe_controller");  // Correcting import for postRecipe
const upload = require("./../util/multer");
const { get } = require('mongoose');

// router.post('/post-recipe',upload.single('image'), postRecipe); 
router.post('/post-recipe', upload.single('image'), postRecipe);
router.get('/get-recipe',  getRecipe);
router.get("/get-recipe/:cusine",getRecipeCusine)



module.exports = router;