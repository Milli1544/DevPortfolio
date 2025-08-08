# Database Setup Guide

## Issue Summary
Your Vercel deployment is successful, but the frontend is showing "Failed to load projects from server" and "Failed to load qualifications from server" because:

1. **Missing MongoDB URI**: The `MONGODB_URI` environment variable is not set in Vercel
2. **Empty Database**: Even if connected, your database has no data

## Step-by-Step Solution

### 1. Set Up MongoDB Database

#### Option A: MongoDB Atlas (Recommended)
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account and cluster
3. Create a database user with read/write permissions
4. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority`)

#### Option B: Local MongoDB
1. Install MongoDB locally
2. Use connection string: `mongodb://localhost:27017/portfolio`

### 2. Configure Vercel Environment Variables

1. Go to your Vercel dashboard
2. Select your project (`dev-portfolio-ajsa`)
3. Go to **Settings** → **Environment Variables**
4. Add the following variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your MongoDB connection string
   - **Environment**: Production (and Preview if needed)
5. Click **Save**

### 3. Deploy the Updated Code

1. Commit and push your changes:
```bash
git add .
git commit -m "Add database seeding functionality"
git push origin main
```

2. Vercel will automatically redeploy

### 4. Test and Seed the Database

#### Option A: Use the Test Script
1. Install axios if not already installed:
```bash
npm install axios
```

2. Test the database connection:
```bash
node test-database.js
```

3. If the database is empty, seed it:
```bash
node test-database.js seed
```

#### Option B: Manual Testing
1. Test the health endpoint:
   - Visit: `https://dev-portfolio-ajsa.vercel.app/api/health`

2. Test the projects endpoint:
   - Visit: `https://dev-portfolio-ajsa.vercel.app/api/projects`

3. Test the qualifications endpoint:
   - Visit: `https://dev-portfolio-ajsa.vercel.app/api/qualifications`

4. Seed the database (POST request):
   - URL: `https://dev-portfolio-ajsa.vercel.app/api/seed-data`
   - Method: POST
   - Use Postman, curl, or any API testing tool

### 5. Verify the Fix

After seeding, your website should:
- ✅ Load projects from the database
- ✅ Load qualifications from the database
- ✅ Show real data instead of fallback data

## Troubleshooting

### If you still see "Failed to load" errors:

1. **Check Vercel Function Logs**:
   - Go to Vercel dashboard → Functions
   - Check the logs for `/api/projects` and `/api/qualifications`
   - Look for MongoDB connection errors

2. **Verify Environment Variables**:
   - Ensure `MONGODB_URI` is set correctly
   - Check that it's available in Production environment

3. **Test Database Connection**:
   - Use the test script: `node test-database.js`
   - Check if the health endpoint returns database status

4. **Common Issues**:
   - **Network Access**: Ensure your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)
   - **Authentication**: Verify username/password in connection string
   - **Database Name**: Make sure the database name is correct

### If the seeding doesn't work:

1. Check the seed-data function logs in Vercel
2. Verify the MongoDB URI is correct
3. Ensure the database user has write permissions

## Expected Results

After completing these steps, you should see:

```
🔍 Testing database connection...

1. Testing health endpoint...
✅ Health check passed: { success: true, message: "Server is running", database: "Connected" }

2. Testing projects endpoint...
✅ Projects endpoint working
📊 Projects count: 3

3. Testing qualifications endpoint...
✅ Qualifications endpoint working
📊 Qualifications count: 4

🎉 Database is working correctly with data!
```

## Next Steps

Once the database is working:
1. Your portfolio will load real data from the database
2. You can use the admin panel to manage projects and qualifications
3. The fallback data will no longer be needed

## Support

If you continue to have issues:
1. Check the Vercel function logs for specific error messages
2. Verify your MongoDB connection string is correct
3. Ensure your MongoDB cluster is accessible from Vercel's servers
