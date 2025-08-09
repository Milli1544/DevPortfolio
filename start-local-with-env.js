// Set environment variables for local testing
process.env.MONGODB_URI =
  "mongodb+srv://millikifleyesus:Hope4thebest@portfolio.26fxw3c.mongodb.net/portfolio?retryWrites=true&w=majority";
process.env.JWT_SECRET = "portfolio_secret_key_2024";
process.env.NODE_ENV = "development";

console.log("🚀 Starting server with environment variables...");
console.log("📊 Environment variables set:");
console.log(
  "- MONGODB_URI:",
  process.env.MONGODB_URI ? "✅ Set" : "❌ Missing"
);
console.log("- JWT_SECRET:", process.env.JWT_SECRET ? "✅ Set" : "❌ Missing");
console.log("- NODE_ENV:", process.env.NODE_ENV);

// Start the server
require("./simple-server.js");
