// src/components/Progression.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const Progression = () => {
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const user = {
    username: currentUser?.name || "image/gif-host",
    avatar: currentUser?.picture || "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/lyricicon.png",
    level: 1,
    exp: 150,
    maxExp: 300,
    rank: "Beginner",
  };

  const progressPercent = (user.exp / user.maxExp) * 100;

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
      whiteSpace: "nowrap",
    },
    mainContent: {
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "clamp(2rem, 8vw, 4rem) clamp(4%, 5vw, 8%)",
      width: "100%",
      boxSizing: "border-box",
    },
    card: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(16px, 4vw, 24px)",
      padding: "clamp(2rem, 8vw, 4rem) clamp(1.5rem, 6vw, 3rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      width: "min(95vw, 800px)",
      color: "white",
      textAlign: "center",
    },
    avatar: {
      width: "100px",
      height: "100px",
      borderRadius: "50%",
      marginBottom: "16px",
      border: "3px solid rgba(255, 255, 255, 0.3)",
    },
    username: {
      fontSize: "clamp(20px, 4vw, 28px)",
      fontWeight: "bold",
      marginBottom: "8px",
    },
    level: {
      fontSize: "clamp(16px, 3vw, 20px)",
      marginBottom: "16px",
      color: "#fbcdfdff",
    },
    progressBarContainer: {
      width: "100%",
      height: "16px",
      background: "rgba(255, 255, 255, 0.2)",
      borderRadius: "12px",
      overflow: "hidden",
      marginBottom: "8px",
    },
    progressBar: {
      width: `${progressPercent}%`,
      height: "100%",
      background:
        "linear-gradient(90deg, #c084fc 0%, #fbcdfdff 100%)",
      borderRadius: "12px",
      transition: "width 0.5s ease",
    },
    expText: {
      fontSize: "clamp(12px, 2vw, 16px)",
      color: "#e9d5ff",
      marginBottom: "24px",
    },
    goBackButton: {
      padding: "10px 20px",
      borderRadius: "8px",
      background: "rgba(255,255,255,0.2)",
      color: "white",
      border: "1px solid rgba(255,255,255,0.3)",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navBrand}>
          <img
            src={lyricIconUrl}
            alt="LyricLingo"
            style={{ width: "28px", height: "28px", borderRadius: "6px" }}
          />
          <span>LyricLingo</span>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={styles.navButton} onClick={() => navigate("/home")}>
            <Home size={18} /> <span>Home</span>
          </button>
          <button style={styles.navButton}>
            <Book size={18} /> <span>Lessons</span>
          </button>
          <button style={styles.navButton}>
            <Headphones size={18} /> <span>Music</span>
          </button>
          <button style={styles.navButton}>
            <User size={18} /> <span>Profile</span>
          </button>
          <button
            style={styles.navButton}
            onClick={logout}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
          >
            <LogOut size={18} /> <span>Logout</span>
          </button>
        </div>
      </nav>

      {/* Main content */}
      <main style={styles.mainContent}>
        <div style={styles.card}>
          <img src={user.avatar} alt="User Avatar" style={styles.avatar} />
          <h2 style={styles.username}>{user.username}</h2>
          <p style={styles.level}>Level: {user.level}</p>

          <div style={styles.progressBarContainer}>
            <div style={styles.progressBar}></div>
          </div>
          <p style={styles.expText}>
            {user.rank} — {user.exp}/{user.maxExp} EXP
          </p>

          <button
            style={styles.goBackButton}
            onClick={() => navigate("/home")}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.3)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255,255,255,0.2)")
            }
          >
            Go Back
          </button>
        </div>
      </main>
    </div>
  );
};

export default Progression;