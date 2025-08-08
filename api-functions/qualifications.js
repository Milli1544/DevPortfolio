const mongoose = require("mongoose");
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

// Qualification Schema
const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, "Institution is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["education", "certification", "experience"],
    default: "education",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Qualification =
  mongoose.models.Qualification ||
  mongoose.model("Qualification", qualificationSchema);

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");

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
      const qualifications = await Qualification.find().sort({ year: -1 });
      res.status(200).json({
        success: true,
        count: qualifications.length,
        data: qualifications,
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Qualifications API error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching qualifications",
      error: error.message,
    });
  }
};
