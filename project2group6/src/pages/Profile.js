import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout';
import '../css/Profile.css';

function Profile() {
  const [user, setUser] = useState({ username: '', email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ username: '', email: '', password: '' });

  /*http://localhost:8080/users PLACEHOLDER UNTIL BACKEND RUNS/IS FIXED */

  // fetch data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/users/all');
        const allUsers = response.data;

        const fetchedUser = allUsers.find(user => user.userID === 2);
        setUser({
          username: fetchedUser.username || 'no username',
          email: fetchedUser.email || 'No email provided',
          password: '', // won't show
        });
        setUpdatedUser({
          username: fetchedUser.username || '',
          email: fetchedUser.email || '',
          password: '',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  // edit mode
  const handleEditClick = () => {
    setEditMode(!editMode);
  };

  const handleChange = (e) => {
    setUpdatedUser({
      ...updatedUser,
      [e.target.name]: e.target.value,
    });
  };

  // save and update info
  const saveChanges = async () => {
    try {
      setUser(updatedUser); //display updates
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  return (
    <Layout>
      <h1 className="text-center">Profile</h1>
      <div className="profileContainer">
        <div className="profileCard">
          {editMode ? (
            <div>
              <div className="profileField">
                <label>Username: </label>
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleChange}
                />
              </div>
              <div className="profileField">
                <label>Email: </label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleChange}
                />
              </div>
              <div className="profileField">
                <label>Password: </label>
                <input
                  type="password"
                  name="password"
                  value={updatedUser.password}
                  onChange={handleChange}
                />
              </div>
              <button onClick={saveChanges}>Save Changes</button>
              <button onClick={handleEditClick}>Cancel</button>
            </div>
          ) : (
            <div>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
