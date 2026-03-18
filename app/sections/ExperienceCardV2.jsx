"use client";

import React, { useState, useEffect, useRef } from "react";

function useMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    setIsMobile(mq.matches);
    const handler = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return isMobile;
}

function CompanyLogo({ exp }) {
  const [failed, setFailed] = useState(false);
  const isMobile = useMobile();

  return (
    <a
      href={exp.companyUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center font-semibold shrink-0 overflow-hidden transition-transform duration-200 cursor-pointer no-underline md:hover:scale-105"
      style={{
        width: isMobile ? "36px" : "2.75rem",
        height: isMobile ? "36px" : "2.75rem",
        borderRadius: isMobile ? "8px" : "12px",
        fontSize: "var(--font-size-body)",
        backgroundColor: "var(--color-bg-primary)",
        color: "var(--color-text-primary)",
      }}
    >
      {failed ? (
        exp.logoFallback
      ) : (
        <img
          src={exp.logo}
          alt={exp.company}
          className="w-full h-full object-contain"
          onError={() => setFailed(true)}
        />
      )}
    </a>
  );
}

function MosaicImage({ project, onSelectProject, fill = false, alwaysShowLabel = false, borderRadius = 12 }) {
  const [hovered, setHovered] = useState(false);
  const isMobile = useMobile();

  return (
    <div
      onClick={() => onSelectProject(project)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="overflow-hidden cursor-pointer w-full h-full"
      style={{
        borderRadius,
        backgroundColor: "var(--color-bg-hover)",
        position: "relative",
      }}
    >
      {/* Foreground image */}
      {project.images?.[0] && (
        <img
          src={project.images[0]}
          alt={project.title}
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            height: "100%",
            objectFit: fill ? "cover" : "contain",
            padding: fill ? 0 : "8%",
            boxSizing: "border-box",
            display: "block",
            transition: "transform 0.3s ease",
            transform: hovered && !isMobile ? "scale(1.03)" : "scale(1)",
          }}
        />
      )}

      {/* Category + tags */}
      {(project.category || project.tags?.length > 0) && (
        <div
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            zIndex: 4,
            display: "flex",
            gap: 6,
            pointerEvents: "none",
          }}
        >
          {project.category && (
            <div
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-secondary)",
                borderRadius: 9999,
                padding: "3px 10px",
                fontSize: "var(--font-size-label)",
                fontWeight: 400,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              {project.category}
            </div>
          )}
          {project.tags?.map((tag) => (
            <div
              key={tag}
              style={{
                backgroundColor: "var(--color-bg-primary)",
                color: "var(--color-text-secondary)",
                borderRadius: 9999,
                padding: "3px 10px",
                fontSize: "var(--font-size-label)",
                fontWeight: 400,
                letterSpacing: "0.03em",
                whiteSpace: "nowrap",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      )}

      {/* Hover label */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 3,
          backgroundColor: "var(--color-bg-primary)",
          borderRadius: "16px 16px 0 0",
          transform: alwaysShowLabel || (hovered && !isMobile) ? "translateY(0)" : "translateY(100%)",
          transition: "transform 0.3s ease",
        }}
      >
        <div style={{ backgroundColor: "var(--color-bg-primary)", borderRadius: "16px 16px 0 0", padding: "12px 20px" }}>
          <span
            style={{
              color: "var(--color-text-secondary)",
              fontSize: "var(--font-size-body)",
              fontWeight: 400,
              lineHeight: 1.4,
            }}
          >
            {project.title}
          </span>
        </div>
      </div>
    </div>
  );
}

function MosaicGrid({ projects, onSelectProject }) {
  const count = projects.length;

  if (count === 0) return null;

  if (count === 1) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        <div style={{ aspectRatio: "4 / 3" }}>
          <MosaicImage project={projects[0]} onSelectProject={onSelectProject} />
        </div>
      </div>
    );
  }

  if (count === 2) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {projects.map((project) => (
          <div key={project.id} style={{ aspectRatio: "16 / 9" }}>
            <MosaicImage project={project} onSelectProject={onSelectProject} fill />
          </div>
        ))}
      </div>
    );
  }

  if (count === 4) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28 }}>
        {projects.map((project) => (
          <div key={project.id} style={{ aspectRatio: "16 / 9" }}>
            <MosaicImage project={project} onSelectProject={onSelectProject} fill />
          </div>
        ))}
      </div>
    );
  }

  const hero = projects[0];
  const rest = projects.slice(1);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gridTemplateRows: `repeat(${rest.length}, 1fr)`,
        gap: 28,
      }}
    >
      <div style={{ gridRow: `1 / ${rest.length + 1}` }}>
        <MosaicImage project={hero} onSelectProject={onSelectProject} />
      </div>
      {rest.map((project) => (
        <div key={project.id}>
          <MosaicImage project={project} onSelectProject={onSelectProject} />
        </div>
      ))}
    </div>
  );
}

export default function ExperienceCardV2({ experience, onSelectProject }) {
  const isMobile = useMobile();
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
    <div
      ref={ref}
      style={{
        backgroundColor: "var(--color-bg-card)",
        borderRadius: 20,
        padding: isMobile ? "24px" : "32px",
        boxShadow: "0 2px 12px rgba(0, 0, 0, 0.08)",
        transition: "background-color 0.3s ease, opacity 0.6s ease, transform 0.6s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
      }}
    >
      {/* Header: logo + description */}
      <div className="flex gap-4 items-start" style={{ marginBottom: experience.projects.length > 0 ? 32 : 0 }}>
        <CompanyLogo exp={experience} />
        <p
          className="leading-relaxed m-0"
          style={{ color: "var(--color-text-secondary)", fontSize: "var(--font-size-body)" }}
        >
          At{" "}
          <span
            className="font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {experience.company}
          </span>
          , {experience.description}
        </p>
      </div>

      {/* Individual project cards */}
      {isMobile ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {experience.projects.map((project) => (
            <div key={project.id}>
              <div style={{ position: "relative", paddingBottom: "56.25%", borderRadius: "16px 16px 0 0", overflow: "hidden" }}>
                <div style={{ position: "absolute", inset: 0 }}>
                  <MosaicImage project={project} onSelectProject={onSelectProject} fill borderRadius="16px 16px 0 0" />
                </div>
              </div>
              <div style={{ backgroundColor: "var(--color-bg-card)", borderRadius: "0 0 12px 12px" }}>
                <div style={{ backgroundColor: "var(--color-button-tonal-bg)", borderRadius: "0 0 12px 12px", padding: "8px 12px" }}>
                  <span style={{ fontSize: "var(--font-size-body)", fontWeight: 400, lineHeight: 1.4, color: "var(--color-text-secondary)" }}>
                    {project.title}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <MosaicGrid
          projects={experience.projects}
          onSelectProject={onSelectProject}
        />
      )}
    </div>
  );
}
