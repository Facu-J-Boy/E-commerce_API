const fs = require('fs');
const Product = require('../models/Product');
const Review = require('../models/Review');

module.exports = {
  createProduct: async ({
    title,
    price,
    description,
    image,
    categoryId,
  }) => {
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
    return await Product.find({}, { review: 0, category: 0 }); // Trae todos los productos excluyendo sus reviews y category
  },
  getSingleProduct: async (id) => {
    return await Product.findById(id)
      .populate('review')
      .populate('category');
  },
  dropProduct: async (id) => {
    const product = await Product.findById(id);

    if (!product) {
      return {
        status: 401,
        type: 'error',
        message: 'Product not found',
      };
    }
    // Eliminar la imagen asociada del sistema de archivos
    if (product.image) {
      fs.unlinkSync(product.image);
    }

    // Eliminar el producto de la base de datos
    const drop = await Product.deleteOne({ _id: id });
    await drop.deletedCount;
    return {
      status: 200,
      type: 'success',
      message: 'Product deleted',
    };
  },
  updateProduct: async (
    id,
    { title, price, description, image, categoryId }
  ) => {
    // Buscar el producto actual en la base de datos
    const product = await Product.findById(id);

    if (!product) {
      fs.unlinkSync(image);
      return {
        status: 401,
        type: 'error',
        message: 'Product not found',
      };
    } else {
      // Actualizar la información del producto en la base de datos
      await Product.findByIdAndUpdate(id, {
        title,
        description,
        price,
        category: categoryId,
        // Si se cargó una nueva imagen, actualizar la ruta de la imagen
        ...(image && { image: image }),
      });

      // Si se cargó una nueva imagen, eliminar la imagen anterior del sistema de archivos
      if (image && product.image) {
        // Eliminar la imagen anterior del sistema de archivos
        fs.unlinkSync(product.image);
      }

      // Guardar los cambios en la base de datos
      await product.save();

      return {
        status: 200,
        type: 'success',
        message: 'Product updated',
      };
    }
  },
  updateProductRating: async (id) => {
    const reviews = await Review.find({ product: id });
    if (reviews.length === 0) {
      return;
    }
    const totalRating = reviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    const averageRating = totalRating / reviews.length;
    await Product.findByIdAndUpdate(id, {
      rating: averageRating.toFixed(1),
    });
  },
};
