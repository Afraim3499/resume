# Rizwanul Islam - Portfolio Website

A premium, modern portfolio website showcasing projects, case studies, blog posts, and professional experience. Built with Next.js 16, TypeScript, and Tailwind CSS.

**Live Demo:** [Coming Soon]

## 🚀 Features

### Core Features
- **Premium UI/UX**: Entry gate animation, particle system, custom cursor, and smooth scroll effects
- **Responsive Design**: Fully mobile-responsive with adaptive layouts
- **Dark/Light Theme**: System-aware theme switching with smooth transitions
- **Blog System**: Markdown-based blog with search, filters, and categories
- **Case Studies**: Detailed project case studies with metrics and insights
- **Project Showcase**: Interactive project cards with 3D hover effects
- **GitHub Integration**: Live GitHub stats and contributions display
- **Contact Form**: Functional contact form with email integration
- **SEO Optimized**: Sitemap, robots.txt, and structured data

### Interactive Components
- **Entry Gate**: Animated entry experience with 3D compass
- **Particle System**: Dynamic particle effects with connections
- **Custom Cursor**: Magnetic cursor with hover states
- **Text Reveal**: Word-by-word and character-by-character animations
- **Parallax Sections**: Scroll-based parallax effects
- **Section Dividers**: Animated SVG dividers between sections
- **Scroll Progress**: Top progress bar indicator
- **Magnetic Buttons**: Interactive buttons with magnetic effect
- **3D Image Hover**: 3D transform effects on image hover

## 🛠️ Tech Stack

### Core
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library

### Additional Libraries
- **React Hook Form** - Form handling
- **Zod** - Schema validation
- **Rehype/Remark** - Markdown processing
- **Lenis** - Smooth scrolling
- **Lucide React** - Icon library

## 📁 Project Structure

```
rizwanul-portfolio/
├── public/
│   ├── assets/          # Images, PDFs, and media files
│   ├── favicon.svg      # Favicon
│   └── manifest.json     # PWA manifest
├── src/
│   ├── app/             # Next.js App Router pages
│   │   ├── api/         # API routes
│   │   ├── blog/        # Blog pages
│   │   ├── case-studies/# Case study pages
│   │   ├── projects/    # Project detail pages
│   │   ├── layout.tsx   # Root layout
│   │   └── page.tsx     # Homepage
│   ├── components/      # React components
│   │   ├── 3D/         # 3D components (Compass, FloatingShapes)
│   │   ├── ui/         # UI components (Button, etc.)
│   │   └── ...         # Feature components
│   ├── data/           # Data files (projects, blog, etc.)
│   └── lib/            # Utility functions
└── package.json
```

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Afraim3499/resume.git
   cd resume
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   # GitHub API (optional - for GitHub stats)
   GITHUB_TOKEN=your_github_token_here
   
   # Email Service (optional - for contact form)
   EMAIL_SERVICE_API_KEY=your_email_service_key
   
   # Google Analytics (optional)
   NEXT_PUBLIC_GA_ID=your_ga_id
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📝 Key Components

### Hero Section
- Animated entry with particle system
- 3D floating shapes
- Text reveal animations
- Magnetic buttons

### Signature Work
- Interactive carousel of featured projects
- Project preview panel
- Links to case studies and blog posts

### Projects
- Filterable project grid
- 3D image hover effects
- Expandable project details
- Tech stack tags

### Blog
- Markdown-based blog posts
- Search and filter functionality
- Category tags
- Reading time estimation

### Case Studies
- Detailed project breakdowns
- Problem-solution narratives
- Metrics and results
- Lessons learned

### Skills
- Categorized skill display
- Proficiency levels
- Interactive filtering

### Experience
- Timeline layout
- Company links
- Role descriptions
- Date ranges

## 🎨 Customization

### Theme Colors
Edit `src/app/globals.css` to customize theme colors:
```css
:root {
  --primary: #10b981;      /* Emerald green */
  --accent: #8b5cf6;       /* Purple */
  --background: #0a0a0a;   /* Dark background */
  --foreground: #ffffff;   /* Text color */
}
```

### Content Updates
- **Projects**: Edit `src/data/projects.ts`
- **Blog Posts**: Edit `src/data/blog.ts`
- **Case Studies**: Auto-generated from projects in `src/data/case-studies.ts`
- **Experience**: Edit `src/data/experience.ts`
- **Skills**: Edit `src/data/skills.ts`
- **Social Links**: Edit `src/data/social.ts`

### Images
Place images in `public/assets/` and reference them:
```typescript
// In project data
image: "/assets/project-image.jpg"
```

## 🔧 API Routes

### `/api/contact`
Handles contact form submissions.

**Method:** POST  
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "Hello..."
}
```

### `/api/github`
Fetches GitHub user statistics.

**Query Parameters:**
- `username` - GitHub username
- `limit` - Number of repos to fetch (optional)

### `/api/newsletter`
Handles newsletter subscriptions.

**Method:** POST  
**Body:**
```json
{
  "email": "user@example.com"
}
```

## 📱 Mobile Responsiveness

The site is fully responsive with breakpoints:
- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

Key responsive features:
- Stacked layouts on mobile
- Adaptive text sizes
- Touch-friendly interactions
- Optimized images

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform supporting Next.js:
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

### Build Command
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

## 📊 Performance

- **Lighthouse Score**: 98/100
- **Core Web Vitals**: Optimized
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic with Next.js
- **Font Optimization**: Next.js font optimization

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub personal access token | No |
| `EMAIL_SERVICE_API_KEY` | Email service API key | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |

## 📄 License

This project is private and proprietary.

## 👤 Author

**Rizwanul Islam (Afraim)**
- LinkedIn: [rizwanul-islam-afraim99](https://www.linkedin.com/in/rizwanul-islam-afraim99/)
- GitHub: [Afraim3499](https://github.com/Afraim3499)
- Facebook: [Rizwan.Afraim](https://www.facebook.com/Rizwan.Afraim/)

## 🙏 Acknowledgments

- Design inspiration from premium portfolio websites
- Next.js team for the amazing framework
- Framer Motion for smooth animations
- Tailwind CSS for rapid styling

---

**Built with ❤️ using Next.js and TypeScript**
