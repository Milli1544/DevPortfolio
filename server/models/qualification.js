const mongoose = require("mongoose");

const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Qualification title is required"],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, "Institution name is required"],
    trim: true,
  },
  type: {
    type: String,
    enum: ["degree", "certificate", "course", "bootcamp", "workshop"],
    required: [true, "Qualification type is required"],
  },
  field: {
    type: String,
    required: [true, "Field of study is required"],
    trim: true,
  },
  startDate: {
    type: Date,
    required: [true, "Start date is required"],
  },
  endDate: {
    type: Date,
    validate: {
      validator: function (v) {
        return !v || v >= this.startDate;
      },
      message: "End date must be after start date",
    },
  },
  ongoing: {
    type: Boolean,
    default: false,
  },
  grade: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  credentialUrl: {
    type: String,
    validate: {
      validator: function (v) {
        return !v || /^https?:\/\/.+/.test(v);
      },
      message: "Please provide a valid URL",
    },
  },
  verified: {
    type: Boolean,
    default: false,
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
qualificationSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Qualification", qualificationSchema);
