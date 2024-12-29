import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate hook from react-router-dom
import "./AdminPage.css"; // Ensure to create a CSS file for styling

const AdminPage = () => {
  const navigate = useNavigate(); // Hook to handle navigation

  // Function to navigate to CRUD page
  const goToCrudPage = () => {
    navigate("/manage-books"); 
  };

  return (
    <div className="admin-page">
      <header className="admin-header">
        <h1>Admin Dashboard</h1>
      </header>

      <div className="admin-sections">
        {/* Manage Books Section */}
        <section className="manage-section">
          <h2>Books Section</h2>
          <p>Here you can add, update, and delete books.</p>
          <button className="action-button" onClick={goToCrudPage}>Manage Books</button>
        </section>

        {/* Manage Users Section */}
        <section className="manage-section">
          <h2>Users Section</h2>
          <p>Here you can view and manage registered users.</p>
          <button className="action-button" onClick={goToCrudPage}>Add User</button>
          <button className="action-button" onClick={goToCrudPage}>Manage Users</button>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
