const axios = require("axios");

// Test both possible URLs
const URLs = [
  "https://dev-portfolio-ajsa.vercel.app",
  "https://potential-carnival.vercel.app",
];

async function testURLs() {
  console.log("🔍 Testing deployment URLs...\n");

  for (const baseURL of URLs) {
    console.log(`Testing: ${baseURL}`);

    try {
      // Test health endpoint
      const healthResponse = await axios.get(`${baseURL}/api/health`, {
        timeout: 5000,
      });
      console.log(`✅ Health endpoint working: ${healthResponse.data.message}`);

      // Test projects endpoint
      const projectsResponse = await axios.get(`${baseURL}/api/projects`, {
        timeout: 5000,
      });
      console.log(
        `✅ Projects endpoint working: ${projectsResponse.data.count} projects`
      );

      // Test qualifications endpoint
      const qualificationsResponse = await axios.get(
        `${baseURL}/api/qualifications`,
        {
          timeout: 5000,
        }
      );
      console.log(
        `✅ Qualifications endpoint working: ${qualificationsResponse.data.count} qualifications`
      );

      console.log(`🎉 ${baseURL} is working correctly!\n`);

      // If this URL works, update the client config
      if (baseURL === "https://potential-carnival.vercel.app") {
        console.log(
          "⚠️  Your API is deployed at potential-carnival.vercel.app"
        );
        console.log(
          "   You need to update your client/src/config/api.js to use this URL"
        );
        console.log(
          "   Change the API_BASE_URL to: https://potential-carnival.vercel.app"
        );
      }

      return baseURL;
    } catch (error) {
      console.log(`❌ ${baseURL} failed: ${error.message}\n`);
    }
  }

  console.log("❌ No working URLs found. Check your Vercel deployment.");
  return null;
}

async function seedDatabase(baseURL) {
  if (!baseURL) {
    console.log("❌ No working URL to seed database");
    return;
  }

  console.log(`🌱 Seeding database at ${baseURL}...`);

  try {
    const response = await axios.post(
      `${baseURL}/api/seed-data`,
      {},
      {
        timeout: 10000,
      }
    );
    console.log("✅ Database seeded successfully!");
    console.log("📊 Added:", response.data.data);
  } catch (error) {
    console.log("❌ Failed to seed database:", error.message);
    if (error.response) {
      console.log("Response:", error.response.data);
    }
  }
}

async function main() {
  const workingURL = await testURLs();

  if (workingURL) {
    console.log("Would you like to seed the database? (y/n)");
    // In a real script, you'd read from stdin
    // For now, we'll just seed it
    await seedDatabase(workingURL);
  }
}

main().catch(console.error);
