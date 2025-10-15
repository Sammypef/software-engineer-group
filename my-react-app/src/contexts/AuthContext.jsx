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
    const response = await fetch('http://localhost:5000/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // On successful registration, the backend should return the new user.
    // We then set it as the current user and save it to localStorage.
    setCurrentUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
  };

  // The new signin/login function
  const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    setCurrentUser(data.user);
    localStorage.setItem('user', JSON.stringify(data.user));
    return data;
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
