import { LazyMotion, domAnimation } from "framer-motion";

export function EntryWrapper({ children }: { children: React.ReactNode }) {
  // Entry gate removed for SEO - crawlers need to see content immediately
  // Added LazyMotion for Tree-Shaking optimization
  return (
    <LazyMotion features={domAnimation}>
      {children}
    </LazyMotion>
  );
}
