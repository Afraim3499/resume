"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { AlertCircle, RefreshCw } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground">
        <main className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 border border-red-500/30 mb-6">
                <AlertCircle className="w-10 h-10 text-red-400" />
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Application Error</h1>
              <p className="text-gray-400 text-lg mb-2">
                A critical error occurred. Please refresh the page.
              </p>
              {error.digest && (
                <p className="text-gray-500 text-sm">Error ID: {error.digest}</p>
              )}
            </div>

            <Button
              size="lg"
              className="rounded-full px-8"
              onClick={reset}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Reload Application
            </Button>
          </div>
        </main>
      </body>
    </html>
  );
}

