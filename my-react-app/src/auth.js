import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

const GOOGLE_CLIENT_ID = '45664116241-i48nvb4q7f947hhpa6jr1asrmrk60nn5.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
