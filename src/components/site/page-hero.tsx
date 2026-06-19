"use client";

import { motion } from "framer-motion";
import { ChevronRight, Megaphone } from "lucide-react";
import type { Route } from "./router";

/**
 * Shared sub-page hero: breadcrumb, eyebrow, title, subtitle, growth-line decoration.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  currentRoute,
  breadcrumbLabel,
}: {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  currentRoute: Route;
  breadcrumbLabel: string;
}) {
  return (
    <section className="relative pt-28 lg:pt-36 pb-12 lg:pb-16 bg-lime-wash overflow-hidden">
      {/* Chart-grid background */}
      <div className="absolute inset-0 bg-chart-grid-fine opacity-60 pointer-events-none" />

      {/* Soft glow */}
      <div className="absolute -top-24 right-0 h-72 w-72 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-0 h-72 w-72 rounded-full bg-lime/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <motion.nav
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Breadcrumb"
          className="flex items-center gap-1.5 text-xs font-medium text-white/60"
        >
          <a
            href="#/"
            className="hover:text-white transition-colors"
          >
            Home
          </a>
          <ChevronRight className="h-3 w-3" />
          <span className="text-white font-semibold">{breadcrumbLabel}</span>
        </motion.nav>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mt-5 inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink/70 backdrop-blur px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-wider"
        >
          <Megaphone className="h-3.5 w-3.5 text-lime" />
          {eyebrow}
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-4 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]"
        >
          {title}
        </motion.h1>

        {/* Subtitle */}
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mt-5 text-base sm:text-lg text-white/60 max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}

        {/* Decorative growth line */}
        <motion.svg
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 h-10 w-full opacity-60"
          viewBox="0 0 800 40"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="pageHeroLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.75 0.22 132)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="oklch(0.88 0.21 124)" />
            </linearGradient>
          </defs>
          <path
            d="M0 35 L120 32 L200 28 L300 22 L400 16 L500 10 L600 6 L800 2"
            stroke="url(#pageHeroLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </motion.svg>
      </div>
    </section>
  );
}
