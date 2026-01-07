const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
  {
    reportedBy: {
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
      required: true,
    },

    // 🔒 ORIGINAL (MANAGER UPLOADED)
    baseFloorPlan: {
      type: String,
      required: true,
    },

    // ✏️ EDITED (OFFICE WORKER UPLOADED)
    markedFloorPlan: {
      type: String,
      required: true,
    },

    isAnnotatedFromBase: {
      type: Boolean,
      default: true,
    },

    wallDirection: {
      type: String,
      enum: ["north", "south", "east", "west"],
      required: true,
    },

    wallLocationRef: {
      type: String,
    },

    description: {
      type: String,
      required: true,
    },

    issueImage: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["open", "in_progress", "resolved"],
      default: "open",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Issue", issueSchema);
