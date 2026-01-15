"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function Analytics() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Google Analytics 4 integration
    // Replace with your actual GA4 measurement ID
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

    if (typeof window !== "undefined" && GA_MEASUREMENT_ID) {
      // Load gtag script
      const script1 = document.createElement("script");
      script1.async = true;
      script1.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
      document.head.appendChild(script1);

      // Initialize gtag
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer.push(args);
      }
      gtag("js", new Date());
      gtag("config", GA_MEASUREMENT_ID, {
        page_path: pathname + searchParams.toString(),
      });

      // Track page views on route change
      const url = pathname + searchParams.toString();
      gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  // Performance monitoring
  useEffect(() => {
    /* Performance logging disabled for cleaner console
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined" && "PerformanceObserver" in window) {
      // Track Core Web Vitals
      try {
        // Largest Contentful Paint (LCP)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1] as any;
          if (lastEntry) {
            // Send to analytics
            console.log("LCP:", lastEntry.renderTime || lastEntry.loadTime);
          }
        }).observe({ entryTypes: ["largest-contentful-paint"] });

        // First Input Delay (FID)
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            // Send to analytics
            console.log("FID:", entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ["first-input"] });

        // Cumulative Layout Shift (CLS)
        let clsValue = 0;
        new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          entries.forEach((entry: any) => {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          });
          // Send to analytics
          console.log("CLS:", clsValue);
        }).observe({ entryTypes: ["layout-shift"] });
      } catch (e) {
        // Performance Observer not supported
      }
    }
    */
  }, []);

  return null;
}

// Extend Window interface for gtag
declare global {
  interface Window {
    dataLayer: any[];
  }
}

