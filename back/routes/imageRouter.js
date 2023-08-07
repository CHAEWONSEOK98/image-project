const { Router } = require('express');
const imageRouter = Router();

// model
const Image = require('../model/Image');

// middleware
const { upload } = require('../middleware/imageUpload');

imageRouter.post('/', upload.array('image', 10), async (req, res) => {
  const images = Promise.allSettled(
    req.files.map(async (file) => {
      const images = await new Image({
        key: file.filename,
        originalFileName: file.originalname,
      }).save();
      return images;
    })
  );
  res.json(images);
});

imageRouter.get('/', async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

module.exports = { imageRouter };
