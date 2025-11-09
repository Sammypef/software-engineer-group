import express from 'express';
import { pool } from './supabaseClient.js';

const router = express.Router();

// Get song by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query(
            "SELECT song_id, title, artist, song_path_file, lyric_path_file FROM songs WHERE song_id = $1",
            [id]
        );

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