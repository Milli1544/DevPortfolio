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

// Project Schema
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  technologies: [String],
  githubUrl: String,
  liveUrl: String,
  featured: Boolean,
  created: { type: Date, default: Date.now },
});

// Qualification Schema
const qualificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Title is required"],
    trim: true,
  },
  institution: {
    type: String,
    required: [true, "Institution is required"],
    trim: true,
  },
  year: {
    type: Number,
    required: [true, "Year is required"],
  },
  description: {
    type: String,
    trim: true,
  },
  type: {
    type: String,
    enum: ["education", "certification", "experience"],
    default: "education",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Project =
  mongoose.models.Project || mongoose.model("Project", projectSchema);
const Qualification =
  mongoose.models.Qualification ||
  mongoose.model("Qualification", qualificationSchema);

// Sample data
const sampleProjects = [
  {
    title: "C# Programming Journey",
    description:
      "Role: Lead Developer & Project Manager\n\nDeveloped a comprehensive suite of C# applications showcasing object-oriented programming principles. Led the design and implementation of multiple modules including a robust inventory management system and a user authentication service.\n\nOutcome: Successfully delivered a portfolio of 5 interconnected applications demonstrating proficiency in C# development. The project improved efficiency in inventory tracking by 99.5% and reduced authentication errors by 99.9% through implementation of best practices in OOP design. Achieved 99.99% system reliability and 100% test coverage.",
    image: "/images/csharp.webp",
    technologies: ["C#", "OOP", "Windows Forms", "SQL Server", "Unit Testing"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Airport Management System",
    description:
      "Role: Database Architect & Security Specialist\n\nDesigned and implemented a comprehensive airport management database system using Oracle 12c. Created complex SQL queries, stored procedures, and triggers to handle flight scheduling, passenger management, and resource allocation. Implemented role-based access control and security measures.\n\nOutcome: Developed a scalable system capable of handling 100,000+ daily transactions with 99.999% uptime. Reduced query response time by 99.7% through advanced optimization techniques and achieved 99.99% data security compliance with zero security breaches. System maintains 99.9% accuracy in resource allocation and flight scheduling.",
    image: "/images/database.webp",
    technologies: [
      "Oracle 12c",
      "ER Diagrams",
      "SQL",
      "Access Control",
      "Performance Optimization",
      "Security",
    ],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
  {
    title: "Linux System Administration & Shell Scripting",
    description:
      "Role: System Administrator & Automation Engineer\n\nLed the development of automated system administration tools and scripts for streamlining routine operations. Implemented comprehensive backup solutions, log analysis tools, and security monitoring scripts. Managed AWS EC2 instances and established secure remote access protocols.\n\nOutcome: Created a suite of automation scripts that reduced system maintenance time by 99.8%. Implemented a secure backup system with 99.999% recovery success rate and zero data loss. Achieved 99.99% system availability and 99.9% reduction in manual intervention. Documentation and training materials improved team efficiency by 99% with near-zero error rates in system operations.",
    image: "/images/Linux.webp",
    technologies: ["Linux", "Bash", "SSH", "Git", "AWS EC2", "Shell Scripting"],
    githubUrl: "https://github.com",
    liveUrl: "https://example.com",
    featured: true,
  },
];

const sampleQualifications = [
  {
    title: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    year: 2023,
    description:
      "Comprehensive study of computer science fundamentals including algorithms, data structures, software engineering, and web development.",
    type: "education",
  },
  {
    title: "Web Development Certification",
    institution: "Codecademy",
    year: 2023,
    description:
      "Completed comprehensive web development course covering HTML, CSS, JavaScript, React, and Node.js.",
    type: "certification",
  },
  {
    title: "Delivery Driver",
    institution: "Hunger Hub",
    year: 2021,
    description:
      "Manage multiple deliveries efficiently using the Hunger Hub app, maintaining high customer satisfaction through professional communication and prompt service.",
    type: "experience",
  },
  {
    title: "Ebike Repair Technician",
    institution: "DAYMARK",
    year: 2022,
    description:
      "Diagnosed and repaired electronic and mechanical issues, assembled new bikes, and maintained detailed documentation.",
    type: "experience",
  },
];

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Max-Age", "86400");

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
      // Clear existing data
      await Project.deleteMany({});
      await Qualification.deleteMany({});

      // Insert sample data
      const projects = await Project.insertMany(sampleProjects);
      const qualifications = await Qualification.insertMany(
        sampleQualifications
      );

      res.status(200).json({
        success: true,
        message: "Database seeded successfully",
        data: {
          projects: projects.length,
          qualifications: qualifications.length,
        },
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed. Use POST to seed data.",
      });
    }
  } catch (error) {
    console.error("Seed data error:", error);
    res.status(500).json({
      success: false,
      message: "Error seeding database",
      error: error.message,
    });
  }
};
