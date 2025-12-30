import Link from "next/link";
import { SocialLinks } from "./SocialLinks";

export function Footer() {
    return (
        <footer className="py-12 border-t border-foreground/10 dark:border-white/5 bg-background">
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link 
                                    href="/blog" 
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Blog & Articles
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
                                    href="/#projects" 
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Projects
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
                                    href="/blog" 
                                    className="text-sm text-foreground/60 hover:text-primary transition-colors"
                                >
                                    Technical Articles
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

                    {/* Social & Copyright */}
                    <div>
                        <h3 className="text-sm font-semibold text-foreground mb-4">Connect</h3>
                        <div className="mb-4">
                            <SocialLinks variant="minimal" size="sm" />
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
