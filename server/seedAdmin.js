const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const config = require("../config/config.js");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || config.mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAdminUser = async () => {
  try {
    // Check if admin user already exists
    const existingAdmin = await User.findOne({ email: "admin@portfolio.com" });

    if (existingAdmin) {
      console.log("Admin user already exists");
      process.exit(0);
    }

    // Create admin user
    const adminUser = new User({
      name: "Portfolio Admin",
      email: "admin@portfolio.com",
      password: "admin123456",
      role: "admin",
    });

    await adminUser.save();

    console.log("Admin user created successfully!");
    console.log("Email: admin@portfolio.com");
    console.log("Password: admin123456");
    console.log("Role: admin");
  } catch (error) {
    console.error("Error creating admin user:", error);
  } finally {
    mongoose.connection.close();
  }
};

createAdminUser();
