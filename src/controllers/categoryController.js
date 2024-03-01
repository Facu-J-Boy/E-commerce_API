const Category = require('../models/Category');

module.exports = {
  createCategory: async (name) => {
    const newCategory = new Category({ name });
    await newCategory.save();
  },
  getAllCategory: async () => {
    return await Category.find();
  },
};
