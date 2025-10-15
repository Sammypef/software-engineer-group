//auth.js
import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import dotenv from 'dotenv';
dotenv.config();


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  // const User = {
  //   'AccessToken': accessToken,
  //   'RefreshToken': refreshToken,
  //   'Profile': profile,
  //   'acaccessToken':accessToken,
  // };
  return done(null, profile);
  }
));


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
