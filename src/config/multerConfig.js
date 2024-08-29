const multer = require('multer');
const path = require('path');
const uuid = require('uuid');

const FOLDER_UPLOADS = 'uploads/';

const generatorNameImage = (file) =>
  `${uuid.v4()}${path.extname(file.originalname)}`;

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, FOLDER_UPLOADS),
  filename: (_req, file, cb) => cb(null, generatorNameImage(file)),
});
const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const fileTypes = /jpeg|jpg|png/;
    const mimeType = fileTypes.test(file.mimetype);
    const extName = fileTypes.test(path.extname(file.originalname));
    if (mimeType && extName) {
      return cb(null, true);
    }
    cb('The file must be a valid image');
  },
});

module.exports = {
  uploadImage: (req, res, next) => {
    upload.single('image')(req, res, (err) => {
      if (err) {
        console.log('Error to upload image');
        return res.status(400).json({
          notification: {
            type: 'error',
            msg: 'Error to upload image',
          },
        });
      }
      if (!req.file) {
        return next(); // Continue to the next middleware if no file
      }
      next();
    });
  },
};
