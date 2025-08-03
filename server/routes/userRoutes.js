const express = require("express");
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  deleteAllUsers,
} = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

const router = express.Router();

// Protect all routes - require authentication
router.use(protect);

// Routes for /api/users
router
  .route("/")
  .get(authorize("admin"), getUsers) // GET /api/users - get all users (admin only)
  .post(authorize("admin"), createUser) // POST /api/users - add new user (admin only)
  .delete(authorize("admin"), deleteAllUsers); // DELETE /api/users - remove all users (admin only)

// Routes for /api/users/:id
router
  .route("/:id")
  .get(authorize("admin"), getUserById) // GET /api/users/:id - get user by id (admin only)
  .put(authorize("admin"), updateUser) // PUT /api/users/:id - update user by id (admin only)
  .delete(authorize("admin"), deleteUser); // DELETE /api/users/:id - remove user by id (admin only)

module.exports = router;
