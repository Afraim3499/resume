import { Hero } from "@/components/Hero";
import { Projects } from "@/components/Projects";
import { SignatureWork } from "@/components/SignatureWork";
import { Skills } from "@/components/Skills";
import { Achievements } from "@/components/Achievements";
import { Experience } from "@/components/Experience";
import { Certifications } from "@/components/Certifications";
import { Events } from "@/components/Events";
import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { GitHubStats } from "@/components/GitHubStats";
import { Testimonials } from "@/components/Testimonials";
import { ContentSection } from "@/components/ContentSection";
import { SectionDivider } from "@/components/SectionDivider";
import { ParallaxSection } from "@/components/ParallaxSection";

export default function Home() {
  return (
    <main className="bg-background min-h-screen text-foreground selection:bg-primary selection:text-white">
      <div id="hero">
        <Hero />
      </div>
      <SectionDivider variant="wave" />
      <ParallaxSection speed={0.3}>
        <About />
      </ParallaxSection>
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
          <GitHubStats username="rizwanulislam" />
        </div>
      </section>
      <SectionDivider variant="gradient" />
      <ContentSection />
      <SectionDivider variant="wave" />
      <Events />
      <SectionDivider variant="morph" />
      <Certifications />
      <SectionDivider variant="gradient" />
      <Contact />
      <Footer />
    </main>
  );
}
