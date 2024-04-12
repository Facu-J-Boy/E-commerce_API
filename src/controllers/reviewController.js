const Review = require('../models/Review');
const Product = require('../models/Product');
const controller = require('./productController');

module.exports = {
  createReview: async (productId, userId, text, rating) => {
    // Crear un nuevo comentario
    const newReview = new Review({
      text,
      rating,
      user: userId,
      product: productId, // Asociar el comentario al producto
    });
    // Guardar el comentario en la base de datos
    await newReview.save();
    // Agregar el ID del comentario al array de comentarios del producto
    await Product.findByIdAndUpdate(productId, {
      $push: { review: newReview._id },
    });
    await controller.updateProductRating(productId);
    return newReview; // Devolver el nuevo comentario creado
  },
  getReviews: async (id, Page, Limit) => {
    // Parámetros de paginación
    const page = parseInt(Page) || 1;
    const limit = parseInt(Limit) || 10;
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ product: id }, { product: 0 })
      .skip(skip)
      .limit(limit);

    // Calcular el número total de reviews
    const totalCount = await Review.countDocuments({
      product: id,
    });
    let response = {
      reviews,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      message: '',
    };
    // Si no hay comentarios manda un mensaje
    if (!totalCount) {
      response.message = 'There are no comments';
    }
    return response;
  },
  updateReview: async (id, text, rating) => {
    const review = await Review.findById(id);
    const updateReview = await Review.findByIdAndUpdate(id, {
      text,
      rating,
    });
    await updateReview.save();
    await controller.updateProductRating(review.product);
  },
  dropReview: async (id) => {
    const review = await Review.findById(id);
    const drop = await Review.deleteOne({ _id: id });
    await drop.deletedCount;
    await controller.updateProductRating(review.product);
  },
};
