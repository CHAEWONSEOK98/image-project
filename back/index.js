// env
require('dotenv').config();

// node
const express = require('express');

// db
const mongoose = require('mongoose');

// router
const { imageRouter } = require('./routes/imageRouter');

const app = express();
const { MONGODB_URI, PORT } = process.env;

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('MongoDB Connected');

    app.use('/public', express.static('public')); // 클라이언트에서 사진 조회

    app.use('/images', imageRouter);

    app.listen(PORT, () =>
      console.log('Express server listening on PORT ' + PORT)
    );
  })
  .catch((err) => console.log(err));
