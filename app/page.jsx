"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";

// Data
import { experiences } from "./data/experiences";

// Sections
import ProfileCardD from "./sections/ProfileCardD";
import ExperienceFeedV2 from "./sections/ExperienceFeedV2";
import ThemeCustomizer from "./sections/ThemeCustomizer";

// UI
import CaseStudyTemplate from "./components/ui/CaseStudyTemplate";
import Footer from "./components/ui/Footer";
import PasswordModal from "./components/ui/PasswordModal";

// ---------------------------------------------------------------------------
// Cursor follower
// ---------------------------------------------------------------------------
function CursorFollower() {
  const dotRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) { setIsTouchDevice(true); return; }

    let animId;
    const target = { x: -100, y: -100 };
    const current = { x: -100, y: -100 };

    const onMove = (e) => { target.x = e.clientX; target.y = e.clientY; };
    const animate = () => {
      current.x += (target.x - current.x) * 0.1;
      current.y += (target.y - current.y) * 0.1;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${current.x - 6}px, ${current.y - 6}px)`;
      }
      animId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    animId = requestAnimationFrame(animate);
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(animId); };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 12,
        height: 12,
        borderRadius: "50%",
        backgroundColor: "var(--color-accent)",
        pointerEvents: "none",
        zIndex: 9999,
        opacity: 0.5,
        mixBlendMode: "multiply",
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Helper — find a project by ID across all experiences
// ---------------------------------------------------------------------------
function findProjectById(id) {
  for (const exp of experiences) {
    if (exp.group?.id === id) return exp.group;
    for (const project of exp.projects) {
      if (project.id === id) return project;
    }
  }
  return null;
}

export default function Portfolio() {
  // ---------------------------------------------------------------------------
  // State
  // ---------------------------------------------------------------------------
  const [showCustomizer, setShowCustomizer] = useState(false);
  const [activeCaseStudy, setActiveCaseStudy] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [modalImageIndex, setModalImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Auth
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("portfolio_auth") === process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD;
  });
  const [pendingProject, setPendingProject] = useState(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  // Stable ref so applyHash can read auth state without being a dependency
  const isAuthRef = useRef(isAuthenticated);
  isAuthRef.current = isAuthenticated;

  // ---------------------------------------------------------------------------
  // Hash-based routing — persist views across refresh
  // ---------------------------------------------------------------------------
  const applyHash = useCallback((hash) => {
    const match = hash.match(/^#project-(.+)$/);
    if (match) {
      const project = findProjectById(match[1]);
      if (project) {
        if (!isAuthRef.current) {
          setPendingProject(project);
          setShowPasswordModal(true);
        } else {
          setActiveCaseStudy(project);
          setActiveSection(0);
          setModalImageIndex(0);
        }
        return;
      }
    }
    // No match or unknown hash — show landing page
    setActiveCaseStudy(null);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // On mount: restore view from URL hash
  useEffect(() => {
    applyHash(window.location.hash);
  }, [applyHash]);

  // Listen for browser back/forward
  useEffect(() => {
    const onPopState = () => applyHash(window.location.hash);
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [applyHash]);

  // ---------------------------------------------------------------------------
  // Effects
  // ---------------------------------------------------------------------------

  // Scroll observer — highlights the active section in case-study view
  useEffect(() => {
    if (!activeCaseStudy?.sections) return;

    const handleScroll = () => {
      if (!activeCaseStudy?.sections) return;

      const { scrollTop, scrollHeight } = document.documentElement;
      const atBottom = scrollTop + window.innerHeight >= scrollHeight - 50;

      if (atBottom) {
        setActiveSection(activeCaseStudy.sections.length - 1);
      } else {
        const sections = activeCaseStudy.sections.map((_, idx) =>
          document.getElementById(`section-${idx}`)
        );

        const scrollPosition = window.scrollY + 200;
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section && section.offsetTop <= scrollPosition) {
            setActiveSection(i);
            break;
          }
        }
      }

      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeCaseStudy]);

  // ---------------------------------------------------------------------------
  // Navigation helpers
  // ---------------------------------------------------------------------------
  const openProject = (project) => {
    if (!isAuthenticated) {
      setPendingProject(project);
      setShowPasswordModal(true);
      return;
    }
    window.history.pushState(null, "", `#project-${project.id}`);
    setActiveCaseStudy(project);
    setActiveSection(0);
    setModalImageIndex(0);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const goHome = () => {
    window.history.pushState(null, "", window.location.pathname);
    setActiveCaseStudy(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const onAuthSuccess = (password) => {
    localStorage.setItem("portfolio_auth", password);
    setIsAuthenticated(true);
    setShowPasswordModal(false);
    if (pendingProject) {
      window.history.pushState(null, "", `#project-${pendingProject.id}`);
      setActiveCaseStudy(pendingProject);
      setActiveSection(0);
      setModalImageIndex(0);
      window.scrollTo({ top: 0, behavior: "instant" });
      setPendingProject(null);
    }
  };

  const onAuthClose = () => {
    setShowPasswordModal(false);
    setPendingProject(null);
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // ── Case-study view ─────────────────────────────────────────────────────────
  if (activeCaseStudy) {
    return (
      <>
        <CursorFollower />
        <CaseStudyTemplate
          caseData={activeCaseStudy}
          onBack={goHome}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          imageIndex={modalImageIndex}
          setImageIndex={setModalImageIndex}
          showScrollTop={showScrollTop}
          onOpenCustomizer={() => setShowCustomizer(true)}
        />

        {showCustomizer && (
          <ThemeCustomizer onClose={() => setShowCustomizer(false)} />
        )}
      </>
    );
  }

  // ── Main portfolio view ─────────────────────────────────────────────────────
  return (
    <>
      <CursorFollower />
      <div className="min-h-screen flex flex-col">
        <div
          className="flex-1 w-full px-4 md:px-6 pt-6 md:pt-8 pb-4 md:pb-6 mx-auto"
          style={{ maxWidth: 1200 }}
        >
          <div className="flex flex-col gap-8">
            {/* Profile card */}
            <ProfileCardD />

            {/* Experience feed */}
            <ExperienceFeedV2
              experiences={experiences}
              onSelectProject={openProject}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="w-full px-4 md:px-6 mx-auto" style={{ maxWidth: 1200 }}>
          <Footer onCustomize={() => setShowCustomizer(true)} />
        </div>
      </div>

      {/* Theme customizer modal */}
      {showCustomizer && (
        <ThemeCustomizer onClose={() => setShowCustomizer(false)} />
      )}

      {/* Password gate */}
      {showPasswordModal && (
        <PasswordModal onSuccess={onAuthSuccess} onClose={onAuthClose} />
      )}
    </>
  );
}
