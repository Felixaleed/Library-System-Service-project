import React from "react";
import BookCard from "./BookCard";
import "./Section.css";

const Section = ({ title, books }) => {
  return (
    <div className="section">
      <div className="section-header">
        <h2 className="section-title">{title}</h2>
        <button className="view-all-button">View All</button>
      </div>
      <div className="book-list">
        {books.map((book) => (
          <BookCard
            key={book.id}
            title={book.title}
            image={book.image}
            author={book.author}
          />
        ))}
      </div>
    </div>
  );
};

export default Section;
