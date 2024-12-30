import React from "react";
import "./Section.css";
import winterBookCover from "../assets/abstract-elegant-winter-book-cover_23-2148798745.avif"; // Import the default image

const Section = ({ title, books, onAddToCart }) => {
  return (
    <div className="section">
      <h2>{title}</h2>
      <div className="book-list">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img
              src={book.picture || winterBookCover} // Use default image if `book.picture` is missing
              alt={book.title}
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop
                e.target.src = winterBookCover; // Fallback to default image
              }}
            />
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>Price: ${book.price}</p>
            <button onClick={() => onAddToCart(book)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
