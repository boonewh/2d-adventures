# Deployment Guide - Reign of Winter

## Vercel Deployment Setup

Your project is now ready to deploy to Vercel. Follow these steps:

### Step 1: Sign in to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "Sign Up" or "Log In"
3. Use your GitHub account to sign in (recommended)

### Step 2: Import Your GitHub Repository

1. Once logged in, click "Add New..." → "Project"
2. Click "Import Git Repository"
3. Find and select `boonewh/2d-adventures` from the list
4. Click "Import"

### Step 3: Configure Project Settings

Vercel should auto-detect the settings, but verify these:

- **Framework Preset**: Vite
- **Build Command**: `npm run build` (should be auto-detected)
- **Output Directory**: `dist` (should be auto-detected)
- **Install Command**: `npm install` (default)

**You don't need to change anything** - the `vercel.json` file we created handles the configuration.

### Step 4: Deploy

1. Click "Deploy"
2. Wait 1-2 minutes for the build to complete
3. You'll get a URL like `https://2d-adventures-xxxxx.vercel.app`

### Step 5: Test Your Deployment

1. Click the URL to visit your deployed game
2. You should see:
   - Blue background with "REIGN OF WINTER" title
   - "A Zelda-like Action RPG" subtitle
   - Green rectangle (test player sprite)
   - "Phase 0 Complete!" message
   - "v0.1.0 - Prototype" in bottom left

### Automatic Deployments

From now on, every push to the `main` branch will automatically deploy to Vercel:

```bash
# Make changes to your code
git add .
git commit -m "feat: your changes"
git push

# Vercel automatically deploys in ~1-2 minutes
```

### Custom Domain (Optional)

To add a custom domain like `reignofwinter.com`:

1. Go to your Vercel project dashboard
2. Click "Settings" → "Domains"
3. Add your domain
4. Follow the DNS configuration instructions

### Environment Variables (For Later)

When you add features that need environment variables (API keys, etc.):

1. Go to Vercel project → "Settings" → "Environment Variables"
2. Add variables for Production, Preview, and Development
3. Redeploy for changes to take effect

## Troubleshooting

### Build Fails

If the build fails on Vercel:
1. Check the build logs in Vercel dashboard
2. Ensure `npm run build` works locally
3. Check that all dependencies are in `package.json`

### Assets Not Loading

If sprites/sounds don't load:
1. Ensure assets are in `public/assets/` directory
2. Reference them with `/assets/...` paths (leading slash)
3. Check browser console for 404 errors

### Performance Issues

If the game runs slowly in production:
1. Check bundle size in build output
2. Consider code splitting for large features
3. Optimize asset sizes (compress images, use sprite sheets)

## Deployment Checklist

Before each major release:

- [ ] Test build locally: `npm run build && npm run preview`
- [ ] Check for TypeScript errors: `npx tsc --noEmit`
- [ ] Test game functionality end-to-end
- [ ] Check browser console for errors
- [ ] Test on mobile browsers (if applicable)
- [ ] Update version number in `package.json`
- [ ] Update CHANGELOG (when created)
- [ ] Create git tag: `git tag v0.x.0`
- [ ] Push with tags: `git push --tags`

## Current Deployment Status

**GitHub Repository**: https://github.com/boonewh/2d-adventures
**Vercel Project**: ✅ Deployed
**Live URL**: https://2d-adventures.vercel.app/

---

**Status**: ✅ Successfully deployed! Every push to `main` will auto-deploy.
