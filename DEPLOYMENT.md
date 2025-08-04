# Deployment Guide

## Quick Deployment to Vercel

### Step 1: Prepare Your Repository

1. **Create a new GitHub repository**
2. **Push your code to GitHub:**

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo-name.git
   git push -u origin main
   ```

### Step 2: Deploy to Vercel

1. **Go to [Vercel](https://vercel.com) and sign up/login**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure the project:**
   - Framework Preset: `Other`
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `client/dist`
   - Install Command: `npm install && cd client && npm install`

### Step 3: Set Environment Variables

In your Vercel project dashboard, go to Settings > Environment Variables and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio
JWT_SECRET=your_super_secret_jwt_key
NODE_ENV=production
```

### Step 4: Update Client Environment

After deployment, update your `client/env.production` file with your Vercel URL:

```
VITE_API_URL=https://your-project-name.vercel.app
```

### Step 5: Redeploy

After setting environment variables, redeploy your project.

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in package.json
2. **API not working**: Verify environment variables are set correctly
3. **Static files not serving**: Check vercel.json configuration
4. **Database connection**: Ensure MongoDB URI is correct and accessible

### Local Testing:

Before deploying, test locally:

```bash
npm run build
npm start
```

## Alternative Deployment Options

### Netlify (Frontend Only)

If you want to deploy just the frontend:

1. Build the client: `cd client && npm run build`
2. Deploy the `client/dist` folder to Netlify
3. Set up API proxy in `netlify.toml`

### Railway/Render (Full Stack)

For full-stack deployment with database:

1. Use Railway or Render for the backend
2. Deploy frontend to Vercel/Netlify
3. Update API URLs accordingly
