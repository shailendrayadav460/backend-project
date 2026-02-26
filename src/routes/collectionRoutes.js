const express = require("express");
const router = express.Router();
const upload = require("../middleware/uploadMiddleware");
const {
  createCollection,
  getCollections,
  getCollectionById,
  updateCollection,
  deleteCollection,
} = require("../controllers/collectionController");

// Upload + Create
router.post("/collections", upload.single("image"), createCollection);

// Get All
router.get("/collections", getCollections);

// Get Single
router.get("/collections/:id", getCollectionById);

// Update
router.put("/collections/:id", upload.single("image"), updateCollection);

// Delete
router.delete("/collections/:id", deleteCollection);

module.exports = router;