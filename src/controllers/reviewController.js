const Review = require('../models/Review');
const Product = require('../models/Product');
const controller = require('./productController');
const { getReviews } = require('./reviewsController/getReviews');

module.exports = {
  createReview: async (productId, userId, text, rating) => {
    // const foundReview = await Review.findOne({
    //   user: userId,
    //   product: productId,
    // });
    // if (foundReview) {
    //   return {        ||||   NO BORRAR ||||
    //     status: 402,
    //     notification: {
    //       type: 'error',
    //       text: 'You have already reviewed this product',
    //     },
    //   };
    // }
    if (!text) {
      return {
        status: 402,
        response: {
          notification: { type: 'error', text: 'Text is required' },
        },
      };
    }
    if (!userId) {
      return {
        status: 402,
        response: {
          notification: {
            type: 'error',
            text: 'You need to log in to comment',
          },
        },
      };
    } else {
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
      const allReviews = await getReviews(productId);
      return {
        status: 200,
        response: {
          notification: { type: 'success', text: 'Posted comment' },
          reviews: allReviews.response.reviews,
          currentPage: allReviews.response.currentPage,
          totalPages: allReviews.response.totalPages,
          totalCount: allReviews.response.totalCount,
          message: allReviews.response.message,
        },
      };
    }
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
    return {
      status: 200,
      message: {
        notification: {
          type: 'success',
          text: 'Comment deleted',
        },
        review: review,
      },
    };
  },
};
