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
    // Load environment variables safely
    let envVars = {};
    try {
      require("dotenv").config();
      envVars = {
        has_mongodb_uri: !!process.env.MONGODB_URI,
        has_jwt_secret: !!process.env.JWT_SECRET,
        node_env: process.env.NODE_ENV,
        vercel: !!process.env.VERCEL,
      };
    } catch (envError) {
      console.error("Environment loading error:", envError);
      envVars = { error: "Failed to load environment variables" };
    }

    // Basic health check without MongoDB dependency
    res.status(200).json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
      vercel: !!process.env.VERCEL,
      message: "Health check successful",
      env_vars: envVars,
      debug: {
        process_env_keys: Object.keys(process.env).filter(
          (key) =>
            key.includes("MONGODB") ||
            key.includes("JWT") ||
            key.includes("NODE") ||
            key.includes("VERCEL")
        ),
        dotenv_loaded: typeof require !== "undefined",
      },
    });
  } catch (error) {
    console.error("Health check error:", error);
    res.status(500).json({
      status: "error",
      message: "Health check failed",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};
