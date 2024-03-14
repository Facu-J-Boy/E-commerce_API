const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { upload } = require('../config/multerConfig');

router.post('/create', upload, async (req, res) => {
  const { title, price, description, categoryId } = req.body;
  try {
    const imagePath = req.file.path;
    const newProduct = await controller.createProduct({
      title,
      price,
      description,
      image: imagePath,
      categoryId,
    });
    res.status(200).json(newProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  const { page } = req.query;
  const { limit } = req.query;
  const { title } = req.query;
  try {
    const allproducts = await controller.getAllProductsWithPagination(
      page,
      limit,
      title
    );
    res.status(200).json(allproducts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const singleProduct = await controller.getSingleProduct(id);
    res.status(200).json(singleProduct);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteProduct = await controller.dropProduct(id);
    res.status(deleteProduct.status).json({
      type: deleteProduct.type,
      message: deleteProduct.message,
    });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/update/:id', upload, async (req, res) => {
  const { id } = req.params;
  const { title, price, description, categoryId } = req.body;
  try {
    const imagePath = req.file.path;
    const update = await controller.updateProduct(id, {
      title,
      price,
      description,
      image: imagePath,
      categoryId,
    });
    res
      .status(update.status)
      .json({ type: update.type, message: update.message });
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
