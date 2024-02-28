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
  getAllProducts: async () => {
    return await Product.find();
  },
  getSingleProduct: async (id) => {
    return await Product.findById(id).populate('review');
  },
  dropProduct: async (id) => {
    const drop = await Product.deleteOne({ _id: id });
    await drop.deletedCount;
  },
  updateProduct: async (
    id,
    { title, price, category, description, image }
  ) => {
    const updateProduct = await Product.findByIdAndUpdate(id, {
      title,
      price,
      category,
      description,
      image,
    });
    await updateProduct.save();
  },
};
