import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0F2C5A",
          light: "#1A3F7A",
          muted: "#64748B"
        },
        surface: "#F5F7FA",
        card: "#FFFFFF",
        border: "#E2E8F0"
      },
      boxShadow: {
        sm: "0 1px 3px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};

export default config;
