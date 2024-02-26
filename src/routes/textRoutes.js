const express = require('express');
const router = express.Router();
const controller = require('../controllers/textController');

router.post('/', async (req, res) => {
  const { text } = req.body;
  try {
    const newtext = await controller.createText(text);
    res.status(200).json(newtext);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
