const express = require('express');
const { pool } = require('./supabaseClient');

const router = express.Router();

// Get song by ID or slug, with optional lyrics fetching
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { includeLyrics } = req.query; // Check if lyrics should be included
        let result;
        
        // Check if id is numeric
        if (!isNaN(id)) {
            result = await pool.query(
                "SELECT song_id, title, artist, song_path_file, lyric_path_file FROM song WHERE song_id = $1",
                [id]
            );
        } else {
            // Handle string IDs (slugs)
            const songMapping = {
                'bluebird': {
                    title: 'Blue Bird',
                    artist: 'Ikimonogakari',
                    song_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Fsongs%2FNaruto_Shippuuden_-_Ikimono-gakari_-_Blue_Bird_(SkySound.cc).mp3?alt=media',
                    lyric_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Flyrics%2FIkimonogakari%20-%20Blue%20Bird.lrc?alt=media'
                },
                'yoasobi': {
                    title: '夜に駆ける (Yoru ni Kakeru)',
                    artist: 'YOASOBI',
                    song_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Fsongs%2FYOASOBI_YoruNiKakeru.mp3?alt=media',
                    lyric_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Flyrics%2FYOASOBI%20-%20%E5%A4%9C%E3%81%AB%E9%A7%86%E3%81%91%E3%82%8B%20(Yoru%20ni%20kakeru)%20Racing%20into%20the%20night%20%5BEnglish%20%26%20Romaji%5D.lrc?alt=media'
                },
                'gurenge': {
                    title: 'Gurenge',
                    artist: 'LiSA',
                    song_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Fsongs%2FLiSA_-_Gurenge_Demon_Slayer_Kimetsu_No_Yaiba_OST_-_Opening_(SkySound.cc).mp3?alt=media',
                    lyric_path_file: 'https://firebasestorage.googleapis.com/v0/b/lyricallingo-d7be6.firebasestorage.app/o/upload%2Flyrics%2FLiSA%20%E2%80%A2%20Gurenge.lrc?alt=media'
                }
            };

            if (songMapping[id]) {
                result = { rows: [{ ...songMapping[id], song_id: id }] };
            }
        }

        if (!result || result.rows.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        const songData = result.rows[0];

        // If includeLyrics query param is present, fetch and include lyrics
        if (includeLyrics === 'true' && songData.lyric_path_file) {
            try {
                const lyricsResponse = await fetch(songData.lyric_path_file);
                
                if (lyricsResponse.ok) {
                    const lyricsText = await lyricsResponse.text();
                    songData.lyrics = lyricsText;
                } else {
                    console.warn(`Failed to fetch lyrics for song ${id}`);
                    songData.lyrics = null;
                }
            } catch (lyricError) {
                console.error('Error fetching lyrics:', lyricError);
                songData.lyrics = null;
            }
        }

        res.status(200).json(songData);
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).json({ message: "Error fetching song", error: error.message });
    }
});

module.exports = router;