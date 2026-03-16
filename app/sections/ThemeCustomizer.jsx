"use client";

import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "../components/ui/ThemeProvider";
import { themeModes, getModeForTheme } from "../data/themes";
import { fonts, fontSizes } from "../data/fonts";
import IconButton from "../components/ui/IconButton";

/* Reusable section label */
const Label = ({ children }) => (
  <label className="block mb-2 text-text-tertiary" style={{ fontSize: "var(--font-size-small)", fontWeight: 600, letterSpacing: "0.02em" }}>
    {children}
  </label>
);

/* 3-dot color swatch — bigger dots */
const Swatch = ({ colors }) => (
  <span aria-hidden="true" style={{ display: "inline-flex", gap: 5, alignItems: "center" }}>
    {[colors.bg, colors.accent, colors.text].map((c, i) => (
      <span
        key={i}
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: c,
          border: "1px solid rgba(128,128,128,0.25)",
        }}
      />
    ))}
  </span>
);

/* Checkmark icon */
const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* Sun icon for light mode */
const SunIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="m4.93 4.93 1.41 1.41" />
    <path d="m17.66 17.66 1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="m6.34 17.66-1.41 1.41" />
    <path d="m19.07 4.93-1.41 1.41" />
  </svg>
);

/* Moon icon for dark mode */
const MoonIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
  </svg>
);

const MODE_ICONS = { light: SunIcon, dark: MoonIcon };


