# Project Images Directory

This directory contains all the project images used in the portfolio website.

## Required Images:

### WINZOI Project:
- `winzoi-hero.jpg` - Main hero image for WINZOI project
- `winzoi-login.jpg` - Login screen screenshot
- `winzoi-home.jpg` - Home screen screenshot  
- `winzoi-account.jpg` - Account management screenshot
- `winzoi-profile.jpg` - Profile details screenshot
- `winzoi-payment.jpg` - Payment success screenshot

### Fit Flow Project:
- `fit-flow-hero.jpg` - Main hero image for Fit Flow project
- `fit-flow-login.jpg` - Login screen screenshot
- `fit-flow-home.jpg` - Health dashboard screenshot
- `fit-flow-blood-pressure.jpg` - Blood pressure tracking screenshot

## Image Requirements:
- **Format**: JPG or PNG
- **Resolution**: 2x export from Figma (high resolution for retina displays)
- **Aspect Ratio**: 
  - Hero images: 16:9 (landscape)
  - App screenshots: 9:16 (mobile portrait)

## How to Add Images:
1. Export your images from Figma at 2x resolution
2. Save them in this directory with the exact filenames listed above
3. The website will automatically use these images

## Placeholder Behavior:
If images are missing, the website will show colored placeholder rectangles with gradient backgrounds and project initials.

## When You're Ready to Add Real Images:
1. Export your images from Figma at 2x resolution
2. Save them in this `/public/projects/` directory with the exact filenames listed above
3. In the file `/src/components/ui/project-image.tsx`, change line 16:
   ```javascript
   // Change this:
   const showPlaceholder = true
   
   // To this:
   const showPlaceholder = imageError || imageLoading
   ```
4. Your real images will then automatically replace the placeholders!

## Current Status:
✅ All placeholders are working perfectly
✅ No more 400 errors in console
✅ Beautiful gradient backgrounds with project letters
✅ Ready for your real images when available
