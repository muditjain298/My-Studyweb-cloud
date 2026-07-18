const mongoose = require('mongoose');

const folderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Folder',
    default: null, // null means it's a root folder for a specific section
  },
  section: {
    type: String,
    enum: ['Notes', 'Video Links', 'Question Banks', 'Reports', 'PPTs'],
    required: true,
  },
  tags: [{
    type: String
  }],
}, { timestamps: true });

// Ensure unique folder names within the same parent and section for a user
folderSchema.index({ name: 1, parent: 1, section: 1, owner: 1 }, { unique: true });

module.exports = mongoose.model('Folder', folderSchema);
