const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/User');
const controller = require('../controllers/userController');
require('dotenv').config();

const { COOKIE_NAME, CLIENT_URL } = process.env;

async function newSession(req, res, id) {
  // Función para guardar un usuario en la session
  try {
    const user = await User.findById(id, { password: 0 });
    req.session.user = user;
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

router.get(
  '/auth',
  passport.authenticate('google', {
    scope: [
      'https://www.googleapis.com/auth/userinfo.profile',
      'https://www.googleapis.com/auth/userinfo.email',
    ],
    session: true,
  })
);

// Ruta de retorno de Google después de la autenticación
router.get(
  '/google',
  passport.authenticate('google', {
    failureRedirect: `${CLIENT_URL}/login`,
  }),
  async (req, res) => {
    const userData = encodeURIComponent(JSON.stringify(req.user));
    res.redirect(`${CLIENT_URL}?userData=${userData}`);
  }
);

router.get('/session/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id, { password: 0 });
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
      await newSession(req, res, newUser._id);
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await controller.findUser({ email, password });
    if (!user) {
      res.status(400).json({ error: 'this user does not exist' });
    } else {
      await newSession(req, res, user._id);
      res.status(200).json(user);
    }
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/logout', (req, res) => {
  try {
    res.clearCookie(COOKIE_NAME);
    res.status(200).send('logout');
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
