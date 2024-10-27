// Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import backgroundImage from '../Media/pexels-content-pixie-1405717-2736499.jpg';

function App() {
  // Will be used for the sessions for
  // localStorage.removeItem("sessionToken");
  const navigate = useNavigate();
  const [setData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const databaseUrl = '/users/';

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/users/all`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Login function, navigates to the list page
  const login = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${databaseUrl}login`, {
        username,
        password,
      });
      console.log(response);
      if (response.status === 200) {
        const userResponse = await axios.get(`${databaseUrl}all`);
        const user = userResponse.data.find((u) => u.username === username && u.password === password);
        localStorage.setItem('user', JSON.stringify(user));
        if(!user){
          alert('Username or Password do not match');
        }
        if (user) {
          const token = "token";
          const admin = user.admin;
          localStorage.setItem('token', token);
          localStorage.setItem('admin', admin);
          console.log(token);
          console.log(admin);
          if (admin) {
            navigate('/admin');
          } else {
            navigate('/list');
          }
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Signup function, checks password confirmation before signing up
  const signup = async () => {
    setLoading(true);
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!password) {
      alert('Enter a password')
      return;
    }
    if (!username) {
      alert('Enter a username')
      return;
    }
    if (!confirmPassword) {
      alert('Please re-enter your password')
      return;
    }
    try {
      const response = await axios.post(`${databaseUrl}add`, {
        username,
        password,
      });
      if (response.status === 200) {
        alert('You have signed in successfully');
        const token = response.data.token; // Get the token from the server response
        localStorage.setItem('sessionToken', token); // Store token in localStorage
      }
      if (response.status === 500) {
        alert('There is already a user in the system.');
      }
    } catch (error) {
      alert('Something went wrong during signup. Please try again.');
    }
  };

  return (
    <Container fluid style={{ height: '100vh' }} className="p-0">
      <Row className="w-100 no-gutters">
        <Col md={6}
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100vh',
            padding: 0,
          }}>
        </Col>
        <Col md={6} className="d-flex align-items-center justify-content-center"
          style={{
            paddingRight: '10px',
            height: '100vh'
          }}>
          <div className="App d-flex flex-column align-items-center"
            style={{
              width: '100%'
            }}>
            <h1>Let's Make a Wishlist!</h1>
            {/* Login container */}
            <div className="login w-75 p-3 mb-3 text-center">
              <h3>Login?</h3>
              <input
                type="text"
                placeholder="Username"
                className="form-control mb-2"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button className="btn btn-primary" onClick={login}>
                Login
              </button>
            </div>

            {/* Signup container */}
            <div className="signup w-75 p-3 mb-3 text-center">
              <h3>Signup?</h3>
              <input
                type="text"
                placeholder="Username"
                className="form-control mb-2"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="form-control mb-2"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Re-enter password"
                className="form-control mb-2"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="btn btn-success" onClick={signup}>
                Sign Up
              </button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;