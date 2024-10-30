import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // CSS for styling
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useEffect, useState } from 'react';
const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Manage login state
  const [isTextVisible, setTextVisible] = useState(false); // State to control text visibility

  useEffect(() => {
    // Set the text to visible after the component mounts
    const timer = setTimeout(() => {
      setTextVisible(true);
    }, 1000); // Delay of 1 second before showing the text

    return () => clearTimeout(timer); // Cleanup timer on unmount
  }, []);
  const handleLogout = () => {
    // Logout logic
    setIsLoggedIn(false);
  };

  return (
    <div className="homepage">
      <header className="homepage-header">
        <div className="left-section">
          <h1>Welcome to TheNaanStop! 🍽️</h1>
        </div>
        <div className="right-section">
          {/* Navigation Bar */}
          <nav className="navbar">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/create-recipe" className="nav-link">Create Recipe</Link>
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
                    <button onClick={handleLogout} className="nav-button">Logout</button>
                  </li>
                </>
              ) : (
                <li className="nav-item">
                  <Link to="/users" className="nav-link">Login/Register</Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>

      {/* Welcome Text and CTA Button */}
      <div className="welcome-text">
  <div className='left-section-opening'>
    <DotLottieReact
      src="https://lottie.host/8e129365-05ca-4abc-ae24-9317756aeecc/4LC2vo7yYK.json"
      loop
      autoplay
      className='animation-one'
    />
  </div>
  <div className="right-section-opening">
  <p className={`unfold-text ${isTextVisible ? 'visible' : ''}`}>
            Your one-stop destination for exploring, cooking, and sharing mouth-watering recipes. Whether you're a seasoned chef or a beginner, we've got everything you need to satisfy your cravings.
          </p>
  <Link to="/recipes" className="cta-button">Explore Recipes</Link>
</div>

</div>


      {/* Main Content */}
      <main>
        {/* Discover, Cook, and Enjoy Section */}
        <section className="discover">
          <div className='discover-text'>
            <h2>Discover, Cook, and Enjoy!</h2>
            <ul className="discover-list">
              <li>📖 <strong>Explore Recipes:</strong> Dive into a world of flavors with our diverse recipe collection, curated for every craving and dietary need.</li>
              <li>🍳 <strong>Add Your Own Creations:</strong> Share your favorite recipes with our community. Upload ingredients, instructions, and even video tutorials!</li>
              <li>🎥 <strong>Watch Tutorials:</strong> Follow easy step-by-step video guides to cook delicious meals right from your kitchen.</li>
            </ul>
          </div>
          <div className='discover-animation'>
            <DotLottieReact
              src="https://lottie.host/75493321-9f53-4fc3-9d3c-cac4eb180d95/ZIGZYaZ89v.json"
              loop
              autoplay
              className='animation-two'
            />
          </div>
        </section>

        {/* Why TheNaanStop Section */}
        <section className="why">
          <h2>Why TheNaanStop?</h2>
          <ul className="why-list">
            <li>🌟 <strong>All-in-One Solution:</strong> Search, cook, and learn—all from one place!</li>
            <li>🌟 <strong>Personalized Experience:</strong> Save your favorites, rate recipes, and get personalized recommendations based on your taste!</li>
          </ul>
        </section>
      </main>

      <footer className="homepage-footer">
        <p>© 2024 TheNaanStop. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Homepage;
