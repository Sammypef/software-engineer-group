// src/components/Exercise.jsx
import React, { useState, useEffect } from "react";
import { Home, Music } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Exercise = () => {
  const navigate = useNavigate();
  const [lyrics, setLyrics] = useState([]);
  const [answers, setAnswers] = useState({});

  // same lyric source from Song.jsx
  const song = {
    title: "夜に駆ける (Yoru ni Kakeru)",
    artist: "YOASOBI",
    lrcSrc:
      "http://localhost:5000/upload/lyrics/YOASOBI - 夜に駆ける (Yoru ni kakeru) Racing into the night [English & Romaji].lrc",
  };

  // Load lyrics text
  useEffect(() => {
    fetch(song.lrcSrc)
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .split("\n")
          .map((line) => {
            const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
            if (match) return match[3].trim();
            return null;
          })
          .filter(Boolean);
        setLyrics(parsed.slice(0, 20)); // limit to first 20 lines for simplicity
      });
  }, []);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const goToHome = () => navigate("/");
  const goToSong = () => navigate("/song");

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #ba378dff 0%, #b4ae63ff 100%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "2rem",
    },
    header: { textAlign: "center", marginBottom: "2rem" },
    lyricLine: {
      marginBottom: "1rem",
      background: "rgba(255,255,255,0.1)",
      padding: "1rem",
      borderRadius: "12px",
      width: "80%",
      textAlign: "left",
    },
    input: {
      background: "rgba(255,255,255,0.2)",
      border: "none",
      borderBottom: "2px solid white",
      color: "white",
      fontSize: "1rem",
      width: "100%",
      padding: "0.5rem",
      marginTop: "0.5rem",
      outline: "none",
    },
    buttons: {
      display: "flex",
      justifyContent: "center",
      gap: "1rem",
      marginTop: "2rem",
    },
    navButton: {
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      color: "white",
      padding: "0.75rem 1.5rem",
      borderRadius: "24px",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      backdropFilter: "blur(10px)",
      transition: "all 0.3s ease",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>📝 Lyric Exercise</h1>
        <p>Try to recall the lyrics without the audio!</p>
      </div>

      {lyrics.map((line, index) => (
        <div key={index} style={styles.lyricLine}>
          <p>
            {line.split(" ").slice(0, 3).join(" ")}{" "}
            {/* just show first few words as hint */}
            <br />
            [_____________________________]
          </p>
          <input
            type="text"
            placeholder="Type your answer..."
            value={answers[index] || ""}
            onChange={(e) => handleChange(index, e.target.value)}
            style={styles.input}
          />
        </div>
      ))}

      <div style={styles.buttons}>
        <button
          style={styles.navButton}
          onClick={goToHome}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
          onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
        >
          <Home size={18} style={{ marginRight: "0.5rem" }} />
          Home
        </button>

        <button
          style={styles.navButton}
          onClick={goToSong}
          onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
          onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
        >
          <Music size={18} style={{ marginRight: "0.5rem" }} />
          Back to Song
        </button>
      </div>
    </div>
  );
};

export default Exercise;