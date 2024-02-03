const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./models/user.model.js'); // Assuming you have a User model set up with Mongoose

passport.use(new GoogleStrategy({
    clientID: "882837302688-cd01k100cqlil3fgc4t7oo4v4q543avp.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, cb) {
    try {
      let user = await User.findOne({ googleId: profile.id });
      if (!user) {
        user = await User.create({ googleId: profile.id });
      }
      cb(null, user);
    } catch (err) {
      cb(err, null);
    }
  }
));

passport.serializeUser(function(user, done) {
    done(null, user.id); // or user._id if you're using MongoDB's ObjectID
  });

  passport.deserializeUser(async function(id, done) {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err, null);
    }
  });

  module.exports = passport;