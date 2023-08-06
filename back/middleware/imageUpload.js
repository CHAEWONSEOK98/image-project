const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public'),
  filename: (req, file, cb) =>
    cb(null, `${uuidv4()}.${mime.extension(file.mimetype)}`),
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (['image/png', 'image/jpeg', 'image/webp'].includes(file.mimetype))
      cb(null, true);
    else cb(new Error('invalid file type.'), false);
  },
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
});

module.exports = { upload };
