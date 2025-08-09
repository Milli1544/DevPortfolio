const jwt = require("jsonwebtoken");

function decodeJWT(token) {
  try {
    // Decode without verification to see the payload
    const decoded = jwt.decode(token);
    console.log("🔍 JWT Token Analysis:");
    console.log("Decoded payload:", JSON.stringify(decoded, null, 2));

    // Check what fields are present
    console.log("\n📋 Token Fields:");
    console.log("- id:", decoded.id);
    console.log("- iat:", decoded.iat);
    console.log("- exp:", decoded.exp);

    return decoded;
  } catch (error) {
    console.error("❌ Error decoding JWT:", error.message);
    return null;
  }
}

// Test with a sample token from signup
const sampleToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4OTZhMjFiMzIzYjg0ZDM0OWViNTY0NCIsImlhdCI6MTc1NDcwMjM2MywiZXhwIjoxNzU3Mjk0MzYzfQ.TBGXGj82vwipiPUbQGmstHwkDRiV9xG2LQQiu2sZv_g";

decodeJWT(sampleToken);
