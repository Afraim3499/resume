"use client";

import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { ContactForm } from "./ContactForm";

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-gradient-to-b from-background to-secondary/20">
            <div className="container px-4 mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to <span className="text-gradient">Collaborate?</span>
                    </h2>
                    <p className="text-xl text-foreground/70 mb-8 max-w-2xl mx-auto">
                        Whether it's optimizing your marketing strategy, managing your next big event, or automating with AI—let's make it happen.
                    </p>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 mb-12">
                        <a href="mailto:afraim.afraim99@gmail.com" className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors">
                            <div className="p-3 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10">
                                <Mail className="w-6 h-6" />
                            </div>
                            afraim.afraim99@gmail.com
                        </a>

                        <a href="tel:+8801751299259" className="flex items-center gap-3 text-lg font-medium text-foreground hover:text-primary transition-colors">
                            <div className="p-3 rounded-full bg-foreground/5 dark:bg-white/5 border border-foreground/10 dark:border-white/10">
                                <Phone className="w-6 h-6" />
                            </div>
                            +880 1751-299259
                        </a>
                    </div>
                </motion.div>

                <ContactForm />
            </div>
        </section>
    );
}
