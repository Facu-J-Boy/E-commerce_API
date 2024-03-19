const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const User = new Schema(
  {
    googleId: String,
    name: String,
    email: { type: String, unique: true },
    password: String,
    photo: String,
  },
  { versionKey: false }
);

module.exports = model('User', User);
