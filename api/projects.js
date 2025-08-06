const mongoose = require("mongoose");
require("dotenv").config();

// MongoDB connection with better debugging
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    console.log("MongoDB URI check:", {
      hasUri: !!mongoUri,
      uriLength: mongoUri ? mongoUri.length : 0,
      uriStart: mongoUri ? mongoUri.substring(0, 20) + "..." : "undefined"
    });
    
    if (!mongoUri) {
      console.error("MONGODB_URI is not defined!");
      console.log("Available environment variables:", Object.keys(process.env));
      return false;
    }

    if (mongoose.connection.readyState === 0) {
      console.log("Attempting to connect to MongoDB...");
      await mongoose.connect(mongoUri, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 10000, // Increased timeout
        socketTimeoutMS: 45000,
      });
      console.log("Connected to MongoDB database: Portfolio");
    } else {
      console.log("MongoDB already connected, readyState:", mongoose.connection.readyState);
    }
    return true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      name: err.name,
    });
    return false;
  }
};

// Project Schema (simplified for this endpoint)
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  created: { type: Date, default: Date.now },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);

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
    console.log("Projects API called:", {
      method: req.method,
      url: req.url,
      timestamp: new Date().toISOString()
    });

    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      console.error("Database connection failed in projects API");
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
        debug: {
          hasMongoUri: !!process.env.MONGODB_URI,
          nodeEnv: process.env.NODE_ENV,
          vercel: !!process.env.VERCEL
        }
      });
    }

    if (req.method === "GET") {
      console.log("Fetching projects from database...");
      const projects = await Project.find().sort({ created: -1 });
      console.log(`Found ${projects.length} projects`);
      
      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
        debug: {
          connectionState: mongoose.connection.readyState,
          timestamp: new Date().toISOString()
        }
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Projects API error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching projects",
      error: error.message,
      debug: {
        connectionState: mongoose.connection.readyState,
        hasMongoUri: !!process.env.MONGODB_URI
      }
    });
  }
};
