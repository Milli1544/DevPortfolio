const { execSync } = require("child_process");
const fs = require("fs");

console.log("🚀 Starting simplified build process...");

try {
  // Install root dependencies
  console.log("📦 Installing root dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Install client dependencies
  console.log("📦 Installing client dependencies...");
  execSync("cd client && npm install", { stdio: "inherit" });

  // Build the client
  console.log("🔨 Building client...");
  execSync("cd client && npm run build", { stdio: "inherit" });

  // Verify build output
  if (!fs.existsSync("client/dist")) {
    throw new Error("Client build failed - dist directory not found");
  }

  console.log("✅ Build completed successfully!");
  console.log("📁 Build output: client/dist/");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}
