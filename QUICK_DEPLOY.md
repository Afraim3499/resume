# Quick Deploy Guide

Your code is now on GitHub: https://github.com/Afraim3499/resume

## 🚀 Deploy to Vercel (Recommended - 2 minutes)

### Option 1: Web Interface (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with your GitHub account
3. **Click "Add New Project"**
4. **Import** your repository: `Afraim3499/resume`
5. **Configure**:
   - Framework Preset: **Next.js** (auto-detected)
   - Root Directory: `./` (default)
   - Build Command: `npm run build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
6. **Environment Variables** (if needed):
   - `GITHUB_TOKEN` (optional - for GitHub stats)
   - `EMAIL_SERVICE_API_KEY` (optional - for contact form)
   - `NEXT_PUBLIC_GA_ID` (optional - for Google Analytics)
7. **Click "Deploy"**

That's it! Your site will be live in ~2 minutes.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## 🌐 Your Site Will Be Live At:

After deployment, you'll get a URL like:
- `https://your-project-name.vercel.app`

You can also add a custom domain in Vercel settings.

## ✅ Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify contact form works
- [ ] Check GitHub stats display (if configured)
- [ ] Test mobile responsiveness
- [ ] Verify dark/light theme switching
- [ ] Check all images load
- [ ] Test blog and case study pages
- [ ] Verify sitemap.xml is accessible

## 🔄 Continuous Deployment

Once connected, Vercel will automatically deploy:
- Every push to `main` branch → Production
- Pull requests → Preview deployments

## 📊 Monitoring

- **Vercel Dashboard**: View deployments, analytics, and logs
- **Google Analytics**: If configured
- **Error Tracking**: Consider adding Sentry

---

**Need Help?** Check the full [DEPLOYMENT.md](./DEPLOYMENT.md) guide.

