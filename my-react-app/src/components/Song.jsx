// src/components/Song.jsx
import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Home } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Song = () => {
  const navigate = useNavigate();
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);

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

  // 🎧 Update time and handle loop
  useEffect(() => {
    const audio = audioRef.current;
    const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
    const handleLoadedMetadata = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isLoop) {
        audio.currentTime = 0;
        audio.play();
      } else {
        setIsPlaying(false);
      }
    };

    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [isLoop]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, audioRef.current.currentTime - 5);
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, audioRef.current.currentTime + 5);
    }
  };

  const handleProgressClick = (e) => {
    const rect = progressRef.current.getBoundingClientRect();
    const percent = (e.clientX - rect.left) / rect.width;
    const newTime = percent * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const goToHomepage = () => {
    navigate('/');
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
      position: "relative",
    },
    homeButton: {
      position: "absolute",
      top: "2rem",
      left: "2rem",
      display: "flex",
      alignItems: "center",
      gap: "0.5rem",
      background: "rgba(255,255,255,0.2)",
      padding: "0.75rem 1.5rem",
      borderRadius: "24px",
      cursor: "pointer",
      border: "none",
      color: "white",
      fontSize: "1rem",
      transition: "background 0.3s ease",
      backdropFilter: "blur(10px)",
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
      cursor: "pointer",
      position: "relative",
    },
    progress: {
      width: `${(currentTime / duration) * 100 || 0}%`,
      height: "100%",
      background: "linear-gradient(90deg,#c084fc,#fbcdfdff)",
      transition: "width 0.25s linear",
    },
    timeDisplay: {
      display: "flex",
      justifyContent: "space-between",
      width: "80%",
      fontSize: "0.875rem",
      color: "rgba(255,255,255,0.7)",
      marginBottom: "1rem",
    },
    controls: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "1.5rem",
      marginBottom: "1.5rem",
    },
    iconButton: {
      cursor: "pointer",
      transition: "transform 0.2s ease, opacity 0.2s ease",
      opacity: 0.7,
    },
    activeButton: {
      opacity: 1,
      color: "#fbcdfdff",
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
      marginBottom: "0.5rem",
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
      <button 
        style={styles.homeButton}
        onClick={goToHomepage}
        onMouseEnter={(e) => e.target.style.background = "rgba(255,255,255,0.3)"}
        onMouseLeave={(e) => e.target.style.background = "rgba(255,255,255,0.2)"}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <img src={song.cover} alt="cover" style={styles.cover} />
      <h1 style={styles.title}>{song.title}</h1>
      <p style={styles.artist}>By {song.artist}</p>

      <div 
        ref={progressRef}
        style={styles.progressContainer}
        onClick={handleProgressClick}
      >
        <div style={styles.progress}></div>
      </div>

      <div style={styles.timeDisplay}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div style={styles.controls}>
        <Shuffle 
          size={24} 
          style={{
            ...styles.iconButton,
            ...(isShuffle ? styles.activeButton : {})
          }}
          onClick={() => setIsShuffle(!isShuffle)}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <SkipBack 
          size={24} 
          style={styles.iconButton}
          onClick={skipBackward}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        {isPlaying ? (
          <Pause 
            size={32} 
            onClick={togglePlay} 
            style={{...styles.iconButton, opacity: 1}}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          />
        ) : (
          <Play 
            size={32} 
            onClick={togglePlay} 
            style={{...styles.iconButton, opacity: 1}}
            onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
            onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
          />
        )}
        <SkipForward 
          size={24} 
          style={styles.iconButton}
          onClick={skipForward}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
        <Repeat 
          size={24} 
          style={{
            ...styles.iconButton,
            ...(isLoop ? styles.activeButton : {})
          }}
          onClick={() => setIsLoop(!isLoop)}
          onMouseEnter={(e) => e.target.style.transform = "scale(1.1)"}
          onMouseLeave={(e) => e.target.style.transform = "scale(1)"}
        />
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