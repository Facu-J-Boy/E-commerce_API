const Cart = require('../models/Cart');

module.exports = {
  createCart: async (userId) => {
    const newCart = new Cart({
      user: userId,
    });
    await newCart.save();
  },
  addToCart: async (userId, productId) => {
    const cart = Cart.findOne({ user: userId });
    // Agregar el producto al carrito
    cart.products.push(productId);
    // Guardar el carrito actualizado
    await cart.save();
  },
  showCart: async (userId) => {
    return Cart.findOne({ user: userId }).populate('product');
  },
};
