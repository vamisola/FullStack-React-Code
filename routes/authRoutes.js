const passport = require('passport');

module.exports = (app) => {

  // send to Google to do the authentication
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

  app.get('/auth/google/callback',
    passport.authenticate('google'));

  app.get('/api/logout', (req, res) => {
    req.logout();
    res.send(req.user);
  });

  // send to facebook to do the authentication
  app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['public_profile', 'email'] }));

  // handle the callback after facebook has authenticated the user
  app.get('/auth/facebook/callback',
      passport.authenticate('facebook'));

  app.get('/api/current_user', (req, res) => {
    res.send(req.user);
  });
};
