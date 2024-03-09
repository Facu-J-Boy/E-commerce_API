const User = require('../models/User');
// const bcrypt = require('bcrypt');
const {
  verifyPassword,
  hashPassword,
} = require('../middleware/password');

module.exports = {
  // hashPassword: (password) => {
  //   return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  // },
  // verifyPassword: (password, hashedPassword) => {
  //   // Comparar la contraseña con el hash almacenado
  //   return bcrypt.compareSync(password, hashedPassword);
  // },
  createUser: async ({ name, email, password }) => {
    const hashedPassword = hashPassword(password);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return newUser;
  },
  findUser: async ({ email, password }) => {
    const user = await User.findOne({
      email,
    });
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
