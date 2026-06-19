"use client";

import { motion } from "framer-motion";
import { TrendingUp, Target, Footprints, MessageSquare, IndianRupee, Users } from "lucide-react";
import { AnimatedNumber, parseStatString } from "@/components/animated-number";

type Metric = {
  icon: React.ElementType;
  prefix?: string;
  value: number;
  suffix: string;
  label: string;
  sublabel: string;
};

const METRICS: Metric[] = [
  {
    icon: TrendingUp,
    value: 3,
    suffix: "X",
    label: "Revenue growth",
    sublabel: "in 30 days",
  },
  {
    icon: Target,
    value: 4,
    suffix: "X",
    label: "ROAS",
    sublabel: "from Meta Ads",
  },
  {
    icon: Footprints,
    prefix: "+",
    value: 50,
    suffix: "%",
    label: "Walk-in rate",
    sublabel: "improvement",
  },
  {
    icon: MessageSquare,
    value: 2,
    suffix: "X",
    label: "Consultation",
    sublabel: "conversion rate",
  },
];

export function MetricsSection() {
  return (
    <section
      id="metrics"
      className="section-anchor relative py-16 lg:py-24 bg-ink text-white overflow-hidden"
    >
      {/* Chart-grid background */}
      <div className="absolute inset-0 bg-chart-grid-dark opacity-60 pointer-events-none" />
      {/* Lime glow */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-[60%] rounded-full bg-lime/15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/10 px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
            </span>
            What We Deliver
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
            Real numbers. <span className="text-lime glow-lime">Real clinics.</span>
          </h2>
          <p className="mt-3 text-base text-white/60">
            Outcomes from real aesthetic clinic partners — measured, not marketed.
          </p>
        </motion.div>

        {/* Metric grid */}
        <div className="mt-12 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {METRICS.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="metric-glow rounded-2xl p-4 sm:p-6 relative overflow-hidden group cursor-default bg-ink/5 border border-white/10 backdrop-blur-sm"
              >
                {/* Mini growth chart decoration */}
                <svg
                  className="absolute -bottom-1 -right-1 w-20 h-10 sm:w-24 sm:h-12 opacity-30 group-hover:opacity-60 transition-opacity"
                  viewBox="0 0 120 40"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M0 35 L20 32 L35 28 L50 22 L65 18 L80 12 L95 6 L120 2"
                    stroke="oklch(0.88 0.21 124)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                </svg>

                <div className="flex items-center justify-between">
                  <span className="inline-flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-lime text-ink">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-lime/15 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-lime uppercase tracking-wider">
                    <TrendingUp className="h-2.5 w-2.5" />
                    Live
                  </span>
                </div>

                <div className="mt-4">
                  <p className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white tabular-nums">
                    <AnimatedNumber
                      value={m.value}
                      prefix={m.prefix}
                      suffix={m.suffix}
                    />
                  </p>
                  <p className="mt-1.5 text-xs sm:text-sm font-bold text-white leading-tight">{m.label}</p>
                  <p className="text-[11px] sm:text-xs text-white/60 leading-tight">{m.sublabel}</p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom mini-strip with extra agency stats */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-8 sm:mt-10 grid grid-cols-1 sm:flex sm:flex-wrap items-center justify-center gap-2 sm:gap-x-6 sm:gap-y-3 text-xs sm:text-sm"
        >
          {[
            { icon: IndianRupee, value: "₹20L+", label: "monthly ad spend managed" },
            { icon: Users, value: "20+", label: "aesthetic clinics scaled" },
            { icon: Target, value: "4.2X", label: "average return on ad spend" },
          ].map(({ icon: Icon, value, label }) => {
            const parsed = parseStatString(value);
            return (
              <div
                key={label}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-ink/5 px-3 py-2"
              >
                <Icon className="h-4 w-4 text-lime shrink-0" />
                <span className="font-bold text-white tabular-nums">
                  {parsed ? (
                    <AnimatedNumber
                      value={parsed.value}
                      prefix={parsed.prefix}
                      suffix={parsed.suffix}
                      decimals={parsed.decimals}
                    />
                  ) : (
                    value
                  )}
                </span>
                <span className="text-white/60">{label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
