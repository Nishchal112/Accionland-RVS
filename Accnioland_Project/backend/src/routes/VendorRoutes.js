const express = require("express");
const router = express.Router();
const Vendor = require("../models/Vendor");

/* ================= GET ALL ================= */
router.get("/", async (req, res) => {
  try {
    const vendors = await Vendor.find().sort({ createdAt: -1 });
    res.json(vendors);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

/* ================= CREATE ================= */
router.post("/", async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (err) {
    res.status(400).json({ message: "Invalid Data" });
  }
});

/* ================= UPDATE ================= */
router.put("/:id", async (req, res) => {
  try {
    const updated = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: "Update Failed" });
  }
});

/* ================= DELETE ================= */
router.delete("/:id", async (req, res) => {
  try {
    await Vendor.findByIdAndDelete(req.params.id);
    res.json({ message: "Vendor Deleted" });
  } catch (err) {
    res.status(400).json({ message: "Delete Failed" });
  }
});

module.exports = router;