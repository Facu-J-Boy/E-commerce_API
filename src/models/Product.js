const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Product = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    rating: {
      rate: {
        type: Number,
        default: 5,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: { type: Schema.Types.ObjectId, ref: 'Category' },
  },
  { versionKey: false }
);

module.exports = model('Product', Product);
