const Category = require('../models/Category');
const Product = require('../models/Product');

module.exports = {
  createCategory: async (name) => {
    try {
      const duplicateName = await Category.findOne({ name });
      if (duplicateName) {
        return {
          status: 401,
          notification: {
            type: 'error',
            text: 'A category with this name already exists',
          },
        };
      }
      const newCategory = new Category({ name });
      await newCategory.save();
      return { status: 200, newCategory };
    } catch (error) {
      return {
        status: 400,
        notification: {
          type: 'error',
          text: 'Error to create category',
        },
      };
    }
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
    try {
      const duplicateName = await Category.findOne({ name });
      if (duplicateName) {
        return {
          status: 401,
          notification: {
            type: 'error',
            text: 'A category with this name already exists',
          },
        };
      }
      const updateCategory = await Category.findByIdAndUpdate(id, {
        name,
      });
      await updateCategory.save();
      return {
        status: 200,
        notification: {
          type: 'success',
          text: 'Category updated',
        },
      };
    } catch (error) {
      return {
        status: 400,
        notification: {
          type: 'error',
          text: 'Error to update category',
        },
      };
    }
  },
};
