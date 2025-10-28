// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div style={{
      height: "100vh",          // full viewport
      display: "flex",          
      flexDirection: "column",  // allow navbar + content stacking
    }}>
      {children}
    </div>
  );
}