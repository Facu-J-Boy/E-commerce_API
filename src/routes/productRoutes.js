const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');

router.post('/', async (req, res) => {
  const { title, price, category, description, image } = req.body;
  try {
    const newProduct = await controller.createProduct(
      title,
      price,
      category,
      description,
      image
    );
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
