const Review = require('../../models/Review');
// const controller = require('../productController');

module.exports = {
  getReviews: async (id, Page, Limit) => {
    // const product = await controller.getSingleProduct(id);
    try {
      // Parámetros de paginación
      const page = parseInt(Page) || 1;
      const limit = parseInt(Limit) || 10;
      const skip = (page - 1) * limit;
      const reviews = await Review.find(
        { product: id },
        { product: 0 }
      )
        .sort({ $natural: -1 }) // Orden inverso
        .skip(skip)
        .limit(limit);

      // Calcular el número total de reviews
      const totalCount = await Review.countDocuments({
        product: id,
      });
      if (!reviews) {
        return {
          status: 401,
          response: {
            reviews: [],
            currentPage: 0,
            totalPages: 0,
            totalCount: 0,
          },
        };
      } else {
        return {
          status: 200,
          response: {
            reviews,
            currentPage: page,
            totalPages: Math.ceil(totalCount / limit),
            totalCount,
          },
        };
      }
    } catch (error) {
      return {
        status: 500,
        response: {
          reviews: [],
          currentPage: 0,
          totalPages: 0,
          totalCount: 0,
        },
      };
    }
  },
};
