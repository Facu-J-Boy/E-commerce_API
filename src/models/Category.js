const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Category = new Schema({
  name: {
    type: String,
    required: true,
  },
});

module.exports = model('Category', Category);
