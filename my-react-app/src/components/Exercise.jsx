import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, RefreshCcw } from "lucide-react";

export default function Exercise() {
  const navigate = useNavigate();

  const pairs = [
    { jp: "Shizumu you ni tokete yuku you ni", en: "Melting into the night" },
    { jp: "Yoru ni kakeru", en: "Racing into the night" },
    { jp: "Sayonara", en: "Goodbye" },
  ];

  const [selectedJP, setSelectedJP] = useState(null);
  const [selectedEN, setSelectedEN] = useState(null);
  const [matched, setMatched] = useState([]);
  const [showWinPopup, setShowWinPopup] = useState(false);

  const handleSelect = (type, value) => {
    if (type === "jp") setSelectedJP(value);
    else setSelectedEN(value);

    if (selectedJP && type === "en") {
      const correct = pairs.find(
        (pair) => pair.jp === selectedJP && pair.en === value
      );
      if (correct) {
        setMatched([...matched, selectedJP]);
      }
      setTimeout(() => {
        setSelectedJP(null);
        setSelectedEN(null);
      }, 500);
    }
  };

  const resetGame = () => {
    setSelectedJP(null);
    setSelectedEN(null);
    setMatched([]);
    setShowWinPopup(false);
  };

  useEffect(() => {
    if (matched.length === pairs.length) {
      setTimeout(() => {
        setShowWinPopup(true);
      }, 400);
    }
  }, [matched]);

  return (
    <div style={styles.container}>
      {/* 🏠 Home Button */}
      <button style={styles.homeButton} onClick={() => navigate("/")}>
        <Home size={18} /> Home
      </button>

      {/* 🔄 Restart Button */}
      <button style={styles.refreshButton} onClick={resetGame}>
        <RefreshCcw size={18} /> Restart
      </button>

      <div style={styles.content}>
        <h1 style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
          🎶 Match the Lyric 🎶
        </h1>
        <p style={{ marginBottom: "2rem", fontSize: "1.1rem" }}>
          Match each Japanese lyric with its English translation!
        </p>

        <div style={styles.gameArea}>
          {/* Left column (Japanese lyrics) */}
          <div style={styles.column}>
            {pairs.map((pair, index) => (
              <div
                key={index}
                style={{
                  ...styles.card,
                  background: matched.includes(pair.jp)
                    ? "rgba(0,255,0,0.3)"
                    : selectedJP === pair.jp
                    ? "rgba(255,255,255,0.4)"
                    : styles.card.background,
                }}
                onClick={() => handleSelect("jp", pair.jp)}
              >
                {pair.jp}
              </div>
            ))}
          </div>

          {/* Right column (English translations) */}
          <div style={styles.column}>
            {pairs
              .map((pair) => pair.en)
              .sort(() => Math.random() - 0.5)
              .map((en, index) => (
                <div
                  key={index}
                  style={{
                    ...styles.card,
                    background: matched.some((m) => {
                      const found = pairs.find((p) => p.jp === m);
                      return found && found.en === en;
                    })
                      ? "rgba(0,255,0,0.3)"
                      : selectedEN === en
                      ? "rgba(255,255,255,0.4)"
                      : styles.card.background,
                  }}
                  onClick={() => handleSelect("en", en)}
                >
                  {en}
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* 🎉 Win Popup */}
      {showWinPopup && (
        <div style={styles.popupOverlay}>
          <div style={styles.popupBox}>
            <h2 style={{ marginBottom: "1rem" }}>🎉 You Win! 🎉</h2>
            <p style={{ marginBottom: "1.5rem" }}>
              You’ve matched all the lyrics correctly!
            </p>
            <button style={styles.playAgainButton} onClick={resetGame}>
              🔁 Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    width: "100vw",
    background:
      "linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    position: "relative",
  },
  homeButton: {
    position: "absolute",
    top: "20px",
    left: "20px",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    borderRadius: "20px",
    padding: "0.6rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  refreshButton: {
    position: "absolute",
    top: "20px",
    right: "20px",
    display: "flex",
    alignItems: "center",
    gap: "0.4rem",
    background: "rgba(255,255,255,0.2)",
    border: "none",
    color: "white",
    borderRadius: "20px",
    padding: "0.6rem 1rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
    backdropFilter: "blur(10px)",
  },
  content: {
    textAlign: "center",
    width: "100%",
    maxWidth: "900px",
    padding: "1rem",
  },
  gameArea: {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
    gap: "3rem",
    flexWrap: "wrap",
  },
  column: {
    display: "flex",
    flexDirection: "column",
    gap: "0.8rem",
  },
  card: {
    background: "rgba(255,255,255,0.15)",
    borderRadius: "12px",
    padding: "0.8rem 1.5rem",
    cursor: "pointer",
    transition: "background 0.3s ease, transform 0.2s ease",
    fontSize: "1rem",
    backdropFilter: "blur(8px)",
    textAlign: "center",
    minWidth: "220px",
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.5s ease",
  },
  popupBox: {
    background: "rgba(255,255,255,0.15)",
    padding: "2rem 3rem",
    borderRadius: "16px",
    textAlign: "center",
    backdropFilter: "blur(12px)",
    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
    animation: "popUp 0.4s ease",
  },
  playAgainButton: {
    background: "rgba(255,255,255,0.3)",
    color: "white",
    border: "none",
    borderRadius: "12px",
    padding: "0.6rem 1.2rem",
    cursor: "pointer",
    fontSize: "1rem",
    transition: "background 0.3s ease",
  },
};