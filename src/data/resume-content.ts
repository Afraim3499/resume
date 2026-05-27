export type VerificationStatus = "verified" | "user-verified" | "needs-review" | "avoid-unless-proven";

type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
    ? DeepPartial<T[P]>
    : T[P];
};

export interface ResumeContent {
  hero: {
    name: string;
    headline: string;
    subheadline: string;
    ctas: { label: string; href: string; primary?: boolean }[];
  };
  proofChips: {
    label: string;
    verificationStatus: VerificationStatus;
  }[];
  roleFitSummary: string;
  bestFitRoles: {
    title: string;
    bestFitFor: string[];
    strengths: string[];
    proof: string[];
  }[];
  brandExecutiveReadiness: {
    title: string;
    items: {
      label: string;
      content: string;
    }[];
  };
  proofOfExecution: {
    title: string;
    shortDescription: string;
    expandedWording?: string;
    verificationStatus: VerificationStatus;
  }[];
  experience: {
    company: string;
    role: string;
    period: string;
    location: string;
    focus: string[];
    verificationStatus: VerificationStatus;
  }[];
  projects: {
    name: string;
    tagline: string;
    description: string;
    verificationStatus: VerificationStatus;
    link?: string;
  }[];
  technicalEdge: {
    title: string;
    content: string;
    exposure: string[];
    stack: string[];
  };
  skillsMatrix: {
    category: string;
    skills: string[];
  }[];
  targetedBlocks: Record<string, DeepPartial<ResumeContent>>;
}

