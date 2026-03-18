"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Button from "./Button";
import IconButton from "./IconButton";
import Footer from "./Footer";
import MosaicBackground from "./MosaicBackground";

/* ---- hooks ---- */

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isMobile;
}

/* ---- small helpers ---- */

function CarouselArrow({ direction, onClick }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMobile();
  const isLeft = direction === "left";
  if (isMobile) return null;
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`${isLeft ? "Previous" : "Next"} image`}
      className={`cs-carousel-arrow ${isLeft ? "cs-carousel-arrow-left" : "cs-carousel-arrow-right"}`}
      style={{
        position: "absolute",
        [isLeft ? "left" : "right"]: "-32px",
        top: "50%",
        transform: `translateY(-50%)${hovered ? " scale(1.1)" : ""}`,
        zIndex: 2,
        width: 52,
        height: 52,
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "all 0.2s",
        border: "none",
        boxShadow: hovered ? "0 4px 16px var(--color-shadow)" : "0 2px 8px var(--color-shadow), 0 0 0 1px var(--color-shadow)",
        background: hovered ? "var(--color-accent)" : "linear-gradient(var(--color-button-tonal-bg), var(--color-button-tonal-bg)), var(--color-bg-card)",
        color: hovered ? "var(--color-button-primary-text)" : "var(--color-accent)",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points={isLeft ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

/* ---- lightbox helpers ---- */

function LightboxArrow({ direction, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={direction === "left" ? "Previous image" : "Next image"}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: "50%",
        [direction === "left" ? "left" : "right"]: -28,
        transform: "translateY(-50%)",
        width: 52,
        height: 52,
        borderRadius: "50%",
        border: "none",
        background: hovered ? "var(--color-accent)" : "linear-gradient(var(--color-button-tonal-bg), var(--color-button-tonal-bg)), var(--color-bg-card)",
        color: hovered ? "var(--color-button-primary-text)" : "var(--color-accent)",
        boxShadow: hovered ? "0 4px 16px var(--color-shadow)" : "0 2px 8px var(--color-shadow)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2,
        flexShrink: 0,
        transition: "background-color 0.15s, color 0.15s, box-shadow 0.15s",
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
      </svg>
    </button>
  );
}

function LightboxCloseButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label="Close lightbox"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "absolute",
        top: 16,
        right: 16,
        width: 40,
        height: 40,
        borderRadius: "50%",
        border: "none",
        backgroundColor: hovered ? "var(--color-accent)" : "var(--color-bg-primary)",
        color: hovered ? "var(--color-button-primary-text)" : "var(--color-accent)",
        boxShadow: hovered ? "0 4px 16px var(--color-shadow)" : "0 2px 8px var(--color-shadow)",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
        flexShrink: 0,
        transition: "background-color 0.15s, color 0.15s, box-shadow 0.15s",
      }}
    >
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>
  );
}

/* ---- lightbox ---- */

