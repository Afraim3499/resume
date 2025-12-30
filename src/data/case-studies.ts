import { projects } from "./projects";

export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  problem: string;
  solution: string;
  results: {
    metrics: Array<{ label: string; value: string }>;
    impact: string;
    improvements: string[];
  };
  lessonsLearned: string[];
  technologies: string[];
  timeline: string;
  challenges: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}

// Enhanced case studies with detailed content
const caseStudyDetails: Record<string, Partial<CaseStudy>> = {
  "gaari": {
    problem: `Building Bangladesh's first comprehensive car rental and travel platform required solving multiple complex challenges simultaneously. The platform needed to handle three distinct service types (Car Rental, Travel Packages, Activities) with different booking parameters, pricing models, and availability constraints. 

The core challenge was creating a unified booking system that could manage real-time availability across hundreds of vehicles and services while preventing double bookings during high-traffic periods. Additionally, the system needed to support dynamic pricing algorithms that adjust based on demand, duration, and seasonality—all while maintaining sub-second response times for search queries.

Payment integration presented another layer of complexity, requiring seamless integration with both Stripe (international) and Bkash (local) payment gateways, each with different webhook structures and security requirements. The geographic services component needed to support 500+ landmarks and provide route optimization for travel planning.`,
    solution: `I architected a unified booking engine using Next.js 14's App Router with Server Components for optimal performance. The solution involved three core layers:

**State Management Layer**: Created a centralized booking state manager using React Context API and custom hooks that handles multi-step booking flows, cross-service availability checks, and real-time price calculations.

**Real-Time Availability Layer**: Implemented Supabase Realtime subscriptions with PostgreSQL triggers to maintain live availability counts. The system uses optimistic UI updates with backend confirmation to handle race conditions when multiple users book simultaneously.

**Dynamic Pricing Engine**: Built a server-side pricing calculator that considers base rates, duration multipliers, seasonal demand factors, promotional discounts, and last-minute booking premiums. All calculations are cached in Redis for performance.

For payment integration, I created a unified abstraction layer that handles both Stripe and Bkash webhooks with idempotency checks to prevent duplicate charges. The geographic services component uses geocoding APIs with route optimization algorithms.`,
    results: {
      metrics: [
        { label: "Components", value: "80+" },
        { label: "API Endpoints", value: "110+" },
        { label: "Database Tables", value: "20+" },
        { label: "Lighthouse Score", value: "98/100" },
        { label: "Load Time", value: "0.4s" },
      ],
      impact: `Successfully launched Gaari with a production-ready booking system that handles multiple service types seamlessly. The platform now processes bookings efficiently with real-time availability management and supports dynamic pricing that adapts to market conditions. The unified payment system processes transactions through both international and local gateways without friction.`,
      improvements: [
        "Achieved 98/100 Lighthouse performance score through strategic optimization",
        "Built scalable architecture supporting concurrent bookings without conflicts",
        "Implemented real-time availability management with Supabase Realtime",
        "Created unified payment abstraction supporting multiple gateways",
        "Optimized search queries to sub-second response times",
      ],
    },
    lessonsLearned: [
      "Complex booking flows benefit significantly from centralized state management",
      "Supabase Realtime makes live updates seamless but requires careful conflict resolution",
      "Abstracting payment logic allows easy addition of new payment gateways",
      "Performance optimization from the start prevents technical debt accumulation",
      "Multi-step flows with clear progress indicators significantly reduce abandonment rates",
      "Redis caching is essential for dynamic pricing calculations at scale",
      "Geographic services require careful API rate limit management",
    ],
    timeline: "2023 - Present",
    challenges: [
      "Complex booking system with multiple service types (Car Rental, Travel Packages, Activities)",
      "Advanced search functionality with multiple filters (location, date, time, car type)",
      "Dynamic pricing algorithms based on demand and duration",
      "Real-time availability management across multiple services",
      "Payment gateway integration (Stripe & Bkash) with webhook handling",
      "Geographic services with 500+ landmarks and route optimization",
      "Building intuitive UI for complex booking flows",
    ],
  },
  "the-trail": {
    problem: `Building a production-ready news platform required creating a custom CMS from scratch that could handle high traffic, provide rich editorial tools, and deliver content at lightning speed. The challenge wasn't just building a news site—it was creating a comprehensive content management system that non-technical editors could use effectively while maintaining performance standards.

The platform needed to support advanced content filtering (Latest, Most Popular, Trending, Hot), category-based navigation, trending algorithms based on view counts, breaking news banner systems, and a multi-stage content workflow (Draft → Review → Approved → Published). Additionally, the system required custom analytics to track article performance, SEO optimization with structured data, newsletter functionality, and comment moderation capabilities.

With 30+ database tables and complex relationships, the database architecture needed careful design to maintain query performance as content volume grew. The system also needed to handle Docker deployment with Nginx reverse proxy for production scalability.`,
    solution: `I built a custom CMS using Next.js 14+ with Tiptap rich text editor, providing a modern editing experience with real-time collaboration support. The content workflow system implements role-based permissions ensuring content quality before publication.

The advanced filtering system uses a sophisticated algorithm that considers view counts (weighted by recency), time on page, social shares, and comment engagement to determine trending and popular content. The database architecture uses normalized structure with strategic indexing on frequently queried fields and PostgreSQL full-text search for article discovery.

For analytics, I created a custom dashboard tracking article views, popular categories, reader engagement metrics, traffic sources, and peak reading times with data visualization using Recharts. SEO implementation includes Schema.org markup, dynamic sitemap generation, RSS feed, and proper meta tags with Open Graph and Twitter Cards.

Performance optimization leveraged Next.js Server Components for zero-client JavaScript, Next.js Image component with Cloudinary, multi-layer caching (CDN, Redis, database), route-based code splitting, and database query optimization with connection pooling.`,
    results: {
      metrics: [
        { label: "Components", value: "150+" },
        { label: "API Endpoints", value: "25+" },
        { label: "Database Tables", value: "30+" },
        { label: "Lines of Code", value: "10,000+" },
        { label: "Lighthouse Score", value: "95/100" },
        { label: "Load Time", value: "0.4s" },
      ],
      impact: `Successfully launched The Trail with a production-ready news platform featuring a custom CMS that editors love using. The platform handles high traffic efficiently with sub-second load times and provides comprehensive analytics for data-driven content decisions. The SEO implementation ensures strong organic visibility.`,
      improvements: [
        "Achieved 95/100 Lighthouse performance score through comprehensive optimization",
        "Built scalable architecture supporting high traffic without performance degradation",
        "Created intuitive CMS that non-technical editors can use effectively",
        "Implemented comprehensive analytics providing actionable insights",
        "Developed advanced filtering system improving content discovery",
        "Optimized database queries maintaining performance at scale",
      ],
    },
    lessonsLearned: [
      "Building custom CMS gives complete control but requires significant development time",
      "Performance optimization from day one prevents major refactoring later",
      "Non-technical users need intuitive interfaces with clear workflows",
      "Analytics data drives better content strategy decisions",
      "Scalability planning from the start prevents architectural limitations",
      "Database normalization and indexing are critical for query performance",
      "SEO implementation requires comprehensive structured data markup",
    ],
    timeline: "2024 - Present",
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
  },
  "yagacalls": {
    problem: `Yagacalls needed to establish strong organic visibility to serve its growing community of 3,500+ investors effectively. The platform required ranking for trading signal keywords, market analysis terms, financial education content, and platform-specific searches. Traditional SEO approaches weren't sufficient—we needed a comprehensive framework that could compete with established financial platforms.

The challenge involved implementing a 4-layer SEO framework (SXO, AIO, GEO, AEO) while maintaining platform performance and user experience. The system needed to support AI-powered content generation, structured data markup for answer engines, geographic optimization for local searches, and comprehensive technical SEO implementation.

Additionally, the custom CMS needed built-in SEO features, performance monitoring for Core Web Vitals, and analytics integration to track SEO effectiveness. The platform also required content optimization for voice search and featured snippets.`,
    solution: `I implemented a comprehensive 4-layer SEO framework:

**Layer 1 - SXO (Search Experience Optimization)**: Optimized on-page elements with semantic HTML, proper heading hierarchy, alt text for images, internal linking strategy, and breadcrumb navigation. Implemented technical SEO with page speed optimization, mobile responsiveness, SSL certificate, XML sitemap, and robots.txt optimization.

**Layer 2 - AIO (AI Optimization)**: Leveraged AI for content generation, automated meta descriptions, keyword optimization suggestions, and content gap analysis. Implemented AI chatbot for user queries and personalized content recommendations.

**Layer 3 - GEO (Geographic Optimization)**: Targeted location-specific searches with Google My Business optimization, location-based content, regional keyword targeting, and local backlink strategy.

**Layer 4 - AEO (Answer Engine Optimization)**: Optimized for answer engines with FAQ schema markup, HowTo schema for tutorials, Article schema for blog posts, and Review schema for testimonials. Implemented answer-first content structure with bullet points, clear concise answers, and question-based headings.

The implementation included comprehensive structured data markup, performance monitoring for Core Web Vitals, and analytics integration tracking organic traffic growth and keyword rankings.`,
    results: {
      metrics: [
        { label: "Components", value: "15+" },
        { label: "API Endpoints", value: "5+" },
        { label: "Pages", value: "50+" },
        { label: "Organic Traffic Increase", value: "300%" },
        { label: "Featured Snippets", value: "50+" },
      ],
      impact: `The 4-layer SEO framework transformed Yagacalls' organic visibility, resulting in a 300% increase in organic traffic. The platform now ranks in the top 3 for target keywords and has captured 50+ featured snippets. The comprehensive SEO implementation ensures strong organic growth while maintaining excellent user experience.`,
      improvements: [
        "300% increase in organic traffic through comprehensive SEO strategy",
        "Top 3 rankings achieved for target trading signal keywords",
        "50+ featured snippets captured through answer engine optimization",
        "Improved Core Web Vitals scores enhancing search rankings",
        "Higher engagement metrics indicating quality content",
        "Strong local visibility through geographic optimization",
      ],
    },
    lessonsLearned: [
      "Multi-layer SEO approach works better than single-strategy optimization",
      "Technical foundation (fast, mobile-friendly sites) is essential for rankings",
      "Comprehensive content outperforms thin content significantly",
      "Structured data markup increases visibility in search results",
      "SEO is an ongoing process requiring continuous optimization",
      "Answer engine optimization captures valuable featured snippets",
      "Geographic optimization expands reach to local audiences",
    ],
    timeline: "2024 - Present",
    challenges: [
      "Building custom CMS from scratch",
      "Implementing 4-layer SEO framework",
      "AI content generation integration",
      "Performance optimization",
      "Structured data markup implementation",
      "Answer engine optimization",
    ],
  },
};

