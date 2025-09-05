# 📊 Setting Up Plausible Analytics

## What is Plausible Analytics?

Plausible is a **privacy-focused analytics** service that:
- **Respects user privacy** (GDPR compliant, no cookies)
- **Lightweight** (1.5KB vs Google Analytics' 45KB)
- **Simple dashboard** with essential metrics
- **No data selling** or sharing with third parties

## 🚀 Quick Setup Guide

### 1. Create Plausible Account
1. Go to [plausible.io](https://plausible.io)
2. Sign up for an account
3. Choose a plan (free trial available)

### 2. Add Your Domain
1. In Plausible dashboard, click "Add a domain"
2. Enter your domain (e.g., `your-portfolio.vercel.app`)
3. Copy the domain name for environment variables

### 3. Configure Environment Variables
Add this to your `.env.local` file:
```env
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=your-domain.com
```

### 4. Deploy to Vercel
The analytics script is already implemented and will automatically load when:
- `NODE_ENV` is `production`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set

## 📈 What You'll Track

### Basic Metrics
- **Page views** per page
- **Unique visitors** and sessions
- **Top pages** and content performance
- **Referrers** (where visitors come from)
- **Device types** and screen sizes

### Portfolio-Specific Insights
- **Most viewed projects** (which case studies are popular)
- **Blog post engagement** (which articles get read)
- **Contact page visits** (conversion tracking)
- **Geographic data** (where your audience is)

## 🔧 Advanced Configuration

### Custom Events (Optional)
Track specific interactions:
```javascript
// Track project clicks
plausible('Project View', {props: {project: 'WINZOI'}})

// Track contact form submissions
plausible('Contact Form Submit')

// Track resume downloads
plausible('Resume Download')
```

### Goal Tracking
Set up conversion goals:
1. **Contact page visits**
2. **Resume downloads**
3. **Project case study views**
4. **Blog post reads**

## 📊 Dashboard Features

### Real-time Analytics
- Live visitor count
- Current page views
- Active sessions

### Historical Data
- Daily/weekly/monthly trends
- Growth patterns
- Seasonal variations

### Content Performance
- Most popular pages
- Time on page
- Bounce rates

## 🛡️ Privacy Benefits

### GDPR Compliant
- No personal data collection
- No cookies required
- User consent not needed

### Lightweight
- 1.5KB script size
- Fast loading
- No impact on performance

### Transparent
- Open source
- No data selling
- Clear privacy policy

## 🚀 Deployment Checklist

### Before Deploying
- [ ] Set up Plausible account
- [ ] Add domain to Plausible
- [ ] Configure environment variable
- [ ] Test locally (analytics won't load in development)

### After Deploying
- [ ] Verify analytics are loading
- [ ] Check dashboard for data
- [ ] Set up goals and events
- [ ] Monitor for a few days

## 📱 Mobile Analytics

Plausible automatically tracks:
- **Mobile vs desktop** usage
- **Screen sizes** and resolutions
- **Operating systems**
- **Browser types**

## 🔄 Integration with Sanity

Once both are set up, you can:
- **Track blog post performance** from Sanity
- **Monitor project engagement** 
- **Analyze content effectiveness**
- **Optimize based on data**

## 💡 Pro Tips

### Content Optimization
- Use analytics to see which projects get most views
- Write blog posts about popular topics
- Optimize pages with low engagement

### SEO Insights
- Track which pages rank well
- Monitor referral traffic
- Analyze user behavior patterns

### Portfolio Improvements
- Identify most engaging content
- Optimize for your target audience
- Track career opportunities

## 🎯 Why Plausible for Portfolios?

✅ **Professional**: Shows you care about data
✅ **Privacy-first**: Respects visitor privacy
✅ **Lightweight**: Doesn't slow down your site
✅ **Simple**: Easy to understand metrics
✅ **Affordable**: Great value for personal sites

This setup gives you professional analytics without compromising user privacy or site performance!
