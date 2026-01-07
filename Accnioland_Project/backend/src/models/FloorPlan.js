const mongoose = require("mongoose");

const floorPlanSchema = new mongoose.Schema(
  {
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    floorNumber: {
      type: Number,
      required: true,
    },

    officeNumber: {
      type: Number,
      default: null, // null = whole floor
    },

    planPdf: {
      type: String, // Cloudinary URL (BASE PDF)
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("FloorPlan", floorPlanSchema);
