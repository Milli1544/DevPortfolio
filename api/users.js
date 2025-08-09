const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined!");
      return false;
    }

    if (mongoose.connection.readyState === 0) {
      await mongoose.connect(mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
      });
      console.log("Connected to MongoDB database: Portfolio");
    }
    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    return false;
  }
};

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

// Auth middleware
const auth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Access denied. No token provided.",
      });
    }

    const token = authHeader.substring(7);
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "portfolio_secret_key"
    );

    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid token. User not found.",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid token.",
    });
  }
};

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    if (req.method === "GET") {
      // Apply auth middleware
      await auth(req, res, async () => {
        // Check if user is admin
        if (req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required.",
          });
        }

        const { role, limit = 10, page = 1 } = req.query;

        // Build filter object
        const filter = {};
        if (role) filter.role = role;

        // Calculate pagination
        const skip = (page - 1) * limit;

        // Get users with pagination (exclude passwords)
        const users = await User.find(filter)
          .select("-password")
          .sort({ createdAt: -1 })
          .limit(parseInt(limit))
          .skip(skip);

        const total = await User.countDocuments(filter);
        const totalPages = Math.ceil(total / limit);

        res.status(200).json({
          success: true,
          count: users.length,
          total,
          totalPages,
          currentPage: parseInt(page),
          data: users,
        });
      });
    } else if (req.method === "PUT") {
      // Handle user updates
      await auth(req, res, async () => {
        const { id } = req.query;
        const { name, email, role } = req.body;

        // Check if user is admin or updating their own profile
        if (req.user.role !== "admin" && req.user._id.toString() !== id) {
          return res.status(403).json({
            success: false,
            message: "Access denied. You can only update your own profile.",
          });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;

        // Only admin can change roles
        if (role && req.user.role === "admin") {
          updateData.role = role;
        } else if (role && req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "Access denied. Only admins can change user roles.",
          });
        }

        const user = await User.findByIdAndUpdate(id, updateData, {
          new: true,
          runValidators: true,
        }).select("-password");

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        res.status(200).json({
          success: true,
          message: "User updated successfully",
          data: user,
        });
      });
    } else if (req.method === "DELETE") {
      // Handle user deletion
      await auth(req, res, async () => {
        const { id } = req.query;

        // Check if user is admin
        if (req.user.role !== "admin") {
          return res.status(403).json({
            success: false,
            message: "Access denied. Admin privileges required.",
          });
        }

        // Prevent admin from deleting themselves
        if (req.user._id.toString() === id) {
          return res.status(400).json({
            success: false,
            message: "You cannot delete your own account.",
          });
        }

        const user = await User.findByIdAndDelete(id);

        if (!user) {
          return res.status(404).json({
            success: false,
            message: "User not found",
          });
        }

        res.status(200).json({
          success: true,
          message: "User deleted successfully",
          data: {},
        });
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Users API error:", error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "User not found",
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

    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email already exists",
      });
    }

    res.status(500).json({
      success: false,
      message: "Error processing request",
      error: error.message,
    });
  }
};
