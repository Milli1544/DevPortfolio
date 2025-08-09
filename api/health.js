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
    // Simple health check without any complex operations
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      message: "Health check successful",
      environment: process.env.NODE_ENV || "development",
      vercel: !!process.env.VERCEL,
      env_check: {
        has_mongodb_uri: !!process.env.MONGODB_URI,
        has_jwt_secret: !!process.env.JWT_SECRET,
        node_env: process.env.NODE_ENV,
      }
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: "Health check failed",
      error: error.message
    });
  }
};
