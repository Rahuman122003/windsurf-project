import SwipeSlider from "@/components/SwipeSlider";
import TextReveal from "@/components/TextReveal";
import Disciplines from "@/components/Disciplines";
import HomeIntros from "@/components/HomeIntros";
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

      {/* Section intros — each links to its detailed page */}
      <HomeIntros />

      {/* Logos band */}
      <ClientMarquee />

      {/* Closing CTA */}
      <FooterCTA />
    </>
  );
}
