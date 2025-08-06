const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const compression = require("compression"); // Add this line
const fs = require("fs"); // Added for file system checks

const contactRoutes = require("./routes/contactRoutes");
const projectRoutes = require("./routes/projectRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://dev-portfolio-ajsa.vercel.app",
            "https://dev-portfolio-ajsa-*.vercel.app",
            "https://*.vercel.app",
          ]
        : [
            "http://localhost:5173",
            "http://localhost:5178",
            "http://localhost:5181",
            "http://localhost:5182",
            "http://localhost:5183",
          ],
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Add compression middleware before other middleware
app.use(
  compression({
    level: 6, // Compression level (0-9, higher = better compression but slower)
    threshold: 1024, // Only compress responses larger than 1KB
    filter: (req, res) => {
      // Don't compress if client doesn't support it
      if (req.headers["x-no-compression"]) {
        return false;
      }
      // Use compression for all other requests
      return compression.filter(req, res);
    },
  })
);

// Serve static files from client build (in production or on Vercel)
const isProduction =
  process.env.NODE_ENV === "production" || process.env.VERCEL;
console.log("Environment check:", {
  NODE_ENV: process.env.NODE_ENV,
  VERCEL: process.env.VERCEL,
  isProduction: isProduction,
});

// Check if client/dist exists
const clientDistPath = path.join(__dirname, "../client/dist");
const distExists = fs.existsSync(clientDistPath);
console.log("Client dist path:", clientDistPath);
console.log("Client dist exists:", distExists);

if (isProduction) {
  console.log("Serving static files from client/dist");
  if (distExists) {
    app.use(express.static(clientDistPath));
  } else {
    console.log("WARNING: client/dist does not exist! Build may have failed.");
  }
} else {
  console.log("Running in development mode - API only");
}

// Import config
const config = require("../config/config.js");

// MongoDB connection with better error handling
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || config.mongoUri;
    console.log("Attempting to connect to MongoDB...");
    console.log("MongoDB URI exists:", !!mongoUri);

    if (!mongoUri) {
      console.error("MONGODB_URI is not defined!");
      console.log("Available environment variables:", Object.keys(process.env));
      throw new Error("MONGODB_URI environment variable is required");
    }

    await mongoose.connect(mongoUri, {
      // Remove deprecated options that cause warnings
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log("Connected to MongoDB database: Portfolio");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    console.error("Error details:", {
      message: err.message,
      code: err.code,
      name: err.name,
    });

    // In production, we should fail fast if DB connection fails
    if (process.env.NODE_ENV === "production" || process.env.VERCEL) {
      console.error("FATAL: Cannot connect to database in production!");
      // Don't exit immediately, let the server start but log the error
      console.log("Server will start but database operations will fail");
    } else {
      console.log("Continuing without database connection in development...");
    }
  }
};

// Connect to database
connectDB();

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    vercel: !!process.env.VERCEL,
    mongodb:
      mongoose.connection.readyState === 1 ? "connected" : "disconnected",
    env_vars: {
      has_mongodb_uri: !!process.env.MONGODB_URI,
      has_jwt_secret: !!process.env.JWT_SECRET,
      port: process.env.PORT || 5000,
    },
  });
});

// Routes - tell server what to do for different URLs
app.use("/api/contacts", contactRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

// Root route - what happens when someone visits just "/"
app.get("/", (req, res) => {
  if (isProduction && distExists) {
    console.log("Serving React frontend from client/dist/index.html");
    const indexPath = path.join(__dirname, "../client/dist/index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      console.log("index.html not found, serving API welcome page");
      res.send(`
          <h1>Welcome to My Portfolio Backend API</h1>
          <p>Server is running successfully on port ${PORT}</p>
          <p><strong>Environment:</strong> ${
            process.env.NODE_ENV || "development"
          }</p>
          <p><strong>Vercel:</strong> ${process.env.VERCEL || "false"}</p>
          <p><strong>Client dist exists:</strong> ${distExists}</p>
          <p><strong>index.html exists:</strong> ${fs.existsSync(indexPath)}</p>
          <h3>Available Endpoints:</h3>
          <ul>
              <li>GET /api/health - Health check</li>
              <li>GET /api/contacts - Get all contacts</li>
              <li>GET /api/projects - Get all projects</li>
              <li>GET /api/qualifications - Get all qualifications</li>
              <li>GET /api/users - Get all users</li>
              <li>POST /api/auth - Authentication endpoints</li>
          </ul>
      `);
    }
  } else {
    console.log("Serving API welcome page");
    res.send(`
        <h1>Welcome to My Portfolio Backend API</h1>
        <p>Server is running successfully on port ${PORT}</p>
        <p><strong>Environment:</strong> ${
          process.env.NODE_ENV || "development"
        }</p>
        <p><strong>Vercel:</strong> ${process.env.VERCEL || "false"}</p>
        <p><strong>Client dist exists:</strong> ${distExists}</p>
        <h3>Available Endpoints:</h3>
        <ul>
            <li>GET /api/health - Health check</li>
            <li>GET /api/contacts - Get all contacts</li>
            <li>GET /api/projects - Get all projects</li>
            <li>GET /api/qualifications - Get all qualifications</li>
            <li>GET /api/users - Get all users</li>
            <li>POST /api/auth - Authentication endpoints</li>
        </ul>
    `);
  }
});

// Catch-all route for client-side routing (in production or on Vercel)
if (isProduction && distExists) {
  app.get("*", (req, res) => {
    // Don't catch API routes
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ message: "API route not found" });
    }
    // Check if the file exists before sending
    const indexPath = path.join(__dirname, "../client/dist/index.html");
    if (fs.existsSync(indexPath)) {
      res.sendFile(indexPath);
    } else {
      res.status(404).json({ message: "Frontend not found" });
    }
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Server error:", err);

  // Handle path-to-regexp errors specifically
  if (err.message && err.message.includes("Missing parameter name")) {
    console.error("Path-to-regexp error detected:", err.message);
    return res.status(400).json({
      message: "Invalid route parameter",
      error: "Route parameter error detected",
    });
  }

  res.status(500).json({
    message: "Internal server error",
    error:
      process.env.NODE_ENV === "development"
        ? err.message
        : "Something went wrong",
  });
});

// 404 handler for unmatched routes
app.use((req, res) => {
  console.log("404 for path:", req.path);
  res.status(404).json({
    message: "Route not found",
    path: req.path,
    method: req.method,
  });
});

// Global error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 API URL: http://localhost:${PORT}`);
  if (!isProduction) {
    console.log(`🎨 Frontend URL: http://localhost:5173`);
  }
});

module.exports = app;
