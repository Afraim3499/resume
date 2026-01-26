import { Metadata } from "next";
import { ArrowRight, Bot, Zap, BarChart3, Workflow, Layers, ArrowUpRight, Globe, Database, DollarSign } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { WorkflowEngine } from "@/components/WorkflowEngine";

export const metadata: Metadata = {
    title: "Strategic Services | Business Development & Workflow Optimization",
    description: "Partner with an Execution Strategist who bridges the gap between chaos and profit. Specialized in Workflow Optimization, Market Intelligence, and Digital Product Strategy.",
    openGraph: {
        title: "Startups need Execution, Not Just Code.",
        description: "I turn complex manual messes into automated, one-click systems. Optimize your business logic with Rizwanul Islam.",
        type: "website",
    },
};

const strategicStack = [
    "HubSpot", "Salesforce", "Close", "Apollo", "Seamless", "LinkedIn Sales Navigator", "ZoomInfo", "NeverBounce", "ZeroBounce", "Cursor AI", "Antigravity"
];

const productizedSystems = [
    {
        name: "Gaari",
        desc: "Complete Fleet Management & Booking System",
        slug: "gaari",
        icon: Globe,
        color: "blue"
    },
    {
        name: "Trailheadlines",
        desc: "Autonomous AI News Aggregation Engine",
        slug: "the-trail",
        icon: Bot,
        color: "emerald"
    },
    {
        name: "Yagacalls",
        desc: "4-Layer SEO & Lead Generation Framework",
        slug: "yagacalls",
        icon: BarChart3,
        color: "purple"
    },
    {
        name: "Lead Gen CRM",
        desc: "Unified Outbound Sales Command Center",
        slug: "leads-sales-crm",
        icon: Database,
        color: "orange"
    },
];

const services = [
    {
        icon: Workflow,
        title: "Workflow Optimization",
        description: "I audit your manual processes and architect automated systems to replace them. Stop paying humans to do robot work.",
        features: ["Process Audits", "Automation Architecture", "CRM Integration", "No-Code/Low-Code Solutions"],
        color: "emerald"
    },
    {
        icon: BarChart3,
        title: "Market Intelligence",
        description: "Data-driven strategy to identify open lanes in your industry. I don't guess; I scrape, analyze, and report.",
        features: ["Competitor Analysis", "Lead Gen Strategy", "Data Mining", "Pricing Strategy"],
        color: "blue"
    },
    {
        icon: Bot,
        title: "Digital Product Strategy",
        description: "Translating your business goals into technical requirements. I bridge the gap between 'I have an idea' and 'It's live'.",
        features: ["MVP Planning", "Tech Stack Selection", "User Flow Optimization", "Feature Prioritization"],
        color: "purple"
    },
];

const faqs = [
    {
        question: "Do you write code or just plan?",
        answer: "I do both. I am a builder who understands business. I can architect the solution and then lead the development (or build it myself) to ensure the business logic isn't lost in translation.",
        category: "Services"
    },
    {
        question: "We are non-technical. Can you work with us?",
        answer: "You are my ideal partner. My specialty is translating 'Business Speak' (Revenue, Retention, Speed) into 'Tech Speak' (API, Database, Latency). I handle the chaos so you can focus on the vision.",
        category: "Services"
    },
    {
        question: "How do you define 'Workflow Optimization'?",
        answer: "If you are using a spreadsheet to manage something that should be a software feature, you have a workflow problem. I identify these bottlenecks and build custom tools or integrations to remove them.",
        category: "Services"
    },
    {
        question: "Are you a Fractional CTO?",
        answer: "I am an **Execution Strategist**. While I possess technical depth, my primary value is in *Business Development* and *Operations*. I focus on how technology *serves* the business, rather than just the technology itself.",
        category: "Services"
    }
];

