import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--bg-base)",
        foreground: "var(--text-primary)",
        surface: "var(--surface)",
        "surface-strong": "var(--surface-strong)",
        "surface-muted": "var(--surface-muted)",
        border: "var(--border-subtle)",
        accent: "var(--accent)",
        "accent-strong": "var(--accent-strong)",
        "accent-soft": "var(--accent-soft)",
        "accent-foreground": "var(--accent-foreground)",
        muted: "var(--muted-surface)",
        "muted-foreground": "var(--text-secondary)",
        success: "var(--success)",
        info: "var(--info)",
        warning: "var(--warning)",
        glass: "var(--card-glass-bg)",
        "glass-border": "var(--card-glass-border)",
      },
      boxShadow: {
        glow: "0 0 24px rgba(139, 92, 246, 0.35)",
      },
    },
  },
};

export default config;
