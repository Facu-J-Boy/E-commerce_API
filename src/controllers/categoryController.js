const Category = require('../models/Category');

model.exports = {
  createCategory: async (name) => {
    const newCategory = new Category({ name });
    await newCategory.save();
  },
};