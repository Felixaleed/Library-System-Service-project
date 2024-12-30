import React, { useState, useEffect } from "react";
import "./CartPage.css";
import winterBookCover from "../assets/abstract-elegant-winter-book-cover_23-2148798745.avif";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  // Update cart in localStorage
  const updateCartInLocalStorage = (updatedCart) => {
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  useEffect(() => {
    loadCartFromLocalStorage();
  }, []);

  // Handle updating the return date
  const handleUpdateReturnDate = (index, newReturnDate) => {
    const updatedCart = [...cart];
    updatedCart[index].returnDate = newReturnDate; // Update return date
    updateCartInLocalStorage(updatedCart);
  };

  return (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-items">
          {cart.map((book, index) => (
            <div className="cart-item" key={index}>
              <img
                src={book.image || winterBookCover}
                alt={book.title}
                className="cart-item-image"
              />
              <div className="cart-item-details">
                <h4>{book.title}</h4>
                <p>Author: {book.author}</p>
                <p>Price: ${book.price}</p>
                <div>
                  <label htmlFor={`return-date-${index}`}>Return Date:</label>
                  <input
                    type="date"
                    id={`return-date-${index}`}
                    value={
                      book.returnDate
                        ? new Date(book.returnDate).toISOString().substr(0, 10)
                        : ""
                    }
                    onChange={(e) =>
                      handleUpdateReturnDate(index, e.target.value)
                    }
                  />
                </div>
              </div>
              <button
                className="remove-cart-item"
                onClick={() => {
                  const updatedCart = cart.filter((_, i) => i !== index);
                  updateCartInLocalStorage(updatedCart);
                }}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CartPage;
