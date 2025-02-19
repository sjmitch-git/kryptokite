import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

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
        primary: {
          DEFAULT: colors.indigo[600],
          light: colors.indigo[300],
          dark: colors.indigo[900],
        },
        secondary: {
          DEFAULT: colors.violet[600],
          light: colors.violet[300],
          dark: colors.violet[900],
        },
        accent: {
          DEFAULT: colors.amber[600],
          light: colors.amber[300],
          dark: colors.amber[700],
        },
        neutral: {
          DEFAULT: colors.stone[300],
        },
        light: {
          DEFAULT: colors.stone[100],
        },
        dark: {
          DEFAULT: colors.stone[900],
        },
        info: {
          DEFAULT: colors.sky[400],
          light: colors.sky[200],
          dark: colors.sky[600],
        },
        success: {
          DEFAULT: colors.green[600],
          light: colors.green[400],
          dark: colors.green[800],
        },
        warning: {
          DEFAULT: colors.amber[500],
          light: colors.amber[300],
          dark: colors.amber[700],
        },
        error: {
          DEFAULT: colors.red[600],
          light: colors.red[400],
          dark: colors.red[800],
        },
        danger: {
          DEFAULT: colors.red[600],
          light: colors.red[400],
          dark: colors.red[800],
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
