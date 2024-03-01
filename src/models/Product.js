const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Product = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
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
  review: [{ type: Schema.Types.ObjectId, ref: 'Review' }],
});

module.exports = model('Product', Product);
