const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Cart = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  },
  { versionKey: false }
);

module.exports = model('Cart', Cart);
