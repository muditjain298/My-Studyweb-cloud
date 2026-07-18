const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  originalName: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null, // null means it's in the root of the section
  },
  section: {
    type: String,
    enum: ['Notes', 'Video Links', 'Question Banks', 'Reports', 'PPTs'],
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
  cloudinaryId: {
    type: String,
  },
  size: {
    type: Number, // in bytes
    default: 0
  },
  mimeType: {
    type: String,
  },
  tags: [{
    type: String
  }],
  // For Video Links section
  thumbnail: {
    type: String,
  },
  // For Question Bank section
  difficulty: {
    type: String,
    enum: ['Easy', 'Medium', 'Hard', ''],
    default: ''
  },
  isPinned: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

module.exports = mongoose.model('File', fileSchema);
