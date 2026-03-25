const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // 🔥 route ke basis pe folder decide karo
    if (req.originalUrl.includes("ai")) {
      cb(null, "uploads/generated/");
    } else {
      cb(null, "uploads/collections/");
    }
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

module.exports = upload;
