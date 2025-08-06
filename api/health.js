const mongoose = require("mongoose");
require("dotenv").config();

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
    // MongoDB connection status
    const mongoStatus = mongoose.connection.readyState === 1 ? "connected" : "disconnected";
    
    // Check environment variables
    const envVars = {
      has_mongodb_uri: !!process.env.MONGODB_URI,
      has_jwt_secret: !!process.env.JWT_SECRET,
      node_env: process.env.NODE_ENV,
      vercel: !!process.env.VERCEL,
      mongodb_uri_length: process.env.MONGODB_URI ? process.env.MONGODB_URI.length : 0,
      mongodb_uri_start: process.env.MONGODB_URI ? process.env.MONGODB_URI.substring(0, 20) + "..." : "undefined"
    };

    // Try to connect to MongoDB if not connected
    let connectionAttempt = "not attempted";
    if (mongoose.connection.readyState === 0) {
      try {
        connectionAttempt = "attempting...";
        await mongoose.connect(process.env.MONGODB_URI, {
          maxPoolSize: 10,
          serverSelectionTimeoutMS: 5000,
          socketTimeoutMS: 45000,
        });
        connectionAttempt = "successful";
      } catch (error) {
        connectionAttempt = `failed: ${error.message}`;
      }
    } else {
      connectionAttempt = "already connected";
    }

    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      vercel: !!process.env.VERCEL,
      mongodb: {
        status: mongoStatus,
        readyState: mongoose.connection.readyState,
        connectionAttempt: connectionAttempt
      },
      env_vars: envVars,
      debug: {
        available_env_keys: Object.keys(process.env).filter(key => 
          key.includes('MONGO') || key.includes('JWT') || key.includes('NODE') || key.includes('VERCEL')
        )
      }
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: "Health check failed",
      error: error.message,
      debug: {
        has_mongodb_uri: !!process.env.MONGODB_URI,
        node_env: process.env.NODE_ENV,
        vercel: !!process.env.VERCEL
      }
    });
  }
};
