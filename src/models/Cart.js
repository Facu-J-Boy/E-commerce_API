const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Cart = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { versionKey: false }
);

Cart.statics.findOrCreate = async function (userId) {
  const existingCart = await this.findOne({ user: userId }).populate({
    path: 'products',
    select: 'title price image', // Exclude reviews, description, and category
  });
  if (existingCart) {
    existingCart.products.reverse();
    return existingCart;
  } else {
    return this.create({ user: userId });
  }
};

module.exports = model('Cart', Cart);
