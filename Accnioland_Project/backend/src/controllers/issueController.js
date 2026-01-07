const Issue = require("../models/Issue");
const FloorPlan = require("../models/FloorPlan");

exports.createIssue = async (req, res) => {
  try {
    const { id, floorNumber, officeNumber } = req.user;
    const { wallDirection, wallLocationRef, description } = req.body;

    if (!req.files?.issueImage || !req.files?.markedFloorPlan) {
      return res.status(400).json({
        message: "Issue image and edited floor plan are required",
      });
    }

    // find base (immutable)
    let basePlan = await FloorPlan.findOne({ floorNumber, officeNumber })
      .sort({ createdAt: -1 });

    if (!basePlan) {
      basePlan = await FloorPlan.findOne({
        floorNumber,
        officeNumber: null,
      }).sort({ createdAt: -1 });
    }

    const issue = await Issue.create({
      reportedBy: id,
      floorNumber,
      officeNumber,
      baseFloorPlan: basePlan.planPdf,               // ORIGINAL
      markedFloorPlan: req.files.markedFloorPlan[0].path, // AUTO-GENERATED
      issueImage: req.files.issueImage[0].path,
      wallDirection,
      wallLocationRef,
      description,
    });

    res.status(201).json({ message: "Issue created", issue });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllIssuesForManager = async (req, res) => {
  try {
    const issues = await Issue.find()
      .populate("reportedBy", "email userType")
      .sort({ createdAt: -1 });

    res.json({ total: issues.length, issues });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
