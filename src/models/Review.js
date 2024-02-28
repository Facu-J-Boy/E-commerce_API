const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Review = new Schema({
  text: {
    type: String,
    required: true,
  },
  product: { type: Schema.Types.ObjectId, ref: 'Product' },
});

module.exports = model('Review', Review);
