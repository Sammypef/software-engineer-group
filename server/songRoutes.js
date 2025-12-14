import express from 'express';
import { pool } from './supabaseClient.js';

const router = express.Router();

// Get song by ID or slug
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        let result;
        
        // Check if id is numeric
        if (!isNaN(id)) {
            result = await pool.query(
                "SELECT song_id, title, artist, song_path_file, lyric_path_file FROM songs WHERE song_id = $1",
                [id]
            );
        } else {
            // Handle string IDs (slugs)
            const songMapping = {
                'bluebird': {
                    title: 'Blue Bird',
                    artist: 'Ikimonogakari',
                    song_path_file: 'upload/songs/Naruto_Shippuuden_-_Ikimono-gakari_-_Blue_Bird_(SkySound.cc).mp3',
                    lyric_path_file: 'upload/lyrics/Ikimonogakari - Blue Bird.lrc'
                },
                'yoasobi': {
                    title: '夜に駆ける (Yoru ni Kakeru)',
                    artist: 'YOASOBI',
                    song_path_file: 'upload/songs/YOASOBI_YoruNiKakeru.mp3',
                    lyric_path_file: 'upload/lyrics/YOASOBI - (Yoru ni kakeru) Racing into the night [English & Romaji].lrc'
                },
                'gurenge': {
                    title: 'Gurenge',
                    artist: 'LiSA',
                    song_path_file: 'upload/songs/LiSA_-_Gurenge_Demon_Slayer_Kimetsu_No_Yaiba_OST_-_Opening_(SkySound.cc).mp3',
                    lyric_path_file: 'upload/lyrics/LiSA - Gurenge.lrc'
                }
            };

            if (songMapping[id]) {
                result = { rows: [{ ...songMapping[id], song_id: id }] };
            }
        }

        if (!result || result.rows.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(result.rows[0]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Song not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (error) {
        console.error('Error fetching song:', error);
        res.status(500).json({ message: "Error fetching song", error: error.message });
    }
});

export default router;