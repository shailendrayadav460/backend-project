const Collection = require("../models/ai-generated");
const fs = require("fs");
const path = require("path");

// 🔹 POST (Upload Image)
const uploadAIImage = async (req, res) => {
  try {
    const { title } = req.body;

    const newImage = new Collection({
      title,
      image: req.file.filename,
    });

    await newImage.save();

    res.json({
      message: "AI Image Saved",
      data: newImage,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔹 GET (All Images)
const getAllImages = async (req, res) => {
  try {
    const images = await Collection.find().sort({ createdAt: -1 });

    res.json({
      message: "All Images Fetched",
      data: images,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔥 GET SINGLE IMAGE (NEW)
const getSingleImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Collection.findById(id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    res.json({
      message: "Single Image Fetched",
      data: image,
    });

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// 🔹 DELETE
const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;

    const image = await Collection.findById(id);

    if (!image) {
      return res.status(404).json({
        message: "Image not found",
      });
    }

    const filePath = path.join(__dirname, "../uploads", image.image);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Collection.findByIdAndDelete(id);

    res.json({
      message: "Image deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  uploadAIImage,
  getAllImages,
  getSingleImage, // 👈 add kiya
  deleteImage,
};