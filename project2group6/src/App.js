import './App.css';
import {useNavigate, Routes, Route} from 'react-router-dom';
import List from './pages/List';
import AddItem from './pages/AddItem'
// The landing page which has the forms for the login/signup elements
function App() {

  const navigate = useNavigate();

  const handleNavigation = (path) => {
  navigate(path);
 };

  return (
    
    <div className="App">
    <h1>Let's Make a Wishlist!</h1>
    <div className = "loginSignup">
    {/* The Login container */}
    <div className ="login">
      <h3>Login?</h3>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button onClick={login}>Login</button>
    </div>
    {/* The Google container */}
    <div className = "Google">
      <h3>Google</h3>
      <h4>You can use Google to signup or login!!!</h4>
      <h4>Just use the button below!</h4>
      <button>Google</button>
    </div>
    {/* The Signup container */}
    <div className = "signup">
      <h3>Signup?</h3>
      <input name = "username" type="text" placeholder="Username" />
      <input name ="password" type="text" placeholder="Password" />
      <input name = "secondPassword" type ="text" placeholder="Re-enter passowrd"/>
      <button onClick={signup}>Sign Up</button>
    </div>
    </div>
    </div>
  );
  
}



function login() {
  window.location.href = './list.html';
  console.log("You've clicked the login button!");
}

function signup() {
  login();
  console.log("You've clicked the signup button!");
}


export default App;
