import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from '../Layout'

function Profile(){
    const [user, setUser] = useState({ username: '', email: '' });

  // Fetch user data from the backend API
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/users/1'); // Replace with actual API endpoint and user ID
        const fetchedUser = response.data;
        setUser({
          username: fetchedUser.username || 'no username',
          email: fetchedUser.email || 'No email provided',
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <div className="container">
        <Layout>
        <h1>Profile</h1>
      <div className="profileCard">
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
      </div>
        </Layout>
    </div>
  );
}


export default Profile;