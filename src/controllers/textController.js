const Text = require('../models/Text');

module.exports = {
  createText: async (text) => {
    const newText = new Text({ text });
    await newText.save();
  },
};
