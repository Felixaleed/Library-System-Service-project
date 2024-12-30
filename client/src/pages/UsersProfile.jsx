import React, { useState, useEffect } from "react";
import axios from "axios";
import "./UsersProfile.css";

const UserProfile = () => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({
    email: "",
    username: "",
    gender: "",
    role: "",
    avatar: null, // To store the selected file
  });
  const [editingId, setEditingId] = useState(null);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3004/profile");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // Handle Edit
  const handleEdit = (userId) => {
    const selectedUser = users.find((user) => user._id === userId);
    if (selectedUser) {
      setForm({
        email: selectedUser.email,
        username: selectedUser.username,
        gender: selectedUser.gender,
        role: selectedUser.role,
        avatar: null, // Reset avatar input when editing
      });
      setEditingId(userId);
    }
  };

  // Handle Delete
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3004/profile/${userId}`);
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the list
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete the user.");
      }
    }
  };

  // Add or Update User
  // Add or Update User
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        email: form.email.trim().toLowerCase(),
        username: form.username.trim().toLowerCase(),
        gender: form.gender.trim(),
        role: form.role.trim(),
      };
  
      if (editingId) {
        await axios.put(`http://localhost:3004/profile/${editingId}`, payload);
        alert("User updated successfully!");
      } else {
        await axios.post("http://localhost:3004/profile", payload);
        alert("User added successfully!");
      }
  
      setForm({ email: "", username: "", gender: "", role: "" });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to save the user.");
    }
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-profile-page">
      <h1>CRUD (Create, Read, Update, Delete)</h1>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              required
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Role</label>
            <input
              type="text"
              placeholder="Enter role"
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              required
            />
          </div>
          <div className="form-group">
            <label>Avatar</label>
            <input
              type="file"
              onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
            />
          </div>
          <button className="submit-btn" type="submit">
            {editingId ? "Update User" : "Add User"}
          </button>
        </form>
      </div>

      <table className="users-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Role</th>
            <th>Avatar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.gender}</td>
              <td>{user.role}</td>
              <td>
                {user.avatar && (
                  <img
                    src={`http://localhost:3004/uploads/${user.avatar}`}
                    alt="Avatar"
                    width="50"
                  />
                )}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(user._id)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
