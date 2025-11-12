// src/components/Game.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Book, Headphones, User, LogOut, Search, PlayCircle, Gamepad2, BookOpen, Music, ChevronRight } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function LyricQuiz() {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();

  const quizData = [
    {
      lyric: "Shizumu you ni ____ yuku you ni",
      correct: "tokete",
      options: ["tokete", "asahi", "kaze", "hoshi"],
    },
    {
      lyric: "Futari dake no ____ ga hirogaru yoru ni",
      correct: "sora",
      options: ["sora", "kage", "michi", "yume"],
    },
    {
      lyric: "Anata e to ____ shite shimau mae ni",
      correct: "ochite",
      options: ["ochite", "hashitte", "sagashite", "motsu"],
    },
  ];

  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  // Award EXP when quiz is completed
  useEffect(() => {
    const awardExp = async () => {
      if (showResult) {
        try {
          const userId = currentUser?.user_id || currentUser?.id || currentUser?.uid;
          if (userId) {
            await fetch(`http://localhost:5000/api/progression/${userId}/award`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ exp: 50 })
            });
          }
        } catch (err) {
          console.error('Failed to award exp:', err);
        }
      }
    };
    awardExp();
  }, [showResult, currentUser]);

  const handleSelect = (option) => {
  setSelected(option);
  if (option === quizData[current].correct) setScore(prev => prev + 1);

  const timeoutId = setTimeout(() => {
    if (current + 1 < quizData.length) {
      setCurrent(prev => prev + 1);
      setSelected(null);
    } else {
      setShowResult(true);
    }
  }, 800);
};

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setShowResult(false);
  };

  const lyricIconUrl =
    "https://raw.githubusercontent.com/Sammypef/software-engineer-group/peen-atempt/lyricicon.png";

  return (
    <div
  style={{
    minHeight: "100vh",     // fill viewport height
    width: "100vw",         // fill viewport width
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(135deg, #6f0097 0%, #ba378d 50%, #b4ae63 100%)",
    color: "white",
  }}
>
      {/* Navbar */}
      <nav
        style={{
          background: "rgba(255,255,255,0.1)",
          backdropFilter: "blur(20px)",
          padding: "12px 5%",
          borderBottom: "1px solid rgba(255,255,255,0.2)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src={lyricIconUrl}
            alt="LyricLingo"
            style={{ width: "28px", height: "28px", borderRadius: "6px" }}
          />
          <span style={{ fontWeight: "bold", fontSize: "20px" }}>
            LyricaLingo
          </span>
        </div>

        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button style={navBtn} onClick={() => navigate("/home")}>
            <Home size={18} /> Home
          </button>
          <button style={navBtn} onClick={() => navigate("/lessons")}>
            <Book size={18} /> Lessons
          </button>
          <button style={navBtn} onClick={() => navigate("/game")}>
            <Gamepad2 size={18} /> Game
          </button>
          <button style={navBtn} onClick={() => navigate("/music")}>
            <Headphones size={18} /> Music
          </button>
          <button style={navBtn} onClick={() => navigate("/progression")}>
            <User size={18} /> Profile
          </button>
          <button
            style={navBtn}
            onClick={logout}
            onMouseOver={(e) =>
              (e.currentTarget.style.background = "rgba(239, 68, 68, 0.2)")
            }
            onMouseOut={(e) =>
              (e.currentTarget.style.background = "rgba(255, 255, 255, 0.1)")
            }
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </nav>

      {/* Game Section */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
        }}
      >
        <div
          style={{
            background: "rgba(255,255,255,0.1)",
            padding: "2rem",
            borderRadius: "20px",
            width: "min(90%, 500px)",
            textAlign: "center",
            backdropFilter: "blur(10px)",
          }}
        >
          <h1 style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>
            <Music size={24} style={{ marginRight: 8 }} />
            Lyric Quiz
          </h1>

          {!showResult ? (
            <>
              <p style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>
                “{quizData[current].lyric}”
              </p>

              <div style={{ display: "grid", gap: "12px" }}>
                {quizData[current].options.map((opt) => (
                  <button
                    key={opt}
                    onClick={() => handleSelect(opt)}
                    disabled={!!selected}
                    style={{
                      background:
                        selected === opt
                          ? opt === quizData[current].correct
                            ? "rgba(16,185,129,0.4)" // green
                            : "rgba(239,68,68,0.4)" // red
                          : "rgba(255,255,255,0.15)",
                      border: "1px solid rgba(255,255,255,0.3)",
                      borderRadius: "10px",
                      padding: "10px 15px",
                      color: "white",
                      cursor: "pointer",
                      fontSize: "1rem",
                      transition: "all 0.2s ease",
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              <p style={{ marginTop: "1rem", opacity: 0.8 }}>
                Question {current + 1} / {quizData.length}
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>
                Quiz Complete!
              </h2>
              <p style={{ fontSize: "1.2rem", marginBottom: "1rem" }}>
                You scored {score} out of {quizData.length}.
              </p>
              <button
                onClick={handleRestart}
                style={{
                  background: "rgba(255,255,255,0.2)",
                  border: "1px solid rgba(255,255,255,0.3)",
                  borderRadius: "10px",
                  padding: "10px 20px",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Play Again
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const navBtn = {
  padding: "10px 16px",
  background: "rgba(255, 255, 255, 0.1)",
  border: "1px solid rgba(255, 255, 255, 0.2)",
  borderRadius: "8px",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: "6px",
  fontSize: "14px",
  transition: "all 0.2s ease",
};
