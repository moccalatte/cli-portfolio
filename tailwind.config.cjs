/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        text: "var(--text)",
        subtle: "var(--subtle)",
        accent: "var(--accent)",
        border: "var(--border)",
        muted: "var(--muted)",
        cli: {
          cyan: "var(--cli-cyan)",
          magenta: "var(--cli-magenta)",
          yellow: "var(--cli-yellow)",
          green: "var(--cli-green)",
          red: "var(--cli-red)",
        },
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', "Consolas", "monospace"],
      },
    },
  },
  plugins: [],
};
