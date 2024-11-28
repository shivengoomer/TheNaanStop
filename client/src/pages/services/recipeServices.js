import axios from 'axios';

const API_URL = 'https://thenaanstop.onrender.com/recipes'; // Adjust based on your server

// Get all recipes
export const getRecipes = async () => {
  const response = await axios.get(API_URL);
  return response.data; // Return the data

  
};

// Get a recipe by ID
export const getRecipeById = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data; // Return the data
};

// Create a new recipe
export const createRecipe = async (recipeData) => {
  const response = await axios.post(API_URL, recipeData);
  return response.data; // Return the created recipe
};

// Update a recipe
export const updateRecipe = async (id, recipeData) => {
  const response = await axios.put(`${API_URL}/${id}`, recipeData);
  return response.data; // Return the updated recipe
};

// Delete a recipe
export const deleteRecipe = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data; // Return the deletion message
};
