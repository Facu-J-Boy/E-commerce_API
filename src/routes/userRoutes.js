const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/google', (req, res) => {
  res.json(req.user);
});

module.exports = router;
