<<<<<<< HEAD
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavigationTabs.css";
=======
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavigationTabs.css';
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec

const NavigationTabs = () => {
  const [showCategories, setShowCategories] = useState(false);
  const navigate = useNavigate();

  // Check if the user is logged in by looking for a token in localStorage
  const isLoggedIn = localStorage.getItem("access_token");

  // Toggle Categories dropdown visibility
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleSignOut = () => {
    // Clear the token from localStorage and redirect to login page
    localStorage.removeItem("access_token");
    navigate("/login");
  };

<<<<<<< HEAD
  const navigateToCart = () => {
    navigate("/cart"); // Navigate to the Cart page
  };

=======
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
  return (
    <div className="navigation-tabs">
      <a href="#popular">Popular</a>
      <a href="#ebooks">eBooks</a>
      <a href="#new">New Arrivals</a>

      {/* Categories Button */}
      <div className="categories">
        <button onClick={toggleCategories} className="categories-button">
          Categories
        </button>
        {showCategories && (
          <div className="categories-dropdown">
            <a href="#fiction">Fiction</a>
            <a href="#nonfiction">Non-Fiction</a>
            <a href="#fantasy">Fantasy</a>
            <a href="#romance">Romance</a>
            <a href="#mystery">Mystery</a>
          </div>
        )}
      </div>

      {/* Cart Button */}
<<<<<<< HEAD
      <button className="cart-button" onClick={navigateToCart}>
        🛒 Cart
      </button>
=======
      <button className="cart-button">🛒 Cart</button>
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec

      {/* Conditional Rendering of Sign In / Sign Out */}
      {isLoggedIn ? (
        <button className="sign-in-button" onClick={handleSignOut}>
          Sign Out
        </button>
      ) : (
        <Link to="/signup">
          <button className="sign-in-button">Sign In</button>
        </Link>
      )}
    </div>
  );
};

export default NavigationTabs;
