"use client";

import React, { useEffect, useRef } from "react";
import { renderSlide } from "./renderSlide";

// Reference dimensions the slide is rendered at before scaling
const REF_W = 1000;
const REF_H = 560;

// Display size of each thumbnail
const THUMB_W = 192;
const THUMB_H = 108;

const SCALE = THUMB_W / REF_W;

export default function SlideThumbnail({ slide, index, isActive, onClick }) {
  const ref = useRef(null);

  // Scroll into view when this becomes the active slide
  useEffect(() => {
    if (isActive && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [isActive]);

  return (
    <button
      ref={ref}
      onClick={onClick}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 5,
        padding: 0,
        border: "none",
        background: "transparent",
        cursor: "pointer",
        width: "100%",
        textAlign: "left",
        flexShrink: 0,
      }}
    >
      {/* slide number */}
      <span
        style={{
          fontSize: 11,
          fontWeight: 600,
          color: isActive ? "var(--color-accent)" : "var(--color-text-tertiary)",
          paddingLeft: 2,
          lineHeight: 1,
        }}
      >
        {index + 1}
      </span>

      {/* thumbnail frame */}
      <div
        style={{
          width: THUMB_W,
          height: THUMB_H,
          overflow: "hidden",
          borderRadius: 6,
          border: isActive
            ? "2px solid var(--color-accent)"
            : "2px solid var(--color-border)",
          position: "relative",
          background: "var(--color-bg-primary)",
          boxShadow: isActive
            ? "0 0 0 3px color-mix(in srgb, var(--color-accent) 20%, transparent)"
            : "none",
          transition: "border-color 0.15s, box-shadow 0.15s",
          flexShrink: 0,
        }}
      >
        {/* actual slide content, scaled down */}
        <div
          style={{
            width: REF_W,
            height: REF_H,
            transform: `scale(${SCALE})`,
            transformOrigin: "top left",
            pointerEvents: "none",
            userSelect: "none",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        >
          {renderSlide(slide)}
        </div>
      </div>
    </button>
  );
}
