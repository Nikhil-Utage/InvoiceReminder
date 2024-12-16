const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({
    clientID: '495661272218-4n8hkmbloorusos9o3anp7e80obesmds.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    // Here you can handle user data, e.g., save to the database
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});