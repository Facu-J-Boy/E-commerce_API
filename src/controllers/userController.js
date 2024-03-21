const User = require('../models/User');
const {
  verifyPassword,
  hashPassword,
} = require('../middleware/password');

module.exports = {
  createUser: async ({ name, email, password }) => {
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      name,
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
    const user = await User.findOne(
      {
        email,
      },
      { password: 0 }
    );
    if (!user) {
      return null;
    }
    const passwordMatch = verifyPassword(
      password,
      hashPassword(password)
    );
    if (passwordMatch) {
      return user;
    }
  },
  findUserForEmail: async ({ email }) => {
    const user = await User.findOne({ email });
    return user;
  },
};
