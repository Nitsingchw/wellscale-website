"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  TrendingUp,
  Target,
  Eye,
  ShieldCheck,
  Users,
  Award,
  Activity,
  Sparkles,
} from "lucide-react";
import { PageHero } from "./page-hero";
import { AnimatedNumber, parseStatString } from "@/components/animated-number";
import { useContactForm, type Route } from "./router";

const STATS = [
  { icon: Users, value: "40+", label: "Clinics scaled" },
  { icon: TrendingUp, value: "8X", label: "Max revenue growth" },
  { icon: Award, value: "100%", label: "Performance-based" },
  { icon: Activity, value: "30 days", label: "Average turnaround" },
];

const VALUES = [
  {
    icon: Target,
    title: "Outcomes, not output",
    body: "We measure ourselves only by your revenue line. Impressions, likes, and follower counts are nice — but we don't bill for them. If your clinic isn't growing, we're not doing our job.",
  },
  {
    icon: ShieldCheck,
    title: "Risk-free partnership",
    body: "Our 3X-in-30-days guarantee isn't a marketing hook — it's a contract clause. If we miss it, you owe us nothing. We absorb the risk so you can act with confidence.",
  },
  {
    icon: TrendingUp,
    title: "Clinic-first thinking",
    body: "We work exclusively with aesthetic clinics. That focus means we already know your patient funnel, your consultation bottlenecks, and your seasonality — before we even start.",
  },
  {
    icon: Sparkles,
    title: "Full-stack, not fragmented",
    body: "Most agencies hand you ads and disappear. We manage your entire patient pipeline — Meta, WhatsApp, GMB, front-desk training, retention — because that's how revenue actually scales.",
  },
];

const TIMELINE = [
  {
    year: "2021",
    title: "Started with one clinic",
    body: "We began by running Meta ads for a single skincare clinic in Mumbai. Within 90 days, we had tripled their monthly revenue — and realised the system was repeatable.",
  },
  {
    year: "2022",
    title: "Expanded to 12 clinics",
    body: "Word-of-mouth referrals brought us 12 partner clinics across Mumbai, Pune, and Bangalore. We added WhatsApp nurturing and front-desk training to plug the leaky consult funnel.",
  },
  {
    year: "2023",
    title: "Launched the 3X guarantee",
    body: "We'd hit 3X in 30 days enough times to bet on it. The performance-based guarantee became our standard offer — and 80% of new partners came in through it.",
  },
  {
    year: "2024 — Today",
    title: "40+ clinics and counting",
    body: "We're now a 14-person team working exclusively with aesthetic clinics across India. We turn away non-clinic clients so we can stay deep in this one vertical.",
  },
];

