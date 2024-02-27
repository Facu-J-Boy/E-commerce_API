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

router.get('/', async (req, res) => {
  try {
    const allproducts = await controller.getAllProducts();
    res.status(200).json(allproducts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await controller.dropProduct(id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
