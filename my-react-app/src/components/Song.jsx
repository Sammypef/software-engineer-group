import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Shuffle, Home } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Song = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get song ID from URL
  const audioRef = useRef(null);
  const progressRef = useRef(null);
  const [lyrics, setLyrics] = useState([]);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isLoop, setIsLoop] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);

  const [song, setSong] = useState({
    title: "夜に駆ける (Yoru ni Kakeru)",
    artist: "YOASOBI",
    cover: "https://raw.githubusercontent.com/Sammypef/software-engineer-group/image/gif-host/lyricicon.png",
    audioSrc: "http://localhost:5000/upload/songs/YOASOBI_YoruNiKakeru.mp3",
    lrcSrc:
      "http://localhost:5000/upload/lyrics/YOASOBI - 夜に駆ける (Yoru ni kakeru) Racing into the night [English & Romaji].lrc",
  });

  // Fetch song metadata from server based on URL parameter
  useEffect(() => {
    const fetchSong = async () => {
      try {
        // Use the ID from URL params, or default to 1
        const songId = id || 1;
        const res = await fetch(`http://localhost:5000/api/songs/${songId}`);
        if (!res.ok) throw new Error(`Failed to fetch song: ${res.status}`);
        const data = await res.json();

        setSong((prev) => ({
          title: data.title || prev.title,
          artist: data.artist || prev.artist,
          cover: prev.cover,
          audioSrc: data.song_path_file ? `http://localhost:5000/${data.song_path_file}` : prev.audioSrc,
          lrcSrc: data.lyric_path_file ? `http://localhost:5000/${data.lyric_path_file}` : prev.lrcSrc,
        }));
      } catch (err) {
        console.error("Song fetch failed, using fallback:", err);
      }
    };

    fetchSong();
  }, [id]); // Re-fetch when ID changes

  // 🎵 Flexible annotation system - use partial text matching
  // Just include a unique part of the lyric line you want to annotate
  const annotations = {
    "shizumu": "This lyric metaphorically describes melting into the night — a poetic image of fading or transformation.",
    "yoru ni kakeru": "Means 'Racing into the Night' — symbolizes running toward an uncertain or emotional destiny.",
    "sayonara": "A Japanese farewell meaning 'Goodbye', often expressing final separation.",
    "racing into the night": "The English translation of the song title, representing escape and transformation.",
    "goodbye": "A moment of farewell and finality in the narrative.",
    "gurenge": "Means 'Red Lotus' — symbolizes burning passion and determination.",
    "tsuyoku": "Means 'strong' or 'strongly' — represents inner strength and resilience.",
    "blue bird": "A symbol of hope and freedom, representing the pursuit of dreams.",
    "habataitara": "Means 'if I spread my wings' — expressing the desire to fly toward one's goals.",
  };

  // Helper function to find annotation for a lyric line
  const getAnnotation = (lineText) => {
    if (!lineText) return null;
    const normalized = lineText.toLowerCase().trim();
    
    // Find if any annotation key matches part of this line
    for (const [key, value] of Object.entries(annotations)) {
      if (normalized.includes(key.toLowerCase())) {
        return value;
      }
    }
    return null;
  };

  // 🧠 Parse LRC lyrics (runs when the lyrics source changes)
  useEffect(() => {
    if (!song.lrcSrc) return;

    fetch(song.lrcSrc)
      .then((res) => res.text())
      .then((text) => {
        const parsed = text
          .split("\n")
          .map((line) => {
            const match = line.match(/\[(\d{2}):(\d{2}\.\d{2})\](.*)/);
            if (match) {
              const time = parseInt(match[1]) * 60 + parseFloat(match[2]);
              const text = match[3].trim();
              return { time, text };
            }
            return null;
          })
          .filter(Boolean)
          .filter(line => line.text.length > 0); // Remove empty lines
        
        setLyrics(parsed);
        
        // Debug: Show which lines have annotations
        console.log("📝 Lyrics loaded:", parsed.length, "lines");
        console.log("💬 Lines with annotations:", 
          parsed.filter(l => getAnnotation(l.text)).map(l => l.text)
        );
      })
      .catch(err => {
        console.error("Error loading lyrics:", err);
      });
  }, [song.lrcSrc]);

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
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const goToHomepage = () => {
    navigate("/");
  };

  const goToExercise = () => {
    navigate("/exercise");
  };

  const handleLineClick = (lineText) => {
    // Toggle selection
    setSelectedLine(selectedLine === lineText ? null : lineText);
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
      cursor: "pointer",
      padding: "0.3rem",
      borderRadius: "4px",
    },
    activeLine: {
      opacity: 1,
      color: "#ffffff",
      fontWeight: "bold",
      transform: "scale(1.05)",
    },
    lineWithAnnotation: {
      borderBottom: "2px dotted rgba(255,255,255,0.4)",
    },
    annotationBox: {
      background: "rgba(255,255,255,0.15)",
      borderRadius: "8px",
      padding: "0.5rem",
      marginTop: "0.3rem",
      fontSize: "0.9rem",
      color: "#fff",
      fontStyle: "italic",
      backdropFilter: "blur(6px)",
      transition: "all 0.3s ease",
      textAlign: "left",
    },
    exerciseButton: {
      marginTop: "2rem",
      padding: "0.8rem 2rem",
      borderRadius: "12px",
      background: "rgba(255,255,255,0.2)",
      border: "1px solid rgba(255,255,255,0.3)",
      color: "white",
      cursor: "pointer",
      fontSize: "1rem",
      fontWeight: "500",
      backdropFilter: "blur(8px)",
      transition: "all 0.3s ease",
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
        onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
        onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
      >
        <Home size={20} />
        <span>Home</span>
      </button>

      <img src={song.cover} alt="cover" style={styles.cover} />
      <h1 style={styles.title}>{song.title}</h1>
      <p style={styles.artist}>By {song.artist}</p>

      <div ref={progressRef} style={styles.progressContainer} onClick={handleProgressClick}>
        <div style={styles.progress}></div>
      </div>

      <div style={styles.timeDisplay}>
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>

      <div style={styles.controls}>
        <Shuffle
          size={24}
          style={{ ...styles.iconButton, ...(isShuffle ? styles.activeButton : {}) }}
          onClick={() => setIsShuffle(!isShuffle)}
        />
        <SkipBack size={24} style={styles.iconButton} onClick={skipBackward} />
        {isPlaying ? (
          <Pause size={32} onClick={togglePlay} style={{ ...styles.iconButton, opacity: 1 }} />
        ) : (
          <Play size={32} onClick={togglePlay} style={{ ...styles.iconButton, opacity: 1 }} />
        )}
        <SkipForward size={24} style={styles.iconButton} onClick={skipForward} />
        <Repeat
          size={24}
          style={{ ...styles.iconButton, ...(isLoop ? styles.activeButton : {}) }}
          onClick={() => setIsLoop(!isLoop)}
        />
      </div>

      <div style={styles.lyrics}>
        {lyrics.map((line, i) => {
          const annotation = getAnnotation(line.text);
          const isActive = i === activeIndex;
          const isSelected = selectedLine === line.text;
          const hasAnnotation = annotation !== null;
          
          return (
            <div
              key={i}
              style={{
                ...styles.line,
                ...(isActive ? styles.activeLine : {}),
                ...(hasAnnotation ? styles.lineWithAnnotation : {}),
              }}
              onClick={() => handleLineClick(line.text)}
            >
              {line.text}
              {isSelected && annotation && (
                <div style={styles.annotationBox}>
                  💬 {annotation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <button
        style={styles.exerciseButton}
        onClick={goToExercise}
        onMouseEnter={(e) => (e.target.style.background = "rgba(255,255,255,0.3)")}
        onMouseLeave={(e) => (e.target.style.background = "rgba(255,255,255,0.2)")}
      >
        Go to Exercise
      </button>

      <audio ref={audioRef} src={song.audioSrc} />
    </div>
  );
};

export default Song;