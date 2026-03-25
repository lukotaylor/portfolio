"use client";

import React from "react";

export default function WrapUpSlide({ slide }) {
  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "40px 60px",
        gap: 32,
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
          fontWeight: 600,
          color: "var(--color-text-tertiary)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
        }}
      >
        {slide.title}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {slide.themes.map((theme, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 16,
              padding: "18px 22px",
              background: "var(--color-button-tonal-bg)",
              borderRadius: 12,
            }}
          >
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                background: "var(--color-accent)",
                flexShrink: 0,
                marginTop: 6,
              }}
            />
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: "clamp(0.9rem, 1.6vw, 1.05rem)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {theme.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.8rem, 1.3vw, 0.9rem)",
                  lineHeight: 1.6,
                  color: "var(--color-text-secondary)",
                }}
              >
                {theme.description}
              </div>
            </div>
          </div>
        ))}
      </div>

      {slide.closing && (
        <p
          style={{
            margin: 0,
            fontSize: "clamp(1.4rem, 3vw, 2.2rem)",
            fontWeight: 800,
            color: "var(--color-accent)",
            letterSpacing: "-0.01em",
          }}
        >
          {slide.closing}
        </p>
      )}
    </div>
  );
}
