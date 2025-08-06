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

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Contact =
  mongoose.models.Contact || mongoose.model("Contact", contactSchema);

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
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      return res.status(500).json({
        success: false,
        message: "Database connection failed",
      });
    }

    if (req.method === "POST") {
      const contact = await Contact.create(req.body);
      res.status(201).json({
        success: true,
        message: "Contact message sent successfully",
        data: contact,
      });
    } else if (req.method === "GET") {
      const contacts = await Contact.find().sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: contacts.length,
        data: contacts,
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Contacts API error:", error);
    res.status(500).json({
      success: false,
      message: "Error processing contact request",
      error: error.message,
    });
  }
};
