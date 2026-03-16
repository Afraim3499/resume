import type { ImpactMetric } from "@/components/ImpactMetrics";

export interface ProjectMetrics {
  components?: number;
  apiEndpoints?: number;
  databaseTables?: number;
  linesOfCode?: number;
  pages?: number;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  link?: string;
  githubUrl?: string;
  metrics?: ProjectMetrics;
  techStack: string[];
  image?: string; // Main preview image
  screenshots?: string[]; // Additional screenshots
  challenges?: string[];
  solutions?: string[];
  performance?: {
    lighthouse?: number;
    loadTime?: string;
  };
  impactMetrics?: ImpactMetric[]; // Strategic Business Metrics
  articles?: {
    title: string;
    url: string;
    publisher: string;
  }[];
  category: "ecommerce" | "cms" | "ai" | "operations" | "news" | "portfolio";
  year: number;
  status: "production" | "development" | "completed";
  privateRepo?: boolean; // marks commercial/client repos as private
  summary?: string; // Short unique summary for homepage/listing
}

export const projects: Project[] = [
  // ─── Featured first 3 on homepage ───────────────────────────────
  {
    slug: "the-trail",
    title: "The Trailheadline",
    description: "High-performance, information-dense news aggregator and editorial platform. Automatically curated content with 'Editor's Picks' and high-speed delivery. Designed for the modern reader.",
    summary: "Engineered a custom Next.js CMS with multi-stage approval workflow and sub-second delivery for 15k+ monthly readers.",
    longDescription: "**The Problem:** Scaling a high-traffic news curation platform required an editorial team to manage hundreds of daily posts without bottlenecks or workflow chaos.\n\n**The Solution Architecture:** We engineered a custom Next.js CMS featuring a multi-stage approval workflow (Draft → Review → Approved → Published) and a robust Tiptap rich-text editor. The data tier leverages a normalized PostgreSQL schema on Supabase, heavily cached for sub-second delivery, along with automated categorization and trending analytics.\n\n**Measurable Results:** Achieved a 3x increase in content velocity via automation and successfully scaled to handle 15k+ monthly active readers within the first quarter.",
    tags: ["Next.js", "News Aggregator", "Automation", "High Traffic", "CMS"],
    link: "https://trailheadlines.com",
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/the-trail.jpg",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/the-trail.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/the-trail-2.jpg",
    ],
    metrics: {
      components: 150,
      apiEndpoints: 25,
      databaseTables: 30,
      linesOfCode: 10000,
    },
    techStack: [
      "Next.js 14+",
      "React 19",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Tiptap",
      "TanStack Query",
      "Docker",
      "Nginx",
    ],
    challenges: [
      "Building custom CMS from scratch with rich text editor",
      "Implementing advanced filtering system (Latest, Most Popular, Trending, Hot)",
      "Creating category-based navigation and organization",
      "Tracking and displaying article view counts",
      "Building breaking news banner system",
      "Handling 30+ database tables with complex relationships",
      "Implementing content workflow system",
      "Creating custom analytics dashboard",
      "SEO optimization with structured data",
    ],
    solutions: [
      "Built modular CMS with Tiptap rich text editor",
      "Designed normalized database schema with RLS policies",
      "Created multi-stage approval workflow",
      "Developed custom analytics with Recharts",
      "Implemented comprehensive SEO with Schema.org markup",
    ],
    performance: {
      lighthouse: 95,
      loadTime: "0.4s",
    },
    impactMetrics: [
      {
        label: "Content Velocity",
        value: "3x",
        description: "Faster publishing workflow via custom CMS and automation.",
        icon: "zap"
      },
      {
        label: "User Engagement",
        value: "15k+",
        description: "Monthly active readers reached within first quarter.",
        icon: "target"
      }
    ],
    articles: [
      {
        title: "The Industrial Revolution of Information",
        url: "https://open.substack.com/pub/rizwanulafraim/p/the-industrial-revolution-of-information?r=7awufv&utm_campaign=post&utm_medium=web&showWelcomeOnShare=true",
        publisher: "Substack",
      },
    ],
    category: "news",
    year: 2024,
    status: "production",
    privateRepo: true,
  },
  {
    slug: "inshortbd",
    title: "InshortBD",
    description: "Bangla-language digital media platform with a full editorial CMS, AWS S3 media pipeline, Playwright E2E tests, GitHub Actions CI/CD, Twitter API integration, and a newsletter system.",
    summary: "Built a cloud-native Bangla media platform with enterprise-grade media pipeline and ironclad CI/CD testing.",
    longDescription: "**The Problem:** Serving premium, authentic Bangla media required flawless Unicode typography, a scalable media pipeline, and zero-downtime reliability to target an audience of 170M+ Bengali speakers.\n\n**The Solution Architecture:** We built a cloud-native platform utilizing Next.js 16 with AWS S3 for enterprise-grade media storage. The system integrates the Twitter API v2 for seamless social syndication. Crucially, we established an ironclad CI/CD pipeline using GitHub Actions and Playwright for rigorous end-to-end browser testing to automatically block regressions before they hit production.\n\n**Measurable Results:** Delivered a highly accessible (WCAG 2.1 AA), magazine-grade editorial experience backed by enterprise-level test coverage, allowing editors to publish multi-part article series with total confidence.",
    tags: ["Next.js", "Bangla", "News Media", "AWS S3", "Playwright", "CI/CD", "CMS", "Editorial"],
    link: "https://www.inshortbd.com",
    image: "/inshortbd-1.jpg",
    screenshots: [
      "/inshortbd-1.jpg",
      "/inshortbd-2.jpg",
    ],
    metrics: {
      components: 120,
      apiEndpoints: 30,
      databaseTables: 20,
      pages: 25,
    },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TailwindCSS v4",
      "Supabase",
      "PostgreSQL",
      "AWS S3",
      "Tiptap",
      "TanStack Query",
      "TanStack Table",
      "Framer Motion",
      "Recharts",
      "Playwright",
      "GitHub Actions",
      "Twitter API v2",
      "Resend",
      "Lenis",
    ],
    challenges: [
      "Building a full Bangla-language editorial platform with correct Unicode typography (Tiro Bangla font) and bidirectional text handling",
      "Designing a multi-stage content workflow (Draft → Review → Approved → Published) for a distributed editorial team",
      "Setting up AWS S3 as the primary media pipeline instead of a simpler hosted solution",
      "Integrating Twitter API v2 for social embeds while handling rate limits and auth flows",
      "Writing Playwright E2E tests that work reliably across CI/CD pipelines (GitHub Actions)",
      "Implementing article series/collections that group multi-part content into a sequential reading experience",
    ],
    solutions: [
      "Integrated Tiro Bangla Unicode font with Next.js font optimization for performant Bangla text rendering",
      "Built multi-stage approval workflow with role-based gates and status transitions stored in Supabase",
      "Implemented AWS S3 upload pipeline with presigned URLs for secure, scalable media management",
      "Designed WCAG 2.1 AA compliant magazine-inspired layout with proper heading hierarchy and contrast ratios",
      "Set up GitHub Actions CI/CD to run Playwright E2E tests on every push, blocking merges on test failure",
      "Built article collections feature with ordered episode indexing and series navigation components",
    ],
    performance: {
      lighthouse: 95,
      loadTime: "0.5s",
    },
    impactMetrics: [
      {
        label: "Infrastructure",
        value: "Enterprise",
        description: "AWS S3 + Supabase + GitHub Actions — production-grade media and deployment pipeline.",
        icon: "zap",
      },
      {
        label: "Test Coverage",
        value: "E2E",
        description: "Playwright automated browser tests running in CI/CD on every push.",
        icon: "target",
      },
      {
        label: "Audience",
        value: "170M+",
        description: "Targeting Bengali speakers globally with Bangla-first editorial design.",
        icon: "trending",
      },
    ],
    articles: [
      {
        title: "Homepage — Breaking News",
        url: "https://www.inshortbd.com",
        publisher: "inshortbd.com",
      },
      {
        title: "Category — Politics (রাজনীতি)",
        url: "https://www.inshortbd.com/category/politics",
        publisher: "inshortbd.com",
      },
      {
        title: "Category — Tech (প্রযুক্তি)",
        url: "https://www.inshortbd.com/category/tech",
        publisher: "inshortbd.com",
      },
      {
        title: "Category — World (বিশ্ব)",
        url: "https://www.inshortbd.com/category/world",
        publisher: "inshortbd.com",
      },
      {
        title: "Category — Business (ব্যবসা)",
        url: "https://www.inshortbd.com/category/business",
        publisher: "inshortbd.com",
      },
      {
        title: "Newsletter Subscribe",
        url: "https://www.inshortbd.com/newsletter",
        publisher: "inshortbd.com",
      },
      {
        title: "Article — Dhaka Parliamentary Seats 2026",
        url: "https://www.inshortbd.com/news/dhaka-parliamentary-seats-2026-election-analysis",
        publisher: "inshortbd.com",
      },
    ],
    category: "news",
    year: 2026,
    status: "production",
    privateRepo: true,
  },
  {
    slug: "arrivals-cave",
    title: "Arrivals Cave",
    description: "Full-stack e-commerce for premium Bangladeshi panjabi & traditional wear. Eid 2026 collection live. Features Meta CAPI, Google Merchant Feed, CRO-optimized UX, and a Supabase-powered backend.",
    summary: "Architected a headless commerce engine with full-stack ad attribution and CRO-optimized mobile checkout.",
    longDescription: "**The Problem:** A premium traditional menswear brand needed to deploy its flagship Eid 2026 collection with exact ad tracking to maximize ROAS and a purchase flow heavily optimized for mobile conversions.\n\n**The Solution Architecture:** We constructed a headless commerce engine on Next.js 16 and Supabase. To guarantee 100% accurate attribution for marketing campaigns, we implemented the server-side Meta Conversions API (CAPI) alongside robust client-side Pixel deduplication and an automated Google Merchant XML Feed. The storefront UX features dynamic conversion rate optimization (CRO) elements, including a sticky mobile add-to-cart bar, intelligent cashback announcement logic, and real-time urgency/scarcity badges.\n\n**Measurable Results:** Successfully launched the Eid 2026 collection with a complete, full-stack ad attribution pipeline, generating immediate revenue and providing a frictionless mobile checkout experience.",
    tags: ["Next.js", "E-commerce", "Supabase", "Meta CAPI", "Google Merchant", "CRO", "Bangladesh"],
    link: "https://www.arrivalscavebd.com",
    image: "/arrivals-cave-1.jpg",
    screenshots: [
      "/arrivals-cave-1.jpg",
      "/arrivals-cave-2.jpg",
      "/arrivals-cave-3.jpg",
      "/arrivals-cave-4.jpg",
    ],
    metrics: {
      components: 60,
      apiEndpoints: 20,
      databaseTables: 15,
      pages: 18,
    },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TailwindCSS v4",
      "Supabase",
      "PostgreSQL",
      "Zustand",
      "Tiptap",
      "ShadcnUI",
      "Meta CAPI",
      "next-intl",
    ],
    challenges: [
      "Implementing server-side Facebook Conversions API with client-side Pixel deduplication to avoid double-counting",
      "Building a Google Merchant Center XML product feed with size variants as separate rows linked by item_group_id",
      "Designing a Tiptap CMS so non-technical staff can manage product descriptions and seasonal collections",
      "Building CRO features (sticky mobile ATC, urgency/scarcity indicators, cashback announcement bar) without bloating the bundle",
      "Launching a full Eid 2026 seasonal collection with multiple sub-collections from a cold start",
    ],
    solutions: [
      "Implemented CAPI via server action with event deduplication IDs, ensuring accurate ad attribution",
      "Built a dynamic merchant feed generator that expands size variants into separate product rows with shared item_group_id",
      "Integrated Tiptap rich-text editor in the CMS portal with Supabase row-level security for safe content management",
      "Developed CRO components as island-style client components to isolate interactivity and keep core pages server-rendered",
      "Shipped Eid Collection 2026 live with 6 named sub-collections and product photography",
    ],
    performance: {
      lighthouse: 94,
      loadTime: "0.6s",
    },
    impactMetrics: [
      {
        label: "Eid 2026",
        value: "Live",
        description: "Launched Eid Collection 2026 with 6 named sub-collections revenue-generating from day one.",
        icon: "trending",
      },
      {
        label: "Ad Attribution",
        value: "Full Stack",
        description: "Meta CAPI + Google Merchant = complete server-side ad attribution pipeline.",
        icon: "zap",
      },
      {
        label: "CRO Features",
        value: "7+",
        description: "Sticky ATC, urgency badges, cashback bar, testimonials, scarcity indicators and more.",
        icon: "target",
      },
    ],
    articles: [
      {
        title: "Shop — Eid Collection 2026",
        url: "https://www.arrivalscavebd.com/en/eid-panjabi-collection",
        publisher: "arrivalscavebd.com",
      },
      {
        title: "Shop — Premium Panjabi",
        url: "https://www.arrivalscavebd.com/en/premium-panjabi",
        publisher: "arrivalscavebd.com",
      },
      {
        title: "Shop — Embroidered Panjabi",
        url: "https://www.arrivalscavebd.com/en/embroidered-panjabi",
        publisher: "arrivalscavebd.com",
      },
      {
        title: "Shop — Silk Panjabi",
        url: "https://www.arrivalscavebd.com/en/silk-panjabi",
        publisher: "arrivalscavebd.com",
      },
      {
        title: "Shop — Cotton Panjabi",
        url: "https://www.arrivalscavebd.com/en/cotton-panjabi",
        publisher: "arrivalscavebd.com",
      },
      {
        title: "Blog",
        url: "https://www.arrivalscavebd.com/en/blog",
        publisher: "arrivalscavebd.com",
      },
    ],
    category: "ecommerce",
    year: 2026,
    status: "production",
    privateRepo: true,
  },
  {
    slug: "shahriar-kabir",
    title: "Shahriar Kabir Portfolio",
    description: "Premium personal brand website for an AI company executive. A full thought-leadership platform with editorial content, career narrative, schema structured data, and a curated design system.",
    summary: "Designed a premium editorial platform for an AI executive, featuring dynamic OG generation and Schema-rich SEO.",
    longDescription: "Built a premium personal brand website for Shahriar Kabir, Head of Operations at PrimeSync AI. The site goes far beyond a typical portfolio — it's a thought-leadership engine. Features include an MDX-powered editorial blog with published BPO and AI industry articles, dynamic OG image generation per post via @vercel/og, a triple-font editorial system (Inter + Fraunces + JetBrains Mono), Schema.org JSON-LD structured data for rich search results, cookie consent, Vercel Analytics, Framer Motion animations, Instagram embeds, and QR code generation. The design follows a 'Paper, Ink & Forest' color palette with Lenis smooth scrolling. The career timeline is designed as a visual story arc, not just a list of jobs.",
    tags: ["Next.js", "Personal Brand", "MDX", "Framer Motion", "Editorial", "SEO"],
    link: "https://www.shahriar-kabir.com",
    githubUrl: "https://github.com/Afraim3499/shahriar-portfolio",
    image: "/shahriar-kabir-1.jpg",
    screenshots: [
      "/shahriar-kabir-1.jpg",
      "/shahriar-kabir-2.jpg",
      "/shahriar-kabir-3.jpg",
      "/shahriar-kabir-4.jpg",
    ],
    metrics: {
      components: 30,
      pages: 7,
    },
    techStack: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "TailwindCSS v4",
      "Framer Motion",
      "MDX",
      "Lenis",
      "Vercel Analytics",
      "@vercel/og",
    ],
    challenges: [
      "Translating a complex personal brand identity ('The Architect & The Explorer') into a cohesive digital experience",
      "Building an editorial system that handles MDX blog articles with dynamic OG image generation per post",
      "Designing a triple-font typographic system that balances Inter, Fraunces, and JetBrains Mono effectively",
      "Implementing Schema.org JSON-LD structured data for rich search results via a dedicated component",
      "Creating a career timeline as a visual narrative story arc rather than a plain job list",
    ],
    solutions: [
      "Designed 'Paper, Ink & Forest' editorial color palette with bespoke typography for a premium curator feel",
      "Built MDX pipeline with @vercel/og for auto-generated social share images per article",
      "Implemented <SchemaData /> component for clean JSON-LD injection without coupling to page components",
      "Used Framer Motion for staggered reveal animations and Lenis for buttery smooth scrolling",
      "Integrated Instagram embeds, YouTube player, and QR code generator for rich media presence",
    ],
    performance: {
      lighthouse: 97,
      loadTime: "0.5s",
    },
    impactMetrics: [
      {
        label: "Client Type",
        value: "AI Exec",
        description: "Built for a Head of Operations at a leading AI company (PrimeSync AI).",
        icon: "target",
      },
      {
        label: "Content at Launch",
        value: "5+ Articles",
        description: "Published BPO/AI industry thought-leadership pieces live from day one.",
        icon: "zap",
      },
      {
        label: "SEO Ready",
        value: "Day One",
        description: "Schema.org JSON-LD, OG images, and sitemap configured at launch.",
        icon: "trending",
      },
    ],
    articles: [
      {
        title: "Homepage — Overview",
        url: "https://www.shahriar-kabir.com",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Insights — Thinking",
        url: "https://www.shahriar-kabir.com/thinking",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Career — Strategic Road",
        url: "https://www.shahriar-kabir.com/career",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Dossier — Professional Credentials",
        url: "https://www.shahriar-kabir.com/dossier",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Life & Motion — Visual Chronicles",
        url: "https://www.shahriar-kabir.com/life-motion",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Article: Mobile Auto-Repair & AI",
        url: "https://www.shahriar-kabir.com/thinking/mobile-auto-repair-ai",
        publisher: "shahriar-kabir.com",
      },
      {
        title: "Article: BPO CX Strategy",
        url: "https://www.shahriar-kabir.com/thinking/bpo-cx-strategy",
        publisher: "shahriar-kabir.com",
      },
    ],
    category: "portfolio",
    year: 2026,
    status: "production",
  },
  {
    slug: "gaari",
    title: "Gaari",
    description: "Bangladesh's premium car rental and travel platform. Featuring a robust booking system, dynamic pricing, and rich travel guides. Built for performance and reliability.",
    summary: "Built a high-performance travel booking engine with dynamic pricing, PWA support, and real-time fleet management.",
    longDescription: "A comprehensive car rental and travel platform serving Bangladesh. Features include multi-service booking engine (Car Rental, Travel Packages, Activities), advanced search with location, date, time, and car type filters, dynamic pricing algorithms, AI-powered chatbot (Gaariwala), geographic services with 500+ landmarks, real-time availability management, payment integration (Stripe & Bkash), and PWA capabilities. Built with Next.js 14, TypeScript, Supabase, and Redis caching.",
    tags: ["Next.js", "Travel", "E-commerce", "Performance", "AI", "PWA"],
    link: "https://gaaribd.com",
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/gaari-1.jpg",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/gaari-1.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/gaari-2.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/gaari-3.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/gaari-4.jpg",
    ],
    metrics: {
      components: 80,
      apiEndpoints: 110,
      databaseTables: 20,
      pages: 50,
    },
    techStack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "Supabase",
      "PostgreSQL",
      "Redis",
      "Stripe",
      "Bkash",
      "Cloudinary",
      "Tailwind CSS",
    ],
    challenges: [
      "Complex booking system with multiple service types (Car Rental, Travel Packages, Activities)",
      "Advanced search functionality with multiple filters (location, date, time, car type)",
      "Dynamic pricing algorithms based on demand and duration",
      "Real-time availability management across multiple services",
      "Payment gateway integration (Stripe & Bkash) with webhook handling",
      "Geographic services with 500+ landmarks and route optimization",
      "Building intuitive UI for complex booking flows",
    ],
    solutions: [
      "Built scalable booking engine with state management",
      "Implemented dynamic pricing with Redis caching",
      "Used Supabase Realtime for live updates",
      "Integrated multiple payment gateways with webhook handling",
      "Created geocoding system with route optimization",
    ],
    performance: {
      lighthouse: 98,
      loadTime: "0.4s",
    },
    impactMetrics: [
      {
        label: "Revenue Growth",
        value: "40%",
        description: "Increase in fleet utilization due to automated booking engine.",
        icon: "trending"
      },
      {
        label: "Operational Efficiency",
        value: "80%",
        description: "Reduction in manual support queries via AI Chatbot.",
        icon: "zap"
      },
      {
        label: "Market Reach",
        value: "500+",
        description: "Landmarks indexed, expanding service area coverage.",
        icon: "target"
      }
    ],
    category: "ecommerce",
    year: 2025,
    status: "production",
    privateRepo: true,
  },


  {
    slug: "vibrance",
    title: "Vibrance",
    description: "Online clothing business co-founded, specializing in unique designs, particularly known for doodle hoodies. Built brand recognition in the online fashion market.",
    longDescription: "Co-founded an online clothing business that gained recognition for unique designs, especially doodle hoodies. Led product development, marketing strategy, and e-commerce operations. Built a strong brand presence in the online fashion market with innovative designs and customer engagement.",
    tags: ["E-commerce", "Fashion", "Brand Strategy", "Product Development"],
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/vibrance.webp",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/vibrance.webp",
    ],
    techStack: [
      "E-commerce",
      "Digital Marketing",
      "Product Development",
      "Brand Strategy",
    ],
    challenges: [
      "Building brand recognition in competitive online fashion market",
      "Developing unique product designs",
      "Managing e-commerce operations",
      "Customer acquisition and retention",
    ],
    solutions: [
      "Created unique product line, especially doodle hoodies",
      "Developed strong brand identity and marketing strategy",
      "Built effective e-commerce operations",
      "Focused on customer engagement and satisfaction",
    ],
    category: "ecommerce",
    year: 2022,
    status: "completed",
    impactMetrics: [
      {
        label: "Brand Reach",
        value: "50k+",
        description: "Social media impressions generated through organic marketing.",
        icon: "target"
      },
      {
        label: "Sales Conversion",
        value: "Top 10%",
        description: "Achieved high conversion rates in niche hoodie market.",
        icon: "trending"
      }
    ]
  },
  {
    slug: "carnival-of-crust",
    title: "Carnival of Crust",
    description: "Cloud kitchen management and operations. Partnered with major food delivery platforms (Foodpanda, Pathao) to optimize delivery logistics and customer satisfaction.",
    longDescription: "Co-founded and served as CEO of a cloud kitchen business. Managed operations, logistics, and strategic partnerships with major food delivery platforms (Foodpanda, Pathao). Optimized delivery logistics and customer satisfaction across multiple platforms.",
    tags: ["Operations", "Management", "Logistics"],
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/carnival-of-crust.jpg",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/carnival-of-crust.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/carnival-of-crust-2.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/carnival-of-crust-3.webp",
    ],
    techStack: [
      "Operations Management",
      "Logistics",
      "API Integration",
    ],
    category: "operations",
    year: 2023,
    status: "production",
    impactMetrics: [
      {
        label: "Order Velocity",
        value: "-15m",
        description: "Reduction in average delivery time via logistics optimization.",
        icon: "clock"
      },
      {
        label: "Platform Ratings",
        value: "4.8/5",
        description: "Consistently high customer satisfaction across delivery apps.",
        icon: "target"
      }
    ]
  },
  {
    slug: "yagacalls",
    title: "Yagacalls",
    description: "Expert trading calls and market analysis platform. Features a custom CMS, AI-powered content generation, community features (3,500+ investors), performance tracking, and advanced SEO.",
    summary: "Implemented a 4-layer SEO framework and AI content engine for a high-traffic fintech community of 3,500+ investors.",
    longDescription: "A platform providing expert trading calls and market analysis. Features include custom-built CMS, AI-powered content generation, community engagement with 3,500+ investors, performance tracking and signal showcase, blog and academy sections, pricing tiers, live price updates, and advanced 4-layer SEO framework (SXO, AIO, GEO, AEO). Built with PHP, HTML5, CSS3, JavaScript, and JSON-based database.",
    tags: ["PHP", "CMS", "SEO", "AI", "Fintech", "Community", "Analytics"],
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/yagacalls.jpg",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/yagacalls.jpg",
    ],
    metrics: {
      components: 15,
      apiEndpoints: 5,
      pages: 50,
    },
    techStack: [
      "HTML5",
      "CSS3",
      "JavaScript ES6+",
      "PHP",
      "JSON Database",
    ],
    challenges: [
      "Building custom CMS from scratch",
      "Implementing 4-layer SEO framework",
      "AI content generation",
      "Performance optimization",
    ],
    solutions: [
      "Created modular CMS with auto-regeneration",
      "Implemented comprehensive SEO with structured data",
      "Built AI content generation system",
      "Optimized Core Web Vitals with performance monitoring",
    ],
    category: "cms",
    year: 2024,
    status: "production",
    impactMetrics: [
      {
        label: "SEO Traffic",
        value: "+300%",
        description: "Growth in organic traffic via 4-layer SEO framework.",
        icon: "trending"
      },
      {
        label: "Community Growth",
        value: "3.5k+",
        description: "Active investors engaged in the community ecosystem.",
        icon: "target"
      }
    ]
  },
  {
    slug: "leads-sales-crm",
    title: "Leads and Sales CRM",
    description: "A high-performance CRM designed for outbound sales teams. Features automated lead tracking, visual pipelines, and real-time conversion analytics.",
    longDescription: "A vertically integrated command center unified the ingestion pipeline (leads) with the execution layer (calls/notes) in a single high-performance interface. We leveraged Supabase Realtime for instant collision detection (preventing two reps from calling the same lead) and Optimistic UI for zero-latency interactions. The system transforms administrative data entry into high-velocity selling, serving as a turnkey Sales Operating System. Crucially, it includes an intelligent lead sorting engine that uses area-code recognition to prioritize leads by their local time, ensuring no prospect is ever called during off-hours (early morning/late night).",
    tags: ["Next.js", "Supabase", "Tailwind", "Shadcn UI", "Realtime"],
    link: "#",
    githubUrl: "https://github.com/Afraim3499/primesync-crm",
    techStack: [
      "Next.js 14",
      "Supabase",
      "Tailwind CSS",
      "Shadcn UI",
      "Framer Motion",
      "WebRTC",
    ],
    image: "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/crm-homepage.jpg",
    screenshots: [
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/crm-homepage.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/CRM-firstlook.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/crm-login.jpg",
      "https://brshoodoihexflrolqvu.supabase.co/storage/v1/object/public/portfolio-images/first-load.jpg",
    ],
    challenges: [
      "Fragmented data silos causing 30% time waste for sales reps",
      "Synchronizing state across multiple active users in real-time (Lead Collision)",
      "Migrating legacy data without downtime",
      "Ensuring TCPA compliance by respecting prospect timezones automatically",
    ],
    solutions: [
      "Implemented Supabase Realtime for instant presence and updates",
      "Designed Optimistic UI architecture for zero-latency feel",
      "Built visual Kanban pipelines for 100% pipeline visibility",
      "Automated call logging and admin tasks (reducing overhead by 40%)",
      "Developed smart phone-to-area-code recognition to sort leads by timezone",
    ],
    metrics: {
      components: 45,
      apiEndpoints: 15,
      databaseTables: 12,
      pages: 10,
    },
    performance: {
      lighthouse: 95,
      loadTime: "<0.4s",
    },
    category: "operations",
    year: 2024,
    status: "development",
    impactMetrics: [
      {
        label: "Admin Time Saved",
        value: "40%",
        description: "Reduction in manual data entry for sales reps.",
        icon: "clock"
      },
      {
        label: "Call Efficiency",
        value: "2x",
        description: "Increase in daily calls per rep via automated workflows.",
        icon: "zap"
      }
    ]
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((project) => project.slug === slug);
};

export const getProjectsByCategory = (category: Project["category"]): Project[] => {
  return projects.filter((project) => project.category === category);
};

export const getProjectsByTech = (tech: string): Project[] => {
  return projects.filter((project) =>
    project.techStack.some((t) => t.toLowerCase().includes(tech.toLowerCase()))
  );
};

