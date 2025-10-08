// src/App.jsx
import { useState } from "react";
import { auth, provider, signInWithPopup, signOut } from "./firebase";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async () => {
    const result = await signInWithPopup(auth, provider);
    setUser(result.user);
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className="container">
      {!user ? (
        <div className="login-card">
          <h2>Login with Google</h2>
          <button className="btn" onClick={handleLogin}>
            Sign in with Google
          </button>
        </div>
      ) : (
        <div className="dashboard-card">
          <h2>Welcome, {user.displayName}</h2>
          <img
            src={user.photoURL}
            alt="profile"
            className="profile-img"
          />
          <p className="email">{user.email}</p>
          <button className="btn logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
