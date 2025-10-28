// src/components/Song.jsx
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle } from "lucide-react";

const Song = () => {
  const audioRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const song = {
    title: "夜に駆ける (Yoru ni Kakeru)",
    artist: "YOASOBI",
    cover: "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/lyricicon.png",
    audioSrc: "http://localhost:5000/upload/songs/YOASOBI_YoruNiKakeru.mp3",
    lrcSrc: "http://localhost:5000/upload/lyrics/YOASOBI - 夜に駆ける (Yoru ni kakeru) Racing into the night [English & Romaji].lrc",
  };

  // 🧠 Parse LRC lyrics
  useEffect(() => {
    fetch(song.lrcSrc)
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .split("\n")
          .map((line) => {
            const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
            if (match) {
              const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
              return { time, text: match[3].trim() };
            }
            return null;
          })
          .filter(Boolean);
        setLyrics(parsed);
      });
  }, []);

  // 🎧 Update lyric sync
  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    return () => audio.removeEventListener("timeupdate", handleTimeUpdate);
  }, []);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(135deg, #6f0097ff 0%, #ba378dff 50%, #b4ae63ff 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      padding: "2rem",
      textAlign: "center",
    },
    cover: {
      width: "200px",
      height: "200px",
      borderRadius: "16px",
      marginBottom: "1rem",
      boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
    },
    title: { fontSize: "1.8rem", fontWeight: "bold" },
    artist: { color: "#fbcdfdff", marginBottom: "1rem" },
    progressContainer: {
      width: "80%",
      height: "8px",
      background: "rgba(255,255,255,0.2)",
      borderRadius: "4px",
      overflow: "hidden",
      margin: "1rem 0",
    },
    progress: {
      width: `${(currentTime / audioRef.current?.duration) * 100 || 0}%`,
      height: "100%",
      background: "linear-gradient(90deg,#c084fc,#fbcdfdff)",
      transition: "width 0.25s linear",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    lyrics: {
      maxHeight: "200px",
      overflowY: "auto",
      width: "80%",
      background: "rgba(255,255,255,0.1)",
      borderRadius: "12px",
      padding: "1rem",
      textAlign: "center",
      backdropFilter: "blur(10px)",
    },
    line: {
      opacity: 0.5,
      transition: "opacity 0.3s ease, transform 0.3s ease",
    },
    activeLine: {
      opacity: 1,
      color: "#ffffff",
      fontWeight: "bold",
      transform: "scale(1.05)",
    },
  };

  const activeIndex = lyrics.findIndex(
    (l, i) =>
      currentTime >= l.time &&
      (i === lyrics.length - 1 || currentTime < lyrics[i + 1].time)
  );

  return (
    <div style={styles.container}>
      <img src={song.cover} alt="cover" style={styles.cover} />
      <h1 style={styles.title}>{song.title}</h1>
      <p style={styles.artist}>By {song.artist}</p>

      <div style={styles.progressContainer}>
        <div style={styles.progress}></div>
      </div>

      <div style={styles.controls}>
        <Shuffle size={24} />
        <SkipBack size={24} />
        {isPlaying ? (
          <Pause size={28} onClick={togglePlay} style={{ cursor: "pointer" }} />
        ) : (
          <Play size={28} onClick={togglePlay} style={{ cursor: "pointer" }} />
        )}
        <SkipForward size={24} />
        <Repeat size={24} />
      </div>

      <div style={styles.lyrics}>
        {lyrics.map((line, i) => (
          <div
            key={i}
            style={
              i === activeIndex
                ? { ...styles.line, ...styles.activeLine }
                : styles.line
            }
          >
            {line.text}
          </div>
        ))}
      </div>

      <audio ref={audioRef} src={song.audioSrc} />
    </div>
  );
};

export default Song;