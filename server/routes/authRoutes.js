const express = require("express");
const { signin, signout, signup } = require("../controllers/authController.js");

const router = express.Router();

// Authentication routes
router.post("/signup", signup); // POST /api/auth/signup
router.post("/signin", signin); // POST /api/auth/signin
router.post("/signout", signout); // POST /api/auth/signout

module.exports = router;
