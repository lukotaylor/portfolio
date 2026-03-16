"use client";

import React, { useState, useEffect } from "react";

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

const SIZE_MAP = {
  sm: "w-8 h-8",
  md: "w-10 h-10",
  lg: "w-12 h-12",
};

const ICON_SIZE_MAP = {
  sm: 14,
  md: 16,
  lg: 20,
};

/**
 * IconButton — replaces the inline IconButton.
 * Variants: primary | secondary | tonal
 * Sizes: sm | md | lg
 */
export default function IconButton({
  icon,
  size = "md",
  variant = "secondary",
  onClick,
  ariaLabel,
  className = "",
  style: styleProp = {},
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMobile();

  const variantStyles = {
    primary: {
      base: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-button-primary-text)",
        border: "1px solid transparent",
      },
      hover: {
        backgroundColor: "var(--color-accent-hover)",
        transform: "scale(1.1)",
      },
    },
    secondary: {
      base: {
        backgroundColor: "var(--color-bg-card)",
        color: "var(--color-text-primary)",
        border: "1px solid var(--color-button-secondary-border)",
      },
      hover: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-button-primary-text)",
        border: "1px solid transparent",
        transform: "scale(1.1)",
      },
    },
    tonal: {
      base: {
        backgroundColor: "var(--color-button-tonal-bg)",
        color: "var(--color-accent)",
        border: "1px solid transparent",
      },
      hover: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-button-primary-text)",
        transform: "scale(1.1)",
      },
    },
  };

  const v = variantStyles[variant] || variantStyles.secondary;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={ariaLabel}
      className={[
        "flex items-center justify-center rounded-full cursor-pointer transition-all duration-200",
        SIZE_MAP[size] || SIZE_MAP.md,
        className,
      ].join(" ")}
      style={{
        ...v.base,
        ...(hovered && !isMobile ? v.hover : {}),
        ...styleProp,
      }}
      {...props}
    >
      {React.isValidElement(icon)
        ? React.cloneElement(icon, { size: ICON_SIZE_MAP[size] ?? ICON_SIZE_MAP.md })
        : icon}
    </button>
  );
}
