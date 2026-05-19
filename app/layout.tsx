import type { Metadata } from "next";
import { League_Spartan } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import SmoothScroll from "@/components/SmoothScroll";
import FooterReveal from "@/components/FooterReveal";

const spartan = League_Spartan({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blyn — Premium Digital Agency",
  description: "We craft cinematic digital experiences for ambitious brands.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spartan.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css?family=Google+Sans:400,500,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans">
        <SmoothScroll />
        <CustomCursor />
        <Nav />
        <main className="relative z-10 bg-white">{children}</main>
        <Footer />
        <FooterReveal />
      </body>
    </html>
  );
}
