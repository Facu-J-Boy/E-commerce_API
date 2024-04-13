const Review = require('../../models/Review');
const controller = require('../productController');

module.exports = {
  getReviews: async (id, Page, Limit) => {
    // Parámetros de paginación
    const page = parseInt(Page) || 1;
    const limit = parseInt(Limit) || 10;
    const skip = (page - 1) * limit;
    const reviews = await Review.find({ product: id }, { product: 0 })
      .sort({ $natural: -1 }) // Orden inverso
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
    };
    return response;
  },
};
