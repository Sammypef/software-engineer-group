// src/components/Game.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Music } from "lucide-react";

export default function LyricQuiz() {
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

  const handleSelect = (option) => {
    setSelected(option);
    if (option === quizData[current].correct) setScore(score + 1);

    setTimeout(() => {
      if (current + 1 < quizData.length) {
        setCurrent(current + 1);
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

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #6f0097 0%, #ba378d 50%, #b4ae63 100%)",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
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
          <Music size={24} style={{ marginRight: 8, display: "inline-block" }} />
          Lyric Quiz
        </h1>

        {!showResult ? (
          <>
            <p style={{ fontSize: "1.4rem", marginBottom: "1.5rem" }}>
              “{quizData[current].lyric}”
            </p>

            <div style={{ display: "grid", gap: "12px" }}>
              {quizData[current].options.map((opt) => (
                <motion.button
                  key={opt}
                  onClick={() => handleSelect(opt)}
                  whileHover={{ scale: 1.05 }}
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
                </motion.button>
              ))}
            </div>

            <p style={{ marginTop: "1rem", opacity: 0.8 }}>
              Question {current + 1} / {quizData.length}
            </p>
          </>
        ) : (
          <>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "1rem" }}>Quiz Complete!</h2>
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
      </motion.div>
    </div>
  );
}
