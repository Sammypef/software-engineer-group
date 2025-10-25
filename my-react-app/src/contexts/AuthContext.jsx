// src/contexts/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);

  // This function will be called when the component mounts to check for a stored user
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  // The new signup function
  const signup = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        credentials: 'include', // include cookies if server uses sessions
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Some server errors may return non-JSON (or empty) bodies — handle gracefully
      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = { message: text };
      }

      if (!response.ok) {
        console.error('Registration Failed', response);
        //throw new Error(data.message || 'Registration failed');
      }

      // On successful registration, the backend should return the new user.
      // We then set it as the current user and save it to localStorage.
      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      console.error('Signup error:', err);
      // Re-throw so callers (components) can react to the error
      throw err;
    }
  };

  // The new signin/login function
  const login = async (email, password) => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        credentials: 'include', // include cookies for session auth
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch (e) {
        data = { message: text };
      }

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setCurrentUser(data.user);
      localStorage.setItem('user', JSON.stringify(data.user));
      return data;
    } catch (err) {
      console.error('Login error:', err);
      throw err;
    }
  };

  // ✅ ฟังก์ชัน Login ผ่าน Google OAuth
  const loginWithGoogle = () => {
    window.location.href = 'http://localhost:5000/auth/google';
  };

  // ✅ ฟังก์ชัน Logout จริง (เรียก backend + ล้าง localStorage)
  const logout = async () => {
    try {
      await fetch('http://localhost:5000/logout', {
        method: 'GET',
        credentials: 'include', // สำคัญ เพื่อส่ง session cookie ไปเคลียร์ฝั่ง server
      });
    } catch (err) {
      console.error('Logout failed:', err);
    }

    localStorage.removeItem('user');
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, signup, login, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
