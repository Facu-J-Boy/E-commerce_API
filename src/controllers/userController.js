const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
  createUser: async ({ name, email, password }) => {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashPassword });
    await newUser.save();
    return newUser;
  },
  findUserForEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },
  findUser: async ({ name, email, password }) => {
    const user = await User.findOne({
      name,
      email,
    });
    if (!user) {
      return null;
    }
    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );
    if (passwordMatch) {
      return user;
    }
  },
};
