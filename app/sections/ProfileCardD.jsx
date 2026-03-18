"use client";

import React, { useState, useEffect, useRef } from "react";
import IconButton from "../components/ui/IconButton";
import { FileText, Mail } from "lucide-react";

const LinkedInIcon = ({ size = 15 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState("desktop");
  useEffect(() => {
    const getBreakpoint = () => {
      if (window.innerWidth <= 767) return "mobile";
      if (window.innerWidth <= 1023) return "tablet";
      return "desktop";
    };
    setBreakpoint(getBreakpoint());
    const handler = () => setBreakpoint(getBreakpoint());
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return breakpoint;
}

const POST_ITS = [
  { title: "Strategic partner",   rotate: "-2deg",  offsetY: "0px",  text: "Proactive design partner who turns user feedback and competitive insights into product recommendations." },
  { title: "Efficient executor",  rotate: "1.5deg", offsetY: "12px", text: "Speedy at execution, while sweating the details that make people trust and enjoy a product." },
  { title: "Perpetual learner",   rotate: "-1deg",  offsetY: "4px",  text: "A doer who is energized by picking up new skills and tools, from building with AI on-screen to DIY projects off-screen." },
  { title: "Systems Thinker",     rotate: "2.5deg", offsetY: "8px",  text: "Good design scales. Always thinking about how objects, patterns, and decisions connect across platforms." },
];

export default function ProfileCardD() {
  const breakpoint = useBreakpoint();
  const isMobile = breakpoint === "mobile";
  const gridRef = useRef(null);
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    const el = gridRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setGridWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const cols = isMobile ? 1 : (gridWidth - 72) / 4 <= 200 ? 2 : 4;

  return (
    <div style={{
      position: "relative",
      backgroundColor: "var(--color-bg-card)",
      borderRadius: 20,
      padding: isMobile ? "24px 24px 24px" : "48px 40px 56px",
      boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
    }}>

      {/* Top-right CTAs — desktop only */}
      {!isMobile && (
        <div style={{ position: "absolute", top: 24, right: 24, display: "flex", gap: 12 }}>
          <IconButton size="md" variant="tonal" ariaLabel="LinkedIn" icon={<LinkedInIcon />} onClick={() => window.open("https://www.linkedin.com/in/tayloryeerong/", "_blank")} />
          <IconButton size="md" variant="tonal" ariaLabel="Resume"   icon={<FileText size={16} />} onClick={() => window.open("/resume.pdf", "_blank")} />
          <IconButton size="md" variant="tonal" ariaLabel="Email"    icon={<Mail size={16} />} onClick={() => window.open("mailto:tayloryeerong@gmail.com")} />
        </div>
      )}

      {/* Avatar + Headline */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 20, marginBottom: 40 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", width: "100%" }}>
            <div style={{ width: 72, height: 72, borderRadius: "50%", overflow: "hidden", background: "var(--color-avatar-gradient)", flexShrink: 0 }}>
              <img src="/me.png" alt="Taylor Yeerong" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <IconButton size="sm" variant="tonal" ariaLabel="LinkedIn" icon={<LinkedInIcon />} onClick={() => window.open("https://www.linkedin.com/in/tayloryeerong/", "_blank")} />
              <IconButton size="sm" variant="tonal" ariaLabel="Resume"   icon={<FileText size={14} />} onClick={() => window.open("/resume.pdf", "_blank")} />
              <IconButton size="sm" variant="tonal" ariaLabel="Email"    icon={<Mail size={14} />} onClick={() => window.open("mailto:tayloryeerong@gmail.com")} />
            </div>
          </div>
          <p style={{ margin: 0, fontSize: "var(--font-size-display)", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.35 }}>
            I'm Taylor, a product designer with ~8 years of experience building B2B and B2B2C SaaS ˙ᵕ˙
          </p>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 40 }}>
            <div style={{ width: 112, height: 112, borderRadius: "50%", overflow: "hidden", background: "var(--color-avatar-gradient)", flexShrink: 0 }}>
              <img src="/me.png" alt="Taylor Yeerong" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <p style={{ margin: 0, fontSize: "var(--font-size-display)", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.35, maxWidth: 700, marginInline: "auto" }}>
              I'm Taylor, a product designer with ~8 years of experience building B2B and B2B2C SaaS ˙ᵕ˙
            </p>
          </div>
        </>
      )}

      {/* Post-it cards */}
      <div ref={gridRef} style={{
        display: "grid",
        gridTemplateColumns: `repeat(${cols}, 1fr)`,
        gap: isMobile ? 24 : 24,
        alignItems: "start",
        margin: "0 auto",
      }}>
        {POST_ITS.map(({ title, rotate, offsetY, text }) => (
          <div key={title} style={{ position: "relative", marginTop: isMobile ? 0 : offsetY }}>
            {/* Tape */}
            <div style={{
              position: "absolute",
              top: -10,
              left: "50%",
              transform: "translateX(-50%)",
              width: 52,
              height: 18,
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              borderRadius: 3,
              zIndex: 1,
            }} />
            {/* Note */}
            <div style={{
              backgroundColor: "var(--color-button-tonal-bg)",
              padding: "20px 18px 24px",
              transform: isMobile ? `rotate(${parseFloat(rotate) * 0.6}deg)` : `rotate(${rotate})`,
              boxShadow: "2px 4px 14px rgba(0,0,0,0.15)",
              position: "relative",
              zIndex: 0,
            }}>
              <div style={{ fontSize: "var(--font-size-body)", fontWeight: 700, color: "var(--color-text-primary)", marginBottom: 10 }}>{title}</div>
              <div style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-secondary)", lineHeight: 1.55 }}>{text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
