import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';
import '../css/Profile.css';

function Profile() {
  const [user, setUser] = useState({ username: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // session
  const userID = localStorage.getItem('userID');

  // fetch data
  useEffect(() => {
    const fetchUser = async () => {
      if (!userID) {
        console.warn('User is not logged in');
        return;
      }

      try {
        const response = await axios.get('/users/all');
        const allUsers = response.data;

        const fetchedUser = allUsers.find(user => user.userID === parseInt(userID));
        if (fetchedUser) {
          setUser({
            username: fetchedUser.username || 'no username',
            password: '', // don't display password
          });
          setUpdatedUser({
            username: fetchedUser.username || '',
            password: '',
          });
        } else {
          console.warn('User not found');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [userID]);

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

  // update user info
  const saveChanges = async () => {
    if (!userID) {
      alert('User is not logged in');
      return;
    }

    try {
      await axios.put(`/users/edit`, {
        username: updatedUser.username,
        password: updatedUser.password,
        userID: parseInt(userID),
      });

      setUser(updatedUser);
      setEditMode(false);
    } catch (error) {
      console.error('Error saving user data:', error);
      alert('Failed to save changes. Please try again.');
    }
  };

  // logout function
  const handleLogout = () => {
    // Clear session data
    localStorage.removeItem('token');
    localStorage.removeItem('admin');
    localStorage.removeItem('userID');
    navigate('/');
  };

  // delete account
  const handleDeleteAccount = async () => {
    if (!userID) {
      alert('User is not logged in');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (!confirmDelete) return;

    try {
      await axios.delete(`/users/delete`, {
        data: { userID: parseInt(userID) },
      });

      // clear session go to landing page
      handleLogout();
    } catch (error) {
      console.error('Error deleting account:', error);
      alert('Failed to delete the account. Please try again.');
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
              <button onClick={handleEditClick}>Edit</button>
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleDeleteAccount} style={{ color: 'black' }}>Delete Account</button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Profile;
