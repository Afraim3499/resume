import { Metadata } from "next";
import { ArrowRight, Bot, Zap, BarChart3, Workflow, Layers, ArrowUpRight, Globe, Database, DollarSign } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/FAQ";
import { WorkflowEngine } from "@/components/WorkflowEngine";

export const metadata: Metadata = {
    title: "Strategic Services | Business Development & Workflow Optimization",
    description: "Partner with an Execution Strategist who bridges the gap between chaos and profit. Specialized in Workflow Optimization, Market Intelligence, and Digital Product Strategy.",
    openGraph: {
        title: "Built to Scale. Not Just to Launch.",
        description: "Production-grade systems for growth, operations, and product execution. Work with Rizwanul Islam Afraim.",
        type: "website",
    },
};

const strategicStack = [
    "HubSpot", "Salesforce", "Close", "Apollo", "Seamless", "LinkedIn Sales Navigator", "ZoomInfo", "NeverBounce", "ZeroBounce", "Cursor AI", "Antigravity"
];

const productizedSystems = [
    {
        name: "E-Commerce Platform",
        desc: "Custom storefronts with payment integration, ad tracking, and CMS",
        slug: "ecommerce-platform",
        icon: Globe,
    },
    {
        name: "News & Media Platform",
        desc: "Editorial CMS with workflows, automation, and SEO",
        slug: "news-media-platform",
        icon: Bot,
    },
    {
        name: "Booking System",
        desc: "Multi-service reservations with dynamic pricing and AI chatbot",
        slug: "booking-system",
        icon: Globe,
    },
    {
        name: "CRM & Sales System",
        desc: "Real-time sales command center with visual pipelines",
        slug: "crm-sales-system",
        icon: Database,
    },
    {
        name: "Personal Brand Website",
        desc: "Premium personal brand with editorial blog and SEO",
        slug: "personal-brand-website",
        icon: Layers,
    },
    {
        name: "SEO & Lead Generation",
        desc: "4-Layer SEO framework that generates real leads",
        slug: "seo-lead-generation",
        icon: BarChart3,
    },
];

