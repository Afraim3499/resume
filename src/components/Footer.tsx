import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
    return (
        <footer className="py-12 border-t border-foreground/10 dark:border-white/5 bg-background">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Solutions */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Solutions</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/solutions/ecommerce-platform"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    E-Commerce Platform
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions/news-media-platform"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    News & Media Hub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions/booking-system"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Booking & Fleet
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions/crm-sales-system"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Sales & CRM
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions/personal-brand-website"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Personal Brand
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/solutions/seo-lead-generation"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    SEO & Lead Gen
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Navigation</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/#hero"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#about"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    About
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Blog
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Solutions Hub
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#contact"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Content */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Content</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/manifesto"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Manifesto
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/research/agentic-ai-coordination-infrastructure"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Published Research
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/resume"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Interactive Resume
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/blog"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Technical Articles
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/wiki"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Knowledge Wiki
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/case-studies"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Project Case Studies
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#experience"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Experience
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/#skills"
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Skills
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Contact</h3>
                        <ul className="space-y-4">
                            <li className="flex flex-col">
                                <span className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Phone</span>
                                <a href="tel:+8801751299259" className="text-sm text-foreground/80 hover:text-primary transition-colors">
                                    +880 1751-299259
                                </a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-foreground/60 uppercase tracking-wider mb-1">WhatsApp</span>
                                <a
                                    href="https://calendar.app.google/GYA3R9Ct4Aq5Qu74A"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors border border-primary/20"
                                >
                                    Estimate Your Project Savings
                                </a>
                            </li>
                            <li className="flex flex-col">
                                <span className="text-xs text-foreground/60 uppercase tracking-wider mb-1">Address</span>
                                <span className="text-sm text-foreground/80">
                                    Bashundhara R/A, Dhaka<br />
                                    Bangladesh
                                </span>
                            </li>
                        </ul>
                    </div>

                    {/* Social & Copyright */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
                        <div className="mb-4">
                            <SocialLinks size="sm" />
                        </div>
                        <p className="text-sm text-foreground/60">
                            © {new Date().getFullYear()} Rizwanul Islam (Afraim). All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
