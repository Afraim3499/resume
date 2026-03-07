export interface SolutionFAQ {
    question: string;
    answer: string;
    category: string;
}

export interface SolutionProofProject {
    slug: string;
    highlight: string; // one-line result highlight
}

export interface Solution {
    slug: string;
    title: string;          // Page H1
    subtitle: string;       // Below H1
    metaTitle: string;      // <title> tag
    metaDescription: string;
    heroTagline: string;    // Badge text above H1

    // 3D Graphic Data
    iconName: string;
    floatingText: {
        topLeft: { title: string; subtitle: string; };
        bottomRight: { title: string; subtitle: string; };
    };

    // Problem → Solution
    problem: {
        headline: string;
        points: string[];
    };
    deliverables: string[];

    // Proof
    proofProjects: SolutionProofProject[];
    caseStudySlugs: string[];
    metrics: { label: string; value: string; description: string }[];

    // Content
    relatedBlogSlugs: string[];
    techStack: string[];

    // FAQ
    faqs: SolutionFAQ[];
}

export const solutions: Solution[] = [
    // ─── 1. E-Commerce Platform ─────────────────────────────────────
    {
        slug: "ecommerce-platform",
        title: "Want Your Own E-Commerce Platform?",
        subtitle: "Custom-built storefronts that generate revenue from day one — not template tweaks that look like everyone else.",
        metaTitle: "Custom E-Commerce Development | Rizwanul Islam (Afraim)",
        metaDescription: "Get a custom e-commerce platform with real payment integration, Meta CAPI tracking, Google Merchant feeds, and CRO-optimized UX. Built on Next.js + Supabase.",
        heroTagline: "E-Commerce Engineering",

        iconName: "ShoppingCart",
        floatingText: {
            topLeft: { subtitle: "Cart Abandonment", title: "Recovered" },
            bottomRight: { subtitle: "Ad Tracking", title: "Airtight" },
        },

        problem: {
            headline: "Generic Templates Are Losing You Money",
            points: [
                "Shopify templates look identical to 10,000 other stores — zero brand differentiation",
                "No server-side ad tracking means your Facebook/Google attribution is broken",
                "Plugin bloat slows your store to a crawl — killing mobile conversions",
                "Non-technical staff can't update products without calling a developer",
            ],
        },
        deliverables: [
            "Custom storefront designed for your brand and audience",
            "Payment integration — Stripe, Bkash, SSLCommerz, or any gateway",
            "CMS portal so your team can manage products and collections",
            "Full Meta Conversions API (CAPI) for accurate ad attribution",
            "Google Merchant XML feed for Shopping ads",
            "Mobile-first CRO: sticky ATC, urgency badges, cashback bars",
            "SEO optimized from day one — Schema.org, OG tags, sitemap",
        ],

        proofProjects: [
            { slug: "arrivals-cave", highlight: "Launched Eid 2026 collection — revenue-generating from day one" },
            { slug: "vibrance", highlight: "Built brand recognition in competitive fashion market — 50k+ impressions" },
        ],
        caseStudySlugs: ["arrivalscave"],
        metrics: [
            { label: "Launch", value: "Eid 2026", description: "Full collection live with 6 sub-collections generating immediate revenue." },
            { label: "Ad Attribution", value: "Full Stack", description: "Meta CAPI + Google Merchant = complete server-side tracking pipeline." },
            { label: "CRO Features", value: "7+", description: "Sticky ATC, urgency badges, cashback bar, testimonials, scarcity indicators." },
        ],

        relatedBlogSlugs: ["meta-capi-nextjs", "stop-wasting-money-email-verification"],
        techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "Stripe", "Meta CAPI", "Google Merchant", "TailwindCSS v4", "Tiptap"],

        faqs: [
            {
                question: "How much does a custom e-commerce site cost?",
                answer: "It depends on complexity, but a full-featured store with CMS, payment integration, and ad tracking typically starts at a fraction of what agencies charge for a Shopify template — because I build assets, not hourly billing.",
                category: "E-Commerce",
            },
            {
                question: "Can my team manage products without developers?",
                answer: "Absolutely. Every e-commerce build includes a CMS portal (built with Tiptap) where non-technical staff can add products, manage collections, update descriptions, and control seasonal campaigns.",
                category: "E-Commerce",
            },
            {
                question: "Do you handle ad tracking setup?",
                answer: "Yes — I implement both client-side Meta Pixel and server-side Conversions API (CAPI) with proper deduplication, plus Google Merchant feeds for Shopping ads. Your attribution will be airtight.",
                category: "E-Commerce",
            },
        ],
    },

    // ─── 2. News / Media Platform ───────────────────────────────────
    {
        slug: "news-media-platform",
        title: "Launch Your Own News or Media Platform",
        subtitle: "Modern editorial CMS with real-time publishing, automated workflows, and SEO that actually works — not a WordPress blog.",
        metaTitle: "Custom News & Media Platform Development | Rizwanul Islam (Afraim)",
        metaDescription: "Build a scalable news platform with custom CMS, editorial workflows, automated categorization, and SEO optimization. Next.js + Supabase architecture.",
        heroTagline: "Media Platform Engineering",

        iconName: "Newspaper",
        floatingText: {
            topLeft: { subtitle: "Publishing Speed", title: "Instant" },
            bottomRight: { subtitle: "Editorial", title: "Workflow" },
        },

        problem: {
            headline: "WordPress Won't Scale Your Media Ambitions",
            points: [
                "WordPress is slow, insecure, and drowning in plugin dependencies",
                "No editorial workflow — anyone can publish anything without review",
                "SEO requires 5 plugins that fight each other for control",
                "Your content team wastes hours on formatting instead of writing",
            ],
        },
        deliverables: [
            "Custom CMS with rich text editor (Tiptap) — write, format, publish",
            "Multi-stage editorial workflow: Draft → Review → Approved → Published",
            "Automated content categorization and trending analytics",
            "Real-time breaking news banner system",
            "Newsletter system with subscriber management",
            "AWS S3 media pipeline for enterprise-grade asset management",
            "Comprehensive SEO with Schema.org structured data",
            "Playwright E2E tests + CI/CD for zero-regression deployments",
        ],

        proofProjects: [
            { slug: "the-trail", highlight: "15k+ monthly readers — 3x content velocity via automation" },
            { slug: "inshortbd", highlight: "Enterprise infra: AWS S3 + Playwright E2E + CI/CD pipeline" },
        ],
        caseStudySlugs: ["the-trail", "inshortbd"],
        metrics: [
            { label: "Content Velocity", value: "3x", description: "Faster publishing workflow via custom CMS and automation." },
            { label: "Audience", value: "15k+ MAR", description: "Monthly active readers reached within first quarter." },
            { label: "Infrastructure", value: "Enterprise", description: "AWS S3 + Supabase + GitHub Actions — production-grade." },
        ],

        relatedBlogSlugs: ["news-aggregator-architecture", "launching-trail-news-platform", "playwright-cicd"],
        techStack: ["Next.js 16", "React 19", "TypeScript", "Supabase", "PostgreSQL", "AWS S3", "Tiptap", "TanStack Query", "Playwright", "GitHub Actions"],

        faqs: [
            {
                question: "Can this handle high-traffic spikes?",
                answer: "Yes. The architecture uses PostgreSQL with aggressive caching and static generation for public pages. The Trail handles 15k+ monthly readers without breaking a sweat.",
                category: "News Platform",
            },
            {
                question: "Can multiple editors work simultaneously?",
                answer: "The multi-stage workflow (Draft → Review → Published) supports multiple editors with role-based permissions. Editors review content in a queue, and only approved content goes live.",
                category: "News Platform",
            },
            {
                question: "Is it SEO-optimized?",
                answer: "SEO is built into the architecture — not bolted on as a plugin. Schema.org structured data, OG images, sitemaps, and canonical URLs are all generated automatically.",
                category: "News Platform",
            },
        ],
    },

    // ─── 3. Booking System ──────────────────────────────────────────
    {
        slug: "booking-system",
        title: "Get a Custom Booking System That Runs Itself",
        subtitle: "Multi-service reservations, dynamic pricing, real-time availability — built for YOUR business, not a one-size-fits-all plugin.",
        metaTitle: "Custom Booking System Development | Rizwanul Islam (Afraim)",
        metaDescription: "Build a custom booking and reservation system with dynamic pricing, real-time availability, payment integration, and AI chatbot. Next.js + Supabase + Redis.",
        heroTagline: "Booking System Architecture",

        iconName: "CalendarDays",
        floatingText: {
            topLeft: { subtitle: "Bookings", title: "Automated" },
            bottomRight: { subtitle: "Pricing", title: "Dynamic" },
        },

        problem: {
            headline: "Off-the-Shelf Booking Plugins Are Killing Your Revenue",
            points: [
                "Rigid booking plugins can't handle your specific service types or pricing models",
                "No dynamic pricing — you're leaving money on the table during peak demand",
                "Real-time availability requires constant manual updates",
                "Customers abandon booking flows because the UX is confusing on mobile",
            ],
        },
        deliverables: [
            "Multi-service booking engine — rentals, packages, activities, appointments",
            "Dynamic pricing algorithms based on demand, duration, and season",
            "Real-time availability management with instant updates",
            "Payment integration — Stripe, Bkash, or any local gateway",
            "AI chatbot for instant customer support and booking assistance",
            "Geographic services with location search and route optimization",
            "PWA capabilities — works offline, installable on mobile",
            "Admin dashboard with analytics and fleet/resource management",
        ],

        proofProjects: [
            { slug: "gaari", highlight: "40% revenue growth — 500+ landmarks — 110 API endpoints — AI chatbot" },
        ],
        caseStudySlugs: ["gaari"],
        metrics: [
            { label: "Revenue Growth", value: "40%", description: "Increase in fleet utilization due to automated booking engine." },
            { label: "Support Reduction", value: "80%", description: "Decrease in manual support queries via AI Chatbot." },
            { label: "Coverage", value: "500+", description: "Landmarks indexed, expanding service area coverage." },
        ],

        relatedBlogSlugs: ["how-to-build-booking-system-nextjs", "building-gaari-booking-system", "building-ai-chatbot-nextjs-openai"],
        techStack: ["Next.js 14", "React 18", "TypeScript", "Supabase", "PostgreSQL", "Redis", "Stripe", "Bkash", "Cloudinary", "OpenAI"],

        faqs: [
            {
                question: "Can it handle multiple service types?",
                answer: "Yes — the Gaari system handles car rentals, travel packages, and activities all from one engine. The architecture is designed to scale to any service type.",
                category: "Booking System",
            },
            {
                question: "How does dynamic pricing work?",
                answer: "Pricing adjusts based on rules you define — demand, duration, season, vehicle type, etc. The algorithm runs in real-time using Redis caching for instant calculations.",
                category: "Booking System",
            },
            {
                question: "Does it support local payment methods?",
                answer: "Yes. I've integrated Stripe for international payments and Bkash for Bangladesh. Any payment gateway with an API can be integrated.",
                category: "Booking System",
            },
        ],
    },

    // ─── 4. Personal Brand Website ──────────────────────────────────
    {
        slug: "personal-brand-website",
        title: "Your Personal Brand Deserves More Than a Template",
        subtitle: "A premium thought-leadership platform that establishes authority and converts visitors into opportunities — not a generic portfolio.",
        metaTitle: "Premium Personal Brand Website Development | Rizwanul Islam (Afraim)",
        metaDescription: "Build a premium personal brand website with editorial blog, dynamic OG images, JSON-LD SEO, career narrative timeline, and custom design system.",
        heroTagline: "Personal Brand Engineering",

        iconName: "UserCircle2",
        floatingText: {
            topLeft: { subtitle: "Authority", title: "Established" },
            bottomRight: { subtitle: "Search", title: "Optimized" },
        },

        problem: {
            headline: "Your LinkedIn Profile Is Not a Brand",
            points: [
                "LinkedIn profiles all look identical — zero differentiation from 900 million other users",
                "Template portfolio sites scream 'I used a free theme' — not exactly authority",
                "No thought-leadership platform — your best insights are buried in social media posts",
                "Zero SEO presence — people can't find you when they search for your expertise",
            ],
        },
        deliverables: [
            "Premium personal website with bespoke design system tailored to your brand",
            "Editorial blog with MDX — write articles that establish thought leadership",
            "Dynamic OG images auto-generated per article for social sharing",
            "Schema.org JSON-LD structured data for rich Google search results",
            "Career timeline as a visual narrative — not just a list of jobs",
            "Smooth animations with Framer Motion and Lenis scrolling",
            "Full analytics integration to track visitor engagement",
            "SEO-optimized from launch — sitemap, robots, canonical URLs",
        ],

        proofProjects: [
            { slug: "shahriar-kabir", highlight: "Built for AI company executive — 5+ articles at launch, SEO-ready day one" },
        ],
        caseStudySlugs: ["shahriar-portfolio"],
        metrics: [
            { label: "Client Type", value: "AI Executive", description: "Built for a Head of Operations at a leading AI company." },
            { label: "Content at Launch", value: "5+ Articles", description: "Published thought-leadership pieces live from day one." },
            { label: "SEO Status", value: "Day One", description: "Schema.org, OG images, and sitemap configured at launch." },
        ],

        relatedBlogSlugs: ["deterministic-motion-editorial-ux", "cursor-vs-antigravity-ai-coding"],
        techStack: ["Next.js 16", "React 19", "TypeScript", "TailwindCSS v4", "MDX", "Framer Motion", "Lenis", "@vercel/og", "Vercel Analytics"],

        faqs: [
            {
                question: "Who is this for?",
                answer: "Executives, founders, thought leaders, and senior professionals who need a digital presence that matches their real-world authority. If you're someone people should know about, this is for you.",
                category: "Personal Brand",
            },
            {
                question: "Can I write and publish my own articles?",
                answer: "Yes — the blog is powered by MDX (Markdown + JSX), so you can write articles in a familiar format. Each article automatically gets OG images, schema data, and SEO optimization.",
                category: "Personal Brand",
            },
            {
                question: "How is this different from Squarespace or Wix?",
                answer: "Those are template builders. This is a custom-engineered platform with bespoke design, editorial capabilities, structured data for Google, and performance that template sites can't match.",
                category: "Personal Brand",
            },
        ],
    },

    // ─── 5. CRM / Sales System ──────────────────────────────────────
    {
        slug: "crm-sales-system",
        title: "Stop Losing Deals to Slow CRMs",
        subtitle: "A purpose-built sales command center with real-time collaboration, visual pipelines, and zero-latency interactions — not bloated enterprise software.",
        metaTitle: "Custom CRM & Sales System Development | Rizwanul Islam (Afraim)",
        metaDescription: "Build a custom CRM with real-time collaboration, visual pipelines, automated lead tracking, timezone-aware scheduling, and optimistic UI. Next.js + Supabase Realtime.",
        heroTagline: "Sales System Architecture",

        iconName: "LineChart",
        floatingText: {
            topLeft: { subtitle: "Leads Organized", title: "Nothing Lost" },
            bottomRight: { subtitle: "Follow-ups", title: "Stay On Time" },
        },

        problem: {
            headline: "Your CRM Is Slowing Down Your Sales Team",
            points: [
                "HubSpot and Salesforce are bloated with features your reps never use",
                "Loading spinners during calls kill momentum and lose deals",
                "Two reps calling the same lead because the system doesn't sync in real-time",
                "Manual data entry eats 30% of your team's selling time",
            ],
        },
        deliverables: [
            "Custom CRM tailored to your exact sales workflow",
            "Real-time collaboration — instant updates across all reps",
            "Visual Kanban pipelines for 100% pipeline visibility",
            "Automated lead tracking and call logging",
            "Timezone-aware call scheduling — never call a prospect at 3 AM",
            "Collision detection — prevents two reps from working the same lead",
            "Optimistic UI for zero-latency interactions",
            "Analytics dashboard with conversion tracking",
        ],

        proofProjects: [
            { slug: "leads-sales-crm", highlight: "40% less admin time — 2x daily calls per rep — real-time collision detection" },
        ],
        caseStudySlugs: ["leads-sales-crm"],
        metrics: [
            { label: "Admin Time Saved", value: "40%", description: "Reduction in manual data entry for sales reps." },
            { label: "Call Efficiency", value: "2x", description: "Increase in daily calls per rep via automated workflows." },
            { label: "UI Latency", value: "0ms", description: "Optimistic UI — actions feel instant even before server confirms." },
        ],

        relatedBlogSlugs: ["building-leads-and-sales-crm", "high-velocity-sales-engines-crm", "crm-downgrade-strategy-salesforce-to-close", "lead-gen-stack-apollo-salesnav"],
        techStack: ["Next.js 14", "Supabase Realtime", "PostgreSQL", "Shadcn UI", "Tailwind CSS", "Framer Motion", "WebRTC"],

        faqs: [
            {
                question: "Why not just use HubSpot?",
                answer: "HubSpot is great for marketing automation. But for high-velocity outbound sales, it's slow and bloated. A custom CRM eliminates the 90% of features your team doesn't use and optimizes the 10% they do.",
                category: "CRM",
            },
            {
                question: "Can it integrate with our existing tools?",
                answer: "Yes — the system is built with APIs in mind. It can integrate with your existing phone system, email, LinkedIn tools, and data enrichment services.",
                category: "CRM",
            },
            {
                question: "How does real-time collaboration work?",
                answer: "Supabase Realtime pushes database changes to all connected clients instantly via WebSockets. When Rep A claims a lead, Rep B sees it immediately — no refresh needed.",
                category: "CRM",
            },
        ],
    },

    // ─── 6. SEO & Lead Generation ───────────────────────────────────
    {
        slug: "seo-lead-generation",
        title: "300% More Organic Traffic. No Ad Budget.",
        subtitle: "A proven 4-layer SEO framework that generates real leads — not just rankings that look good on a report.",
        metaTitle: "SEO & Organic Lead Generation | Rizwanul Islam (Afraim)",
        metaDescription: "Get a proven 4-layer SEO framework (SXO + AIO + GEO + AEO) that drove 300% organic traffic growth. Schema.org, content strategy, and community building.",
        heroTagline: "SEO & Lead Gen Strategy",

        iconName: "Search",
        floatingText: {
            topLeft: { subtitle: "Organic Traffic", title: "Uncapped" },
            bottomRight: { subtitle: "Conversion", title: "Optimized" },
        },

        problem: {
            headline: "Your SEO Agency Is Charging You for Rankings That Don't Convert",
            points: [
                "Monthly retainers for basic keyword research that any AI tool can do",
                "Rankings don't equal revenue — you need leads, not vanity metrics",
                "No structured data — Google can't understand what your business actually does",
                "Content strategy is 'write blog posts' with zero conversion planning",
            ],
        },
        deliverables: [
            "4-Layer SEO Framework: SXO + AIO + GEO + AEO",
            "Schema.org structured data for rich search results",
            "Content strategy with conversion-focused topic clusters",
            "Community building strategy for organic amplification",
            "Performance monitoring with Core Web Vitals optimization",
            "AI-powered content generation pipeline",
            "Competitive analysis and gap identification",
            "Local SEO optimization for geographic targeting",
        ],

        proofProjects: [
            { slug: "yagacalls", highlight: "+300% organic traffic growth — 3.5k+ active community members" },
        ],
        caseStudySlugs: ["yagacalls"],
        metrics: [
            { label: "Traffic Growth", value: "+300%", description: "Organic traffic increase via 4-layer SEO framework." },
            { label: "Community", value: "3.5k+", description: "Active investors engaged in the community ecosystem." },
            { label: "SEO Layers", value: "4", description: "SXO + AIO + GEO + AEO — comprehensive search optimization." },
        ],

        relatedBlogSlugs: ["4-layer-seo-framework-yagacalls", "data-harvest-zoominfo-rocketreach", "stop-wasting-money-email-verification"],
        techStack: ["Schema.org", "JSON-LD", "Google Search Console", "AI Content Generation", "Core Web Vitals", "Structured Data"],

        faqs: [
            {
                question: "What's the 4-layer SEO framework?",
                answer: "SXO (Search Experience Optimization), AIO (AI Optimization), GEO (Generative Engine Optimization), and AEO (Answer Engine Optimization). Each layer targets a different aspect of how search engines discover and rank content.",
                category: "SEO",
            },
            {
                question: "How long before I see results?",
                answer: "SEO is a compounding asset. Initial improvements (structured data, technical fixes) show results within weeks. Content-driven traffic growth typically compounds over 3-6 months.",
                category: "SEO",
            },
            {
                question: "Do you do ongoing SEO management?",
                answer: "I build the framework and train your team on it. I don't do monthly retainers for keyword tweaking. You get a system that keeps working after I leave.",
                category: "SEO",
            },
        ],
    },
];

export const getSolutionBySlug = (slug: string): Solution | undefined => {
    return solutions.find(s => s.slug === slug);
};
