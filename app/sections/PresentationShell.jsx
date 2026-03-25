"use client";

import React, { useState, useEffect, useCallback } from "react";
import { getSlides } from "../data/presentationSlides";
import { renderSlide } from "./slides/renderSlide";
import SlideThumbnail from "./slides/SlideThumbnail";

// ── icons ───────────────────────────────────────────────────────────────────

function ChevronIcon({ dir }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
      <polyline points={dir === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

function FullscreenIcon({ active }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      {active ? (
        <>
          <polyline points="8 3 3 3 3 8" />
          <polyline points="21 3 16 3 16 8" />
          <polyline points="8 21 3 21 3 16" />
          <polyline points="21 21 16 21 16 16" />
        </>
      ) : (
        <>
          <polyline points="15 3 21 3 21 9" />
          <polyline points="9 21 3 21 3 15" />
          <line x1="21" y1="3" x2="14" y2="10" />
          <line x1="3" y1="21" x2="10" y2="14" />
        </>
      )}
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function SlidesIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}

// ── shell ───────────────────────────────────────────────────────────────────

export default function PresentationShell() {
  const [mode, setMode] = useState("25");
  const [index, setIndex] = useState(0);
  const [notesOpen, setNotesOpen] = useState(false);
  const [navigatorOpen, setNavigatorOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [animDir, setAnimDir] = useState(null);

  const slides = getSlides(mode);
  const slide = slides[index] ?? slides[0];
  const total = slides.length;

  // clamp index when mode changes
  useEffect(() => {
    setIndex((i) => Math.min(i, slides.length - 1));
  }, [mode, slides.length]);

  const goTo = useCallback(
    (dir) => {
      setAnimDir(dir);
      setTimeout(() => setAnimDir(null), 250);
      setIndex((i) => {
        if (dir === "next") return Math.min(i + 1, total - 1);
        return Math.max(i - 1, 0);
      });
    },
    [total]
  );

  // keyboard navigation
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo("next");
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo("prev");
      } else if (e.key === "f" || e.key === "F") {
        toggleFullscreen();
      } else if (e.key === "n" || e.key === "N") {
        setNotesOpen((v) => !v);
      } else if (e.key === "Escape") {
        setNotesOpen(false);
        setNavigatorOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goTo]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  }

  useEffect(() => {
    function onFsChange() {
      setIsFullscreen(!!document.fullscreenElement);
    }
    document.addEventListener("fullscreenchange", onFsChange);
    return () => document.removeEventListener("fullscreenchange", onFsChange);
  }, []);

  const progressPct = total > 1 ? (index / (total - 1)) * 100 : 100;
  const isFirst = index === 0;
  const isLast = index === total - 1;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        background: "var(--color-bg-primary)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {/* ── top bar ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 20px",
          borderBottom: "1px solid var(--color-border)",
          flexShrink: 0,
          gap: 12,
        }}
      >
        {/* left: timing toggle */}
        <div style={{ display: "flex", gap: 6 }}>
          {["25", "45"].map((m) => (
            <button
              key={m}
              onClick={() => { setMode(m); setIndex(0); }}
              style={{
                padding: "4px 12px",
                borderRadius: 20,
                border: "1px solid var(--color-border)",
                background: mode === m ? "var(--color-accent)" : "transparent",
                color: mode === m ? "var(--color-button-primary-text)" : "var(--color-text-secondary)",
                fontSize: 13,
                fontWeight: 500,
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              {m} min
            </button>
          ))}
        </div>

        {/* center: slide counter */}
        <span style={{ fontSize: 13, color: "var(--color-text-tertiary)", fontWeight: 500 }}>
          {index + 1} / {total}
        </span>

        {/* right: notes + navigator + fullscreen */}
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setNotesOpen((v) => !v)}
            title="Toggle speaker notes (N)"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: notesOpen ? "var(--color-button-tonal-bg)" : "transparent",
              color: notesOpen ? "var(--color-accent)" : "var(--color-text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <NotesIcon />
          </button>
          <button
            onClick={() => setNavigatorOpen((v) => !v)}
            title="Toggle slide navigator"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: navigatorOpen ? "var(--color-button-tonal-bg)" : "transparent",
              color: navigatorOpen ? "var(--color-accent)" : "var(--color-text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <SlidesIcon />
          </button>
          <button
            onClick={toggleFullscreen}
            title="Toggle fullscreen (F)"
            style={{
              width: 36,
              height: 36,
              borderRadius: 8,
              border: "1px solid var(--color-border)",
              background: "transparent",
              color: "var(--color-text-secondary)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
            }}
          >
            <FullscreenIcon active={isFullscreen} />
          </button>
        </div>
      </div>

      {/* ── progress bar ── */}
      <div style={{ height: 3, background: "var(--color-border)", flexShrink: 0 }}>
        <div
          style={{
            height: "100%",
            width: `${progressPct}%`,
            background: "var(--color-accent)",
            transition: "width 0.3s ease",
          }}
        />
      </div>

      {/* ── main area: slide + navigator ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", minHeight: 0 }}>

        {/* slide column */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

          {/* slide content */}
          <div
            key={slide.id}
            style={{
              flex: 1,
              overflow: "hidden",
              opacity: animDir ? 0 : 1,
              transform: animDir === "next" ? "translateX(-12px)" : animDir === "prev" ? "translateX(12px)" : "none",
              transition: "opacity 0.2s ease, transform 0.2s ease",
            }}
          >
            {renderSlide(slide)}
          </div>

          {/* notes drawer */}
          {notesOpen && slide.notes && (
            <div
              style={{
                flexShrink: 0,
                borderTop: "1px solid var(--color-border)",
                background: "var(--color-bg-secondary)",
                padding: "14px 24px",
                maxHeight: "28%",
                overflowY: "auto",
              }}
            >
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.7, color: "var(--color-text-secondary)" }}>
                <span style={{ fontWeight: 600, color: "var(--color-accent)", marginRight: 8 }}>Notes</span>
                {slide.notes}
              </p>
            </div>
          )}
        </div>

        {/* ── slide navigator panel ── */}
        <div
          style={{
            width: navigatorOpen ? 228 : 0,
            flexShrink: 0,
            overflow: "hidden",
            borderLeft: navigatorOpen ? "1px solid var(--color-border)" : "none",
            background: "var(--color-bg-secondary)",
            transition: "width 0.25s ease",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* navigator header */}
          <div
            style={{
              padding: "12px 16px 8px",
              flexShrink: 0,
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <span style={{ fontSize: 11, fontWeight: 700, color: "var(--color-text-tertiary)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Slides
            </span>
          </div>

          {/* scrollable thumbnail list */}
          <div
            style={{
              flex: 1,
              overflowY: "auto",
              padding: "12px 16px",
              display: "flex",
              flexDirection: "column",
              gap: 14,
            }}
          >
            {slides.map((s, i) => (
              <SlideThumbnail
                key={s.id}
                slide={s}
                index={i}
                isActive={i === index}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ── nav arrows ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          padding: "12px 20px",
          borderTop: "1px solid var(--color-border)",
          flexShrink: 0,
        }}
      >
        <button
          onClick={() => goTo("prev")}
          disabled={isFirst}
          aria-label="Previous slide"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            background: "transparent",
            color: isFirst ? "var(--color-text-tertiary)" : "var(--color-text-primary)",
            cursor: isFirst ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isFirst ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          <ChevronIcon dir="left" />
        </button>

        {/* dot indicators */}
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
              style={{
                width: i === index ? 20 : 7,
                height: 7,
                borderRadius: 4,
                border: "none",
                background: i === index ? "var(--color-accent)" : "var(--color-border)",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.2s ease",
              }}
            />
          ))}
        </div>

        <button
          onClick={() => goTo("next")}
          disabled={isLast}
          aria-label="Next slide"
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            border: "1px solid var(--color-border)",
            background: isLast ? "transparent" : "var(--color-accent)",
            color: isLast ? "var(--color-text-tertiary)" : "var(--color-button-primary-text)",
            cursor: isLast ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: isLast ? 0.4 : 1,
            transition: "all 0.15s",
          }}
        >
          <ChevronIcon dir="right" />
        </button>
      </div>

      {/* ── keyboard hint ── */}
      <div
        style={{
          position: "absolute",
          bottom: 62,
          right: navigatorOpen ? 248 : 20,
          fontSize: 11,
          color: "var(--color-text-tertiary)",
          pointerEvents: "none",
          transition: "right 0.25s ease",
        }}
      >
        ← → navigate · N notes · F fullscreen
      </div>
    </div>
  );
}
