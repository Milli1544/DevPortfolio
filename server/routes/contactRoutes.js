const express = require("express");
const {
  createContact,
  getContacts,
} = require("../controllers/contactController.js");

const router = express.Router();

// Contact routes
router.post("/", createContact); // POST /api/contact
router.get("/", getContacts); // GET /api/contact

module.exports = router;
