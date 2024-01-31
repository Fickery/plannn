import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        boxshadow: "0px 1px 3px 0px hsl(var(--midblue))",
        boxshadow1: "0px 4px 5px 0px hsl(var(--midblue))",
        boxshadowfilter: "0px 4px 2px #e2e2f1",
      },
      colors: {
        darkblue: "hsl(var(--darkblue))",
        midblue: "hsl(var(--midblue))",
        lightblue: "hsl(var(--lightblue))",
      },
    },
  },
  plugins: [],
};
export default config;
