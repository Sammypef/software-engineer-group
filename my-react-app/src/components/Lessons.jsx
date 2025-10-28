// src/components/Lessons.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, ChevronRight, Music, BookOpen } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function Lessons() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [selectedSong, setSelectedSong] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  // Sample data structure - you'll populate this with your actual content
  const songs = [
    {
      id: 1,
      title: "夜に駆ける",
      romanji: "Yoru ni Kakeru",
      artist: "YOASOBI",
      lessons: [
        { 
          id: 1, 
          title: "Lesson 1 - Opening Lines",
          japanese: "[Your Japanese lyrics here]",
          romaji: "[Your romaji here]",
          translation: "[Your translation here]",
          trivia: [
            "Add your trivia points here",
            "Each lesson can have multiple trivia items"
          ]
        },
        { 
          id: 2, 
          title: "Lesson 2 - First Verse",
          japanese: "[Your Japanese lyrics here]",
          romaji: "[Your romaji here]",
          translation: "[Your translation here]",
          trivia: [
            "More trivia about vocabulary or cultural context"
          ]
        },
        { 
          id: 3, 
          title: "Lesson 3 - Chorus",
          japanese: "[Your Japanese lyrics here]",
          romaji: "[Your romaji here]",
          translation: "[Your translation here]",
          trivia: [
            "Explanation of grammar patterns or expressions"
          ]
        },
      ]
    },
    {
      id: 2,
      title: "群青",
      romanji: "Gunjou",
      artist: "YOASOBI",
      lessons: [
        { id: 1, title: "Lesson 1 - Introduction" },
        { id: 2, title: "Lesson 2 - First Verse" },
      ]
    },
    {
      id: 3,
      title: "祝福",
      romanji: "Shukufuku",
      artist: "YOASOBI",
      lessons: [
        { id: 1, title: "Lesson 1 - Opening" },
        { id: 2, title: "Lesson 2 - Verse" },
      ]
    },
  ];

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
    songsGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
      gap: "clamp(16px, 4vw, 24px)",
      marginBottom: "2rem",
    },
    songCard: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(12px, 3vw, 16px)",
      padding: "clamp(1.5rem, 4vw, 2rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
      cursor: "pointer",
      transition: "all 0.3s ease",
    },
    songTitle: {
      fontSize: "clamp(18px, 4vw, 24px)",
      fontWeight: "600",
      marginBottom: "8px",
    },
    songRomanji: {
      fontSize: "clamp(14px, 3vw, 16px)",
      color: "#fbcdfdff",
      marginBottom: "4px",
    },
    songArtist: {
      fontSize: "clamp(12px, 2.5vw, 14px)",
      color: "#e9d5ff",
    },
    lessonsContainer: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(12px, 3vw, 20px)",
      padding: "clamp(1.5rem, 5vw, 2.5rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
    },
    backButton: {
      padding: "10px 20px",
      background: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      borderRadius: "8px",
      color: "white",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      marginBottom: "1.5rem",
      fontSize: "14px",
      transition: "all 0.3s ease",
    },
    lessonItem: {
      background: "rgba(255, 255, 255, 0.05)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
      borderRadius: "12px",
      padding: "1rem 1.5rem",
      marginBottom: "1rem",
      cursor: "pointer",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      transition: "all 0.3s ease",
    },
    lessonContent: {
      background: "rgba(255, 255, 255, 0.1)",
      backdropFilter: "blur(20px)",
      borderRadius: "clamp(12px, 3vw, 20px)",
      padding: "clamp(2rem, 6vw, 3rem)",
      border: "1px solid rgba(255, 255, 255, 0.2)",
      color: "white",
      lineHeight: "1.8",
    },
    sectionTitle: {
      fontSize: "clamp(16px, 3.5vw, 20px)",
      fontWeight: "600",
      color: "#fbcdfdff",
      marginTop: "1.5rem",
      marginBottom: "0.75rem",
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },
    lyricText: {
      fontSize: "clamp(14px, 3vw, 18px)",
      marginBottom: "1rem",
      padding: "1rem",
      background: "rgba(255, 255, 255, 0.05)",
      borderRadius: "8px",
      borderLeft: "3px solid #c084fc",
    },
    triviaItem: {
      fontSize: "clamp(13px, 2.8vw, 16px)",
      marginBottom: "0.75rem",
      paddingLeft: "1.5rem",
      position: "relative",
      lineHeight: "1.6",
    },
  };

  const handleSongClick = (song) => {
    setSelectedSong(song);
    setSelectedLesson(null);
  };

  const handleLessonClick = (lesson) => {
    setSelectedLesson(lesson);
  };

  const handleBack = () => {
    if (selectedLesson) {
      setSelectedLesson(null);
    } else {
      setSelectedSong(null);
    }
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
          <button style={{...styles.navButton, background: "rgba(255, 255, 255, 0.2)"}}>
            <Book size={18} /> <span>Lessons</span>
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
          <BookOpen size={40} />
          Lessons
        </div>

        {/* Show song selection */}
        {!selectedSong && (
          <div style={songsGrid}>
            {songs.map((song) => (
              <div
                key={song.id}
                style={styles.songCard}
                onClick={() => handleSongClick(song)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.15)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <Music size={32} style={{ color: "#fbcdfdff", marginBottom: "12px" }} />
                <div style={styles.songTitle}>{song.title}</div>
                <div style={styles.songRomanji}>{song.romanji}</div>
                <div style={styles.songArtist}>{song.artist}</div>
                <div style={{ marginTop: "12px", fontSize: "14px", color: "#e9d5ff" }}>
                  {song.lessons.length} lessons available
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show lesson list for selected song */}
        {selectedSong && !selectedLesson && (
          <div style={styles.lessonsContainer}>
            <button
              style={styles.backButton}
              onClick={handleBack}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
              }
            >
              ← Back to Songs
            </button>
            
            <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", marginBottom: "8px" }}>
              {selectedSong.title}
            </h2>
            <p style={{ fontSize: "clamp(16px, 3.5vw, 20px)", color: "#fbcdfdff", marginBottom: "2rem" }}>
              {selectedSong.romanji} - {selectedSong.artist}
            </p>

            {selectedSong.lessons.map((lesson) => (
              <div
                key={lesson.id}
                style={styles.lessonItem}
                onClick={() => handleLessonClick(lesson)}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)";
                  e.currentTarget.style.transform = "translateX(8px)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = "rgba(255, 255, 255, 0.05)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <span style={{ fontSize: "clamp(14px, 3vw, 18px)", fontWeight: "500" }}>
                  {lesson.title}
                </span>
                <ChevronRight size={20} style={{ color: "#fbcdfdff" }} />
              </div>
            ))}
          </div>
        )}

        {/* Show lesson content */}
        {selectedLesson && (
          <div style={styles.lessonContent}>
            <button
              style={styles.backButton}
              onClick={handleBack}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.2)")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
              }
            >
              ← Back to Lessons
            </button>

            <h2 style={{ fontSize: "clamp(24px, 5vw, 32px)", marginBottom: "2rem" }}>
              {selectedLesson.title}
            </h2>

            <div style={styles.sectionTitle}>📝 Japanese</div>
            <div style={styles.lyricText}>{selectedLesson.japanese}</div>

            <div style={styles.sectionTitle}>🔤 Romaji</div>
            <div style={styles.lyricText}>{selectedLesson.romaji}</div>

            <div style={styles.sectionTitle}>🌐 English Translation</div>
            <div style={styles.lyricText}>{selectedLesson.translation}</div>

            <div style={styles.sectionTitle}>💡 Trivia & Learning Points</div>
            {selectedLesson.trivia && selectedLesson.trivia.map((item, index) => (
              <div key={index} style={styles.triviaItem}>
                <span style={{ position: "absolute", left: "0", color: "#fbcdfdff" }}>•</span>
                {item}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}