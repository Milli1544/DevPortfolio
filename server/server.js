const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const path = require("path");
require("dotenv").config();

// Import routes
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const qualificationRoutes = require("./routes/qualificationRoutes");
const contactRoutes = require("./routes/contactRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Security middleware
app.use(helmet());
app.use(compression());

// CORS configuration
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? ["https://dev-portfolio-ajsa.vercel.app", "https://your-domain.com"]
        : [
            "http://localhost:3000",
            "http://localhost:5173",
            "http://localhost:5178",
          ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Body parsing middleware
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());

// MongoDB connection
const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI;
    if (!mongoUri) {
      throw new Error("MONGODB_URI is not defined in environment variables");
    }

    const conn = await mongoose.connect(mongoUri, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    console.log(`Database: ${conn.connection.name}`);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// Connect to database
connectDB();

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/qualifications", qualificationRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/users", userRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
    database:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
  });
});

// Serve static files in production
if (process.env.NODE_ENV === "production") {
  // Check if client/dist exists
  const clientDistPath = path.join(__dirname, "../client/dist");
  const fs = require("fs");

  if (fs.existsSync(clientDistPath)) {
    console.log("Client dist exists: true");
    console.log("Serving static files from client/dist");
    app.use(express.static(clientDistPath));

    // Handle React Router - serve index.html for all non-API routes
    app.get("/*", (req, res) => {
      if (!req.path.startsWith("/api")) {
        res.sendFile(path.join(clientDistPath, "index.html"));
      }
    });
  } else {
    console.log("Client dist exists: false");
    console.log("Client dist path:", clientDistPath);
    app.get("/", (req, res) => {
      res.json({
        message: "Portfolio API Server",
        status: "running",
        note: "Frontend not built - run npm run build in client directory",
      });
    });
  }
} else {
  app.get("/", (req, res) => {
    res.json({
      message: "Portfolio API Server - Development Mode",
      status: "running",
      environment: "development",
    });
  });
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);

  let error = { ...err };
  error.message = err.message;

  // Mongoose bad ObjectId
  if (err.name === "CastError") {
    const message = "Resource not found";
    error = { message, statusCode: 404 };
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate field value entered";
    error = { message, statusCode: 400 };
  }

  // Mongoose validation error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
    error = { message, statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || "Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// Handle 404 for API routes
app.use("/api/*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `API route ${req.originalUrl} not found`,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${
      process.env.NODE_ENV || "development"
    } mode on port ${PORT}`
  );
});

module.exports = app;
