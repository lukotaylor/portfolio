"use client";

import React, { useState, useEffect } from "react";
import Button from "../components/ui/Button";
import ToolkitBackLink from "../components/ui/ToolkitBackLink";
import IconButton from "../components/ui/IconButton";
import NavItem from "../components/ui/NavItem";
import Divider from "../components/ui/Divider";
import TimelinePill from "../components/ui/TimelinePill";
import Tooltip from "../components/ui/Tooltip";
import MosaicBackground from "../components/ui/MosaicBackground";
import ThemeCustomizer from "../sections/ThemeCustomizer";
import { useTheme } from "../components/ui/ThemeProvider";
import { FileText } from "lucide-react";
import { SiGithub } from "@icons-pack/react-simple-icons";

const LinkedInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

// ── Icons ─────────────────────────────────────────────────────────────────────
const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);
const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);
const BrushIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.622 17.897-10.68-2.913" /><path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" /><path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
  </svg>
);
const PaletteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill="currentColor" /><circle cx="17.5" cy="10.5" r=".5" fill="currentColor" /><circle cx="8.5" cy="7.5" r=".5" fill="currentColor" /><circle cx="6.5" cy="12.5" r=".5" fill="currentColor" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);
const CloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

// ── PostItCard ────────────────────────────────────────────────────────────────
function PostItCard({ label, text, rotate, offsetTop }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      onClick={() => setFlipped(!flipped)}
      style={{
        position: "relative",
        top: offsetTop,
        width: 116,
        height: 116,
        perspective: 700,
        cursor: "pointer",
        transform: `rotate(${rotate})`,
        flexShrink: 0,
      }}
    >
      <div style={{
        position: "relative",
        width: "100%",
        height: "100%",
        transformStyle: "preserve-3d",
        transition: "transform 0.45s ease",
        transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
      }}>
        {/* Front */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          backgroundColor: "var(--color-button-tonal-bg)",
          padding: "14px 16px",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "flex-start",
        }}>
          <span style={{ fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.3 }}>
            {label}
          </span>
        </div>
        {/* Back */}
        <div style={{
          position: "absolute",
          inset: 0,
          backfaceVisibility: "hidden",
          WebkitBackfaceVisibility: "hidden",
          transform: "rotateY(180deg)",
          backgroundColor: "var(--color-button-tonal-bg)",
          padding: "12px 14px",
          boxShadow: "2px 4px 12px rgba(0,0,0,0.2)",
          display: "flex",
          alignItems: "center",
        }}>
          <span style={{ fontSize: "var(--font-size-label)", color: "var(--color-text-primary)", lineHeight: 1.5, fontWeight: 500 }}>
            {text}
          </span>
        </div>
      </div>
    </div>
  );
}

// ── Nav config ────────────────────────────────────────────────────────────────
const NAV_GROUPS = [
  {
    label: "Foundations",
    items: [
      { id: "colors", label: "Colors" },
      { id: "typography", label: "Typography" },
    ],
  },
  {
    label: "UI Primitives",
    items: [
      { id: "button", label: "Button" },
      { id: "icon-button", label: "IconButton" },
      { id: "nav-item", label: "NavItem" },
      { id: "divider", label: "Divider" },
      { id: "timeline-pill", label: "TimelinePill" },
      { id: "tooltip", label: "Tooltip" },
      { id: "mosaic-background", label: "MosaicBackground" },
    ],
  },
  {
    label: "Text",
    items: [
      { id: "cs-paragraph", label: "Paragraph" },
      { id: "cs-quote", label: "Quote" },
      { id: "cs-highlight", label: "Highlight" },
      { id: "cs-list", label: "List" },
    ],
  },
  {
    label: "Cards",
    items: [
      { id: "cs-callout", label: "Callout" },
      { id: "cs-container", label: "Container" },
      { id: "cs-personas", label: "Personas" },
      { id: "cs-metrics", label: "Metrics" },
      { id: "cs-stat-grid", label: "Stat Grid" },
    ],
  },
  {
    label: "Structured",
    items: [
      { id: "cs-comparison", label: "Comparison" },
      { id: "cs-decision", label: "Decision" },
      { id: "cs-phases", label: "Phases" },
    ],
  },
  {
    label: "Media",
    items: [
      { id: "cs-carousel", label: "Carousel" },
      { id: "cs-flow", label: "Flow / Embed" },
    ],
  },
  {
    label: "Showcase",
    items: [
      { id: "composition", label: "Composition" },
      { id: "profile", label: "Profile" },
    ],
  },
];

const ALL_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

// ── Palette builder data ──────────────────────────────────────────────────────
const PALETTE_PRESETS = {
  dark: {
    label: "Dark",
    colors: {
      "--color-bg-primary": "#111111",
      "--color-bg-card": "#1b1a1a",
      "--color-bg-hover": "#1a1a1a",
      "--color-text-primary": "#ffffff",
      "--color-text-secondary": "#a1a1a1",
      "--color-text-tertiary": "#737373",
      "--color-accent": "#94a3b8",
      "--color-accent-hover": "#cbd5e1",
      "--color-border": "#2d2d2d",
      "--color-button-tonal-bg": "#1e2124",
      "--color-button-primary-text": "#0f172a",
    },
  },
  light: {
    label: "Light",
    colors: {
      "--color-bg-primary": "#e9eee9",
      "--color-bg-card": "#f5f8f5",
      "--color-bg-hover": "#ebf1ee",
      "--color-text-primary": "#121a13",
      "--color-text-secondary": "#3d5243",
      "--color-text-tertiary": "#6b7d70",
      "--color-accent": "#296f5a",
      "--color-accent-hover": "#275347",
      "--color-border": "#cdd5cd",
      "--color-button-tonal-bg": "#d8ebe5",
      "--color-button-primary-text": "#ffffff",
    },
  },
  nature: {
    label: "Nature",
    colors: {
      "--color-bg-primary": "#0a0e0b",
      "--color-bg-card": "#141b14",
      "--color-bg-hover": "#1f2820",
      "--color-text-primary": "#f0f4f1",
      "--color-text-secondary": "#a5b8a9",
      "--color-text-tertiary": "#6b8571",
      "--color-accent": "#86a289",
      "--color-accent-hover": "#a5b8a9",
      "--color-border": "#273527",
      "--color-button-tonal-bg": "#1a2419",
      "--color-button-primary-text": "#0a0e0b",
    },
  },
  desert: {
    label: "Desert",
    colors: {
      "--color-bg-primary": "#17100b",
      "--color-bg-card": "#2a1f19",
      "--color-bg-hover": "#28201a",
      "--color-text-primary": "#faf6f0",
      "--color-text-secondary": "#c9b8a5",
      "--color-text-tertiary": "#9a8775",
      "--color-accent": "#b76046",
      "--color-accent-hover": "#d17a62",
      "--color-border": "#5f4b39",
      "--color-button-tonal-bg": "#2a1e16",
      "--color-button-primary-text": "#ffffff",
    },
  },
  space: {
    label: "Space",
    colors: {
      "--color-bg-primary": "#0a0d1a",
      "--color-bg-card": "#1b1e37",
      "--color-bg-hover": "#1a1f33",
      "--color-text-primary": "#e8edf5",
      "--color-text-secondary": "#9ca5ba",
      "--color-text-tertiary": "#6b7589",
      "--color-accent": "#638bfc",
      "--color-accent-hover": "#7da3fc",
      "--color-border": "#2a2f4a",
      "--color-button-tonal-bg": "#1a2040",
      "--color-button-primary-text": "#0a0d1a",
    },
  },
  ocean: {
    label: "Banana",
    colors: {
      "--color-bg-primary": "#fff0f3",
      "--color-bg-card": "#ffffff",
      "--color-bg-hover": "#fce4ec",
      "--color-text-primary": "#4a171e",
      "--color-text-secondary": "#880e4f",
      "--color-text-tertiary": "#ad1457",
      "--color-accent": "#d81b60",
      "--color-accent-hover": "#ad1457",
      "--color-border": "#f3d1da",
      "--color-button-tonal-bg": "#f8bbd0",
      "--color-button-primary-text": "#ffffff",
    },
  },
};

const COLOR_GROUPS = [
  {
    label: "Backgrounds",
    vars: [
      { key: "--color-bg-primary", label: "bg-primary" },
      { key: "--color-bg-card", label: "bg-card" },
      { key: "--color-bg-hover", label: "bg-hover" },
    ],
  },
  {
    label: "Text",
    vars: [
      { key: "--color-text-primary", label: "text-primary" },
      { key: "--color-text-secondary", label: "text-secondary" },
      { key: "--color-text-tertiary", label: "text-tertiary" },
    ],
  },
  {
    label: "Accent & UI",
    vars: [
      { key: "--color-accent", label: "accent" },
      { key: "--color-accent-hover", label: "accent-hover" },
      { key: "--color-border", label: "border" },
      { key: "--color-button-tonal-bg", label: "tonal-bg" },
      { key: "--color-button-primary-text", label: "btn-primary-text" },
    ],
  },
];

// ── Scrollspy hook ────────────────────────────────────────────────────────────
function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers = [];
    const visible = new Map();
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          visible.set(id, entry.isIntersecting);
          for (const sid of ids) {
            if (visible.get(sid)) { setActive(sid); break; }
          }
        },
        { rootMargin: "-20% 0px -60% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

// ── Layout helpers ────────────────────────────────────────────────────────────
function Section({ id, title, children, active }) {
  if (!active) return null;
  return (
    <section id={id} style={{ paddingBottom: 72 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 28 }}>
        <h2 style={{ margin: 0, fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)", whiteSpace: "nowrap" }}>
          {title}
        </h2>
        <div style={{ flex: 1, height: 1, backgroundColor: "var(--color-border)" }} />
      </div>
      {children}
    </section>
  );
}

function GroupLabel({ children }) {
  return (
    <p style={{ margin: "0 0 6px", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>
      {children}
    </p>
  );
}

function Specimen({ label, children, vertical = false }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
      <div style={{ display: "flex", flexDirection: vertical ? "column" : "row", alignItems: vertical ? "flex-start" : "center", gap: 12, flexWrap: "wrap" }}>
        {children}
      </div>
      {label && <span style={{ fontSize: "0.625rem", color: "var(--color-text-tertiary)", fontFamily: "monospace" }}>{label}</span>}
    </div>
  );
}

function SpecimenRow({ children, wrap = true }) {
  return (
    <div style={{ display: "flex", flexWrap: wrap ? "wrap" : "nowrap", gap: 32, alignItems: "flex-end" }}>
      {children}
    </div>
  );
}

function SubHeading({ children }) {
  return (
    <p style={{ margin: "0 0 16px", fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", fontWeight: 600 }}>
      {children}
    </p>
  );
}

function CodeSnippet({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--color-border)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 14px", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-button-tonal-bg)" }}>
        <span style={{ fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Schema</span>
        <button
          onClick={copy}
          style={{ display: "flex", alignItems: "center", gap: 5, fontSize: "var(--font-size-label)", color: copied ? "var(--color-accent)" : "var(--color-text-tertiary)", cursor: "pointer", border: "none", background: "none", padding: "2px 6px", borderRadius: 4, transition: "color 0.15s" }}
        >
          <CopyIcon />
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre style={{ margin: 0, padding: "14px 16px", fontSize: "var(--font-size-small)", lineHeight: 1.7, fontFamily: "monospace", color: "var(--color-text-secondary)", overflowX: "auto", whiteSpace: "pre", backgroundColor: "var(--color-bg-card)" }}>
        {code}
      </pre>
    </div>
  );
}

function Swatch({ cssVar, label }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <div style={{ width: 56, height: 56, borderRadius: 10, backgroundColor: `var(${cssVar})`, border: "1px solid var(--color-border)", boxShadow: "0 1px 4px var(--color-shadow)" }} />
      <span style={{ fontSize: "0.5625rem", color: "var(--color-text-tertiary)", fontFamily: "monospace", maxWidth: 64, wordBreak: "break-all", lineHeight: 1.4 }}>{label}</span>
    </div>
  );
}

function TypeSample({ size, label, color = "var(--color-text-primary)" }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, padding: "10px 0", borderBottom: "1px solid var(--color-border)" }}>
      <span style={{ fontSize: "0.625rem", color: "var(--color-text-tertiary)", fontFamily: "monospace", width: 88, flexShrink: 0 }}>{label}</span>
      <span style={{ fontSize: size, color, lineHeight: 1.3 }}>The quick brown fox</span>
    </div>
  );
}

