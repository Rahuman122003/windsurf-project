"use client";
import { WorldMap } from "@/components/ui/map";

export default function MapDemo() {
  return (
    <section className="py-24 lg:py-32 bg-neutral-950 text-white border-t border-white/10 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center mb-12">
        <p className="font-display font-extrabold text-3xl md:text-5xl text-white">
          Global <span className="text-white/60">Network</span>
        </p>
        <p className="text-sm md:text-lg text-white/60 max-w-2xl mx-auto py-4 font-light leading-relaxed">
          Connect with teams and clients worldwide. Our platform enables seamless 
          collaboration across continents, bringing the world to your workspace.
        </p>
      </div>
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <WorldMap
          dots={[
            {
              start: {
                lat: 64.2008,
                lng: -149.4937,
                label: "Fairbanks"
              },
              end: {
                lat: 34.0522,
                lng: -118.2437,
                label: "Los Angeles"
              },
            },
            {
              start: { 
                lat: 64.2008, 
                lng: -149.4937,
                label: "Fairbanks"
              },
              end: { 
                lat: -15.7975, 
                lng: -47.8919,
                label: "Brasília"
              },
            },
            {
              start: { 
                lat: -15.7975, 
                lng: -47.8919,
                label: "Brasília"
              },
              end: { 
                lat: 38.7223, 
                lng: -9.1393,
                label: "Lisbon"
              },
            },
            {
              start: { 
                lat: 51.5074, 
                lng: -0.1278,
                label: "London"
              },
              end: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi"
              },
            },
            {
              start: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi"
              },
              end: { 
                lat: 43.1332, 
                lng: 131.9113,
                label: "Vladivostok"
              },
            },
            {
              start: { 
                lat: 28.6139, 
                lng: 77.209,
                label: "New Delhi"
              },
              end: { 
                lat: -1.2921, 
                lng: 36.8219,
                label: "Nairobi"
              },
            },
          ]}
        />
      </div>
    </section>
  );
}
