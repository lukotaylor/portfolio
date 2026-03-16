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

const SIZE_CLASSES = {
  sm: "h-8 px-3",
  md: "h-10 px-4",
  lg: "h-12 px-5",
};

const SIZE_FONT = {
  sm: "var(--font-size-small)",
  md: "var(--font-size-body)",
  lg: "var(--font-size-body)",
};

/**
 * Button — replaces DSButton.
 * Variants: primary | secondary | ghost
 * Sizes: sm | md | lg
 */
export default function Button({
  variant = "secondary",
  size = "md",
  icon,
  children,
  onClick,
  fullWidth = false,
  className = "",
  disabled = false,
  ...props
}) {
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const isMobile = useMobile();

  // Base classes shared by every variant
  const base = [
    "flex items-center justify-center gap-2 rounded-full font-medium",
    "cursor-pointer transition-all duration-200",
    SIZE_CLASSES[size] || SIZE_CLASSES.md,
    fullWidth ? "w-full" : "",
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ].join(" ");

  // --- Variant-specific inline styles (theme-dependent via CSS vars) ---
  const variantStyles = {
    primary: {
      base: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-button-primary-text)",
        border: "none",
      },
      hover: {
        backgroundColor: "var(--color-accent-hover)",
        transform: "translateY(-1px)",
        boxShadow: "0 4px 12px var(--color-shadow)",
      },
      active: {
        transform: "translateY(0)",
        boxShadow: "0 2px 4px var(--color-shadow)",
      },
    },
    tonal: {
      base: {
        backgroundColor: "var(--color-button-tonal-bg)",
        color: "var(--color-accent)",
        border: "none",
      },
      hover: {
        backgroundColor: "var(--color-accent)",
        color: "var(--color-button-primary-text)",
      },
      active: {
        filter: "brightness(1.1)",
      },
    },
    secondary: {
      base: {
        backgroundColor: "transparent",
        color: "var(--color-text-primary)",
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "var(--color-button-secondary-border)",
      },
      hover: {
        backgroundColor: "var(--color-bg-hover)",
        borderColor: "var(--color-accent)", // Now this matches the "lane" of the base
        color: "var(--color-accent)",
      },
      active: {
        backgroundColor: "var(--color-bg-hover)",
        borderColor: "var(--color-accent)",
      },
    },
    ghost: {
      base: {
        backgroundColor: "transparent",
        color: "var(--color-text-secondary)",
        border: "none",
      },
      hover: {
        backgroundColor: "var(--color-bg-hover)",
        color: "var(--color-accent)",
      },
      active: {
        backgroundColor: "var(--color-bg-hover)",
      },
    },
  };

  const v = variantStyles[variant] || variantStyles.secondary;
  const style = {
    fontSize: SIZE_FONT[size] || SIZE_FONT.md,
    ...v.base,
    ...(hovered && !disabled && !isMobile ? v.hover : {}),
    ...(active && !disabled && !isMobile ? v.active : {}),
  };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setActive(false);
      }}
      onMouseDown={() => !disabled && setActive(true)}
      onMouseUp={() => setActive(false)}
      className={base}
      disabled={disabled}
      style={style}
      {...props}
    >
      {icon}
      {children && <span>{children}</span>}
    </button>
  );
}
