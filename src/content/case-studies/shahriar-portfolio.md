---
slug: "shahriar-portfolio-case-study"
projectSlug: "shahriar-kabir"
title: "Bespoke Portfolio Architecture: Performance and Polish"
timeline: "2026"
technologies: ["Next.js 16", "Framer Motion", "MDX", "Tailwind CSS v4", "@vercel/og"]
problem: "A high-level Operations Executive required a digital presence transcending a basic static CV. The portfolio needed profound aesthetic polish (animations, complex layouts) mixed with unapologetic technical perfection (100/100 Lighthouse) to act as an industry thought-leadership engine."
solution: "Orchestrated a deterministic motion architecture utilizing Framer Motion entirely synchronized to the window scroll loop to eliminate Cumulative Layout Shifts (CLS). Built a customized Markdown AST Compilation Pipeline (Unified/Remark) capable of ingesting case studies dynamically and generating beautiful Open Graph `@vercel/og` telemetry on the fly."
challenges:
  - "Executing complex, hardware-accelerated animations natively without layout jumping or dropping frames."
  - "Balancing a heavily visual aesthetic (large LCP images) with absolute 100% accessibility/speed scores."
  - "Building an editorial markdown ingestion layer without relying on third-party CMS bloat."
results:
  metrics:
    - label: "Performance"
      value: "100/100"
    - label: "First Paint"
      value: "<0.8s"
    - label: "UX Render"
      value: "Zero CLS"
  impact: "The deployed architecture established a profound authoritative presence, fundamentally demonstrating the thesis: High design and deep performance are not mutually exclusive when engineered simultaneously. The markdown CMS allowed the client to scale thought-leadership immediately."
  improvements:
    - "Synchronous Scroll-Linked Framer animations."
    - "MDX AST processing with Dynamic Server OG Image Generation."
    - "Priority asset execution overriding main-thread compilation."
lessonsLearned:
  - "Pre-allocating coordinate geometry eliminates CLS completely."
  - "Bespoke compilation pipelines provide infinite CMS flexibility."
---
