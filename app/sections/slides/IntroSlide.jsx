"use client";

import React from "react";

export default function IntroSlide({ slide }) {
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
        gap: 24,
      }}
    >
      {/* accent line */}
      <div
        style={{
          width: 48,
          height: 4,
          borderRadius: 2,
          background: "var(--color-accent)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 800,
            color: "var(--color-text-primary)",
            lineHeight: 1.1,
            letterSpacing: "-0.02em",
          }}
        >
          {slide.name}
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(1rem, 2vw, 1.4rem)",
            fontWeight: 500,
            color: "var(--color-accent)",
          }}
        >
          {slide.role}
        </p>
      </div>

      <div
        style={{
          width: "100%",
          maxWidth: 560,
          height: 1,
          background: "var(--color-border)",
        }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 560 }}>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(0.9rem, 1.6vw, 1.1rem)",
            fontWeight: 600,
            color: "var(--color-text-primary)",
          }}
        >
          {slide.tagline}
        </p>
        <p
          style={{
            margin: 0,
            fontSize: "clamp(0.8rem, 1.4vw, 1rem)",
            lineHeight: 1.6,
            color: "var(--color-text-secondary)",
          }}
        >
          {slide.subtitle}
        </p>
      </div>
    </div>
  );
}
