const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');

router.post('/new/:id', async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;
  try {
    const newReview = await controller.createReview(id, text, rating);
    res.status(200).json(newReview);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { text, rating } = req.body;
  try {
    const update = await controller.updateReview(id, text, rating);
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteReview = await controller.dropReview(id);
    res.status(200).json(deleteReview);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
