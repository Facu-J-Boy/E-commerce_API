const Product = require('../models/Product');

module.exports = {
  createProduct: async (
    title,
    price,
    description,
    image,
    categoryId
  ) => {
    const newProduct = new Product({
      title,
      price,
      description,
      image,
      category: categoryId,
    });
    await newProduct.save();
  },
  getAllProducts: async () => {
    return await Product.find({}, { review: 0 }).populate('category');
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
