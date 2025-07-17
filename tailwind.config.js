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
        // Sidebar
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-bg))",
          fg: "hsl(var(--sidebar-fg))",
        },
        // Coffee theme colors
        coffee: {
          DEFAULT: "#6f4e37",
          light: "#8a6142",
          dark: "#5a3f2c",
        },
        bistre: {
          DEFAULT: "#3d2b1f",
          light: "#4e382a",
          dark: "#2c1f16",
        },
        wheat: {
          DEFAULT: "#f5deb3",
          light: "#f8e7c9",
          dark: "#e5cfa4",
        },
        chestnut: {
          DEFAULT: "#954535",
          light: "#a85a49",
          dark: "#7a3829",
        },
        "dutch-white": {
          DEFAULT: "#efdfbb",
          light: "#f5e9d0",
          dark: "#e0d0ac",
        },
        "papaya-whip": {
          DEFAULT: "#ffefd5",
          light: "#fff5e6",
          dark: "#f5e5cb",
        },
        shader: {
          DEFAULT: "hsl(216, 29%, 19%)",
          light: "#6f4e37",
        },
      },
      // ✅ AGREGAMOS LAS ALTURAS PERSONALIZADAS
      height: {
        18: "4.5rem", // 72px - Para mobile nav
        22: "5.5rem", // 88px - Para elementos más altos
        26: "6.5rem", // 104px - Para headers grandes
        30: "7.5rem", // 120px - Para elementos extra grandes
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
        "coffee-pulse": {
          "0%": { boxShadow: "0 0 0 0 rgba(149, 69, 53, 0.4)" },
          "70%": { boxShadow: "0 0 0 10px rgba(149, 69, 53, 0)" },
          "100%": { boxShadow: "0 0 0 0 rgba(149, 69, 53, 0)" },
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
        "coffee-pulse": "coffee-pulse 2s infinite",
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
