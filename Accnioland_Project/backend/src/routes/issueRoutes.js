const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const { managerOnly } = require("../middleware/roleMiddleware");
const upload = require("../middleware/upload");

const {
  createIssue,
  getAllIssuesForManager,
} = require("../controllers/issueController");

// OFFICE WORKER → CREATE ISSUE
router.post(
  "/create",
  authMiddleware,
  upload.fields([
    { name: "issueImage", maxCount: 1 },
    { name: "markedFloorPlan", maxCount: 1 },
  ]),
  createIssue
);

// MANAGER → VIEW ALL ISSUES
router.get(
  "/all",
  authMiddleware,
  managerOnly,
  getAllIssuesForManager
);

module.exports = router;
