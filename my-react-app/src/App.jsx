// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Progression from './components/Profile.jsx';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          {/* Homepage */}
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            } 
          />

          {/*New Progression Page */}
          <Route 
            path="/progression" 
            element={
              <ProtectedRoute>
                <Progression />
              </ProtectedRoute>
            } 
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;