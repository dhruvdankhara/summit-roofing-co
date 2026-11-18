import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        slate: {
          950: "#090D16",
          900: "#0F172A", // Deep Mountain Slate
          800: "#1E293B", // Charcoal
          700: "#334155",
          600: "#475569",
        },
        summit: {
          50: "#FFF7ED",
          100: "#FFEDD5",
          500: "#F97316",
          600: "#EA580C", // Summit Amber / Safety Orange
          700: "#C2410C",
        },
        alabaster: "#F8FAFC",
        emerald: {
          500: "#10B981", // Emerald Trust Badge
          600: "#059669",
        },
      },
    },
  },
  plugins: [],
};

export default config;
