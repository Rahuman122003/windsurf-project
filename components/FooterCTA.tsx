"use client";
import PrismButton from "./PrismButton";
import { ArrowUpRight } from "lucide-react";
import RevealText from "./RevealText";

export default function FooterCTA() {
  return (
    <section id="contact" className="bg-ink text-white py-28 lg:py-40">
      <div className="max-w-container mx-auto px-6 lg:px-10 text-center">
        <RevealText
          as="h2"
          text="Get started now!"
          className="font-display font-extrabold leading-[1.0] mx-auto text-6xl md:text-8xl"
        />
        <p className="mt-6 text-white/65 text-xl md:text-2xl">It takes less than a minute of your time.</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <PrismButton href="/contact">Request a Quote</PrismButton>
          <PrismButton href="/services" variant="ghost">Learn More</PrismButton>
        </div>
      </div>
    </section>
  );
}
