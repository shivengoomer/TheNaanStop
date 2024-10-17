import React, { useEffect, useState } from 'react';
import { getRecipes } from './services/recipeServices'; // Adjust the path accordingly
import './recipes.css'; // Import CSS for styling

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedRecipe, setExpandedRecipe] = useState(null); // Track which recipe is expanded

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const data = await getRecipes();
        setRecipes(data);
      } catch (error) {
        console.error('Error fetching recipes:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  const handleCardClick = (recipeId) => {
    setExpandedRecipe(expandedRecipe === recipeId ? null : recipeId); // Toggle expanded state
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="recipes-container">
      <h1>Recipes</h1>
      <div className="recipes-grid">
        {recipes.map((recipe) => (
          <div 
            key={recipe._id} 
            className="recipe-card" 
            onClick={() => handleCardClick(recipe._id)}
          >
            <h2>{recipe.dishName}</h2>
            {expandedRecipe === recipe._id && (
              <div className="recipe-details">
                <p>Author: {recipe.author}</p>
                <p>Cooking Time: {recipe.cookingTime} minutes</p>
                <p><strong>Ingredients:</strong></p>
                <ul>
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
                <p><strong>Instructions:</strong> {recipe.instructions}</p>
                <p><strong>Servings:</strong> {recipe.servings}</p>
                <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
