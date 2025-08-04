const { execSync } = require("child_process");
const path = require("path");

console.log("Starting build process...");

try {
  // Install root dependencies
  console.log("Installing root dependencies...");
  execSync("npm install", { stdio: "inherit" });

  // Navigate to client directory and install dependencies
  console.log("Installing client dependencies...");
  process.chdir(path.join(__dirname, "client"));
  execSync("npm install", { stdio: "inherit" });

  // Run the build
  console.log("Running Vite build...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
