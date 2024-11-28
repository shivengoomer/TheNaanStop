import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/homepage';
import Recipes from './pages/recipes';
import User from './pages/users';
import CreateRecipe from './pages/ createRecipe';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path='/recipes' element={<Recipes />} />
        
        <Route path='/users' element={<User />} />
        <Route path='/create-recipe' element={<CreateRecipe /> } />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
