"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-background min-h-screen text-foreground flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h2>
          <p className="text-gray-400 text-lg mb-8">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button size="lg" className="rounded-full px-8">
              <Home className="w-4 h-4 mr-2" />
              Go Home
            </Button>
          </Link>
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link href="/#about" className="text-gray-400 hover:text-primary transition-colors">
            About
          </Link>
          <Link href="/#projects" className="text-gray-400 hover:text-primary transition-colors">
            Projects
          </Link>
          <Link href="/#experience" className="text-gray-400 hover:text-primary transition-colors">
            Experience
          </Link>
          <Link href="/#contact" className="text-gray-400 hover:text-primary transition-colors">
            Contact
          </Link>
        </div>
      </div>
    </main>
  );
}

