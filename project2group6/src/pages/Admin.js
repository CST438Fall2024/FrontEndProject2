import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css'; // uses the same style as List
import Layout from '../Layout';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const databaseUrl = '/users/';
  const [editingUser, setEditingUser] = useState(null);
  const [editUsername, setUsername] = useState('');
  const [editPassword, setPassword] = useState('');

  // New states for Add User mode
  const [addMode, setAddMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

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
    try {
      if (!editingUser) {
        const response = await axios.get(`${databaseUrl}info/${userId}`);
        setEditingUser(response.data);
        setUsername(response.data.username);
        setPassword(response.data.password);
      } else {
        const updateUser = await fetch(`${databaseUrl}edit`, {
          method: "PUT",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userID: userId, username: editUsername, password: editPassword })
        });
        setUsers(users.map(user => user.id === updateUser.id ? { ...user, ...updateUser } : user));
        setEditingUser(null);
      }
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
      if(response.ok) {
        setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userId));
      } else {
        console.error(`Failed to delete user: ${userId}`);
      }
    } catch (error) {
      console.error('There was an error deleting the user.');
    }
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

  const renderContent = () => {
    if (loading) {
      return <p>Loading Users...</p>
    }
    if (error) {
      return <p>{error}</p>
    }
    if (users.length > 0) {
      return users.map((user) => (
        <div key={user.userID} className="item">
          <span>{user.username}</span>
          <div className="button-container">
            <button onClick={() => editUsers(user.userID)}>Edit</button>
            <button onClick={() => deleteUsers(user.userID)}>Delete</button>
          </div>
        </div>
      ));
    } else {
      return <p>No users found</p>;
    }
  };

  return (
    <div className="container">
      <Layout>
        <h1>All Users</h1>

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
      </Layout>
    </div>
  );
}

export default Admin;
