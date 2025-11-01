// index.js
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import * as auth from './auth.js';
import { Login, Register, Song_Play, Validate_mail } from './function.js';
import { pool } from './supabaseClient.js';


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
  origin: 'http://localhost:5173', // Allow requests from the React frontend
  credentials: true,
}));

app.use(express.json());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// Route สำหรับเริ่ม Google OAuth
app.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] })
);

app.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  async(req, res) => {

    // ดึงข้อมูล user จาก Google
    const user = {
      name: req.user.displayName,
      email: req.user.emails?.[0]?.value,
      photo: req.user.photos?.[0]?.value,
    };
    //Check user information
    //console.log("Authenticated user:", user);
    //Check if user exist
    // const Exist = await Check_Exist(user.email);
    // if(!Exist){
        //if not exist create user in DB
    //   const new_User = await Create_Acc(user.email);
    // }


    // ส่งกลับ frontend
    const userData = encodeURIComponent(JSON.stringify(user));
    //Redirected to frontend with user data
    res.status(200).redirect(`http://localhost:5173/login?user=${userData}`);
  }
);

app.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    req.session.destroy(() => {
      res.clearCookie('connect.sid'); // เคลียร์ cookie session ด้วย
      res.redirect('http://localhost:5173/login');
    });
  });
});

// app.post('/Verify', Validate_mail(pool)); // Validate email

app.post('/register', Register(pool)); // Register user

app.post('/login', Login(pool)); // Login user

// app.get('/song/:id/play', Song_Play(pool)); // Play song and increment play count

// Mock route สำหรับ Dev / E2E testing
app.get('/auth/google/callback-mock', (req, res) => {
  // set session / cookie แบบ dev
  req.session.user = { email: 'testuser@example.com', name: 'Test User' };
  // redirect ไปหน้า home ของ frontend
  res.redirect('http://localhost:5173/home');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Simple health endpoint to check server and DB connectivity
app.get('/health', async (req, res) => {
  try {
    // Attempt a trivial DB query to verify connection
    const result = await pool.query('SELECT 1');
    if (result) {
      return res.status(200).json({ status: 'ok', db: 'connected' });
    }
    return res.status(200).json({ status: 'ok', db: 'unknown' });
  } catch (err) {
    console.error('Health check DB error:', err);
    return res.status(500).json({ status: 'ok', db: 'disconnected', error: err.message });
  }
});
