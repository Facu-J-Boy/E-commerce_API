const Cart = require('../models/Cart');
const { getCart } = require('./cartController/getCart');

module.exports = {
  addToCart: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    // Agregar el producto al carrito
    cart.products.push(productId);
    // Guardar el carrito actualizado
    await cart.save();
    return await getCart(userId);
  },
  removeFromCart: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    // Eliminar el producto del carrito
    cart.products = cart.products.filter(
      (prodId) => prodId.toString() !== productId
    );

    // Guardar el carrito actualizado
    await cart.save();
    return await getCart(userId);
  },
};
