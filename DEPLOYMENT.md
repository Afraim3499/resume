# Deployment Guide

This guide covers deploying the portfolio website to various platforms.

## 🚀 Quick Deploy Options

### Vercel (Recommended)

**Why Vercel?**
- Zero-configuration deployment
- Automatic HTTPS
- Global CDN
- Preview deployments for PRs
- Built-in analytics

**Steps:**
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in
3. Click "New Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./` (or leave default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
6. Add environment variables (if needed)
7. Click "Deploy"

**Environment Variables:**
```
GITHUB_TOKEN=your_token_here
EMAIL_SERVICE_API_KEY=your_key_here
NEXT_PUBLIC_GA_ID=your_ga_id
```

### Netlify

**Steps:**
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) and sign in
3. Click "Add new site" → "Import an existing project"
4. Connect GitHub and select repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
6. Add environment variables
7. Click "Deploy site"

**Note:** For Netlify, you may need to add `netlify.toml`:
```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"
```

## 🔧 Manual Deployment

### Build Locally

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### Deploy to Static Hosting

If you want to export as static site:

1. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true
  }
}
```

2. Build:
```bash
npm run build
```

3. Deploy the `out/` folder to any static host:
   - GitHub Pages
   - Cloudflare Pages
   - AWS S3 + CloudFront
   - Firebase Hosting

## 🌐 Domain Configuration

### Custom Domain on Vercel

1. Go to Project Settings → Domains
2. Add your domain
3. Follow DNS configuration instructions
4. Wait for SSL certificate (automatic)

### Custom Domain on Netlify

1. Go to Site Settings → Domain Management
2. Add custom domain
3. Configure DNS records
4. SSL certificate is automatic

## 📊 Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Verify contact form works
- [ ] Check GitHub stats display
- [ ] Test mobile responsiveness
- [ ] Verify SEO meta tags
- [ ] Check sitemap.xml accessibility
- [ ] Test dark/light theme switching
- [ ] Verify all images load
- [ ] Check analytics integration
- [ ] Test blog and case study pages

## 🔍 Troubleshooting

### Build Errors

**Error: Module not found**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run build
```

**Error: Environment variables**
- Ensure all required env vars are set in deployment platform
- Check variable names match exactly (case-sensitive)

### Runtime Errors

**404 on routes**
- Ensure you're using Next.js App Router correctly
- Check `next.config.ts` for routing issues

**API routes not working**
- Verify API routes are in `src/app/api/` directory
- Check serverless function timeout settings

## 📈 Performance Optimization

### Image Optimization
- Use Next.js `Image` component
- Optimize images before uploading
- Use WebP format when possible

### Code Splitting
- Next.js handles this automatically
- Use dynamic imports for heavy components

### Caching
- Vercel/Netlify handle caching automatically
- Configure cache headers if needed

## 🔐 Security

### Environment Variables
- Never commit `.env.local` to git
- Use platform's environment variable settings
- Rotate tokens regularly

### API Security
- Implement rate limiting
- Use CORS properly
- Validate all inputs
- Use HTTPS only

## 📝 Monitoring

### Analytics
- Google Analytics (if configured)
- Vercel Analytics (built-in)
- Custom event tracking

### Error Tracking
- Consider Sentry integration
- Monitor serverless function logs
- Check platform error logs

---

**Need Help?** Check the [Next.js Deployment Docs](https://nextjs.org/docs/deployment)

