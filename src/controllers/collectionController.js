const Collection = require("../models/collection");

// CREATE
exports.createCollection = async (req, res) => {
  try {
    const { title, subtitle } = req.body;

    const newItem = await Collection.create({
      title,
      subtitle,
      image: req.file ? req.file.filename : "",
    });

    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL
exports.getCollections = async (req, res) => {
  try {
    const items = await Collection.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET SINGLE
exports.getCollectionById = async (req, res) => {
  try {
    const item = await Collection.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.json(item);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateCollection = async (req, res) => {
  try {
    const updated = await Collection.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        ...(req.file && { image: req.file.filename }),
      },
      { new: true }
    );

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteCollection = async (req, res) => {
  try {
    await Collection.findByIdAndDelete(req.params.id);
    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};