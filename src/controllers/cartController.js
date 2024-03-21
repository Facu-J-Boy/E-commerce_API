const Cart = require('../models/Cart');

module.exports = {
  getCart: async (userId) => {
    const cart = await Cart.findOne({ user: userId }).populate(
      'products'
    );
    if (!cart) {
      const newCart = new Cart({
        user: userId,
      });
      await newCart.save();
      return newCart;
    } else {
      return cart;
    }
  },
  addToCart: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    // Agregar el producto al carrito
    cart.products.push(productId);
    // Guardar el carrito actualizado
    await cart.save();
    return cart.populate('products');
  },
  removeFromCart: async (userId, productId) => {
    const cart = await Cart.findOne({ user: userId });
    // Eliminar el producto del carrito
    cart.products = cart.products.filter(
      (prodId) => prodId.toString() !== productId
    );

    // Guardar el carrito actualizado
    await cart.save();
    return cart.populate('products');
  },
};
