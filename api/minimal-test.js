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
    // Minimal response with no dependencies
    res.status(200).json({
      status: "ok",
      message: "Minimal test successful",
      timestamp: new Date().toISOString(),
      method: req.method,
      url: req.url,
    });
  } catch (error) {
    console.error("Minimal test error:", error);
    res.status(500).json({
      status: "error",
      message: "Minimal test failed",
      error: error.message,
    });
  }
};
