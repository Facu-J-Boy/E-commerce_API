const Cart = require('../../models/Cart');

module.exports = {
  getCart: async (userId) => {
    const cart = await Cart.findOrCreate(userId);
    let total = 0;
    let message = '';
    if (!cart.products.length) {
      message = 'Your cart is empty';
    } else {
      message = '';
    }
    if (cart.products.length) {
      total = cart.products.reduce((a, b) => a + b.price, 0);
    }
    const formattedTotal = new Intl.NumberFormat('es-ES', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
      useGrouping: true,
    }).format(total);
    return {
      total: formattedTotal,
      products: cart.products,
      message,
    };
  },
};
