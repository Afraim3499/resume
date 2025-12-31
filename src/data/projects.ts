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
  category: "ecommerce" | "cms" | "ai" | "operations" | "news";
  year: number;
  status: "production" | "development" | "completed";
}

export const projects: Project[] = [
  {
    slug: "gaari",
    title: "Gaari",
    description: "Bangladesh's premium car rental and travel platform. Featuring a robust booking system, dynamic pricing, and rich travel guides. Built for performance and reliability.",
    longDescription: "A comprehensive car rental and travel platform serving Bangladesh. Features include multi-service booking engine (Car Rental, Travel Packages, Activities), advanced search with location, date, time, and car type filters, dynamic pricing algorithms, AI-powered chatbot (Gaariwala), geographic services with 500+ landmarks, real-time availability management, payment integration (Stripe & Bkash), and PWA capabilities. Built with Next.js 14, TypeScript, Supabase, and Redis caching.",
    tags: ["Next.js", "Travel", "E-commerce", "Performance", "AI", "PWA"],
    link: "https://gaaribd.com",
    image: "/assets/gaari 1.jpg",
    screenshots: [
      "/assets/gaari 1.jpg",
      "/assets/gaari 2.jpg",
      "/assets/gaari 3.jpg",
      "/assets/gaari 4.jpg",
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
    category: "ecommerce",
    year: 2025,
    status: "production",
  },
  {
    slug: "the-trail",
    title: "The Trail",
    description: "High-performance, information-dense news aggregator. Automatically curated content with 'Editor's Picks' and high-speed delivery. Designed for the modern reader.",
    longDescription: "A production-ready news platform with custom CMS, analytics system, and comprehensive admin dashboard. Features include advanced filtering system (Latest, Most Popular, Trending, Hot), category navigation (Politics, Tech, Culture, Business, etc.), trending articles with view counts, breaking news banner system, date-based filtering, rich text editor (Tiptap), content workflow (Draft → Review → Approved → Published), custom analytics with charts, SEO optimization with structured data, newsletter system, comments moderation, and Docker deployment.",
    tags: ["Next.js", "News Aggregator", "Automation", "High Traffic", "CMS"],
    link: "https://trailheadlines.com",
    image: "/assets/the trail.jpg",
    screenshots: [
      "/assets/the trail.jpg",
      "/assets/the trail 2.jpg",
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
    category: "news",
    year: 2024,
    status: "production",
  },
  {
    slug: "primesync-solutions",
    title: "PrimeSync Solutions",
    description: "AI company specializing in AI voice agents for businesses. Leading product research, market research, and business development efforts across various sectors.",
    longDescription: "Working as Product & Market Researcher and Business Development Executive at PrimeSync Solutions, an AI company specializing in creating AI voice agents for businesses. Conducting comprehensive market research, identifying high-potential lead generation strategies, and developing business development frameworks for AI solutions across sectors like HVAC, Plumbing, and Car Dealerships.",
    tags: ["AI", "Voice Agents", "Market Research", "Business Development", "Product Research"],
    link: "https://primesyncsolutions.com",
    image: "/assets/primesync 1.jpg",
    screenshots: [
      "/assets/primesync 1.jpg",
      "/assets/primesync 2.jpg",
    ],
    techStack: [
      "Market Research",
      "Business Development",
      "Product Strategy",
      "AI/ML",
    ],
    challenges: [
      "Identifying market opportunities for AI voice agents",
      "Conducting comprehensive market research across multiple sectors",
      "Developing business development strategies",
      "Analyzing lead generation potential",
    ],
    solutions: [
      "Conducted in-depth market research for AI voice agent adoption",
      "Identified high-potential lead generation strategies",
      "Developed business development frameworks",
      "Researched and analyzed market trends across various business sectors",
    ],
    category: "ai",
    year: 2024,
    status: "completed",
  },
  {
    slug: "vibrance",
    title: "Vibrance",
    description: "Online clothing business co-founded, specializing in unique designs, particularly known for doodle hoodies. Built brand recognition in the online fashion market.",
    longDescription: "Co-founded an online clothing business that gained recognition for unique designs, especially doodle hoodies. Led product development, marketing strategy, and e-commerce operations. Built a strong brand presence in the online fashion market with innovative designs and customer engagement.",
    tags: ["E-commerce", "Fashion", "Brand Strategy", "Product Development"],
    image: "/assets/vibrance.png",
    screenshots: [
      "/assets/vibrance.png",
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
  },
  {
    slug: "carnival-of-crust",
    title: "Carnival of Crust",
    description: "Cloud kitchen management and operations. Partnered with major food delivery platforms (Foodpanda, Pathao) to optimize delivery logistics and customer satisfaction.",
    longDescription: "Co-founded and served as CEO of a cloud kitchen business. Managed operations, logistics, and strategic partnerships with major food delivery platforms (Foodpanda, Pathao). Optimized delivery logistics and customer satisfaction across multiple platforms.",
    tags: ["Operations", "Management", "Logistics"],
    image: "/assets/carnival of crust.jpg",
    screenshots: [
      "/assets/carnival of crust.jpg",
      "/assets/carnival of crust 2.jpg",
      "/assets/carnival of crust 3.jpg",
    ],
    techStack: [
      "Operations Management",
      "Logistics",
      "API Integration",
    ],
    category: "operations",
    year: 2023,
    status: "production",
  },
  {
    slug: "yagacalls",
    title: "Yagacalls",
    description: "Expert trading calls and market analysis platform. Features a custom CMS, AI-powered content generation, community features (3,500+ investors), performance tracking, and advanced SEO.",
    longDescription: "A platform providing expert trading calls and market analysis. Features include custom-built CMS, AI-powered content generation, community engagement with 3,500+ investors, performance tracking and signal showcase, blog and academy sections, pricing tiers, live price updates, and advanced 4-layer SEO framework (SXO, AIO, GEO, AEO). Built with PHP, HTML5, CSS3, JavaScript, and JSON-based database.",
    tags: ["PHP", "CMS", "SEO", "AI", "Fintech", "Community", "Analytics"],
    image: "/assets/yagacalls.jpg",
    screenshots: [
      "/assets/yagacalls.jpg",
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

