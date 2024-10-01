import './App.css';

function App() {
  return (
    <div className="App">
    <h1>Let's Make a Wishlist!</h1>
    <div className = "loginSignup">
    <div className ="login">
      <h3>Login?</h3>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button>Login</button>
    </div>
    <div className = "Google">
      <h3>Google</h3>
      <h2>You can use Google to signup or login!!!</h2>
      <h2>Just use the button below!</h2>
      <button>Google</button>
    </div>
    <div className = "signup">
      <h3>Signup?</h3>
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <input type ="secondPassowrd" placeholder="Re-enter passowrd" />
      <button>Login</button>
    </div>
    </div>
    </div>
  );
}

export default App;
