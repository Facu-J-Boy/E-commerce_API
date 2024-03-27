const fs = require('fs');
const Product = require('../models/Product');
const Review = require('../models/Review');
const Category = require('../models/Category');

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
  bulckCreateProduct: async ({
    title,
    price,
    description,
    image,
    categoryName,
  }) => {
    const category = await Category.findOne({ name: categoryName });
    const newProduct = new Product({
      title,
      price,
      description,
      image,
      category: category._id,
    });
    await newProduct.save();
  },
  deleteAll: async () => {
    await Category.deleteMany({});
    await Product.deleteMany({});
  },
  getAllProductsWithPagination: async (Page, Limit, title) => {
    // Parámetros de paginación
    const page = parseInt(Page) || 1;
    const limit = parseInt(Limit) || 10;
    const skip = (page - 1) * limit;
    // Trae todos los productos excluyendo sus reviews y category
    const products = await Product.find(
      { title: { $regex: title, $options: 'i' } },
      { review: 0, category: 0 }
    )
      .skip(skip)
      .limit(limit);
    // Calcular el número total de productos
    const totalCount = await Product.countDocuments({
      title: { $regex: title, $options: 'i' },
    });
    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
    };
  },
  getSingleProduct: async (id) => {
    return await Product.findById(id).populate('category');
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

    // Eliminar todas las reviews asociadas con el producto
    await Review.deleteMany({ product: id });

    // Eliminar el producto de la base de datos
    const drop = await Product.findByIdAndDelete(id);
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
