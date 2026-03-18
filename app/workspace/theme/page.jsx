"use client";

import React, { useState, useEffect } from "react";
import Button from "../../components/ui/Button";
import ToolkitBackLink from "../../components/ui/ToolkitBackLink";
import { useTheme } from "../../components/ui/ThemeProvider";

// ── Icons ──────────────────────────────────────────────────────────────────────

const CopyIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="9" y="9" width="13" height="13" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
  </svg>
);

const HeartIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

// ── Data ───────────────────────────────────────────────────────────────────────

const PALETTE_PRESETS = {
  dark:   { label: "Dark",    colors: { "--color-bg-primary": "#111111", "--color-bg-card": "#1b1a1a", "--color-bg-hover": "#1a1a1a", "--color-text-primary": "#ffffff", "--color-text-secondary": "#a1a1a1", "--color-text-tertiary": "#737373", "--color-accent": "#94a3b8", "--color-accent-hover": "#cbd5e1", "--color-border": "#2d2d2d", "--color-button-tonal-bg": "#1e2124", "--color-button-primary-text": "#0f172a" } },
  light:  { label: "Light",   colors: { "--color-bg-primary": "#e9eee9", "--color-bg-card": "#f5f8f5", "--color-bg-hover": "#ebf1ee", "--color-text-primary": "#121a13", "--color-text-secondary": "#3d5243", "--color-text-tertiary": "#6b7d70", "--color-accent": "#296f5a", "--color-accent-hover": "#275347", "--color-border": "#cdd5cd", "--color-button-tonal-bg": "#d8ebe5", "--color-button-primary-text": "#ffffff" } },
  nature: { label: "Nature",  colors: { "--color-bg-primary": "#0a0e0b", "--color-bg-card": "#141b14", "--color-bg-hover": "#1f2820", "--color-text-primary": "#f0f4f1", "--color-text-secondary": "#a5b8a9", "--color-text-tertiary": "#6b8571", "--color-accent": "#86a289", "--color-accent-hover": "#a5b8a9", "--color-border": "#273527", "--color-button-tonal-bg": "#1a2419", "--color-button-primary-text": "#0a0e0b" } },
  desert: { label: "Desert",  colors: { "--color-bg-primary": "#17100b", "--color-bg-card": "#2a1f19", "--color-bg-hover": "#28201a", "--color-text-primary": "#faf6f0", "--color-text-secondary": "#c9b8a5", "--color-text-tertiary": "#9a8775", "--color-accent": "#b76046", "--color-accent-hover": "#d17a62", "--color-border": "#5f4b39", "--color-button-tonal-bg": "#2a1e16", "--color-button-primary-text": "#ffffff" } },
  space:  { label: "Space",   colors: { "--color-bg-primary": "#0a0d1a", "--color-bg-card": "#1b1e37", "--color-bg-hover": "#1a1f33", "--color-text-primary": "#e8edf5", "--color-text-secondary": "#9ca5ba", "--color-text-tertiary": "#6b7589", "--color-accent": "#638bfc", "--color-accent-hover": "#7da3fc", "--color-border": "#2a2f4a", "--color-button-tonal-bg": "#1a2040", "--color-button-primary-text": "#0a0d1a" } },
  ocean:  { label: "Banana",  colors: { "--color-bg-primary": "#fff0f3", "--color-bg-card": "#ffffff", "--color-bg-hover": "#fce4ec", "--color-text-primary": "#4a171e", "--color-text-secondary": "#880e4f", "--color-text-tertiary": "#ad1457", "--color-accent": "#d81b60", "--color-accent-hover": "#ad1457", "--color-border": "#f3d1da", "--color-button-tonal-bg": "#f8bbd0", "--color-button-primary-text": "#ffffff" } },
};

