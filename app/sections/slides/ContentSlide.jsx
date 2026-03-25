"use client";

import React from "react";

// ── highlight parser ─────────────────────────────────────────────────────────
// Renders ==text== as accent-colored spans. Renders **text** as bold.

function HighlightedText({ text }) {
  if (!text) return null;
  const parts = text.split(/(==.+?==|\*\*.+?\*\*)/g);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("==") && part.endsWith("==")) {
          return (
            <mark
              key={i}
              style={{
                background: "transparent",
                color: "var(--color-accent)",
                fontWeight: 600,
              }}
            >
              {part.slice(2, -2)}
            </mark>
          );
        }
        if (part.startsWith("**") && part.endsWith("**")) {
          return <strong key={i}>{part.slice(2, -2)}</strong>;
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

// ── block renderers ─────────────────────────────────────────────────────────

const CONTAINER_ICONS = {
  alert: <><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  globe: <><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></>,
  ban: <><circle cx="12" cy="12" r="10" /><line x1="4.93" y1="4.93" x2="19.07" y2="19.07" /></>,
  "trending-down": <><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" /><polyline points="17 18 23 18 23 12" /></>,
  zap: <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  "dollar-sign": <><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></>,
  database: <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
  "x-octagon": <><polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" /><line x1="15" y1="9" x2="9" y2="15" /><line x1="9" y1="9" x2="15" y2="15" /></>,
};

function ContainerBlock({ block }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {block.items.map((item, j) => (
        <div
          key={j}
          style={{
            borderRadius: 12,
            backgroundColor: "var(--color-button-tonal-bg)",
            padding: "14px 16px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {item.icon && CONTAINER_ICONS[item.icon] && (
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ marginBottom: 10, flexShrink: 0, display: "block" }}
            >
              {CONTAINER_ICONS[item.icon]}
            </svg>
          )}
          {item.title && (
            <div style={{ fontWeight: 600, fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", marginBottom: item.description ? 4 : 0 }}>
              {item.title}
            </div>
          )}
          {item.description && (
            <div style={{ fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>
              {item.description}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function MetricsBlock({ block }) {
  const footnotes = block.metrics.map((m) => m.footnote).filter(Boolean);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {block.metrics.map((metric, j) => (
        <div key={j} style={{ display: "flex", flexDirection: "column", gap: 2, textAlign: "center" }}>
          <div style={{ fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 600, color: "var(--color-accent)", lineHeight: 1.1 }}>
            {metric.value}
          </div>
          <p style={{ margin: 0, fontSize: "var(--font-size-body)", fontWeight: 500, lineHeight: 1.3, color: "var(--color-text-primary)" }}>
            {metric.label}
            {metric.footnote && <span style={{ color: "var(--color-accent)" }}>*</span>}
          </p>
        </div>
      ))}
      {footnotes.map((note, j) => (
        <p key={j} style={{ margin: 0, fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", lineHeight: 1.5, textAlign: "center" }}>
          * {note}
        </p>
      ))}
    </div>
  );
}

function HighlightBlock({ block }) {
  const paragraphs = block.content.split("\n\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      {paragraphs.map((para, j) => {
        const boldMatch = para.match(/^\*\*(.+?)\*\*[ \t\n]+(.+)$/s);
        if (boldMatch) {
          return (
            <div key={j}>
              <div style={{ fontWeight: 700, fontSize: "var(--font-size-body)", color: "var(--color-accent)", marginBottom: 4 }}>
                {boldMatch[1]}
              </div>
              <div style={{ fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
                <HighlightedText text={boldMatch[2]} />
              </div>
            </div>
          );
        }
        return (
          <p key={j} style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
            <HighlightedText text={para} />
          </p>
        );
      })}
    </div>
  );
}

function ParagraphBlock({ block }) {
  const paragraphs = block.content.split("\n\n");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {paragraphs.map((para, j) => (
        <p key={j} style={{ margin: 0, fontSize: "var(--font-size-body)", lineHeight: 1.7, color: "var(--color-text-primary)" }}>
          <HighlightedText text={para} />
        </p>
      ))}
    </div>
  );
}

function ListBlock({ block }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
      {block.items.map((item, j) => (
        <li key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ color: "var(--color-accent)", fontWeight: 700, fontSize: "var(--font-size-small)", marginTop: "0.3em", flexShrink: 0 }}>✦</span>
          <span style={{ fontSize: "var(--font-size-body)", lineHeight: 1.6, color: "var(--color-text-primary)" }}>
            <HighlightedText text={item} />
          </span>
        </li>
      ))}
    </ul>
  );
}

function TableBlock({ block }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {block.description && (
        <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)" }}>{block.description}</p>
      )}
      <div style={{ borderRadius: 10, overflow: "hidden", border: "1px solid var(--color-border)" }}>
        {/* header */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.6fr",
            background: "var(--color-button-tonal-bg)",
            padding: "10px 16px",
            gap: 16,
          }}
        >
          {block.headers.map((h, i) => (
            <div key={i} style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              {h}
            </div>
          ))}
        </div>
        {/* rows */}
        {block.rows.map((row, j) => (
          <div
            key={j}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1.6fr",
              padding: "12px 16px",
              gap: 16,
              borderTop: "1px solid var(--color-border)",
              background: j % 2 === 0 ? "transparent" : "var(--color-bg-secondary)",
            }}
          >
            <div style={{ fontSize: "var(--font-size-body)", lineHeight: 1.6, color: "var(--color-text-primary)", fontWeight: 500 }}>
              <HighlightedText text={row.col1} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {(Array.isArray(row.col2) ? row.col2 : [row.col2]).map((item, k) => (
                <div key={k} style={{ fontSize: "var(--font-size-body)", lineHeight: 1.6, color: "var(--color-text-secondary)" }}>
                  <HighlightedText text={item} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ComparisonBlock({ block }) {
  const proColor = "#22c55e";
  const conColor = "#ef4444";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {block.options.map((option, i) => (
        <div
          key={i}
          style={{
            borderRadius: 12,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* label header — tonal bg, accent text */}
          <div style={{ padding: "10px 16px", backgroundColor: "var(--color-button-tonal-bg)", borderBottom: "1px solid var(--color-border)" }}>
            <span style={{ fontSize: "var(--font-size-small)", fontWeight: 700, color: "var(--color-accent)" }}>
              {option.label}
            </span>
          </div>
          {/* items body — card bg */}
          <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8, backgroundColor: "var(--color-bg-card, var(--color-bg-secondary))" }}>
            {option.items.map((item, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ flexShrink: 0, fontSize: "var(--font-size-small)", marginTop: "0.15em", color: item.type === "pro" ? proColor : conColor }}>
                  {item.type === "pro" ? "✓" : "✗"}
                </span>
                <span style={{ fontSize: "var(--font-size-body)", color: "var(--color-text-primary)", lineHeight: 1.6 }}>
                  {item.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case "paragraph":  return <ParagraphBlock key={i} block={block} />;
    case "highlight":  return <HighlightBlock key={i} block={block} />;
    case "list":       return <ListBlock key={i} block={block} />;
    case "metrics":    return <MetricsBlock key={i} block={block} />;
    case "container":  return <ContainerBlock key={i} block={block} />;
    case "comparison": return <ComparisonBlock key={i} block={block} />;
    case "table":      return <TableBlock key={i} block={block} />;
    // skip image/carousel blocks in presentation mode
    default: return null;
  }
}

// ── ContentSlide ─────────────────────────────────────────────────────────────

export default function ContentSlide({ slide }) {
  return (
    <div style={{ height: "100%", display: "flex", overflow: "hidden" }}>

      {/* ── left: content (40%) ── */}
      <div
        style={{
          flex: "0 0 40%",
          display: "flex",
          flexDirection: "column",
          padding: "28px 28px 24px 48px",
          gap: 16,
          overflowY: "auto",
          borderRight: slide.image ? "1px solid var(--color-border)" : "none",
        }}
      >
        {slide.title && (
          <h2
            style={{
              margin: 0,
              fontSize: "var(--font-size-display)",
              fontWeight: 700,
              color: "var(--color-text-primary)",
              flexShrink: 0,
            }}
          >
            {slide.title}
          </h2>
        )}
        {(slide.blocks || []).map((block, i) => renderBlock(block, i))}
      </div>

      {/* ── right: image (60%) ── */}
      {slide.image && (
        <div
          style={{
            flex: "0 0 60%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "24px 40px",
            gap: 10,
            background: "var(--color-bg-secondary)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              flex: 1,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            <img
              src={slide.image}
              alt={slide.imageCaption || slide.title || ""}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                borderRadius: 10,
                boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08)",
              }}
            />
          </div>
          {slide.imageCaption && (
            <p
              style={{
                margin: 0,
                fontSize: "var(--font-size-small)",
                color: "var(--color-text-tertiary)",
                textAlign: "center",
                flexShrink: 0,
                lineHeight: 1.4,
              }}
            >
              {slide.imageCaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
