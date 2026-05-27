"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

/**
 * FooterWrapper — renders Footer on all pages EXCEPT the homepage ("/"),
 * because the homepage ends with FinalCTASection as its cinematic footer.
 */
export function FooterWrapper() {
  const pathname = usePathname();

  if (pathname === "/") return null;

  return <Footer />;
}
