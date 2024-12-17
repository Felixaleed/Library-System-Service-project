import React, { useState } from 'react';
import { Link } from 'react-router-dom';  // Import Link component
import './NavigationTabs.css';

const NavigationTabs = () => {
  const [showCategories, setShowCategories] = useState(false);

  // Toggle Categories dropdown visibility
  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

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
      <button className="cart-button">
        🛒 Cart
      </button>

      {/* Sign In Button */}
      <Link to="/signup"> {/* Wrap with Link component */}
        <button className="sign-in-button">Sign In</button>
      </Link>
    </div>
  );
};

export default NavigationTabs;