const services = [
    {
        icon: Workflow,
        title: "Workflow Optimization",
        description: "I audit your manual processes and architect automated systems to replace them. Stop paying humans to do robot work.",
        features: ["Process Audits", "Automation Architecture", "CRM Integration", "No-Code/Low-Code Solutions"],
    },
    {
        icon: BarChart3,
        title: "Market Intelligence",
        description: "Data-driven strategy to identify open lanes in your industry. I don't guess; I scrape, analyze, and report.",
        features: ["Competitor Analysis", "Lead Gen Strategy", "Data Mining", "Pricing Strategy"],
    },
    {
        icon: Bot,
        title: "Digital Product Strategy",
        description: "Translating your business goals into technical requirements. I bridge the gap between 'I have an idea' and 'It's live'.",
        features: ["MVP Planning", "Tech Stack Selection", "User Flow Optimization", "Feature Prioritization"],
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
        "name": "Rizwanul Islam (Afraim) - Execution Strategist",
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
        <main className="bg-[#F7F4EC] min-h-screen text-[#171717] pt-32 pb-12 overflow-hidden">
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
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#0F5132]/4 rounded-full blur-[120px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#EAF7EF]/60 rounded-full blur-[80px] -z-10" />

            {/* Hero Section */}
            <section className="container px-4 mx-auto max-w-5xl mb-24 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#EAF7EF] text-[#0F5132] text-sm font-medium mb-8 border border-[#0F5132]/20">
                    <Zap className="w-4 h-4" />
                    <span>Execution Strategist · Systems Architect</span>
                </div>
                <h1 className="text-5xl md:text-7xl font-serif font-bold mb-8 leading-tight tracking-tight text-[#171717]">
                    Built to Scale.<br />
                    <span className="text-[#0F5132] italic">Not Just to Launch.</span>
                </h1>
                <p className="text-xl md:text-2xl text-[#5F655F] max-w-3xl mx-auto leading-relaxed mb-12">
                    I design and build <strong className="text-[#171717]">production-grade systems</strong> that serve the full arc of a business — from market intelligence to automated operations to scalable platforms.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <a
                        href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-8 py-4 rounded-full bg-[#0F5132] text-white font-semibold hover:bg-[#168A4A] transition-all flex items-center gap-2 shadow-sm hover:scale-[1.02] transform duration-200"
                    >
                        Start a Conversation <ArrowRight className="w-4 h-4" />
                    </a>
                    <Link
                        href="#systems"
                        className="px-8 py-4 rounded-full bg-[#FFFDF8] text-[#171717] font-medium hover:bg-[#EAF7EF] transition-all border border-[#0F5132]/14"
                    >
                        View Systems
                    </Link>
                </div>
            </section>

            {/* Productized Systems */}
            <section id="systems" className="container px-4 mx-auto max-w-7xl mb-32">
                <div className="text-center mb-16">
                    <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-3">Proven Architecture</p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#171717]">Productized Systems</h2>
                    <p className="text-[#5F655F] mt-4 max-w-2xl mx-auto">Finished, deployable platform architectures — each designed around a real business model.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                    {productizedSystems.map((sys) => {
                        const Icon = sys.icon;
                        return (
                            <Link
                                key={sys.slug}
                                href={`/solutions/${sys.slug}`}
                                className="group relative overflow-hidden p-8 rounded-2xl bg-[#FFFDF8] border border-[#0F5132]/12 hover:border-[#0F5132]/30 transition-all duration-300 hover:shadow-xl hover:shadow-[#0F5132]/5"
                            >
                                <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-30 transition-opacity duration-500 transform group-hover:scale-110">
                                    <Icon className="w-28 h-28 text-[#0F5132]" />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className="w-11 h-11 rounded-xl bg-[#EAF7EF] text-[#0F5132] flex items-center justify-center mb-5">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-2 text-[#171717] group-hover:text-[#0F5132] transition-colors">{sys.name}</h3>
                                    <p className="text-[#5F655F] mb-5 flex-grow text-sm leading-relaxed">{sys.desc}</p>
                                    <div className="flex items-center text-xs font-bold text-[#0F5132] uppercase tracking-wider">
                                        View Architecture <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>

            {/* The Workflow Engine */}
            <section className="container px-4 mx-auto max-w-7xl mb-32">
                <div className="text-center mb-12">
                    <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-3">The Engine</p>
                    <h2 className="text-2xl md:text-4xl font-serif font-bold text-[#171717]">Systematizing Complexity</h2>
                </div>
                <WorkflowEngine />
            </section>

            {/* Strategic Stack */}
            <section className="bg-[#FFFDF8] py-10 mb-32 overflow-hidden border-y border-[#0F5132]/10">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg bg-[#EAF7EF] border border-[#0F5132]/20">
                            <Layers className="w-5 h-5 text-[#0F5132]" />
                            <span className="font-bold text-sm uppercase tracking-wider text-[#0F5132]">Tools &amp; Stack</span>
                        </div>
                        <div className="relative flex-1 w-full overflow-hidden mask-linear-fade">
                            <div className="flex gap-8 items-center animate-scroll whitespace-nowrap">
                                {[...strategicStack, ...strategicStack].map((tool, index) => (
                                    <div key={index} className="text-base font-medium text-[#5F655F] hover:text-[#0F5132] transition-colors cursor-default">
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="container px-4 mx-auto max-w-7xl mb-32">
                <div className="text-center mb-16">
                    <p className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-3">Engagement Modes</p>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-[#171717]">How I Work</h2>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => {
                        const Icon = service.icon;
                        return (
                            <div
                                key={index}
                                className="group relative p-8 rounded-2xl border border-[#0F5132]/12 hover:border-[#0F5132]/25 transition-all duration-500 bg-[#FFFDF8] hover:shadow-lg hover:shadow-[#0F5132]/5"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#EAF7EF]/0 to-[#EAF7EF]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                                <div className="relative z-10">
                                    <div className="w-12 h-12 rounded-xl bg-[#EAF7EF] text-[#0F5132] flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0F5132] group-hover:text-white transition-all duration-300">
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-4 font-serif text-[#171717]">{service.title}</h3>
                                    <p className="text-[#5F655F] mb-8 leading-relaxed text-sm min-h-[80px]">
                                        {service.description}
                                    </p>
                                    <ul className="space-y-2.5 pt-5 border-t border-[#0F5132]/10">
                                        {service.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-2.5 text-sm text-[#5F655F]">
                                                <span className="w-1 h-1 rounded-full bg-[#0F5132] flex-shrink-0" />
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

            {/* How to Engage */}
            <section className="container px-4 mx-auto max-w-5xl mb-32">
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Custom Systems */}
                    <div className="p-10 rounded-2xl bg-[#FFFDF8] border border-[#0F5132]/12 flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-5">For Founders &amp; Operators</p>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-[#171717]">Custom Systems</h3>
                            <p className="text-[#5F655F] mb-6 text-sm leading-relaxed">
                                A scoped engagement where I audit your operations, identify the highest-leverage gaps, and build a custom execution system — from workflow architecture to deployment.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {["Operations Audit", "Custom Platform Build", "Workflow Automation", "Go-to-Market Systems"].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#5F655F]">
                                        <span className="w-1 h-1 rounded-full bg-[#0F5132] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <a
                            href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl bg-[#0F5132] text-white font-semibold hover:bg-[#168A4A] transition-all shadow-sm text-sm"
                        >
                            <DollarSign className="w-4 h-4" /> Discuss Your Project
                        </a>
                    </div>

                    {/* Productized Solutions */}
                    <div className="p-10 rounded-2xl bg-[#EAF7EF] border border-[#0F5132]/15 flex flex-col justify-between">
                        <div>
                            <p className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-[#0F5132] mb-5">Pre-built &amp; Ready</p>
                            <h3 className="text-2xl font-serif font-bold mb-4 text-[#171717]">Productized Solutions</h3>
                            <p className="text-[#5F655F] mb-6 text-sm leading-relaxed">
                                Six production-grade platform architectures — refined through real deployments — available as a foundation for your business model. Faster start. Lower risk.
                            </p>
                            <ul className="space-y-3 mb-8">
                                {["E-Commerce Platform", "CRM & Sales System", "Booking System", "News & Media Platform"].map((item) => (
                                    <li key={item} className="flex items-center gap-2.5 text-sm text-[#5F655F]">
                                        <span className="w-1 h-1 rounded-full bg-[#0F5132] flex-shrink-0" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <Link
                            href="#systems"
                            className="inline-flex items-center justify-center gap-2 py-3.5 px-6 rounded-xl border border-[#0F5132]/30 bg-[#FFFDF8] text-[#0F5132] font-semibold hover:bg-[#0F5132] hover:text-white transition-all text-sm"
                        >
                            Browse Architectures <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container px-4 mx-auto max-w-3xl pb-24">
                <div className="bg-[#FFFDF8] rounded-2xl border border-[#0F5132]/12 p-8 md:p-12">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-serif font-bold mb-2 text-[#171717]">Common Questions</h2>
                        <p className="text-[#5F655F] text-sm">Clarifying the approach and business value.</p>
                    </div>
                    <FAQ items={faqs} />
                </div>
            </section>
        </main>
    );
}
