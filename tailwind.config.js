/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  darkMode: "class", // You control dark mode manually with a wrapper <View className="dark">
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        // ---- BACKGROUND ----
        background: {
          light: "#ffffff",    // --background
          dark: "#0f172a",     // slate-950
        },

        // ---- FOREGROUND ----
        foreground: {
          light: "#030213",    // --foreground
          dark: "#f8fafc",     // slate-50
        },

        // ---- CARD ----
        card: {
          light: "#ffffff",
          dark: "#1e293b",     // slate-800
        },

        // ---- POPOVER ----
        popover: {
          light: "#ffffff",
          dark: "#1e293b",
        },

        // ---- PRIMARY ----
        primary: {
          light: "#9333ea",     // purple-600
          dark: "#a855f7",      // purple-500
        },
        "primary-foreground": {
          light: "#ffffff",
          dark: "#ffffff",
        },

        // ---- SECONDARY ----
        secondary: {
          light: "#f3f4f6",     // gray-100
          dark: "#1e293b",      // slate-800
        },
        "secondary-foreground": {
          light: "#1f2937",     // gray-800
          dark: "#f8fafc",
        },

        // ---- MUTED ----
        muted: {
          light: "#f3f4f6",
          dark: "#1e293b",
        },
        "muted-foreground": {
          light: "#6b7280",     // gray-500
          dark: "#94a3b8",      // slate-400
        },

        // ---- ACCENT ----
        accent: {
          light: "#f3f4f6",
          dark: "#1e293b",
        },
        "accent-foreground": {
          light: "#111827",
          dark: "#f8fafc",
        },

        // ---- DESTRUCTIVE ----
        destructive: {
          light: "#ef4444",
          dark: "#7f1d1d",
        },
        "destructive-foreground": {
          light: "#ffffff",
          dark: "#f8fafc",
        },

        // ---- BORDER ----
        border: {
          light: "#e5e7eb",
          dark: "#1e293b",
        },

        // ---- INPUT ----
        input: {
          light: "#e5e7eb",
          dark: "#1e293b",
        },

        // ---- RING ----
        ring: {
          light: "#9333ea",
          dark: "#a855f7",
        },
      },

      // ---- RADII (converted from your CSS variables) ----
      borderRadius: {
        sm: "0.375rem",    // var(--radius) - 4px
        md: "0.5rem",      // var(--radius) - 2px
        lg: "0.625rem",    // var(--radius)
        xl: "0.875rem",    // var(--radius) + 4px
      },

      // ---- SHADOW ----
      boxShadow: {
        card: "0 1px 2px rgba(0,0,0,0.06)",
        popover: "0 4px 12px rgba(0,0,0,0.08)",
      },
    },
  },

  plugins: [
    plugin(({ addUtilities, theme }) => {
      const colors = theme("colors");

      addUtilities({
        // Background
        ".bg-background": { backgroundColor: colors.background.light },
        ".dark\\:bg-background": { backgroundColor: colors.background.dark },

        ".bg-card": { backgroundColor: colors.card.light },
        ".dark\\:bg-card": { backgroundColor: colors.card.dark },

        ".bg-popover": { backgroundColor: colors.popover.light },
        ".dark\\:bg-popover": { backgroundColor: colors.popover.dark },

        // Text
        ".text-foreground": { color: colors.foreground.light },
        ".dark\\:text-foreground": { color: colors.foreground.dark },

        // Border
        ".border-border": { borderColor: colors.border.light },
        ".dark\\:border-border": { borderColor: colors.border.dark },

        // Shadow
        ".shadow-card": { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 2 },
        ".shadow-popover": { shadowColor: "#000", shadowOpacity: 0.08, shadowRadius: 6 },
      });
    }),
  ],
};
