const express = require('express');
const { pool } = require('./supabaseClient');

const router = express.Router();

// Record a played song into history
// Body: { user_id, song_id?, title?, song_file_path?, slug? }
router.post('/', async (req, res) => {
  try {
    const { user_id } = req.body;
    let { song_id, title, song_file_path, slug } = req.body;

    if (!user_id) return res.status(400).json({ message: 'user_id is required' });

    // Try to resolve song_id if not provided
    if (!song_id) {
      // First try by slug (for our custom song mapping)
      if (slug) {
        const songMapping = {
          'bluebird': 2,
          'yoasobi': 1,
          'gurenge': 3
        };
        song_id = songMapping[slug.toLowerCase()];
      }

      // Try by song_file_path
      if (!song_id && song_file_path) {
        const q = await pool.query('SELECT song_id FROM song WHERE song_file_path = $1 LIMIT 1', [song_file_path]);
        if (q.rows.length) song_id = q.rows[0].song_id;
      }

      // Try by title
      if (!song_id && title) {
        const q2 = await pool.query('SELECT song_id FROM song WHERE LOWER(title) = LOWER($1) LIMIT 1', [title]);
        if (q2.rows.length) song_id = q2.rows[0].song_id;
      }
    }

    if (!song_id) {
      console.error('❌ Could not resolve song_id from:', { title, song_file_path, slug });
      return res.status(400).json({ message: 'Could not resolve song_id from provided data' });
    }

    console.log(`✅ Recording history: user_id=${user_id}, song_id=${song_id}`);
    
    // Delete old history entry for this song by this user (keep only latest play)
    await pool.query('DELETE FROM history WHERE user_id = $1 AND song_id = $2', [user_id, song_id]);
    
    // Insert new history entry
    const insert = await pool.query(
      'INSERT INTO history (user_id, song_id) VALUES ($1, $2) RETURNING history_id, user_id, song_id, listened_at',
      [user_id, song_id]
    );

    return res.status(201).json(insert.rows[0]);
  } catch (err) {
    console.error('Error recording history:', err);
    return res.status(500).json({ message: 'Error recording history', error: err.message });
  }
});

// Get recent history for a user (default limit 10)
router.get('/:user_id', async (req, res) => {
  try {
    const user_id = parseInt(req.params.user_id, 10); // Convert to integer
    const limit = parseInt(req.query.limit || '10', 10);

    console.log(`📚 Fetching history for user_id=${user_id}, limit=${limit}`);

    const q = await pool.query(
      `SELECT h.history_id, h.user_id, h.song_id, h.listened_at, s.title, s.artist, s.song_file_path
       FROM history h
       JOIN song s ON s.song_id = h.song_id
       WHERE h.user_id = $1
       ORDER BY h.listened_at DESC
       LIMIT $2`,
      [user_id, limit]
    );

    console.log(`📚 Found ${q.rows.length} history entries`);
    if (q.rows.length > 0) {
      console.log('📚 First entry:', q.rows[0]);
    }

    if (q.rows.length === 0) {
      return res.status(200).json({ rows: [] });
    }

    return res.status(200).json({ rows: q.rows });
  } catch (err) {
    console.error('Error fetching history:', err);
    return res.status(500).json({ message: 'Error fetching history', error: err.message });
  }
});

module.exports = router;
