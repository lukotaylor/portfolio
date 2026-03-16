"use client";

import React, { useState } from "react";

/**
 * NavItem — replaces the inline NavItem.
 * Used in sidebar and section navigation.
 */
export default function NavItem({
  children,
  isActive = false,
  onClick,
  icon,
  ...props
}) {
  const [hovered, setHovered] = useState(false);

  const colorStyle = {
    backgroundColor:
      isActive || hovered ? "var(--color-bg-hover)" : "transparent",
    color: isActive
      ? "var(--color-accent)"
      : hovered
        ? "var(--color-text-primary)"
        : "var(--color-text-secondary)",
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={[
        "flex items-center gap-3 w-full py-3 px-4 -ml-4",
        "border-none rounded-md cursor-pointer text-left",
        "transition-all duration-200",
        isActive ? "font-semibold" : "font-medium",
      ].join(" ")}
      style={{ ...colorStyle, fontSize: "var(--font-size-body)" }}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
}
