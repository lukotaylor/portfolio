"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const FONTS = {
  grotesk: '"Space Grotesk", system-ui, -apple-system, sans-serif',
  inter: '"Inter", system-ui, -apple-system, sans-serif',
  poppins: '"Poppins", system-ui, -apple-system, sans-serif',
  jakarta: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  noto: '"Noto Sans", system-ui, -apple-system, sans-serif',
  googlesans: '"Google Sans", system-ui, -apple-system, sans-serif',
  lexend: '"Lexend", system-ui, -apple-system, sans-serif',
  worksans: '"Work Sans", system-ui, -apple-system, sans-serif',
  sanchez: '"Sanchez", serif',
};

const FONT_SIZE_MULTIPLIERS = {
  small: 0.9,
  medium: 1.1,
  large: 1.3,
};

const DEFAULT_THEME = { mode: "nature", font: "jakarta", fontSize: "medium" };
const STORAGE_KEY = "portfolioTheme";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(DEFAULT_THEME);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === "object") {
          setTheme({
            mode: parsed.mode || DEFAULT_THEME.mode,
            font: parsed.font || DEFAULT_THEME.font,
            fontSize: parsed.fontSize || DEFAULT_THEME.fontSize,
          });
        }
      }
    } catch {
      // keep defaults
    }
  }, []);

  // Persist to localStorage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const activeMode = theme.mode;
  const activeFont = FONTS[theme.font] || FONTS.grotesk;
  const multiplier = FONT_SIZE_MULTIPLIERS[theme.fontSize] || 1;
  const letterSpacing = theme.font === "sanchez" ? "0.03em" : undefined;

  // Apply font-size to <html> so all rem-based sizes scale proportionally
  useEffect(() => {
    document.documentElement.style.fontSize = `${16 * multiplier}px`;
  }, [multiplier]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div
        data-theme={activeMode}
        data-font={theme.font}
        style={{
          fontFamily: activeFont,
          letterSpacing,
        }}
        className="min-h-screen bg-bg-primary text-text-primary"
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within <ThemeProvider>");
  return ctx;
}
