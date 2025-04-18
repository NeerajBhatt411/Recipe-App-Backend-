const mongoose = require("mongoose");

const recipeSchema = mongoose.Schema({
    recipeTitle:{ type: String, required: true },
    ingredients: {
        type: [String],
        required: true
    },
    instructions: { type: String, required: true },
    authorName: { type: String, required: true },
    cuisineType: { type: String, enum: ["Indian", "Chinese", "Italian"], required: true },
    description: { type: String, required: true },
    imageUrl: { type: String},


}, { timestamps: true })

const recipeModel = mongoose.model("recipeModel", recipeSchema);

module.exports = recipeModel;