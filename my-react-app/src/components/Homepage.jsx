// src/components/Homepage.jsx
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, Search, PlayCircle, Gamepad2, X, HelpCircle } from "lucide-react";

const Homepage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [showGuide, setShowGuide] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const lyricIconUrl =
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";
  
  // Fixed guide image URL - using raw.githubusercontent.com instead
  const guideImageUrl =
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/guide.png";

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Failed to log out:", error);
    }
  };

  const styles = {
    pageContainer: {
      minHeight: "100vh",
      width: "100vw",
      background:
        "linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)",
      display: "flex",
      flexDirection: "column",
      overflowX: "hidden",
      boxSizing: "border-box",
      fontFamily: "Poppins, sans-serif",
      color: "white",
    },
    navbar: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
      padding: "clamp(12px, 3vw, 20px) clamp(4%, 5vw, 8%)",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "clamp(8px, 2vw, 16px)",
      width: "100%",
      boxSizing: "border-box",
    },
    navBrand: {
      display: "flex",
      alignItems: "center",
      gap: "clamp(8px, 2vw, 12px)",
      color: "white",
      fontSize: "clamp(16px, 4vw, 24px)",
      fontWeight: "bold",
      whiteSpace: "nowrap",
    },
    navButton: {
      padding: "clamp(8px, 2vw, 12px) clamp(12px, 3vw, 20px)",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "clamp(6px, 1.5vw, 8px)",
      color: "white",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "clamp(6px, 1.5vw, 8px)",
      fontSize: "clamp(12px, 2.5vw, 16px)",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "clamp(2rem, 8vw, 4rem)",
      width: "100%",
      boxSizing: "border-box",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(16px, 4vw, 24px)",
      padding: "clamp(1.5rem, 6vw, 3rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      width: "min(95vw, 800px)",
      boxSizing: "border-box",
      color: "white",
    },
    sectionTitle: {
      fontWeight: "600",
      fontSize: "clamp(16px, 3vw, 20px)",
      marginBottom: "1rem",
    },
    songCard: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      background: "rgba(255, 255, 255, 0.08)",
      borderRadius: "clamp(10px, 3vw, 16px)",
      padding: "0.8rem 1rem",
      marginBottom: "1.2rem",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    songInfo: {
      display: "flex",
      alignItems: "center",
      gap: "1rem",
    },
    songImage: {
      width: "60px",
      height: "60px",
      borderRadius: "8px",
      objectFit: "cover",
      border: "2px solid rgba(255,255,255,0.2)",
    },
    songText: { display: "flex", flexDirection: "column" },
    // Guide button styles - MOVED TO BOTTOM RIGHT
    guideButton: {
      position: "fixed",
      bottom: "20px",
      right: "20px", // Changed from left to right
      background: "rgba(255, 255, 255, 0.2)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "50%",
      width: "60px",
      height: "60px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "white",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
      zIndex: 100,
    },
    // Guide modal styles
    guideModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.8)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    },
    guideContent: {
      position: "relative",
      maxWidth: "90vw",
      maxHeight: "90vh",
      background: "white",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
    },
    guideImage: {
      width: "100%",
      height: "auto",
      display: "block",
    },
    // Logout confirmation modal styles
    logoutModal: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1000,
      backdropFilter: "blur(5px)",
    },
    logoutContent: {
      background: "rgba(255, 255, 255, 0.15)",
      backdropFilter: "blur(20px)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "16px",
      padding: "2rem",
      width: "min(90vw, 400px)",
      color: "white",
      textAlign: "center",
    },
    logoutTitle: {
      fontSize: "1.5rem",
      fontWeight: "600",
      marginBottom: "1rem",
    },
    logoutButtons: {
      display: "flex",
      gap: "1rem",
      justifyContent: "center",
      marginTop: "1.5rem",
    },
    confirmButton: {
      padding: "12px 24px",
      background: "rgba(255, 0, 0, 0.3)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
    cancelButton: {
      padding: "12px 24px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.3)",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      fontWeight: "500",
      transition: "all 0.2s ease",
    },
  };

  return (
    <div style={styles.pageContainer}>
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <img
            src={lyricIconUrl}
            alt="LyricLingo"
            style={{ width: "28px", height: "28px", borderRadius: "6px" }}
          />
          <span>LyricaLingo</span>
        </div>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={styles.navButton}>
            <Home size={18} /> Home
          </button>
          <button style={styles.navButton} onClick={() => navigate("/lessons")}>
            <Book size={18} /> Lessons 
          </button>
          <button style={styles.navButton} onClick={() => navigate("/game")}>
            <Gamepad2 size={18} /> Game
          </button>
          <button style={styles.navButton} onClick={() => navigate("/music")}>
            <Headphones size={18} /> Music
          </button>
          <button style={styles.navButton} onClick={() => navigate("/progression")}>
            <User size={18} /> Profile
          </button>
          <button 
            style={styles.navButton} 
            onClick={() => setShowLogoutConfirm(true)}
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      <main style={styles.mainContent}>
        <div style={styles.card}>
          <div style={styles.sectionTitle}>Recent Song &gt;</div>
          <div
            style={styles.songCard}
            onClick={() => navigate("/song/yoasobi")}
          >
            <div style={styles.songInfo}>
              <img
                src={lyricIconUrl}
                alt="YOASOBI"
                style={styles.songImage}
              />
              <div style={styles.songText}>
                <span style={{ fontWeight: "bold" }}>夜に駆ける (Yoru ni Kakeru)</span>
                <span>by YOASOBI</span>
              </div>
            </div>
            <PlayCircle size={36} color="#fbcdfd" />
          </div>
        </div>
      </main>

      {/* Guide Button - NOW IN BOTTOM RIGHT */}
      <button 
        style={styles.guideButton}
        onClick={() => setShowGuide(true)}
        title="Show Guide"
      >
        <HelpCircle size={28} />
      </button>

      {/* Guide Modal - X BUTTON REMOVED */}
      {showGuide && (
        <div style={styles.guideModal} onClick={() => setShowGuide(false)}>
          <div style={styles.guideContent} onClick={(e) => e.stopPropagation()}>
            <img 
              src={guideImageUrl} 
              alt="Website Guide" 
              style={styles.guideImage}
              onError={(e) => {
                console.error("Failed to load guide image");
                e.target.style.display = 'none';
                // Fallback message if image fails to load
                const fallbackDiv = document.createElement('div');
                fallbackDiv.style.padding = '2rem';
                fallbackDiv.style.color = 'black';
                fallbackDiv.style.textAlign = 'center';
                fallbackDiv.textContent = 'Guide image failed to load. Please check the URL.';
                e.target.parentNode.appendChild(fallbackDiv);
              }}
            />
          </div>
        </div>
      )}

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div style={styles.logoutModal} onClick={() => setShowLogoutConfirm(false)}>
          <div style={styles.logoutContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.logoutTitle}>Are you sure?</div>
            <p>Do you really want to log out?</p>
            <div style={styles.logoutButtons}>
              <button 
                style={styles.cancelButton}
                onClick={() => setShowLogoutConfirm(false)}
              >
                Cancel
              </button>
              <button 
                style={styles.confirmButton}
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Homepage;