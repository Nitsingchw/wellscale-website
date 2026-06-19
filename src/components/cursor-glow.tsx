"use client";

import * as React from "react";

/**
 * CursorGlow — a custom cursor effect that follows the mouse with:
 *   1. A small inner dot (tracks the exact mouse position instantly)
 *   2. A larger outer ring (lags behind with spring-like easing)
 *   3. A blurred lime glow halo behind the ring
 *
 * The effect uses CSS variables (--lime, --ink, --background) so it
 * automatically adapts to the active theme (dark or white).
 *
 * Behavior:
 *   - Grows + brightens when hovering interactive elements (a, button,
 *     input, textarea, [role="button"], [data-cursor="hover"])
 *   - Hidden on touch devices (no hover capability) to avoid a stuck dot
 *   - Hidden until the first mouse move (so it doesn't appear at 0,0)
 *   - Uses requestAnimationFrame for smooth 60fps follow
 *   - Pointer-events: none so it never blocks clicks
 *
 * Z-index: 9999 so it stays above everything (including sticky navbar).
 */

type CursorState = "default" | "hover";

export function CursorGlow() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  // Track mouse target position + current ring position (for easing)
  const mouse = React.useRef({ x: 0, y: 0 });
  const ring = React.useRef({ x: 0, y: 0 });
  const rafId = React.useRef<number | null>(null);

  React.useEffect(() => {
    // Skip on touch devices — custom cursors only make sense with a mouse.
    // For headless-browser testing (which reports no hover capability) we
    // also check pointer:fine; if neither matches, we still render the
    // effect but it will only animate on real mouse input.
    const hasHover = window.matchMedia("(hover: hover)").matches;
    const hasFinePointer = window.matchMedia("(pointer: fine)").matches;
    // Allow forcing the cursor on via ?cursor=1 query (for testing in
    // headless browsers that don't report hover capability).
    const forceOn =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("cursor") === "1";
    if (!hasHover && !hasFinePointer && !forceOn) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
        // Show on first mouse move (covers the case where mouseenter
        // already fired before listeners were attached, or never fires
        // in headless/test environments)
        dotRef.current.style.opacity = "1";
        ringRef.current && (ringRef.current.style.opacity = "1");
        glowRef.current && (glowRef.current.style.opacity = "1");
      }

      // Check if hovering an interactive element
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest(
        'a, button, input, textarea, select, [role="button"], [data-cursor="hover"], label, summary'
      );
      setHovering(isInteractive);
    };

    const onLeave = () => {
      // Hide cursor when mouse leaves the window
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
      if (glowRef.current) glowRef.current.style.opacity = "0";
    };

    const onEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
      if (glowRef.current) glowRef.current.style.opacity = "1";
    };

    // Animation loop for ring + glow easing toward the mouse
    const animate = () => {
      // Spring-like easing: ring moves 18% of the remaining distance per frame
      ring.current.x += (mouse.current.x - ring.current.x) * 0.18;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mouseenter", onEnter);
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mouseenter", onEnter);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  // Don't render anything on touch devices
  if (!enabled) return null;

  const state: CursorState = hovering ? "hover" : "default";

  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    >
      {/* Blurred lime glow halo (largest, lags behind) */}
      <div
        ref={glowRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: state === "hover" ? "120px" : "80px",
          height: state === "hover" ? "120px" : "80px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, color-mix(in oklch, var(--lime) 55%, transparent) 0%, transparent 70%)",
          filter: "blur(8px)",
          opacity: 0,
          transition:
            "width 250ms cubic-bezier(0.22, 1, 0.36, 1), height 250ms cubic-bezier(0.22, 1, 0.36, 1), opacity 200ms ease",
          willChange: "transform, width, height",
        }}
      />

      {/* Outer ring (medium, lags behind with easing) */}
      <div
        ref={ringRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: state === "hover" ? "56px" : "32px",
          height: state === "hover" ? "56px" : "32px",
          borderRadius: "9999px",
          border: "2px solid color-mix(in oklch, var(--lime) 75%, transparent)",
          backgroundColor:
            state === "hover"
              ? "color-mix(in oklch, var(--lime) 12%, transparent)"
              : "transparent",
          boxShadow:
            state === "hover"
              ? "0 0 24px color-mix(in oklch, var(--lime) 50%, transparent)"
              : "0 0 12px color-mix(in oklch, var(--lime) 25%, transparent)",
          opacity: 0,
          transition:
            "width 250ms cubic-bezier(0.22, 1, 0.36, 1), height 250ms cubic-bezier(0.22, 1, 0.36, 1), background-color 200ms ease, box-shadow 200ms ease, opacity 200ms ease",
          willChange: "transform, width, height",
        }}
      />

      {/* Inner dot (smallest, tracks instantly) */}
      <div
        ref={dotRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: state === "hover" ? "8px" : "6px",
          height: state === "hover" ? "8px" : "6px",
          borderRadius: "9999px",
          backgroundColor: "var(--lime)",
          boxShadow: "0 0 8px color-mix(in oklch, var(--lime) 80%, transparent)",
          opacity: 0,
          transition:
            "width 200ms ease, height 200ms ease, opacity 200ms ease",
          willChange: "transform, width, height",
        }}
      />
    </div>
  );
}
