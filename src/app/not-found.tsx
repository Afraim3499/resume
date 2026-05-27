"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="bg-[#F7F4EC] min-h-screen text-[#171717] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-9xl font-serif font-bold text-[#0F5132] mb-4">404</h1>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Page Not Found</h2>
          <p className="text-[#5F655F] text-lg mb-8">
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#F1EFE7] text-[#5F655F] hover:bg-[#EAF7EF] hover:text-[#0F5132] border border-[#0F5132]/14 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <Link href="/about" className="text-[#5F655F] hover:text-[#0F5132] transition-colors">
            About
          </Link>
          <Link href="/projects" className="text-[#5F655F] hover:text-[#0F5132] transition-colors">
            Projects
          </Link>
          <Link href="/resume" className="text-[#5F655F] hover:text-[#0F5132] transition-colors">
            Resume
          </Link>
          <Link href="/research" className="text-[#5F655F] hover:text-[#0F5132] transition-colors">
            Research
          </Link>
        </div>
      </div>
    </main>
  );
}

