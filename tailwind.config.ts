import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Liquid-metal palette
        bg: "#0a0d12",
        ink: "#06080b",
        surface: "#14181f",
        steel: "#2f3742",
        silver: "#c8cfd8",
        chrome: "#e6ecf2",
        accent: "#b8c2cf",
        muted: "#8993a3",
      },
      backgroundImage: {
        "metal-dark": "linear-gradient(180deg, #1c222b 0%, #0e1218 50%, #1c222b 100%)",
        "metal-silver": "linear-gradient(180deg, #f4f6f8 0%, #c8cfd8 28%, #7a8694 55%, #c8cfd8 78%, #f4f6f8 100%)",
        "metal-radial": "radial-gradient(120% 80% at 50% -10%, rgba(255,255,255,0.18), rgba(255,255,255,0) 60%)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        opensans: ["var(--font-opensans)", "system-ui", "sans-serif"],
        quicksand: ["var(--font-quicksand)", "system-ui", "sans-serif"],
      },
      maxWidth: { container: "1300px" },
      animation: {
        marquee: "marquee 30s linear infinite",
        "marquee-rev": "marquee 35s linear infinite reverse",
        spin8: "spin 8s linear infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
