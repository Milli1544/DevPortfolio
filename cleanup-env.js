#!/usr/bin/env node

/**
 * Environment Variables Cleanup Script
 * This script helps identify which environment variables are actually used in your code
 */

const fs = require("fs");
const path = require("path");

console.log("🔍 Analyzing environment variables usage...\n");

// Environment variables found in your code
const usedVariables = {
  // Server-side variables
  MONGODB_URI: "Database connection string",
  JWT_SECRET: "Authentication secret key",
  JWT_EXPIRE: "JWT token expiration time",
  NODE_ENV: "Environment mode (development/production)",
  VERCEL: "Vercel deployment indicator",
  PORT: "Server port (optional, has fallback)",

  // Client-side variables
  VITE_API_URL: "Frontend API endpoint URL",
};

// Variables you currently have in Vercel
const currentVariables = {
  EXAMPLE_NAME: "I9JU23NF394R6HH",
  MONGODB_URI:
    "mongodb+srv://millikifleyesus:Hope4thebest@portfolio.26fxw3c.mongodb.net/portfolio?retryWrites=true&w=majority",
  JWT_SECRET: "portfolio_secret_key_2024",
  PORT: "5000",
  NODE_ENV: "production",
  VITE_API_URL: "https://dev-portfolio-ajsa.vercel.app",
};

console.log("📋 CURRENT VARIABLES IN VERCEL:");
Object.entries(currentVariables).forEach(([key, value]) => {
  const isUsed = key in usedVariables;
  const status = isUsed ? "✅ USED" : "❌ UNUSED";
  console.log(`${status} ${key} = ${value}`);
});

console.log("\n🎯 RECOMMENDED ACTION:");
console.log("Remove these unnecessary variables from Vercel:");
console.log("❌ EXAMPLE_NAME - Not used anywhere in code");
console.log("❌ PORT - Vercel auto-assigns port, code has fallback");

console.log("\n✅ KEEP these required variables:");
console.log("✅ MONGODB_URI - Database connection");
console.log("✅ JWT_SECRET - Authentication security");
console.log("✅ NODE_ENV - Production mode");
console.log("✅ VITE_API_URL - Frontend API endpoint");

console.log("\n📝 MANUAL STEPS TO CLEAN UP:");
console.log(
  "1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables"
);
console.log("2. Delete: EXAMPLE_NAME and PORT");
console.log("3. Keep: MONGODB_URI, JWT_SECRET, NODE_ENV, VITE_API_URL");
console.log('4. Click "Save" and redeploy');

console.log("\n🔧 After cleanup, your environment variables should be:");
console.log(
  "MONGODB_URI=mongodb+srv://millikifleyesus:Hope4thebest@portfolio.26fxw3c.mongodb.net/portfolio?retryWrites=true&w=majority"
);
console.log("JWT_SECRET=portfolio_secret_key_2024");
console.log("NODE_ENV=production");
console.log("VITE_API_URL=https://dev-portfolio-ajsa.vercel.app");
