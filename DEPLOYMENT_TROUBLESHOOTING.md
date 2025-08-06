# Deployment Troubleshooting Guide

## Current Issues

- **Error**: `Missing parameter name` in path-to-regexp
- **Affected Routes**: `/api/projects`, `/api/health`, `/api/qualifications`
- **Status**: 500 errors causing Node.js crashes

## Changes Made

### 1. Express Version Downgrade

- **Before**: Express 5.1.0 (very recent, potentially unstable)
- **After**: Express 4.18.2 (stable, widely used)
- **Reason**: Express 5.x is still in development and may have compatibility issues with Vercel

### 2. Vercel Configuration Update

- **Before**: Complex regex patterns in routes
- **After**: Simple rewrites configuration
- **Reason**: Avoids path-to-regexp parsing issues

## Current Configuration

### vercel.json

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server/server.js",
      "use": "@vercel/node"
    }
  ],
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/server/server.js"
    }
  ]
}
```

## Testing Steps

### 1. Local Testing

```bash
npm install
npm start
```

### 2. Test Endpoints

- `GET /` - Should return API welcome page
- `GET /api/health` - Should return health status
- `GET /api/projects` - Should return projects list
- `GET /api/qualifications` - Should return qualifications list

### 3. Vercel Deployment

```bash
vercel --prod
```

## Environment Variables Required

Make sure these are set in Vercel:

- `MONGODB_URI` - MongoDB connection string
- `JWT_SECRET` - JWT signing secret
- `NODE_ENV` - Set to "production"

## Common Issues & Solutions

### 1. Path-to-regexp Error

**Cause**: Complex regex patterns in Vercel routing
**Solution**: Use simple rewrites instead of routes

### 2. MongoDB Connection Issues

**Cause**: Missing or incorrect MONGODB_URI
**Solution**: Verify environment variables in Vercel dashboard

### 3. Express Version Issues

**Cause**: Using unstable Express 5.x
**Solution**: Use stable Express 4.18.2

### 4. Build Failures

**Cause**: Missing dependencies or build errors
**Solution**: Check package.json and build logs

## Monitoring

- Check Vercel function logs for detailed error messages
- Monitor MongoDB connection status
- Verify all environment variables are set correctly

## Rollback Plan

If issues persist:

1. Revert to previous Express version
2. Try different Vercel configuration patterns
3. Consider using separate API and frontend deployments
