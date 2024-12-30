import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../components/Header";
import NavigationTabs from "../components/NavigationTabs";
import Section from "../components/Section";
import "./HomePage.css";
import winterBookCover from "../assets/abstract-elegant-winter-book-cover_23-2148798745.avif";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [borrowDays, setBorrowDays] = useState({}); // Store borrow days for each book

  // Fetch books data from API
  const fetchBooks = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3002/books");
      const booksWithImages = response.data.map((book) => ({
        ...book,
        image: book.image || winterBookCover,
      }));
      setBooks(booksWithImages);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  // Save cart to localStorage
  const saveCartToLocalStorage = (cartData) => {
    localStorage.setItem("cart", JSON.stringify(cartData));
  };

  // Load cart from localStorage
  const loadCartFromLocalStorage = () => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  };

  // Handle borrow days change
  const handleBorrowDaysChange = (bookId, days) => {
    setBorrowDays((prev) => ({ ...prev, [bookId]: parseInt(days) }));
  };

  // Add to Cart and Handle Borrowing
  const addToCart = async (book) => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      alert("You must be logged in to borrow books.");
      return;
    }

    const days = borrowDays[book._id] || 1; // Default to 1 day if not selected
    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + days);

    try {
      const response = await axios.post(
        "http://localhost:3006/borrow",
        {
          bookId: book._id,
          userId: "user-id-placeholder", // Replace with the logged-in user's ID
          returnDate: returnDate.toISOString(),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 201) {
        alert(`Successfully borrowed "${book.title}" for ${days} days.`);
        const updatedCart = [...cart, { ...book, returnDate }];
        setCart(updatedCart);
        saveCartToLocalStorage(updatedCart);
      }
    } catch (error) {
      console.error("Error adding borrow:", error);
      alert("Failed to borrow the book. Please try again.");
    }
  };

  useEffect(() => {
    loadCartFromLocalStorage();
    fetchBooks();
  }, []);

  if (loading) {
    return <div>Loading books...</div>;
  }

  return (
    <div className="homepage-container">
      <Header />
      <NavigationTabs />
      <div className="sections">
        <h2>All Books</h2>
        <div className="book-list">
          {books.map((book) => (
            <div key={book._id} className="book-card">
              <img src={book.image} alt={book.title} />
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>Price: ${book.price}</p>
              <div className="borrow-days">
                <label htmlFor={`borrow-days-${book._id}`}>Borrow Days:</label>
                <input
                  type="number"
                  id={`borrow-days-${book._id}`}
                  min="1"
                  value={borrowDays[book._id] || ""}
                  onChange={(e) =>
                    handleBorrowDaysChange(book._id, e.target.value)
                  }
                />
              </div>
              <button onClick={() => addToCart(book)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
     
      
    </div>
  );
};

export default HomePage;
