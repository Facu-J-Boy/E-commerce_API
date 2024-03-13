const Review = require('../models/Review');
const Product = require('../models/Product');
const controller = require('./productController');

module.exports = {
  createReview: async (id, text, rating) => {
    // Crear un nuevo comentario
    const newReview = new Review({
      text,
      rating,
      product: id, // Asociar el comentario al producto
    });
    // Guardar el comentario en la base de datos
    await newReview.save();
    // Agregar el ID del comentario al array de comentarios del producto
    await Product.findByIdAndUpdate(id, {
      $push: { review: newReview._id },
    });
    await controller.updateProductRating(id);
    return newReview; // Devolver el nuevo comentario creado
  },
  updateReview: async (id, text, rating) => {
    const updateReview = await Review.findByIdAndUpdate(id, {
      text,
      rating,
    });
    await updateReview.save();
    await controller.updateProductRating(id);
  },
  dropReview: async (id) => {
    const drop = await Review.deleteOne({ _id: id });
    await drop.deletedCount;
    await controller.updateProductRating(id);
  },
};
