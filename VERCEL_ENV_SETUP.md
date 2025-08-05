# Vercel Environment Variables Setup Guide

## 🚨 CRITICAL: Your Vercel deployment is failing because environment variables are missing!

### **Step 1: Set Environment Variables in Vercel**

1. **Go to your Vercel Dashboard:**
   - Visit: https://vercel.com/dashboard
   - Click on your project: `dev-portfolio-ajsa`

2. **Navigate to Environment Variables:**
   - Click on **Settings** tab
   - Click on **Environment Variables** in the left sidebar

3. **Add these REQUIRED environment variables:**

   ```
   Name: MONGODB_URI
   Value: mongodb+srv://your_username:your_password@your_cluster.mongodb.net/portfolio?retryWrites=true&w=majority
   Environment: Production, Preview, Development
   ```

   ```
   Name: JWT_SECRET
   Value: your_super_secret_jwt_key_here_make_it_long_and_random
   Environment: Production, Preview, Development
   ```

   ```
   Name: NODE_ENV
   Value: production
   Environment: Production, Preview, Development
   ```

### **Step 2: Get Your MongoDB URI**

If you don't have a MongoDB Atlas account:

1. **Create MongoDB Atlas Account:**
   - Go to: https://www.mongodb.com/atlas
   - Sign up for free account

2. **Create a Cluster:**
   - Click "Build a Database"
   - Choose "FREE" tier
   - Select your preferred region
   - Click "Create"

3. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `portfolio`

### **Step 3: Verify Setup**

After adding environment variables:

1. **Redeploy your project:**
   - Go to Vercel Dashboard → Deployments
   - Click "Redeploy" on your latest deployment

2. **Test the health endpoint:**
   - Visit: `https://dev-portfolio-ajsa.vercel.app/api/health`
   - You should see a JSON response with status information

3. **Check your portfolio:**
   - Visit: `https://dev-portfolio-ajsa.vercel.app`
   - Data should now load properly

### **Step 4: Troubleshooting**

If you still get errors:

1. **Check Vercel Logs:**
   - Go to your deployment in Vercel
   - Click on "Functions" tab
   - Check the logs for specific error messages

2. **Test API Endpoints:**
   - `/api/health` - Should return status info
   - `/api/projects` - Should return your projects
   - `/api/qualifications` - Should return your qualifications

3. **Common Issues:**
   - **MongoDB URI format:** Make sure it starts with `mongodb+srv://`
   - **Network Access:** In MongoDB Atlas, go to Network Access and add `0.0.0.0/0` to allow all IPs
   - **Database User:** Make sure your MongoDB user has read/write permissions

### **Step 5: Security Notes**

- Keep your `JWT_SECRET` private and random
- Use a strong password for your MongoDB user
- Consider using MongoDB Atlas IP whitelist for production

---

**Need Help?** Check the Vercel deployment logs for specific error messages after setting up the environment variables. 