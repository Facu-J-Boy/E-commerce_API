const Cart = require('../models/Cart');

module.exports = {
  createCart: async (userId) => {
    const newCart = new Cart({
      user: userId,
    });
    await newCart.save();
    return newCart;
  },
  addToCart: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    // Agregar el producto al carrito
    cart.products.push(productId);
    // Guardar el carrito actualizado
    await cart.save();
    return cart.populate('products');
  },
  showCart: async (userId) => {
    return await Cart.findOne({ user: userId }).populate('products');
  },
};
