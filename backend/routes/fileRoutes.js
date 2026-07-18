const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { getFiles, uploadFile, deleteFile, getVideoMetadata } = require('../controllers/fileController');
const { protect } = require('../middleware/authMiddleware');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage });

router.route('/')
  .get(protect, getFiles)
  .post(protect, upload.single('file'), uploadFile);

router.route('/metadata')
  .post(protect, getVideoMetadata);

router.route('/:id')
  .delete(protect, deleteFile);

module.exports = router;
