export const themeModes = {
  light: {
    label: "Light",
    themes: {
      light: { name: "Nature", colors: { bg: "#e9eee9", accent: "#296f5a", text: "#121A13" } },
      ocean: { name: "Banana", colors: { bg: "#f5f1db", accent: "#948229", text: "#2B2715" } },
    },
  },
  dark: {
    label: "Dark",
    themes: {
      dark:   { name: "Classic", colors: { bg: "#111111", accent: "#94a3b8", text: "#ffffff" } },
      nature: { name: "Nature", colors: { bg: "#0a0e0b", accent: "#86a289", text: "#f0f4f1" } },
      desert: { name: "Desert", colors: { bg: "#17100B", accent: "#B76046", text: "#faf6f0" } },
      space:  { name: "Space",  colors: { bg: "#0a0d1a", accent: "#638BFC", text: "#e8edf5" } },
    },
  },
};

export function getModeForTheme(themeKey) {
  for (const [mode, group] of Object.entries(themeModes)) {
    if (themeKey in group.themes) return mode;
  }
  return "dark";
}