export default function ServicesPage() {
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "serviceType": "Venture Architecture & Systems",
        "name": "Rizwanul Islam (Afraim) - Venture Architect",
        "url": "https://www.rizwanulafraim.com/services",
        "image": "https://www.rizwanulafraim.com/assets/rizwanul-islam-afraim.webp",
        "priceRange": "$$$",
        "address": {
            "@type": "PostalAddress",
            "addressCountry": "BD"
        },
        "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "5.0",
            "reviewCount": "5",
            "bestRating": "5",
            "worstRating": "1"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Strategic Systems & Services",
            "itemListElement": [
                ...productizedSystems.map((sys, i) => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Product",
                        "name": sys.name,
                        "description": sys.desc,
                        "brand": {
                            "@type": "Brand",
                            "name": "Afraim Venture Systems"
                        }
                    },
                    "position": i + 1
                })),
                ...services.map((s, i) => ({
                    "@type": "Offer",
                    "itemOffered": {
                        "@type": "Service",
                        "name": s.title,
                        "description": s.description
                    },
                    "position": i + 1 + productizedSystems.length
                }))
            ]
        }
    };

    return (
        <main className="bg-background min-h-screen text-foreground pt-32 pb-12 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify([serviceSchema, {
                        "@context": "https://schema.org",
                        "@type": "FAQPage",
                        "mainEntity": faqs.map(faq => ({
                            "@type": "Question",
                            "name": faq.question,
                            "acceptedAnswer": {
                                "@type": "Answer",
                                "text": faq.answer
                            }
                        }))
                    }])
                }}
            />

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

            {/* Hero Section */}
            <section className="container px-4 mx-auto max-w-5xl mb-24 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 animate-fade-in-up">
                    <Zap className="w-4 h-4" />
                    <span>Hybrid Authority Protocol</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">
                    Ideas are Cheap. <br />
                    <span className="text-gradient">Execution is Everything.</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
                    I don&apos;t just build software. I build the <strong className="text-foreground">Productized Systems</strong> that make business scale.
                    Stop hiring hourly coders; start deploying <span className="text-primary font-semibold">Assets</span>.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/#contact"
                        className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transform duration-200"
                    >
                        Negotiate Your Offer <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="#systems"
                        className="px-8 py-4 rounded-full bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all border border-foreground/10 hover:border-foreground/20 backdrop-blur-sm"
                    >
                        View Systems
                    </Link>
                </div>
            </section>

            {/* Urgency Notice */}
            <section className="container px-4 mx-auto max-w-2xl mb-24">
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center animate-pulse">
                    <p className="text-sm font-medium text-orange-500">
                        <span className="font-bold">⚠️ High Demand:</span> Currently filtering for <span className="underline decoration-2 underline-offset-2">2 Strategic Partners</span> for Q1 2026.
                    </p>
                </div>
            </section>

            {/* Productized Systems (The Solutions) */}
            <section id="systems" className="container px-4 mx-auto max-w-7xl mb-32">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">Proven Architecture</h2>
                    <p className="text-3xl md:text-5xl font-serif font-bold">Want a System Like One of These?</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    {productizedSystems.map((sys) => {
                        const Icon = sys.icon;
                        return (
                            <Link
                                key={sys.slug}
                                href={`/projects/${sys.slug}`}
                                className="group relative overflow-hidden p-8 rounded-3xl bg-secondary/30 border border-foreground/5 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/5"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 transition-opacity duration-500 transform group-hover:rotate-12 group-hover:scale-110">
                                    <Icon className={`w-32 h-32 text-${sys.color}-500/20`} />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-12 h-12 rounded-xl bg-${sys.color}-500/10 text-${sys.color}-500 flex items-center justify-center mb-6`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">{sys.name}</h3>
                                    <p className="text-foreground/70 text-lg mb-6 flex-grow">{sys.desc}</p>
                                    <div className="flex items-center text-sm font-bold text-primary uppercase tracking-wider">
                                        View Architecture <ArrowUpRight className="w-4 h-4 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* The Workflow Engine (Visual Centerpiece) */}
            <section className="container px-4 mx-auto max-w-7xl mb-32">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">The Engine</h2>
                    <p className="text-2xl md:text-4xl font-serif font-bold">Systematizing the Chaos</p>
                </div>
                <WorkflowEngine />
            </section>

            {/* Strategic Stack */}
            <section className="bg-foreground/5 py-12 mb-32 overflow-hidden border-y border-foreground/5">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg bg-background border border-foreground/10">
                            <Layers className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm uppercase tracking-wider">Tech & Data Stack</span>
                        </div>
                        <div className="relative flex-1 w-full overflow-hidden mask-linear-fade">
                            <div className="flex gap-8 items-center animate-scroll whitespace-nowrap">
                                {[...strategicStack, ...strategicStack].map((tool, index) => (
                                    <div key={index} className="text-lg font-medium text-foreground/60 hover:text-primary transition-colors cursor-default">
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container px-4 mx-auto max-w-7xl mb-40">
                <div className="text-center mb-16">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">Core Services</h2>
                    <p className="text-3xl md:text-5xl font-serif font-bold">Orchestration Modes</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group relative p-8 rounded-3xl border border-foreground/5 hover:border-primary/30 transition-all duration-500 bg-background/50 backdrop-blur-sm hover:shadow-2xl hover:shadow-primary/5 active:scale-[0.99]"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 rounded-2xl bg-secondary/50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-foreground/5">
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 font-serif">{service.title}</h3>
                                    <p className="text-foreground/60 mb-8 leading-relaxed min-h-[80px]">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-3 pt-6 border-t border-foreground/5">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm text-foreground/80 font-medium">
                                                <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* Creative Pricing / Engagement Models */}
            <section className="container px-4 mx-auto max-w-6xl mb-40">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">

                    {/* The Agency Trap (Contrast) */}
                    <div className="p-10 rounded-3xl bg-red-500/5 border border-red-500/10 flex flex-col justify-between">
                        <div>
                            <div className="inline-block px-3 py-1 rounded-full bg-red-500/10 text-red-500 text-xs font-bold uppercase tracking-wider mb-6">
                                The Old Way
                            </div>
                            <h2 className="text-3xl font-serif font-bold mb-4 text-foreground/80">The Agency Trap</h2>
                            <p className="text-foreground/60 mb-8 text-lg">
                                Agencies charge <strong className="text-foreground">$1,000–$2,000</strong> just to spin up a template with zero business logic or optimization.
                            </p>
                            <ul className="space-y-4 opacity-70">
                                <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Generic Templates</li>
                                <li className="flex items-center gap-3"><span className="text-red-500">✕</span> No Operations Strategy</li>
                                <li className="flex items-center gap-3"><span className="text-red-500">✕</span> Hourly Billing Drag</li>
                            </ul>
                        </div>
                    </div>

                    {/* The Curator's Offer (Value) */}
                    <div className="p-10 rounded-3xl bg-foreground text-background shadow-2xl shadow-foreground/20 transform md:-translate-y-4 md:scale-105 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary/20 w-64 h-64 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 rounded-full bg-background/20 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                                The Curator&apos;s Offer
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4">Curated Systems</h3>
                            <p className="text-background/80 mb-8 text-lg">
                                Don&apos;t pay for hours. Pay for a <span className="text-primary font-bold">Finished Asset</span>.
                            </p>
                            <p className="text-background/80 mb-10 leading-relaxed">
                                Contact me to get a special, curated offer for a system Customized & Optimized for your exact business model.
                            </p>

                            <Link
                                href="/#contact"
                                className="inline-flex w-full items-center justify-center gap-2 py-4 px-6 rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-all shadow-lg"
                            >
                                <DollarSign className="w-4 h-4" /> Get Your Custom Quote
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Founder's FAQ */}
            <section className="container px-4 mx-auto max-w-3xl pb-24">
                <div className="box-decoration-clone bg-secondary/20 rounded-3xl p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-serif font-bold mb-2">Questions?</h2>
                        <p className="text-foreground/60">Clarifying the business value.</p>
                    </div>
                    <FAQ items={faqs} />
                </div>
            </section>
        </main>
    );
}
