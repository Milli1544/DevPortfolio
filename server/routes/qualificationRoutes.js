const express = require("express");
const {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
} = require("../controllers/qualificationController.js");
const { protect, authorize } = require("../middleware/auth.js");

const router = express.Router();

// Public routes
router.get("/", getQualifications);
router.get("/:id", getQualificationById);

// Protected routes (admin only)
router.post("/", protect, authorize("admin"), createQualification);
router.put("/:id", protect, authorize("admin"), updateQualification);
router.delete("/:id", protect, authorize("admin"), deleteQualification);

module.exports = router;
