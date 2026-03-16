"use client";

export default function TimelinePill({ dateRange }) {
  return (
    <span
      style={{
        backgroundColor: "var(--color-button-tonal-bg)",
        color: "var(--color-accent)",
        borderRadius: 8,
        padding: "4px 10px",
        fontSize: "var(--font-size-small)",
        fontWeight: 500,
        whiteSpace: "nowrap",
        flexShrink: 0,
        lineHeight: 1.5,
      }}
    >
      {dateRange}
    </span>
  );
}
