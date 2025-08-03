const express = require("express");
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  deleteAllProjects,
} = require("../controllers/projectController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Routes - Public read access, Admin write access
router
  .route("/")
  .get(getProjects) // Public read access
  .post(protect, authorize('admin'), createProject) // Admin only
  .delete(protect, authorize('admin'), deleteAllProjects); // Admin only

router
  .route("/:id")
  .get(getProjectById) // Public read access
  .put(protect, authorize('admin'), updateProject) // Admin only
  .delete(protect, authorize('admin'), deleteProject); // Admin only

module.exports = router;
