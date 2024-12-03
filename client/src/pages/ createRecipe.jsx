import React, { useState } from 'react';
import axios from 'axios';


import './createRecipe.css';

const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    dishName: '',
    imageUr: '',
    categorie: '',
    ingredients: [''],
    cookingTime: '',
    instructions: '',
    servings: '',
    difficulty: 'Medium',
    author: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'ingredients') {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: [...prevRecipe.ingredients, ''],
      }));
    } else {
      setRecipe((prevRecipe) => ({
        ...prevRecipe,
        [name]: value,
      }));
    }
  };

  const handleIngredientChange = (index, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients: newIngredients,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://thenaanstop.onrender.com/recipes', recipe);
      alert('Recipe created successfully!');
      setRecipe({
        dishName: '',
        imageUr: '',
        categorie: '',
        ingredients: [''],
        cookingTime: '',
        instructions: '',
        servings: '',
        difficulty: 'Medium',
        author: '',
        yt_link:'',
      });
    } catch (error) {
      console.error('Error creating recipe:', error);
      alert('Failed to create recipe.');
    }
  };

  return (
    <div className="container">
    <div className="create-recipe-container">
      <h1>Create a New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Dish Name:</label>
          <input
            type="text"
            name="dishName"
            value={recipe.dishName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="imageUr"
            value={recipe.imageUr}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Category:</label>
          <input
            type="text"
            name="categorie"
            value={recipe.categorie}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              value={ingredient}
              onChange={(e) => handleIngredientChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={() => setRecipe((prevRecipe) => ({ ...prevRecipe, ingredients: [...prevRecipe.ingredients, ''] }))}>
            Add Ingredient
          </button>
        </div>
        <div className='instruction-div'>
          <label>Instructions:</label>
          <textarea
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            required
          />
        </div>
        <div className='divs-cont'>
          <div className='cookingtime-div'>
            <label>Cooking Time (minutes):</label>
            <input
              type="number"
              name="cookingTime"
              className='cookingTime'
              value={recipe.cookingTime}
              onChange={handleChange}
              required
            />
          </div>
          <div className='servings-div'>
            <label>Servings:</label>
            <input
              type="number"
              name="servings"
              value={recipe.servings}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className='authanddiff'>
          <div className='diff-div'>
            <label>Difficulty:</label>
            <select
              name="difficulty"
              value={recipe.difficulty}
              onChange={handleChange}
              className='diff-input'
            >
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>
          </div>
          <div className='ytLink-div'>
            <label>Youtube Link:</label>
            <input
              type="text"
              name="yt_link"
              className='yt_link-input'
              value={recipe.yt_link}
              onChange={handleChange}
              required
            />
          </div>
          <div className='author-div'>
            <label>Author:</label>
            <input
              type="text"
              name="author"
              className='author-input'
              value={recipe.author}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit">Create Recipe</button>
      </form>
    </div>
     
    </div>
  );
};

export default CreateRecipe;
