// index.js
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import '../src/auth.js';
import dotenv from 'dotenv';
import {Test_Query, Validate_mail} from '../my-react-app/server/test.js';
dotenv.config();


const app = express();
const PORT = 5000;


app.use(cors({
  origin: 'http://localhost:5173',
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
  (req, res) => {
    // ดึงข้อมูล user จาก Google
    const user = {
      name: req.user.displayName,
      email: req.user.emails?.[0]?.value,
      photo: req.user.photos?.[0]?.value,
    };

    // ส่งกลับ frontend
    const userData = encodeURIComponent(JSON.stringify(user));
    res.redirect(`http://localhost:5173/login?user=${userData}`);
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

app.post('/Verify', Validate_mail); // Validate email

app.post('/register', Register); // Register user

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
