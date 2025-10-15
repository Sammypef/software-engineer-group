// index.js
import express from 'express';
import session from 'express-session';
import passport from 'passport';
import cors from 'cors';
import * as auth from '../server/auth.js';
import dotenv from 'dotenv';
import { Login } from '../server/function.js';
import { pool } from './supabaseClient.js';
// import {Test_Query, Validate_mail} from '../my-react-app/server/test.js';
dotenv.config();


const app = express();
const PORT = process.env.PORT;


app.use(cors({
  origin: `http://localhost:${PORT}`,
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

//Function
const Check_Exist = async(email) => {
  try {
    const User = await pool.query("SELECT * FROM users WHERE name = $1 RETURNING name", [email]);
    if(User.rows.length != 0){
      return true;
    }else{
      return false
    }
  } catch (error) {
    console.log(error.message);
  }
}

const Create_Acc = async(email) => {
  try {
    const newUser = await pool.query("INSERT INTO users (email) VALUES $1 RETURNING *", [email]);
    return newUser;
  } catch (error) {
    console.log(error.message);
  }
}





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
      res.redirect(`http://localhost:${PORT}/login`);
    });
  });
});

// app.post('/Verify', Validate_mail); // Validate email

app.post('/register', Register); // Register user

app.post('/login', Login); // Login user

// app.get('/song/:id/play', Song_Play); // Play song and increment play count

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
