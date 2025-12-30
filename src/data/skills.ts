export type SkillLevel = "expert" | "advanced" | "intermediate" | "beginner";

export interface Skill {
  name: string;
  level: SkillLevel;
  projects: string[];
  icon?: string;
  category: string;
}

export interface SkillsByCategory {
  frontend: Skill[];
  backend: Skill[];
  devops: Skill[];
  ai: Skill[];
  tools: Skill[];
  database: Skill[];
}

export const skills: SkillsByCategory = {
  frontend: [
    { name: "Next.js", level: "expert", projects: ["gaari", "trail"], category: "frontend" },
    { name: "React", level: "expert", projects: ["gaari", "trail"], category: "frontend" },
    { name: "TypeScript", level: "expert", projects: ["gaari", "trail"], category: "frontend" },
    { name: "Tailwind CSS", level: "expert", projects: ["gaari", "trail"], category: "frontend" },
    { name: "Framer Motion", level: "advanced", projects: ["gaari", "trail"], category: "frontend" },
    { name: "Shadcn/UI", level: "advanced", projects: ["trail"], category: "frontend" },
    { name: "Radix UI", level: "advanced", projects: ["gaari", "trail"], category: "frontend" },
    { name: "HTML5", level: "expert", projects: ["gaari", "trail", "yagacalls"], category: "frontend" },
    { name: "CSS3", level: "expert", projects: ["gaari", "trail", "yagacalls"], category: "frontend" },
    { name: "JavaScript (ES6+)", level: "expert", projects: ["gaari", "trail", "yagacalls"], category: "frontend" },
  ],
  backend: [
    { name: "Node.js", level: "expert", projects: ["gaari", "trail"], category: "backend" },
    { name: "Next.js API Routes", level: "expert", projects: ["gaari", "trail"], category: "backend" },
    { name: "Server Actions", level: "expert", projects: ["trail"], category: "backend" },
    { name: "RESTful APIs", level: "expert", projects: ["gaari", "trail", "yagacalls"], category: "backend" },
    { name: "PHP", level: "advanced", projects: ["yagacalls"], category: "backend" },
    { name: "Middleware", level: "advanced", projects: ["trail"], category: "backend" },
    { name: "Authentication", level: "expert", projects: ["gaari", "trail"], category: "backend" },
    { name: "Authorization (RBAC)", level: "expert", projects: ["gaari", "trail"], category: "backend" },
  ],
  database: [
    { name: "PostgreSQL", level: "expert", projects: ["gaari", "trail"], category: "database" },
    { name: "Supabase", level: "expert", projects: ["gaari", "trail"], category: "database" },
    { name: "Row Level Security (RLS)", level: "expert", projects: ["gaari", "trail"], category: "database" },
    { name: "Database Migrations", level: "expert", projects: ["gaari", "trail"], category: "database" },
    { name: "Database Design", level: "expert", projects: ["gaari", "trail"], category: "database" },
    { name: "Query Optimization", level: "advanced", projects: ["gaari", "trail"], category: "database" },
  ],
  devops: [
    { name: "Docker", level: "advanced", projects: ["trail"], category: "devops" },
    { name: "Docker Compose", level: "advanced", projects: ["trail"], category: "devops" },
    { name: "Nginx", level: "advanced", projects: ["gaari", "trail"], category: "devops" },
    { name: "VPS Deployment", level: "advanced", projects: ["gaari", "trail"], category: "devops" },
    { name: "CI/CD", level: "intermediate", projects: ["gaari", "trail"], category: "devops" },
    { name: "Environment Management", level: "advanced", projects: ["gaari", "trail"], category: "devops" },
  ],
  ai: [
    { name: "AI Chatbots", level: "advanced", projects: ["gaari", "primesync"], category: "ai" },
    { name: "Natural Language Processing", level: "advanced", projects: ["gaari", "primesync"], category: "ai" },
    { name: "Voice Agents", level: "advanced", projects: ["primesync"], category: "ai" },
    { name: "AI Content Generation", level: "advanced", projects: ["yagacalls"], category: "ai" },
    { name: "Recommendation Engines", level: "intermediate", projects: ["gaari"], category: "ai" },
    { name: "Machine Learning", level: "intermediate", projects: ["gaari"], category: "ai" },
  ],
  tools: [
    { name: "Git", level: "expert", projects: ["gaari", "trail", "yagacalls"], category: "tools" },
    { name: "ESLint", level: "expert", projects: ["gaari", "trail"], category: "tools" },
    { name: "Playwright", level: "advanced", projects: ["trail"], category: "tools" },
    { name: "TypeScript", level: "expert", projects: ["gaari", "trail"], category: "tools" },
    { name: "Jest", level: "intermediate", projects: ["gaari"], category: "tools" },
    { name: "React Testing Library", level: "intermediate", projects: ["gaari"], category: "tools" },
  ],
};

export const allSkills: Skill[] = Object.values(skills).flat();

export const skillCategories = Object.keys(skills) as Array<keyof SkillsByCategory>;

