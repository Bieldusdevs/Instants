import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        dark: {
          bg: "#0a0a0c",
          card: "#121216",
          elevated: "#1a1a20",
          border: "rgba(255, 255, 255, 0.08)",
        },
        fire: {
          DEFAULT: "#ff5500",
          glow: "#ff8800",
          light: "#ffaa33",
        },
        neon: {
          purple: "#8a2be2",
          cyan: "#00f0ff",
          pink: "#ff007f",
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fire-flicker': 'flicker 1.5s infinite alternate',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1)', filter: 'drop-shadow(0 0 8px rgba(255, 85, 0, 0.8))' },
          '50%': { transform: 'scale(1.08) rotate(-2deg)', filter: 'drop-shadow(0 0 16px rgba(255, 136, 0, 1))' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
