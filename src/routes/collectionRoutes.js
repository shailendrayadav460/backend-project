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

const {
  uploadAIImage,
  getAllImages,
  getSingleImage,
  deleteImage,
} = require("../controllers/aiImageController");





const {
  savePlan,
  getPlanByDate,
  getPlanById,
  deletePlan,
  removeOutfitFromPlan
} = require("../controllers/planController");

// POST (save/update)
router.post("/plan", savePlan);

// GET by date (calendar click)
router.get("/plan/:date", getPlanByDate);

// 🔥 GET by ID
router.get("/plan/id/:id", getPlanById);

// 🔥 DELETE full plan
router.delete("/plan/:id", deletePlan);

// 🔥 REMOVE single outfit
router.post("/plan/remove-outfit", removeOutfitFromPlan);






// Upload + Create
router.post("/collections", upload.single("image"), createCollection);




// AI upload

// POST
router.post("/ai-upload", upload.single("image"), uploadAIImage);

// GET
router.get("/ai-images", getAllImages);

router.get("/ai-image/:id", getSingleImage);

// DELETE
router.delete("/ai-image/:id", deleteImage);


// Get All
router.get("/collections", getCollections);

// Get Single
router.get("/collections/:id", getCollectionById);

// Update
router.put("/collections/:id", upload.single("image"), updateCollection);

// Delete
router.delete("/collections/:id", deleteCollection);

module.exports = router;