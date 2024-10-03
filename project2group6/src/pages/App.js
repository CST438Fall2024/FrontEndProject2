//Imports
import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../css/App.css'; 

function App() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const databaseUrl = 'jdbc:mysql://c584md9egjnm02sk.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/v4hbf09hn2uv0gfc?useSSL=false&serverTimezone=UTC';
  const [username, getUsername, setUsername] = useState('');
  const [password, getPassword, setPassword] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(databaseUrl);
        setData(response.data);
      }
      catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Login function, navigates to the list page
  const login = async () => {
    // Implement logic to check if user credentials are valid and navigate to the list page.
    try {
    const response = axios.post(databaseUrl,
      {
        username: username,
        password: password
      });
      if (response.status === 200) {
        navigate('/list');
      }
      else{
        alert('Invalid credentials. Please try again.');
      } 
    }catch (error) {
        alert('Invalid credentials. Please try again.');
      }
  };

  // Signup function, calls login function after signup
  const signup = () => {

    login();
  };

  
  return (
    <div className="App">
      <h1>Let's Make a Wishlist!</h1>
      <div className="loginSignup">

        {/* Login container */}
        <div className="login">
          <h3>Login?</h3>
          <input type="text" placeholder="Username" value= {username} onChange = {(e) => getUsername(e.target.value)}/>
          <input type="password" placeholder="Password" value = {password} onChange = {(e) => getPassword(e.target.value)}/>
          
          <button onClick={login}>Login</button>
        </div>

        {/* Google login container */}
        <div className="Google">
          <h3>Google</h3>
          <h4>You can use Google to sign up or log in!</h4>
          <h4>Just use the button below!</h4>
          <button>Google</button>
        </div>

        {/* Signup container */}
        <div className="signup">
          <h3>Signup?</h3>
          <input name = "email" type="text" placeholder="Email" value={email} onChange = {(e) => setEmail(e.target.value)}/>
          <input name="username" type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
          <input name="password" type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          <input name="secondPassword" type="password" placeholder="Re-enter password" />
          <button onClick={signup}>Sign Up</button>
        </div>
      </div>
    </div>
  );
}

export default App;
