const mongoose = require('mongoose');

const shareSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  token: {
    type: String,
    required: true,
    unique: true,
  },
  // What is being shared?
  shareType: {
    type: String,
    enum: ['section', 'folder', 'file'],
    required: true,
  },
  section: {
    type: String,
    enum: ['Notes', 'Video Links', 'Question Banks', 'Reports', 'PPTs', ''],
    default: '',
  },
  folder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null,
  },
  file: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'File',
    default: null,
  },
  // Access control
  isPublic: {
    type: Boolean,
    default: true,
  },
  passwordHash: {
    type: String,
    default: null, // null means no password
  },
  expiresAt: {
    type: Date,
    default: null, // null means never expires
  },
  viewCount: {
    type: Number,
    default: 0,
  },
}, { timestamps: true });

module.exports = mongoose.model('Share', shareSchema);
