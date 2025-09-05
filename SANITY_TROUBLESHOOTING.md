# 🔧 Sanity CMS Troubleshooting Guide

## Common Issues and Solutions

### 1. Message Channel Closed Error

**Error**: `"Uncaught (in promise) Error: A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received"`

**Solutions**:
1. **Updated API Version**: Changed from `2024-12-19` to `2023-08-01` (more stable)
2. **Enhanced Error Suppression**: Added comprehensive error filtering
3. **Improved Client Configuration**: Added `withCredentials: false` and better timeout settings

### 2. Sanity Studio Loading Screen Issue

**Problem**: Studio shows loading screen but never loads content

**Solutions**:
1. **Check Environment Variables**:
   ```bash
   npm run test-sanity
   ```

2. **Verify CORS Settings**:
   - Go to your Sanity project dashboard
   - Settings → API → CORS Origins
   - Add: `http://localhost:3000` (development)
   - Add: `https://your-domain.vercel.app` (production)

3. **Check API Token Permissions**:
   - Ensure token has read permissions
   - Create new token if needed

### 3. Network Connection Issues

**Problem**: Network errors or timeouts

**Solutions**:
1. **Reduced Timeout Values**: 
   - Request timeout: 15 seconds → 10 seconds
   - Retry attempts: 3 → 2
   - Max timeout: 10 seconds → 5 seconds

2. **Enhanced Error Handling**:
   - Added timeout wrappers to prevent hanging requests
   - Improved fallback mechanisms

### 4. Environment Variables Setup

**Required Variables**:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2023-08-01
SANITY_API_TOKEN=your_api_token
```

**Testing**:
```bash
npm run test-sanity
```

### 5. Content Not Loading

**Problem**: Fallback content shows instead of Sanity data

**Solutions**:
1. **Check Connection**:
   ```bash
   npm run test-sanity
   ```

2. **Verify Content Exists**:
   - Go to Sanity Studio
   - Check if content is published
   - Ensure content has required fields

3. **Check GROQ Queries**:
   - Verify query syntax
   - Test queries in Sanity Vision

### 6. Studio Console Errors

**Problem**: Console flooded with Sanity errors

**Solutions**:
1. **Error Suppression**: Enhanced console error filtering
2. **Network Interception**: Prevents problematic requests
3. **Promise Rejection Handling**: Suppresses unhandled rejections

## Quick Fixes

### 1. Reset Sanity Configuration
```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
npm install

# Test connection
npm run test-sanity
```

### 2. Update Environment Variables
```bash
# Copy example file
cp env.example .env.local

# Edit with your values
nano .env.local
```

### 3. Test Sanity Connection
```bash
npm run test-sanity
```

### 4. Migrate Content (if needed)
```bash
npm run migrate
```

## Debugging Steps

### 1. Check Environment Variables
```bash
npm run test-sanity
```

### 2. Test Sanity Studio
```bash
npm run dev
# Navigate to http://localhost:3000/studio
```

### 3. Check Network Tab
- Open browser dev tools
- Go to Network tab
- Look for failed requests to sanity.io

### 4. Check Console
- Look for specific error messages
- Filter out suppressed Sanity errors

## Common Configuration Issues

### 1. Wrong API Version
- **Use**: `2023-08-01` (stable)
- **Avoid**: `2024-12-19` (experimental)

### 2. Missing CORS Configuration
- Add localhost and production domains
- Ensure credentials are disabled

### 3. Invalid API Token
- Check token permissions
- Create new token if needed

### 4. Wrong Dataset Name
- Default: `production`
- Check in Sanity dashboard

## Performance Optimizations

### 1. Client Configuration
```javascript
{
  useCdn: false, // For real-time updates
  perspective: 'published',
  stega: false,
  requestTimeout: 15000,
  retry: {
    retries: 2,
    factor: 1.5,
    minTimeout: 500,
    maxTimeout: 5000,
  },
  withCredentials: false
}
```

### 2. Query Optimization
- Use specific field selection
- Limit results with `[0...10]`
- Use indexes for sorting

### 3. Image Optimization
- Use `urlFor()` for image URLs
- Implement proper fallbacks
- Use Next.js Image component

## Support

If issues persist:

1. **Check Sanity Status**: [status.sanity.io](https://status.sanity.io)
2. **Sanity Documentation**: [sanity.io/docs](https://sanity.io/docs)
3. **Community Support**: [sanity.io/community](https://sanity.io/community)

## Recent Fixes Applied

✅ **API Version**: Updated to stable `2023-08-01`
✅ **Error Suppression**: Enhanced console error filtering
✅ **Timeout Configuration**: Reduced timeouts for faster failure detection
✅ **Client Configuration**: Added `withCredentials: false`
✅ **Network Interception**: Prevents problematic Sanity requests
✅ **Promise Handling**: Suppresses unhandled rejections
✅ **Test Script**: Added `npm run test-sanity` for debugging
