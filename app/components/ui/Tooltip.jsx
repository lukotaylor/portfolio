"use client";

import React from "react";

/**
 * Tooltip — pure-CSS tooltip wrapper.
 * Wrap any element; on hover a label appears above (default) or below.
 *
 * Props:
 *   label     – tooltip text
 *   position  – "top" (default) | "bottom"
 *   children  – the trigger element
 */
export default function Tooltip({ label, position = "top", children }) {
  const isTop = position === "top";

  return (
    <div className="group" style={{ position: "relative", display: "inline-flex" }}>
      {children}

      <span
        role="tooltip"
        className="opacity-0 group-hover:opacity-100 transition-opacity duration-150"
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          ...(isTop
            ? { bottom: "100%", marginBottom: 8 }
            : { top: "100%", marginTop: 8 }),
          padding: "6px 10px",
          borderRadius: 6,
          backgroundColor: "var(--color-bg-card)",
          color: "var(--color-text-primary)",
          fontSize: "var(--font-size-small)",
          fontWeight: 500,
          textAlign: "center",
          whiteSpace: "nowrap",
          boxShadow: "0 2px 8px var(--color-shadow)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      >
        {label}
      </span>
    </div>
  );
}
