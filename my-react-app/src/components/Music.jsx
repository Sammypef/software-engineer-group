// src/components/Music.jsx
import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Music, Heart, Clock, Disc } from "lucide-react";
import { motion } from "framer-motion";

export default function Music() {
  const [history, setHistory] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [liked, setLiked] = useState([]);
  const [albums, setAlbums] = useState([]);

  // Example demo data
  useEffect(() => {
    setHistory([
      { title: "夜に駆ける (Yoru ni Kakeru)", artist: "YOASOBI", cover: "/images/yoasobi.jpg" },
      { title: "アイドル (Idol)", artist: "YOASOBI", cover: "/images/idol.jpg" },
    ]);
    setPlaylists([
      { name: "Japanese Hits", count: 25 },
      { name: "Lofi Study", count: 18 },
    ]);
    setLiked([
      { title: "Racing into the Night", artist: "YOASOBI" },
      { title: "Pretender", artist: "Official髭男dism" },
    ]);
    setAlbums([
      { name: "The Book", artist: "YOASOBI", cover: "/images/thebook.jpg" },
    ]);
  }, []);

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-2">Your Music</h1>

      {/* BROWSING HISTORY */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Clock className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Browsing History</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {history.map((song, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="cursor-pointer"
            >
              <Card className="overflow-hidden rounded-2xl shadow-md">
                <img
                  src={song.cover}
                  alt={song.title}
                  className="w-full h-36 object-cover"
                />
                <CardContent className="p-3">
                  <p className="font-semibold text-sm">{song.title}</p>
                  <p className="text-xs text-gray-500">{song.artist}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* PLAYLISTS */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Music className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Playlists</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {playlists.map((p, i) => (
            <Card key={i} className="p-4 rounded-2xl shadow-md">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-sm text-gray-500">{p.count} songs</p>
              <Button className="mt-3 w-full">Open Playlist</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* LIKED SONGS */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-pink-500" />
          <h2 className="text-xl font-semibold">Liked Songs</h2>
        </div>
        <div className="space-y-2">
          {liked.map((song, i) => (
            <Card key={i} className="p-3 flex items-center justify-between shadow-md rounded-xl">
              <div>
                <p className="font-semibold">{song.title}</p>
                <p className="text-sm text-gray-500">{song.artist}</p>
              </div>
              <Button size="sm" variant="outline">Play</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* ALBUMS */}
      <section>
        <div className="flex items-center gap-2 mb-3">
          <Disc className="w-5 h-5" />
          <h2 className="text-xl font-semibold">Albums</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {albums.map((album, i) => (
            <Card key={i} className="overflow-hidden rounded-2xl shadow-md">
              <img
                src={album.cover}
                alt={album.name}
                className="w-full h-36 object-cover"
              />
              <CardContent className="p-3">
                <p className="font-semibold text-sm">{album.name}</p>
                <p className="text-xs text-gray-500">{album.artist}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}