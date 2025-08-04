const Qualification = require("../models/qualification.js");

// Get all qualifications
const getQualifications = async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ created: -1 });
    res.status(200).json({
      success: true,
      count: qualifications.length,
      data: qualifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching qualifications",
      error: error.message,
    });
  }
};

// Get qualification by ID
const getQualificationById = async (req, res) => {
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
    res.status(500).json({
      success: false,
      message: "Error fetching qualification",
      error: error.message,
    });
  }
};

// Create new qualification
const createQualification = async (req, res) => {
  try {
    const qualification = await Qualification.create(req.body);
    res.status(201).json({
      success: true,
      message: "Qualification created successfully",
      data: qualification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating qualification",
      error: error.message,
    });
  }
};

// Update qualification
const updateQualification = async (req, res) => {
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
      data: qualification,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating qualification",
      error: error.message,
    });
  }
};

// Delete qualification
const deleteQualification = async (req, res) => {
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
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting qualification",
      error: error.message,
    });
  }
};

// Delete all qualifications
const deleteAllQualifications = async (req, res) => {
  try {
    await Qualification.deleteMany({});
    res.status(200).json({
      success: true,
      message: "All qualifications deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting qualifications",
      error: error.message,
    });
  }
};

module.exports = {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
};
