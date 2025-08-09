// CORS configuration utility
const setupCORS = (req, res) => {
  const allowedOrigins = [
    "https://dev-portfolio-ajsa.vercel.app",
    "https://dev-portfolio-ajsa-git-760186-millionkifleyesus-4084s-projects.vercel.app",
    "http://localhost:5173",
    "http://localhost:5178",
    "http://localhost:3000"
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  } else {
    res.setHeader("Access-Control-Allow-Origin", "*");
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "86400");

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true; // Indicates this was a preflight request
  }
  
  return false; // Indicates this was not a preflight request
};

module.exports = setupCORS;
