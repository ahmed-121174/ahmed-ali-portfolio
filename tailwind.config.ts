import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Galaxy-inspired palette
        cosmic: {
          50: "#f0f4ff",
          100: "#e0eaff",
          200: "#c7d7fe",
          300: "#a5b8fc",
          400: "#8193f8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          800: "#3730a3",
          900: "#312e81",
          950: "#1e1b4b",
        },
        nebula: {
          50: "#fdf4ff",
          100: "#fae8ff",
          200: "#f5d0fe",
          300: "#f0abfc",
          400: "#e879f9",
          500: "#d946ef",
          600: "#c026d3",
          700: "#a21caf",
          800: "#86198f",
          900: "#701a75",
          950: "#4a044e",
        },
        star: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#f59e0b",
          600: "#d97706",
        },
        void: {
          900: "#03020d",
          800: "#07052a",
          700: "#0d0b3f",
          600: "#130f54",
          500: "#1a1468",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
        display: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "galaxy-gradient":
          "radial-gradient(ellipse at 20% 50%, #312e81 0%, #03020d 50%, #1e1b4b 100%)",
        "nebula-gradient":
          "radial-gradient(ellipse at 80% 20%, rgba(217,70,239,0.15) 0%, transparent 60%)",
        "cosmic-gradient":
          "linear-gradient(135deg, #1e1b4b 0%, #03020d 50%, #0d0b3f 100%)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out infinite 2s",
        twinkle: "twinkle 3s ease-in-out infinite",
        "gradient-shift": "gradientShift 8s ease infinite",
        "border-glow": "borderGlow 2s ease-in-out infinite",
        "text-shimmer": "textShimmer 3s linear infinite",
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        meteor: "meteor 5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        gradientShift: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        borderGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(99,102,241,0.5)" },
          "50%": { boxShadow: "0 0 20px rgba(99,102,241,1), 0 0 40px rgba(217,70,239,0.5)" },
        },
        textShimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
      },
      screens: {
        xs: "475px",
      },
    },
  },
  plugins: [],
};

export default config;
