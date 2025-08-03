# GitHub Secrets Setup Guide

This guide will help you set up the required GitHub secrets for automated deployment to Vercel.

## Required Secrets

Your GitHub Actions workflow requires three secrets to be configured:

1. `VERCEL_TOKEN` - Your Vercel API token
2. `ORG_ID` - Your Vercel organization ID
3. `PROJECT_ID` - Your Vercel project ID

## Step 1: Get Your Vercel API Token

1. **Login to Vercel:**

   - Go to [vercel.com](https://vercel.com)
   - Sign in to your account

2. **Navigate to Account Settings:**

   - Click on your profile picture in the top right
   - Select "Settings"

3. **Create API Token:**
   - Go to "Tokens" in the left sidebar
   - Click "Create Token"
   - Give it a name like "GitHub Actions Deployment"
   - Set expiration to "No expiration" (or choose a date)
   - Click "Create Token"
   - **Copy the token immediately** (you won't see it again)

## Step 2: Get Your Organization ID

1. **Install Vercel CLI:**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel CLI:**

   ```bash
   vercel login
   ```

3. **Get Organization ID:**

   ```bash
   vercel teams ls
   ```

   - Look for your organization name and copy the ID

   OR

   ```bash
   vercel whoami
   ```

   - If you're using a personal account, the org ID is your user ID

## Step 3: Get Your Project ID

1. **Deploy your project first:**

   ```bash
   vercel --prod
   ```

2. **Get Project ID:**

   ```bash
   vercel projects ls
   ```

   - Find your project name and copy the ID

   OR

   - Go to your Vercel dashboard
   - Click on your project
   - Look at the URL: `https://vercel.com/your-org/your-project`
   - The project ID is in the URL or project settings

## Step 4: Add Secrets to GitHub

1. **Go to your GitHub repository:**

   - Navigate to your portfolio repository on GitHub

2. **Access repository settings:**

   - Click "Settings" tab
   - Scroll down to "Secrets and variables"
   - Click "Actions"

3. **Add the three secrets:**

   **VERCEL_TOKEN:**

   - Click "New repository secret"
   - Name: `VERCEL_TOKEN`
   - Value: Paste your Vercel API token
   - Click "Add secret"

   **ORG_ID:**

   - Click "New repository secret"
   - Name: `ORG_ID`
   - Value: Paste your Vercel organization ID
   - Click "Add secret"

   **PROJECT_ID:**

   - Click "New repository secret"
   - Name: `PROJECT_ID`
   - Value: Paste your Vercel project ID
   - Click "Add secret"

## Step 5: Verify Setup

1. **Check your secrets:**

   - Go back to Settings > Secrets and variables > Actions
   - You should see all three secrets listed

2. **Test the workflow:**
   - Make a small change to your code
   - Commit and push to GitHub
   - Go to the "Actions" tab in your repository
   - Check if the deployment workflow runs successfully

## Troubleshooting

### If you get "Context access might be invalid" warnings:

These warnings are normal and will disappear once you add the secrets to GitHub. The warnings appear because the secrets don't exist yet.

### If deployment fails:

1. **Check Vercel Token:**

   - Ensure the token has the correct permissions
   - Try creating a new token if needed

2. **Check Organization ID:**

   - Make sure you're using the correct organization
   - For personal accounts, use your user ID

3. **Check Project ID:**
   - Ensure the project exists in Vercel
   - Verify you have access to the project

### Alternative: Manual Deployment

If you prefer not to use GitHub Actions, you can deploy manually:

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy your project
vercel --prod
```

## Security Notes

- **Never commit secrets to your repository**
- **Use environment variables for sensitive data**
- **Rotate your Vercel token regularly**
- **Limit token permissions to only what's needed**

## Next Steps

After setting up the secrets:

1. **Test the deployment:**

   - Push a change to trigger the workflow
   - Check the Actions tab for deployment status

2. **Monitor your deployment:**

   - Check Vercel dashboard for deployment logs
   - Verify your application is working correctly

3. **Set up environment variables:**
   - Go to your Vercel project dashboard
   - Add your MongoDB URI and other environment variables

Your automated deployment should now work! 🚀
