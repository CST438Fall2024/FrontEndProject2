// Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  // Will be used for the sessions for
  // localStorage.removeItem("sessionToken");
  const navigate = useNavigate();
  const [data, setData] = useState(null);
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
        const user = userResponse.data.find((u) => u.username === username);
  
        if (user) {
          const token = "token";
          const admin = user.admin;
          const userID = user.userID;
          localStorage.setItem('token', token);
          localStorage.setItem('admin', admin);
          localStorage.setItem('userID', userID); // access on all pages when logged in
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
    } catch (error) {
      alert('Something went wrong during signup.');
    }
  };

  return (
    <div className="App">
      <h1>Let's Make a Wishlist!</h1>
      <div className="loginSignup row justify-content-between">

        {/* Login container */}
        <div className="login col-md-3 border p-4">
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
        <div className="signup col-md-3 border p-4">
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
    </div>
  );
}

export default App;