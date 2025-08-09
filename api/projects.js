module.exports = async (req, res) => {
  // Setup CORS
  const setupCORS = require("./utils/cors");
  if (setupCORS(req, res)) {
    return; // Preflight request handled
  }

  try {
    // Import mongoose only when needed
    const mongoose = require("mongoose");
    require("dotenv").config();

    // Check if MongoDB URI is available
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI not found in environment variables");
      return res.status(500).json({
        success: false,
        message: "MongoDB URI not configured",
        error: "Please set MONGODB_URI environment variable in Vercel",
        debug: {
          env_vars: {
            has_mongodb_uri: !!process.env.MONGODB_URI,
            has_jwt_secret: !!process.env.JWT_SECRET,
            node_env: process.env.NODE_ENV,
            vercel: !!process.env.VERCEL,
          },
        },
      });
    }

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
