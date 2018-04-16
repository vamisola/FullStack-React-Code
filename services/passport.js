const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    });
});
//GOOGLE
passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: "/auth/google/callback"
  },
  (accessToken, refreshToken, profile, done) => {

    User.findOne({ userID: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the give profile ID
          done(null, existingUser);
        } else {
          // need to create new reacord
          new User({ userID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      })
    }
  )
);
//FACEBOOK
passport.use(new FacebookStrategy({
    clientID: keys.facebookClientID,
    clientSecret: keys.facebookClientSecret,
    callbackURL: "/auth/facebook/callback"
  },
  (accessToken, refreshToken, profile, done) => {

    User.findOne({ userID: profile.id }).then((existingUser) => {
        if (existingUser) {
          // we already have a record with the give profile ID
          done(null, existingUser);
        } else {
          // need to create new reacord
          new User({ userID: profile.id })
            .save()
            .then(user => done(null, user));
        }
      })
    }
  )
);
