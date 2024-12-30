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
<<<<<<< HEAD
    avatar: null, // To store the selected file
  });
=======
    avatar: null,
  });

  const [selectedUserId, setSelectedUserId] = useState(""); // For the dropdown
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
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

<<<<<<< HEAD
  // Handle Edit
  const handleEdit = (userId) => {
    const selectedUser = users.find((user) => user._id === userId);
=======
  // Handle dropdown change
  const handleDropdownChange = (userId) => {
    setSelectedUserId(userId);
    const selectedUser = users.find((user) => user._id === userId); // Use _id here
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
    if (selectedUser) {
      setForm({
        email: selectedUser.email,
        username: selectedUser.username,
        gender: selectedUser.gender,
        role: selectedUser.role,
<<<<<<< HEAD
        avatar: null, // Reset avatar input when editing
=======
        avatar: null,
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
      });
      setEditingId(userId);
    }
  };
<<<<<<< HEAD

  // Handle Delete
=======
  
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
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3004/profile/${userId}`);
        alert("User deleted successfully!");
        fetchUsers(); // Refresh the list
<<<<<<< HEAD
=======
        setForm({
          email: "",
          username: "",
          gender: "",
          role: "",
          avatar: null,
        });
        setSelectedUserId("");
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete the user.");
      }
    }
  };

<<<<<<< HEAD
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
  

=======
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="user-profile-page">
<<<<<<< HEAD
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
=======
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
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
            <input
              type="file"
              onChange={(e) => setForm({ ...form, avatar: e.target.files[0] })}
            />
          </div>
<<<<<<< HEAD
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
=======
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
>>>>>>> e48e89e35f9eb2636b1bcbe04f5b733ffa2df0ec
    </div>
  );
};

export default UserProfile;
