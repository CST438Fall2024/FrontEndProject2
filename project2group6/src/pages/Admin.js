import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/List.css'; // uses same style
import Layout from '../Layout';
import { Modal, Button } from "react-bootstrap";
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

  const editUsers = async (users) => {
    try {
      let userId = users;
      if (!editingUser) {
        const response = await axios.get(`${databaseUrl}info/${userId}`);
        setEditingUser(response.data);
        setUsername(response.data.username);
        setPassword(response.data.password);
        setShowPopup(true);
      }
      else {
        const updateUser = await fetch(`${databaseUrl}edit`,
          {
            method: "PUT",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({userID: userId, username: editUsername, password:editPassword})
          });
        setUsers(users.map(user => user.id === updateUser.id ? { ...user, ...updateUser } : user));
        setShowPopup(false);
        setEditingUser(null);
      }
    }
    catch (error) {
      console.log(error);
    }
  };

  const deleteUsers = async (users) => {
    try {
      let userId = users;
      const response = await fetch(`${databaseUrl}delete`,
      {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({userID: userId})
      });
      if(response.ok) 
        {
          setUsers((prevUsers) => prevUsers.filter((user) => user.userID !== userId));
        }
        else{
          console.error(`Failed to delete user: ${userId}`);
        }
    }
    catch (error) {
      console.error('There was an error deleting the user.');
    }
  };
  const Popup = () => {
    const handleClose = () => {setShowPopup(false); setEditingUser(null);};
    return (
      <Modal show={showPopup} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" value={editUsername} onChange={(e) => setUsername(e.target.value)} placeholder="Enter Username" />
          <input type="password" className="form-control" value={editPassword} onChange={(e) => setPassword(e.target.value)} placeholder="Enter Password" />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="primary" onClick={() => editUsers(editingUser.userID)}>Save</Button>
            <Button variant="secondary" onClick={handleClose}>Close</Button>
          </Modal.Footer>
      </Modal>
    );
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
      ))
    }
  }

  return (
    <div className="container">
      <Layout>
        <h1>All Users</h1>
        <div className="item-list">
          {renderContent()}
        </div>
        {showPopup && <Popup/>}
      </Layout>
    </div>
  );
}

export default Admin;