function Lightbox({ images, startIndex = 0, thumbnails = false, mobileImages = null, mobileAlign = "center", onClose }) {
  const [index, setIndex] = useState(startIndex);
  const isMobile = useMobile();

  useEffect(() => {
    if (isMobile) onClose();
  }, [isMobile, onClose]);

  if (isMobile) return null;

  const showSideBySide = !!(mobileImages?.length);
  const currentDesktop = images[index] ?? {};
  const currentMobile = mobileImages?.[index] ?? {};
  const current = currentDesktop;
  const hasThumbs = thumbnails && images.length > 1;

  useEffect(() => {
    const saved = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handler = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") setIndex((p) => Math.max(0, p - 1));
      if (e.key === "ArrowRight") setIndex((p) => Math.min(images.length - 1, p + 1));
    };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = saved;
      window.removeEventListener("keydown", handler);
    };
  }, [images.length, onClose]);

  const arrowBtn = (dir) => (
    <LightboxArrow
      direction={dir}
      onClick={() => setIndex((p) => p + (dir === "left" ? -1 : 1))}
    />
  );

  return createPortal(
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,0.92)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: isMobile ? "56px 16px 24px" : "64px 64px 40px",
        gap: 16,
      }}
    >
      {/* Close */}
      <LightboxCloseButton onClick={onClose} />

      {/* Image area */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "min(1200px, calc(90vw - 80px))",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          flex: "1 1 0",
          minHeight: 0,
          justifyContent: "center",
        }}
      >
        {images.length > 1 && index > 0 && arrowBtn("left")}

        {showSideBySide ? (
          /* Side-by-side: desktop + mobile */
          <div style={{ display: "flex", alignItems: mobileAlign, gap: 16, width: "100%" }}>
            <div style={{ flex: "2 1 0", minWidth: 0, borderRadius: 12, overflow: "hidden" }}>
              <img
                src={currentDesktop.src}
                alt={currentDesktop.caption ?? ""}
                style={{ width: "100%", height: "auto", display: "block", maxHeight: hasThumbs ? "calc(80vh - 110px)" : "80vh", objectFit: "contain" }}
              />
            </div>
            <div style={{ flex: "0 0 22%", minWidth: 0, borderRadius: 10, overflow: "hidden" }}>
              {currentMobile.noMobile ? (
                <div style={{ width: "100%", aspectRatio: "9/19.5", backgroundColor: "var(--color-bg-card)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, borderRadius: 10 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="4" y1="4" x2="20" y2="20"/>
                  </svg>
                  <span style={{ fontSize: "var(--font-size-label)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.4, padding: "0 8px" }}>No mobile</span>
                </div>
              ) : (
                <img src={currentMobile.src} alt="Mobile" style={{ width: "100%", height: "auto", display: "block" }} />
              )}
            </div>
          </div>
        ) : (
          /* Single image */
          <img
            src={current.src}
            alt={current.caption ?? ""}
            style={{
              maxWidth: "100%",
              maxHeight: hasThumbs ? "calc(85vh - 110px)" : "85vh",
              objectFit: "contain",
              borderRadius: 8,
              display: "block",
            }}
          />
        )}

        {images.length > 1 && index < images.length - 1 && arrowBtn("right")}

        {current.caption && (
          <p style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-small)", textAlign: "center", margin: "12px 0 0", lineHeight: 1.5 }}>
            {current.caption}
          </p>
        )}
      </div>

      {/* Thumbnails */}
      {hasThumbs && (
        <div
          onClick={(e) => e.stopPropagation()}
          style={{ display: "flex", gap: 6, overflowX: "auto", paddingBottom: 4, maxWidth: "min(1200px, calc(90vw - 80px))", flexShrink: 0 }}
        >
          {images.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setIndex(idx)}
              aria-label={`Go to image ${idx + 1}`}
              style={{
                flexShrink: 0,
                width: isMobile ? 80 : 120,
                height: isMobile ? 45 : 68,
                padding: 0,
                border: idx === index ? "2px solid var(--color-accent)" : "2px solid var(--color-border)",
                borderRadius: 6,
                overflow: "hidden",
                cursor: "pointer",
                opacity: idx === index ? 1 : 0.45,
                transition: "opacity 0.2s, border-color 0.2s",
                background: "none",
              }}
              onMouseEnter={(e) => { if (idx !== index) e.currentTarget.style.opacity = 0.75; }}
              onMouseLeave={(e) => { if (idx !== index) e.currentTarget.style.opacity = 0.45; }}
            >
              <img src={item.src} alt={`Thumbnail ${idx + 1}`} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}

function MatchHeightRow({ items, fill, bg, borderRadius = 12, gap = 16, onImageClick }) {
  const [ratios, setRatios] = useState(() => new Array(items.length).fill(null));

  const handleLoad = (e, idx) => {
    const { naturalWidth, naturalHeight } = e.target;
    if (!naturalHeight) return;
    setRatios((prev) => {
      const next = [...prev];
      next[idx] = naturalWidth / naturalHeight;
      return next;
    });
  };

  const allLoaded = ratios.every((r) => r !== null);

  return (
    <div style={{ display: "flex", width: "100%", gap, alignItems: "flex-start" }}>
      {items.map(({ src, caption, grayscale }, idx) => (
        <div
          key={idx}
          style={{
            flex: allLoaded ? `${ratios[idx]} 1 0` : "1 1 0",
            minWidth: 0,
            backgroundColor: bg ? "var(--color-bg-card)" : undefined,
            borderRadius: bg ? 16 : undefined,
            padding: bg ? 24 : undefined,
          }}
        >
          <img
            src={src}
            onLoad={(e) => handleLoad(e, idx)}
            onClick={onImageClick ? () => onImageClick(idx) : undefined}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: bg ? 0 : borderRadius,
              objectFit: fill ? "cover" : undefined,
              filter: grayscale ? "grayscale(1)" : undefined,
              cursor: onImageClick ? "zoom-in" : undefined,
            }}
          />
          {caption && (
            <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
              {caption}
            </p>
          )}
        </div>
      ))}
    </div>
  );
}

function MosaicBlock({ block }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isMobile = useMobile();
  const columns = block.columns ?? 3;
  const gap = block.gap ?? 12;
  const images = (block.images ?? []).map((img) =>
    typeof img === "string" ? { src: img } : img
  );

  return (
    <div>
      {block.description && (
        <p style={{ margin: "0 0 24px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
          <HighlightedText text={block.description} />
        </p>
      )}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
        }}
      >
        {images.map(({ src, caption, span = 1, rowSpan = 1, aspectRatio }, idx) => (
          <div
            key={idx}
            style={{
              gridColumn: `span ${Math.min(span, columns)}`,
              gridRow: rowSpan > 1 ? `span ${rowSpan}` : undefined,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              onClick={!isMobile ? () => setLightboxIndex(idx) : undefined}
              style={{
                flex: 1,
                borderRadius: 12,
                overflow: "hidden",
                aspectRatio: aspectRatio ?? (rowSpan > 1 ? undefined : "4/3"),
                cursor: isMobile ? "default" : "zoom-in",
              }}
            >
              <img
                src={src}
                alt={caption ?? ""}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
            {caption && (
              <p style={{ margin: "6px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
                {caption}
              </p>
            )}
          </div>
        ))}
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  );
}

function SectionNavButton({ label, active, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="text-left border-none cursor-pointer transition-all duration-200 rounded-md"
      style={{
        padding: "10px 16px",
        marginLeft: "-16px",
        fontSize: "var(--font-size-small)",
        fontWeight: "400",
        backgroundColor: active ? "var(--color-button-tonal-bg)" : hovered ? "var(--color-button-tonal-bg)" : "transparent",
        color: active ? "var(--color-accent)" : hovered ? "var(--color-text-primary)" : "var(--color-text-secondary)",
      }}
    >
      {label}
    </button>
  );
}

/* ---- highlight parser — use ==text== in content strings ---- */

function HighlightedText({ text }) {
  const parts = text.split(/(==.+?==|\*\*.+?\*\*|__.+?__)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark
              key={i}
              style={{
                backgroundColor: "var(--color-button-tonal-bg)",
                color: "var(--color-accent)",
                borderRadius: 4,
                padding: "1px 4px",
                fontWeight: 600,
                fontStyle: "normal",
              }}
            >
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <span
              key={i}
              style={{
                color: "var(--color-accent)",
                fontWeight: 600,
              }}
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        if (part.startsWith("__") && part.endsWith("__")) {
          return (
            <span
              key={i}
              style={{ textDecoration: "underline", textUnderlineOffset: 3, color: "var(--color-accent)" }}
            >
              {part.slice(2, -2)}
            </span>
          );
        }
        return part;
      })}
    </>
  );
}

/* ---- audio player ---- */

function AudioPlayer({ audio }) {
  const [playing, setPlaying] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubHovered, setScrubHovered] = useState(false);
  const audioRef = useRef(null);
  const scrubRef = useRef(null);

  const parseTime = (str) => {
    if (!str) return 0;
    const [m, s] = str.split(":").map(Number);
    return m * 60 + (s || 0);
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    if (audio?.duration) setDuration(parseTime(audio.duration));
  }, [audio?.duration]);

  useEffect(() => {
    const el = audioRef.current;
    if (!el) return;
    const onTimeUpdate = () => setElapsed(el.currentTime);
    const onLoadedMetadata = () => setDuration(el.duration);
    const onEnded = () => { setPlaying(false); setElapsed(0); el.currentTime = 0; };
    el.addEventListener("timeupdate", onTimeUpdate);
    el.addEventListener("loadedmetadata", onLoadedMetadata);
    el.addEventListener("ended", onEnded);
    return () => {
      el.removeEventListener("timeupdate", onTimeUpdate);
      el.removeEventListener("loadedmetadata", onLoadedMetadata);
      el.removeEventListener("ended", onEnded);
    };
  }, []);

  // Pause and reset on unmount
  useEffect(() => {
    return () => {
      const el = audioRef.current;
      if (el) { el.pause(); el.currentTime = 0; }
    };
  }, []);

  const togglePlay = () => {
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); } else { el.play(); }
    setPlaying((p) => !p);
  };

  const seek = (e) => {
    const el = audioRef.current;
    if (!el || !duration || !scrubRef.current) return;
    const rect = scrubRef.current.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    el.currentTime = ratio * duration;
    setElapsed(ratio * duration);
  };

  const progress = duration > 0 ? elapsed / duration : 0;

  return (
    <div>
      <audio ref={audioRef} src={audio.src} preload="metadata" />

      {/* Label */}
      <div className="mb-3 uppercase tracking-widest font-semibold text-text-tertiary" style={{ fontSize: "var(--font-size-label)" }}>
        Listen to case study
      </div>

      {/* Controls row: play button + scrub bar + time */}
      <div className="flex items-center" style={{ gap: 10 }}>
        <button
          onClick={togglePlay}
          aria-label={playing ? "Pause" : "Play case study audio"}
          className="flex items-center justify-center rounded-full cursor-pointer transition-all duration-200 flex-shrink-0"
          style={{
            width: 28,
            height: 28,
            backgroundColor: "var(--color-button-tonal-bg)",
            color: "var(--color-accent)",
            border: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-accent)";
            e.currentTarget.style.color = "var(--color-button-primary-text)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "var(--color-button-tonal-bg)";
            e.currentTarget.style.color = "var(--color-accent)";
          }}
        >
          {playing ? (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <rect x="5" y="4" width="4" height="16" rx="1" />
              <rect x="15" y="4" width="4" height="16" rx="1" />
            </svg>
          ) : (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="6 3 20 12 6 21 6 3" />
            </svg>
          )}
        </button>

        {/* Scrub bar — fills remaining space */}
        <div
          ref={scrubRef}
          onClick={seek}
          onMouseEnter={() => setScrubHovered(true)}
          onMouseLeave={() => setScrubHovered(false)}
          style={{
            flex: 1,
            height: scrubHovered ? 6 : 4,
            backgroundColor: "var(--color-border)",
            borderRadius: 3,
            cursor: "pointer",
            position: "relative",
            transition: "height 0.15s ease",
          }}
        >
          <div style={{
            width: `${progress * 100}%`,
            height: "100%",
            backgroundColor: "var(--color-accent)",
            borderRadius: 3,
            pointerEvents: "none",
          }} />
          {(scrubHovered || playing) && (
            <div style={{
              position: "absolute",
              top: "50%",
              left: `${progress * 100}%`,
              transform: "translate(-50%, -50%)",
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: "var(--color-accent)",
              pointerEvents: "none",
            }} />
          )}
        </div>

        <span style={{
          fontSize: "var(--font-size-label)",
          color: "var(--color-text-tertiary)",
          whiteSpace: "nowrap",
          fontVariantNumeric: "tabular-nums",
          flexShrink: 0,
        }}>
          {playing
            ? `${formatTime(elapsed)} / ${formatTime(duration)}`
            : formatTime(duration)}
        </span>
      </div>
    </div>
  );
}

/* ---- inline carousel block ---- */

