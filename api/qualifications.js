import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "../config/config.js";
import Qualification from "../server/models/qualification.js";

const app = express();

// Connect to MongoDB
mongoose
  .connect(config.mongoUri)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Middleware
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? [
            "https://potential-carnival.vercel.app",
            "https://your-frontend-domain.vercel.app",
          ]
        : ["http://localhost:5178"],
    credentials: true,
  })
);
app.use(express.json());

// Get all qualifications
app.get("/api/qualifications", async (req, res) => {
  try {
    const qualifications = await Qualification.find().sort({ created: -1 });
    res.status(200).json({
      success: true,
      count: qualifications.length,
      data: qualifications,
    });
  } catch (error) {
    console.error("Error fetching qualifications:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching qualifications",
      error: error.message,
    });
  }
});

// Get qualification by ID
app.get("/api/qualifications/:id", async (req, res) => {
  try {
    const qualification = await Qualification.findById(req.params.id);
    if (!qualification) {
      return res.status(404).json({
        success: false,
        message: "Qualification not found",
      });
    }
    res.status(200).json({
      success: true,
      data: qualification,
    });
  } catch (error) {
    console.error("Error fetching qualification:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching qualification",
      error: error.message,
    });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

export default app;
