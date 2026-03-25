"use client";

import React from "react";

export default function AgendaSlide({ slide }) {
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

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {slide.items.map((item, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "flex-start",
              gap: 20,
              padding: "20px 24px",
              background: "var(--color-button-tonal-bg)",
              borderRadius: 14,
              borderLeft: "3px solid var(--color-accent)",
            }}
          >
            <span
              style={{
                fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
                fontWeight: 800,
                color: "var(--color-accent)",
                lineHeight: 1,
                flexShrink: 0,
                marginTop: 2,
              }}
            >
              {item.number}
            </span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <div
                style={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.2rem)",
                  fontWeight: 700,
                  color: "var(--color-text-primary)",
                }}
              >
                {item.label}
              </div>
              <div
                style={{
                  fontSize: "clamp(0.8rem, 1.4vw, 0.95rem)",
                  lineHeight: 1.5,
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
