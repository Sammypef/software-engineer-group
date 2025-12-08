//auth.js
const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

// Only configure Google OAuth strategy when env vars are provided.
const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (googleClientID && googleClientSecret) {
  passport.use(new GoogleStrategy({
    clientID: googleClientID,
    clientSecret: googleClientSecret,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, done) => {
    return done(null, profile);
  }));
} else if (!process.env.FUNCTIONS_EMULATOR) {
  console.warn('Google OAuth not configured: GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET is missing.');
}


passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
