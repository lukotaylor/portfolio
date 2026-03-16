"use client";

import React, { useState, useEffect, useRef } from "react";
import Button from "./Button";
import IconButton from "./IconButton";

export default function PasswordModal({ onSuccess, onClose }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    await new Promise((r) => setTimeout(r, 300));
    if (password === process.env.NEXT_PUBLIC_PORTFOLIO_PASSWORD) {
      onSuccess(password);
    } else {
      setError(true);
      setLoading(false);
      setPassword("");
      inputRef.current?.focus();
    }
  };

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9000,
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        backdropFilter: "blur(7px)",
        WebkitBackdropFilter: "blur(7px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundColor: "var(--color-bg-card)",
          borderRadius: 20,
          width: "100%",
          maxWidth: 400,
          boxShadow: "0 24px 64px rgba(0,0,0,0.3)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <h2 style={{ margin: 0, fontSize: "var(--font-size-heading)", fontWeight: 700, color: "var(--color-text-primary)", lineHeight: 1.2 }}>
            Password protected
          </h2>
          <IconButton
            icon={
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            }
            size="sm"
            variant="secondary"
            onClick={onClose}
            ariaLabel="Close"
            style={{ boxShadow: "none", border: "1px solid transparent" }}
          />
        </div>

        {/* Body */}
        <div style={{ padding: "0 32px 32px", display: "flex", flexDirection: "column", gap: 16 }}>
          <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
            Enter the password to view this work.
          </p>

          <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <input
                ref={inputRef}
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="Password"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "12px 16px",
                  borderRadius: 12,
                  border: `1.5px solid ${error ? "#ef4444" : "var(--color-border)"}`,
                  backgroundColor: "var(--color-bg-primary)",
                  color: "var(--color-text-primary)",
                  fontSize: "var(--font-size-body)",
                  outline: "none",
                  transition: "border-color 0.2s",
                }}
              />
              {error && (
                <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: "#ef4444" }}>
                  Incorrect password. Try again.
                </p>
              )}
            </div>

            <Button
              variant="primary"
              size="md"
              fullWidth
              disabled={loading || !password}
              type="submit"
            >
              {loading ? "Checking…" : "View case study"}
            </Button>
          </form>

          <p style={{ margin: 0, fontSize: "var(--font-size-small)", color: "var(--color-text-tertiary)", textAlign: "center", lineHeight: 1.6 }}>
            Don't have the password?{" "}
            <a
              href="mailto:yositayeerong@gmail.com"
              style={{ color: "var(--color-accent)", textDecoration: "none", fontWeight: 500 }}
            >
              Get in touch
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
