const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  dishName: {
    type: String,
    required: true,
  },
  ingredients: {
    type: [String], // Array of strings to store ingredients
    required: true,
  },
  cookingTime: {
    type: Number, // Time in minutes
    required: true,
  },
  instructions: {
    type: String, // Detailed instructions
    required: true,
  },
  servings: {
    type: Number, // Number of servings
    required: true,
  },
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard'], // Restrict values to these options
    default: 'Medium',
  },
  createdDate: {
    type: Date,
    default: Date.now, // Automatically set the date when a recipe is created
  },
  author: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model('Recipe', RecipeSchema);
