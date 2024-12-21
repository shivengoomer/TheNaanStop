import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // CSS for styling
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import myLogo from "./images/logo_naanstop.png";
import { useState} from 'react';
import homeDisplayimage from "./images/home-cover.png";
const dish=
  [
    {
      "dishName": "Chicken Alfredo Pasta",
      "imageUr": "https://dinnerthendessert.com/wp-content/uploads/2021/05/Chicken-Alfredo-Pasta-4x3-1.jpg",
      "categorie": "Non-Veg",
      "ingredients": [
        "Chicken breast",
        "Fettuccine pasta",
        "Cream",
        "Butter",
        "Garlic",
        "Parmesan cheese",
        "Parsley"
      ],
      "cookingTime": 30,
      "instructions": "Cook pasta until al dente. Sauté chicken and garlic in butter, add cream and cheese. Toss pasta in sauce and garnish with parsley.",
      "servings": 4,
      "difficulty": "Medium",
      "author": "Chef Mario"
    },
    {
      "dishName": "Vegetable Stir Fry",
      "imageUr": "https://images.themodernproper.com/billowy-turkey/production/posts/VegetableStirFry_9.jpg?w=1200&q=82&auto=format&fit=crop&dm=1703377301&s=27a8577bc7f666190301a03fdf06584c",
      "categorie": "Veg",
      "ingredients": [
        "Broccoli",
        "Carrots",
        "Bell peppers",
        "Soy sauce",
        "Garlic",
        "Ginger",
        "Cornstarch"
      ],
      "cookingTime": 20,
      "instructions": "Stir-fry vegetables in garlic and ginger, add soy sauce and cornstarch slurry. Cook until sauce thickens.",
      "servings": 3,
      "difficulty": "Easy",
      "author": "Chef Mei"
    },
    {
      "dishName": "Classic Margherita Pizza",
      "imageUr": "https://5.imimg.com/data5/FS/WU/MY-3519571/chicken-margherita-m10-500x500.png",
      "categorie": "Veg",
      "ingredients": [
        "Pizza dough",
        "Tomato sauce",
        "Mozzarella cheese",
        "Basil leaves",
        "Olive oil",
        "Salt"
      ],
      "cookingTime": 25,
      "instructions": "Spread tomato sauce over pizza dough, top with mozzarella and basil. Bake at 220°C until crust is golden.",
      "servings": 2,
      "difficulty": "Medium",
      "author": "Chef Gina"
    },
    {
      "dishName": "Egg Benedict",
      "imageUr": "https://www.allrecipes.com/thmb/eJzkN3OxGGhkDHCU0puFRtyBmls=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/17205-eggs-benedict-DDMFS-4x3-a0042d5ae1da485fac3f468654187db0.jpg",
      "categorie": "Eggetarian",
      "ingredients": [
        "Eggs",
        "English muffins",
        "Canadian bacon",
        "Butter",
        "Lemon juice",
        "Salt",
        "Paprika"
      ],
      "cookingTime": 25,
      "instructions": "Poach eggs. Toast muffins, top with bacon and poached eggs. Drizzle hollandaise sauce and garnish with paprika.",
      "servings": 2,
      "difficulty": "Hard",
      "author": "Chef Sophia"
    }
]


const RecipeDisplay = () => {
  return (
    <section className="display-recipes">
      <div className="container">
        {dish.map((recipe, index) => (
          <Link
            key={index}
            to={{
              pathname: '/recipes',
              state: { selectedRecipe: recipe },
            }}
            className="dish-card"
          >
            <div className="img-container">
              <img
                src={recipe.imageUr}
                alt={recipe.dishName}
              />
            </div>
            <p>{recipe.dishName}</p>
            <p>By {recipe.author}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};
const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogout = () => {
    setIsLoggedIn(false); // Logout logic
  };

  return (
    <div className="homepage">
      {/* Sidebar Section */}
      <header className="header">
  <div className="header-logo">
    <img className="logo" src={myLogo} alt="Logo" />
    <h1>TheNaanStop! 🍽️</h1>
  </div>
  <nav className="navbar">
    <ul className="navbar-list">
      <li className="nav-item">
        <Link to="/" className="nav-link">Home</Link>
      </li>
      <li className="nav-item">
        <Link to="/create-recipe" className="nav-link">Create Recipe</Link>
      </li>
      <li className="nav-item">
        <Link to="/recipes" className="nav-link explore-recipes">Explore Recipes</Link>
      </li>
      {isLoggedIn ? (
        <>
          <li className="nav-item">
            <Link to="/my-recipes" className="nav-link">My Recipes</Link>
          </li>
          <li className="nav-item">
            <Link to="/saved-recipes" className="nav-link">Saved Recipes</Link>
          </li>
          <li className="nav-item">
            <button onClick={handleLogout} className="nav-link">Logout</button>
          </li>
        </>
      ) : (
        <li className="nav-item">
          <Link to="/users" className="nav-link">Login/Register</Link>
        </li>
      )}
    </ul>
  </nav>
</header>

      {/* Main Content Section */}
      <main>
        <section className='dish-and-info'>
          <div className='info'>
              <h2>Stop Searching, <br/>Start Cooking!</h2>
              <h3>Your all-in-one recipe hub, <br/>from quick bites to gourmet delights.🍴</h3>
            </div>
            <div className='img-cont'>
              <img  src={homeDisplayimage} alt='home-img'></img>
            </div>
            
        </section>
        {/* Discover, Cook, and Enjoy Section */}
      <RecipeDisplay />
        <section className="discover">
          <div className="discover-text">
            <h2>Discover, Cook, and Enjoy!</h2>
            <ul className="discover-list">
              <li>📖 <strong>Explore Recipes:</strong> Dive into a world of flavors with our diverse recipe collection, curated for every craving and dietary need.</li>
              <li>🍳 <strong>Add Your Own Creations:</strong> Share your favorite recipes with our community. Upload ingredients, instructions, and even video tutorials!</li>
              <li>🎥 <strong>Watch Tutorials:</strong> Follow easy step-by-step video guides to cook delicious meals right from your kitchen.</li>
            </ul>
            <Link to="/recipes" className="explore-button">Explore Recipes</Link>
          </div>
          <div className="discover-animation">
            <DotLottieReact
              src="https://lottie.host/8e129365-05ca-4abc-ae24-9317756aeecc/4LC2vo7yYK.json"
              loop
              autoplay
              className="animation-one"
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Homepage;
