const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { managerOnly } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");
const {
  uploadBaseFloorPlan,
  getMyBaseFloorPlan,
} = require("../controllers/floorPlanController");

router.post(
  "/upload",
  authMiddleware,
  managerOnly,
  upload.single("planPdf"),
  uploadBaseFloorPlan
);

router.get("/my", authMiddleware, getMyBaseFloorPlan);

module.exports = router;