// Generate case studies from projects with enhanced details
export const caseStudies: CaseStudy[] = projects
  .filter((project) => project.status === "production")
  .map((project) => {
    const enhancedDetails = caseStudyDetails[project.slug] || {};
    
    return {
      slug: `${project.slug}-case-study`,
      projectSlug: project.slug,
      title: `${project.title} - Case Study`,
      problem: enhancedDetails.problem || project.challenges?.[0] || `Building a scalable ${project.category} platform with modern technologies.`,
      solution: enhancedDetails.solution || project.solutions?.[0] || `Implemented a comprehensive solution using ${project.techStack.slice(0, 3).join(", ")}.`,
      results: enhancedDetails.results || {
        metrics: [
          project.metrics?.components && { label: "Components", value: `${project.metrics.components}+` },
          project.metrics?.apiEndpoints && { label: "API Endpoints", value: `${project.metrics.apiEndpoints}+` },
          project.metrics?.databaseTables && { label: "Database Tables", value: `${project.metrics.databaseTables}+` },
          project.performance?.lighthouse && { label: "Lighthouse Score", value: `${project.performance.lighthouse}/100` },
        ].filter(Boolean) as Array<{ label: string; value: string }>,
        impact: `Successfully launched ${project.title} with ${project.metrics?.components || 0}+ components and ${project.metrics?.apiEndpoints || 0}+ API endpoints.`,
        improvements: [
          `Improved performance with ${project.performance?.lighthouse || 95}/100 Lighthouse score`,
          `Built scalable architecture supporting high traffic`,
          `Implemented modern development practices`,
        ],
      },
      lessonsLearned: enhancedDetails.lessonsLearned || [
        "Importance of proper database design and indexing",
        "Value of type-safe development with TypeScript",
        "Benefits of modern React patterns (Server Components, App Router)",
        "Significance of performance optimization from the start",
      ],
      technologies: project.techStack,
      timeline: enhancedDetails.timeline || `${project.year} - ${project.status === "production" ? "Present" : "Completed"}`,
      challenges: enhancedDetails.challenges || project.challenges || [],
      beforeAfter: project.challenges && project.solutions ? {
        before: project.challenges.join(" "),
        after: project.solutions.join(" "),
      } : undefined,
    };
  });

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.slug === slug);
}

export function getCaseStudyByProject(projectSlug: string): CaseStudy | undefined {
  return caseStudies.find((study) => study.projectSlug === projectSlug);
}

