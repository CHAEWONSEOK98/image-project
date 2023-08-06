const { Router } = require('express');
const imageRouter = Router();

// model
const Image = require('../model/Image');

// middleware
const { upload } = require('../middleware/imageUpload');

imageRouter.post('/images', upload.single('image'), async (req, res) => {
  const images = await new Image({
    key: req.file.filename,
    originalFileName: req.file.originalname,
  }).save();
  res.json(images);
});

imageRouter.get('/images', async (req, res) => {
  const images = await Image.find();
  res.json(images);
});

module.exports = { imageRouter };
