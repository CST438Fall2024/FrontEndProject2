// Imports
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const navigate = useNavigate();
  const [setData] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(''); // Added confirmPassword state
  const databaseUrl = '"proxy": "https://mysterious-brook-69944-1a2d962c192a.herokuapp.com"';

  // Fetching data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${databaseUrl}all`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();

    const loadGapi = () => {
      if (window.gapi) {
        window.gapi.load('auth2', () => {
          window.gapi.auth2.init({
            client_id: '497722883096-d2i832qs7k7oamjuv62kcre3somnh9ig.apps.googleusercontent.com',
          });
        })
      }
      else {
        console.error('gapi is not loaded');
      }
    };
    loadGapi();

  }, []);


  // Login function, navigates to the list page
  const login = async () => {
    try {
      const response = await axios.post(`${databaseUrl}login`, {
        username,
        password,
      });
      if (response.status === 200) {
        navigate('/list');
      } else {
        alert('Invalid credentials. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  };

  // Signup function, checks password confirmation before signing up
  const signup = async () => {
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
        login(); // Automatically log in after signup
      }
    } catch (error) {
      alert('Something went wrong during signup.');
    }
  };

  const googlelogin = async (response) => {
    if (response && response.credential) {
      const idToken = response.credential;
      try {
        const res = await axios.post(`${databaseUrl}google-login`, { idToken: idToken });
        if (res.status === 200) {
          navigate('/list');
        }
        else {
          alert('login failed');
        }
      }
      catch (error) {
        alert('Something went wrong with the google login');
      }
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

        {/* Google login container */}
        <div className="Google col-md-3 border p-4">
          <h3>Google</h3>
          <h4>You can use Google to sign up or log in!</h4>
          <div id="googleLoginButton" className="g_id_signin" data-client_id="497722883096-d2i832qs7k7oamjuv62kcre3somnh9ig.apps.googleusercontent.com" data-callback={googlelogin} data-auto_prompt="false"></div>
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
