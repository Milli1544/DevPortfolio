const axios = require('axios');

const API_BASE_URL = 'https://dev-portfolio-ajsa.vercel.app';

async function testDatabase() {
  console.log('🔍 Testing database connection...\n');

  try {
    // Test health endpoint
    console.log('1. Testing health endpoint...');
    const healthResponse = await axios.get(`${API_BASE_URL}/api/health`);
    console.log('✅ Health check passed:', healthResponse.data);
    console.log('');

    // Test projects endpoint
    console.log('2. Testing projects endpoint...');
    const projectsResponse = await axios.get(`${API_BASE_URL}/api/projects`);
    console.log('✅ Projects endpoint working');
    console.log('📊 Projects count:', projectsResponse.data.count);
    console.log('');

    // Test qualifications endpoint
    console.log('3. Testing qualifications endpoint...');
    const qualificationsResponse = await axios.get(`${API_BASE_URL}/api/qualifications`);
    console.log('✅ Qualifications endpoint working');
    console.log('📊 Qualifications count:', qualificationsResponse.data.count);
    console.log('');

    // If no data, offer to seed
    if (projectsResponse.data.count === 0 || qualificationsResponse.data.count === 0) {
      console.log('⚠️  Database appears to be empty. Would you like to seed it with sample data?');
      console.log('   Run: node seed-database.js');
    } else {
      console.log('🎉 Database is working correctly with data!');
    }

  } catch (error) {
    console.error('❌ Error testing database:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

async function seedDatabase() {
  console.log('🌱 Seeding database with sample data...\n');

  try {
    const response = await axios.post(`${API_BASE_URL}/api/seed-data`);
    console.log('✅ Database seeded successfully!');
    console.log('📊 Added:', response.data.data);
    console.log('');
    console.log('🔄 Now testing the seeded data...');
    
    // Test the seeded data
    await testDatabase();

  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Check command line arguments
const command = process.argv[2];

if (command === 'seed') {
  seedDatabase();
} else {
  testDatabase();
}
