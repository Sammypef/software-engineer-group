import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
} from "lucide-react";

const Song = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const song = {
    title: "夜に駆ける (Yoru ni Kakeru)",
    artist: "YOASOBI",
    cover:
      "https://i.scdn.co/image/ab67616d0000b273d5c0d3e27b5e4e1d6475e59e",
    audio:
      "http://localhost:5000/Lyric/Song/YOASOBI - 夜に駆ける (Yoru ni Kakeru) [SkySound.cc].mp3",
    lyrics: `[Intro]
Shizumu you ni tokete yuku you ni  
Futari dake no sora ga hirogaru yoru ni`,
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * audio.duration;
    audio.currentTime = newTime;
    setProgress(e.target.value);
  };

  const styles = {
    page: {
      minHeight: "100vh",
      width: "100vw",
      background:
        "linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "2rem",
      textAlign: "center",
      fontFamily: "Poppins, sans-serif",
    },
    cover: {
      width: "200px",
      height: "200px",
      borderRadius: "16px",
      marginBottom: "1rem",
      border: "3px solid rgba(255,255,255,0.2)",
    },
    title: { fontSize: "1.5rem", fontWeight: "bold", marginBottom: "0.5rem" },
    artist: { fontSize: "1rem", color: "#e9d5ff", marginBottom: "1rem" },
    progress: {
      width: "80%",
      margin: "1rem auto",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "2rem",
    },
    lyrics: {
      background: "rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "1rem",
      width: "min(90vw, 500px)",
      whiteSpace: "pre-wrap",
      lineHeight: "1.5",
    },
  };

  return (
    <div style={styles.page}>
      <button
        onClick={() => navigate("/home")}
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "none",
          color: "white",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          cursor: "pointer",
          marginBottom: "1rem",
        }}
      >
        &lt; Back
      </button>

      <img src={song.cover} alt="cover" style={styles.cover} />
      <h1 style={styles.title}>{song.title}</h1>
      <p style={styles.artist}>by {song.artist}</p>
      <button
        style={{
          background: "rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.3)",
          borderRadius: "8px",
          padding: "0.5rem 1rem",
          color: "white",
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        Exercise
      </button>

      <input
        type="range"
        min="0"
        max="100"
        value={progress}
        onChange={handleSeek}
        style={styles.progress}
      />

      <div style={styles.controls}>
        <Shuffle />
        <SkipBack />
        {isPlaying ? (
          <Pause size={36} onClick={togglePlay} cursor="pointer" />
        ) : (
          <Play size={36} onClick={togglePlay} cursor="pointer" />
        )}
        <SkipForward />
        <Repeat />
      </div>

      <div style={styles.lyrics}>
        <strong>Lyric</strong>
        <p>{song.lyrics}</p>
      </div>

      <audio
        ref={audioRef}
        src={song.audio}
        onTimeUpdate={handleTimeUpdate}
        onEnded={() => setIsPlaying(false)}
      />
    </div>
  );
};

export default Song;