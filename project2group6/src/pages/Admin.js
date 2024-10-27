//Imports for the Admin page
import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import '../css/admin.css';
import Layout from '../Layout';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  //Constants for declaring users and editing users
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const databaseUrl = '/users/';
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setUsername] = useState('');
  const [editPassword, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const bottomReference = useRef(null);
  const [showPopup, setShowPopup] = useState(false);

  // New states for Add User mode
  const [addMode, setAddMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  //Fetch the users from the databases
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${databaseUrl}all`);
        setUsers(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to fetch users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  //Handles the edit User
  const editUsers = async (userId) => {
    if (editingUser?.userID === userId) return;
    try {
      const response = await axios.get(`${databaseUrl}info/${userId}`);
      setEditingUser(response.data);
      setUsername(response.data.username);
      setPassword(response.data.password);
      setShowPopup(true); // Show form in page
    } catch (error) {
      console.log(error);
    }
  };

  //Sends the edited user to the database
  const saveUserEdits = async () => {
    if (!editingUser) return;
    try {
      const response = await axios.put(`${databaseUrl}edit`, {
        userID: editingUser.userID,
        username: editUsername,
        password: editPassword,
      });

      // Update the user in the list without reloading the page
     setUsers(users.map(user => user.userID === editingUser.userID ? response.data : user));
      setSuccessMessage("User updated successfully");
      closeForm(); // Close form after saving
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.log(error);
    }
  };

  //Deletes the user
  const deleteUsers = async (userId) => {
    try {
      const response = await fetch(`${databaseUrl}delete`, {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userID: userId })
      });
      if (response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userId));
        setSuccessMessage("User deleted successfully");
        setTimeout(() => setSuccessMessage(''), 3000);
      } else {
        console.error(`Failed to delete user: ${userId}`);
      }
    } catch (error) {
      console.error('There was an error deleting the user.');
    }
  };

    //Implementing a Button to go to the bottom of the Page
    const ScrollToBottom = () => {
      bottomReference.current?.scrollIntoView({ behavior: 'smooth' });
    };

  // Toggle Add User mode
  const handleAddUserClick = () => {
    setAddMode(!addMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newUsername') setNewUsername(value);
    if (name === 'newPassword') setNewPassword(value);
  };

  const addUser = async () => {
    try {
      const response = await axios.post(`${databaseUrl}add`, {
        username: newUsername,
        password: newPassword
      });
      if (response.status === 200) {
        setUsers([...users, response.data]);
        setNewUsername('');
        setNewPassword('');
        setAddMode(false); // exit Add User mode after adding a user
      }
    } catch (error) {
      console.error('Error adding user:', error);
    }
  };

  const closeForm = () => {
    setShowPopup(false);
    setEditingUser(null);
    setUsername('');
    setPassword('');
  };

  //Provides the list of users from the database
  const renderContent = () => {
    if (loading) return <p>Loading Users...</p>;
    if (error) return <p>{error}</p>;
  
    const filteredUsers = users.filter(user => 
      user.username && user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
  
    if (filteredUsers.length === 0) {
      return <p>No users found</p>;
    }
  
    return filteredUsers.map((user) => (
      <div key={user.userID} className="item">
        <span>{user.username}</span>
        <div className="button-container">
          <button onClick={() => editUsers(user.userID)}>Edit</button>
          <button onClick={() => deleteUsers(user.userID)}>Delete</button>
        </div>
      </div>
    ));
  };

  return (
    <div className="container">
      <Layout>
        <h1>All Users</h1>
        {/* Implementing a search bar */}
        <div className="container mb-3">
        <input
          type ="text"
          placeholder = "Search for a User"
          value={searchQuery}
          onChange= {(e) => setSearchQuery(e.target.value)}
          className="form-control mb-3" />
          <button onClick={ScrollToBottom} className="btn btn-primary">Scroll to Bottom</button>
          </div>

        {/* Toggle between Add User form and button */}
        {addMode ? (
          <div className="addUserForm">
            <h2>Add New User</h2>
            <div className="formField">
              <label>Username:</label>
              <input 
                type="text" 
                name="newUsername"
                className="form-control" 
                value={newUsername} 
                onChange={handleChange} 
                placeholder="Enter Username" 
              />
            </div>
            <div className="formField">
              <label>Password:</label>
              <input 
                type="password" 
                name="newPassword"
                className="form-control" 
                value={newPassword} 
                onChange={handleChange} 
                placeholder="Enter Password" 
              />
            </div>
            <button onClick={addUser} className="btn btn-success">Save User</button>
            <button onClick={handleAddUserClick} className="btn btn-secondary">Cancel</button>
          </div>
        ) : (
          <button onClick={handleAddUserClick} className="btn btn-primary">Add User</button>
        )}

        {/* Users List */}
        <div className="item-list">
          {renderContent()}
        </div>
        <div ref= {bottomReference}></div>
        {showPopup && (
          <div className="edit-form">
            <h2>Edit User</h2>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={editUsername}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter Username"
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={editPassword}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
              />
            </div>
            <div className="button-group">
              <Button variant="primary" onClick={saveUserEdits}>
                Save
              </Button>
              <Button variant="secondary" onClick={closeForm}>
                Cancel
              </Button>
            </div>
          </div>
        )}

        {successMessage && <p className="success-message">{successMessage}</p>}
      </Layout>
    </div>
  );
}

export default Admin;
