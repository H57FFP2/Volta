import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        fg: "var(--fg)",
        accent: "var(--accent)",
        "accent-warm": "var(--accent-warm)",
        muted: "var(--muted)",
        "muted-fg": "var(--muted-fg)",
        "border-color": "var(--border-color)",
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "rotate-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "rotate-slow": "rotate-slow 14s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