export const resumeContent: ResumeContent = {
  hero: {
    name: "Rizwanul Islam Afraim",
    headline: "Marketing Operations & Digital Brand Executive",
    subheadline: "BBA in Marketing with hands-on experience in market research, sales operations, campaign support, event execution, digital platforms, SEO, analytics, and full-stack product understanding.",
    ctas: [
      { label: "Download CV", href: "#download", primary: true },
      { label: "View Case Studies", href: "/case-studies" },
      { label: "Contact Me", href: "/#contact" }
    ]
  },
  proofChips: [
    { label: "BBA in Marketing", verificationStatus: "verified" },
    { label: "1M+ Data Points Processed", verificationStatus: "verified" },
    { label: "200+ People Coordinated", verificationStatus: "user-verified" },
    { label: "12+ Events Organized", verificationStatus: "user-verified" },
    { label: "2x Employee of the Month", verificationStatus: "verified" },
    { label: "Full-stack Digital Platforms Built", verificationStatus: "verified" }
  ],
  roleFitSummary: "I am a marketing and operations professional with a BBA in Marketing and practical experience across market research, sales operations, data quality, social media execution, event coordination, and digital product development. My strength is connecting brand, customer insight, campaign execution, and data-backed reporting. I can support brand teams in campaign planning, market monitoring, ATL/BTL and digital execution, agency/vendor coordination, POSM tracking, product launch support, and performance reporting. Alongside marketing, I also have a strong working foundation in modern web development through Next.js, React, Supabase/PostgreSQL, CMS systems, SEO, analytics, and full-stack product projects. This helps me understand how brand communication performs across digital touchpoints, landing pages, content systems, and customer journeys.",
  bestFitRoles: [
    {
      title: "Brand & Marketing Roles",
      bestFitFor: ["Brand Executive", "Marketing Executive", "Digital Marketing Executive", "Campaign Executive"],
      strengths: ["Market research", "Consumer behavior", "Competitor tracking", "Social media", "Event execution", "Reporting", "Brand consistency", "Digital campaign understanding"],
      proof: ["PrimeSync competitor analysis", "The Serial Griller social media", "NSUSS events", "Gaari/The Trail digital platforms"]
    },
    {
      title: "Operations & Sales Support Roles",
      bestFitFor: ["Sales Operations", "Business Development", "Operations Associate", "Market Research Executive"],
      strengths: ["Lead generation", "Company research", "Workflow tracking", "Reporting", "CRM logic", "Coordination", "Process improvement"],
      proof: ["PrimeSync", "Quantanite", "CRM/platform projects"]
    },
    {
      title: "Digital Product & Growth Roles",
      bestFitFor: ["Product Associate", "Growth Associate", "Founder’s Office", "Digital Transformation", "Technical Marketing"],
      strengths: ["Next.js/React understanding", "Databases", "CMS", "SEO", "Analytics", "Automation", "Product thinking"],
      proof: ["Gaari", "The Trail", "Yagacalls", "InshortBD", "Arrivals Cave"]
    }
  ],
  brandExecutiveReadiness: {
    title: "Brand Executive Readiness",
    items: [
      {
        label: "Brand & Campaign Support",
        content: "Assisted with market research, competitor tracking, content planning, social media activity, and customer-facing communication across professional and founder-led projects."
      },
      {
        label: "Market Research & Reporting",
        content: "Experienced in company research, industry analysis, lead generation, weekly/monthly performance tracking, and structured reporting from PrimeSync Solutions."
      },
      {
        label: "ATL/BTL/Event Execution Understanding",
        content: "Coordinated teams, artists, vendors, logistics, event flow, and stakeholder communication across major NSU cultural events, including Boishakh, Boshonto, NSUSS Unplugged 2024, and Annual Cultural Evening of NSU."
      },
      {
        label: "Digital Marketing & Web Understanding",
        content: "Understands websites, landing pages, CMS, SEO, analytics, digital funnels, and campaign-performance logic through projects such as Gaari, The Trail, Yagacalls, and InshortBD-style content systems."
      },
      {
        label: "POSM / Vendor / Field Readiness",
        content: "Comfortable supporting physical marketing materials, vendor coordination, field visits, market observation, distribution tracking, and execution follow-up."
      }
    ]
  },
  proofOfExecution: [
    {
      title: "1M+ Data Points Processed",
      shortDescription: "Data discipline, accuracy, backend operations, and large-scale structured information handling.",
      verificationStatus: "verified"
    },
    {
      title: "200+ People Coordinated",
      shortDescription: "Team coordination, artist/logistics support, event flow, and stakeholder communication across major NSU cultural events.",
      expandedWording: "Coordinated across major NSU events including Boishakh, Boshonto, NSUSS Unplugged 2024, and the Annual Cultural Evening of NSU. These included high-crowd university events such as NSU Boishakh and Boshonto, which reached 25,000+ audience scale and are among the highest-attended private university cultural events in Bangladesh.",
      verificationStatus: "user-verified"
    },
    {
      title: "12+ Events Organized",
      shortDescription: "Event planning, BTL-style execution exposure, team coordination, and audience-facing program support.",
      verificationStatus: "user-verified"
    },
    {
      title: "2x Employee of the Month",
      shortDescription: "Recognized for competitor analysis, industry lead organization, and sales operations support.",
      verificationStatus: "verified"
    },
    {
      title: "Full-Stack Digital Platforms Built",
      shortDescription: "Digital systems, CMS workflows, SEO architecture, analytics, and customer journey logic across founder-led projects.",
      verificationStatus: "verified"
    },
    {
      title: "BBA in Marketing",
      shortDescription: "Academic foundation in marketing, consumer behavior, service marketing, and business strategy.",
      verificationStatus: "verified"
    }
  ],
  experience: [
    {
      company: "PrimeSync Solutions",
      role: "Operations Associate",
      period: "May 2024 - Present",
      location: "Dhaka, Bangladesh",
      focus: ["Lead generation", "Company research", "Industry analysis", "Competitor tracking", "Meeting coordination", "Weekly/monthly performance reporting", "Sales operations support", "AI product/customer-agent business context"],
      verificationStatus: "verified"
    },
    {
      company: "Quantanite",
      role: "Associate",
      period: "Feb 2022 - Apr 2024",
      location: "Remote",
      focus: ["Data operations", "Backend management", "Large-scale data entry", "Quality control", "Error correction", "Process optimization"],
      verificationStatus: "verified"
    },
    {
      company: "The Serial Griller",
      role: "Organic Social Media Marketer",
      period: "Jul 2018 - Sep 2018",
      location: "Chattogram",
      focus: ["Organic social media", "Food content posting", "Reviews", "Competitor tracking", "Social group activity", "Local customer understanding"],
      verificationStatus: "verified"
    },
    {
      company: "NSU Shangskritik Shangathan / NSUSS",
      role: "Vice President of Programs",
      period: "2023 - 2024",
      location: "Dhaka, Bangladesh",
      focus: ["Event operations", "Team coordination", "Volunteer coordination", "Vendor/stakeholder communication", "Artist logistics", "Audience-facing program flow"],
      verificationStatus: "user-verified"
    }
  ],
  projects: [
    {
      name: "Gaari",
      tagline: "Premium Mobility Ecosystem",
      description: "Built and managed a digital mobility platform involving customer journey planning, booking flow, service presentation, payment logic, SEO, and AI-assisted customer support. This project strengthened my understanding of consumer-facing digital platforms, service branding, campaign landing pages, and operational scalability.",
      verificationStatus: "verified",
      link: "https://gaari.life"
    },
    {
      name: "The Trail / InshortBD-style content systems",
      tagline: "Intelligent News Platforms",
      description: "Built a news/content platform with CMS, SEO, analytics, editorial workflow, and performance-focused publishing. This project improved my understanding of content strategy, audience behavior, digital publishing, and brand consistency across high-volume communication.",
      verificationStatus: "verified",
      link: "https://thetrail.xyz"
    },
    {
      name: "Yagacalls",
      tagline: "Expert Signal Platform",
      description: "Architected expert signal platforms using a custom '4-Layer framework' (SXO, AIO, GEO, AEO) for investor community growth. Implemented content structure and community platform logic.",
      verificationStatus: "verified",
      link: "https://yagacalls.com"
    },
    {
      name: "Arrivals Cave",
      tagline: "E-commerce & Conversion Architecture",
      description: "Architected a headless commerce engine with Meta CAPI, Google Merchant Feed, and CRO-optimized UX. Focused on e-commerce conversion tracking, performance-focused campaign support, and ad attribution.",
      verificationStatus: "verified",
      link: "https://arrivalscave.com"
    }
  ],
  technicalEdge: {
    title: "Technical Edge: AI-Assisted Full-Stack Product Building",
    content: "I use AI-assisted development workflows to rapidly prototype, build, and improve digital systems. My foundation includes Next.js, React, TypeScript, Supabase/PostgreSQL, database structure, CMS logic, SEO architecture, analytics, and full-stack product workflows. I am not positioning myself as a traditional senior software engineer; my strength is understanding how business, marketing, user experience, and technical systems connect. This gives me an advantage in brand and marketing roles because I can understand landing pages, campaign funnels, tracking issues, customer journeys, content systems, automation, and digital performance more deeply than a non-technical marketing candidate.",
    exposure: [
      "Gaari — booking platform, customer journey, AI support logic, payment flow, SEO",
      "The Trail / InshortBD — CMS, editorial workflow, content publishing, analytics, SEO",
      "Yagacalls — SEO/AEO/GEO framework, content structure, community platform logic",
      "Arrivals Cave — e-commerce conversion tracking, CRO, performance-focused campaign support"
    ],
    stack: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "CMS", "SEO", "Analytics"]
  },
  skillsMatrix: [
    {
      category: "Marketing & Brand",
      skills: ["Brand support", "Campaign coordination", "Market research", "Competitor analysis", "Consumer behavior", "ATL/BTL support", "Digital campaign support", "Product launch support", "Social media execution", "Brand consistency"]
    },
    {
      category: "Operations & Reporting",
      skills: ["Lead generation", "Sales operations", "Performance tracking", "Data analysis", "Weekly/monthly reporting", "Vendor coordination", "Stakeholder coordination", "Process improvement"]
    },
    {
      category: "Digital & Technical",
      skills: ["Next.js", "React", "TypeScript", "Supabase", "PostgreSQL", "CMS systems", "SEO", "Analytics", "Landing page structure", "Full-stack product workflows", "AI-assisted development"]
    },
    {
      category: "Execution & Leadership",
      skills: ["Event operations", "Team coordination", "Artist/vendor management", "Logistics", "Communication", "Planning", "Field execution"]
    }
  ],
  targetedBlocks: {
    consumerBrandExecutive: {
      hero: {
        headline: "Digital Brand Executive | Marketing Operations Candidate",
        subheadline: "Focused on supporting brand execution, campaign coordination, market research, reporting, and digital campaign understanding, backed by a BBA in Marketing."
      }
    },
    waltonBrandExecutive: {
      hero: {
        headline: "Brand Executive Candidate | Marketing Operations Specialist",
        subheadline: "Focused on supporting brand execution, campaign coordination, market research, reporting, and digital campaign understanding for large-scale consumer electronics and appliances."
      },
      roleFitSummary: "For consumer brand roles like Walton, I bring a combination of marketing education, market research, event/field coordination, reporting discipline, and digital product understanding. I can support campaign coordination, market visits, competitor tracking, POSM follow-up, agency/vendor communication, product launch support, digital campaign understanding, and performance reporting."
    }
  }
};
