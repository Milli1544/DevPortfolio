const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET || "portfolio_secret_key",
    {
      expiresIn: process.env.JWT_EXPIRE || "30d",
    }
  );
};

// User signin
const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password",
      });
    }

    // Find user by email and include password for comparison
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Check password using the comparePassword method
    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    // Generate token
    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        created: user.created,
        updated: user.updated,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error signing in user",
      error: error.message,
    });
  }
};

// User signout
const signout = (req, res) => {
  res.status(200).json({
    success: true,
    message: "User signed out successfully",
  });
};

// User signup
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide name, email, and password",
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists with this email",
      });
    }

    // Create new user with admin role for specific email
    const userData = {
      name,
      email,
      password,
    };
    
    // Set admin role for specific email
    if (email === 'admin@portfolio.com') {
      userData.role = 'admin';
    }
    
    const user = await User.create(userData);

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        created: user.created,
        updated: user.updated,
      },
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Error creating user",
      error: error.message,
    });
  }
};

module.exports = {
  signin,
  signout,
  signup,
};
