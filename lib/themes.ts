export const sectionThemes = {
  hero: {
    background: "#08090A",
    glow: "rgba(34, 211, 238, 0.14)",
  },
  about: {
    background: "#0D0E10",
    glow: "rgba(148, 163, 184, 0.08)",
  },
  services: {
    background: "#101115",
    glow: "rgba(34, 211, 238, 0.12)",
  },
  work: {
    background: "#0B0C0E",
    glow: "rgba(255, 255, 255, 0.05)",
  },
  process: {
    background: "#0F1013",
    glow: "rgba(34, 211, 238, 0.08)",
  },
  blog: {
    background: "#111214",
    glow: "rgba(103, 232, 249, 0.08)",
  },
  contact: {
    background: "#08090A",
    glow: "rgba(34, 211, 238, 0.1)",
  },
} as const;

export type SectionTheme = keyof typeof sectionThemes;