const COLOR_GROUPS = [
  { label: "Backgrounds", vars: [{ key: "--color-bg-primary", label: "bg-primary" }, { key: "--color-bg-card", label: "bg-card" }, { key: "--color-bg-hover", label: "bg-hover" }] },
  { label: "Text", vars: [{ key: "--color-text-primary", label: "text-primary" }, { key: "--color-text-secondary", label: "text-secondary" }, { key: "--color-text-tertiary", label: "text-tertiary" }] },
  { label: "Accent & UI", vars: [{ key: "--color-accent", label: "accent" }, { key: "--color-accent-hover", label: "accent-hover" }, { key: "--color-border", label: "border" }, { key: "--color-button-tonal-bg", label: "tonal-bg" }, { key: "--color-button-primary-text", label: "btn-primary-text" }] },
];

// ── Color row ──────────────────────────────────────────────────────────────────

function ColorRow({ cssVar, label, value, onChange }) {
  const [text, setText] = useState(value);
  useEffect(() => { setText(value); }, [value]);
  const isHex = /^#[0-9a-f]{6}$/i.test(value);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <label style={{ position: "relative", width: 28, height: 28, borderRadius: 6, overflow: "hidden", border: "1px solid var(--color-border)", flexShrink: 0, cursor: "pointer" }}>
        <div style={{ position: "absolute", inset: 0, backgroundColor: isHex ? value : "#888888" }} />
        <input type="color" value={isHex ? value : "#888888"} onChange={(e) => { setText(e.target.value); onChange(e.target.value); }} style={{ position: "absolute", inset: 0, opacity: 0, width: "100%", height: "100%", cursor: "pointer", border: "none", padding: 0 }} />
      </label>
      <span style={{ fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", fontFamily: "monospace", width: 120, flexShrink: 0 }}>{label}</span>
      <input
        type="text"
        value={text}
        onChange={(e) => { setText(e.target.value); if (/^#[0-9a-f]{6}$/i.test(e.target.value)) onChange(e.target.value); }}
        spellCheck={false}
        style={{ flex: 1, padding: "4px 8px", borderRadius: 6, border: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-hover)", color: "var(--color-text-primary)", fontSize: "var(--font-size-label)", fontFamily: "monospace", outline: "none" }}
      />
    </div>
  );
}

// ── Preview components ─────────────────────────────────────────────────────────

function CompositionPreview({ p }) {
  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"], display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "48px 40px" }}>
      <div style={{ width: "100%", maxWidth: 700 }}>
        <div style={{ borderRadius: 20, overflow: "hidden", border: `1px solid ${p["--color-border"]}`, boxShadow: "0 4px 32px rgba(0,0,0,0.18)" }}>
          <div style={{ padding: "28px 28px 22px", backgroundColor: p["--color-bg-hover"] }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div>
                <p style={{ margin: "0 0 6px", fontSize: "var(--font-size-label)", color: p["--color-text-secondary"], fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.06em" }}>Product Design</p>
                <h3 style={{ margin: 0, fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>Acme Corp — Senior Designer</h3>
              </div>
              <span style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 8, padding: "4px 12px", fontSize: "var(--font-size-small)", fontWeight: 500, whiteSpace: "nowrap", marginTop: 4 }}>2022 – Present</span>
            </div>
          </div>
          <div style={{ padding: "24px 28px 28px", backgroundColor: p["--color-bg-card"] }}>
            <p style={{ margin: "0 0 14px", fontSize: "var(--font-size-body)", color: p["--color-text-secondary"], lineHeight: 1.7 }}>
              Led end-to-end design for the core product, from discovery through delivery.{" "}
              <mark style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 4, padding: "1px 5px", fontWeight: 600, fontStyle: "normal" }}>Collaborated closely with engineering</mark>
              {" "}and stakeholders to ship high-quality experiences at scale.
            </p>
            <div style={{ display: "flex", gap: 40, padding: "20px 0", borderTop: `1px solid ${p["--color-border"]}`, borderBottom: `1px solid ${p["--color-border"]}`, marginBottom: 20 }}>
              {[["$12.3M", "ARR Generated"], ["150%", "Recognition Increase"], ["55%", "Adoption Goal"]].map(([val, lbl]) => (
                <div key={lbl} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2rem", fontWeight: 600, color: p["--color-accent"], lineHeight: 1.1 }}>{val}</div>
                  <div style={{ fontSize: "var(--font-size-small)", color: p["--color-text-tertiary"], fontWeight: 500, marginTop: 4 }}>{lbl}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 }}>
              <span style={{ height: 40, padding: "0 20px", borderRadius: 999, fontSize: "var(--font-size-body)", fontWeight: 500, backgroundColor: p["--color-accent"], color: p["--color-button-primary-text"], display: "inline-flex", alignItems: "center", gap: 6 }}><ArrowIcon /> View Case Study</span>
              <span style={{ height: 40, padding: "0 20px", borderRadius: 999, fontSize: "var(--font-size-body)", fontWeight: 500, border: `1px solid ${p["--color-border"]}`, color: p["--color-text-primary"], display: "inline-flex", alignItems: "center" }}>Details</span>
              <span style={{ height: 40, width: 40, borderRadius: 999, backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], display: "inline-flex", alignItems: "center", justifyContent: "center", marginLeft: "auto" }}><HeartIcon /></span>
            </div>
            <blockquote style={{ position: "relative", margin: 0, padding: "20px 24px 20px 48px", borderLeft: `4px solid ${p["--color-accent"]}`, backgroundColor: p["--color-button-tonal-bg"], borderRadius: "0 14px 14px 0" }}>
              <span style={{ position: "absolute", top: 10, left: 14, fontSize: "2.5rem", lineHeight: 1, color: p["--color-accent"], fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
              <p style={{ margin: 0, marginTop: 4, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: p["--color-text-primary"], fontWeight: 500 }}>I just want to give rewards without switching between five different tools.</p>
              <footer style={{ marginTop: 10, fontSize: "var(--font-size-small)", color: p["--color-text-tertiary"] }}>— HR Admin, usability session</footer>
            </blockquote>
          </div>
        </div>
      </div>
    </div>
  );
}

function LandingPagePreview({ p }) {
  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"], padding: "28px" }}>
      <div style={{ maxWidth: 1060, margin: "0 auto", display: "flex", gap: 20 }}>
        <div style={{ width: 280, flexShrink: 0 }}>
          <div style={{ backgroundColor: p["--color-bg-card"], borderRadius: 20, padding: "28px 24px 32px" }}>
            <div style={{ width: 88, height: 88, borderRadius: "50%", background: `linear-gradient(135deg, ${p["--color-accent"]} 0%, ${p["--color-bg-hover"]} 100%)`, margin: "0 auto 20px", overflow: "hidden" }}>
              <img src="/me.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={(e) => { e.target.style.display = "none"; }} />
            </div>
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <p style={{ margin: "0 0 4px", fontSize: "var(--font-size-body)", fontWeight: 600, color: p["--color-text-primary"] }}>Taylor</p>
              <p style={{ margin: "0 0 3px", fontSize: "var(--font-size-body)", fontWeight: 500, color: p["--color-accent"] }}>Designer & Builder</p>
              <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: p["--color-text-secondary"] }}>~8 YOE in B2B & B2B2C</p>
            </div>
            <div style={{ display: "flex", gap: 8, fontSize: "var(--font-size-body)", fontWeight: 600, color: p["--color-accent"] }}>
              <span>LinkedIn</span><span style={{ color: p["--color-text-tertiary"] }}>·</span>
              <span>Email</span><span style={{ color: p["--color-text-tertiary"] }}>·</span>
              <span>Github</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ backgroundColor: p["--color-bg-card"], borderRadius: 20, padding: "28px" }}>
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 20 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: p["--color-bg-primary"], flexShrink: 0 }} />
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

function CaseStudyPreview({ p }) {
  const [activeSection, setActiveSection] = useState(0);
  const sections = ["The Problem", "Impact & Outcomes", "Research & Discovery", "Key Personas", "Constraints", "Key Takeaway"];

  return (
    <div style={{ minHeight: "100%", backgroundColor: p["--color-bg-primary"] }}>
      <div style={{ position: "sticky", top: 0, zIndex: 10, backgroundColor: p["--color-bg-primary"], borderBottom: `1px solid ${p["--color-border"]}`, padding: "14px 32px", display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "var(--font-size-body)", fontWeight: 500, color: p["--color-accent"] }}>← Work</span>
        <span style={{ color: p["--color-border"] }}>|</span>
        <span style={{ fontSize: "var(--font-size-body)", color: p["--color-text-secondary"] }}>Recognition & Rewards — 0→1 Design</span>
      </div>
      <div style={{ display: "flex", maxWidth: 1060, margin: "0 auto", padding: "0 32px" }}>
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
        <main style={{ flex: 1, minWidth: 0, padding: "32px 0 80px" }}>
          <div style={{ backgroundColor: p["--color-bg-hover"], borderRadius: 16, padding: "28px", marginBottom: 36 }}>
            <span style={{ fontSize: "var(--font-size-label)", fontWeight: 600, color: p["--color-accent"], textTransform: "uppercase", letterSpacing: "0.08em" }}>Case Study · Paylocity</span>
            <h1 style={{ margin: "10px 0 0", fontSize: "1.5rem", fontWeight: 700, color: p["--color-text-primary"], lineHeight: 1.3 }}>Solo-designed an admin-facing rewards infrastructure from 0→1 ($12.3M ARR)</h1>
            <p style={{ margin: "12px 0 0", fontSize: "var(--font-size-body)", color: p["--color-text-secondary"] }}>Solo designer · 2023–2024 · B2B SaaS</p>
          </div>
          <div style={{ marginBottom: 40 }}>
            <h2 style={{ margin: "0 0 16px", fontSize: "var(--font-size-heading)", fontWeight: 600, color: p["--color-text-primary"] }}>The Problem</h2>
            <p style={{ margin: "0 0 16px", fontSize: "var(--font-size-body)", color: p["--color-text-primary"], lineHeight: 1.7 }}>
              Companies relied on external tools to give tangible rewards.{" "}
              <mark style={{ backgroundColor: p["--color-button-tonal-bg"], color: p["--color-accent"], borderRadius: 4, padding: "1px 5px", fontWeight: 600, fontStyle: "normal" }}>This created a fragmented experience</mark>
              {" "}across key archetypes — admins, managers, and employees.
            </p>
          </div>
          <div>
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
        </main>
      </div>
    </div>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function ThemeBuilderPage() {
  const { theme } = useTheme();
  const [palette, setPalette] = useState(() => ({ ...(PALETTE_PRESETS[theme.mode] ?? PALETTE_PRESETS.dark).colors }));
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState(null);
  const [previewTab, setPreviewTab] = useState("composition");

  const p = palette;

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

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", overflow: "hidden" }}>

      {/* Top bar */}
      <div style={{ flexShrink: 0, padding: "16px 32px", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-bg-primary)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <ToolkitBackLink />
          <h1 style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 600, color: "var(--color-text-primary)" }}>Theme Editor</h1>
          <p style={{ margin: 0, fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", marginTop: 1 }}>Customize palette and typography</p>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

      {/* ── Left: Preview ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Preview tab bar */}
        <div style={{
          flexShrink: 0,
          padding: "12px 24px",
          backgroundColor: p["--color-bg-card"],
          borderBottom: `1px solid ${p["--color-border"]}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
          {previewTab === "landing"     && <LandingPagePreview p={p} />}
          {previewTab === "casestudy"   && <CaseStudyPreview   p={p} />}
        </div>
      </div>

      {/* ── Right: Controls ── */}
      <div style={{ width: 360, flexShrink: 0, display: "flex", flexDirection: "column", backgroundColor: "var(--color-bg-card)", borderLeft: "1px solid var(--color-border)", boxShadow: "-8px 0 40px var(--color-shadow)" }}>
        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--color-border)", flexShrink: 0 }}>
          <p style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 600, color: "var(--color-text-primary)" }}>Palette Builder</p>
          <p style={{ margin: "2px 0 0", fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)" }}>Changes only affect the preview</p>
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
    </div>
  );
}
