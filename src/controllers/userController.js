const User = require('../models/User');
const {
  verifyPassword,
  hashPassword,
} = require('../middleware/password');

module.exports = {
  createUser: async ({ email, password }) => {
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      email,
      password: hashedPassword,
    });
    await newUser.save();
    // Devolvemos el usuario sin la contraseña
    return newUser.toJSON({
      transform: function (doc, ret) {
        delete ret.password;
      },
    });
  },
  findUser: async ({ email, password }) => {
    const user = await User.findOne({
      email,
    });
    if (!user) {
      return null;
    }
    const passwordMatch = verifyPassword(password, user.password);
    if (passwordMatch) {
      return { _id: user._id, email: user.email };
    }
  },
  findUserForEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },
};
