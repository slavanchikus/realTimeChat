const multer = require('multer');

const storage = multer.diskStorage({
  destination: './upload',
  filename(req, file, cb) {
    cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage });

module.exports = function(app, db) {
  app.post('/upload', (req, res) => {
    upload.single('file')(req, res, (err) => {
      if (err) {
        res.status(400).json({ message: err.message });
      } else {
        const path = `upload/${Date.now()}${req.file.filename}`;
        res.status(200).json({ path });
      }
    });
  });
};
