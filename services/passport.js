const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;
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
    callbackURL: '/auth/google/callback',
    proxy: true
  },
  //refactor
  // (accessToken, refreshToken, profile, done) => {
  //   User.findOne({ userID: profile.id }).then((existingUser) => {
  //       if (existingUser) {
  //         // we already have a record with the give profile ID
  //         done(null, existingUser);
  //       } else {
  //         // need to create new reacord
  //         new User({ userID: profile.id })
  //           .save()
  //           .then(user => done(null, user));
  //       }
  //     })
  //   }
  // )
  //refactor end
  async (accessToken, refreshToken, profile, done) => {
    const existingUser = await User.findOne({ googleId: profile.id })
    if (existingUser) {
      return done(null, existingUser);
    }
    const user = await new User({ googleId: profile.id }).save()
    done(null,user);
    }
  )
);
//FACEBOOK
// passport.use(new FacebookStrategy({
//     clientID: keys.facebookClientID,
//     clientSecret: keys.facebookClientSecret,
//     callbackURL: "/auth/facebook/callback"
//   },
//   (accessToken, refreshToken, profile, done) => {
//
//     User.findOne({ userID: profile.id }).then((existingUser) => {
//         if (existingUser) {
//           // we already have a record with the give profile ID
//           done(null, existingUser);
//         } else {
//           // need to create new reacord
//           new User({ userID: profile.id })
//             .save()
//             .then(user => done(null, user));
//         }
//       })
//     }
//   )
// );
