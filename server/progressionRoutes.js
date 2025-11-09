import express from 'express';
import { pool } from './supabaseClient.js';

const router = express.Router();

// Get progression for a user
router.get('/:user_id', async (req, res) => {
  try {
    const { user_id } = req.params;
    const result = await pool.query(
      'SELECT user_id, level, exp FROM progression WHERE user_id = $1',
      [user_id]
    );

    if (result.rows.length === 0) {
      // If progression doesn't exist, create a default record
      const insert = await pool.query(
        'INSERT INTO progression (user_id, level, exp) VALUES ($1, 1, 0) RETURNING user_id, level, exp',
        [user_id]
      );
      return res.status(200).json(insert.rows[0]);
    }

    return res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching progression:', err);
    return res.status(500).json({ message: 'Error fetching progression', error: err.message });
  }
});

// Award EXP to a user and handle level ups
router.post('/:user_id/award', async (req, res) => {
  try {
    const { user_id } = req.params;
    const award = parseInt(req.body.exp || 0, 10);

    if (isNaN(award) || award <= 0) {
      return res.status(400).json({ message: 'Invalid exp amount' });
    }

    // Fetch or create current progression
    let result = await pool.query('SELECT user_id, level, exp FROM progression WHERE user_id = $1', [user_id]);
    let progression;
    if (result.rows.length === 0) {
      const insert = await pool.query('INSERT INTO progression (user_id, level, exp) VALUES ($1, 1, 0) RETURNING user_id, level, exp', [user_id]);
      progression = insert.rows[0];
    } else {
      progression = result.rows[0];
    }

    let { level, exp } = progression;
    let totalExp = exp + award;

    // Level cap rules: level 1 cap = 300, each additional level adds 100 to cap
    const getCap = (lvl) => 300 + (lvl - 1) * 100;

    // Apply level ups while totalExp exceeds current cap
    while (totalExp >= getCap(level)) {
      totalExp -= getCap(level);
      level += 1;
    }

    // Update DB
    const updated = await pool.query(
      'UPDATE progression SET level = $1, exp = $2 WHERE user_id = $3 RETURNING user_id, level, exp',
      [level, totalExp, user_id]
    );

    const updatedRow = updated.rows[0];
    return res.status(200).json({ ...updatedRow, expCap: getCap(updatedRow.level) });
  } catch (err) {
    console.error('Error awarding exp:', err);
    return res.status(500).json({ message: 'Error awarding exp', error: err.message });
  }
});

export default router;
