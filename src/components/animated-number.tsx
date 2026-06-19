"use client";

import * as React from "react";
import { useInView, animate, useMotionValue } from "framer-motion";

/**
 * AnimatedNumber — counts up from 0 to `value` when the element scrolls
 * into view. Supports a prefix (e.g. "₹", "+"), suffix (e.g. "X", "%", "+"),
 * and decimal precision. Re-runs every time the element re-enters the
 * viewport (with a small cooldown) so the count-up replays on scroll-back.
 *
 * Examples:
 *   <AnimatedNumber value={40} suffix="+" />            → 0 → 40+
 *   <AnimatedNumber value={4.2} suffix="X" />           → 0.0 → 4.2X
 *   <AnimatedNumber value={20} prefix="₹" suffix="L+" />→ ₹0 → ₹20L+
 *   <AnimatedNumber value={327} suffix="%" />           → 0% → 327%
 *   <AnimatedNumber value={100} suffix="%" />           → 0% → 100%
 */
export function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  decimals = 0,
  duration = 1.6,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  duration?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const mv = useMotionValue(0);
  const [display, setDisplay] = React.useState(
    (0).toFixed(decimals)
  );

  // Keep the last value stable across re-renders that don't trigger the
  // animation (e.g. parent re-render). Animation only fires when inView
  // flips to true.
  const lastAnimated = React.useRef<number>(0);

  React.useEffect(() => {
    if (!inView) {
      // Reset to 0 when scrolled out so it re-animates on next entry.
      mv.set(0);
      setDisplay((0).toFixed(decimals));
      lastAnimated.current = 0;
      return;
    }

    const controls = animate(mv, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v.toFixed(decimals)),
    });
    lastAnimated.current = value;
    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, value, decimals, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}

/**
 * Helper to parse a string like "40+", "8X", "100%", "30 days", "₹20L+",
 * "4.2X", "327%" into a numeric value + prefix + suffix so it can be fed
 * to <AnimatedNumber/>.
 *
 * - "40"      → { value: 40 }
 * - "40+"     → { value: 40, suffix: "+" }
 * - "8X"      → { value: 8, suffix: "X" }
 * - "4.2X"    → { value: 4.2, suffix: "X", decimals: 1 }
 * - "100%"    → { value: 100, suffix: "%" }
 * - "₹20L+"   → { value: 20, prefix: "₹", suffix: "L+" }
 * - "327%"    → { value: 327, suffix: "%" }
 * - "30 days" → { value: 30, suffix: " days" }  (only leading number is animated)
 *
 * Returns null if no leading number is found (so the caller can fall back
 * to rendering the raw string).
 */
export function parseStatString(
  raw: string
): { value: number; prefix?: string; suffix?: string; decimals?: number } | null {
  if (!raw) return null;
  const match = raw.match(/^([^\d-]*?)(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return null;
  const [, prefix, numStr, suffix] = match;
  const value = parseFloat(numStr);
  if (Number.isNaN(value)) return null;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  return {
    value,
    prefix: prefix || undefined,
    suffix: suffix || undefined,
    decimals,
  };
}
