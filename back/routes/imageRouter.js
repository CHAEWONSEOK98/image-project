const { Router } = require('express');
const imageRouter = Router();
const mongoose = require('mongoose');

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

imageRouter.get('/show-more', async (req, res) => {
  try {
    const { lastId } = req.query;
    if (lastId && !mongoose.isValidObjectId(lastId))
      throw new Error('invalid lastId');
    const images = await Image.find(lastId && { _id: { $lt: lastId } })
      .sort({ _id: -1 })
      .limit(10);
    res.json(images);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

imageRouter.get('/infinite-scroll', async (req, res) => {
  try {
    const { lastId } = req.query;
    if (!lastId) {
      const images = await Image.find().sort({ _id: -1 }).limit(10);
      res.json(images);
    } else {
      const images = await Image.find(lastId && { _id: { $lt: lastId } })
        .sort({ _id: -1 })
        .limit(5);
      res.json(images);
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = { imageRouter };
