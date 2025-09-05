# Phone Mockup Setup Guide

## Overview
The SmartVideo component now supports a phone mockup frame similar to Jinesh's portfolio at [jineshb.me](https://jineshb.me/posts/scan-and-go---super-market-self-checkout-app/content).

## How It Works
Instead of trying to make videos transparent, we use a two-layer approach:
1. **Bottom Layer**: iPhone clay mockup image that serves as the phone frame
2. **Top Layer**: Video content positioned and styled to fit inside the phone frame

## Setup Steps

### 1. Get the iPhone Mockup Image
You need to add an iPhone clay mockup image to your public folder. You can:

**Option A: Download from Jinesh's site**
- Visit his portfolio and inspect the image element
- Download the `iphone_clay_white.png` file
- Place it in `frontend/public/iphone_clay_white.png`

**Option B: Use a similar mockup**
- Find any iPhone mockup image (preferably with transparent background)
- Rename it to `iphone_clay_white.png`
- Place it in `frontend/public/iphone_clay_white.png`

**Option C: Create your own**
- Design a phone frame in Figma/Sketch
- Export as PNG with transparent background
- Place in `frontend/public/iphone_clay_white.png`

### 2. Usage
The component automatically enables phone frames when you add:
```tsx
<SmartVideo
  video={yourVideo}
  alt="Description"
  fallbackLetter="V"
  showPhoneFrame={true}  // This enables the phone frame
  aspectRatio="portrait"
/>
```

### 3. Fallback
If the mockup image fails to load, the component automatically falls back to a CSS-generated phone frame.

## Styling Customization
You can customize the phone frame appearance by modifying the CSS in `globals.css`:

```css
.phone-frame-fallback {
  background: linear-gradient(145deg, #f0f0f0, #e0e0e0);
  border-radius: 20px;
  box-shadow: 0 0 0 8px #333, 0 20px 40px rgba(0,0,0,0.3);
}
```

## Benefits
- ✅ No more video background issues
- ✅ Professional phone mockup appearance
- ✅ Consistent with modern portfolio designs
- ✅ Works with any video format
- ✅ Responsive and accessible

## Troubleshooting
If you see a fallback phone frame instead of the mockup image:
1. Check that `iphone_clay_white.png` exists in `frontend/public/`
2. Verify the image file is not corrupted
3. Check browser console for any 404 errors
4. Ensure the image path is correct
