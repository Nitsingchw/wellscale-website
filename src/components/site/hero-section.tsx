"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import {
  ArrowRight,
  TrendingUp,
  ShieldCheck,
  Sparkles,
  Target,
  Star,
  IndianRupee,
  Activity,
  Zap,
} from "lucide-react";
import { useRouter, useSectionNav, useContactForm } from "./router";
import { AnimatedNumber } from "@/components/animated-number";

const CLINIC_TYPES = [
  "Skincare Clinics",
  "Laser Treatment Centres",
  "Hair Treatment Clinics",
  "Full Aesthetic Brands",
];

const TRUST_BADGES = [
  { icon: ShieldCheck, label: "No contract" },
  { icon: Activity, label: "No risk" },
  { icon: Zap, label: "100% performance-based" },
];

// Monthly revenue data for the chart (₹ in lakhs)
const MONTHS = ["M1", "M2", "M3", "M4", "M5", "M6"];
const REVENUE_DATA = [12, 18, 22, 28, 38, 52];

export function HeroSection() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 18 });
  const sy = useSpring(my, { stiffness: 80, damping: 18 });

  const layer1X = useTransform(sx, (v) => v * 14);
  const layer1Y = useTransform(sy, (v) => v * 14);
  const layer2X = useTransform(sx, (v) => v * 26);
  const layer2Y = useTransform(sy, (v) => v * 26);
  const layer3X = useTransform(sx, (v) => v * -10);
  const layer3Y = useTransform(sy, (v) => v * -10);
  const cardRotate = useTransform(sx, (v) => v * 3);

  const containerRef = useRef<HTMLDivElement>(null);
  const { navigate } = useRouter();
  const goSection = useSectionNav();
  const openContactForm = useContactForm();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(px);
    my.set(py);
  };

  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  // Chart geometry
  const maxRevenue = Math.max(...REVENUE_DATA);
  const chartW = 320;
  const chartH = 140;
  const padX = 12;
  const padY = 12;
  const points = REVENUE_DATA.map((v, i) => {
    const x = padX + (i / (REVENUE_DATA.length - 1)) * (chartW - padX * 2);
    const y = chartH - padY - (v / maxRevenue) * (chartH - padY * 2);
    return { x, y, v };
  });
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartH - padY} L ${points[0].x} ${chartH - padY} Z`;

  return (
    <section
      id="top"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden bg-lime-wash pt-24 lg:pt-32 pb-16 lg:pb-24"
    >
      {/* Chart-grid background */}
      <div className="absolute inset-0 bg-chart-grid-fine opacity-70 pointer-events-none" />

      {/* Soft radial accents */}
      <motion.div
        style={{ x: layer3X, y: layer3Y }}
        className="absolute -top-32 -right-20 h-96 w-96 rounded-full bg-lime/25 blur-3xl pointer-events-none"
      />
      <motion.div
        style={{ x: layer2X, y: layer2Y }}
        className="absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-lime/20 blur-3xl pointer-events-none"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          {/* LEFT: copy */}
          <div className="lg:col-span-7 text-center lg:text-left">
            {/* Eyebrow — short on mobile, full on desktop */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-lime/40 bg-lime/5 backdrop-blur px-3 py-1.5 text-[11px] sm:text-xs font-semibold text-lime whitespace-nowrap"
            >
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
              </span>
              <span className="sm:hidden">Performance Marketing · India</span>
              <span className="hidden sm:inline">Performance Marketing · For Aesthetic Clinics · India</span>
            </motion.div>

            {/* Headline — eye-catching with lime highlight + animated underline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="mt-5 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              <span className="block">More patients.</span>
              <span className="block">Higher revenue.</span>
              <span className="relative mt-1 inline-block">
                <span className="relative z-10 text-lime">Zero guesswork.</span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-lime/25 -z-0 rounded-sm" />
              </span>
            </motion.h1>

            {/* Sub copy — shorter, punchier */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-6 text-base sm:text-lg text-white/70 max-w-xl mx-auto lg:mx-0"
            >
              We engineer the entire patient pipeline — ads, nurture, walk-ins,
              and conversions — to scale your clinic{" "}
              <span className="font-bold text-lime">3X in 30 days</span>. Backed by
              a performance guarantee.
            </motion.p>

            {/* CTA row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-8 flex flex-col sm:flex-row items-center gap-3 lg:justify-start justify-center"
            >
              <button
                type="button"
                onClick={() => openContactForm()}
                className="group inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-lime px-7 py-4 text-base font-semibold text-ink shadow-[0_14px_32px_-10px_oklch(0.88_0.21_124_/_0.6)] hover:shadow-[0_18px_40px_-10px_oklch(0.88_0.21_124_/_0.8)] hover:-translate-y-0.5 transition-all"
              >
                Start Your Journey
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                type="button"
                onClick={() => goSection("offerings")}
                className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-lime/30 bg-transparent px-6 py-4 text-base font-semibold text-lime hover:border-lime hover:bg-lime/10 transition-colors"
              >
                See What We Do
              </button>
            </motion.div>

            {/* Trust badges */}
            <motion.ul
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 text-sm text-white/60"
            >
              {TRUST_BADGES.map(({ icon: Icon, label }) => (
                <li key={label} className="inline-flex items-center gap-1.5">
                  <Icon className="h-4 w-4 text-lime" />
                  <span className="font-medium">{label}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          {/* RIGHT: growth chart card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <motion.div
              style={{ x: layer1X, y: layer1Y, rotate: cardRotate }}
              className="relative mx-auto max-w-md"
            >
              {/* Growth card */}
              <div className="agency-card rounded-3xl p-6 lg:p-7 relative overflow-hidden">
                {/* Top: live campaign header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime text-ink">
                      <TrendingUp className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-medium text-white/50 uppercase tracking-wider">
                        Live Campaign
                      </p>
                      <p className="text-sm font-semibold text-white">
                        Revenue Growth
                      </p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime/15 px-2.5 py-1 text-xs font-bold text-lime">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
                    </span>
                    Live
                  </span>
                </div>

                {/* Chart */}
                <div className="mt-6">
                  <svg
                    viewBox={`0 0 ${chartW} ${chartH}`}
                    className="w-full h-auto"
                    preserveAspectRatio="none"
                    role="img"
                    aria-label="Revenue growth chart over 6 months"
                  >
                    <defs>
                      {/* Area fill: diagonal gradient that intensifies from
                          pale (top-left) to vivid lime (bottom-right),
                          mirroring the upward revenue trend. Colors use CSS
                          variables so they adapt to dark/light themes. */}
                      <linearGradient id="growthArea" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="var(--lime)" stopOpacity="0.05" />
                        <stop offset="55%" stopColor="var(--lime)" stopOpacity="0.18" />
                        <stop offset="100%" stopColor="var(--lime)" stopOpacity="0.38" />
                      </linearGradient>
                      {/* Line: solid vivid green (no gradient) so it pops
                          against both dark and white card backgrounds. */}
                      <linearGradient id="growthLine" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="var(--lime)" />
                        <stop offset="100%" stopColor="var(--lime)" />
                      </linearGradient>
                    </defs>

                    {/* Grid lines */}
                    {[0.25, 0.5, 0.75].map((r) => (
                      <line
                        key={r}
                        x1={padX}
                        y1={padY + r * (chartH - padY * 2)}
                        x2={chartW - padX}
                        y2={padY + r * (chartH - padY * 2)}
                        stroke="var(--grid-line)"
                        strokeWidth="1"
                        strokeDasharray="2 4"
                      />
                    ))}

                    {/* Area fill */}
                    <path d={areaPath} fill="url(#growthArea)" />

                    {/* Line */}
                    <path
                      d={linePath}
                      stroke="var(--lime)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                      className="growth-line"
                    />

                    {/* Data points — use foreground (dark in light theme,
                        light in dark theme) so dots are visible on both
                        card backgrounds, with a lime stroke ring. */}
                    {points.map((p, i) => (
                      <g key={i}>
                        <circle
                          cx={p.x}
                          cy={p.y}
                          r={i === points.length - 1 ? 5 : 3.5}
                          fill="var(--foreground)"
                          stroke="var(--lime)"
                          strokeWidth="2"
                        />
                        {i === points.length - 1 && (
                          <g>
                            <circle cx={p.x} cy={p.y} r="9" fill="var(--lime)" fillOpacity="0.25">
                              <animate attributeName="r" values="6;12;6" dur="2s" repeatCount="indefinite" />
                              <animate attributeName="fill-opacity" values="0.4;0;0.4" dur="2s" repeatCount="indefinite" />
                            </circle>
                            <text
                              x={p.x - 18}
                              y={p.y - 14}
                              className="text-[10px] font-bold"
                              fill="var(--lime)"
                            >
                              ₹{p.v}L
                            </text>
                          </g>
                        )}
                      </g>
                    ))}
                  </svg>

                  {/* X-axis labels */}
                  <div className="mt-2 flex justify-between px-2 text-[10px] font-semibold text-muted-foreground">
                    {MONTHS.map((m) => (
                      <span key={m}>{m}</span>
                    ))}
                  </div>
                </div>

                {/* Stats grid */}
                <div className="mt-6 grid grid-cols-3 gap-3">
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                      <IndianRupee className="h-2.5 w-2.5 text-lime" />
                      Managed
                    </div>
                    <p className="mt-1 text-lg font-extrabold text-lime tabular-nums">
                      <AnimatedNumber value={20} prefix="₹" suffix="L+" />
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                      <Target className="h-2.5 w-2.5 text-lime" />
                      Avg ROAS
                    </div>
                    <p className="mt-1 text-lg font-extrabold text-lime tabular-nums">
                      <AnimatedNumber value={4.2} suffix="X" decimals={1} />
                    </p>
                  </div>
                  <div className="rounded-2xl bg-white/5 border border-white/5 p-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white/40">
                      <TrendingUp className="h-2.5 w-2.5 text-lime" />
                      Clinics
                    </div>
                    <p className="mt-1 text-lg font-extrabold text-lime tabular-nums">
                      <AnimatedNumber value={40} suffix="+" />
                    </p>
                  </div>
                </div>

                {/* Clinic-type chips */}
                <div className="mt-5">
                  <p className="text-[10px] font-bold text-white/40 uppercase tracking-wider mb-2">
                    Works for
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {CLINIC_TYPES.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border border-lime/20 bg-lime/5 px-2.5 py-1 text-[11px] font-semibold text-lime/90"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating "performance" pill */}
              <motion.div
                style={{ x: layer2X, y: layer2Y }}
                className="absolute -top-6 -right-6 hidden sm:flex items-center gap-2 rounded-2xl bg-ink text-lime shadow-xl px-3 py-2 drift-slow"
              >
                <Sparkles className="h-4 w-4" />
                <div className="leading-none">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-lime/70">
                    Performance
                  </p>
                  <p className="text-sm font-bold tabular-nums">
                    <AnimatedNumber value={327} prefix="+" suffix="%" />
                  </p>
                </div>
              </motion.div>

              {/* Floating rating pill */}
              <motion.div
                style={{ x: layer3X, y: layer3Y }}
                className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-2 rounded-2xl bg-ink shadow-xl border border-lime/30 px-3 py-2 drift-slower"
              >
                <div className="flex -space-x-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime text-ink text-[10px] font-bold ring-2 ring-ink"
                    >
                      {["A", "K", "M"][i]}
                    </span>
                  ))}
                </div>
                <div className="flex items-center gap-0.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <Star key={i} className="h-3 w-3 fill-lime text-lime" />
                  ))}
                </div>
                <span className="text-[11px] font-bold text-lime tabular-nums">
                  <AnimatedNumber value={40} suffix="+" /> clinics
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom growth line spanning full width */}
      <div className="relative mt-12 lg:mt-16 h-12 sm:h-16 w-full overflow-hidden">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 60"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <linearGradient id="heroBottomLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--lime)" stopOpacity="0" />
              <stop offset="50%" stopColor="var(--lime)" />
              <stop offset="100%" stopColor="var(--lime)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {/* Upward trending line */}
          <path
            d="M0 50 L200 48 L350 42 L500 38 L650 30 L800 25 L950 18 L1100 12 L1250 8 L1440 4"
            stroke="url(#heroBottomLine)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="growth-line"
          />
        </svg>
      </div>
    </section>
  );
}
