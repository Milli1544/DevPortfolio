import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import config from "../config/config.js";
import Contact from "../server/models/Contact.js";

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

// Create new contact
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and message",
      });
    }

    const contact = await Contact.create({
      name,
      email,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Contact message sent successfully",
      data: contact,
    });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({
      success: false,
      message: "Error creating contact",
      error: error.message,
    });
  }
});

// Get all contacts (for admin)
app.get("/api/contact", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ created: -1 });
    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching contacts",
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
