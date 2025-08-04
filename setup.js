const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

console.log("🚀 Setting up portfolio project...");

try {
  // Check if we're in the right directory
  if (!fs.existsSync("package.json") || !fs.existsSync("client/package.json")) {
    throw new Error("Please run this script from the project root directory");
  }

  // Install root dependencies
  console.log("📦 Installing root dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Install client dependencies
  console.log("📦 Installing client dependencies...");
  execSync("cd client && npm install", { stdio: "inherit" });

  // Check if .env file exists
  if (!fs.existsSync(".env")) {
    console.log(
      "⚠️  No .env file found. Please create one based on env.example"
    );
    console.log("📝 Copy env.example to .env and update the values");
  }

  // Check if client env.production exists
  if (!fs.existsSync("client/env.production")) {
    console.log(
      "⚠️  No client/env.production file found. Please create one for production deployment"
    );
  }

  console.log("✅ Setup completed successfully!");
  console.log("");
  console.log("📋 Next steps:");
  console.log("1. Create .env file from env.example");
  console.log("2. Create client/env.production with your API URL");
  console.log('3. Run "npm run dev" to start development');
  console.log('4. Run "npm run build" to test production build');
} catch (error) {
  console.error("❌ Setup failed:", error.message);
  process.exit(1);
}
