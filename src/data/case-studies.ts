export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  problem: string;
  solution: string;
  results: {
    metrics: Array<{ label: string; value: string }>;
    impact: string;
    improvements: string[];
  };
  lessonsLearned: string[];
  technologies: string[];
  timeline: string;
  challenges: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}

// Type definition used by loader
export interface CaseStudy {
  slug: string;
  projectSlug: string;
  title: string;
  problem: string;
  solution: string;
  results: {
    metrics: Array<{ label: string; value: string }>;
    impact: string;
    improvements: string[];
  };
  lessonsLearned: string[];
  technologies: string[];
  timeline: string;
  challenges: string[];
  beforeAfter?: {
    before: string;
    after: string;
  };
}
