# GitHub Setup Guide

This guide will help you set up your portfolio project on GitHub.

## Prerequisites

- Git installed on your computer
- GitHub account
- Node.js and npm installed

## Step 1: Initialize Git Repository

If you haven't already initialized a Git repository, run these commands in your project root:

```bash
# Initialize git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Portfolio project setup"
```

## Step 2: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon in the top right corner
3. Select "New repository"
4. Fill in the repository details:
   - **Repository name**: `MyPortfolio` (or your preferred name)
   - **Description**: `A modern, responsive portfolio website built with React, Node.js, and MongoDB`
   - **Visibility**: Choose Public or Private
   - **Do NOT** initialize with README, .gitignore, or license (we already have these)
5. Click "Create repository"

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands to connect your local repository. Run these commands:

```bash
# Add the remote repository (replace YOUR_USERNAME with your GitHub username)
git remote add origin https://github.com/YOUR_USERNAME/MyPortfolio.git

# Set the main branch as default (if not already set)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

## Step 4: Set Up Environment Variables

1. Create a `.env` file in the `server` directory:

   ```bash
   cd server
   touch .env
   ```

2. Add your environment variables to the `.env` file:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   PORT=5000
   NODE_ENV=development
   ```

3. **Important**: Make sure `.env` is in your `.gitignore` file to keep your secrets safe!

## Step 5: Update README.md

Update the README.md file with your actual information:

1. Replace `yourusername` with your actual GitHub username
2. Update the author section with your name and links
3. Update any other personal information

## Step 6: Push Changes

```bash
# Add your changes
git add .

# Commit the changes
git commit -m "Update README and configuration for GitHub"

# Push to GitHub
git push
```

## Step 7: Set Up GitHub Pages (Optional)

If you want to deploy your portfolio to GitHub Pages:

1. Go to your repository on GitHub
2. Click "Settings"
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Choose "main" branch and "/ (root)" folder
6. Click "Save"

## Step 8: Set Up GitHub Actions (Optional)

Create a `.github/workflows/deploy.yml` file for automated deployment:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: "18"

      - name: Install dependencies
        run: |
          npm install
          cd client && npm install

      - name: Build frontend
        run: cd client && npm run build

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: "--prod"
```

## Step 9: Add Repository Topics

On your GitHub repository page:

1. Click the gear icon next to "About"
2. Add topics like: `portfolio`, `react`, `nodejs`, `mongodb`, `fullstack`, `javascript`

## Step 10: Create Issues and Projects (Optional)

1. Create some initial issues for future improvements
2. Set up a GitHub Project board to track your development progress

## Troubleshooting

### If you get authentication errors:

```bash
# Set up GitHub CLI or use personal access token
git remote set-url origin https://YOUR_TOKEN@github.com/YOUR_USERNAME/MyPortfolio.git
```

### If you need to update the remote URL:

```bash
git remote set-url origin https://github.com/YOUR_USERNAME/MyPortfolio.git
```

### If you need to check your remote:

```bash
git remote -v
```

## Next Steps

1. **Deploy your application** to a hosting service like Vercel, Heroku, or Railway
2. **Add a live demo link** to your README
3. **Create a portfolio website** that showcases this project
4. **Share your repository** on social media and professional networks

## Security Notes

- Never commit `.env` files with real credentials
- Use environment variables for all sensitive data
- Regularly update dependencies to fix security vulnerabilities
- Consider adding security scanning with GitHub's Dependabot

Your portfolio project is now ready on GitHub! 🎉
