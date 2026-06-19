"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Clock, CalendarCheck, ArrowRight, BadgeCheck, TrendingUp } from "lucide-react";
import { useContactForm } from "./router";

const GUARANTEE_POINTS = [
  "No fine print",
  "No awkward conversations",
  "Just results — or a clean exit",
];

export function GuaranteeSection() {
  const openContactForm = useContactForm();
  return (
    <section
      id="challenge"
      className="section-anchor relative py-16 lg:py-24 bg-lime-wash overflow-hidden"
    >
      {/* Chart-grid background */}
      <div className="absolute inset-0 bg-chart-grid-fine opacity-50 pointer-events-none" />
      {/* Lime glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full bg-lime/25 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-4 py-1.5 text-xs font-semibold text-white uppercase tracking-wider">
              <Clock className="h-3.5 w-3.5 text-lime" />
              The 3X Guarantee
            </span>

            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Guaranteed{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-lime">3X Revenue</span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-lime/30 -z-0 rounded-sm" />
              </span>
              <br />
              in 30 days.
            </h2>

            <p className="mt-6 text-base sm:text-lg text-white/60 max-w-xl mx-auto lg:mx-0">
              We don&apos;t just promise growth — we guarantee it. If we don&apos;t
              scale your clinic&apos;s revenue by 3X within 30 days, we keep working
              until we do. No fine print. No awkward conversations. Just
              measurable results — tracked weekly, signed off monthly.
            </p>

            {/* Guarantee points */}
            <ul className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2">
              {GUARANTEE_POINTS.map((p) => (
                <li key={p} className="inline-flex items-center gap-1.5 text-sm font-medium text-white">
                  <BadgeCheck className="h-4 w-4 text-lime" />
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center">
              <button
                type="button"
                onClick={() => openContactForm()}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-base font-bold text-lime border border-lime shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_24px_-2px_oklch(0.88_0.21_124_/_0.6)] hover:shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.9),0_0_36px_0_oklch(0.88_0.21_124_/_0.8)] hover:-translate-y-0.5 transition-all"
              >
                Claim Your Free Strategy Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <div className="inline-flex items-center gap-2 text-sm text-white/60">
                <ShieldCheck className="h-4 w-4 text-lime" />
                100% risk-free
              </div>
            </div>
          </motion.div>

          {/* RIGHT: large 3X badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative">
              {/* Pulsing rings */}
              <span className="absolute inset-0 rounded-full bg-lime/20 animate-ping" />
              <span className="absolute inset-4 rounded-full bg-lime/10 animate-pulse" />

              {/* Main badge */}
              <div className="relative h-64 w-64 sm:h-72 sm:w-72 rounded-full bg-ink flex flex-col items-center justify-center text-white shadow-[0_30px_80px_-20px_oklch(0.13_0.005_240_/_0.6)] border-4 border-lime/20">
                <div className="absolute inset-3 rounded-full border border-lime/30" />

                <span className="text-xs font-bold uppercase tracking-[0.2em] text-lime">
                  Guaranteed
                </span>
                <span className="mt-2 text-7xl sm:text-8xl font-extrabold leading-none tabular-nums text-lime glow-lime">
                  3X
                </span>
                <span className="mt-1 text-base font-semibold uppercase tracking-[0.18em] text-white/90">
                  Revenue
                </span>

                <div className="mt-4 flex items-center gap-1.5 rounded-full bg-lime/15 backdrop-blur px-3 py-1 text-xs font-bold text-lime">
                  <CalendarCheck className="h-3.5 w-3.5" />
                  In 30 Days
                </div>
              </div>

              {/* Floating dot */}
              <span className="absolute top-3 right-3 inline-flex h-4 w-4">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-4 w-4 rounded-full bg-lime ring-2 ring-white" />
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom growth line */}
      <div className="relative mt-12 h-16 w-full overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="guaranteeLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="oklch(0.75 0.22 132)" stopOpacity="0" />
              <stop offset="50%" stopColor="oklch(0.88 0.21 124)" />
              <stop offset="100%" stopColor="oklch(0.75 0.22 132)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            d="M0 50 L200 48 L350 42 L500 38 L650 30 L800 25 L950 18 L1100 12 L1250 8 L1440 4"
            stroke="url(#guaranteeLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="growth-line"
          />
        </svg>
      </div>
    </section>
  );
}
