const Product = require('../models/Product');

module.exports = {
  createProduct: async (
    title,
    price,
    category,
    description,
    image
  ) => {
    const newProduct = new Product({
      title,
      price,
      category,
      description,
      image,
    });
    await newProduct.save();
  },
};
