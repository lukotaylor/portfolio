"use client";

import React, { useState } from "react";
import Link from "next/link";

// ── Icons ──────────────────────────────────────────────────────────────────────

const ChecklistIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <line x1="10" y1="6" x2="21" y2="6" />
    <line x1="10" y1="12" x2="21" y2="12" />
    <line x1="10" y1="18" x2="21" y2="18" />
    <polyline points="3 6 4 7 6 5" />
    <polyline points="3 12 4 13 6 11" />
    <polyline points="3 18 4 19 6 17" />
  </svg>
);

const LayersIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const PaintbrushIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.622 17.897-10.68-2.913" />
    <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
    <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
  </svg>
);

// ── Tool card ──────────────────────────────────────────────────────────────────

function ToolCard({ href, title, icon }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} style={{ textDecoration: "none" }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          backgroundColor: hovered ? "var(--color-button-tonal-bg)" : "var(--color-bg-card)",
          borderRadius: 20,
          boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          padding: "40px 24px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          cursor: "pointer",
          transition: "background-color 0.2s ease",
          aspectRatio: "4 / 3",
        }}
      >
        <div style={{ color: "var(--color-accent)" }}>{icon}</div>
        <span style={{
          fontSize: "var(--font-size-body)",
          fontWeight: 600,
          color: "var(--color-text-primary)",
        }}>
          {title}
        </span>
      </div>
    </Link>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

const TOOLS = [
  { href: "/tracker",         title: "Tracker",       icon: <ChecklistIcon /> },
  { href: "/design-system",   title: "Design System", icon: <LayersIcon />    },
  { href: "/workspace/theme", title: "Theme Builder", icon: <PaintbrushIcon /> },
];

export default function WorkspacePage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      <div
        className="w-full px-4 md:px-6 pt-6 md:pt-8 pb-12 mx-auto"
        style={{ maxWidth: 1200 }}
      >
        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h1
            className="font-bold tracking-tight text-text-primary m-0"
            style={{ fontSize: "var(--font-size-display)" }}
          >
            Portfolio toolkit
          </h1>
          <p
            className="m-0 mt-2 text-text-secondary"
            style={{ fontSize: "var(--font-size-body)" }}
          >
            Tools built with Claude Code to help design, track, and maintain this portfolio.
          </p>
        </div>

        {/* Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 24,
        }}>
          {TOOLS.map((tool) => (
            <ToolCard key={tool.href} {...tool} />
          ))}
        </div>
      </div>
    </div>
  );
}
