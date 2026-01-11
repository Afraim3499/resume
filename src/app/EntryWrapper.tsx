"use client";

export function EntryWrapper({ children }: { children: React.ReactNode }) {
  // Entry gate removed for SEO - crawlers need to see content immediately
  return <>{children}</>;
}
