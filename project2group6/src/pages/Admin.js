import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css'; // uses same style
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

function Admin() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/users/all');
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

  // NAVIGATION
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="container">
      <Layout>
        <h1>All Users</h1>
        <div className="item-list">
          {loading ? (
            <p>Loading users</p>
          ) : error ? (
            <p>{error}</p>
          ) : users.length > 0 ? ( // print all users
            users.map((user, index) => (
              <div key={index} className="item">
                <span>{user.username}</span>
                <div className="button-container">
                    <button onClick={() => alert('Edit clicked!')}>Edit</button>
                    <button onClick={() => alert('Remove clicked')}>Remove</button>
                </div>
              </div>
            ))
          ) : (
            <p>No users available</p>
          )}
        </div>
      </Layout>
    </div>
  );
}

export default Admin;
