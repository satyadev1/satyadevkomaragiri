/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#fafafa",
        surface: "#ffffff",
        border: "rgba(0,0,0,0.08)",
        accent: "#2563eb",
        "accent-soft": "#3b82f6",
        "accent-dim": "rgba(37, 99, 235, 0.12)",
        "overlay-heading": "#0f172a",
        "overlay-text": "#334155",
        "overlay-muted": "#64748b",
      },
      maxWidth: {
        content: "42rem",
        wide: "56rem",
      },
    },
  },
  plugins: [],
};
