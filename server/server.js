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
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

// Serve static files from client build (in production or on Render)
const isProduction = process.env.NODE_ENV === "production" || process.env.RENDER;
console.log("Environment check:", {
  NODE_ENV: process.env.NODE_ENV,
  RENDER: process.env.RENDER,
  isProduction: isProduction
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

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI || config.mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  .then(() => {
    console.log("Connected to MongoDB database: Portfolio");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    console.log("Continuing without database connection...");
    // Don't exit the process, just log the error
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
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  } else {
    console.log("Serving API welcome page");
    res.send(`
        <h1>Welcome to My Portfolio Backend API</h1>
        <p>Server is running successfully on port ${PORT}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
        <p><strong>Render:</strong> ${process.env.RENDER || 'false'}</p>
        <p><strong>Client dist exists:</strong> ${distExists}</p>
        <h3>Available Endpoints:</h3>
        <ul>
            <li>GET /api/contacts - Get all contacts</li>
            <li>GET /api/projects - Get all projects</li>
            <li>GET /api/qualifications - Get all qualifications</li>
            <li>GET /api/users - Get all users</li>
            <li>POST /api/auth - Authentication endpoints</li>
        </ul>
    `);
  }
});

// Catch-all route for client-side routing (in production or on Render)
if (isProduction && distExists) {
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../client/dist/index.html"));
  });
}

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API URL: http://localhost:${PORT}`);
  console.log(`Frontend URL: http://localhost:3000`);
});

module.exports = app;
