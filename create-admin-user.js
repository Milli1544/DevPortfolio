const axios = require("axios");

async function createAdminUser() {
  console.log("👑 Creating admin user for testing...\n");

  try {
    // Create a new admin user
    const adminData = {
      name: "Test Admin",
      email: "testadmin@example.com",
      password: "admin123",
    };

    console.log("📤 Creating admin user...");
    const response = await axios.post(
      "http://localhost:5000/api/auth/signup",
      adminData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("✅ Admin user created successfully!");
    console.log("Response:", response.data);

    // Note: The user will be created with 'user' role by default
    // You'll need to manually update the role in the database to 'admin'
    console.log(
      "\n⚠️  Note: User created with 'user' role. To make them admin:"
    );
    console.log("1. Go to MongoDB Compass");
    console.log("2. Find the user with email: testadmin@example.com");
    console.log("3. Change 'role' from 'user' to 'admin'");
  } catch (error) {
    console.error("❌ Failed to create admin user:");
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Data:", error.response.data);
    } else {
      console.error("Error:", error.message);
    }
  }
}

createAdminUser();
