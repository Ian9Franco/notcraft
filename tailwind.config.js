/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Añadir colores para el sidebar
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-bg))",
          fg: "hsl(var(--sidebar-fg))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        pulse: {
          "0%": { boxShadow: "0 0 0 0 rgba(180, 255, 58, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(180, 255, 58, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(180, 255, 58, 0)" },
        },
        textGlow: {
          "0%, 100%": { textShadow: "0 0 5px rgba(180, 255, 58, 0.5)" },
          "50%": { textShadow: "0 0 15px rgba(180, 255, 58, 0.8)" },
        },
        "particle-1": {
          "0%": { transform: "translate(0, 0)", opacity: 0.8 },
          "100%": { transform: "translate(-100px, -50px)", opacity: 0 },
        },
        "particle-2": {
          "0%": { transform: "translate(0, 0)", opacity: 0.8 },
          "100%": { transform: "translate(100px, -70px)", opacity: 0 },
        },
        "particle-3": {
          "0%": { transform: "translate(0, 0)", opacity: 0.8 },
          "100%": { transform: "translate(-70px, 80px)", opacity: 0 },
        },
        "particle-4": {
          "0%": { transform: "translate(0, 0)", opacity: 0.8 },
          "100%": { transform: "translate(80px, 60px)", opacity: 0 },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        "float-text": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-2px)" },
        },
        reflection: {
          "0%": { transform: "translateX(-100%) translateY(-100%) rotate(45deg)" },
          "100%": { transform: "translateX(100%) translateY(100%) rotate(45deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        float: "float 5s ease-in-out infinite",
        pulse: "pulse 2s infinite",
        "text-glow": "textGlow 3s infinite",
        "particle-1": "particle-1 0.8s ease-out forwards",
        "particle-2": "particle-2 0.8s ease-out forwards",
        "particle-3": "particle-3 0.8s ease-out forwards",
        "particle-4": "particle-4 0.8s ease-out forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
        "float-text": "float-text 1s ease-in-out infinite",
        reflection: "reflection 1.5s ease-in-out",
      },
      fontFamily: {
        minecraft: ["MinecraftFont", "monospace"],
        pixel: ["MinecraftFont", "monospace"],
        title: ["Aboreto", "sans-serif"],
        body: ["Nunito", "sans-serif"],
        bytesized: ["Bytesized", "monospace"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
