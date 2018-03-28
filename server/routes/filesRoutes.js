const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: './upload/img',
  filename(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = function(app, db) {
  app.post('/upload/img', (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const path = `upload/img/${req.file.filename}`;
        res.status(200).json({ path });
      }
    });
  });

  app.post('/delete/img', (req, res) => {
    fs.unlinkSync(req.body.path);
  });
};
