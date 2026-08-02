const Folder = require('../models/Folder');

// @desc    Get folders for a specific section and parent
// @route   GET /api/folders
// @access  Private
const getFolders = async (req, res) => {
  try {
    const { section, parent } = req.query;
    
    if (!section) {
      return res.status(400).json({ message: 'Section is required' });
    }

    const query = {
      owner: req.user._id,
      section,
      parent: parent ? parent : null
    };

    const folders = await Folder.find(query).sort({ createdAt: -1 });
    res.json(folders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a folder
// @route   POST /api/folders
// @access  Private
const createFolder = async (req, res) => {
  try {
    const { name, section, parent, tags } = req.body;

    if (!name || !section) {
      return res.status(400).json({ message: 'Name and section are required' });
    }

    const folder = await Folder.create({
      name,
      section,
      parent: parent ? parent : null,
      tags: tags || [],
      owner: req.user._id
    });

    res.status(201).json(folder);
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: 'A folder with this name already exists here' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Delete a folder
// @route   DELETE /api/folders/:id
// @access  Private
const updateFolder = async (req, res) => {
  try {
    const { name, tags } = req.body;

    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: "Folder not found" });
    }

    if (folder.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "User not authorized" });
    }

    folder.name = name || folder.name;
    folder.tags = tags || folder.tags;

    const updatedFolder = await folder.save();

    res.json(updatedFolder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const deleteFolder = async (req, res) => {
  try {
    const folder = await Folder.findById(req.params.id);

    if (!folder) {
      return res.status(404).json({ message: 'Folder not found' });
    }

    // Check user
    if (folder.owner.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // TODO: Ideally, delete child folders and files recursively.
    await folder.deleteOne();
    
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFolders,
  createFolder,
  updateFolder,
  deleteFolder
};
