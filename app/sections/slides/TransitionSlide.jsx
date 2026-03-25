"use client";

import React from "react";

export default function TransitionSlide({ slide }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 60px",
        textAlign: "center",
        gap: 20,
      }}
    >
      <span
        style={{
          fontSize: "clamp(0.75rem, 1.2vw, 0.875rem)",
          fontWeight: 700,
          color: "var(--color-accent)",
          textTransform: "uppercase",
          letterSpacing: "0.12em",
        }}
      >
        Case Study {slide.number}
      </span>

      <h2
        style={{
          margin: 0,
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          fontWeight: 800,
          color: "var(--color-text-primary)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        }}
      >
        {slide.label}
      </h2>

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "8px 18px",
          borderRadius: 20,
          background: "var(--color-button-tonal-bg)",
          border: "1px solid var(--color-border)",
        }}
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth="2.5"
        >
          <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
          <polyline points="17 6 23 6 23 12" />
        </svg>
        <span
          style={{
            fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
            fontWeight: 600,
            color: "var(--color-text-secondary)",
          }}
        >
          {slide.stat}
        </span>
      </div>
    </div>
  );
}
