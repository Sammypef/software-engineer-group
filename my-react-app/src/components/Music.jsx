// src/components/Music.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, Search, PlayCircle, Gamepad2, Music, Clock, Disc, Heart } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function MusicPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user') || 'null');
        const userId = user?.user_id || user?.id || user?.uid;
        if (!userId) {
          setHistory([]);
          return;
        }

        const res = await fetch(`http://localhost:5000/api/history/${userId}`);
        if (!res.ok) throw new Error('Failed to fetch history');
        const data = await res.json();
        // API returns array directly, not { rows: [] }
        setHistory(Array.isArray(data) ? data : (data.rows || []));
      } catch (err) {
        console.error('Could not load history:', err);
        setHistory([]);
      }
    };

    fetchHistory();
    setPlaylists([
      { id: 1, name: "Study Beats" },
      { id: 2, name: "J-Pop Favs" },
      { id: 3, name: "Chill Vibes" },
    ]);
    setLiked([
      { id: 1, title: "Shukufuku", artist: "YOASOBI" },
      { id: 2, title: "Racing Into The Night", artist: "YOASOBI" },
    ]);
  }, []);

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
      padding: "clamp(2rem, 8vw, 4rem) clamp(4%, 5vw, 8%)",
      width: "100%",
      boxSizing: "border-box",
    },
    pageTitle: {
      display: "flex",
      alignItems: "center",
      gap: "16px",
      color: "white",
      fontSize: "clamp(28px, 6vw, 48px)",
      fontWeight: "bold",
      marginBottom: "clamp(2rem, 6vw, 3rem)",
      textAlign: "center",
      justifyContent: "center",
    },
    section: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(12px, 3vw, 20px)",
      padding: "clamp(1.5rem, 5vw, 2.5rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      marginBottom: "clamp(1.5rem, 4vw, 2rem)",
      color: "white",
    },
    sectionHeader: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "600",
      marginBottom: "clamp(1rem, 3vw, 1.5rem)",
      color: "#fbcdfdff",
    },
    songItem: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "clamp(8px, 2vw, 12px)",
      padding: "clamp(12px, 3vw, 16px)",
      marginBottom: "clamp(8px, 2vw, 12px)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      display: "flex",
      alignItems: "center",
      gap: "12px",
    },
    playlistGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
      gap: "clamp(12px, 3vw, 16px)",
    },
    playlistCard: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "clamp(8px, 2vw, 12px)",
      padding: "clamp(16px, 4vw, 24px)",
      cursor: "pointer",
      transition: "all 0.3s ease",
      textAlign: "center",
    },
    songTitle: {
      fontSize: "clamp(14px, 3vw, 16px)",
      fontWeight: "500",
    },
    songArtist: {
      fontSize: "clamp(12px, 2.5vw, 14px)",
      color: "#e9d5ff",
      marginLeft: "4px",
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
          <span>LyricaLingo</span>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={styles.navButton} onClick={() => navigate("/home")}>
            <Home size={18} /> <span>Home</span>
          </button>
          <button style={styles.navButton} onClick={() => navigate("/lessons")}>
            <Book size={18} /> <span>Lessons</span>
          </button>
          <button style={styles.navButton} onClick={() => navigate("/game")}>
            <Gamepad2 size={18} /> <span>Game</span>
          </button>
          <button style={styles.navButton} onClick={() => navigate("/music")}>
            <Headphones size={18} /> <span>Music</span>
          </button>
          <button style={styles.navButton} onClick={() => navigate("/progression")}>
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
        <div style={styles.pageTitle}>
          <Music size={40} />
          My Music
        </div>

        {/* Browsing History */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <Clock size={24} />
            Browsing History
          </div>
          {history.length === 0 ? (
            <div style={{ color: 'rgba(255,255,255,0.7)' }}>No recently played songs.</div>
          ) : (
            history.map((song) => (
              <div
                key={song.history_id || song.id}
                style={styles.songItem}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                }}
              >
                <Disc size={20} style={{ color: "#c084fc" }} />
                <span style={styles.songTitle}>{song.title}</span>
                <span style={styles.songArtist}>— {song.artist}</span>
                <div style={{ marginLeft: 'auto', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  {song.listened_at ? new Date(song.listened_at).toLocaleString() : ''}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Playlists */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <Music size={24} />
            Playlists
          </div>
          <div style={styles.playlistGrid}>
            {playlists.map((playlist) => (
              <div
                key={playlist.id}
                style={styles.playlistCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Music size={32} style={{ color: "#fbcdfdff", marginBottom: "8px" }} />
                <div style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: "600" }}>
                  {playlist.name}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Liked Songs */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <Heart size={24} style={{ fill: "#f472b6" }} />
            Liked Songs
          </div>
          {liked.map((song) => (
            <div
              key={song.id}
              style={styles.songItem}
              onMouseOver={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
              }}
            >
              <Heart size={20} style={{ color: "#f472b6", fill: "#f472b6" }} />
              <span style={styles.songTitle}>{song.title}</span>
              <span style={styles.songArtist}>— {song.artist}</span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}