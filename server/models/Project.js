const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Project title is required"],
      trim: true,
      maxlength: [100, "Title cannot exceed 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    technologies: {
      type: String,
      required: [true, "Technologies are required"],
      trim: true,
      maxlength: [200, "Technologies cannot exceed 200 characters"],
    },
    imageUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Image URL cannot exceed 500 characters"],
    },
    githubUrl: {
      type: String,
      trim: true,
      maxlength: [500, "GitHub URL cannot exceed 500 characters"],
    },
    liveUrl: {
      type: String,
      trim: true,
      maxlength: [500, "Live URL cannot exceed 500 characters"],
    },
    category: {
      type: String,
      enum: ["web", "mobile", "desktop", "other"],
      default: "web",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", projectSchema);
