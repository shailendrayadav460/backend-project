const express = require("express");
const cors = require("cors");
const collectionRoutes = require("./routes/collectionRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/", collectionRoutes);


app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

module.exports = app;