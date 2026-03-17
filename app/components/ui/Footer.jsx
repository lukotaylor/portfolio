"use client";

import React, { useState, useEffect } from "react";
import IconButton from "./IconButton";
import Tooltip from "./Tooltip";

const PaintbrushIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m14.622 17.897-10.68-2.913" />
    <path d="M18.376 2.622a1 1 0 1 1 3.002 3.002L17.36 9.643a.5.5 0 0 0 0 .707l.944.944a2.41 2.41 0 0 1 0 3.408l-.944.944a.5.5 0 0 1-.707 0L8.354 7.348a.5.5 0 0 1 0-.707l.944-.944a2.41 2.41 0 0 1 3.408 0l.944.944a.5.5 0 0 0 .707 0z" />
    <path d="M9 8c-1.804 2.71-3.97 3.46-6.583 3.948a.507.507 0 0 0-.302.819l7.32 8.883a1 1 0 0 0 1.185.204C12.735 20.405 16 16.792 16 15" />
  </svg>
);

/**
 * Footer — in-flow element that fades in when the user scrolls near the bottom.
 * No background. No width constraints — the parent container controls alignment.
 */
export default function Footer({ onCustomize }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, scrollHeight } = document.documentElement;
      setVisible(scrollTop + window.innerHeight >= scrollHeight - 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <footer
      className="flex items-center justify-between py-6 transition-all duration-500"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
      }}
    >
      <Tooltip label="Customize appearance">
        <IconButton
          icon={<PaintbrushIcon />}
          size="md"
          variant="tonal"
          onClick={onCustomize}
          ariaLabel="Customize appearance"
        />
      </Tooltip>

      <p className="leading-relaxed text-text-tertiary m-0 text-right" style={{ fontSize: "var(--font-size-small)" }}>
        <span className="hidden sm:inline">Designed by Taylor Yeerong &hearts; Built with Claude Code</span>
        <span className="sm:hidden">Designed by Taylor Yeerong<br />&hearts; Built with Claude Code</span>
      </p>
    </footer>
  );
}
