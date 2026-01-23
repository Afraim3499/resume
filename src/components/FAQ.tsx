"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FAQItem } from "@/lib/faq-loader";

interface FAQProps {
    items: FAQItem[];
}

export function FAQ({ items }: FAQProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    // Group FAQs by category for better UX
    const categories = Array.from(new Set(items.map((item) => item.category)));

    return (
        <section className="py-24 bg-background relative overflow-hidden" id="faq">


            <div className="container px-4 mx-auto max-w-4xl">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                        Common Queries
                    </h2>
                    <p className="text-muted-foreground text-lg">
                        Clarifying the &quot;Afraim&quot; Identity & Methodology
                    </p>
                </div>

                <div className="space-y-12">
                    {categories.map((category) => (
                        <div key={category} className="space-y-6">
                            <h3 className="text-xl font-medium text-primary sticky top-20 bg-background/95 backdrop-blur py-2 z-10 border-b border-border/40">
                                {category}
                            </h3>

                            <div className="space-y-4">
                                {items
                                    .filter((item) => item.category === category)
                                    .map((item) => {
                                        // Find the original index in the full array for stable keys if needed, 
                                        // but here we can just use the item.question as key
                                        const isOpen = openIndex === items.indexOf(item);
                                        const handleToggle = () => {
                                            setOpenIndex(isOpen ? null : items.indexOf(item));
                                        };

                                        return (
                                            <motion.div
                                                initial={false}
                                                key={item.question}
                                                className={cn(
                                                    "border border-border/50 rounded-lg overflow-hidden bg-secondary/5",
                                                    isOpen ? "bg-secondary/10 border-primary/20" : "hover:border-primary/20"
                                                )}
                                            >
                                                <button
                                                    onClick={handleToggle}
                                                    className="flex items-center justify-between w-full p-6 text-left"
                                                    aria-expanded={isOpen}
                                                >
                                                    <span className={cn(
                                                        "text-lg font-medium pr-8 transition-colors",
                                                        isOpen ? "text-primary" : "text-foreground"
                                                    )}>
                                                        {item.question}
                                                    </span>
                                                    <span
                                                        className={cn(
                                                            "flex-shrink-0 p-1 rounded-full border transition-all duration-300",
                                                            isOpen
                                                                ? "bg-primary text-primary-foreground border-primary rotate-180"
                                                                : "border-muted-foreground/30 text-muted-foreground hover:border-primary/50"
                                                        )}
                                                    >
                                                        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                                                    </span>
                                                </button>

                                                <AnimatePresence initial={false}>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial="collapsed"
                                                            animate="open"
                                                            exit="collapsed"
                                                            variants={{
                                                                open: { opacity: 1, height: "auto" },
                                                                collapsed: { opacity: 0, height: 0 },
                                                            }}
                                                            transition={{ duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] }}
                                                        >
                                                            <div className="px-6 pb-6 text-muted-foreground leading-relaxed">
                                                                {item.answer}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </motion.div>
                                        );
                                    })}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section >
    );
}
