import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, BookOpen, GitBranch } from "lucide-react";
import type { Metadata } from "next";
import { getTerm, getAllTerms } from "@/data/knowledge-graph";
import { MarkdownContent } from "@/components/MarkdownContent";
import { blogPosts } from "@/data/blog";

export async function generateStaticParams() {
    const terms = getAllTerms();
    return terms.map((term) => ({
        slug: term.id,
    }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const term = getTerm(slug);

    if (!term) {
        return {
            title: "Term Not Found",
        };
    }

    return {
        title: `${term.term} | The Orchestrator's Lexicon`,
        description: term.definition,
        openGraph: {
            type: "article",
            title: term.term,
            description: term.definition,
        },
        alternates: {
            canonical: `/wiki/${term.id}`,
        },
    };
}

export default async function WikiPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const term = getTerm(slug);

    if (!term) {
        notFound();
    }

    // Bidirectional Intelligence: Find blog posts that might mention this term or be related
    // For now, checking if term ID is in blog tags or category (simple matching)
    // In a real "God Mode", we would fuzzy search the content.
    const relatedPosts = blogPosts.filter(
        (post) =>
            post.tags.map(t => t.toLowerCase().replace(/\s+/g, '-')).includes(term.id) ||
            post.category.toLowerCase().replace(/\s+/g, '-') === term.id ||
            term.relatedTo.some(rel => post.tags.map(t => t.toLowerCase()).includes(rel.replace('-', ' ')))
    );

    const termSchema = {
        "@context": "https://schema.org",
        "@type": "DefinedTerm",
        "@id": `https://portfolio-rizwanul.vercel.app/wiki/${term.id}`,
        name: term.term,
        description: term.definition,
        inDefinedTermSet: {
            "@type": "DefinedTermSet",
            "@id": "https://portfolio-rizwanul.vercel.app/wiki",
            name: "The Orchestrator's Knowledge Graph",
        },
    };

    return (
        <main className="bg-background min-h-screen text-foreground pt-24 pb-12">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(termSchema) }}
            />

            <article className="container px-4 mx-auto max-w-4xl">
                {/* Navigation */}
                <Link
                    href="/wiki"
                    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Knowledge Graph
                </Link>

                {/* Header */}
                <header className="mb-12 border-b border-border/40 pb-8">
                    <div className="flex items-center gap-2 text-primary mb-4">
                        <BookOpen className="w-5 h-5" />
                        <span className="text-sm font-mono uppercase tracking-wider">{term.category} Node</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6 font-serif">{term.term}</h1>
                    <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light font-serif border-l-4 border-primary/50 pl-6 py-2 bg-secondary/10">
                        {term.definition}
                    </p>
                </header>

                {/* Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="md:col-span-3">
                        <MarkdownContent content={term.content} />
                    </div>

                    {/* Sidebar / Knowledge Graph Connections */}
                    <aside className="md:col-span-1 space-y-8">
                        {term.relatedTo && term.relatedTo.length > 0 && (
                            <div className="p-6 rounded-xl bg-secondary/20 border border-primary/10">
                                <h3 className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                    <GitBranch className="w-4 h-4" />
                                    Connected Nodes
                                </h3>
                                <div className="flex flex-col gap-2">
                                    {term.relatedTo.map(relId => {
                                        const relTerm = getAllTerms().find(t => t.id === relId);
                                        if (!relTerm) return null;
                                        return (
                                            <Link key={relId} href={`/wiki/${relId}`} className="text-primary hover:underline hover:text-primary/80 transition-colors">
                                                {relTerm.term}
                                            </Link>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {relatedPosts.length > 0 && (
                            <div className="p-6 rounded-xl bg-secondary/20 border border-primary/10">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-4">
                                    Mentioned In
                                </h3>
                                <div className="flex flex-col gap-4">
                                    {relatedPosts.map(post => (
                                        <Link key={post.slug} href={`/blog/${post.slug}`} className="group">
                                            <h4 className="text-sm font-medium group-hover:text-primary transition-colors leading-tight mb-1">
                                                {post.title}
                                            </h4>
                                            <span className="text-xs text-muted-foreground">Read Post &rarr;</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </aside>
                </div>
            </article>
        </main>
    );
}
