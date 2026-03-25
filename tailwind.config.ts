import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // --font-noto  → Монгол текст үндсэн font
        noto: ["var(--font-noto)", "sans-serif"],
        // --font-inter → Тоо, Latin, UI элементүүд
        inter: ["var(--font-inter)", "sans-serif"],
        // sans default → noto болно
        sans: ["var(--font-noto)", "var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
