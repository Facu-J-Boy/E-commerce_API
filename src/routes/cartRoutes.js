const express = require('express');
const router = express.Router();
const controller = require('../controllers/cartController');
const { getCart } = require('../controllers/cartController/getCart');

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await getCart(userId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  const { userId, productId } = req.body;
  try {
    const addToCart = await controller.addToCart(userId, productId);
    res.status(200).json(addToCart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/remove/:userId/:productId', async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await controller.removeFromCart(userId, productId);
    res.status(200).json(cart);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
