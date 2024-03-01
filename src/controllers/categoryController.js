const Category = require('../models/Category');

module.exports = {
  createCategory: async (name) => {
    const newCategory = new Category({ name });
    await newCategory.save();
  },
  getAllCategory: async () => {
    return await Category.find();
  },
  dropCategory: async (id) => {
    const drop = await Category.deleteOne({ _id: id });
    await drop.deletedCount;
  },
  updateCategory: async (id, { name }) => {
    const updateCategory = await Category.findByIdAndUpdate(id, {
      name,
    });
    await updateCategory.save();
  },
};
