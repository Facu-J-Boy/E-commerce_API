const Review = require('../models/Review');
const Product = require('../models/Product');

module.exports = {
  createReview: async (id, text) => {
    // Crear un nuevo comentario
    const newReview = new Review({
      text,
      product: id, // Asociar el comentario al producto
    });
    // Guardar el comentario en la base de datos
    await newReview.save();
    // Agregar el ID del comentario al array de comentarios del producto
    await Product.findByIdAndUpdate(id, {
      $push: { review: newReview._id },
    });
    return newReview; // Devolver el nuevo comentario creado
  },
  updateComment: async (id, text) => {
    const updateReview = await Review.findByIdAndUpdate(id, { text });
    await updateReview.save();
  },
};
