import React from "react";
import "./BookCard.css";

const BookCard = ({ title, image, author }) => {
  return (
    <div className="book-card">
      <img src={image} alt={title} className="book-image" />
      <h4 className="book-title">{title}</h4>
      <p className="book-author">{author}</p>
    </div>
  );
};

export default BookCard;
