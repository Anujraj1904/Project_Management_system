const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user.js');

router.get('/login', (req, res) => {
  res.render('users/login');
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
}));


router.get('/signup', (req, res) => {
  res.render('users/signup');
});

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;
  const user = new User({ username, email });
  await User.register(user, password);
  res.redirect('/');
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if(err) {
      return next(err);
    }
    res.redirect("/");
  })
})

module.exports = router;
