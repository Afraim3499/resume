import Link from "next/link";
import { Metadata } from "next";
import { getAllTerms } from "@/data/knowledge-graph";
import { ArrowRight, Network } from "lucide-react";

export const metadata: Metadata = {
    title: "The Knowledge Graph | Rizwanul Islam (Afraim)",
    description: "A comprehensive digital lexicon of Venture Architecture, Founder Mode, and Agentic Systems.",
    alternates: {
        canonical: "/wiki",
    },
};

export default function WikiIndex() {
    const terms = getAllTerms();
    const categories = Array.from(new Set(terms.map((t) => t.category)));

    return (
        <main className="bg-background min-h-screen text-foreground pt-24 pb-12">
            <div className="container px-4 mx-auto max-w-5xl">
                <header className="mb-16 text-center">
                    <span className="inline-block p-3 rounded-2xl bg-primary/10 text-primary mb-6">
                        <Network className="w-8 h-8" />
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-6 font-serif">The Knowledge Graph</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        The Orchestrator's Lexicon. A living network of concepts that define the methodology of modern Venture Architecture.
                    </p>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {terms.map((term) => (
                        <Link
                            key={term.id}
                            href={`/wiki/${term.id}`}
                            className="group flex flex-col p-6 rounded-xl bg-secondary/20 border border-white/5 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground group-hover:text-primary transition-colors">
                                    {term.category}
                                </span>
                                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                            </div>

                            <h2 className="text-2xl font-bold mb-3 font-serif group-hover:text-primary transition-colors">
                                {term.term}
                            </h2>

                            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                                {term.definition}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </main>
    );
}
