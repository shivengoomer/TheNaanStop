const express = require('express');
const router = express.Router();
const Recipe = require('../models/recipeModel.js'); // Import the Recipe model

// @route   GET /recipes
// @desc    Get all recipes
// @access  Public
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   GET /recipes/:id
// @desc    Get a recipe by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// @route   POST /recipes
// @desc    Create a new recipe
// @access  Public
router.post('/', async (req, res) => {
  const { dishName, ingredients, cookingTime, instructions, servings, difficulty, author } = req.body;

  const recipe = new Recipe({
    dishName,
    ingredients,
    cookingTime,
    instructions,
    servings,
    difficulty,
    author,
  });

  try {
    const newRecipe = await recipe.save();
    res.status(201).json(newRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   PUT /recipes/:id
// @desc    Update a recipe by ID
// @access  Public
router.put('/:id', async (req, res) => {
  try {
    const { dishName, ingredients, cookingTime, instructions, servings, difficulty, author } = req.body;

    const updatedRecipe = await Recipe.findByIdAndUpdate(
      req.params.id,
      { dishName, ingredients, cookingTime, instructions, servings, difficulty, author },
      { new: true }
    );

    if (!updatedRecipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json(updatedRecipe);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// @route   DELETE /recipes/:id
// @desc    Delete a recipe by ID
// @access  Public
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) return res.status(404).json({ message: 'Recipe not found' });
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
