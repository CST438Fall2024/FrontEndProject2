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

  const editUsers = async (usersId) => {
    try {
      const response = await axios.get(`${databaseUrl}all`, {
        params: {userId},
      });
      setEditingUser(response.data);
    } catch (error) {
      console.log(error);
    }
    const responseEdit = await axios.post(`${databaseUrl}edit`);

  }

  const deleteUsers = (users.id) => { }

  const Popup = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" className="form-control" placeholder= {users?.username}></input>
        </Modal.Body>
      </Modal>
      </>
    )
  }
  const renderContent = () => {
    if (loading) {
      return <p>Loading Users...</p>
    }
    if (error) {
      return <p>{error}</p>
    }
    if (users.length > 0) {
      return users.map((user, index) => (
        <div key={index} className="item">
          <span>{user.username}</span>
          <div className="button-container">
            <button onClick={editUsers(user.id)}>Edit</button>
            <button onClick={deleteUsers(user.id)}>Delete</button>
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
      </Layout>
    </div>
  );
}

export default Admin;