function HighlightedText({ text }) {
  const parts = text.split(/(==.+?==|\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("==") && part.endsWith("=="))
          return <mark key={i} style={{ backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", borderRadius: 4, padding: "1px 4px", fontWeight: 600, fontStyle: "normal" }}>{part.slice(2, -2)}</mark>;
        if (part.startsWith("**") && part.endsWith("**"))
          return <span key={i} style={{ color: "var(--color-accent)", fontWeight: 600 }}>{part.slice(2, -2)}</span>;
        return part;
      })}
    </>
  );
}

// ── Side nav item ─────────────────────────────────────────────────────────────
function SideNavItem({ children, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", width: "100%", textAlign: "left",
        background: "none", border: "none", padding: "5px 10px", borderRadius: 6,
        fontSize: "var(--font-size-small)",
        fontWeight: active ? 600 : 400,
        color: active ? "var(--color-accent)" : hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
        backgroundColor: active ? "var(--color-button-tonal-bg)" : hovered ? "var(--color-bg-hover)" : "transparent",
        cursor: "pointer", transition: "all 0.15s",
      }}
    >
      {children}
    </button>
  );
}

// ── Palette builder ───────────────────────────────────────────────────────────
function ColorRow({ cssVar, label, value, onChange }) {
  const [text, setText] = useState(value);

  useEffect(() => { setText(value); }, [value]);

  const isHex = /^#[0-9a-f]{6}$/i.test(value);

  function handleText(e) {
    const v = e.target.value;
    setText(v);
    if (/^#[0-9a-f]{6}$/i.test(v)) onChange(v);
  }

  function handlePicker(e) {
    const v = e.target.value;
    setText(v);
    onChange(v);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      {/* Color swatch / picker trigger */}
      <label style={{ position: "relative", width: 28, height: 28, borderRadius: 6, overflow: "hidden", border: "1px solid var(--color-border)", flexShrink: 0, cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: isHex ? value : "#888888" }} />
        <input
          type="color"
          value={isHex ? value : "#888888"}
          onChange={handlePicker}
          style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer", border: "none", padding: 0 }}
        />
      </label>
      {/* Var name */}
      <span style={{ fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", fontFamily: "monospace", width: 120, flexShrink: 0 }}>{label}</span>
      {/* Hex input */}
      <input
        type="text"
        value={text}
        onChange={handleText}
        spellCheck={false}
        style={{
          flex: 1, padding: "4px 8px", borderRadius: 6,
          border: "1px solid var(--color-border)",
          backgroundColor: "var(--color-bg-hover)",
          color: "var(--color-text-primary)",
          fontSize: "var(--font-size-label)", fontFamily: "monospace",
          outline: "none",
        }}
      />
    </div>
  );
}

// ── Palette preview: Composition ─────────────────────────────────────────────
function CompositionPreview({ p }) {
  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"], display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 40px" }}>
      <div style={{ width: "100%", maxWidth: 700 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${p["--color-border"]}`, boxShadow: "0 4px 32px rgba(0,0,0,0.18)" }}>
          {/* Card header */}
          <div style={{ padding: "28px 28px 22px", backgroundColor: p["--color-bg-hover"] }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "var(--font-size-label)", color: p["--color-text-secondary"], fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Product Design</p>
                <h3 style={{ margin: 0, fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>Acme Corp — Senior Designer</h3>
              </div>
              <span style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 8, padding: "4px 12px", fontSize: "var(--font-size-small)", fontWeight: 500, whiteSpace: "nowrap", marginTop: 4 }}>2022 – Present</span>
            </div>
          </div>
          {/* Card body */}
          <div style={{ padding: "24px 28px 28px", backgroundColor: p["--color-bg-card"] }}>
            <p style={{ margin: "0 0 14px", fontSize: "var(--font-size-body)", color: p["--color-text-secondary"], lineHeight: 1.7 }}>
              Led end-to-end design for the core product, from discovery through delivery.{" "}
              <mark style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 4, padding: "1px 5px", fontWeight: 600, fontStyle: "normal" }}>Collaborated closely with engineering</mark>
              {" "}and stakeholders to ship high-quality experiences at scale.
            </p>
            {/* Metrics */}
            <div style={{ display: "flex", gap: 40, padding: "20px 0", borderTop: `1px solid ${p["--color-border"]}`, borderBottom: `1px solid ${p["--color-border"]}`, marginBottom: 20 }}>
              {[["$12.3M", "ARR Generated"], ["150%", "Recognition Increase"], ["55%", "Adoption Goal"]].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 600, color: p["--color-accent"], lineHeight: 1.1 }}>{val}</div>
                  <div style={{ fontSize: "var(--font-size-small)", color: p["--color-text-tertiary"], fontWeight: 500, marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
            {/* Buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{ height: 40, padding: "0 20px", borderRadius: 999, fontSize: "var(--font-size-body)", fontWeight: 500, backgroundColor: p["--color-accent"], color: p["--color-button-primary-text"], display: "inline-flex", alignItems: "center", gap: 6 }}>
                <ArrowIcon /> View Case Study
              </span>
              <span style={{ height: 40, padding: "0 20px", borderRadius: 999, fontSize: "var(--font-size-body)", fontWeight: 500, border: `1px solid ${p["--color-border"]}`, color: p["--color-text-primary"], display: "inline-flex", alignItems: "center" }}>Details</span>
              <span style={{ height: 40, width: 40, borderRadius: 999, backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}>
                <HeartIcon />
              </span>
            </div>
            {/* Quote */}
            <blockquote style={{ position: "relative", margin: 0, padding: "20px 24px 20px 48px", borderLeft: `4px solid ${p["--color-accent"]}`, backgroundColor: p["--color-button-tonal-bg"], borderRadius: "0 14px 14px 0" }}>
              <span style={{ position: "absolute", top: 10, left: 14, fontSize: "2.5rem", lineHeight: 1, color: p["--color-accent"], fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
              <p style={{ margin: 0, marginTop: 4, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: p["--color-text-primary"], fontWeight: 500 }}>
                I just want to give rewards without switching between five different tools.
              </p>
              <footer style={{ marginTop: 10, fontSize: "var(--font-size-small)", color: p["--color-text-tertiary"] }}>— HR Admin, usability session</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Palette preview: Landing Page ─────────────────────────────────────────────
function LandingPagePreview({ p }) {
  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"], padding: "28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", gap: 20 }}>
        {/* Sidebar */}
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ backgroundColor: p["--color-bg-card"], borderRadius: 20, padding: "28px 24px 32px" }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg, ${p["--color-accent"]} 0%, ${p["--color-bg-hover"]} 100%)`, margin: "0 auto 20px", overflow: "hidden" }}>
              <img src="/me.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
            </div>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <p style={{ margin: "0 0 4px", fontSize: "var(--font-size-body)", fontWeight: 600, color: p["--color-text-primary"] }}>Taylor</p>
              <p style={{ margin: "0 0 3px", fontSize: "var(--font-size-body)", fontWeight: 500, color: p["--color-accent"] }}>Designer & Builder</p>
              <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: p["--color-text-secondary"] }}>7.5 YOE in B2B & B2B2C</p>
            </div>
            <ul style={{ listStyle: "none", padding: 0, margin: "0 0 18px", display: "flex", flexDirection: "column", gap: 8 }}>
              {["Collaborative design partner who turns user feedback into product strategy.", "Speedy at design execution while prioritizing polished experiences.", "Experienced building for connected systems and cross-platform solutions."].map((text, i) => (
                <li key={i} style={{ display: "flex", gap: 8 }}>
                  <span style={{ color: p["--color-accent"], fontSize: "0.5rem", marginTop: "0.4em", flexShrink: 0 }}>✦</span>
                  <span style={{ fontSize: "var(--font-size-small)", color: p["--color-text-secondary"], lineHeight: 1.6 }}>{text}</span>
                </li>
              ))}
            </ul>
            <div style={{ display: "flex", gap: 8, fontSize: "var(--font-size-body)", fontWeight: 600, color: p["--color-accent"] }}>
              <span>LinkedIn</span><span style={{ color: p["--color-text-tertiary"] }}>·</span>
              <span>Email</span><span style={{ color: p["--color-text-tertiary"] }}>·</span>
              <span>Github</span>
            </div>
          </div>
        </div>
        {/* Feed */}
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: p["--color-bg-card"], borderRadius: 20, padding: "28px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: p["--color-bg-primary"], flexShrink: 0, overflow: "hidden" }}>
                <img src="/logos/paylocity.png" alt="" style={{ width: "100%", height: "100%", objectFit: "contain" }} onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <p style={{ margin: 0, fontSize: "var(--font-size-body)", color: p["--color-text-secondary"], lineHeight: 1.6 }}>
                At <span style={{ fontWeight: 600, color: p["--color-text-primary"] }}>Paylocity</span>, solo-designed a Recognition & Rewards platform from 0→1 that generated $12.3M ARR and increased recognition rates by 150%.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ gridRow: "1 / 3", borderRadius: 12, overflow: "hidden", backgroundColor: p["--color-bg-hover"], minHeight: 140 }}>
                <img src="/cover/rewards-management.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <div style={{ aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", backgroundColor: p["--color-bg-hover"] }}>
                <img src="/cover/recognition.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; }} />
              </div>
              <div style={{ aspectRatio: "16/9", borderRadius: 12, backgroundColor: p["--color-bg-hover"] }} />
            </div>
          </div>
          {/* Card 2 */}
          <div style={{ backgroundColor: p["--color-bg-card"], borderRadius: 20, padding: "28px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: p["--color-bg-hover"], flexShrink: 0 }} />
              <p style={{ margin: 0, fontSize: "var(--font-size-body)", color: p["--color-text-secondary"], lineHeight: 1.6 }}>
                At <span style={{ fontWeight: 600, color: p["--color-text-primary"] }}>Previous Co.</span>, led design systems and cross-platform product design across mobile and desktop.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div style={{ aspectRatio: "16/9", borderRadius: 12, backgroundColor: p["--color-bg-hover"] }} />
              <div style={{ aspectRatio: "16/9", borderRadius: 12, backgroundColor: p["--color-bg-hover"], opacity: 0.6 }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Palette preview: Case Study ───────────────────────────────────────────────
function CaseStudyPreview({ p }) {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["The Problem", "Impact & Outcomes", "Research & Discovery", "Key Personas", "Constraints", "Key Takeaway"];

  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"] }}>
      {/* Top bar */}
      <div style={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: p["--color-bg-primary"], borderBottom: `1px solid ${p["--color-border"]}`, padding: "14px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--font-size-body)", fontWeight: 500, color: p["--color-accent"], cursor: "default" }}>← Work</span>
        <span style={{ color: p["--color-border"], userSelect: "none" }}>|</span>
        <span style={{ fontSize: "var(--font-size-body)", color: p["--color-text-secondary"] }}>Recognition & Rewards — 0→1 Design</span>
      </div>

      <div style={{ display: "flex", maxWidth: 1060, margin: "0 auto", padding: "0 32px" }}>
        {/* Section nav */}
        <aside style={{ width: 180, flexShrink: 0, position: "sticky", top: 53, height: "calc(100vh - 53px)", overflowY: "auto", padding: "28px 20px 28px 0", borderRight: `1px solid ${p["--color-border"]}`, marginRight: 40 }}>
          <p style={{ margin: "0 0 10px", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: p["--color-text-tertiary"] }}>Sections</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {sections.map((label, i) => (
              <button key={i} onClick={() => setActiveSection(i)} style={{ display: "block", width: "100%", textAlign: "left", background: "none", border: "none", padding: "6px 10px", borderRadius: 6, fontSize: "var(--font-size-small)", cursor: "pointer", fontWeight: activeSection === i ? 600 : 400, color: activeSection === i ? p["--color-accent"] : p["--color-text-secondary"], backgroundColor: activeSection === i ? p["--color-button-tonal-bg"] : "transparent" }}>
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, minWidth: 0, padding: "32px 0 80px" }}>
          {/* Hero */}
          <div style={{ backgroundColor: p["--color-bg-hover"], borderRadius: 16, padding: "28px", marginBottom: 36, overflow: "hidden" }}>
            <span style={{ fontSize: "var(--font-size-label)", fontWeight: 600, color: p["--color-accent"], textTransform: "uppercase", letterSpacing: "0.08em" }}>Case Study · Paylocity</span>
            <h1 style={{ margin: "10px 0 0", fontSize: "1.5rem", fontWeight: 700, color: p["--color-text-primary"], lineHeight: 1.3 }}>
              Solo-designed an admin-facing rewards infrastructure from 0→1 ($12.3M ARR)
            </h1>
            <p style={{ margin: "12px 0 0", fontSize: "var(--font-size-body)", color: p["--color-text-secondary"] }}>Solo designer · 2023–2024 · B2B SaaS</p>
          </div>

          {/* Problem */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>The Problem</h2>
            <p style={{ margin: "0 0 16px", fontSize: "var(--font-size-body)", color: p["--color-text-primary"], lineHeight: 1.7 }}>
              Companies relied on external tools to give tangible rewards.{" "}
              <mark style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 4, padding: "1px 5px", fontWeight: 600, fontStyle: "normal" }}>This created a fragmented experience</mark>
              {" "}across key archetypes — admins, managers, and employees.
            </p>
            <div style={{ borderRadius: 12, overflow: "hidden", backgroundColor: p["--color-bg-hover"], aspectRatio: "16/6" }}>
              <img src="/cover/rewards-management.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} onError={(e) => { e.target.style.display = "none"; }} />
            </div>
          </div>

          {/* Metrics */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 20px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>Impact & Outcomes</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
              {[["$12.3M", "ARR Generated"], ["$500K", "Moved Between Wallets"], ["55%", "Adoption Goal Met"]].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: "center", padding: "8px 0" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: 600, color: p["--color-accent"], lineHeight: 1.1 }}>{val}</div>
                  <p style={{ margin: "6px 0 0", fontSize: "var(--font-size-body)", fontWeight: 500, color: p["--color-text-primary"] }}>{lbl}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Personas */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>Key Personas</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
              {[
                { img: "https://www.tapback.co/api/avatar/y.webp", name: "HR Admin", role: "Power user", jtbd: "I want to fund and manage rewards in one place so managers have what they need." },
                { img: "https://www.tapback.co/api/avatar/p.webp", name: "Manager", role: "Frequent user", jtbd: "I want to reward employees for great work to reinforce desired behaviors." },
                { img: "https://www.tapback.co/api/avatar/ja.webp", name: "Employee", role: "Occasional user", jtbd: "I want to view and redeem rewards so I understand what I'm being recognized for." },
              ].map((persona) => (
                <div key={persona.name} style={{ backgroundColor: p["--color-button-tonal-bg"], borderRadius: 14, padding: 16, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", textAlign: "center" }}>
                  <img src={persona.img} alt={persona.name} style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "var(--font-size-body)", color: p["--color-text-primary"] }}>{persona.name}</div>
                    <div style={{ fontSize: "var(--font-size-small)", color: p["--color-accent"], fontWeight: 500 }}>{persona.role}</div>
                  </div>
                  <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: p["--color-text-primary"], lineHeight: 1.6 }}>{persona.jtbd}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>In Their Words</h2>
            <blockquote style={{ position: "relative", margin: 0, padding: "24px 28px 24px 52px", borderLeft: `4px solid ${p["--color-accent"]}`, backgroundColor: p["--color-button-tonal-bg"], borderRadius: "0 16px 16px 0" }}>
              <span style={{ position: "absolute", top: 12, left: 16, fontSize: "3rem", lineHeight: 1, color: p["--color-accent"], fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
              <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: p["--color-text-primary"], fontWeight: 500 }}>
                I just want to be able to give rewards without having to switch between five different tools. It kills the momentum of recognizing someone in the moment.
              </p>
              <footer style={{ marginTop: 12, fontSize: "var(--font-size-small)", color: p["--color-text-tertiary"] }}>— HR Admin, usability session</footer>
            </blockquote>
          </div>

          {/* Callout */}
          <div>
            <h2 style={{ margin: "0 0 16px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>Key Takeaway</h2>
            <div style={{ backgroundColor: p["--color-bg-card"], border: `2px solid ${p["--color-border"]}`, borderRadius: 12, padding: "20px 24px" }}>
              <h4 style={{ margin: "0 0 8px", fontSize: "var(--font-size-body)", fontWeight: 600, color: p["--color-text-primary"] }}>Leverage the credibility of others</h4>
              <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: p["--color-text-primary"] }}>
                I learned to leverage the credibility of others when I'm the only one advocating for users in a room full of engineers.{" "}
                <mark style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 4, padding: "1px 5px", fontWeight: 600, fontStyle: "normal" }}>Bringing in the design system team as allies</mark>
                {" "}helped us land a compromise that prioritized the user.
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Palette builder (full screen) ─────────────────────────────────────────────
function PaletteBuilder({ onClose }) {
  const { theme } = useTheme();
  const [palette, setPalette] = useState(() => {
    return { ...(PALETTE_PRESETS[theme.mode] ?? PALETTE_PRESETS.dark).colors };
  });
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [previewTab, setPreviewTab] = useState("composition");

  function applyPreset(key) {
    setPalette({ ...PALETTE_PRESETS[key].colors });
    setActivePreset(key);
  }

  function update(cssVar, value) {
    setActivePreset(null);
    setPalette((prev) => ({ ...prev, [cssVar]: value }));
  }

  function copyCSS() {
    const lines = Object.entries(palette).map(([k, v]) => `  ${k}: ${v};`).join("\n");
    navigator.clipboard.writeText(`[data-theme="custom"] {\n${lines}\n}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const p = palette;

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }}>

      {/* ── Left: Preview ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Preview tab bar */}
        <div style={{
          flexShrink: 0, padding: "12px 24px",
          backgroundColor: p["--color-bg-card"],
          borderBottom: `1px solid ${p["--color-border"]}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}>
          <p style={{ margin: 0, fontSize: "var(--font-size-label)", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: p["--color-text-tertiary"] }}>Preview</p>
          <div style={{ display: "flex", gap: 2, backgroundColor: p["--color-bg-hover"], borderRadius: 8, padding: 3 }}>
            {[["composition", "Composition"], ["landing", "Landing Page"], ["casestudy", "Case Study"]].map(([tab, label]) => (
              <button
                key={tab}
                onClick={() => setPreviewTab(tab)}
                style={{
                  padding: "5px 14px", borderRadius: 6, border: "none", cursor: "pointer",
                  fontSize: "var(--font-size-small)", fontWeight: previewTab === tab ? 600 : 400,
                  backgroundColor: previewTab === tab ? p["--color-bg-card"] : "transparent",
                  color: previewTab === tab ? p["--color-text-primary"] : p["--color-text-tertiary"],
                  boxShadow: previewTab === tab ? "0 1px 4px rgba(0,0,0,0.12)" : "none",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Preview scroll area */}
        <div style={{ flex: 1, overflowY: "auto", backgroundColor: p["--color-bg-primary"] }}>
          {previewTab === "composition" && <CompositionPreview p={p} />}
          {previewTab === "landing" && <LandingPagePreview p={p} />}
          {previewTab === "casestudy" && <CaseStudyPreview p={p} />}
        </div>
      </div>

      {/* ── Right: Builder controls ── */}
      <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg-card)", borderLeft: "1px solid var(--color-border)", boxShadow: "-8px 0 40px var(--color-shadow)" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
          <div>
            <p style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 600, color: "var(--color-text-primary)" }}>Palette Builder</p>
            <p style={{ margin: 0, fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", marginTop: 1 }}>Changes only affect the preview</p>
          </div>
          <IconButton icon={<CloseIcon />} variant="ghost" size="sm" ariaLabel="Close" onClick={onClose} />
        </div>

        {/* Scrollable controls */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px" }}>
          {/* Presets */}
          <div style={{ marginBottom: 20 }}>
            <p style={{ margin: "0 0 10px", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>Start from preset</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {Object.entries(PALETTE_PRESETS).map(([key, preset]) => {
                const isActive = activePreset === key;
                return (
                  <button key={key} onClick={() => applyPreset(key)} style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", borderRadius: 20, fontSize: "var(--font-size-small)", fontWeight: 500, border: `1px solid ${isActive ? preset.colors["--color-accent"] : "var(--color-border)"}`, backgroundColor: isActive ? preset.colors["--color-button-tonal-bg"] : "transparent", color: isActive ? preset.colors["--color-accent"] : "var(--color-text-secondary)", cursor: "pointer", transition: "all 0.15s" }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: preset.colors["--color-accent"], flexShrink: 0 }} />
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ height: 1, backgroundColor: "var(--color-border)", margin: "0 0 20px" }} />

          {/* Color pickers */}
          {COLOR_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 20 }}>
              <p style={{ margin: "0 0 10px", fontSize: "0.625rem", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--color-text-tertiary)" }}>{group.label}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.vars.map(({ key, label }) => (
                  <ColorRow key={key} cssVar={key} label={label} value={palette[key]} onChange={(v) => update(key, v)} />
                ))}
              </div>
            </div>
          ))}

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, paddingTop: 4, paddingBottom: 8 }}>
            <Button variant="primary" size="sm" icon={<CopyIcon />} onClick={copyCSS} fullWidth>
              {copied ? "Copied!" : "Copy CSS"}
            </Button>
            <Button variant="secondary" size="sm" onClick={() => applyPreset(theme.mode in PALETTE_PRESETS ? theme.mode : "dark")}>
              Reset
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

// ── New block preview components ─────────────────────────────────────────────

function DSContainerPreview() {
  const ICONS = {
    alert:          <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
    ban:            <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
    globe:          <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
    lock:           <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
    clock:          <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
    "trending-down":<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
    zap:            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
    flag:           <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
    users:          <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    star:           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
  };

  const textItems = [
    { title: "Cash-only redemption", description: "7% of employees can't use the feature — paper check recipients are excluded entirely.", footnote: "Paylocity payroll data, Q3 2023" },
    { title: "No gift card parity", description: "Companies refused to migrate without parity. Established providers all offer native gift card catalogs." },
    { title: "USD-only currencies", description: "No support for non-USD currencies limits the product from scaling internationally." },
  ];

  const iconItems = [
    { icon: "ban",    title: "Cash-only redemption", description: "7% of employees can't use the feature — paper check recipients are excluded." },
    { icon: "alert",  title: "No gift card parity",  description: "Companies refused to migrate. This became a $700K competitive gap." },
    { icon: "globe",  title: "USD-only currencies",  description: "No support for non-USD limits international adoption." },
  ];

  const cardStyle = { borderRadius: 12, display: "flex", flexDirection: "column", backgroundColor: "var(--color-button-tonal-bg)" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* Variation 1: Text-only */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Text only</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {textItems.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ paddingBottom: item.footnote ? 12 : 0 }}>
                  <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: item.description ? 4 : 0 }}>{item.title}</div>
                  {item.description && <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{item.description}</div>}
                </div>
                {item.footnote && (
                  <div style={{ fontSize: "0.75rem", color: "var(--color-text-tertiary)", lineHeight: 1.5, margin: "auto -16px -14px", padding: "10px 16px", backgroundColor: "var(--color-bg-primary)", borderRadius: "0 0 10px 10px" }}>
                    {item.footnote}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Variation 2: With icons */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>With icon</p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {iconItems.map((item, i) => (
            <div key={i} style={cardStyle}>
              <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column" }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10, flexShrink: 0, display: "block" }}>
                  {ICONS[item.icon]}
                </svg>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "var(--color-text-primary)", marginBottom: 4 }}>{item.title}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DSComparisonPreview() {
  const options = [
    {
      label: "Option A: Build our own flow",
      items: [
        { type: "pro", text: "Users see their claim code immediately — fewer steps to start spending rewards." },
        { type: "pro", text: "Full control over the experience and future iteration." },
        { type: "con", text: "Longer development time; delays go-to-market timeline." },
        { type: "con", text: "Higher engineering risk — building from scratch with new API." },
      ],
    },
    {
      label: "Option B: Reskin Tango's experience",
      items: [
        { type: "pro", text: "Faster launch, lower engineering lift, reduced delivery risk." },
        { type: "pro", text: "Tried-and-true flow that Tango users already understand." },
        { type: "con", text: "Tedious multi-step process — copy security code, open link, paste, retrieve code." },
        { type: "con", text: "Less control over UX; dependent on Tango's implementation." },
      ],
    },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
      {options.map((option, oi) => (
        <div key={oi} style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border)" }}>
          <div style={{ padding: "12px 16px", backgroundColor: "var(--color-button-tonal-bg)", borderBottom: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-accent)" }}>{option.label}</span>
          </div>
          <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, backgroundColor: "var(--color-bg-card)" }}>
            {option.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, fontSize: "0.75rem", marginTop: "0.15em", color: item.type === "pro" ? "#22c55e" : "#ef4444" }}>
                  {item.type === "pro" ? "✓" : "✗"}
                </span>
                <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.6 }}>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function DSPhasesPreview() {
  const phases = [
    { label: "Discovery", duration: "7 weeks", description: "Synthesized 9 data sources including 13 user interviews, SUS surveys, competitive analysis, and a full heuristic evaluation." },
    { label: "Synthesis", duration: "Ongoing", description: "220 findings organized into a filterable Excel source-of-truth. Translated into 6 guiding design principles." },
    { label: "Direction", duration: "4 weeks", description: "Translated findings into a holistic product vision — restructured IA, resolved feature ambiguity, expanded lifecycle." },
    { label: "Handoff", duration: "1 week", description: "Presented to leadership and Product. Findings directly informed roadmap planning for the Web Platform migration." },
  ];
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", top: 18, left: 18, right: 18, height: 2, backgroundColor: "var(--color-border)", zIndex: 0 }} />
      <div style={{ display: "grid", gridTemplateColumns: `repeat(${phases.length}, 1fr)`, gap: 16, position: "relative", zIndex: 1 }}>
        {phases.map((phase, pi) => (
          <div key={pi} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <span style={{ fontSize: "0.75rem", fontWeight: 700, color: "var(--color-button-primary-text)" }}>{pi + 1}</span>
            </div>
            <div>
              <div style={{ fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 2 }}>{phase.label}</div>
              <div style={{ fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-accent)", marginBottom: 6 }}>{phase.duration}</div>
              <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>{phase.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DSDecisionTable({ rows }) {
  return (
    <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--color-border)" }}>
      {rows.map((row, ri) => (
        <div
          key={ri}
          style={{
            display: "grid", gridTemplateColumns: "120px 1fr",
            borderBottom: ri < rows.length - 1 ? "1px solid var(--color-border)" : "none",
            backgroundColor: ri === 0 ? "var(--color-button-tonal-bg)" : "var(--color-bg-card)",
          }}
        >
          <div style={{ padding: "14px 16px", borderRight: "1px solid var(--color-border)", display: "flex", alignItems: "flex-start" }}>
            <span style={{ fontSize: "var(--font-size-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: ri === 0 ? "var(--color-accent)" : "var(--color-text-tertiary)" }}>
              {row.label}
            </span>
          </div>
          <div style={{ padding: "14px 20px" }}>
            <span style={{ fontSize: "var(--font-size-body)", color: ri === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)", lineHeight: 1.6, fontWeight: ri === 0 ? 600 : 400 }}>
              {row.value}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

function DSDecisionPreview() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Decision / Why / Trade-off</p>
        <DSDecisionTable rows={[
          { label: "What we chose", value: "Reskin Tango's existing redemption experience for MVP" },
          { label: "Why", value: "Prioritized speed to market and reduced technical risk. Tango's flow is tried-and-true — launching faster meant closing a $700K sales gap before competitors could." },
          { label: "Trade-off", value: "A more tedious redemption process for users (copy code → open link → paste → retrieve). Mitigated with strong content hierarchy and clear step-by-step guidance. Revisiting post-launch." },
        ]} />
      </div>
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Constraint / Solution / Trade-off</p>
        <DSDecisionTable rows={[
          { label: "Constraint", value: "Large datasets (500+ employees) weren't loading properly — the table experience failed for any company above that threshold." },
          { label: "Our Solution", value: "Limited Reward Givers to managers only. Simplified wallet management by avoiding bulk loading of all employee wallets at once." },
          { label: "Trade-off", value: "MVP won't support peer-to-peer rewards. Engineering spiked a long-term fix that doesn't compromise UX — planned for post-launch." },
        ]} />
      </div>
    </div>
  );
}

function DSStatGridPreview() {
  const items = [
    { value: "87", label: "SUS survey responses" },
    { value: "221", label: "In-product feedback submissions" },
    { value: "172", label: "Product development requests" },
    { value: "60", label: "Competitive feature gaps (Sales)" },
    { value: "13", label: "User interviews" },
    { value: "24", label: "IA tree testing tasks" },
    { value: "22", label: "Heuristic evaluation tasks" },
    { value: "6", label: "Direct & indirect competitors" },
    { value: "1yr", label: "Utilization data analyzed" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
      {items.map((item, si) => (
        <div key={si} style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 10, padding: "14px 16px" }}>
          <div style={{ fontSize: "var(--font-size-heading)", fontWeight: 700, color: "var(--color-accent)", lineHeight: 1.1, marginBottom: 4 }}>{item.value}</div>
          <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}

// ── Carousel components ───────────────────────────────────────────────────────
function DSCarouselArrow({ direction, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = direction === "left";
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${isLeft ? "Previous" : "Next"} image`}
      style={{
        position: "absolute",
        [isLeft ? "left" : "right"]: "-20px",
        top: "50%",
        transform: `translateY(-50%)${hovered ? " scale(1.1)" : ""}`,
        zIndex: 2,
        width: 40,
        height: 40,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        border: "none",
        boxShadow: hovered ? "0 4px 16px var(--color-shadow)" : "0 2px 8px var(--color-shadow)",
        backgroundColor: hovered ? "var(--color-accent)" : "var(--color-bg-primary)",
        color: hovered ? "var(--color-button-primary-text)" : "var(--color-accent)",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points={isLeft ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

function CarouselBlockDemo() {
  const items = [
    { src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop", caption: "Program & wallets overview" },
    { src: "https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=800&h=450&fit=crop", caption: "Fund distribution to boost wallets" },
    { src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop", caption: "Transaction history" },
  ];
  const [index, setIndex] = useState(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <p style={{ margin: 0, fontSize: "var(--font-size-body)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
        Used in case study blocks (<code style={{ fontSize: "var(--font-size-small)", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>type: "carousel"</code>) to show multiple screens or flows. Navigation via arrow buttons; position tracked by dot indicators.
      </p>

      {/* Carousel with dots */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Dot navigation</p>
        <div style={{ position: "relative", padding: "0 28px" }}>
          <div style={{ borderRadius: 12, overflow: "hidden" }}>
            <img
              src={items[index].src}
              alt={items[index].caption}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>
          {index > 0 && <DSCarouselArrow direction="left" onClick={() => setIndex(index - 1)} />}
          {index < items.length - 1 && <DSCarouselArrow direction="right" onClick={() => setIndex(index + 1)} />}
        </div>
        {items[index].caption && (
          <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
            {items[index].caption}
          </p>
        )}
        <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 12 }}>
          {items.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              style={{
                width: idx === index ? "28px" : "8px",
                height: "8px",
                borderRadius: 4,
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s",
                backgroundColor: idx === index ? "var(--color-accent)" : "var(--color-border)",
              }}
            />
          ))}
        </div>
      </div>

      {/* Thumbnail variant */}
      <div>
        <p style={{ margin: "0 0 12px", fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>Thumbnail navigation</p>
        <ThumbnailCarouselDemo items={items} />
      </div>
    </div>
  );
}

function ThumbnailCarouselDemo({ items }) {
  const [index, setIndex] = useState(0);
  return (
    <div>
      <div style={{ position: "relative", padding: "0 28px" }}>
        <div style={{ borderRadius: 12, overflow: "hidden" }}>
          <img
            src={items[index].src}
            alt={items[index].caption}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>
        {index > 0 && <DSCarouselArrow direction="left" onClick={() => setIndex(index - 1)} />}
        {index < items.length - 1 && <DSCarouselArrow direction="right" onClick={() => setIndex(index + 1)} />}
      </div>
      {items[index].caption && (
        <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
          {items[index].caption}
        </p>
      )}
      <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", paddingBottom: 2, justifyContent: "center" }}>
        {items.map((item, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            aria-label={`Go to image ${idx + 1}`}
            style={{
              flexShrink: 0,
              width: 120,
              height: 68,
              padding: 0,
              border: idx === index ? "2px solid var(--color-accent)" : "2px solid transparent",
              borderRadius: 6,
              overflow: "hidden",
              cursor: "pointer",
              opacity: idx === index ? 1 : 0.45,
              transition: "opacity 0.2s, border-color 0.2s",
              background: "none",
            }}
            onMouseEnter={e => { if (idx !== index) e.currentTarget.style.opacity = 0.75; }}
            onMouseLeave={e => { if (idx !== index) e.currentTarget.style.opacity = 0.45; }}
          >
            <img src={item.src} alt={`Thumbnail ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function DesignSystemPage() {
  const [customizerOpen, setCustomizerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("work");
  const [activeSection, setActiveSection] = useState(ALL_IDS[0]);

  return (
    <div style={{ backgroundColor: "var(--color-bg-primary)", minHeight: "100vh", transition: "background-color 0.3s" }}>

      {/* ── Top bar ── */}
      <div style={{
        borderBottom: "1px solid var(--color-border)", padding: "16px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100, backgroundColor: "var(--color-bg-primary)",
      }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <ToolkitBackLink />
          <h1 style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 600, color: "var(--color-text-primary)" }}>Design System</h1>
          <p style={{ margin: 0, fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", marginTop: 1 }}>Kitchen sink — all components at a glance</p>
        </div>
      </div>

      {/* ── Two-column layout ── */}
      <div style={{ display: "flex", maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

        {/* ── Sidebar nav ── */}
        <aside style={{
          width: 180, flexShrink: 0, position: "sticky", top: 57,
          height: "calc(100vh - 57px)", overflowY: "auto",
          padding: "32px 20px 32px 0", borderRight: "1px solid var(--color-border)", marginRight: 48,
        }}>
          {NAV_GROUPS.map((group) => (
            <div key={group.label} style={{ marginBottom: 24 }}>
              <GroupLabel>{group.label}</GroupLabel>
              <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {group.items.map((item) => (
                  <SideNavItem key={item.id} active={activeSection === item.id} onClick={() => setActiveSection(item.id)}>
                    {item.label}
                  </SideNavItem>
                ))}
              </div>
            </div>
          ))}
        </aside>

        {/* ── Main content ── */}
        <main style={{ flex: 1, minWidth: 0, padding: "40px 0 96px" }}>

          <Section id="colors" title="Colors" active={activeSection === "colors"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                { label: "Backgrounds", swatches: [["--color-bg-primary","bg-primary"],["--color-bg-card","bg-card"],["--color-bg-hover","bg-hover"]] },
                { label: "Text", swatches: [["--color-text-primary","text-primary"],["--color-text-secondary","text-secondary"],["--color-text-tertiary","text-tertiary"]] },
                { label: "Accent & UI", swatches: [["--color-accent","accent"],["--color-accent-hover","accent-hover"],["--color-border","border"],["--color-button-tonal-bg","tonal-bg"],["--color-button-primary-text","btn-primary-text"]] },
              ].map(({ label, swatches }) => (
                <div key={label}>
                  <SubHeading>{label}</SubHeading>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                    {swatches.map(([cssVar, lbl]) => <Swatch key={cssVar} cssVar={cssVar} label={lbl} />)}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="typography" title="Typography" active={activeSection === "typography"}>
            {/* Scale specimens */}
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 32 }}>
              <TypeSample label="--font-size-display" size="var(--font-size-display)" />
              <TypeSample label="--font-size-heading" size="var(--font-size-heading)" />
              <TypeSample label="--font-size-body" size="var(--font-size-body)" />
              <TypeSample label="--font-size-small" size="var(--font-size-small)" color="var(--color-text-secondary)" />
              <TypeSample label="--font-size-label" size="var(--font-size-label)" color="var(--color-text-tertiary)" />
            </div>

            {/* Token reference table */}
            <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border)" }}>
              {/* Header */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", backgroundColor: "var(--color-button-tonal-bg)", borderBottom: "1px solid var(--color-border)" }}>
                {["Token", "Value", "Used for"].map((h, i) => (
                  <div key={h} style={{ padding: "10px 16px", borderRight: i < 2 ? "1px solid var(--color-border)" : "none" }}>
                    <span style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)" }}>{h}</span>
                  </div>
                ))}
              </div>
              {[
                { token: "--font-size-display", value: "clamp(1.5rem, 3vw, 2.125rem)", usage: "Hero intro, case study titles" },
                { token: "--font-size-heading", value: "clamp(1.125rem, 2vw, 1.25rem)", usage: "Section headers" },
                { token: "--font-size-body", value: "clamp(0.875rem, 1.5vw, 1rem)", usage: "Paragraphs, descriptions" },
                { token: "--font-size-small", value: "clamp(0.75rem, 1.2vw, 0.8125rem)", usage: "Captions, pills, badges" },
                { token: "--font-size-label", value: "clamp(0.75rem, 1.2vw, 0.8125rem)", usage: "Uppercase labels only" },
              ].map(({ token, value, usage }, ri, arr) => (
                <div key={token} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", borderBottom: ri < arr.length - 1 ? "1px solid var(--color-border)" : "none", backgroundColor: "var(--color-bg-card)" }}>
                  <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border)" }}>
                    <code style={{ fontSize: "0.625rem", fontFamily: "monospace", color: "var(--color-accent)", fontWeight: 600 }}>{token}</code>
                  </div>
                  <div style={{ padding: "12px 16px", borderRight: "1px solid var(--color-border)" }}>
                    <code style={{ fontSize: "0.625rem", fontFamily: "monospace", color: "var(--color-text-secondary)" }}>{value}</code>
                  </div>
                  <div style={{ padding: "12px 16px" }}>
                    <span style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{usage}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Color pairings */}
            <div style={{ marginTop: 28, display: "flex", flexDirection: "column", gap: 5 }}>
              {[
                { label: "text-primary · 600", color: "var(--color-text-primary)", weight: 600 },
                { label: "text-primary · 500", color: "var(--color-text-primary)", weight: 500 },
                { label: "text-secondary · 400", color: "var(--color-text-secondary)", weight: 400 },
                { label: "text-tertiary · 400", color: "var(--color-text-tertiary)", weight: 400 },
                { label: "text-accent · 500", color: "var(--color-accent)", weight: 500 },
              ].map(({ label, color, weight }) => (
                <p key={label} style={{ margin: 0, fontSize: "var(--font-size-body)", color, fontWeight: weight }}>{label}</p>
              ))}
            </div>
          </Section>

          <Section id="button" title="Button" active={activeSection === "button"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <div>
                <SubHeading>Variants</SubHeading>
                <SpecimenRow>
                  <Specimen label='variant="primary"'><Button variant="primary">Primary</Button></Specimen>
                  <Specimen label='variant="tonal"'><Button variant="tonal">Tonal</Button></Specimen>
                  <Specimen label='variant="secondary"'><Button variant="secondary">Secondary</Button></Specimen>
                  <Specimen label='variant="ghost"'><Button variant="ghost">Ghost</Button></Specimen>
                </SpecimenRow>
              </div>
              <div>
                <SubHeading>Sizes</SubHeading>
                <SpecimenRow>
                  <Specimen label='size="sm"'><Button variant="primary" size="sm">Small</Button></Specimen>
                  <Specimen label='size="md"'><Button variant="primary" size="md">Medium</Button></Specimen>
                  <Specimen label='size="lg"'><Button variant="primary" size="lg">Large</Button></Specimen>
                </SpecimenRow>
              </div>
              <div>
                <SubHeading>With icon + disabled</SubHeading>
                <SpecimenRow>
                  <Specimen label='icon={<ArrowIcon />}'><Button variant="primary" icon={<ArrowIcon />}>Continue</Button></Specimen>
                  <Specimen label='icon + tonal'><Button variant="tonal" icon={<StarIcon />}>Save</Button></Specimen>
                  <Specimen label="disabled"><Button variant="primary" disabled>Disabled</Button></Specimen>
                  <Specimen label="fullWidth" vertical><Button variant="secondary" fullWidth>Full Width</Button></Specimen>
                </SpecimenRow>
              </div>
            </div>
          </Section>

          <Section id="icon-button" title="IconButton" active={activeSection === "icon-button"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {["primary", "secondary", "tonal"].map((variant) => (
                <div key={variant}>
                  <SubHeading>variant="{variant}"</SubHeading>
                  <SpecimenRow>
                    {["sm", "md", "lg"].map((size) => (
                      <Specimen key={size} label={`size="${size}"`}>
                        <IconButton icon={<StarIcon />} variant={variant} size={size} ariaLabel={`${variant} ${size}`} />
                      </Specimen>
                    ))}
                  </SpecimenRow>
                </div>
              ))}
            </div>
          </Section>

          <Section id="nav-item" title="NavItem" active={activeSection === "nav-item"}>
            <div style={{ maxWidth: 220, display: "flex", flexDirection: "column", gap: 2, backgroundColor: "var(--color-bg-card)", padding: 16, borderRadius: 12, border: "1px solid var(--color-border)" }}>
              {[
                { id: "work", label: "Work", icon: <GridIcon /> },
                { id: "about", label: "About", icon: <HeartIcon /> },
                { id: "contact", label: "Contact", icon: <ArrowIcon /> },
              ].map((item) => (
                <NavItem key={item.id} isActive={activeNav === item.id} onClick={() => setActiveNav(item.id)} icon={item.icon}>
                  {item.label}
                </NavItem>
              ))}
            </div>
            <p style={{ marginTop: 8, fontSize: "0.625rem", fontFamily: "monospace", color: "var(--color-text-tertiary)" }}>Click to toggle active state</p>
          </Section>

          <Section id="divider" title="Divider" active={activeSection === "divider"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
              <div>
                <SubHeading>Horizontal</SubHeading>
                <SpecimenRow>
                  <Specimen label='size="sm"'><Divider size="sm" /></Specimen>
                  <Specimen label='size="md"'><Divider size="md" /></Specimen>
                  <Specimen label='size="lg"'><Divider size="lg" /></Specimen>
                  <Specimen label="accent"><Divider size="md" accent /></Specimen>
                </SpecimenRow>
              </div>
              <div>
                <SubHeading>Vertical</SubHeading>
                <SpecimenRow>
                  <Specimen label='orientation="vertical" sm'><Divider orientation="vertical" size="sm" /></Specimen>
                  <Specimen label='orientation="vertical" md'><Divider orientation="vertical" size="md" /></Specimen>
                  <Specimen label='orientation="vertical" lg'><Divider orientation="vertical" size="lg" /></Specimen>
                  <Specimen label="vertical + accent"><Divider orientation="vertical" size="lg" accent /></Specimen>
                </SpecimenRow>
              </div>
              <div>
                <SubHeading>In context (full width)</SubHeading>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, padding: "12px 0" }}>
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>Section above</span>
                  <Divider style={{ width: "100%" }} />
                  <span style={{ fontSize: "0.875rem", color: "var(--color-text-primary)" }}>Section below</span>
                </div>
              </div>
            </div>
          </Section>

          <Section id="timeline-pill" title="TimelinePill" active={activeSection === "timeline-pill"}>
            <SpecimenRow>
              <Specimen label="current"><TimelinePill dateRange="Jan 2024 – Present" /></Specimen>
              <Specimen label="past"><TimelinePill dateRange="Mar 2022 – Dec 2023" /></Specimen>
              <Specimen label="year only"><TimelinePill dateRange="2021" /></Specimen>
            </SpecimenRow>
          </Section>

          <Section id="tooltip" title="Tooltip" active={activeSection === "tooltip"}>
            <SpecimenRow>
              <Specimen label='position="top"'>
                <Tooltip label="This is a tooltip"><Button variant="secondary">Hover me</Button></Tooltip>
              </Specimen>
              <Specimen label='position="bottom"'>
                <Tooltip label="Appears below" position="bottom"><Button variant="secondary">Hover me</Button></Tooltip>
              </Specimen>
              <Specimen label="wrapping IconButton">
                <Tooltip label="Favorite"><IconButton icon={<HeartIcon />} variant="tonal" ariaLabel="favorite" /></Tooltip>
              </Specimen>
              <Specimen label="longer label">
                <Tooltip label="Customize your appearance"><IconButton icon={<BrushIcon />} variant="secondary" ariaLabel="customize" /></Tooltip>
              </Specimen>
            </SpecimenRow>
          </Section>

          <Section id="mosaic-background" title="MosaicBackground" active={activeSection === "mosaic-background"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <MosaicBackground style={{ borderRadius: 12, minHeight: 100, padding: 24 }}>
                <p style={{ margin: 0, fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", fontWeight: 500 }}>Children rendered above the mosaic pixel-grid</p>
                <p style={{ margin: "4px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>Background color and noise react to the active theme.</p>
              </MosaicBackground>
              <MosaicBackground style={{ borderRadius: 12, minHeight: 72, padding: 20 }}>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <IconButton icon={<StarIcon />} variant="primary" ariaLabel="star" />
                  <Button variant="primary">Call to action</Button>
                  <TimelinePill dateRange="Jan 2024 – Present" />
                </div>
              </MosaicBackground>
            </div>
          </Section>

          <Section id="cs-paragraph" title="Paragraph" active={activeSection === "cs-paragraph"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <SubHeading>Plain text</SubHeading>
                <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  We partnered with the Money Movement backend team to enable transfers from a company's bank account into the Paylocity reward wallet. A key dependency was transaction timing — there was ambiguity around how long funds would take to post.
                </p>
              </div>
              <div>
                <SubHeading>With ==highlights== and **bold**</SubHeading>
                <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  <HighlightedText text="The solution ==streamlined rewards distribution== while accounting for tax implications of Employee Rewards. **Engineers had a strong stance:** The engineering team heavily pushed for a build-up experience due to tech constraints." />
                </p>
              </div>
              <div>
                <SubHeading>Lead paragraph (labeled)</SubHeading>
                <div style={{ fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  <span style={{ fontWeight: 600, color: "var(--color-accent)" }}>Context</span><br />
                  <HighlightedText text="Paylocity's Recognition tool was a legacy feature that lived in ==multiple areas of the suite==. It had several visual variations, was built on different tech stacks, and wasn't easy to find or use." />
                </div>
              </div>
              <CodeSnippet code={`{
  type: "paragraph",
  content: "Plain text. ==highlights==, **bold**, __underline__ supported.\\n\\nDouble newline starts a new paragraph.\\n\\n*Label* Prefix a paragraph with *Label* for an accented label.",
}`} />
            </div>
          </Section>

          <Section id="cs-quote" title="Quote" active={activeSection === "cs-quote"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <blockquote style={{ position: "relative", margin: 0, padding: "28px 32px 28px 48px", borderLeft: "4px solid var(--color-accent)", backgroundColor: "var(--color-button-tonal-bg)", borderRadius: "0 16px 16px 0" }}>
                <span style={{ position: "absolute", top: 12, left: 16, fontSize: "3rem", lineHeight: 1, color: "var(--color-accent)", fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
                <p style={{ margin: 0, marginTop: 4, fontSize: "var(--font-size-body)", lineHeight: 1.7, fontStyle: "normal", color: "var(--color-text-primary)", fontWeight: 500 }}>
                  I just want to be able to give rewards without having to switch between five different tools. It kills the momentum of recognizing someone in the moment.
                </p>
                <footer style={{ marginTop: 12, fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", fontStyle: "normal", fontWeight: 500 }}>
                  — HR Admin, usability session
                </footer>
              </blockquote>
              <blockquote style={{ position: "relative", margin: 0, padding: "28px 32px 28px 48px", borderLeft: "4px solid var(--color-accent)", backgroundColor: "var(--color-button-tonal-bg)", borderRadius: "0 16px 16px 0" }}>
                <span style={{ position: "absolute", top: 12, left: 16, fontSize: "3rem", lineHeight: 1, color: "var(--color-accent)", fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
                <p style={{ margin: 0, marginTop: 4, fontSize: "var(--font-size-body)", lineHeight: 1.7, fontStyle: "normal", color: "var(--color-text-primary)", fontWeight: 500 }}>
                  Without attribution, no one knows why they're getting the quote.
                </p>
              </blockquote>
              <CodeSnippet code={`{
  type: "quote",
  content: "Quote text here.",
  attribution: "— Name, context", // optional
}`} />
            </div>
          </Section>

          <Section id="cs-highlight" title="Highlight" active={activeSection === "cs-highlight"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <SubHeading>Inline highlight mark</SubHeading>
                <div style={{ fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  <HighlightedText text="Companies were using Paylocity's Recognition feature to give kudos, but relied on external tools to give tangible rewards. This created a ==fragmented experience across key archetypes== (admins, managers, and employees)." />
                </div>
              </div>
              <div>
                <SubHeading>Multi-statement highlight block</SubHeading>
                <div style={{ fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)", whiteSpace: "pre-line" }}>
                  <HighlightedText text={"**Constraint:** Large datasets (500+ employees) weren't loading properly.\n\n**Our solution:** We limited Reward Givers to managers instead of enabling peer-to-peer rewards.\n\n**Trade-off:** We optimized for speed to market, knowing the solution wouldn't yet support different reward program types."} />
                </div>
              </div>
              <CodeSnippet code={`{
  type: "highlight",
  content: "**Constraint:** ...\\n\\n**Our solution:** ...\\n\\n**Trade-off:** ...",
}`} />
            </div>
          </Section>

          <Section id="cs-callout" title="Callout" active={activeSection === "cs-callout"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 12, padding: "16px 20px" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: "var(--font-size-body)", fontWeight: 600, color: "var(--color-text-primary)" }}>Key Insight</h4>
                <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  <HighlightedText text="Employees who received peer recognition were ==3× more likely== to stay at their company than those who didn't." />
                </p>
              </div>
              <div style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 12, padding: "16px 20px" }}>
                <p style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                  Callout without a header — used for standalone observations or notes that need visual emphasis without a heading.
                </p>
              </div>
              <CodeSnippet code={`{
  type: "callout",
  header: "Key Insight",                        // optional
  content: "Supporting detail. ==highlights== supported.",
}`} />
            </div>
          </Section>

          <Section id="cs-metrics" title="Metrics" active={activeSection === "cs-metrics"}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
              {[
                { value: "$12.3M", label: "ARR Generated" },
                { value: "150%", label: "Increase in Recognition" },
                { value: "55%", label: "Adoption Goal Met" },
                { value: "$700K", label: "Competitive Sales Gap Closed" },
              ].map(({ value, label }) => (
                <div key={label} style={{ display: "flex", flexDirection: "column", gap: 4, textAlign: "center", padding: "8px 0" }}>
                  <div style={{ fontSize: "3rem", fontWeight: 600, lineHeight: 1.1, color: "var(--color-accent)" }}>{value}</div>
                  <p style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 500, color: "var(--color-text-primary)" }}>{label}</p>
                </div>
              ))}
            </div>
            <CodeSnippet code={`{
  type: "metrics",
  metrics: [
    { value: "$12.3M", label: "ARR Generated"     },
    { value: "55%",    label: "Adoption Goal Met"  },
  ],
}`} />
          </Section>

          <Section id="cs-personas" title="Personas" active={activeSection === "cs-personas"}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
              {[
                { image: "https://www.tapback.co/api/avatar/y.webp", name: "HR Admin", role: "Power user", meta: ["Enterprise, 500+ employees"], jtbd: "As an admin, I want to fund and manage rewards in one place so I can ensure employees and managers have what they need." },
                { image: "https://www.tapback.co/api/avatar/p.webp", name: "Manager", role: "Frequent user", meta: ["Team of 8–15 reports"], jtbd: "As a manager, I want to reward employees for doing a great job so I can reinforce desired behaviors with tangible incentives." },
                { image: "https://www.tapback.co/api/avatar/ja.webp", name: "Employee", role: "Occasional user", meta: ["Individual contributor"], jtbd: "As an employee, I want to view and redeem the rewards I receive so I understand what I am being recognized for." },
              ].map((persona) => (
                <div key={persona.name} style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 12 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, textAlign: "center" }}>
                    <img src={persona.image} alt={persona.name} style={{ width: 72, height: 72, borderRadius: "50%", objectFit: "cover" }} />
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "var(--font-size-body)", color: "var(--color-text-primary)" }}>{persona.name}</div>
                      <div style={{ fontSize: "var(--font-size-small)", fontWeight: 500, color: "var(--color-accent)" }}>{persona.role}</div>
                      {persona.meta.map((m) => <div key={m} style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{m}</div>)}
                    </div>
                  </div>
                  <p style={{ margin: 0, fontSize: "var(--font-size-small)", lineHeight: 1.6, color: "var(--color-text-primary)" }}>{persona.jtbd}</p>
                </div>
              ))}
            </div>
            <CodeSnippet code={`{
  type: "personas",
  items: [
    {
      image: "https://www.tapback.co/api/avatar/y.webp",
      name: "HR Admin",
      role: "Power user",          // optional
      meta: ["Enterprise, 500+"],  // optional
      jtbd: ["As an admin, I want to ..."],
    },
  ],
}`} />
          </Section>

          <Section id="cs-container" title="Container" active={activeSection === "cs-container"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
              <p style={{ margin: 0, fontSize: "var(--font-size-body)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Grid of browsable cards with title + description. Add <code style={{ fontSize: "var(--font-size-small)", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>icon</code> for a visual anchor, or <code style={{ fontSize: "var(--font-size-small)", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>image</code> for an illustration. Optional <code style={{ fontSize: "var(--font-size-small)", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>footnote</code> pins a note to the card bottom.
              </p>
              <DSContainerPreview />
              <CodeSnippet code={`{
  type: "container",
  items: [
    {
      icon: "ban",                 // optional — see icons below
      image: "/path/to/img.png",   // optional — overrides icon
      title: "Card title",
      description: "Supporting detail.",
      footnote: "Footer note",     // optional — or { text, href }
    },
  ],
}
// icons: alert · ban · clock · flag · globe · lock · star · trending-down · users · zap`} />
            </div>
          </Section>

          <Section id="cs-list" title="List" active={activeSection === "cs-list"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <SubHeading>Research findings</SubHeading>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Analyzed ==500+ survey responses== from companies using Paylocity's Recognition feature", "Ran ==6 customer interviews== with companies using the Recognition product", "Conducted ==competitive analysis== of rewards platforms identified by customers"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, fontSize: "1rem", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--color-accent)", fontSize: "0.75rem", marginTop: "0.28em", flexShrink: 0 }}>✦</span>
                      <span style={{ color: "var(--color-text-primary)" }}><HighlightedText text={item} /></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <SubHeading>Design decisions</SubHeading>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 8 }}>
                  {["Limited Reward Givers to managers to reduce table load on large datasets", "Introduced pending and processing states to build trust in the system", "Prioritized cash redemption for MVP — gift cards planned for next cycle"].map((item, i) => (
                    <li key={i} style={{ display: "flex", gap: 12, fontSize: "1rem", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--color-accent)", fontSize: "0.75rem", marginTop: "0.28em", flexShrink: 0 }}>✦</span>
                      <span style={{ color: "var(--color-text-primary)" }}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <CodeSnippet code={`{
  type: "list",
  description: "Optional intro text.", // optional
  items: [
    "Item with ==highlights== supported.",
    "Another item.",
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-carousel" title="Carousel" active={activeSection === "cs-carousel"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <CarouselBlockDemo />
              <CodeSnippet code={`{
  type: "carousel",
  thumbnails: true,    // false → dot indicators
  description: "Optional description above the carousel.", // optional
  images: [
    { src: "/casestudy/project/image.png", caption: "Caption" },
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-comparison" title="Comparison" active={activeSection === "cs-comparison"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Used when presenting two or more options side-by-side with pros and cons. Replaces back-to-back <code style={{ fontSize: "0.8125rem", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>list</code> blocks used as option comparisons.
              </p>
              <DSComparisonPreview />
              <CodeSnippet code={`{
  type: "comparison",
  description: "Optional context.", // optional
  options: [
    {
      label: "Option A",
      items: [
        { type: "pro",  text: "Pro point"    },
        { type: "con",  text: "Con point"    },
        { text: "Neutral point" },
      ],
    },
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-phases" title="Phases" active={activeSection === "cs-phases"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Horizontal timeline communicating project phases with duration and description. Shows process structure at a glance — scope, sequence, and intent.
              </p>
              <DSPhasesPreview />
              <CodeSnippet code={`{
  type: "phases",
  description: "Optional intro.", // optional
  items: [
    { label: "Discovery", duration: "2 weeks", description: "Research and define."   },
    { label: "Design",    duration: "4 weeks", description: "Iterate on concepts."   },
    { label: "Delivery",  duration: "2 weeks", description: "Ship and measure impact." },
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-decision" title="Decision" active={activeSection === "cs-decision"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Structured table showing what was decided, why, and the trade-off. Distinct from <code style={{ fontSize: "0.8125rem", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>highlight</code> — communicates intentional reasoning rather than a reflection.
              </p>
              <DSDecisionPreview />
              <CodeSnippet code={`{
  type: "decision",
  rows: [
    { label: "Decision",  value: "What was decided."  },
    { label: "Rationale", value: "Why it was chosen." },
    { label: "Trade-off", value: "What was given up." },
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-stat-grid" title="Stat Grid" active={activeSection === "cs-stat-grid"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Dense grid for research-scale data — sources reviewed, interviews run, data points analyzed. Lower visual weight than <code style={{ fontSize: "0.8125rem", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>metrics</code>, which is reserved for impact outcomes.
              </p>
              <DSStatGridPreview />
              <CodeSnippet code={`{
  type: "stat-grid",
  description: "Optional intro.", // optional
  items: [
    { value: "500+", label: "Survey responses" },
    { value: "6",    label: "Interviews"       },
  ],
}`} />
            </div>
          </Section>

          <Section id="cs-flow" title="Flow / Embed" active={activeSection === "cs-flow"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <p style={{ margin: 0, fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                Iframes (Whimsical, Figma, Loom) are embedded using an <code style={{ fontSize: "0.8125rem", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>embed</code> block with a configurable <code style={{ fontSize: "0.8125rem", backgroundColor: "var(--color-button-tonal-bg)", color: "var(--color-accent)", padding: "1px 6px", borderRadius: 4 }}>aspectRatio</code>.
              </p>
              <div style={{ width: "100%", aspectRatio: "16/9", borderRadius: 12, overflow: "hidden", border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 8 }}>
                <div style={{ fontSize: "2rem", color: "var(--color-text-tertiary)" }}>⬚</div>
                <p style={{ margin: 0, fontSize: "0.8125rem", color: "var(--color-text-tertiary)" }}>16:9 embed container</p>
                <p style={{ margin: 0, fontSize: "0.6875rem", fontFamily: "monospace", color: "var(--color-text-tertiary)" }}>src="https://whimsical.com/embed/..."</p>
              </div>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ flex: 1, aspectRatio: "4/3", borderRadius: 10, border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--color-text-tertiary)", fontFamily: "monospace" }}>4:3</p>
                </div>
                <div style={{ flex: 1, aspectRatio: "1/1", borderRadius: 10, border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-card)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <p style={{ margin: 0, fontSize: "0.6875rem", color: "var(--color-text-tertiary)", fontFamily: "monospace" }}>1:1</p>
                </div>
              </div>
              <CodeSnippet code={`{
  type: "embed",
  src: "https://whimsical.com/embed/...",
  aspectRatio: "16/9",            // optional, default 16/9
  caption: "Caption text.",       // optional
  description: "Optional intro.", // optional
}`} />
            </div>
          </Section>

          <Section id="composition" title="Composition" active={activeSection === "composition"}>
            <div style={{ backgroundColor: "var(--color-bg-card)", border: "1px solid var(--color-border)", borderRadius: 16, overflow: "hidden" }}>
              <MosaicBackground style={{ padding: "24px 24px 20px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <p style={{ margin: "0 0 6px", fontSize: "0.6875rem", color: "var(--color-text-secondary)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Product Design</p>
                    <h3 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 600, color: "var(--color-text-primary)" }}>Acme Corp — Senior Designer</h3>
                  </div>
                  <TimelinePill dateRange="2022 – Present" />
                </div>
              </MosaicBackground>
              <div style={{ padding: 24 }}>
                <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  <HighlightedText text="Led end-to-end design for the core product, from discovery through delivery. ==Collaborated closely with engineering== and stakeholders to ship high-quality experiences at scale." />
                </p>
                <Divider style={{ width: "100%", marginBottom: 16 }} />
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Button variant="primary" size="sm" icon={<ArrowIcon />}>View Case Study</Button>
                  <Button variant="secondary" size="sm">Details</Button>
                  <div style={{ marginLeft: "auto" }}>
                    <Tooltip label="Save project"><IconButton icon={<HeartIcon />} size="sm" variant="tonal" ariaLabel="save" /></Tooltip>
                  </div>
                </div>
              </div>
            </div>
          </Section>

          <Section id="profile" title="Profile" active={activeSection === "profile"}>
            <div style={{ display: "flex", flexDirection: "column", gap: 48 }}>

              {/* ── Exploration A: Profile Card — Centered ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>A — Centered</p>

                {/* Outer wrapper: position ref for the avatar, no overflow clip */}
                <div style={{ position: "relative", borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

                  {/* Clipped card (banner + body) */}
                  <div style={{ borderRadius: 20, overflow: "hidden" }}>

                    {/* Banner */}
                    <MosaicBackground style={{ height: 110 }} />

                    {/* Body */}
                    <div style={{
                      backgroundColor: "var(--color-bg-card)",
                      padding: "46px 28px 28px",
                      textAlign: "center",
                    }}>
                      {/* Name + role */}
                      <div style={{ marginBottom: 16 }}>
                        <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2, marginBottom: 3 }}>
                          Taylor
                        </div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", marginBottom: 2 }}>
                          Designer & Builder
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                          7.5 YOE · B2B & B2B2C
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
                        <Button size="sm" variant="tonal" onClick={() => window.open("https://linkedin.com/in/taylorlee-design", "_blank")}>LinkedIn</Button>
                        <Button size="sm" variant="tonal" onClick={() => window.open("https://github.com/yositayeerong", "_blank")}>GitHub</Button>
                        <Button size="sm" variant="tonal" onClick={() => window.open("/resume.pdf", "_blank")}>Resume</Button>
                      </div>
                    </div>
                  </div>

                  {/* Avatar — outside overflow:hidden so it straddles the banner/body seam */}
                  <div style={{
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 108,
                    height: 108,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--color-bg-card)",
                    background: "var(--color-avatar-gradient)",
                    zIndex: 2,
                  }}>
                    <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                </div>
              </div>

              {/* ── Exploration B: Profile Card — Post-it Banner ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>B — Post-it Banner</p>

                <div style={{ position: "relative", borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

                  <div style={{ borderRadius: 20, overflow: "hidden" }}>

                    {/* Banner with CTAs */}
                    <MosaicBackground style={{ height: 110 }}>
                      <div style={{ position: "absolute", top: 20, right: 28, display: "flex", gap: 8, zIndex: 10 }}>
                        <IconButton size="sm" variant="tonal" ariaLabel="LinkedIn" icon={<LinkedInIcon />} onClick={() => window.open("https://linkedin.com/in/taylorlee-design", "_blank")} />
                        <IconButton size="sm" variant="tonal" ariaLabel="GitHub" icon={<SiGithub color="currentColor" />} onClick={() => window.open("https://github.com/yositayeerong", "_blank")} />
                        <IconButton size="sm" variant="tonal" ariaLabel="Resume" icon={<FileText />} onClick={() => window.open("/resume.pdf", "_blank")} />
                      </div>
                    </MosaicBackground>

                    {/* Body */}
                    <div style={{
                      backgroundColor: "var(--color-bg-card)",
                      padding: "46px 28px 28px",
                      textAlign: "left",
                    }}>
                      {/* Name + role */}
                      <div>
                        <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2, marginBottom: 3 }}>
                          Taylor
                        </div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", marginBottom: 2 }}>
                          Designer & Builder
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                          7.5 YOE · B2B & B2B2C
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar — left-aligned, straddling seam */}
                  <div style={{
                    position: "absolute",
                    top: 40,
                    left: 28,
                    width: 108,
                    height: 108,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--color-bg-card)",
                    background: "var(--color-avatar-gradient)",
                    zIndex: 2,
                  }}>
                    <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                </div>
              </div>

              {/* ── Exploration C: Profile Card — Bio Row ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>C — Bio Row</p>

                <div style={{ position: "relative", borderRadius: 20, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>

                  <div style={{ borderRadius: 20, overflow: "hidden" }}>

                    {/* Banner */}
                    <MosaicBackground style={{ height: 110 }} />

                    {/* Body */}
                    <div style={{ backgroundColor: "var(--color-bg-card)", padding: "46px 28px 28px", textAlign: "center" }}>

                      {/* Name + role */}
                      <div style={{ marginBottom: 20 }}>
                        <div style={{ fontSize: "1.125rem", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2, marginBottom: 3 }}>
                          Taylor
                        </div>
                        <div style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-accent)", marginBottom: 2 }}>
                          Designer & Builder
                        </div>
                        <div style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                          7.5 YOE · B2B & B2B2C
                        </div>
                      </div>

                      {/* Bio row — three columns with dividers */}
                      <div style={{ display: "flex", alignItems: "stretch" }}>
                        {[
                          "Collaborative and proactive design partner who turns user feedback into product strategy.",
                          "Speedy at design execution, while prioritizing polished, easy-to-use experiences.",
                          "Experienced at building for connected systems and cross-platform solutions.",
                        ].map((text, i, arr) => (
                          <React.Fragment key={i}>
                            <div style={{ flex: 1, fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.55, padding: "0 20px" }}>
                              {text}
                            </div>
                            {i < arr.length - 1 && (
                              <div style={{ width: 1, backgroundColor: "var(--color-border)", flexShrink: 0 }} />
                            )}
                          </React.Fragment>
                        ))}
                      </div>

                    </div>
                  </div>

                  {/* Avatar */}
                  <div style={{
                    position: "absolute",
                    top: 40,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 108,
                    height: 108,
                    borderRadius: "50%",
                    overflow: "hidden",
                    border: "4px solid var(--color-bg-card)",
                    background: "var(--color-avatar-gradient)",
                    zIndex: 2,
                  }}>
                    <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                </div>
              </div>


              {/* ── Exploration E: Landing Page Card ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>E — Landing Page Card</p>
                <div style={{ maxWidth: 360 }}>
                  <div style={{
                    backgroundColor: "var(--color-bg-card)",
                    borderRadius: 20,
                    padding: "28px 28px 32px",
                    boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
                  }}>
                    {/* Avatar */}
                    <div style={{ width: 120, height: 120, borderRadius: "50%", overflow: "hidden", margin: "0 auto 24px", background: "var(--color-avatar-gradient)" }}>
                      <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>

                    {/* Name & Title */}
                    <div style={{ marginBottom: 20, textAlign: "center" }}>
                      <div style={{ fontSize: "1rem", fontWeight: 600, color: "var(--color-text-primary)", lineHeight: 1.2, marginBottom: 4 }}>Taylor</div>
                      <div style={{ fontSize: "0.875rem", fontWeight: 500, color: "var(--color-accent)", marginBottom: 2 }}>Designer & Builder</div>
                      <div style={{ fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>7.5 YOE in B2B & B2B2C</div>
                    </div>

                    {/* Bio */}
                    <ul style={{ lineHeight: 1.7, paddingLeft: 0, margin: 0, marginBottom: "1.25rem", listStyleType: "none", fontSize: "0.875rem", color: "var(--color-text-secondary)" }}>
                      {[
                        "Collaborative and proactive design partner who turns user feedback into product strategy.",
                        "Speedy at design execution, while prioritizing polished, easy-to-use experiences.",
                        "Experienced at building for connected systems and cross-platform solutions.",
                      ].map((text, i) => (
                        <li key={i} style={{ display: "flex", gap: "0.5em", marginBottom: i < 2 ? "0.4em" : 0 }}>
                          <span style={{ color: "var(--color-accent)", flexShrink: 0, fontSize: "0.65em", marginTop: "0.35em" }}>✦</span>
                          <span>{text}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Social links */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "0.875rem", fontWeight: 600, color: "var(--color-accent)" }}>
                      {[["LinkedIn", "https://linkedin.com"], ["Email", "mailto:taylor@example.com"], ["Github", "https://github.com"]].map(([label, href], i, arr) => (
                        <React.Fragment key={label}>
                          <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none", transition: "opacity 0.2s" }}
                            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.7")}
                            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
                            {label}
                          </a>
                          {i < arr.length - 1 && <span style={{ color: "var(--color-text-tertiary)", userSelect: "none" }}>&middot;</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Exploration D: Intro Card ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>D — Intro Card</p>

                <div style={{
                  position: "relative",
                  backgroundColor: "var(--color-bg-card)",
                  borderRadius: 20,
                  padding: "40px 32px 48px",
                  boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                }}>
                  {/* Top-right CTAs */}
                  <div style={{ position: "absolute", top: 20, right: 20, display: "flex", gap: 8 }}>
                    <IconButton size="sm" variant="tonal" ariaLabel="LinkedIn" icon={<LinkedInIcon />} onClick={() => window.open("https://linkedin.com/in/taylorlee-design", "_blank")} />
                    <IconButton size="sm" variant="tonal" ariaLabel="GitHub" icon={<SiGithub color="currentColor" />} onClick={() => window.open("https://github.com/yositayeerong", "_blank")} />
                    <IconButton size="sm" variant="tonal" ariaLabel="Resume" icon={<FileText />} onClick={() => window.open("/resume.pdf", "_blank")} />
                  </div>

                  {/* Avatar */}
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
                    <div style={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      overflow: "hidden",
                      background: "var(--color-avatar-gradient)",
                      flexShrink: 0,
                    }}>
                      <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    </div>
                  </div>

                  {/* Headline */}
                  <div style={{ textAlign: "center", marginBottom: 52 }}>
                    <p style={{
                      margin: 0,
                      fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                      fontWeight: 700,
                      color: "var(--color-text-primary)",
                      lineHeight: 1.35,
                      maxWidth: 600,
                      marginInline: "auto",
                    }}>
                      I'm Taylor, a builder and designer with 7.5 YOE in B2B and B2B2C
                    </p>
                  </div>

                  {/* Post-it cards row */}
                  <div style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                    {[
                      { title: "Craft",     rotate: "-2deg",   offsetY: "0px",   text: "Speedy at design execution, while prioritizing polished, easy-to-use experiences." },
                      { title: "Strategic", rotate: "1.5deg",  offsetY: "12px",  text: "Collaborative and proactive design partner who turns user feedback into product strategy." },
                      { title: "Systems",   rotate: "-1deg",   offsetY: "4px",   text: "Experienced at building for connected systems and cross-platform solutions." },
                      { title: "Builder",   rotate: "2.5deg",  offsetY: "8px",   text: "Shipping complete solutions — from rough prototype to production-ready product." },
                    ].map(({ title, rotate, offsetY, text }) => (
                      <div key={title} style={{ flex: 1, position: "relative", marginTop: offsetY }}>
                        {/* Tape */}
                        <div style={{
                          position: "absolute",
                          top: -10,
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 52,
                          height: 18,
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          borderRadius: 3,
                          zIndex: 1,
                        }} />
                        {/* Note */}
                        <div style={{
                          backgroundColor: "var(--color-button-tonal-bg)",
                          padding: "20px 18px 24px",
                          transform: `rotate(${rotate})`,
                          boxShadow: "2px 4px 14px rgba(0,0,0,0.15)",
                          position: "relative",
                          zIndex: 0,
                        }}>
                          <div style={{ fontSize: "0.875rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10 }}>{title}</div>
                          <div style={{ fontSize: "0.8125rem", color: "var(--color-text-primary)", lineHeight: 1.55 }}>{text}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* ── Exploration F: Offset Avatar + External CTAs ── */}
              <div>
                <p style={{ margin: "0 0 12px", fontSize: "0.75rem", fontWeight: 600, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>F — Offset Avatar</p>

                {/* Outer wrapper — provides space for the overhanging avatar */}
                <div style={{ position: "relative", paddingTop: 68 }}>

                  {/* Avatar — centered, overhangs the card top */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    overflow: "hidden",
                    background: "var(--color-avatar-gradient)",
                    border: "4px solid var(--color-bg-primary)",
                    zIndex: 2,
                  }}>
                    <img src="/me.png" alt="Taylor" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>

                  {/* CTAs — top-right, top-aligned with avatar */}
                  <div style={{
                    position: "absolute",
                    top: 0,
                    right: 0,
                    display: "flex",
                    gap: 12,
                    zIndex: 2,
                  }}>
                    <IconButton size="md" variant="tonal" ariaLabel="LinkedIn" icon={<LinkedInIcon />} onClick={() => window.open("https://linkedin.com/in/taylorlee-design", "_blank")} />
                    <IconButton size="md" variant="tonal" ariaLabel="GitHub" icon={<SiGithub color="currentColor" />} onClick={() => window.open("https://github.com/yositayeerong", "_blank")} />
                    <IconButton size="md" variant="tonal" ariaLabel="Resume" icon={<FileText />} onClick={() => window.open("/resume.pdf", "_blank")} />
                  </div>

                  {/* Card */}
                  <div style={{
                    backgroundColor: "var(--color-bg-card)",
                    borderRadius: 20,
                    padding: "80px 40px 56px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                  }}>

                    {/* Headline */}
                    <div style={{ textAlign: "center", marginBottom: 52 }}>
                      <p style={{
                        margin: 0,
                        fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                        fontWeight: 700,
                        color: "var(--color-text-primary)",
                        lineHeight: 1.35,
                        maxWidth: 560,
                        marginInline: "auto",
                      }}>
                        I'm Taylor, a builder and designer with 7.5 YOE in B2B and B2B2C
                      </p>
                    </div>

                    {/* Post-it cards */}
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24, alignItems: "start", maxWidth: 875, margin: "0 auto" }}>
                      {[
                        { title: "Craft",     rotate: "-2deg",   offsetY: "0px",   text: "Speedy at design execution, while prioritizing polished, easy-to-use experiences." },
                        { title: "Strategic", rotate: "1.5deg",  offsetY: "12px",  text: "Collaborative and proactive design partner who turns user feedback into product strategy." },
                        { title: "Systems",   rotate: "-1deg",   offsetY: "4px",   text: "Experienced at building for connected systems and cross-platform solutions." },
                        { title: "Builder",   rotate: "2.5deg",  offsetY: "8px",   text: "Shipping complete solutions — from rough prototype to production-ready product." },
                      ].map(({ title, rotate, offsetY, text }) => (
                        <div key={title} style={{ position: "relative", marginTop: offsetY }}>
                          {/* Tape */}
                          <div style={{
                            position: "absolute",
                            top: -10,
                            left: "50%",
                            transform: "translateX(-50%)",
                            width: 52,
                            height: 18,
                            backgroundColor: "rgba(255, 255, 255, 0.05)",
                            borderRadius: 3,
                            zIndex: 1,
                          }} />
                          {/* Note */}
                          <div style={{
                            backgroundColor: "var(--color-button-tonal-bg)",
                            padding: "20px 18px 24px",
                            transform: `rotate(${rotate})`,
                            boxShadow: "2px 4px 14px rgba(0,0,0,0.15)",
                            position: "relative",
                            zIndex: 0,
                          }}>
                            <div style={{ fontSize: "1rem", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10 }}>{title}</div>
                            <div style={{ fontSize: "0.8125rem", color: "var(--color-text-primary)", lineHeight: 1.55 }}>{text}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </Section>

        </main>
      </div>

      {customizerOpen && <ThemeCustomizer onClose={() => setCustomizerOpen(false)} />}
      {paletteOpen && <PaletteBuilder onClose={() => setPaletteOpen(false)} />}
    </div>
  );
}
