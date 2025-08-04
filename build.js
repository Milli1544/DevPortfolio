const { execSync } = require("child_process");
const path = require("path");

console.log("Starting build process...");

try {
  // Check if we're in a CI environment
  const isCI = process.env.CI || process.env.VERCEL;

  if (!isCI) {
    // Only install dependencies if not in CI (where they're already installed)
    console.log("Installing root dependencies...");
    execSync("npm install", { stdio: "inherit" });

    console.log("Installing client dependencies...");
    process.chdir(path.join(__dirname, "client"));
    execSync("npm install", { stdio: "inherit" });
  } else {
    console.log("CI environment detected, skipping dependency installation...");
    // Navigate to client directory without installing
    process.chdir(path.join(__dirname, "client"));
  }

  // Run the build
  console.log("Running Vite build...");
  execSync("npm run build", { stdio: "inherit" });

  console.log("Build completed successfully!");
} catch (error) {
  console.error("Build failed:", error.message);
  process.exit(1);
}
