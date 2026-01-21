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
const Projects = dynamic(() => import("@/components/Projects").then((mod) => mod.Projects), { loading: () => <LoadingSpinner /> });
const Testimonials = dynamic(() => import("@/components/Testimonials").then((mod) => mod.Testimonials), { loading: () => <LoadingSpinner /> });
const GitHubStats = dynamic(() => import("@/components/GitHubStats").then((mod) => mod.GitHubStats), { loading: () => <LoadingSpinner /> });
const ContentSection = dynamic(() => import("@/components/ContentSection").then((mod) => mod.ContentSection), { loading: () => <LoadingSpinner /> });
const Events = dynamic(() => import("@/components/Events").then((mod) => mod.Events), { loading: () => <LoadingSpinner /> });
const Certifications = dynamic(() => import("@/components/Certifications").then((mod) => mod.Certifications), { loading: () => <LoadingSpinner /> });
const Contact = dynamic(() => import("@/components/Contact").then((mod) => mod.Contact), { loading: () => <LoadingSpinner /> });

export default function Home() {
  return (
    <main id="main-content" className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <Hero />
      <SectionDivider variant="wave" />
      <ParallaxSection speed={0.3}>
        <About />
      </ParallaxSection>
      <SectionDivider variant="gradient" />
      <MyStory />
      <SectionDivider variant="morph" />
      <ParallaxSection speed={0.2}>
        <Skills />
      </ParallaxSection>
      <SectionDivider variant="gradient" />
      <Achievements />
      <SectionDivider variant="wave" />
      <Experience />
      <SectionDivider variant="morph" />
      <SignatureWork />
      <SectionDivider variant="gradient" />
      <Projects />
      <SectionDivider variant="wave" />
      <Testimonials />
      <SectionDivider variant="morph" />
      <section id="github" className="py-32 bg-secondary/10 relative overflow-hidden">
        <div className="container px-4 mx-auto max-w-6xl">
          <GitHubStats username="Afraim3499" />
        </div>
      </section>
      <SectionDivider variant="morph" />
      <Events />
      <SectionDivider variant="gradient" />
      <Certifications />
      <SectionDivider variant="wave" />
      <ContentSection />
      <SectionDivider variant="morph" />
      <Contact />
      <Footer />
    </main>
  );
}
