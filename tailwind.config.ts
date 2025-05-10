import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@smitch/fluid/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        light: {
          DEFAULT: "var(--light)",
        },
        dark: {
          DEFAULT: "var(--dark)",
        },
        primary: {
          DEFAULT: "var(--primary)",
          light: "var(--primary-light)",
          dark: "var(--primary-dark)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          light: "var(--secondary-light)",
          dark: "var(--secondary-dark)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          light: "var(--accent-light)",
          dark: "var(--accent-dark)",
        },
        neutral: {
          DEFAULT: "var(--neutral)",
          light: "var(--neutral-light)",
          dark: "var(--neutral-dark)",
        },
        info: {
          DEFAULT: "var(--info)",
          light: "var(--info-light)",
          dark: "var(--info-dark)",
        },
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
          dark: "var(--success-dark)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
          dark: "var(--warning-dark)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
          dark: "var(--error-dark)",
        },
        danger: {
          DEFAULT: "var(--danger)",
          light: "var(--danger-light)",
          dark: "var(--danger-dark)",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
} satisfies Config;
