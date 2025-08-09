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
    // Simple environment test
    res.status(200).json({
      status: "ok",
      message: "Environment test successful",
      timestamp: new Date().toISOString(),
      environment: {
        NODE_ENV: process.env.NODE_ENV,
        VERCEL: process.env.VERCEL,
        MONGODB_URI: process.env.MONGODB_URI ? "SET" : "NOT_SET",
        JWT_SECRET: process.env.JWT_SECRET ? "SET" : "NOT_SET",
        PORT: process.env.PORT,
      },
    });
  } catch (error) {
    console.error("Environment test error:", error);
    res.status(500).json({
      status: "error",
      message: "Environment test failed",
      error: error.message,
    });
  }
};
