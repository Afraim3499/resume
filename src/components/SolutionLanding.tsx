import Link from "next/link";
import {
    ArrowRight,
    CheckCircle2,
    AlertTriangle,
    Zap,
    TrendingUp,
    Target,
    Clock,
    BookOpen,
    Layers,
} from "lucide-react";
import type { Solution } from "@/data/solutions";
import { getProjectBySlug } from "@/data/projects";
import { getBlogPostBySlug } from "@/lib/blog-loader";
import { FAQ } from "@/components/FAQ";
import { HollowGraphic3D } from "@/components/3D/HollowGraphic3D";

interface SolutionLandingProps {
    solution: Solution;
}

function getMetricIcon(label: string) {
    const key = label.toLowerCase();
    if (key.includes("growth") || key.includes("traffic") || key.includes("launch")) return TrendingUp;
    if (key.includes("time") || key.includes("latency") || key.includes("ui")) return Clock;
    if (key.includes("community") || key.includes("client") || key.includes("seo") || key.includes("content") || key.includes("audience")) return Target;
    return Zap;
}

export function SolutionLanding({ solution }: SolutionLandingProps) {
    const proofProjects = solution.proofProjects
        .map(pp => {
            const project = getProjectBySlug(pp.slug);
            return project ? { ...project, highlight: pp.highlight } : null;
        })
        .filter(Boolean);

    const relatedPosts = solution.relatedBlogSlugs
        .map(slug => getBlogPostBySlug(slug))
        .filter(Boolean);

    return (
        <main className="bg-background min-h-screen text-foreground">
            {/* ─── 1. Hero ─────────────────────────────────────────── */}
            <section className="pt-32 pb-20 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -z-10" />
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px] -z-10" />

                <div className="container px-4 mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
                        {/* Left Column: Text & CTAs */}
                        <div className="flex flex-col justify-center text-center lg:text-left">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
                                <Zap className="w-4 h-4" />
                                <span>{solution.heroTagline}</span>
                            </div>

                            <h1 className="hero-title text-4xl md:text-6xl lg:text-7xl font-serif font-bold mb-6 leading-[1.1] tracking-tight">
                                {solution.title.split(/(?<=\?) /)[0]}
                                {solution.title.includes("?") && <br className="hidden md:block"/>}
                                {solution.title.split(/(?<=\?) /).length > 1 && (
                                    <span className="text-gradient"> {solution.title.split(/(?<=\?) /)[1]}</span>
                                )}
                            </h1>

                            <p className="hero-subtitle text-xl text-foreground/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed mb-10">
                                {solution.subtitle}
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                                <Link
                                    href="/#contact"
                                    className="px-8 py-4 rounded-full bg-primary text-white font-bold hover:bg-primary/90 transition-all flex items-center gap-2 shadow-lg shadow-primary/20 hover:scale-105 transform duration-200"
                                >
                                    Let&apos;s Build This <ArrowRight className="w-4 h-4" />
                                </Link>
                                <Link
                                    href="#proof"
                                    className="px-8 py-4 rounded-full bg-secondary/50 text-foreground font-medium hover:bg-secondary transition-all border border-foreground/10"
                                >
                                    See the Proof
                                </Link>
                            </div>
                        </div>

                        {/* Right Column: 3D Hollow Graphic */}
                        <div className="relative mt-12 lg:mt-0 px-4 md:px-12 h-full">
                            <HollowGraphic3D 
                                iconName={solution.iconName}
                                topLeft={solution.floatingText.topLeft}
                                bottomRight={solution.floatingText.bottomRight}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 2. Problem ──────────────────────────────────────── */}
            <section className="py-20 bg-red-500/[0.02] border-y border-red-500/10">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="p-2 rounded-lg bg-red-500/10">
                            <AlertTriangle className="w-5 h-5 text-red-500" />
                        </div>
                        <h2 className="text-2xl md:text-3xl font-serif font-bold text-red-400">
                            {solution.problem.headline}
                        </h2>
                    </div>
                    <ul className="space-y-4">
                        {solution.problem.points.map((point, i) => (
                            <li key={i} className="flex items-start gap-4 text-lg text-foreground/80">
                                <span className="text-red-500 font-bold mt-0.5 shrink-0">✕</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* ─── 3. Solution (What You Get) ──────────────────────── */}
            <section className="py-24">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">What You Get</h2>
                        <p className="text-3xl md:text-4xl font-serif font-bold">
                            The Complete Package
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                        {solution.deliverables.map((item, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-3 p-4 rounded-xl bg-secondary/20 border border-foreground/5 hover:border-primary/30 transition-colors"
                            >
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                                <span className="text-foreground/90 font-medium">{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── 4. Metrics ──────────────────────────────────────── */}
            <section className="py-20 bg-foreground/[0.02] border-y border-foreground/5">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="grid md:grid-cols-3 gap-8">
                        {solution.metrics.map((metric, i) => {
                            const Icon = getMetricIcon(metric.label);
                            return (
                                <div key={i} className="text-center p-8 rounded-2xl bg-background border border-foreground/5">
                                    <Icon className="w-8 h-8 text-primary mx-auto mb-4" />
                                    <div className="text-4xl md:text-5xl font-bold text-gradient mb-2">{metric.value}</div>
                                    <div className="text-sm font-bold uppercase tracking-wider text-foreground/50 mb-2">{metric.label}</div>
                                    <p className="text-foreground/60 text-sm">{metric.description}</p>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── 5. Proof Projects ────────────────────────────────── */}
            <section id="proof" className="py-24">
                <div className="container px-4 mx-auto max-w-5xl">
                    <div className="text-center mb-16">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">Real Results</h2>
                        <p className="text-3xl md:text-4xl font-serif font-bold">
                            I&apos;ve Done This Before
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {proofProjects.map((project) => {
                            if (!project) return null;
                            return (
                                <Link
                                    key={project.slug}
                                    href={`/projects/${project.slug}`}
                                    className="group block p-8 rounded-2xl bg-secondary/20 border border-foreground/5 hover:border-primary/40 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5"
                                >
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-2xl font-bold group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>
                                        <ArrowRight className="w-5 h-5 text-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                    <p className="text-foreground/70 mb-4">{project.description}</p>
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 text-sm font-medium border border-emerald-500/20">
                                        <TrendingUp className="w-3.5 h-3.5" />
                                        {project.highlight}
                                    </div>
                                    {project.link && project.link !== "#" && (
                                        <div className="mt-4 text-xs text-foreground/40 font-medium uppercase tracking-wider">
                                            Live at {new URL(project.link).hostname}
                                        </div>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* ─── 6. Related Articles ──────────────────────────────── */}
            {relatedPosts.length > 0 && (
                <section className="py-20 bg-foreground/[0.02] border-y border-foreground/5">
                    <div className="container px-4 mx-auto max-w-5xl">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-foreground/40 mb-2">
                                <BookOpen className="w-4 h-4" />
                                Deep Dives
                            </div>
                            <p className="text-2xl md:text-3xl font-serif font-bold">
                                Read How I Think About This
                            </p>
                        </div>
                        <div className="grid md:grid-cols-3 gap-6">
                            {relatedPosts.slice(0, 3).map((post) => {
                                if (!post) return null;
                                return (
                                    <Link
                                        key={post.slug}
                                        href={`/blog/${post.slug}`}
                                        className="group p-6 rounded-xl bg-background border border-foreground/5 hover:border-primary/30 transition-all"
                                    >
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary/70 mb-2 block">
                                            {post.category}
                                        </span>
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                                            {post.title}
                                        </h3>
                                        <p className="text-foreground/60 text-sm line-clamp-2">{post.excerpt}</p>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}

            {/* ─── 7. Tech Stack ────────────────────────────────────── */}
            <section className="py-16">
                <div className="container px-4 mx-auto max-w-4xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="shrink-0 flex items-center gap-3 px-4 py-2 rounded-lg bg-secondary/30 border border-foreground/10">
                            <Layers className="w-5 h-5 text-primary" />
                            <span className="font-bold text-sm uppercase tracking-wider">Built With</span>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            {solution.techStack.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-4 py-2 rounded-full bg-foreground/5 text-foreground/70 text-sm font-medium border border-foreground/10 hover:border-primary/30 hover:text-primary transition-colors"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── 8. FAQ ──────────────────────────────────────────── */}
            <section className="py-20 bg-secondary/10">
                <div className="container px-4 mx-auto max-w-3xl">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl font-serif font-bold mb-2">Common Questions</h2>
                        <p className="text-foreground/60">Answering the important stuff.</p>
                    </div>
                    <FAQ items={solution.faqs} />
                </div>
            </section>

            {/* ─── 9. Final CTA ────────────────────────────────────── */}
            <section className="py-24">
                <div className="container px-4 mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                        Ready to <span className="text-gradient">Build This?</span>
                    </h2>
                    <p className="text-xl text-foreground/70 mb-10 max-w-xl mx-auto">
                        Stop evaluating. Start executing. Let&apos;s discuss your project and get a custom quote.
                    </p>
                    <Link
                        href="/#contact"
                        className="inline-flex items-center gap-2 px-10 py-5 rounded-full bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all shadow-xl shadow-primary/20 hover:scale-105 transform duration-200"
                    >
                        Get Your Custom Quote <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>
        </main>
    );
}
