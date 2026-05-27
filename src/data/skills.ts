export interface SkillProject {
  label: string;
  slug: string;
  type: "project" | "solution";
}

export interface Skill {
  name: string;
  level: "expert" | "advanced" | "intermediate";
  projects: SkillProject[];
  category: "gtm_operations" | "brand_execution" | "digital_platforms" | "systems_infrastructure";
  wikiId?: string;
}

export interface SkillsByCategory {
  gtm_operations: Skill[];
  brand_execution: Skill[];
  digital_platforms: Skill[];
  systems_infrastructure: Skill[];
}

export const skills: SkillsByCategory = {
  gtm_operations: [
    {
      name: "Timezone-Aware Lead Routing",
      level: "expert",
      category: "gtm_operations",
      projects: [
        { label: "Leads & Sales CRM", slug: "leads-sales-crm", type: "project" },
        { label: "CRM Solution", slug: "crm-sales-system", type: "solution" }
      ]
    },
    {
      name: "Meta Conversions API (CAPI)",
      level: "expert",
      category: "gtm_operations",
      projects: [
        { label: "Arrivals Cave", slug: "arrivals-cave", type: "project" },
        { label: "E-Commerce Solution", slug: "ecommerce-platform", type: "solution" }
      ]
    },
    {
      name: "Google Merchant XML Feeds",
      level: "expert",
      category: "gtm_operations",
      projects: [
        { label: "Arrivals Cave", slug: "arrivals-cave", type: "project" },
        { label: "E-Commerce Solution", slug: "ecommerce-platform", type: "solution" }
      ]
    },
    {
      name: "Voice Agents & CRM Integration",
      level: "advanced",
      category: "gtm_operations",
      projects: [
        { label: "Leads & Sales CRM", slug: "leads-sales-crm", type: "project" }
      ]
    }
  ],
  brand_execution: [
    {
      name: "Large-Scale Event Operations",
      level: "expert",
      category: "brand_execution",
      projects: [
        { label: "NSUSS Event Operations", slug: "leading-200-people-nsuss", type: "project" }
      ],
      wikiId: "system-orchestration"
    },
    {
      name: "Competitor & Market Research",
      level: "expert",
      category: "brand_execution",
      projects: [
        { label: "PrimeSync Competitor Audit", slug: "leads-sales-crm", type: "project" }
      ],
      wikiId: "venture-architecture"
    },
    {
      name: "Organic Brand Execution",
      level: "expert",
      category: "brand_execution",
      projects: [
        { label: "The Serial Griller Marketing", slug: "ecommerce-platform", type: "solution" }
      ]
    },
    {
      name: "Team & Vendor Coordination",
      level: "expert",
      category: "brand_execution",
      projects: [
        { label: "NSUSS Event Operations", slug: "leading-200-people-nsuss", type: "project" }
      ],
      wikiId: "founder-mode"
    }
  ],
  digital_platforms: [
    {
      name: "4-Layer SEO Framework",
      level: "expert",
      category: "digital_platforms",
      projects: [
        { label: "Yagacalls SEO", slug: "yagacalls", type: "project" },
        { label: "SEO & Lead Gen Solution", slug: "seo-lead-generation", type: "solution" }
      ]
    },
    {
      name: "Next.js Static Pre-Rendering",
      level: "expert",
      category: "digital_platforms",
      projects: [
        { label: "The Trailheadline", slug: "the-trail", type: "project" },
        { label: "InshortBD", slug: "inshortbd", type: "project" },
        { label: "Shahriar Kabir Portfolio", slug: "shahriar-kabir", type: "project" }
      ]
    },
    {
      name: "Multi-Stage Approval CMS",
      level: "expert",
      category: "digital_platforms",
      projects: [
        { label: "The Trailheadline", slug: "the-trail", type: "project" },
        { label: "InshortBD", slug: "inshortbd", type: "project" }
      ],
      wikiId: "system-orchestration"
    },
    {
      name: "OpenAI RAG Chatbots",
      level: "advanced",
      category: "digital_platforms",
      projects: [
        { label: "Gaariwala Bot", slug: "gaari", type: "project" },
        { label: "Booking Solution", slug: "booking-system", type: "solution" }
      ],
      wikiId: "agentic-systems"
    },
    {
      name: "AWS S3 Media Ingestion",
      level: "advanced",
      category: "digital_platforms",
      projects: [
        { label: "InshortBD Media", slug: "inshortbd", type: "project" },
        { label: "News & Media Solution", slug: "news-media-platform", type: "solution" }
      ]
    },
    {
      name: "Dynamic OG Image Generation",
      level: "advanced",
      category: "digital_platforms",
      projects: [
        { label: "Shahriar Kabir Portfolio", slug: "shahriar-kabir", type: "project" },
        { label: "Personal Brand Solution", slug: "personal-brand-website", type: "solution" }
      ]
    },
    {
      name: "Playwright E2E Testing",
      level: "advanced",
      category: "digital_platforms",
      projects: [
        { label: "InshortBD CI", slug: "inshortbd", type: "project" }
      ]
    }
  ],
  systems_infrastructure: [
    {
      name: "Database Schema Design",
      level: "expert",
      category: "systems_infrastructure",
      projects: [
        { label: "The Trailheadline", slug: "the-trail", type: "project" },
        { label: "Gaari", slug: "gaari", type: "project" },
        { label: "Arrivals Cave", slug: "arrivals-cave", type: "project" }
      ],
      wikiId: "venture-architecture"
    },
    {
      name: "Supabase RLS Security",
      level: "expert",
      category: "systems_infrastructure",
      projects: [
        { label: "Arrivals Cave", slug: "arrivals-cave", type: "project" },
        { label: "Leads & Sales CRM", slug: "leads-sales-crm", type: "project" }
      ]
    },
    {
      name: "API Architecture Design",
      level: "expert",
      category: "systems_infrastructure",
      projects: [
        { label: "Gaari API", slug: "gaari", type: "project" },
        { label: "The Trailheadline", slug: "the-trail", type: "project" }
      ]
    },
    {
      name: "Deterministic State Locking",
      level: "expert",
      category: "systems_infrastructure",
      projects: [
        { label: "Leads & Sales CRM", slug: "leads-sales-crm", type: "project" },
        { label: "CRM Solution", slug: "crm-sales-system", type: "solution" }
      ],
      wikiId: "system-orchestration"
    },
    {
      name: "Redis Availability Caching",
      level: "expert",
      category: "systems_infrastructure",
      projects: [
        { label: "Gaari Cache", slug: "gaari", type: "project" },
        { label: "Booking Solution", slug: "booking-system", type: "solution" }
      ]
    }
  ]
};

export const allSkills: Skill[] = Object.values(skills).flat();

export const skillCategories = Object.keys(skills) as Array<keyof SkillsByCategory>;
