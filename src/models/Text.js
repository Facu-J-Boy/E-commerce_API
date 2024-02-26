const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const Text = new Schema({
  text: String, // String is shorthand for {type: String}
});

module.exports = model('Text', Text);
