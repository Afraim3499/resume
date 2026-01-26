"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { useRouter } from "next/navigation";

export function NavbarLight() {
    const router = useRouter();

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/30"
        >
            <div className="container px-4 mx-auto max-w-7xl">
                <div className="flex items-center justify-between h-14">
                    {/* Left: Back + Home */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => router.back()}
                            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="Go back"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                        <Link
                            href="/"
                            className="p-2 rounded-lg hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                            aria-label="Go home"
                        >
                            <Home className="w-5 h-5" />
                        </Link>
                    </div>

                    {/* Center: Logo */}
                    <Link
                        href="/"
                        className="text-lg font-serif font-bold text-foreground hover:text-primary transition-colors"
                    >
                        Rizwanul Islam
                    </Link>

                    {/* Right: Theme Toggle */}
                    <div className="flex items-center">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </motion.nav>
    );
}
