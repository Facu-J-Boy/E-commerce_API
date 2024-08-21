const express = require('express');
const router = express.Router();
const controller = require('../controllers/categoryController');

router.post('/create', async (req, res) => {
  const { name } = req.body;
  try {
    const newCategory = await controller.createCategory(name);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const allCategory = await controller.getAllCategory();
    res.status(200).json(allCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deleteCategory = await controller.dropCategory(id);
    res.status(deleteCategory.status).json(deleteCategory.response);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const update = await controller.updateCategory(id, { name });
    res.status(200).json(update);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

module.exports = router;
