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
    company: "The Trailheadline",
    companyUrl: "https://trailheadlines.com",
    content: "Working with Rizwanul on The Trailheadline has been exceptional. His technical expertise combined with strategic thinking helped us launch a production-ready platform faster than we imagined. The custom CMS he built is intuitive, and the performance optimizations he implemented ensure our site loads in under half a second. He doesn't just code—he solves problems.",
    rating: 5,
    date: "2025-10-15",
  },
  {
    id: "testimonial-2",
    name: "Tawhid Rahman",
    role: "Founder",
    company: "Arrivals Cave",
    companyUrl: "https://www.arrivalscavebd.com",
    content: "Rizwanul architected our complete e-commerce experience from the ground up for Eid 2026. The integration of Meta CAPI and Google Merchant Center, combined with his CRO engine, directly contributed to a massively successful launch. He understands both code and commerce.",
    rating: 5,
    date: "2026-01-20",
  },
  {
    id: "testimonial-3",
    name: "Al Araf Islam",
    role: "Event Coordinator",
    company: "NSUSS",
    content: "Leading 200+ people for NSUSS events requires exceptional organizational skills, and Rizwanul delivered. His strategic planning and ability to coordinate multiple departments simultaneously made our ACE event a massive success for 25,000+ attendees. The events he orchestrated set a new benchmark.",
    rating: 5,
    date: "2024-08-10",
  },
  {
    id: "testimonial-4",
    name: "Operational Lead",
    role: "Management",
    company: "Quantanite",
    content: "Afraim's processing of over 1 million data points for our operations was executed with legendary accuracy. He turns raw, chaotic data into intelligent, actionable business logic. A true operational powerhouse.",
    rating: 5,
    date: "2023-11-05",
  },
];

