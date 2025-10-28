// src/components/Music.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Music as MusicIcon, Heart, Clock, Disc } from "lucide-react";
import { motion } from "framer-motion";

export default function Music() {
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [liked, setLiked] = useState([]);

  useEffect(() => {
    // placeholder demo data
    setHistory([
      { id: 1, title: "Yoru ni Kakeru", artist: "Yoasobi" },
      { id: 2, title: "Blue Bird", artist: "Ikimono Gakari" },
    ]);
    setPlaylists([
      { id: 1, name: "Study Beats" },
      { id: 2, name: "J-Pop Favs" },
    ]);
    setLiked([
      { id: 1, title: "Shukufuku", artist: "YOASOBI" },
    ]);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        background:
          "linear-gradient(135deg, #6f0097 0%, #ba378d 50%, #b4ae63 100%)",
        color: "white",
      }}
    >
      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>
        <MusicIcon size={28} style={{ marginRight: 8 }} />
        My Music
      </h1>

      <section style={{ marginBottom: "2rem" }}>
        <h2><Clock size={20} /> Browsing History</h2>
        {history.map((s) => (
          <motion.div
            key={s.id}
            whileHover={{ scale: 1.05 }}
            style={{ marginTop: 10 }}
          >
            {s.title} — {s.artist}
          </motion.div>
        ))}
      </section>

      <section style={{ marginBottom: "2rem" }}>
        <h2><Disc size={20} /> Playlists</h2>
        {playlists.map((p) => (
          <motion.div key={p.id} whileHover={{ scale: 1.05 }} style={{ marginTop: 10 }}>
            {p.name}
          </motion.div>
        ))}
      </section>

      <section>
        <h2><Heart size={20} /> Liked Songs</h2>
        {liked.map((l) => (
          <motion.div key={l.id} whileHover={{ scale: 1.05 }} style={{ marginTop: 10 }}>
            {l.title} — {l.artist}
          </motion.div>
        ))}
      </section>
    </div>
  );
}