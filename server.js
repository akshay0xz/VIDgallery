const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 3000;

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/videos', express.static('uploads'));

app.post('/upload', upload.single('video'), (req, res) => {
  if (!req.file) return res.status(400).send('No video uploaded');
  res.send(`Video uploaded: <a href="/videos/${req.file.filename}" target="_blank">Watch Video</a>`);
});

app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
