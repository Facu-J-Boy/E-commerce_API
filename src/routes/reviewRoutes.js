const express = require('express');
const router = express.Router();
const controller = require('../controllers/reviewController');
const {
  getReviews,
} = require('../controllers/reviewsController/getReviews');

router.post('/new/:productId', async (req, res) => {
  const { productId } = req.params;
  const { userId, text, rating } = req.body;
  try {
    const newReview = await controller.createReview(
      productId,
      userId,
      text,
      rating
    );
    res.status(newReview.status).json(newReview);
    // }
  } catch (error) {
    res.status(404).json({
      notification: { type: 'error', text: error.message },
    });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const { page } = req.query;
  const { limit } = req.query;
  try {
    const reviews = await getReviews(id, page, limit);
    res.status(reviews.status).json(reviews.response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/update/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  const { text, rating } = req.body;
  try {
    const update = await controller.updateReview(
      reviewId,
      text,
      rating
    );
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/delete/:reviewId', async (req, res) => {
  const { reviewId } = req.params;
  try {
    const deleteReview = await controller.dropReview(reviewId);
    res.status(deleteReview.status).json(deleteReview.message);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
