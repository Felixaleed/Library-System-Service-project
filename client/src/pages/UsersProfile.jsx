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
    avatar: null,
  });

  const [selectedUserId, setSelectedUserId] = useState(""); // For the dropdown
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

  // Handle dropdown change
  const handleDropdownChange = (userId) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user._id === userId); // Use _id here
    if (selectedUser) {
      setForm({
        email: selectedUser.email,
        username: selectedUser.username,
        gender: selectedUser.gender,
        role: selectedUser.role,
        avatar: null,
      });
      setEditingId(userId);
    }
  };
  
  // Add or update a user
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        id: editingId || Math.random().toString(36).substr(2, 9), // Generate a random id if editingId is not set
        email: form.email.trim(),
        username: form.username.trim(),
        gender: form.gender.trim(),
        role: form.role.trim(),
      };
  
      if (editingId) {
        // Update user
        await axios.put(`http://localhost:3004/profile/${editingId}`, payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("User updated successfully!");
      } else {
        // Add new user
        await axios.post("http://localhost:3004/profile", payload, {
          headers: { "Content-Type": "application/json" },
        });
        alert("User added successfully!");
      }
  
      // Reset form and refresh user list
      setForm({
        email: "",
        username: "",
        gender: "",
        role: "",
        avatar: null,
      });
      setEditingId(null);
      fetchUsers();
    } catch (error) {
      console.error("Error saving user:", error.response?.data || error.message);
      alert("Failed to save the user. Please check the form data and try again.");
    }
  };
  

  // Delete a user
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3004/profile/${userId}`);
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the list
        setForm({
          email: "",
          username: "",
          gender: "",
          role: "",
          avatar: null,
        });
        setSelectedUserId("");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete the user.");
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <h1>Manage User Profiles</h1>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="avatar-section">
            {form.avatar ? (
              <img
                src={`http://localhost:3004/${form.avatar}`}
                alt="Avatar"
                className="avatar"
              />
            ) : (
              <div className="placeholder-avatar">Avatar</div>
            )}
            <input
              type="file"
              onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
            />
          </div>
          <button className="update-profile-btn" onClick={handleSubmit}>
            {editingId ? "Update Profile" : "Save Profile"}
          </button>
        </div>

        <div className="profile-form">
          <form>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="Email"
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                placeholder="Username"
              />
            </div>
            <div className="form-group">
              <label>Gender</label>
              <select
                value={form.gender}
                onChange={(e) => setForm({ ...form, gender: e.target.value })}
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
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                placeholder="Role"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="dropdown-section">
        <h2>Show All Users</h2>
        <select
          className="user-dropdown"
          value={selectedUserId}
          onChange={(e) => handleDropdownChange(e.target.value)}
        >
          <option value="">Select a User</option>
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username} ({user.email})
            </option>
          ))}
        </select>
        {selectedUserId && (
          <button
            className="delete-btn"
            onClick={() => handleDelete(selectedUserId)}
          >
            Delete User
          </button>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
