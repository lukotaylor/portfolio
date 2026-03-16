"use client";

import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

function parseRGB(cssColor) {
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = cssColor;
  ctx.fillRect(0, 0, 1, 1);
  const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
  return { r, g, b };
}

function getLuminance({ r, g, b }) {
  const toLinear = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

function drawPixelGrid(canvas, accentColor, blockSize = 12) {
  const ctx = canvas.getContext("2d");
  const w = canvas.width;
  const h = canvas.height;
  const { r, g, b } = parseRGB(accentColor);

  const luminance = getLuminance({ r, g, b });
  const isLight = luminance > 0.3;

  const shadeFactors = isLight
    ? [0.93, 0.96, 0.98, 1.0, 1.03]
    : [0.78, 0.87, 0.93, 1.0, 1.08];

  const clamp = (v, f) => Math.min(255, Math.max(0, Math.round(v * f)));
  const shades = shadeFactors.map((f) => `rgb(${clamp(r, f)}, ${clamp(g, f)}, ${clamp(b, f)})`);

  for (let y = 0; y < h; y += blockSize) {
    for (let x = 0; x < w; x += blockSize) {
      ctx.fillStyle = shades[Math.floor(Math.random() * shades.length)];
      ctx.fillRect(x, y, blockSize, blockSize);
    }
  }
}

// Wraps children with the mosaic pixel-grid + noise background.
// The outer div is a flex column so children can use flex: 1 to fill height.
export default function MosaicBackground({ children, style, className }) {
  const [noiseParams, setNoiseParams] = useState({ opacity: 1, mixBlendMode: "overlay" });
  const canvasRef = useRef(null);
  const wrapperRef = useRef(null);
  const { theme } = useTheme();

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const baseColor = getComputedStyle(wrapper)
      .getPropertyValue("--color-bg-hover")
      .trim();

    const { r, g, b } = parseRGB(baseColor);
    const luminance = getLuminance({ r, g, b });

    if (luminance > 0.3) {
      setNoiseParams({ opacity: 0.35, mixBlendMode: "multiply" });
    } else if (luminance > 0.1) {
      setNoiseParams({ opacity: 0.6, mixBlendMode: "overlay" });
    } else {
      setNoiseParams({ opacity: 1, mixBlendMode: "overlay" });
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = wrapper.offsetWidth;
    canvas.height = wrapper.offsetHeight;
    drawPixelGrid(canvas, baseColor);
  }, [theme.mode]);

  return (
    <div
      ref={wrapperRef}
      className={className}
      style={{
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "var(--color-bg-hover)",
        ...style,
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <svg width="0" height="0" style={{ position: "absolute" }}>
        <filter id="mosaic-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
      </svg>

      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "url(#mosaic-noise)",
          backgroundColor: "white",
          opacity: noiseParams.opacity,
          mixBlendMode: noiseParams.mixBlendMode,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Content sits above canvas and noise layers */}
      <div style={{ position: "relative", zIndex: 2, flex: 1, display: "flex", flexDirection: "column" }}>
        {children}
      </div>
    </div>
  );
}
