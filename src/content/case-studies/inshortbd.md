---
slug: "inshortbd-case-study"
projectSlug: "inshortbd"
title: "Scaling News for 170 Million Bengali Speakers"
timeline: "2026 - Present"
technologies: ["Next.js", "AWS S3", "Playwright", "GitHub Actions", "Tiptap CMS"]
problem: "InshortBD aimed to fundamentally disrupt digital news delivery for 170M+ Bengali speakers. The platform had to gracefullly withstand violent, localized traffic explosions synonymous with breaking political news without succumbing to gateway timeouts, all while maintaining an utterly frictionless, rich-text experience for non-technical journalists."
solution: "Abandoned legacy monolithic architectures for a Cloud-Native Media Pipeline intrinsically married to a Zero-Production-Escape CI/CD Culture. Built a headless Tiptap CMS with custom slash commands. Bypassed the server nodes entirely for media by engineering cryptographic AWS S3 presigned URL streams directly from the browser. Automated the QA with Playwright to instantly simulate journalist workflows on Vercel preview environments."
challenges:
  - "Building a resilient infrastructure capable of withstanding massive, sporadic breaking-news traffic."
  - "Ensuring zero-downtime CI/CD deployments without breaking complex WYSIWYG editor workflows."
  - "Handling multi-megabyte editorial assets without crippling application server I/O throughput."
results:
  metrics:
    - label: "CI/CD Regressions"
      value: "0%"
    - label: "Time-to-Publish"
      value: "-40%"
    - label: "Audience Target"
      value: "170M+"
  impact: "By aggressively anticipating the intrinsic bottlenecks of digital journalism, we built an infrastructure that allows writers to focus exclusively on the story, entirely abstracted away from the violence of massive compute scale. Engineers deploy with total psychological safety."
  improvements:
    - "Decoupled Media Pipeline directly to AWS S3 & CloudFront"
    - "Automated GitHub Actions + Playwright E2E pipeline"
    - "Optimistic Tiptap publishing UX"
lessonsLearned:
  - "Client-side S3 streaming natively insulates database latency."
  - "Simulating human persona operations (Playwright) yields infinitely higher safety than basic unit tests."
---
