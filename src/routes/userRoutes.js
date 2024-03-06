const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const controller = require('../controllers/userController');

router.get(
  '/google',
  passport.authenticate('auth-google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user;
    if (req.session.user) {
      res.status(200).json(req.session.user);
    } else {
      res.status(404).json({ error: 'Ha ocurrido un error' });
    }
  }
);

router.post('/session/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    req.session.user = user;
    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const findUser = await controller.findUserForEmail({
      email,
    });
    if (findUser) {
      res.status(402).json({ error: 'existing user' });
    } else {
      const newUser = await controller.createUser({
        name,
        email,
        password,
      });
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/profile', async (req, res) => {
  const user = req.session.user;
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(401).json({});
  }
});

module.exports = router;
