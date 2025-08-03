const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema(
  {
    degree: {
      type: String,
      required: [true, "Degree is required"],
      trim: true,
      maxlength: [100, "Degree cannot exceed 100 characters"],
    },
    institution: {
      type: String,
      required: [true, "Institution is required"],
      trim: true,
      maxlength: [200, "Institution cannot exceed 200 characters"],
    },
    field: {
      type: String,
      required: [true, "Field of study is required"],
      trim: true,
      maxlength: [100, "Field cannot exceed 100 characters"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
      maxlength: [1000, "Description cannot exceed 1000 characters"],
    },
    grade: {
      type: String,
      trim: true,
      maxlength: [50, "Grade cannot exceed 50 characters"],
    },
    type: {
      type: String,
      enum: ["education", "certification", "experience"],
      default: "education",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Qualification", qualificationSchema);
