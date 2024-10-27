import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css';
import Layout from '../Layout';
import { Button } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const databaseUrl = '/users/';
  const [editingUser, setEditingUser] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [editUsername, setUsername] = useState('');
  const [editPassword, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

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

  const saveUserEdits = async () => {
    if (!editingUser) return;
    try {
      const updatedUser = await axios.put(`${databaseUrl}edit`, {
        userID: editingUser.userID,
        username: editUsername,
        password: editPassword,
      });
      window.location.reload();
      setSuccessMessage("Updated User Successfully");
      closeForm(); // Close form after saving
      setTimeout(() => setSuccessMessage(null),3000);
    } catch (error) {
      console.log(error);
    }
  };

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
        setSuccessMessage("Updated User Successfully");
        closeForm(); // Close form after saving
        setTimeout(() => setSuccessMessage(null),3000);
      } else {
        console.error(`Failed to delete user: ${userId}`);
      }
    } catch (error) {
      console.error('There was an error deleting the user.');
    }
  };

  const closeForm = () => {
    setShowPopup(false);
    setEditingUser(null);
    setUsername('');
    setPassword('');
  };

  const renderContent = () => {
    if (loading) return <p>Loading Users...</p>;
    if (error) return <p>{error}</p>;
    return users.map((user) => (
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
        <div className="item-list">
          {renderContent()}
        </div>

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
                type="text"
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
      </Layout>
    </div>
  );
}

export default Admin;
