"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Footprints,
  MessageCircle,
  RefreshCw,
  HeartHandshake,
  MapPin,
  Share2,
  Sparkles,
  ClipboardList,
  GraduationCap,
  Plus,
  Minus,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { useContactForm } from "./router";

type Service = {
  icon: React.ElementType;
  title: string;
  short: string;
  detail: string;
  color: "primary" | "accent";
};

const SERVICES: Service[] = [
  {
    icon: Target,
    title: "Meta Ad Strategy & Lead Quality",
    short: "Stop paying for leads who ghost, bargain, or never show up.",
    detail:
      "We fix who sees your ad and how they respond — so you stop paying for leads who ghost, bargain, or never show up. Our targeting layers combine demographic, interest, and behaviour signals to surface only the high-intent patients who are ready to book a consultation.",
    color: "primary",
  },
  {
    icon: Footprints,
    title: "Walk-in Campaign Planning",
    short: "Bring more potential patients through your door.",
    detail:
      "Targeted campaigns designed to bring more potential patients through your door — not just into your inbox. We build geo-fenced offer funnels tied to local events and seasonal demand, so your clinic sees real foot traffic on slow days too.",
    color: "accent",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp Lead Nurturing",
    short: "Keep leads warm and guide them towards booking.",
    detail:
      "Automated and personalised WhatsApp follow-ups that keep leads warm and guide them towards booking. We script conversation trees that respond to common objections (price, timing, hesitancy) so no lead ever falls through the cracks.",
    color: "primary",
  },
  {
    icon: RefreshCw,
    title: "Dead Lead Reactivation",
    short: "Turn old unresponsive leads into walk-ins.",
    detail:
      "We go back to your old, unresponsive leads and turn them into walk-ins — money you've already spent on. A structured 3-touch reactivation sequence typically revives 8–14% of dead leads within 21 days, all without spending a rupee on fresh ads.",
    color: "accent",
  },
  {
    icon: HeartHandshake,
    title: "Customer Retention Strategy",
    short: "Stop chasing new leads every month.",
    detail:
      "Stop chasing new leads every month. We build systems that keep your existing patients coming back regularly — through milestone reminders, package renewals, and post-treatment care journeys that turn one-time visitors into lifetime clients.",
    color: "primary",
  },
  {
    icon: MapPin,
    title: "Google My Business Ranking",
    short: "Patients in your area find your clinic first — organically.",
    detail:
      "We improve your local search visibility so patients in your area find your clinic first — organically. From review velocity to photo uploads and post cadence, every GMB signal is tuned to push you into the top 3 of the local pack for your treatments.",
    color: "accent",
  },
  {
    icon: Share2,
    title: "Social Media & Brand Building",
    short: "Position the clinic as the go-to aesthetic destination.",
    detail:
      "A consistent, trust-building social presence that positions the clinic as the go-to aesthetic destination. We plan content pillars around before/afters, doctor credibility, and patient stories — so your feed sells your expertise even when you're not running ads.",
    color: "primary",
  },
  {
    icon: Sparkles,
    title: "Influencer Marketing",
    short: "Authentic awareness from the right local influencers.",
    detail:
      "We connect you with right local influencers to drive authentic awareness and bring in high-intent patients. Every collaboration is vetted for audience fit, engagement quality, and conversion potential — no vanity followings, only ROI-positive partnerships.",
    color: "accent",
  },
  {
    icon: ClipboardList,
    title: "Content Strategy & Guidance",
    short: "Your team always knows what to post, when, and why.",
    detail:
      "A clear, ready-to-execute content plan so your team always knows what to post, when, and why. Monthly calendars come with hooks, captions, hashtags, and shoot briefs — so execution takes hours, not days.",
    color: "primary",
  },
  {
    icon: GraduationCap,
    title: "Counselling & Sales Training",
    short: "Convert more walk-ins into paying patients — without being pushy.",
    detail:
      "We train your front-desk and consultation team to convert more walk-ins into paying patients — without being pushy. Role-play scripts, objection-handling frameworks, and post-consult follow-up templates are embedded into your team's daily workflow.",
    color: "accent",
  },
];

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const [open, setOpen] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: (index % 2) * 0.06 }}
      className={
        "agency-card rounded-2xl overflow-hidden transition-all duration-300 " +
        (open ? "ring-2 ring-lime/50 shadow-lg" : "hover:shadow-md")
      }
    >
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full text-left p-5 sm:p-6 flex items-start gap-4"
      >
        <span
          className={
            "inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform bg-ink text-lime " +
            (open ? " scale-110" : "")
          }
        >
          <Icon className="h-6 w-6" />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base sm:text-lg font-bold text-white leading-tight">
              {service.title}
            </h3>
            <span
              className={
                "inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors " +
                (open
                  ? "border-lime bg-lime text-ink"
                  : "border-white/10 bg-ink text-white/70")
              }
            >
              {open ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
            </span>
          </div>
          <p className="mt-1.5 text-sm text-white/60">{service.short}</p>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="px-5 sm:px-6 pb-6 pt-1">
              <div className="ml-16 pl-4 border-l-2 border-lime/40">
                <p className="text-sm text-white/80 leading-relaxed">
                  {service.detail}
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-white">
                  <TrendingUp className="h-3.5 w-3.5 text-lime" />
                  Included in your 30-day growth plan
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export function ServicesSection() {
  const openContactForm = useContactForm();
  return (
    <section
      id="offerings"
      className="section-anchor relative py-16 lg:py-24 bg-lime-wash overflow-hidden"
    >
      {/* Chart-grid background */}
      <div className="absolute inset-0 bg-chart-grid-fine opacity-50 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-white uppercase tracking-wider">
            <Megaphone className="h-3 w-3 text-lime" />
            What We Do
          </span>
          <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            A full-stack growth system
            <br className="hidden sm:block" />{" "}
            <span className="text-lime [background:linear-gradient(90deg,oklch(0.75_0.22_132),oklch(0.88_0.21_124))] [-webkit-background-clip:text] [background-clip:text] text-transparent">built for aesthetic clinics</span>
          </h2>
          <p className="mt-4 text-base text-white/60">
            We don&apos;t just run ads. We manage your entire patient pipeline — from first
            impression to final booking. Tap any service to see exactly how we deliver it.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="mt-10 lg:mt-12 grid md:grid-cols-2 gap-4 sm:gap-5">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>

        {/* Footer CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-2xl bg-ink text-white p-6 sm:p-8 relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
          <div className="relative text-center sm:text-left">
            <h3 className="text-xl sm:text-2xl font-bold">Want all 10 systems working for your clinic?</h3>
            <p className="mt-1 text-sm text-white/70">
              Get a free 15-minute strategy call. We&apos;ll show you which 3 to deploy first.
            </p>
          </div>
          <button
            type="button"
            onClick={() => openContactForm()}
            className="group relative inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3.5 text-sm font-bold text-ink hover:-translate-y-0.5 transition-all shadow-lg whitespace-nowrap"
          >
            Book Free Strategy Call
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-1">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
