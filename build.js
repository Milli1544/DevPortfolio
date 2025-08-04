const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Starting build process...");

try {
  // Check if client directory exists
  if (!fs.existsSync("client")) {
    throw new Error("Client directory not found");
  }

  // Install client dependencies
  console.log("📦 Installing client dependencies...");
  execSync("cd client && npm install", { stdio: "inherit" });

  // Build the client
  console.log("🔨 Building client...");
  execSync("cd client && npm run build", { stdio: "inherit" });

  // Check if build was successful
  if (!fs.existsSync("client/dist")) {
    throw new Error("Client build failed - dist directory not found");
  }

  console.log("✅ Build completed successfully!");
  console.log("📁 Build output: client/dist/");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
