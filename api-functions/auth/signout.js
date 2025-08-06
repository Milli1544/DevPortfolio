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
    if (req.method === "POST") {
      // For JWT-based authentication, signout is typically handled client-side
      // by removing the token from localStorage/sessionStorage
      // This endpoint can be used for additional server-side cleanup if needed

      res.status(200).json({
        success: true,
        message: "User signed out successfully",
      });
    } else {
      res.status(405).json({
        success: false,
        message: "Method not allowed",
      });
    }
  } catch (error) {
    console.error("Signout API error:", error);
    res.status(500).json({
      success: false,
      message: "Error signing out user",
      error: error.message,
    });
  }
};
