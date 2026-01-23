import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { SectionDivider } from "@/components/SectionDivider";
import { ParallaxSection } from "@/components/ParallaxSection";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";
import dynamic from "next/dynamic";

// Lazy load heavy sections
const About = dynamic(() => import("@/components/About").then((mod) => mod.About), { loading: () => <LoadingSpinner /> });
const MyStory = dynamic(() => import("@/components/MyStory").then((mod) => mod.MyStory), { loading: () => <LoadingSpinner /> });
const Skills = dynamic(() => import("@/components/Skills").then((mod) => mod.Skills), { loading: () => <LoadingSpinner /> });
const Achievements = dynamic(() => import("@/components/Achievements").then((mod) => mod.Achievements), { loading: () => <LoadingSpinner /> });
const Experience = dynamic(() => import("@/components/Experience").then((mod) => mod.Experience), { loading: () => <LoadingSpinner /> });
const SignatureWork = dynamic(() => import("@/components/SignatureWork").then((mod) => mod.SignatureWork), { loading: () => <LoadingSpinner /> });
const ROICalculator = dynamic(() => import("@/components/ROICalculator").then((mod) => mod.ROICalculator), { loading: () => <LoadingSpinner /> });
const Projects = dynamic(() => import("@/components/Projects").then((mod) => mod.Projects), { loading: () => <LoadingSpinner /> });
const Testimonials = dynamic(() => import("@/components/Testimonials").then((mod) => mod.Testimonials), { loading: () => <LoadingSpinner /> });
const ContentSection = dynamic(() => import("@/components/ContentSection").then((mod) => mod.ContentSection), { loading: () => <LoadingSpinner /> });
const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact), { loading: () => <LoadingSpinner /> });
const FAQ = dynamic(() => import("@/components/FAQ").then((mod) => mod.FAQ), { loading: () => <LoadingSpinner /> });

import { SystemLog } from "@/components/SystemLog";
import { getAllBlogPosts } from "@/lib/blog-loader";
import { getAllCaseStudies } from "@/lib/case-study-loader";
import { getAllFAQs } from "@/lib/faq-loader";

export default function Home() {
  const blogCount = getAllBlogPosts().length;
  const caseStudyCount = getAllCaseStudies().length;
  const faqs = getAllFAQs();

  return (
    <main id="main-content" className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white overflow-x-hidden">
      <Hero />
      <SectionDivider variant="wave" />
      <SignatureWork />
      <SectionDivider variant="gradient" />
      <ROICalculator />
      <SectionDivider variant="wave" />
      <ParallaxSection speed={0.3}>
        <About />
      </ParallaxSection>
      <SectionDivider variant="morph" />
      <Experience />
      <SectionDivider variant="wave" />
      <Achievements />
      <SectionDivider variant="gradient" />
      <MyStory />
      <SectionDivider variant="morph" />
      <ContentSection blogCount={blogCount} caseStudyCount={caseStudyCount} />
      <SectionDivider variant="wave" />
      <Projects />
      <SectionDivider variant="gradient" />
      <ParallaxSection speed={0.2}>
        <Skills />
      </ParallaxSection>
      <SectionDivider variant="wave" />
      <Testimonials />
      <SectionDivider variant="morph" />
      <FAQ items={faqs} />
      <SectionDivider variant="gradient" />
      <Contact />
      <SystemLog />
      <Footer />
    </main>
  );
}
