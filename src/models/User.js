const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const User = new Schema({
  googleId: String,
  name: String,
  email: String,
  photo: String,
});

module.exports = model('User', User);