function CarouselBlock({ block }) {
  const isMobile = useMobile();
  const [view, setView] = useState("desktop");
  const [index, setIndex] = useState(0);
  const [lightbox, setLightbox] = useState(null); // { images, startIndex, thumbnails }

  const hasMobileView = !!block.mobileImages?.length;
  const sideBySide = hasMobileView && block.sideBySide;

  const desktopItems = (block.images ?? []).map((img) =>
    typeof img === "string" ? { src: img, caption: null } : img
  );
  const mobileItems = (block.mobileImages ?? []).map((img) =>
    typeof img === "string" ? { src: img, caption: null } : img
  );
  const items = view === "mobile" && hasMobileView && !sideBySide ? mobileItems : desktopItems;

  const switchView = (newView) => setView(newView);

  if (!items.length) return null;

  const allSrcs = [
    ...desktopItems.map((i) => i.src),
    ...mobileItems.filter((i) => i?.src).map((i) => i.src),
  ];

  return (
    <div>
      <div style={{ display: "none" }} aria-hidden="true">
        {allSrcs.map((src) => <img key={src} src={src} alt="" />)}
      </div>
      {block.description && (
        <div style={{ marginBottom: 32 }}>
          {block.description.split("\n\n").map((para, j, arr) => {
            const lines = para.split("\n");
            return (
              <p key={j} style={{ margin: j === arr.length - 1 ? 0 : "0 0 28px 0", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
                {lines.map((line, k) => (
                  <span key={k}>
                    <HighlightedText text={line} />
                    {k < lines.length - 1 && <br />}
                  </span>
                ))}
              </p>
            );
          })}
        </div>
      )}
      {hasMobileView && !sideBySide && (
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
          <div style={{ display: "flex", backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 20, padding: 3 }}>
            {[
              { v: "desktop", icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg> },
              { v: "mobile",  icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><circle cx="12" cy="17" r="1"/></svg> },
            ].map(({ v, icon }) => (
              <button key={v} onClick={() => switchView(v)} style={{ border: "none", borderRadius: 16, padding: "5px 12px", fontSize: "var(--font-size-label)", fontWeight: 500, cursor: "pointer", backgroundColor: view === v ? "var(--color-bg-card)" : "transparent", color: view === v ? "var(--color-text-primary)" : "var(--color-text-tertiary)", transition: "background-color 0.2s, color 0.2s", textTransform: "capitalize", display: "flex", alignItems: "center", gap: 5 }}>
                {icon}{v}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ position: "relative" }}>
        {sideBySide ? (
          <div
            onClick={!isMobile ? () => setLightbox({ images: desktopItems, startIndex: index, thumbnails: !!block.thumbnails, mobileImages: mobileItems, mobileAlign: block.mobileAlign ?? "center" }) : undefined}
            style={{ display: "flex", alignItems: block.mobileAlign ?? "center", gap: 16, cursor: isMobile ? "default" : "zoom-in" }}
          >
            <div style={{ flex: "2 1 0", minWidth: 0, borderRadius: isMobile ? 6 : 12, overflow: "hidden" }}>
              <img src={desktopItems[index].src} alt={block.alt ?? ""} style={{ width: "100%", height: "auto", display: "block" }} />
            </div>
            <div style={{ flex: "0 0 22%", minWidth: 0, borderRadius: isMobile ? 6 : 10, overflow: "hidden" }}>
              {mobileItems[index]?.noMobile ? (
                <div style={{ width: "100%", aspectRatio: "9/19.5", backgroundColor: "var(--color-button-tonal-bg)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <line x1="4" y1="4" x2="20" y2="20"/>
                  </svg>
                  <span style={{ fontSize: "0.625rem", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.4, padding: "0 8px" }}>Mobile not available</span>
                </div>
              ) : (
                <img src={mobileItems[index]?.src} alt="Mobile" style={{ width: "100%", height: "auto", display: "block" }} />
              )}
            </div>
          </div>
        ) : (
          <div
            onClick={!isMobile ? () => setLightbox({ images: items, startIndex: index, thumbnails: !!block.thumbnails }) : undefined}
            style={{ borderRadius: isMobile ? 6 : 12, overflow: "hidden", cursor: isMobile ? "default" : "zoom-in" }}
          >
            <img src={items[index].src} alt={block.alt ?? ""} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
          </div>
        )}
        {items.length > 1 && (
          <>
            {index > 0 && <CarouselArrow direction="left" onClick={() => setIndex(index - 1)} />}
            {index < items.length - 1 && <CarouselArrow direction="right" onClick={() => setIndex(index + 1)} />}
          </>
        )}
      </div>
      {(sideBySide ? desktopItems[index].caption : items[index].caption) && (
        <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
          {sideBySide ? desktopItems[index].caption : items[index].caption}
        </p>
      )}
      {items.length > 1 && (
        block.thumbnails ? (
          <div style={{ display: "flex", gap: 6, marginTop: 10, overflowX: "auto", paddingBottom: 2, justifyContent: "center" }}>
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                style={{
                  flexShrink: 0,
                  width: isMobile ? 80 : 120,
                  height: isMobile ? 45 : 68,
                  padding: 0,
                  border: idx === index ? "2px solid var(--color-accent)" : "2px solid transparent",
                  borderRadius: 6,
                  overflow: "hidden",
                  cursor: "pointer",
                  opacity: idx === index ? 1 : 0.45,
                  transition: "opacity 0.2s, border-color 0.2s",
                  background: "none",
                }}
                onMouseEnter={e => { if (idx !== index) e.currentTarget.style.opacity = 0.75; }}
                onMouseLeave={e => { if (idx !== index) e.currentTarget.style.opacity = 0.45; }}
              >
                <img
                  src={item.src}
                  alt={`Thumbnail ${idx + 1}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-2 mt-4">
            {items.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className="border-none cursor-pointer p-0 rounded transition-all duration-200"
                style={{
                  width: idx === index ? "32px" : "8px",
                  height: "8px",
                  backgroundColor: idx === index ? "var(--color-accent)" : "var(--color-border)",
                }}
              />
            ))}
          </div>
        )
      )}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.startIndex}
          thumbnails={lightbox.thumbnails}
          mobileImages={lightbox.mobileImages ?? null}
          mobileAlign={lightbox.mobileAlign ?? "center"}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}

/* ---- block renderers ---- */

function TableBlock({ block, i }) {
  const headers = block.headers ?? [];
  const rows = block.rows ?? [];
  return (
    <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {block.description && (
        <p className="leading-[1.7] text-text-primary m-0" style={{ fontSize: "var(--font-size-body)" }}>
          <HighlightedText text={block.description} />
        </p>
      )}
      <div style={{ borderRadius: 14, overflow: "hidden" }}>
        {headers.length > 0 && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", backgroundColor: "var(--color-button-tonal-bg)", borderBottom: "1px solid var(--color-border)" }}>
            {headers.map((h, hi) => (
              <div key={hi} style={{ padding: "10px 16px", borderRight: hi < headers.length - 1 ? "1px solid var(--color-border)" : "none" }}>
                <span style={{ fontSize: "var(--font-size-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--color-accent)" }}>{h}</span>
              </div>
            ))}
          </div>
        )}
        {rows.map((row, ri) => (
          <div key={ri} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderBottom: ri < rows.length - 1 ? "1px solid var(--color-border)" : "none", backgroundColor: "var(--color-bg-card)" }}>
            <div style={{ padding: "14px 16px", borderRight: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-primary)", lineHeight: 1.6, fontWeight: 500 }}>
                <HighlightedText text={row.col1} />
              </span>
            </div>
            <div style={{ padding: "14px 16px" }}>
              {Array.isArray(row.col2) ? (
                <ul className="flex flex-col list-none p-0 m-0" style={{ gap: 6 }}>
                  {row.col2.map((item, bi) => (
                    <li key={bi} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                      <span style={{ color: "var(--color-accent)", fontSize: "var(--font-size-label)", marginTop: "0.4em", flexShrink: 0 }}>✦</span>
                      <span style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                        <HighlightedText text={item} />
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <span style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                  <HighlightedText text={row.col2} />
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonBlock({ block, i }) {
  return (
    <div>
      {block.description && (
        <p style={{ margin: "0 0 20px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
          <HighlightedText text={block.description} />
        </p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {block.options.map((option, oi) => (
          <div key={oi} style={{
            borderRadius: 12,
            overflow: "hidden",
            wordBreak: "break-word",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
          }}>
            <div style={{ padding: "12px 16px", backgroundColor: "var(--color-button-tonal-bg)", borderBottom: "1px solid var(--color-border)" }}>
              <span style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-accent)" }}>{option.label}</span>
            </div>
            <div style={{ padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, backgroundColor: "var(--color-bg-card)", flex: 1 }}>
              {option.items?.map((item, ii) => {
                const isPro = item.type === "pro";
                const isCon = item.type === "con";
                return (
                  <div key={ii} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <span style={{ flexShrink: 0, fontSize: "var(--font-size-small)", marginTop: "0.15em", color: isPro ? "#22c55e" : isCon ? "#ef4444" : "var(--color-accent)" }}>
                      {isPro ? "✓" : isCon ? "✗" : "·"}
                    </span>
                    <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                      <HighlightedText text={item.text} />
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ImageBlock({ block }) {
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const isMobile = useMobile();

  const items = block.images
    ? block.images.map((img) => (typeof img === "string" ? { src: img, caption: null } : img))
    : block.src
    ? [{ src: block.src, caption: block.caption ?? null }]
    : [];
  if (!items.length) return null;

  const isSingle = items.length === 1;
  const isNatural = block.fit === "natural";
  const isMatchHeight = block.fit === "match-height";
  const isContain = block.fit === "contain";
  const gridClass = isSingle
    ? ""
    : items.length === 2
    ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
    : "grid grid-cols-1 sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4";

  const descriptionBlock = block.description ? (
    <div style={{ marginBottom: 32 }}>
      {block.description.split("\n\n").map((para, j, arr) => {
        const lines = para.split("\n");
        return (
          <p key={j} style={{ margin: j === arr.length - 1 ? 0 : "0 0 28px 0", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            {lines.map((line, k) => (
              <span key={k}>
                <HighlightedText text={line} />
                {k < lines.length - 1 && <br />}
              </span>
            ))}
          </p>
        );
      })}
    </div>
  ) : null;

  if (isContain) {
    const containHeight = block.height ?? 240;
    return (
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 16 }}>
          {items.map(({ src, caption }, idx) => (
            <div key={idx}>
              <div style={{
                backgroundColor: block.bg ? "var(--color-bg-card)" : undefined,
                borderRadius: block.bg ? 16 : (isMobile ? 6 : 12),
                padding: block.bg ? 24 : 0,
                height: containHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
                <img
                  src={src}
                  alt={block.alt ?? ""}
                  onClick={() => setLightboxIndex(idx)}
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain", borderRadius: 8, display: "block", cursor: "zoom-in" }}
                />
              </div>
              {caption && (
                <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
                  {caption}
                </p>
              )}
            </div>
          ))}
        </div>
        {lightboxIndex !== null && (
          <Lightbox images={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </>
    );
  }

  if (isMatchHeight) {
    return (
      <>
        <div>
          {descriptionBlock}
          <MatchHeightRow items={items} fill={block.fill} bg={block.bg} borderRadius={isMobile ? 6 : 12} onImageClick={(idx) => setLightboxIndex(idx)} />
        </div>
        {lightboxIndex !== null && (
          <Lightbox images={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
        )}
      </>
    );
  }

  return (
    <>
      <div>
        {descriptionBlock}
        <div className={gridClass}>
          {items.map(({ src, caption, grayscale }, idx) => (
            <div key={idx}>
              <div style={{ position: "relative", backgroundColor: block.bg ? "var(--color-bg-card)" : undefined, borderRadius: block.bg ? 16 : undefined, padding: block.bg ? 24 : undefined }}>
                <img
                  src={src}
                  alt={block.alt ?? ""}
                  onClick={() => setLightboxIndex(idx)}
                  style={{
                    width: "100%",
                    height: "auto",
                    aspectRatio: (!isSingle && !isNatural) ? "4/3" : undefined,
                    borderRadius: block.bg ? 0 : (isMobile ? 6 : 12),
                    display: "block",
                    objectFit: (!isSingle && !isNatural) ? "cover" : undefined,
                    filter: grayscale ? "grayscale(1)" : undefined,
                    cursor: "zoom-in",
                  }}
                />
                {block.link && (
                  <a
                    href={block.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ position: "absolute", top: 10, right: 10, textDecoration: "none" }}
                  >
                    <IconButton
                      variant="primary"
                      size="sm"
                      ariaLabel="Open in Whimsical"
                      icon={
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6.5M11.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    />
                  </a>
                )}
              </div>
              {caption && (
                <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
                  {caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox images={items} startIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />
      )}
    </>
  );
}

function DeviceCompareBlock({ block }) {
  const isMobile = useMobile();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
        <div style={{ flex: "2 1 0", minWidth: 0 }}>
          <img
            src={block.desktop.src}
            alt="Desktop"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: isMobile ? 6 : 10 }}
          />
        </div>
        <div style={{ flex: "0 0 22%", minWidth: 0 }}>
          <img
            src={block.mobile.src}
            alt="Mobile"
            style={{ width: "100%", height: "auto", display: "block", borderRadius: isMobile ? 6 : 10 }}
          />
        </div>
      </div>
      {block.caption && (
        <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
          {block.caption}
        </p>
      )}
    </div>
  );
}

function renderBlock(block, i) {
  if (block.type === "table" && block.rows?.length) {
    return <TableBlock key={i} block={block} i={i} />;
  }
  if (block.type === "list" && block.items) {
    return (
      <div key={i} className="flex flex-col" style={{ gap: block.description ? "12px" : 0 }}>
        {block.description && (
          <p className="leading-[1.7] text-text-primary m-0" style={{ fontSize: "var(--font-size-body)" }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <ul className="flex flex-col list-none p-0 m-0">
          {block.items.map((item, j) => (
            <li key={j} className="flex gap-3 leading-relaxed" style={{ fontSize: "var(--font-size-body)" }}>
              <span className="text-accent leading-relaxed" style={{ fontSize: "var(--font-size-small)", marginTop: "0.25em", flexShrink: 0 }}>✦</span>
              <span className="text-text-primary leading-relaxed"><HighlightedText text={item} /></span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (block.type === "metrics" && block.metrics) {
    const footnotes = block.metrics.map((m) => m.footnote).filter(Boolean);
    return (
      <div key={i} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="grid grid-cols-1 sm:grid-cols-3" style={{ gap: 16 }}>
          {block.metrics.map((metric, j) => (
            <div key={j} className="flex flex-col gap-1 text-center">
              <div className="font-semibold leading-tight text-accent" style={{ fontSize: "clamp(2rem, 5vw, 3rem)" }}>{metric.value}</div>
              <p className="m-0 font-medium leading-snug text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
                {metric.label}{metric.footnote && <span style={{ color: "var(--color-accent)" }}>*</span>}
              </p>
            </div>
          ))}
        </div>
        {footnotes.length > 0 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {footnotes.map((note, j) => (
              <p key={j} className="m-0" style={{ fontSize: "0.6875rem", color: "var(--color-text-tertiary)", lineHeight: 1.5 }}>
                * {note}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (block.type === "personas" && block.items?.length) {
    return (
      <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {block.items.map((persona, j) => (
          <div
            key={j}
            className="flex flex-row md:flex-col gap-4 md:gap-2"
            style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 16, padding: "20px" }}
          >
            {/* Avatar */}
            {persona.image ? (
              <img
                src={persona.image}
                alt={persona.name || "Persona"}
                className="w-14 h-14 md:w-[72px] md:h-[72px] md:self-center flex-shrink-0"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <div className="w-14 h-14 md:w-[72px] md:h-[72px] flex-shrink-0" style={{ borderRadius: "50%", backgroundColor: "var(--color-bg-secondary)" }} />
            )}

            {/* Content */}
            <div className="flex flex-col flex-1 gap-2 md:items-center md:text-center">
              <div>
                {persona.name && (
                  <div style={{ fontWeight: 600, fontSize: "var(--font-size-body)", color: "var(--color-text-primary)" }}>{persona.name}</div>
                )}
                {persona.role && (
                  <div style={{ fontSize: "var(--font-size-small)", fontWeight: 500, color: "var(--color-accent)", marginBottom: 4 }}>{persona.role}</div>
                )}
                {persona.meta?.filter(Boolean).length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {persona.meta.filter(Boolean).map((m, idx) => (
                      <div key={idx} style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{m}</div>
                    ))}
                  </div>
                )}
              </div>
              <div className="self-stretch text-left" style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {persona.jtbd?.map((job, idx) => (
                  <p key={idx} style={{ margin: 0, fontSize: "var(--font-size-small)", lineHeight: 1.6, color: "var(--color-text-primary)" }}>
                    <HighlightedText text={job} />
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (block.type === "quote" && block.content) {
    return (
      <blockquote
        key={i}
        style={{
          position: "relative",
          margin: 0,
          padding: "28px 32px 28px 48px",
          borderLeft: "4px solid var(--color-accent)",
          backgroundColor: "var(--color-button-tonal-bg)",
          borderRadius: "0 16px 16px 0",
        }}
      >
        <span style={{ position: "absolute", top: 12, left: 16, fontSize: "3rem", lineHeight: 1, color: "var(--color-accent)", fontWeight: 700, userSelect: "none" }}>&ldquo;</span>
        <p
          style={{
            margin: 0,
            marginTop: 4,
            fontSize: "var(--font-size-body)",
            lineHeight: 1.7,
            fontStyle: "normal",
            color: "var(--color-text-primary)",
            fontWeight: 500,
          }}
        >
          <HighlightedText text={block.content} />
        </p>
        {block.attribution && (
          <footer
            style={{
              marginTop: 12,
              fontSize: "var(--font-size-small)",
              color: "var(--color-text-tertiary)",
              fontStyle: "normal",
              fontWeight: 500,
            }}
          >
            {block.attribution}
          </footer>
        )}
      </blockquote>
    );
  }

  if (block.type === "highlight" && block.content) {
    return (
      <div key={i} className="leading-[1.7] whitespace-pre-line text-text-primary m-0" style={{ fontSize: "var(--font-size-body)" }}>
        <HighlightedText text={block.content} />
      </div>
    );
  }

  if (block.type === "callout" && (block.header || block.content)) {
    return (
      <div
        key={i}
        className="p-4 md:p-5"
        style={{
          backgroundColor: "var(--color-button-tonal-bg)",
          borderRadius: 12,
        }}
      >
        {block.header && (
          <h4 className={`font-semibold leading-snug text-text-primary m-0${block.content ? " mb-2" : ""}`} style={{ fontSize: "var(--font-size-body)" }}>
            {block.header}
          </h4>
        )}
        {block.content && (
          <p className="m-0 leading-[1.7] text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
            <HighlightedText text={block.content} />
          </p>
        )}
      </div>
    );
  }

  if (block.type === "paragraph" && block.content) {
    return (
      <div key={i} className="leading-[1.7] text-text-primary m-0" style={{ fontSize: "var(--font-size-body)" }}>
        {block.content.split("\n\n").map((paragraph, j, arr) => {
          const m = paragraph.match(/^\*(.+?)\*[ \t\n]+(.+)$/s);
          if (m) {
            const bodyLines = m[2].split("\n");
            return (
              <div key={j} style={{ marginBottom: j === arr.length - 1 ? 0 : 28 }}>
                <span className="font-semibold text-accent">{m[1]}</span>
                <br />
                {bodyLines.map((line, k) => (
                  <span key={k}>
                    <HighlightedText text={line} />
                    {k < bodyLines.length - 1 && <br />}
                  </span>
                ))}
              </div>
            );
          }
          const lines = paragraph.split("\n");
          return (
            <p key={j} style={{ margin: j === arr.length - 1 ? 0 : "0 0 28px 0", lineHeight: "1.7" }}>
              {lines.map((line, k) => (
                <span key={k}>
                  <HighlightedText text={line} />
                  {k < lines.length - 1 && <br />}
                </span>
              ))}
            </p>
          );
        })}
      </div>
    );
  }

  if (block.type === "container" && block.items?.length) {
    const cls = `cb-${i}`;
    const CONTAINER_ICONS = {
      alert:          <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>,
      users:          <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
      globe:          <><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></>,
      lock:           <><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></>,
      clock:          <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></>,
      ban:            <><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></>,
      "trending-down":<><polyline points="23 18 13.5 8.5 8.5 13.5 1 6"/><polyline points="17 18 23 18 23 12"/></>,
      zap:            <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>,
      flag:           <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></>,
      star:           <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>,
      "dollar-sign":  <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>,
      database:       <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></>,
      "x-octagon":    <><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></>,
    };
    return (
      <React.Fragment key={i}>
        <style>{`
          .${cls} { display: grid; grid-template-columns: 1fr; gap: 16px; }
          @media (min-width: 640px) {
            .${cls} { grid-template-columns: repeat(2, 1fr); }
          }
          @media (min-width: 1024px) {
            .${cls} { grid-template-columns: repeat(${Math.min(block.columns ?? block.items.length, 4)}, 1fr); }
          }
        `}</style>
        <div className={cls}>
          {block.items.map((item, idx) => (
            <div
              key={idx}
              style={{
                borderRadius: 12,
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--color-button-tonal-bg)",
              }}
            >
              <div style={{ padding: "14px 16px", flex: 1, display: "flex", flexDirection: "column", boxSizing: "border-box" }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt=""
                    style={{ width: "100%", borderRadius: 8, objectFit: "cover", marginBottom: 12, display: "block" }}
                  />
                )}
                {item.icon && !item.image && (
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--color-accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: 10, flexShrink: 0, display: "block" }}>
                    {CONTAINER_ICONS[item.icon] ?? CONTAINER_ICONS.alert}
                  </svg>
                )}
                <div style={{ paddingBottom: item.footnote ? "12px" : 0 }}>
                  <div style={{
                    fontWeight: "600",
                    fontSize: "var(--font-size-body)",
                    color: "var(--color-text-primary)",
                    marginBottom: item.description ? "4px" : 0,
                  }}>
                    {item.title}
                  </div>
                  {item.description && (
                    <div style={{
                      fontSize: "var(--font-size-small)",
                      color: "var(--color-text-secondary)",
                      lineHeight: "1.5",
                    }}>
                      <HighlightedText text={item.description} />
                    </div>
                  )}
                </div>
                {item.footnote && (
                  <div style={{
                    fontSize: "var(--font-size-small)",
                    color: "var(--color-text-tertiary)",
                    lineHeight: "1.5",
                    margin: "auto -16px -14px",
                    padding: "10px 16px",
                    backgroundColor: "var(--color-bg-primary)",
                    borderRadius: "0 0 16px 16px",
                  }}>
                    {item.footnote.href ? (
                      <a
                        href={item.footnote.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "var(--color-accent)",
                          textDecoration: "underline",
                          textUnderlineOffset: "2px",
                        }}
                      >
                        {item.footnote.text}
                      </a>
                    ) : (
                      typeof item.footnote === "object" ? item.footnote.text : item.footnote
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </React.Fragment>
    );
  }

  if (block.type === "flow" && block.steps?.length) {
    const isVertical = block.direction === "vertical";
    const n = block.steps.length;
    const cls = `flow-cv-${i}`;

    const ArrowDown = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-tertiary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="5" x2="12" y2="19" />
        <polyline points="5 12 12 19 19 12" />
      </svg>
    );

    if (isVertical) {
      return (
        <div key={i} style={{ width: "100%" }} className="flex flex-col">
          {block.description && (
            <p style={{ margin: "0 0 32px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
              <HighlightedText text={block.description} />
            </p>
          )}
          {block.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                width: "100%",
                backgroundColor: "var(--color-bg-card)",
                border: "2px solid var(--color-border)",
                borderRadius: 12,
                padding: "14px 16px",
                boxSizing: "border-box",
              }}>
                <div style={{ fontWeight: "600", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", marginBottom: step.description ? "4px" : 0 }}>
                  <HighlightedText text={step.title} />
                </div>
                {step.description && (
                  <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: "1.5" }}>
                    <HighlightedText text={step.description} />
                  </div>
                )}
              </div>
              {idx < n - 1 && (
                <div className="flex justify-center py-1.5"><ArrowDown /></div>
              )}
            </React.Fragment>
          ))}
        </div>
      );
    }

    const ArrowRight = () => (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, color: "var(--color-text-tertiary)" }}>
        <line x1="5" y1="12" x2="19" y2="12" />
        <polyline points="12 5 19 12 12 19" />
      </svg>
    );

    return (
      <div key={i} style={{ width: "100%", minWidth: 0 }}>
        {block.description && (
          <p style={{ margin: "0 0 32px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        {/* Mobile: vertical stack with down arrows */}
        <div className="flex flex-col sm:hidden" style={{ gap: 8 }}>
          {block.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                backgroundColor: "var(--color-button-tonal-bg)",
                borderRadius: 12,
                padding: "12px 16px",
                textAlign: "left",
              }}>
                <div style={{ fontWeight: 400, fontSize: "var(--font-size-small)", color: "var(--color-text-primary)" }}><HighlightedText text={step.title} /></div>
                {step.description && (
                  <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: "1.5", marginTop: 4 }}><HighlightedText text={step.description} /></div>
                )}
              </div>
              {idx < n - 1 && (
                <div className="flex justify-center">
                  <ArrowDown />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Desktop: horizontal row with arrow separators */}
        <div className="hidden sm:flex items-stretch" style={{ gap: 8, overflowX: "auto" }}>
          {block.steps.map((step, idx) => (
            <React.Fragment key={idx}>
              <div style={{
                flex: "1 1 80px",
                minWidth: 0,
                backgroundColor: "var(--color-button-tonal-bg)",
                borderRadius: 12,
                padding: "12px 16px",
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
              }}>
                <div style={{ fontWeight: 400, fontSize: "var(--font-size-small)", color: "var(--color-text-primary)" }}><HighlightedText text={step.title} /></div>
                {step.description && (
                  <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: "1.5", marginTop: 4 }}><HighlightedText text={step.description} /></div>
                )}
              </div>
              {idx < n - 1 && (
                <div style={{ display: "flex", alignItems: "center", alignSelf: "center", flexShrink: 0 }}>
                  <ArrowRight />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === "image") {
    return <ImageBlock key={i} block={block} />;
  }

  if (block.type === "mosaic") {
    return <MosaicBlock key={i} block={block} />;
  }

  if (block.type === "carousel") {
    return <CarouselBlock key={i} block={block} />;
  }

  if (block.type === "device-compare") {
    return <DeviceCompareBlock key={i} block={block} />;
  }

  if (block.type === "embed" && block.src) {
    const ratio = block.aspectRatio ?? "16/9";
    const [w, h] = ratio.split("/").map(Number);
    const paddingBottom = `${((h / w) * 100).toFixed(4)}%`;
    return (
      <div key={i}>
        {block.description && (
          <div style={{ marginBottom: 32, fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            {block.description.split("\n\n").map((para, pi, arr) => (
              <p key={pi} style={{ margin: pi === arr.length - 1 ? 0 : "0 0 20px" }}>
                <HighlightedText text={para} />
              </p>
            ))}
          </div>
        )}
        <div style={{ position: "relative", width: "100%", paddingBottom, borderRadius: 12, overflow: "hidden" }}>
          <iframe
            src={block.src}
            title={block.caption ?? "Embedded content"}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
          />
        </div>
        {block.caption && (
          <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
            {block.caption}
          </p>
        )}
      </div>
    );
  }

  if (block.type === "footnote" && block.content) {
    return (
      <p
        key={i}
        style={{
          margin: 0,
          fontSize: "var(--font-size-small)",
          color: "var(--color-text-tertiary)",
          lineHeight: 1.6,
        }}
      >
        {block.label && (
          <span style={{ marginRight: 6, fontWeight: 600 }}>{block.label}</span>
        )}
        <HighlightedText text={block.content} />
      </p>
    );
  }

  /* ---- checklist ---- */
  if (block.type === "checklist" && block.items?.length) {
    return (
      <div key={i}>
        {block.description && (
          <p style={{ margin: "0 0 16px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {block.items.map((item, ii) => (
            <div key={ii} style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "12px 16px", borderRadius: 10, backgroundColor: "var(--color-button-tonal-bg)", border: "1px solid var(--color-border)" }}>
              <div style={{ flexShrink: 0, width: 20, height: 20, borderRadius: 6, backgroundColor: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", marginTop: 1 }}>
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <polyline points="2,6 5,9 10,3" stroke="var(--color-button-primary-text)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div style={{ flex: 1, display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12 }}>
                <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                  <HighlightedText text={item.text ?? item} />
                </span>
                {item.count && (
                  <span style={{ flexShrink: 0, fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-accent)", backgroundColor: "var(--color-bg-primary)", padding: "2px 8px", borderRadius: 20, border: "1px solid var(--color-border)" }}>
                    {item.count}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---- receipt ---- */
  if (block.type === "receipt" && block.items?.length) {
    return (
      <div key={i}>
        {block.description && (
          <p style={{ margin: "0 0 16px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <div style={{ borderRadius: 14, border: "1px solid var(--color-border)", overflow: "hidden", backgroundColor: "var(--color-bg-card)" }}>
          {block.title && (
            <div style={{ padding: "12px 20px", borderBottom: "1px solid var(--color-border)", backgroundColor: "var(--color-button-tonal-bg)" }}>
              <span style={{ fontSize: "var(--font-size-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)" }}>{block.title}</span>
            </div>
          )}
          <div style={{ padding: "8px 0" }}>
            {block.items.map((item, ii) => (
              <div key={ii} style={{ display: "flex", alignItems: "center", padding: "9px 20px", gap: 8 }}>
                <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", flex: 1 }}>{item.method}</span>
                <span style={{ borderBottom: "2px dotted var(--color-border)", flex: 1, height: 0, margin: "0 8px" }} />
                <span style={{ fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--color-accent)", flexShrink: 0 }}>{item.quantity}</span>
              </div>
            ))}
          </div>
          {block.total && (
            <div style={{ borderTop: "2px solid var(--color-border)", padding: "12px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.06em" }}>{block.total.label}</span>
              <span style={{ fontSize: "var(--font-size-heading)", fontWeight: 700, color: "var(--color-accent)" }}>{block.total.value}</span>
            </div>
          )}
        </div>
      </div>
    );
  }


  /* ---- comparison ---- */
  if (block.type === "comparison" && block.options?.length) {
    return <ComparisonBlock key={i} block={block} i={i} />;
  }

  /* ---- before-after ---- */
  if (block.type === "before-after" && block.before && block.after) {
    return (
      <div key={i}>
        {block.description && (
          <p style={{ margin: "0 0 20px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {[{ data: block.before, label: "Before" }, { data: block.after, label: "After" }].map(({ data, label }) => (
            <div key={label}>
              <div style={{ position: "relative", borderRadius: 12, overflow: "hidden" }}>
                <img src={data.src} alt={label} style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }} />
                <span style={{
                  position: "absolute", top: 12, left: 12,
                  fontSize: "var(--font-size-label)", fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: 20,
                  backgroundColor: label === "Before" ? "rgba(0,0,0,0.55)" : "var(--color-accent)",
                  color: label === "Before" ? "#fff" : "var(--color-button-primary-text)",
                }}>
                  {label}
                </span>
              </div>
              {data.caption && (
                <p style={{ margin: "8px 0 0", fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.5 }}>
                  {data.caption}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* ---- phases ---- */
  if (block.type === "phases" && block.items?.length) {
    return (
      <div key={i}>
        {block.description && (
          <p style={{ margin: "0 0 24px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <div style={{ position: "relative" }}>
          {/* connecting line */}
          <div style={{ position: "absolute", top: 18, left: 18, right: 18, height: 2, backgroundColor: "var(--color-border)", zIndex: 0 }} />
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${block.items.length}, 1fr)`, gap: 16, position: "relative", zIndex: 1 }}>
            {block.items.map((phase, pi) => (
              <div key={pi} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {/* dot */}
                <div style={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-button-primary-text)" }}>{pi + 1}</span>
                </div>
                <div>
                  <div style={{ fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 2 }}>{phase.label}</div>
                  {phase.duration && (
                    <div style={{ fontSize: "var(--font-size-small)", fontWeight: 600, color: "var(--color-accent)", marginBottom: 6 }}>{phase.duration}</div>
                  )}
                  {phase.description && (
                    <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
                      <HighlightedText text={phase.description} />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ---- decision ---- */
  if (block.type === "decision" && block.rows?.length) {
    return (
      <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: "1px solid var(--color-border)" }}>
        {block.rows.map((row, ri) => (
          <div
            key={ri}
            style={{
              display: "grid", gridTemplateColumns: "120px 1fr",
              borderBottom: ri < block.rows.length - 1 ? "1px solid var(--color-border)" : "none",
              backgroundColor: ri === 0 ? "var(--color-button-tonal-bg)" : "var(--color-bg-card)",
            }}
          >
            <div style={{ padding: "14px 16px", borderRight: "1px solid var(--color-border)", display: "flex", alignItems: "flex-start" }}>
              <span style={{ fontSize: "var(--font-size-label)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: ri === 0 ? "var(--color-accent)" : "var(--color-text-tertiary)" }}>
                {row.label}
              </span>
            </div>
            <div style={{ padding: "14px 20px" }}>
              <span style={{ fontSize: "var(--font-size-body)", color: ri === 0 ? "var(--color-text-primary)" : "var(--color-text-secondary)", lineHeight: 1.6, fontWeight: ri === 0 ? 600 : 400 }}>
                <HighlightedText text={row.value} />
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  }

  /* ---- stat-grid ---- */
  if (block.type === "stat-grid" && block.items?.length) {
    return (
      <div key={i}>
        {block.description && (
          <p style={{ margin: "0 0 20px", fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.7 }}>
            <HighlightedText text={block.description} />
          </p>
        )}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
          {block.items.map((item, si) => (
            <div key={si} style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: 10, padding: "14px 16px" }}>
              <div style={{ fontSize: "var(--font-size-heading)", fontWeight: 700, color: "var(--color-accent)", lineHeight: 1.1, marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.4 }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
}

function FadeInSection({ id, className, style, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={id}
      className={className}
      style={{
        ...style,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      {children}
    </section>
  );
}

function SectionContent({ blocks }) {
  if (!blocks?.length) return null;
  return (
    <div className="flex flex-col gap-8 md:gap-10 w-full min-w-0" style={{ fontSize: "var(--font-size-body)" }}>
      {blocks.map((block, i) => renderBlock(block, i))}
    </div>
  );
}

/* ---- Fallback for old-format projects ---- */

function FallbackContent({ caseData }) {
  return (
    <div>
      {caseData.problem && (
        <section className="mb-8">
          <h3 className="font-semibold leading-tight tracking-tight mb-3 text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
            {caseData.isAbout ? "Who I Am" : "The Problem"}
          </h3>
          <p className="leading-relaxed m-0 text-text-secondary" style={{ fontSize: "var(--font-size-body)" }}>{caseData.problem}</p>
        </section>
      )}

      {caseData.research && (
        <section className="mb-8">
          <h3 className="font-semibold leading-tight tracking-tight mb-3 text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
            {caseData.isAbout ? "Background" : "Research & Discovery"}
          </h3>
          <ul className="flex flex-col list-none p-0 m-0">
            {caseData.research.map((item, i) => (
              <li key={i} className="flex gap-3 leading-relaxed">
                <span className="text-accent leading-relaxed" style={{ fontSize: "var(--font-size-small)", marginTop: "0.25em", flexShrink: 0 }}>✦</span>
                <span className="leading-relaxed text-text-secondary" style={{ fontSize: "var(--font-size-body)" }}>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {caseData.solution && (
        <section className="mb-8">
          <h3 className="font-semibold leading-tight tracking-tight mb-3 text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
            {caseData.isAbout ? "My Approach" : "The Solution"}
          </h3>
          <div className="leading-relaxed m-0 text-text-secondary" style={{ fontSize: "var(--font-size-body)" }}>{caseData.solution}</div>
        </section>
      )}

      {caseData.outcomes && (
        <section>
          <h3 className="font-semibold leading-tight tracking-tight mb-4 text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>
            {caseData.isAbout ? "Key Achievements" : "Impact & Outcomes"}
          </h3>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {caseData.outcomes.map((outcome, i) => {
              const isObj = typeof outcome === "object";
              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 rounded-xl p-6"
                  style={{
                    backgroundColor: "var(--color-bg-primary)",
                    border: "2px solid var(--color-border)",
                  }}
                >
                  {isObj && outcome.metric && (
                    <div className="text-[1.75rem] font-semibold leading-tight text-accent">{outcome.metric}</div>
                  )}
                  <p className="m-0 text-text-primary" style={{ fontSize: "var(--font-size-body)", fontWeight: isObj && outcome.metric ? "500" : "400" }}>
                    {isObj ? outcome.label : outcome}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

/* ============================ MAIN EXPORT ============================ */

export default function CaseStudyTemplate({
  caseData,
  onBack,
  onOpenCustomizer,
  activeSection,
  setActiveSection,
  imageIndex,
  setImageIndex,
  showScrollTop,
}) {
  if (!caseData) return null;

  const hasSections = !!caseData.sections;

  const titleRef = useRef(null);
  const [titleVisible, setTitleVisible] = useState(true);

  useEffect(() => {
    const el = titleRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setTitleVisible(entry.isIntersecting),
      { threshold: 0, rootMargin: "-60px 0px 0px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const backIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );

  /* ---- image carousel ---- */
  const renderCarousel = () => {
    if (caseData.vimeoId) {
      const paddingBottom = caseData.vimeoAspect === "4:3" ? "75%" : "56.25%";
      return (
        <div className="w-full overflow-hidden mb-6 md:mb-8" style={{ position: "relative", paddingBottom, borderRadius: 12 }}>
          <iframe
            src={`https://player.vimeo.com/video/${caseData.vimeoId}?title=0&byline=0&portrait=0&badge=0`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="autoplay; fullscreen; picture-in-picture"
            allowFullScreen
            title={caseData.title}
          />
        </div>
      );
    }

    if (caseData.youtubeId) {
      return (
        <div className="w-full overflow-hidden mb-6 md:mb-8" style={{ position: "relative", paddingBottom: "56.25%", borderRadius: 12 }}>
          <iframe
            src={`https://www.youtube.com/embed/${caseData.youtubeId}`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", border: 0 }}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={caseData.title}
          />
        </div>
      );
    }

    if (!caseData.images?.length) return null;

    return (
      <>
        <div className={`w-full overflow-hidden relative${caseData.images.length === 1 ? " mb-6 md:mb-8" : ""}`} style={{ backgroundColor: "var(--color-bg-card)", borderRadius: 12, padding: caseData.imageBg ? 24 : 0, maxHeight: caseData.imageBg ? "none" : 500 }}>
          <img
            src={caseData.images[imageIndex]}
            alt={caseData.title}
            className="w-full block"
            style={{ maxHeight: caseData.imageBg ? "none" : 500, objectFit: caseData.imageBg ? "contain" : "cover", borderRadius: caseData.imageBg ? 8 : 0 }}
          />
          {caseData.images.length > 1 && (
            <>
              {imageIndex > 0 && (
                <CarouselArrow direction="left" onClick={() => setImageIndex(imageIndex - 1)} />
              )}
              {imageIndex < caseData.images.length - 1 && (
                <CarouselArrow direction="right" onClick={() => setImageIndex(imageIndex + 1)} />
              )}
            </>
          )}
        </div>

        {caseData.images.length > 1 && (
          <div className="flex justify-center gap-2 mt-4 mb-6 md:mb-8">
            {caseData.images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setImageIndex(idx)}
                aria-label={`Go to image ${idx + 1}`}
                className="border-none cursor-pointer p-0 rounded transition-all duration-200"
                style={{
                  width: idx === imageIndex ? "32px" : "8px",
                  height: "8px",
                  backgroundColor: idx === imageIndex ? "var(--color-accent)" : "var(--color-border)",
                }}
              />
            ))}
          </div>
        )}
      </>
    );
  };

  /* ---- inline metadata (under title) ---- */
  const renderMetadata = () => {
    if (caseData.teamSummary) {
      return (
        <p
          className="leading-[1.7] text-text-secondary m-0 mb-12 md:mb-16 lg:mb-24"
          style={{
            fontSize: "var(--font-size-body)",
            borderLeft: "3px solid var(--color-accent)",
            paddingLeft: "16px",
          }}
        >
          <HighlightedText text={caseData.teamSummary} />
        </p>
      );
    }

    if (!caseData.role && !caseData.team) return null;

    return (
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-10 mb-6 md:mb-8">
        {caseData.role && (
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-widest font-semibold text-text-tertiary" style={{ fontSize: "var(--font-size-label)" }}>Role</span>
            <span className="leading-snug text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>{caseData.role}</span>
          </div>
        )}
        {caseData.team && (
          <div className="flex flex-col gap-1">
            <span className="uppercase tracking-widest font-semibold text-text-tertiary" style={{ fontSize: "var(--font-size-label)" }}>Team</span>
            <span className="leading-snug text-text-primary" style={{ fontSize: "var(--font-size-body)" }}>{caseData.team}</span>
          </div>
        )}
      </div>
    );
  };

  /* ---- section nav ---- */
  const renderSectionNav = () => (
    <nav>
      <div className="mb-4 uppercase tracking-widest font-semibold text-text-tertiary" style={{ fontSize: "var(--font-size-label)" }}>Table of Contents</div>
      <div className="flex flex-col gap-1">
        {caseData.sections.map((section, idx) => (
          <SectionNavButton
            key={idx}
            label={section.title}
            active={activeSection === idx}
            onClick={() => {
              setActiveSection(idx);
              document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
            }}
          />
        ))}
      </div>
    </nav>
  );

  /* ---- sidebar (audio + section nav, hidden below lg) ---- */
  const renderSidebar = () => (
    <div className="hidden lg:block lg:sticky top-[120px] self-start sidebar-nav">
      {caseData.audio && (
        <div
          style={{
            border: "2px solid var(--color-border)",
            borderRadius: 12,
            padding: "16px",
            marginBottom: 40,
          }}
        >
          <AudioPlayer audio={caseData.audio} />
        </div>
      )}
      {renderSectionNav()}
    </div>
  );

  /* ---- section content loop ---- */
  const renderSections = () => (
    <div>
      {caseData.sections.map((section, idx) => {
        const hasContent = !!(section.blocks?.length);
        const isLast = idx === caseData.sections.length - 1;
        return (
          <FadeInSection
            key={idx}
            id={`section-${idx}`}
            className={isLast ? "" : hasContent ? "mb-12 md:mb-16 lg:mb-24" : "mb-6"}
            style={{ scrollMarginTop: "120px" }}
          >
            {section.title && (
              <h3 className={`font-bold leading-tight tracking-tight text-text-primary ${hasContent ? "mb-5 md:mb-6" : "mb-2"}`} style={{ fontSize: "var(--font-size-heading)" }}>
                {section.title}
              </h3>
            )}
            <SectionContent blocks={section.blocks} />
          </FadeInSection>
        );
      })}
    </div>
  );

  /* ---- two-column layout (content left, sidebar right) ---- */
  const renderTwoColumnLayout = () => (
    <div className="pt-6 md:pt-8 lg:pt-16 content-container">
      <div className="flex flex-col items-stretch case-study-grid lg:grid lg:grid-cols-[1fr_220px] gap-16 lg:gap-[72px]">
        <div className="w-full min-w-0">
          <h1 ref={titleRef} className="font-semibold leading-[1.2] tracking-tight mb-6 md:mb-8 text-text-primary case-study-title" style={{ fontSize: "var(--font-size-display)" }}>
            {caseData.title}
          </h1>
          {renderMetadata()}
          {!caseData.teamSummary && (
            <div className="w-16 h-[3px] rounded-sm mb-12 md:mb-16 lg:mb-24" style={{ backgroundColor: "var(--color-accent)" }} />
          )}
          {renderSections()}
        </div>
        <div className="hidden lg:block lg:sticky top-[120px] self-start sidebar-nav">
          {renderSectionNav()}
        </div>
      </div>
    </div>
  );

  /* ---- fallback layout for old-format projects ---- */
  const renderFallbackLayout = () => (
    <div className="pt-6 md:pt-8 content-container">
      <h1 ref={titleRef} className="font-semibold leading-[1.2] tracking-tight mb-4 md:mb-5 text-text-primary" style={{ fontSize: "var(--font-size-display)" }}>
        {caseData.title}
      </h1>
      <div className="w-16 h-[3px] rounded-sm mb-8 md:mb-16" style={{ backgroundColor: "var(--color-accent)" }} />
      <FallbackContent caseData={caseData} />
    </div>
  );

  /* ---- full-page render ---- */
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--color-bg-primary)" }}>
      {/* Sticky top nav bar */}
      <div
        className="sticky top-0 z-50"
        style={{
          backgroundColor: "var(--color-bg-card)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow: "0 2px 12px var(--color-shadow)",
        }}
      >
        <div className="max-w-[1200px] mx-auto flex items-center gap-3 px-4 md:px-12 py-3 md:py-4 standalone-nav">
          {/* Back button — mobile: always icon-only; desktop: labeled ↔ icon crossfade */}
          <div className="flex md:hidden flex-shrink-0">
            <IconButton variant="tonal" size="md" icon={backIcon} onClick={onBack} ariaLabel="Go back" />
          </div>
          <div className="hidden md:flex flex-shrink-0 relative w-10 h-10 items-center">
            {/* Icon button — in flow, defines wrapper size */}
            <div style={{ opacity: titleVisible ? 0 : 1, pointerEvents: titleVisible ? "none" : "auto", transition: "opacity 0.25s ease" }}>
              <IconButton variant="tonal" size="md" icon={backIcon} onClick={onBack} ariaLabel="Go back" />
            </div>
            {/* Full button — absolutely positioned, extends leftward, doesn't affect layout width */}
            <div style={{ position: "absolute", top: 0, left: 0, opacity: titleVisible ? 1 : 0, pointerEvents: titleVisible ? "auto" : "none", transition: "opacity 0.25s ease", whiteSpace: "nowrap" }}>
              <Button variant="tonal" size="md" icon={backIcon} onClick={onBack}>Back</Button>
            </div>
          </div>

          {/* Case study title — fades in when page title scrolls out of view */}
          <div className="flex-1 min-w-0 overflow-hidden">
            <span
              className="font-medium text-text-primary block truncate"
              style={{
                fontSize: "var(--font-size-body)",
                opacity: titleVisible ? 0 : 1,
                transform: titleVisible ? "translateY(3px)" : "translateY(0)",
                transition: "opacity 0.3s ease, transform 0.3s ease",
              }}
            >
              {caseData.title}
            </span>
          </div>

        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 pb-12 md:pb-20">
        <div className="max-w-[1200px] mx-auto px-4 md:px-12 pt-6 md:pt-12 hero-container">
          {renderCarousel()}
          {hasSections ? renderTwoColumnLayout() : renderFallbackLayout()}
        </div>
      </div>

      {/* Scroll to top */}
      {showScrollTop && (
        <div className="max-w-[1200px] mx-auto w-full px-4 md:px-12 flex justify-end mb-6 scroll-top-container">
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="18 15 12 9 6 15" />
              </svg>
            }
            variant="tonal"
            ariaLabel="Scroll to top"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />
        </div>
      )}

      {/* Footer */}
      <div className="max-w-[1200px] mx-auto w-full px-4 md:px-12">
        <Footer onCustomize={onOpenCustomizer} />
      </div>
    </div>
  );
}
