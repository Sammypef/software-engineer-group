// src/components/Homepage.jsx
import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, Search, PlayCircle, Gamepad2 } from "lucide-react";


const Homepage = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const lyricIconUrl =
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";

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
          <button style={styles.navButton} onClick={logout}>
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
    </div>
  );
};

export default Homepage;