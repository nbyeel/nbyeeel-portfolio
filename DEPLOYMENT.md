# 🚀 Deploying Your Portfolio to Vercel

## Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your portfolio code pushed to GitHub

## Step-by-Step Deployment Guide

### 1. Prepare Your Repository
```bash
# Make sure you're in the frontend directory
cd frontend

# Install dependencies
npm install

# Test the build locally
npm run build

# If build succeeds, commit and push to GitHub
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Deploy to Vercel

#### Option A: Deploy via Vercel Dashboard (Recommended)
1. Go to [vercel.com](https://vercel.com) and sign up/login
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect Next.js settings
5. Configure environment variables (if using Sanity/Plausible):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID` (if using Sanity CMS)
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (if using Plausible Analytics)
6. Click "Deploy"

#### Option B: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy (run from frontend directory)
vercel

# Follow the prompts
# - Link to existing project or create new
# - Set project name
# - Confirm settings
```

### 3. Environment Variables Setup

#### For Content Management (Sanity CMS)
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_sanity_api_token
```

#### For Analytics (Plausible)
```
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

#### For Email Functionality (Resend) - Optional
```
RESEND_API_KEY=your_resend_api_key_here
```

### 4. Custom Domain (Optional)
1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Update DNS records as instructed

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All images display properly
- [ ] Dark/light mode toggle works
- [ ] Animations run smoothly
- [ ] Contact links work (WhatsApp, email)
- [ ] Mobile responsiveness
- [ ] Performance is good (check Lighthouse)
- [ ] Sanity CMS content loads (if configured)
- [ ] Analytics tracking works (if configured)

## Troubleshooting

### Build Errors
- Check that all dependencies are in `package.json`
- Ensure TypeScript errors are resolved
- Verify environment variables are set correctly

### Sanity CMS Issues
- Verify project ID and dataset are correct
- Check CORS settings in Sanity dashboard
- Ensure API token has read permissions

### Analytics Issues
- Confirm domain is set correctly in Plausible
- Check that environment variable is set
- Analytics only load in production

### Performance Issues
- Optimize images using Next.js Image component
- Check bundle size with `npm run build`
- Consider code splitting for large components

### Environment Variables
- Make sure to add them in Vercel dashboard
- Redeploy after adding new environment variables
- Check that variable names match exactly

## Benefits of Vercel Deployment

✅ **Zero Configuration**: Auto-detects Next.js
✅ **Global CDN**: Fast loading worldwide
✅ **Automatic HTTPS**: SSL certificates included
✅ **Preview Deployments**: Test changes before going live
✅ **Analytics**: Built-in performance monitoring
✅ **Serverless Functions**: Add backend features later if needed

## Future Enhancements

If you later want to add backend features, Vercel supports:
- API routes in `app/api/` directory
- Serverless functions
- Database integrations (Vercel Postgres, etc.)
- Authentication (NextAuth.js, Clerk, etc.)

## 📚 Additional Setup Guides

- **Sanity CMS Setup**: See `SANITY_SETUP.md`
- **Plausible Analytics Setup**: See `PLAUSIBLE_SETUP.md`

Your current setup is perfect for a portfolio website and will deploy seamlessly on Vercel!