export default function ThemeCustomizer({ onClose }) {
  const { theme, setTheme } = useTheme();
  const [showStyleDropdown, setShowStyleDropdown] = useState(false);
  const [showFontDropdown, setShowFontDropdown] = useState(false);
  const currentMode = getModeForTheme(theme.mode);
  const modeGroup = themeModes[currentMode];

  /* ---- helpers ---- */
  const switchMode = (newMode) => {
    if (newMode === currentMode) return;
    const firstKey = Object.keys(themeModes[newMode].themes)[0];
    setTheme({ ...theme, mode: firstKey });
  };

  const switchStyle = (key) => {
    setTheme({ ...theme, mode: key });
    setShowStyleDropdown(false);
  };

  const switchFont = (key) => {
    setTheme({ ...theme, font: key });
    setShowFontDropdown(false);
  };

  const switchFontSize = (key) => {
    setTheme({ ...theme, fontSize: key });
  };

  /* ---- keyboard nav for radiogroups ---- */
  const modeRef = useRef(null);

  const handleRadioKeyDown = (e, items, currentIndex, onSelect) => {
    let next = currentIndex;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = (currentIndex + 1) % items.length;
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = (currentIndex - 1 + items.length) % items.length;
    } else {
      return;
    }
    onSelect(items[next]);
  };

  /* ---- aria-live announcement ---- */
  const [announcement, setAnnouncement] = useState("");
  useEffect(() => {
    const modeName = themeModes[currentMode]?.themes[theme.mode]?.name;
    if (modeName) setAnnouncement(`Theme changed to ${modeName}`);
  }, [theme.mode, currentMode]);

  const modeKeys = Object.keys(themeModes);
  const styleEntries = Object.entries(modeGroup.themes);

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 animate-[fadeIn_0.2s_ease]"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="max-w-[500px] w-full overflow-visible animate-[slideUp_0.3s_ease]"
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderRadius: 20,
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-8 py-6"
        >
          <h2 className="font-semibold leading-tight tracking-tight m-0 text-text-primary" style={{ fontSize: "var(--font-size-heading)" }}>
            Customize appearance
          </h2>
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            }
            size="sm"
            variant="secondary"
            onClick={onClose}
            ariaLabel="Close"
            style={{ boxShadow: "none", border: "1px solid transparent" }}
          />
        </div>

        {/* Content */}
        <div className="px-8 pb-8">
          {/* Color Mode — segmented control */}
          <div className="mb-6">
            <Label>Color Mode</Label>
            <div
              role="radiogroup"
              aria-label="Color mode"
              ref={modeRef}
              style={{
                display: "flex",
                borderRadius: 12,
                border: "1.5px solid var(--color-border)",
                overflow: "hidden",
                backgroundColor: "var(--color-bg-primary)",
              }}
            >
              {modeKeys.map((modeKey, i) => {
                const active = modeKey === currentMode;
                const Icon = MODE_ICONS[modeKey];
                return (
                  <button
                    key={modeKey}
                    role="radio"
                    aria-checked={active}
                    tabIndex={active ? 0 : -1}
                    onClick={() => switchMode(modeKey)}
                    onKeyDown={(e) =>
                      handleRadioKeyDown(e, modeKeys, i, switchMode)
                    }
                    className="cursor-pointer transition-all duration-200 font-medium outline-none"
                    style={{ fontSize: "var(--font-size-body)" }}
                    style={{
                      flex: 1,
                      padding: "10px 0",
                      border: "none",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      backgroundColor: active ? "var(--color-accent)" : "transparent",
                      color: active ? "var(--color-button-primary-text)" : "var(--color-text-secondary)",
                    }}
                  >
                    {Icon && <Icon />}
                    {themeModes[modeKey].label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Style dropdown */}
          <div className="mb-6">
            <Label>Style</Label>
            <div className="relative">
              <button
                onClick={() => setShowStyleDropdown(!showStyleDropdown)}
                onBlur={() => setTimeout(() => setShowStyleDropdown(false), 150)}
                className="w-full text-left flex items-center justify-between cursor-pointer transition-all duration-200 font-medium outline-none"
                style={{
                  fontSize: "var(--font-size-body)",
                  padding: "12px 16px",
                  borderRadius: 12,
                  backgroundColor: "var(--color-bg-primary)",
                  border: `1.5px solid ${showStyleDropdown ? "var(--color-accent)" : "var(--color-border)"}`,
                  color: "var(--color-text-primary)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Swatch colors={modeGroup.themes[theme.mode].colors} />
                  {modeGroup.themes[theme.mode].name}
                </span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="transition-transform duration-200"
                  style={{
                    transform: showStyleDropdown ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="var(--color-text-tertiary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showStyleDropdown && (
                <div
                  className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-lg z-[100] overflow-y-auto p-1"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow:
                      "0 4px 12px var(--color-shadow)",
                  }}
                >
                  {styleEntries.map(([key, data]) => {
                    const active = theme.mode === key;
                    return (
                      <StyleOption
                        key={key}
                        data={data}
                        selected={active}
                        onSelect={() => switchStyle(key)}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Font dropdown */}
          <div className="mb-6">
            <Label>Font</Label>
            <div className="relative">
              <button
                onClick={() => setShowFontDropdown(!showFontDropdown)}
                onBlur={() => setTimeout(() => setShowFontDropdown(false), 150)}
                className="w-full text-left flex items-center justify-between cursor-pointer transition-all duration-200 font-medium outline-none"
                style={{
                  fontSize: "var(--font-size-body)",
                  padding: "12px 16px",
                  borderRadius: 12,
                  backgroundColor: "var(--color-bg-primary)",
                  border: `1.5px solid ${showFontDropdown ? "var(--color-accent)" : "var(--color-border)"}`,
                  color: "var(--color-text-primary)",
                }}
              >
                <span>{fonts[theme.font]?.name ?? "Inter"}</span>
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  className="transition-transform duration-200"
                  style={{
                    transform: showFontDropdown ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                >
                  <path
                    d="M1 1.5L6 6.5L11 1.5"
                    stroke="var(--color-text-tertiary)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {showFontDropdown && (
                <div
                  className="absolute top-[calc(100%+4px)] left-0 right-0 rounded-lg z-[100] max-h-60 overflow-y-auto p-1"
                  style={{
                    backgroundColor: "var(--color-bg-card)",
                    border: "1px solid var(--color-border)",
                    boxShadow:
                      "0 4px 12px var(--color-shadow)",
                  }}
                >
                  {Object.entries(fonts).map(([key, font]) => (
                    <FontOption
                      key={key}
                      font={font}
                      selected={theme.font === key}
                      onSelect={() => switchFont(key)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Font size */}
          <div>
            <Label>Text Size</Label>
            <div className="flex gap-3">
              {Object.entries(fontSizes).map(([key, size]) => {
                const selected = theme.fontSize === key;
                return (
                  <SizeButton
                    key={key}
                    selected={selected}
                    onClick={() => switchFontSize(key)}
                  >
                    {size.name}
                  </SizeButton>
                );
              })}
            </div>
          </div>
        </div>

        {/* Visually hidden live region for screen readers */}
        <div aria-live="polite" className="sr-only">{announcement}</div>
      </div>
    </div>
  );
}

/* ---- small private components ---- */


function SizeButton({ selected, onClick, children }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="cursor-pointer transition-all duration-200 font-medium"
      style={{
        fontSize: "var(--font-size-body)",
        flex: 1,
        padding: "12px",
        borderRadius: 12,
        backgroundColor: "var(--color-bg-primary)",
        border: `1.5px solid ${selected ? "var(--color-accent)" : hovered ? "var(--color-text-tertiary)" : "var(--color-border)"}`,
        color: selected ? "var(--color-accent)" : "var(--color-text-secondary)",
      }}
    >
      {children}
    </button>
  );
}

function StyleOption({ data, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseDown={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left border-none rounded-md cursor-pointer transition-all duration-150 font-medium flex items-center gap-2"
      style={{
        fontSize: "var(--font-size-body)",
        padding: "10px 12px",
        backgroundColor:
          selected || hovered ? "var(--color-bg-hover)" : "transparent",
        color: selected ? "var(--color-accent)" : "var(--color-text-primary)",
      }}
    >
      <Swatch colors={data.colors} />
      <span style={{ flex: 1 }}>{data.name}</span>
      {selected && (
        <span style={{ color: "var(--color-accent)", display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  );
}

function FontOption({ font, selected, onSelect }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onMouseDown={onSelect}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="w-full text-left border-none rounded-md cursor-pointer transition-all duration-150 font-medium flex items-center gap-2"
      style={{
        fontSize: "var(--font-size-body)",
        padding: "10px 12px",
        fontFamily: font.family,
        backgroundColor:
          selected || hovered ? "var(--color-bg-hover)" : "transparent",
        color: selected ? "var(--color-accent)" : "var(--color-text-primary)",
      }}
    >
      <span style={{ flex: 1 }}>{font.name}</span>
      {selected && (
        <span style={{ color: "var(--color-accent)", display: "flex", alignItems: "center" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </span>
      )}
    </button>
  );
}
