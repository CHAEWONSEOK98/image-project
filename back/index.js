const express = require('express');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './public'),
  //   filename: (req, file, cb) => cb(null, file.originalname),
  //   filename: (req, file, cb) => cb(null, uuidv4()),
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

const app = express();
const PORT = 5000;

app.use('/public', express.static('public')); // 클라이언트에서 사진 조회

app.post('/upload', upload.single('image'), (req, res) => {
  console.log(req.file);
  res.json(req.file);
});

app.listen(PORT, () => console.log('Express server listening on PORT ' + PORT));

// {
//     "fieldname": "image",
//     "originalname": "plum.jpg",
//     "encoding": "7bit",
//     "mimetype": "image/jpeg",
//     "destination": "./public",
//     "filename": "3ad3f15e-b6a7-4a9c-bfb9-d33d66726690.jpeg",
//     "path": "public\\3ad3f15e-b6a7-4a9c-bfb9-d33d66726690.jpeg",
//     "size": 33640
// }
