import mongoose from "mongoose";
import config from "../config/config.js";
import Qualification from "../server/models/qualification.js";

// Connect to MongoDB
const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  await mongoose.connect(config.mongoUri);
};

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  try {
    await connectDB();

    if (req.method === 'GET') {
      // Handle both /api/qualifications and /api/qualifications/:id
      const { id } = req.query;
      
      if (id) {
        // Get qualification by ID
        const qualification = await Qualification.findById(id);
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
      } else {
        // Get all qualifications
        const qualifications = await Qualification.find().sort({ created: -1 });
        res.status(200).json({
          success: true,
          count: qualifications.length,
          data: qualifications,
        });
      }
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching qualifications",
      error: error.message,
    });
  }
}