const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Project title is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Project description is required"],
  },
  technologies: [
    {
      type: String,
      required: true,
    },
  ],
  githubUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Please provide a valid URL",
    },
  },
  liveUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return /^https?:\/\/.+/.test(v);
      },
      message: "Please provide a valid URL",
    },
  },
  image: {
    type: String,
  },
  featured: {
    type: Boolean,
    default: false,
  },
  category: {
    type: String,
    enum: ["web", "mobile", "desktop", "other"],
    default: "web",
  },
  status: {
    type: String,
    enum: ["completed", "in-progress", "planned"],
    default: "completed",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
projectSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Project", projectSchema);
