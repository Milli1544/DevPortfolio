const express = require("express");
const Qualification = require("../models/qualification");
const auth = require("../middleware/auth");

const router = express.Router();

// @route   GET /api/qualifications
// @desc    Get all qualifications
// @access  Public
router.get("/", async (req, res) => {
  try {
    const { type, ongoing, verified, limit = 10, page = 1 } = req.query;

    // Build filter object
    const filter = {};
    if (type) filter.type = type;
    if (ongoing !== undefined) filter.ongoing = ongoing === "true";
    if (verified !== undefined) filter.verified = verified === "true";

    // Calculate pagination
    const skip = (page - 1) * limit;

    // Get qualifications with pagination and sorting
    const qualifications = await Qualification.find(filter)
      .sort({ endDate: -1, startDate: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Qualification.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      count: qualifications.length,
      total,
      totalPages,
      currentPage: parseInt(page),
      data: qualifications,
    });
  } catch (error) {
    console.error("Get qualifications error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   GET /api/qualifications/:id
// @desc    Get single qualification
// @access  Public
router.get("/:id", async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);

    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    res.status(200).json({
      success: true,
      data: qualification,
    });
  } catch (error) {
    console.error("Get qualification error:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   POST /api/qualifications
// @desc    Create new qualification
// @access  Private (Admin)
router.post("/", auth, async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);

    res.status(201).json({
      success: true,
      message: "Qualification created successfully",
      data: qualification,
    });
  } catch (error) {
    console.error("Create qualification error:", error);

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   PUT /api/qualifications/:id
// @desc    Update qualification
// @access  Private (Admin)
router.put("/:id", auth, async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Qualification updated successfully",
      data: qualification,
    });
  } catch (error) {
    console.error("Update qualification error:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    if (error.name === "ValidationError") {
      const message = Object.values(error.errors)
        .map((val) => val.message)
        .join(", ");
      return res.status(400).json({
        success: false,
        message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

// @route   DELETE /api/qualifications/:id
// @desc    Delete qualification
// @access  Private (Admin)
router.delete("/:id", auth, async (req, res) => {
  try {
    const qualification = await Qualification.findByIdAndDelete(req.params.id);

    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Qualification deleted successfully",
      data: {},
    });
  } catch (error) {
    console.error("Delete qualification error:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }

    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;
