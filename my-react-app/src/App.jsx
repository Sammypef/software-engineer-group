import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext.jsx';
import Login from './components/Login.jsx';
import Homepage from './components/Homepage.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import Progression from './components/Profile.jsx';
import Song from './components/Song.jsx';
import Music from './components/Music.jsx';
import Lessons from './components/Lessons.jsx';
import Game from './components/Game.jsx';
import Exercise from "./components/Exercise";
import Payment from "./components/Payment.jsx";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Homepage />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/progression" 
            element={
              <ProtectedRoute>
                <Progression />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/song/yoasobi" 
            element={
              <ProtectedRoute>
                <Song />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/music" 
            element={
              <ProtectedRoute>
                <Music />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/lessons" 
            element={
                <Lessons />
            } 
          />

          <Route path="/game" element={<Game />} />
          <Route path="/exercise" element={<Exercise />} />
          <Route path="/payment" element={<Payment />} />
          
          <Route path="/" element={<Navigate to="/home" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;