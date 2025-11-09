import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      padding: "2rem",
      center: true,
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#FF6B6B",
          light: "#FF8E8E",
          dark: "#E85555",
        },
        secondary: {
          DEFAULT: "#4ECDC4",
          light: "#6FE0D8",
          dark: "#3DB8AF",
        },
        accent: {
          DEFAULT: "#FFD93D",
          light: "#FFE366",
          dark: "#F5C832",
        },
        coral: {
          DEFAULT: "#FF6B6B",
          light: "#FFA5A5",
          dark: "#FF4040",
        },
        teal: {
          DEFAULT: "#4ECDC4",
          light: "#7FE0D8",
          dark: "#2DB8AF",
        },
        peach: {
          DEFAULT: "#FFB88C",
          light: "#FFD1B3",
          dark: "#FF9F66",
        },
        mint: {
          DEFAULT: "#6FCF97",
          light: "#8DDDB0",
          dark: "#55B97D",
        },
        dark: {
          DEFAULT: "#2D3142",
          light: "#4F5D75",
          lighter: "#6B7A99",
        },
        light: {
          DEFAULT: "#FFF5F7",
          gray: "#FFF0F3",
          cream: "#FFFBF0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #FF6B6B 0%, #FF8E8E 50%, #FFB88C 100%)",
        "gradient-secondary": "linear-gradient(135deg, #4ECDC4 0%, #6FE0D8 100%)",
        "gradient-hero": "linear-gradient(135deg, #FFF5F7 0%, #FFFBF0 50%, #F0F8FF 100%)",
        "gradient-cta": "linear-gradient(135deg, #FF6B6B 0%, #4ECDC4 50%, #FFD93D 100%)",
        "gradient-sunset": "linear-gradient(135deg, #FF9A76 0%, #FF6B9D 50%, #C06C84 100%)",
        "gradient-ocean": "linear-gradient(135deg, #4ECDC4 0%, #44A08D 50%, #093637 100%)",
        "gradient-warm": "linear-gradient(135deg, #FFD93D 0%, #FFB88C 50%, #FF8E8E 100%)",
        "mesh-gradient": "radial-gradient(at 40% 20%, #FF6B6B 0px, transparent 50%), radial-gradient(at 80% 0%, #4ECDC4 0px, transparent 50%), radial-gradient(at 0% 50%, #FFD93D 0px, transparent 50%), radial-gradient(at 80% 50%, #FFB88C 0px, transparent 50%), radial-gradient(at 0% 100%, #6FCF97 0px, transparent 50%), radial-gradient(at 80% 100%, #FF6B9D 0px, transparent 50%)",
      },
      boxShadow: {
        "glass": "0 8px 32px 0 rgba(255, 107, 107, 0.15)",
        "card": "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 20px 25px -5px rgba(255, 107, 107, 0.2), 0 10px 10px -5px rgba(78, 205, 196, 0.1)",
        "colorful": "0 10px 40px -10px rgba(255, 107, 107, 0.3), 0 0 20px -5px rgba(78, 205, 196, 0.2)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        "bounce-slow": "bounce 3s infinite",
        "float": "float 6s ease-in-out infinite",
        "gradient": "gradient 8s linear infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.9)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
