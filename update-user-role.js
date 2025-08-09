const mongoose = require("mongoose");

// Set environment variables for local testing
process.env.MONGODB_URI =
  "mongodb+srv://millikifleyesus:Hope4thebest@portfolio.26fxw3c.mongodb.net/portfolio?retryWrites=true&w=majority";
process.env.JWT_SECRET = "portfolio_secret_key_2024";
process.env.NODE_ENV = "development";

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

// User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please add a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 6,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

async function updateUserRole() {
  console.log("🔄 Updating user role to admin...\n");

  try {
    // Connect to database
    const connected = await connectDB();
    if (!connected) {
      console.error("❌ Database connection failed");
      return;
    }

    // Update the final user's role to admin
    const updatedUser = await User.findOneAndUpdate(
      { email: "final@example.com" },
      { role: "admin" },
      { new: true }
    );

    if (updatedUser) {
      console.log("✅ User role updated successfully!");
      console.log("User:", {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
      });
    } else {
      console.log("❌ User not found");
    }
  } catch (error) {
    console.error("❌ Error updating user role:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
}

updateUserRole();
