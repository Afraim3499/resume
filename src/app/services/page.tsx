import { Metadata } from "next";
import { ArrowRight, Bot, Target, Zap, BarChart3, Workflow, Users, CheckCircle2, ChevronRight, Layers, ArrowUpRight } from "lucide-react";
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

const provenProjects = [
    { name: "Gaari", desc: "Automated fleet management system.", slug: "gaari" },
    { name: "The Trail", desc: "Autonomous news aggregation engine.", slug: "the-trail" },
    { name: "Leads & Sales CRM", desc: "Unified outbound sales command center.", slug: "leads-sales-crm" },
    { name: "PrimeSync", desc: "AI voice agent market strategy.", slug: "primesync-solutions" },
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
        "@type": "Service",
        serviceType: "Business Optimization",
        provider: {
            "@type": "Person",
            name: "Rizwanul Islam (Afraim)",
            url: "https://www.rizwanulafraim.com"
        },
        areaServed: "Global",
        hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Strategic Execution Services",
            itemListElement: services.map((s, i) => ({
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: s.title,
                    description: s.description
                },
                position: i + 1
            }))
        }
    };

    return (
        <main className="bg-background min-h-screen text-foreground pt-32 pb-12 overflow-hidden">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
            />

            {/* Ambient Background */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] -z-10" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

            {/* Hero Section */}
            <section className="container px-4 mx-auto max-w-5xl mb-24 text-center relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20 animate-fade-in-up">
                    <Zap className="w-4 h-4" />
                    <span>Execution Strategy</span>
                </div>
                <h1 className="text-5xl md:text-8xl font-serif font-bold mb-8 leading-tight tracking-tight">
                    Ideas are Cheap. <br />
                    <span className="text-gradient">Execution is Everything.</span>
                </h1>
                <p className="text-xl md:text-2xl text-foreground/70 max-w-3xl mx-auto leading-relaxed mb-12">
                    I don&apos;t just build software. I build the <strong className="text-foreground">business logic</strong> that makes it profitable.
                    Partner with a strategist who understands <span className="text-primary font-semibold">Market Intelligence</span> as well as he understands Code.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Link
                        href="/#contact"
                        className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transform duration-200"
                    >
                        Discuss Your Vision <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                        href="/#projects"
                        className="px-8 py-4 rounded-full bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all border border-foreground/10 hover:border-foreground/20 backdrop-blur-sm"
                    >
                        See Execution Proof
                    </Link>
                </div>
            </section>

            {/* Urgency Notice (Scarcity Hook) */}
            <section className="container px-4 mx-auto max-w-2xl mb-24">
                <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/20 text-center animate-pulse">
                    <p className="text-sm font-medium text-orange-500">
                        <span className="font-bold">⚠️ Limited Availability:</span> Accepting maximum <span className="underline decoration-2 underline-offset-2">2 Strategic Projects</span> per quarter to ensure deep operational focus.
                    </p>
                </div>
            </section>

            {/* Proven Execution (Trust) */}
            <section className="container px-4 mx-auto max-w-5xl mb-32">
                <div className="p-1 rounded-2xl bg-gradient-to-r from-transparent via-foreground/5 to-transparent">
                    <div className="bg-background/80 backdrop-blur-md border border-foreground/5 rounded-2xl p-8 text-center">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-6">Proven Impact</h3>
                        <div className="flex flex-wrap items-center justify-center gap-4">
                            {provenProjects.map((project, i) => (
                                <Link
                                    key={i}
                                    href={`/projects/${project.slug}`}
                                    className="group flex items-center gap-3 pl-4 pr-3 py-2 rounded-full bg-secondary/30 hover:bg-secondary/60 border border-foreground/5 transition-all hover:scale-105"
                                >
                                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">{project.name}</span>
                                    <span className="hidden md:inline-block w-px h-4 bg-foreground/10" />
                                    <span className="text-sm text-foreground/60 hidden md:inline-block">{project.desc}</span>
                                    <div className="w-6 h-6 rounded-full bg-background flex items-center justify-center text-foreground/40 group-hover:text-primary transition-colors">
                                        <ArrowUpRight className="w-3 h-3" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* The Workflow Engine (Visual Centerpiece) */}
            <section className="container px-4 mx-auto max-w-7xl mb-12">
                <div className="text-center mb-12">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">The Transformation</h2>
                    <p className="text-2xl md:text-4xl font-serif font-bold">Turning Chaos into System</p>
                </div>
                <WorkflowEngine />
            </section>

            {/* Operator Mindset (The Gaari Story) */}
            <section className="container px-4 mx-auto max-w-6xl mb-32">
                <div className="flex flex-col md:flex-row items-center gap-12 bg-secondary/20 rounded-3xl p-8 md:p-12 border border-foreground/5">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-xs font-bold uppercase tracking-wider">
                            <Layers className="w-4 h-4" /> Operator Mindset
                        </div>
                        <h2 className="text-3xl md:text-5xl font-serif font-bold">Data is Free if You Know How to Harvest It.</h2>
                        <p className="text-lg text-foreground/70 leading-relaxed">
                            &quot;Datapoints are everywhere; it is up to the operator on how he gathers and organizes. I gathered <strong className="text-foreground">3 million landmark details</strong> for <em>Gaari</em> from Google Maps API integration, which enabled me to <strong className="text-foreground">eliminate recurring API costs</strong> for mapping.&quot;
                        </p>
                        <p className="text-lg text-foreground/70 font-medium italic">
                            That is the difference between a Developer (who pays) and a Strategist (who harvests).
                        </p>
                    </div>
                    <div className="flex-1 relative w-full h-64 md:h-auto rounded-2xl overflow-hidden border border-foreground/10 bg-background/50 flex items-center justify-center">
                        {/* Abstract Data Viz Representation */}
                        <div className="text-center">
                            <div className="text-6xl font-bold text-foreground/10">3M+</div>
                            <div className="text-sm text-foreground/40 font-mono mt-2">Data Points Indexed</div>
                        </div>
                        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent pointer-events-none" />
                    </div>
                </div>
            </section>

            {/* Strategic Stack (Recruiter Gold) */}
            <section className="bg-foreground/5 py-12 mb-32 overflow-hidden border-y border-foreground/5">
                <div className="container px-4 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg bg-background border border-foreground/10">
                            <Layers className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm uppercase tracking-wider">Strategic Stack</span>
                        </div>

                        <div className="relative flex-1 w-full overflow-hidden mask-linear-fade">
                            <div className="flex gap-8 items-center animate-scroll whitespace-nowrap">
                                {[...strategicStack, ...strategicStack].map((tool, i) => (
                                    <div key={i} className="text-lg font-medium text-foreground/60 hover:text-primary transition-colors cursor-default">
                                        {tool}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Grid (Interactive) */}
            <section className="container px-4 mx-auto max-w-7xl mb-40">
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

            {/* Engagement Models (Pricing Style) */}
            <section className="container px-4 mx-auto max-w-6xl mb-40">
                <div className="grid md:grid-cols-2 gap-8 items-stretch">

                    {/* Founders Column */}
                    <div className="p-10 rounded-3xl bg-secondary/30 border border-foreground/5 flex flex-col justify-between hover:border-foreground/10 transition-colors">
                        <div>
                            <h2 className="text-3xl font-serif font-bold mb-4">Strategic Partner</h2>
                            <p className="text-foreground/70 mb-8 text-lg">
                                For Founders & Startups needing a dedicated Operations/BizDev Lead.
                            </p>
                            <div className="space-y-6">
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm"><Users className="w-5 h-5 text-foreground" /></div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Long-Term Growth</h4>
                                        <p className="text-sm text-foreground/60">I join the trenches with you.</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center shrink-0 shadow-sm"><Target className="w-5 h-5 text-foreground" /></div>
                                    <div>
                                        <h4 className="font-bold text-foreground">Project Execution</h4>
                                        <p className="text-sm text-foreground/60">Focused sprint to launch or fix.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <Link
                            href="/#contact"
                            className="mt-12 inline-flex items-center justify-center gap-2 py-4 px-6 rounded-xl bg-background border border-foreground/10 font-bold hover:bg-foreground hover:text-background transition-all"
                        >
                            Contact for Strategy <ChevronRight className="w-4 h-4" />
                        </Link>
                    </div>

                    {/* Recruiters Column (Highlighted) */}
                    <div className="p-10 rounded-3xl bg-foreground text-background shadow-2xl shadow-foreground/20 transform md:-translate-y-4 md:scale-105 relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-primary/20 w-64 h-64 rounded-full blur-[100px]" />

                        <div className="relative z-10">
                            <div className="inline-block px-3 py-1 rounded-full bg-background/20 text-xs font-bold uppercase tracking-wider mb-6 backdrop-blur-md">
                                Open for Hire
                            </div>
                            <h3 className="text-3xl font-serif font-bold mb-4">Recruiters & HR</h3>
                            <p className="text-background/80 mb-8 text-lg">
                                Ready to step into roles that require <span className="text-primary font-bold">Execution</span> authority.
                            </p>

                            <ul className="space-y-4 mb-10">
                                {[
                                    "Business Development Manager",
                                    "Operations Strategist",
                                    "Technical Product Owner",
                                    "Workflow Optimization Specialist"
                                ].map((role, i) => (
                                    <li key={i} className="flex items-center gap-3 font-bold text-lg">
                                        <CheckCircle2 className="w-5 h-5 text-primary" /> {role}
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href="/resume"
                                className="inline-block w-full py-4 text-center rounded-xl bg-primary text-white font-bold hover:bg-primary/90 transition-colors shadow-lg"
                            >
                                View Full Resume
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
