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
    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      return res.status(500).json({
        success: false,
        message: "MongoDB URI not configured",
        error: "Please set MONGODB_URI environment variable in Vercel",
      });
    }

    // Import mongoose only when needed
    const mongoose = require("mongoose");
    require("dotenv").config();

    // MongoDB connection
    const connectDB = async () => {
      try {
        if (mongoose.connection.readyState === 0) {
          await mongoose.connect(process.env.MONGODB_URI, {
            maxPoolSize: 10,
            serverSelectionTimeoutMS: 10000,
            socketTimeoutMS: 45000,
          });
        }
        return true;
      } catch (err) {
        console.error("MongoDB connection error:", err);
        return false;
      }
    };

    // Project Schema
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

    if (req.method === "GET") {
      // Connect to database
      const connected = await connectDB();
      if (!connected) {
        return res.status(500).json({
          success: false,
          message: "Database connection failed",
        });
      }

      const projects = await Project.find().sort({ created: -1 });

      res.status(200).json({
        success: true,
        count: projects.length,
        data: projects,
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
    });
  }
};
