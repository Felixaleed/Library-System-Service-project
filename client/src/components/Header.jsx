import React from "react";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">📚 My Library</div>
      <input
        type="text"
        placeholder="Search for books..."
        className="search-bar"
      />
    </header>
  );
};

export default Header;
