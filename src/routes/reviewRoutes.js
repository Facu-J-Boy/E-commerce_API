const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/new/:id', async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const newReview = await controller.createReview(id, text);
    res.status(200).json(newReview);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
