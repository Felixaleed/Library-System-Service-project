import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CRUDPage.css";

const CRUDPage = () => {
  const [books, setBooks] = useState([]);
  const [form, setForm] = useState({
    id: "",
    title: "",
    author: "",
    publishYear: "",
    price: "",
    description: "",
    picture: null,
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://localhost:3002/books");
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Add or update a book
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: form.id.trim(),
        title: form.title.trim(),
        author: form.author.trim(),
        publishYear: Number(form.publishYear),
        price: Number(form.price),
        description: form.description.trim(),
      };

      if (editingId) {
        // Update book
        await axios.put(`http://localhost:3002/books/${editingId}`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Book updated successfully!");
      } else {
        // Add new book
        await axios.post("http://localhost:3002/books", payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("Book added successfully!");
      }

      // Reset form and refresh book list
      setForm({
        id: "",
        title: "",
        author: "",
        publishYear: "",
        price: "",
        description: "",
        picture: null,
      });
      setEditingId(null);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error.response?.data || error.message);
      alert("Failed to save the book. Please check the form data and try again.");
    }
  };

  // Delete a book
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this book?")) {
        await axios.delete(`http://localhost:3002/books/${id}`);
        alert("Book deleted successfully!");
        fetchBooks();
      }
    } catch (error) {
      console.error("Error deleting book:", error.response?.data || error.message);
      alert("Failed to delete the book.");
    }
  };

  // Set form data for editing
  const handleEdit = (book) => {
    setForm({
      id: book.id || book._id,
      title: book.title,
      author: book.author,
      publishYear: book.publishYear?.toString(),
      price: book.price?.toString(),
      description: book.description,
      picture: null,
    });
    setEditingId(book._id);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="crud-page">
      <h1>Manage Books</h1>

      {/* Book Form */}
      <form onSubmit={handleSubmit} className="crud-form">
        <input
          type="text"
          placeholder="ID"
          value={form.id}
          onChange={(e) => setForm({ ...form, id: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={form.author}
          onChange={(e) => setForm({ ...form, author: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Publish Year"
          value={form.publishYear}
          onChange={(e) => setForm({ ...form, publishYear: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setForm({ ...form, picture: e.target.files[0] })
          }
        />
        <button type="submit">
          {editingId ? "Update Book" : "Add Book"}
        </button>
      </form>

      {/* Book List */}
      <div className="crud-list">
        <h2>All Books</h2>
        {books.map((book) => (
          <div key={book._id} className="crud-item">
            <p>
              <strong>{book.title}</strong> by {book.author}
            </p>
            <p>
              <strong>Year:</strong> {book.publishYear}
            </p>
            <p>
              <strong>Price:</strong> ${book.price}
            </p>
            <p>{book.description}</p>
            {book.picture && (
              <img
                src={`http://localhost:3002/${book.picture}`}
                alt={book.title}
                width="100"
              />
            )}
            <div>
              <button onClick={() => handleEdit(book)}>Update</button>
              <button onClick={() => handleDelete(book._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CRUDPage;
