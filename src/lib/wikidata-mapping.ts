export const WIKIDATA_MAPPING: Record<string, string> = {
    // Frontend
    "Next.js": "https://www.wikidata.org/wiki/Q110468520",
    "React": "https://www.wikidata.org/wiki/Q19399674",
    "TypeScript": "https://www.wikidata.org/wiki/Q1859600",
    "Tailwind CSS": "https://www.wikidata.org/wiki/Q100373859",
    "Framer Motion": "https://www.wikidata.org/wiki/Q126685055", // Approximate or Software
    "Shadcn/UI": "https://www.wikidata.org/wiki/Q11660", // Generic UI for now
    "Radix UI": "https://www.wikidata.org/wiki/Q11660",
    "HTML5": "https://www.wikidata.org/wiki/Q83386",
    "CSS3": "https://www.wikidata.org/wiki/Q191317",
    "JavaScript (ES6+)": "https://www.wikidata.org/wiki/Q978185",

    // Backend
    "Node.js": "https://www.wikidata.org/wiki/Q756100",
    "PHP": "https://www.wikidata.org/wiki/Q59",
    "RESTful APIs": "https://www.wikidata.org/wiki/Q230579",
    "Authentication": "https://www.wikidata.org/wiki/Q1333333", // Data Security
    "Authorization (RBAC)": "https://www.wikidata.org/wiki/Q1046502",

    // Database
    "PostgreSQL": "https://www.wikidata.org/wiki/Q192490",
    "Supabase": "https://www.wikidata.org/wiki/Q105658661", // Software
    "Database Design": "https://www.wikidata.org/wiki/Q1146747",
    "Query Optimization": "https://www.wikidata.org/wiki/Q1341065",

    // DevOps
    "Docker": "https://www.wikidata.org/wiki/Q17622851",
    "Nginx": "https://www.wikidata.org/wiki/Q220698",
    "CI/CD": "https://www.wikidata.org/wiki/Q4658145",
    "VPS Deployment": "https://www.wikidata.org/wiki/Q216853",

    // AI & Data
    "AI Chatbots": "https://www.wikidata.org/wiki/Q15629433",
    "Natural Language Processing": "https://www.wikidata.org/wiki/Q30642",
    "Machine Learning": "https://www.wikidata.org/wiki/Q2539",
    "Data Mining": "https://www.wikidata.org/wiki/Q172491",

    // Tools
    "Git": "https://www.wikidata.org/wiki/Q186055",
    "ESLint": "https://www.wikidata.org/wiki/Q28404287",
    "Playwright": "https://www.wikidata.org/wiki/Q105658661", // Software
    "HubSpot": "https://www.wikidata.org/wiki/Q5927508",
    "Salesforce": "https://www.wikidata.org/wiki/Q271501",
};

export function getWikidataUri(skillName: string): string {
    return WIKIDATA_MAPPING[skillName] || "https://www.wikidata.org/wiki/Q11660"; // Default to "Artificial Intelligence" / Software if unknown
}
