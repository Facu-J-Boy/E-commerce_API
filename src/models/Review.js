const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Review = new Schema(
  {
    text: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    product: { type: Schema.Types.ObjectId, ref: 'Product' },
  },
  { versionKey: false }
);

module.exports = model('Review', Review);
