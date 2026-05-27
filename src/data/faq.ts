export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const faqData: FAQItem[] = [
  {
    question: "What kind of problems do you solve best?",
    answer: "I excel at building sales qualification pipelines, database sync strategies, headless e-commerce architectures (specifically Meta CAPI and complex attribution), and custom content management systems (CMS) that bridge marketing needs with structural engineering.",
    category: "Capability"
  },
  {
    question: "Are you a strategist, operator, or builder?",
    answer: "I am all three. I diagnose the operational bottlenecks (strategy), design the workflow automation (operator), and write the robust production code (builder). By combining all three, I prevent the typical misalignment that occurs when these roles are separated.",
    category: "Role"
  },
  {
    question: "Can you help with SEO, AEO, GEO, SXO, and AIO?",
    answer: "Yes. Search has evolved from simple keyword optimization to deep semantic structures. I engineer crawlable websites using Next.js Server Components, construct advanced JSON-LD schema graphs, and optimize content architecture so that systems are indexed and highly referenceable by both traditional engines (Google) and AI answer engines (ChatGPT, Gemini, Perplexity).",
    category: "Search Strategy"
  },
  {
    question: "Do you build the systems yourself or only advise?",
    answer: "I write high-fidelity production-ready code. Unlike consultants who only deliver slide decks, I build fully operational systems (utilizing Next.js, Supabase, PostgreSQL, Docker, and automation engines) and hand over working software solutions.",
    category: "Execution"
  },
  {
    question: "What does a typical project start with?",
    answer: "Every engagement begins with a deep architectural audit. We inspect your current workflows, document data leaks and system constraints, and map out exactly where the highest-impact leverage points are. We align on a solid blueprint before a single line of code is written.",
    category: "Process"
  },
  {
    question: "Do you work with recruiters and employers?",
    answer: "Absolutely. I collaborate with forward-thinking employers and recruiting partners looking for system architects or senior operations builders. You can review my structured career history, technical stack, and resume on the dedicated [/resume](/resume) page.",
    category: "Collaboration"
  },
  {
    question: "Do you take ongoing collaborations?",
    answer: "Yes. I support organizations on a Systems Architecture advisory or retainer-based partnership model. This ensures that the systems we deploy are continuously monitored, refined, and scaled as your business operations grow.",
    category: "Collaboration"
  },
  {
    question: "How do you price projects?",
    answer: "I work strictly on a fixed-scope, value-packaged basis. I do not sell cheap developer hours; I deliver high-leverage business systems. You pay for the speed, operational intelligence, and structural performance of a premium system that reduces operational costs.",
    category: "Pricing"
  },
  {
    question: "What makes you different from hiring a developer, marketer, or consultant separately?",
    answer: "Developers often build clean code without understanding customer margins. Marketers build campaigns without understanding technical debt or structural database schema. Consultants identify problems but cannot build the code to fix them. I bridge all three: I build code that directly accelerates sales operations and scales margins.",
    category: "Value Proposition"
  }
];
