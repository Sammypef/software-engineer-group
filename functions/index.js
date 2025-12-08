const {setGlobalOptions} = require("firebase-functions/v2");
const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");

setGlobalOptions({ maxInstances: 10 });

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const cors = require('cors');

// Import modules from the server directory
const { Login, Register, Song_Play } = require('./server/function');
const songRoutes = require('./server/songRoutes');
const progressionRoutes = require('./server/progressionRoutes');
const historyRoutes = require('./server/historyRoutes');
const { pool } = require('./server/supabaseClient');
require('./server/auth'); // auth.js configures passport, no need to import a specific export

const app = express();

// Your deployed frontend URL from environment variables
const frontendUrl = process.env.HOSTING_URL || 'http://localhost:5173';

// CORS configuration
const allowedOrigins = ['http://localhost:5173', frontendUrl];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Allow requests with no origin (e.g., same-origin or curl)
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      logger.warn(msg, { origin: origin });
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true,
}));

app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-default-secret-key', // Use an environment variable for secret
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: true, // Set to true for HTTPS (Firebase Hosting provides HTTPS)
    httpOnly: true,
    sameSite: 'none', // Required for cross-site cookies with secure: true
  }
}));

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth routes
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async (req, res) => {
    const user = {
      name: req.user.displayName,
      email: req.user.emails?.[0]?.value,
      photo: req.user.photos?.[0]?.value,
    };
    // Redirect back to the deployed frontend URL
    const frontendRedirectUrl = `${frontendUrl}/login?user=${encodeURIComponent(JSON.stringify(user))}`;
    res.redirect(frontendRedirectUrl);
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      // Redirect back to the deployed frontend's login page
      res.redirect(`${frontendUrl}/login`);
    });
  });
});

// API routes
app.post('/register', Register(pool));
app.post('/login', Login(pool));

// The original server/index.js served static files from an 'Upload' directory.
// For Firebase deployment, static assets should be served via Firebase Hosting or Cloud Storage.
// This line is removed. Ensure your frontend or database paths are updated to public URLs.
// app.use('/Upload', cors(), express.static('Upload'));

// Mount API routes
app.use('/api/songs', songRoutes);
app.use('/api/progression', progressionRoutes);
app.use('/api/history', historyRoutes);

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');
    if (result) {
      return res.status(200).json({ status: 'ok', db: 'connected' });
    }
    return res.status(200).json({ status: 'ok', db: 'unknown' });
  } catch (err) {
    logger.error('Health check DB error:', err);
    return res.status(500).json({ status: 'ok', db: 'disconnected', error: err.message });
  }
});

// Export the Express app as a Firebase Function
exports.api = onRequest(app);
