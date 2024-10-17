import React from 'react';
import { Link } from 'react-router-dom';
import './homepage.css'; // CSS for styling

const Homepage = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false); // Manage login state

  const handleLogout = () => {
    // Logout logic
    setIsLoggedIn(false);
  };

  return (
    <div className="homepage">
      <nav style={navStyle}>
        <ul style={ulStyle}>
          <li style={liStyle}>
            <Link to="/" style={linkStyle}>Home</Link>
          </li>
          <li style={liStyle}>
            <Link to="/recipes" style={linkStyle}>Recipes</Link>
          </li>
          <li style={liStyle}>
            <Link to="/create-recipe" style={linkStyle}>Create Recipe</Link>
          </li>
          {isLoggedIn ? (
            <>
              <li style={liStyle}>
                <Link to="/my-recipes" style={linkStyle}>My Recipes</Link>
              </li>
              <li style={liStyle}>
                <Link to="/saved-recipes" style={linkStyle}>Saved Recipes</Link>
              </li>
              <li style={liStyle}>
                <button onClick={handleLogout} style={buttonStyle}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li style={liStyle}>
                <Link to="/users" style={linkStyle}>Login</Link>
              </li>
              <li style={liStyle}>
                <Link to="/users" style={linkStyle}>Register</Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <header className="homepage-header">
        <h1>Welcome to The Naan Stop!</h1>
        <p>Your go-to place for delicious recipes.</p>
      </header>
      <main>
        <section className="intro">
          <h2>Explore Our Recipes</h2>
          <p>Discover a variety of recipes from around the world.</p>
          <Link to="/recipes" className="button">View Recipes</Link>
        </section>
        <section className="features">
          <h2>Features</h2>
          <ul>
            <li>Easy-to-follow recipes</li>
            <li>Personalized meal recommendations</li>
            <li>User-friendly interface</li>
          </ul>
        </section>
      </main>
      <footer className="homepage-footer">
        <p>&copy; {new Date().getFullYear()} The Naan Stop. All rights reserved.</p>
      </footer>
    </div>
  );
};
const navStyle = {
  backgroundColor: '#4CAF50', // Green background
  padding: '10px 20px', // Padding for the nav
  borderRadius: '5px', // Rounded corners
};

const ulStyle = {
  listStyleType: 'none', // Remove bullet points
  margin: 0, // Remove default margin
  padding: 0, // Remove default padding
  display: 'flex', // Flexbox for horizontal alignment
  justifyContent: 'space-between', // Space between links
};

const liStyle = {
  margin: '0 15px', // Margin between list items
};

const linkStyle = {
 
  textDecoration: 'none', // Remove underline from links
  fontSize: '16px', // Font size for links
};

const buttonStyle = {
  backgroundColor: '#f44336', // Red background for the button
  
  border: 'none', // Remove default border
  padding: '10px 20px', // Padding for the button
  borderRadius: '5px', // Rounded corners
  cursor: 'pointer', // Cursor change on hover
  fontSize: '16px', // Font size for button
};

// Add hover effect for the button
const buttonHoverStyle = {
  backgroundColor: '#d32f2f', // Darker red on hover
};

// Example usage with an inline style in your button
<button
  
  style={buttonStyle}
  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = buttonHoverStyle.backgroundColor)}
  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = buttonStyle.backgroundColor)}
>
  Logout
</button>


export default Homepage;
