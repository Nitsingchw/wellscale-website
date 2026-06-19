"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Simple theme toggle button — single click flips between Dark (default)
 * and White themes. Shows a Sun icon when in dark mode (click → switch to
 * light) and a Moon icon when in light mode (click → switch to dark).
 *
 * The icon rotation/swap is animated with Framer Motion for a small touch
 * of polish.
 */
export function ThemeSwitcher({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // next-themes only knows the active theme after hydration. Render a
  // neutral placeholder until then to avoid hydration mismatches.
  React.useEffect(() => setMounted(true), []);

  const isDark = mounted ? theme !== "light" : true;

  const handleToggle = () => {
    // If currently dark (or unknown), switch to light. Otherwise, dark.
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-all",
        "border-white/10 bg-ink text-foreground hover:border-lime/40 hover:bg-ink/80",
        "active:scale-90"
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        {mounted ? (
          isDark ? (
            <motion.span
              key="sun"
              initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <Sun className="h-4 w-4" />
            </motion.span>
          ) : (
            <motion.span
              key="moon"
              initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="inline-flex"
            >
              <Moon className="h-4 w-4" />
            </motion.span>
          )
        ) : (
          <Sun className="h-4 w-4 opacity-60" />
        )}
      </AnimatePresence>
    </button>
  );
}
