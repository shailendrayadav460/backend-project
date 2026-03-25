const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
  date: {
    type: String, // "2026-03-23"
    required: true,
  },
  outfits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection", // tumhara outfit model
    },
  ],
}, { timestamps: true });

module.exports = mongoose.model("Plan", planSchema);