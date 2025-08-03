const express = require("express");
const {
  getQualifications,
  getQualificationById,
  createQualification,
  updateQualification,
  deleteQualification,
  deleteAllQualifications,
} = require("../controllers/qualificationController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Routes for /api/qualifications - Public read access, Admin write access
router
  .route("/")
  .get(getQualifications) // GET /api/qualifications - get all qualifications (public)
  .post(protect, authorize("admin"), createQualification) // POST /api/qualifications - add new qualification (admin only)
  .delete(protect, authorize("admin"), deleteAllQualifications); // DELETE /api/qualifications - remove all qualifications (admin only)

// Routes for /api/qualifications/:id
router
  .route("/:id")
  .get(getQualificationById) // GET /api/qualifications/:id - get qualification by id (public)
  .put(protect, authorize("admin"), updateQualification) // PUT /api/qualifications/:id - update qualification by id (admin only)
  .delete(protect, authorize("admin"), deleteQualification); // DELETE /api/qualifications/:id - remove qualification by id (admin only)

module.exports = router;
