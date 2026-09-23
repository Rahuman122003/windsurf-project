import SwipeSlider from "@/components/SwipeSlider";
import TextReveal from "@/components/TextReveal";
import Disciplines from "@/components/Disciplines";
import HomeIntros from "@/components/HomeIntros";
import CaseStudies from "@/components/CaseStudies";
import Testimonials from "@/components/Testimonials";
import Insights from "@/components/Insights";
import ProjectEstimator from "@/components/ProjectEstimator";
import FAQSection from "@/components/FAQSection";
import ClientMarquee from "@/components/ClientMarquee";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <>
      {/* Cinematic GSAP vertical swipe hero */}
      <SwipeSlider />

      {/* Manifesto — dim-to-bright word reveal */}
      <TextReveal />

      {/* Sticky 3-stage discipline reveal */}
      <Disciplines />

      {/* Outcome-driven case studies with filters & metrics */}
      <CaseStudies />

      {/* Section intros — each links to its detailed page */}
      <HomeIntros />

      {/* Client telemetry & testimonials */}
      <Testimonials />

      {/* Interactive scope & timeline investment estimator */}
      <ProjectEstimator />

      {/* Studio insights & editorial bento */}
      <Insights />

      {/* Clear answers FAQ accordion */}
      <FAQSection />

      {/* Logos band */}
      <ClientMarquee />

      {/* Closing CTA */}
      <FooterCTA />
    </>
  );
}
