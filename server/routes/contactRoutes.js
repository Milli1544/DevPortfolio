const express = require("express");
const {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
  deleteAllContacts,
} = require("../controllers/contactController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Routes - Public read access, Admin write access
router
  .route("/")
  .get(getContacts) // Public read access
  .post(createContact) // Public create access for contact form
  .delete(protect, authorize('admin'), deleteAllContacts); // Admin only

router
  .route("/:id")
  .get(getContactById) // Public read access
  .put(protect, authorize('admin'), updateContact) // Admin only
  .delete(protect, authorize('admin'), deleteContact); // Admin only

module.exports = router;
