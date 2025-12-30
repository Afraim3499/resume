export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  companyUrl?: string;
  content: string;
  rating?: number;
  image?: string;
  date?: string;
}

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    name: "Jahin Ahmed",
    role: "Co-Founder",
    company: "The Trail",
    companyUrl: "https://trailheadlines.com",
    content: "Working with Rizwanul on The Trail has been exceptional. His technical expertise combined with strategic thinking helped us launch a production-ready platform faster than we imagined. The custom CMS he built is intuitive, and the performance optimizations he implemented ensure our site loads in under half a second. He doesn't just code—he solves problems.",
    rating: 5,
    date: "2024-10-15",
  },
  {
    id: "testimonial-2",
    name: "Mohammad Hasan",
    role: "Community Member",
    company: "Yagacalls",
    companyUrl: "https://yagacalls.com",
    content: "Rizwanul's SEO framework transformed Yagacalls' visibility. Our organic traffic increased dramatically, and we're now ranking for key trading signal keywords. The 4-layer approach he implemented shows deep understanding of modern SEO. His technical execution is flawless, and he always delivers on time.",
    rating: 5,
    date: "2024-09-20",
  },
  {
    id: "testimonial-3",
    name: "Al Araf Islam",
    role: "Event Coordinator",
    company: "NSUSS",
    content: "Leading 200+ people for NSUSS events requires exceptional organizational skills, and Rizwanul delivered. His strategic planning and ability to coordinate multiple departments simultaneously made our ACE event a massive success. He empowered team members while maintaining clear direction. The events he organized went viral and received recognition from celebrities—that's the mark of excellent leadership.",
    rating: 5,
    date: "2024-08-10",
  },
];