export function AboutPage({ currentRoute }: { currentRoute: Route }) {
  const openContactForm = useContactForm();
  return (
    <>
      <PageHero
        currentRoute={currentRoute}
        breadcrumbLabel="About Us"
        eyebrow="About WellScale"
        title={
          <>
            We scale aesthetic clinics.
            <br />
            <span className="text-lime">Nothing else.</span>
          </>
        }
        subtitle="WellScale is a performance marketing team that works exclusively with aesthetic clinics in India. We don't chase leads — we engineer patient pipelines that turn ad spend into walk-ins, and walk-ins into lifetime patients."
      />

      {/* Stats strip */}
      <section className="py-12 lg:py-16 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {STATS.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.06 }}
                  className="agency-card rounded-2xl p-5 sm:p-6 text-center"
                >
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-lime/15 text-lime mb-3">
                    <Icon className="h-5 w-5" />
                  </span>
                  <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white tabular-nums">
                    {(() => {
                      const parsed = parseStatString(s.value);
                      return parsed ? (
                        <AnimatedNumber
                          value={parsed.value}
                          prefix={parsed.prefix}
                          suffix={parsed.suffix}
                          decimals={parsed.decimals}
                        />
                      ) : (
                        s.value
                      );
                    })()}
                  </p>
                  <p className="mt-1 text-xs sm:text-sm text-white/60 font-medium">
                    {s.label}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Story section */}
      <section className="py-16 lg:py-24 bg-lime-wash relative overflow-hidden">
        <div className="absolute inset-0 bg-chart-grid-fine opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
                <TrendingUp className="h-3 w-3" />
                Our Story
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Built by marketers who got tired of vanity metrics.
              </h2>
              <div className="mt-6 space-y-4 text-base text-white/60 leading-relaxed">
                <p>
                  WellScale started in 2021 with a simple frustration: aesthetic
                  clinics were being sold "brand awareness" and "engagement" by
                  agencies that had never walked into a clinic. Leads came in,
                  ghosted, bargained, or never showed. Revenue stayed flat.
                  Owners were exhausted.
                </p>
                <p>
                  We took a different bet. We refused to bill for anything that
                  didn&apos;t move the revenue line. We built a full-stack growth
                  system — not just ads, but the entire patient pipeline from
                  first impression to final booking to repeat visit. And we
                  attached a guarantee to it: if we didn&apos;t 3X revenue in 30
                  days, the client didn&apos;t pay.
                </p>
                <p>
                  Three years later, that&apos;s still the only offer we make. We
                  work with 40+ aesthetic clinics across India, we&apos;ve
                  scaled some of them 8X, and we still turn away every client
                  who isn&apos;t a clinic — because being specialists is what
                  makes the system work.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="agency-card rounded-3xl p-6 lg:p-8 relative overflow-hidden">
                <svg
                  className="absolute top-0 left-0 w-full h-12 opacity-30"
                  viewBox="0 0 400 40"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden
                >
                  <path
                    d="M0 20 L80 20 L100 8 L120 32 L140 4 L160 36 L180 20 L400 20"
                    stroke="oklch(0.13 0.005 240)"
                    strokeWidth="2"
                  />
                </svg>
                <div className="relative pt-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-ink text-lime">
                      <Target className="h-6 w-6" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-white">Our Mission</p>
                      <p className="text-xs text-white/60 uppercase tracking-wider">
                        Why we exist
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-base text-white/80 leading-relaxed">
                    To make performance-based growth the default for every
                    aesthetic clinic in India — so owners can stop gambling on
                    agencies and start scaling with partners who carry the risk.
                  </p>
                </div>
              </div>

              <div className="agency-card rounded-3xl p-6 lg:p-8 relative overflow-hidden">
                <div className="flex items-center gap-3">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime text-ink">
                    <Eye className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-white">Our Vision</p>
                    <p className="text-xs text-white/60 uppercase tracking-wider">
                      Where we&apos;re going
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-base text-white/80 leading-relaxed">
                  To be the only growth partner an aesthetic clinic ever needs —
                  from first ad to the 100th repeat patient — without ever
                  asking them to pay for promises.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values section */}
      <section className="py-16 lg:py-24 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-white/5 px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
              <Megaphone className="h-3 w-3" />
              What We Believe
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              Four values that shape every decision.
            </h2>
            <p className="mt-3 text-base text-white/60">
              We turn away clients, fire bad ads, and rewrite proposals based on
              these. They&apos;re not posters on a wall — they&apos;re how we operate.
            </p>
          </motion.div>

          <div className="mt-12 grid md:grid-cols-2 gap-4 sm:gap-5">
            {VALUES.map((v, i) => {
              const Icon = v.icon;
              return (
                <motion.div
                  key={v.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: (i % 2) * 0.08 }}
                  className="agency-card rounded-2xl p-6 lg:p-7 metric-glow"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime/15 text-lime">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold text-white">{v.title}</h3>
                  <p className="mt-2 text-sm text-white/60 leading-relaxed">
                    {v.body}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline section */}
      <section className="py-16 lg:py-24 bg-lime-wash relative overflow-hidden">
        <div className="absolute inset-0 bg-chart-grid-fine opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
              <Activity className="h-3 w-3" />
              Our Journey
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              From one clinic to forty.
            </h2>
          </motion.div>

          <div className="mt-12 relative">
            {/* Vertical line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-lime/20 -translate-x-1/2" />

            <div className="space-y-8">
              {TIMELINE.map((item, i) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 }}
                  className={
                    "relative pl-12 sm:pl-0 sm:grid sm:grid-cols-2 sm:gap-8 " +
                    (i % 2 === 0 ? "" : "sm:[&>*:first-child]:order-2")
                  }
                >
                  {/* Dot */}
                  <span className="absolute left-4 sm:left-1/2 top-2 -translate-x-1/2 inline-flex h-4 w-4 items-center justify-center">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/40 opacity-75" />
                    <span className="relative inline-flex h-4 w-4 rounded-full bg-lime ring-4 ring-white" />
                  </span>

                  <div className={i % 2 === 0 ? "sm:text-right sm:pr-8" : "sm:pl-8"}>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-lime">
                      {item.year}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                      {item.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 lg:py-20 bg-ink">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl bg-ink text-white p-8 lg:p-12 relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Want to be clinic #41?
                </h3>
                <p className="mt-2 text-white/70">
                  Book a free 15-minute strategy call. We&apos;ll show you exactly
                  where your revenue is leaking — and how we&apos;d fix it.
                </p>
              </div>
              <div className="lg:text-right">
                <button
                  type="button"
                  onClick={() => openContactForm()}
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-base font-bold text-ink shadow-[0_14px_32px_-10px_oklch(0.62_0.16_162_/_0.7)] hover:shadow-[0_18px_40px_-10px_oklch(0.62_0.16_162_/_0.9)] hover:-translate-y-0.5 transition-all"
                >
                  Book Your Free Call
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
                    <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
