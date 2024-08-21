const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
  createCategory: async (name) => {
    const newCategory = new Category({ name });
    await newCategory.save();
  },
  getAllCategory: async () => {
    return await Category.find();
  },
  dropCategory: async (id) => {
    const product = await Product.find({ category: id });
    console.log({ product });
    if (product.length) {
      return {
        status: 400,
        response: {
          notification: {
            type: 'error',
            text: 'There are products with this category',
          },
        },
      };
    }
    const drop = await Category.deleteOne({ _id: id });
    await drop.deletedCount;
    return {
      status: 200,
      response: {
        notification: {
          type: 'success',
          text: 'Category deleted',
        },
        dropCategoryId: id,
      },
    };
  },
  updateCategory: async (id, { name }) => {
    const updateCategory = await Category.findByIdAndUpdate(id, {
      name,
    });
    await updateCategory.save();
  },
};
