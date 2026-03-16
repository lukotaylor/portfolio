"use client";

import React from "react";

const SIZES = {
  sm: { size: "24px", thickness: "1px" },
  md: { size: "32px", thickness: "2px" },
  lg: { size: "64px", thickness: "3px" },
};

/**
 * Divider — replaces the inline Divider.
 * Orientation: horizontal | vertical
 * Sizes: sm | md | lg
 */
export default function Divider({
  orientation = "horizontal",
  size = "md",
  accent = false,
  className = "",
  style: styleProp = {},
  ...props
}) {
  const s = SIZES[size] || SIZES.md;
  const bg = accent ? "var(--color-accent)" : "var(--color-border)";

  const dimensions =
    orientation === "vertical"
      ? { width: s.thickness, height: s.size }
      : { width: s.size, height: s.thickness };

  return (
    <div
      className={["rounded-sm", className].join(" ")}
      style={{
        ...dimensions,
        backgroundColor: bg,
        ...styleProp,
      }}
      {...props}
    />
  );
}
