"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Megaphone,
  Send,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { PageHero } from "./page-hero";
import type { Route } from "./router";

const TREATMENTS = [
  "Skincare & Facials",
  "Laser Treatments",
  "Hair Treatments",
  "Multiple (Full Aesthetic Clinic)",
];

const CONTACT_METHODS = [
  {
    icon: Phone,
    label: "Call us",
    value: "+91 72229 99342",
    href: "tel:+917222999342",
    sub: "Mon–Sat, 10am – 7pm IST",
    tone: "primary" as const,
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "+91 72229 99342",
    href: "https://wa.me/917222999342",
    sub: "Fastest response — usually under 30 min",
    tone: "accent" as const,
  },
  {
    icon: Mail,
    label: "Email",
    value: "Admin@wellscalemedia.com",
    href: "mailto:Admin@wellscalemedia.com",
    sub: "For partnerships & press",
    tone: "primary" as const,
  },
];

export function ContactPage({ currentRoute }: { currentRoute: Route }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    whatsapp: "",
    clinic: "",
    city: "",
    treatment: "",
    problem: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "3e2d0452-279c-4781-a60b-ed75cacf30b6",
          subject: "New Strategy Call Request — WellScale Contact Page",
          from_name: "WellScale Website",
          name: form.name,
          whatsapp: form.whatsapp,
          clinic: form.clinic,
          city: form.city,
          treatment: form.treatment,
          problem: form.problem,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <PageHero
        currentRoute={currentRoute}
        breadcrumbLabel="Contact Us"
        eyebrow="Get in Touch"
        title={
          <>
            Let&apos;s talk about
            <br />
            <span className="text-lime">your clinic&apos;s growth.</span>
          </>
        }
        subtitle="Book a free 15-minute strategy call. We'll show you exactly where your revenue is leaking and how we'd fix it — no sales pitch, no commitment, just a clear roadmap."
      />

      {/* Contact methods strip */}
      <section className="py-12 lg:py-16 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-3 gap-4 sm:gap-5">
            {CONTACT_METHODS.map((m, i) => {
              const Icon = m.icon;
              return (
                <motion.a
                  key={m.label}
                  href={m.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="agency-card rounded-2xl p-6 metric-glow block"
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={
                        "inline-flex h-11 w-11 items-center justify-center rounded-xl " +
                        (m.tone === "primary"
                          ? "bg-lime/15 text-lime"
                          : "bg-lime/15 text-lime")
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <ArrowRight className="h-4 w-4 text-white/60" />
                  </div>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wider text-white/60">
                    {m.label}
                  </p>
                  <p className="mt-1 text-base font-bold text-white">
                    {m.value}
                  </p>
                  <p className="mt-1 text-xs text-white/60">{m.sub}</p>
                </motion.a>
              );
            })}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-16 lg:py-24 bg-lime-wash relative overflow-hidden">
        <div className="absolute inset-0 bg-chart-grid-fine opacity-40 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-12 items-start">
            {/* LEFT: info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
                <Megaphone className="h-3 w-3" />
                What Happens Next
              </span>
              <h2 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Three simple steps
                <br />
                <span className="text-lime">from hello to roadmap.</span>
              </h2>

              <div className="mt-8 space-y-4">
                {[
                  {
                    icon: MessageCircle,
                    title: "We reach out within 24 hours",
                    body: "Our team will reach out on WhatsApp to schedule your free strategy call at a time that works for you.",
                    tone: "primary" as const,
                  },
                  {
                    icon: Calendar,
                    title: "A 15-minute strategy call",
                    body: "No sales pitch — just a clear look at what's holding your clinic back and a roadmap to fix it.",
                    tone: "accent" as const,
                  },
                  {
                    icon: ShieldCheck,
                    title: "You decide. Risk-free.",
                    body: "If we don't hit 3X revenue growth in 30 days, we work free until we do. No contracts lock you in.",
                    tone: "primary" as const,
                  },
                ].map(({ icon: Icon, title, body, tone }, i) => (
                  <div
                    key={title}
                    className="flex items-start gap-4 rounded-2xl border border-white/10 bg-ink p-5"
                  >
                    <span
                      className={
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl " +
                        (tone === "primary"
                          ? "bg-lime/15 text-lime"
                          : "bg-lime/15 text-lime")
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-ink text-white text-[10px] font-bold">
                          {i + 1}
                        </span>
                        <p className="text-sm font-bold text-white">{title}</p>
                      </div>
                      <p className="mt-1.5 text-sm text-white/60 leading-relaxed">
                        {body}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Working hours card */}
              <div className="mt-6 rounded-2xl border border-white/10 bg-ink p-5">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-white/60">
                  <span className="inline-flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5 text-lime" />
                    Mon–Sat: 10am – 7pm IST
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <TrendingUp className="h-3.5 w-3.5 text-lime" />
                    Closed on Sundays
                  </span>
                </div>
              </div>
            </motion.div>

            {/* RIGHT: form / confirmation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative"
            >
              <div className="agency-card rounded-3xl p-6 sm:p-8 relative overflow-hidden">
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

                <AnimatePresence mode="wait">
                  {!submitted ? (
                    <motion.div
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -40 }}
                      transition={{ duration: 0.3 }}
                      className="relative pt-4"
                    >
                      <div className="mb-5">
                        <p className="text-xs font-bold uppercase tracking-wider text-lime">
                          Free Strategy Call
                        </p>
                        <p className="mt-1 text-xl font-bold text-white">
                          Book your 15-minute slot
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field
                            label="Your Name"
                            id="name"
                            value={form.name}
                            onChange={(v) => update("name", v)}
                            placeholder="Your name"
                            required
                          />
                          <Field
                            label="WhatsApp Number"
                            id="whatsapp"
                            type="tel"
                            value={form.whatsapp}
                            onChange={(v) => update("whatsapp", v.replace(/\D/g, "").slice(0, 10))}
                            placeholder="10-digit mobile number"
                            required
                            maxLength={10}
                            pattern="[0-9]{10}"
                            inputMode="numeric"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <Field
                            label="Clinic Name"
                            id="clinic"
                            value={form.clinic}
                            onChange={(v) => update("clinic", v)}
                            placeholder="Glow Aesthetic Clinic"
                            required
                          />
                          <Field
                            label="City"
                            id="city"
                            value={form.city}
                            onChange={(v) => update("city", v)}
                            placeholder="Mumbai"
                            required
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="treatment"
                            className="block text-sm font-semibold text-white mb-1.5"
                          >
                            Primary Treatment You Offer
                          </label>
                          <select
                            id="treatment"
                            required
                            value={form.treatment}
                            onChange={(e) => update("treatment", e.target.value)}
                            className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white focus:border-lime focus:ring-2 focus:ring-lime/30 focus:outline-none transition-colors"
                          >
                            <option value="" disabled>
                              Select a category
                            </option>
                            {TREATMENTS.map((t) => (
                              <option key={t} value={t}>
                                {t}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label
                            htmlFor="problem"
                            className="block text-sm font-semibold text-white mb-1.5"
                          >
                            Biggest Problem Right Now
                          </label>
                          <textarea
                            id="problem"
                            rows={4}
                            value={form.problem}
                            onChange={(e) => update("problem", e.target.value)}
                            placeholder="e.g. Ads are running but leads aren't converting into walk-ins..."
                            className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder:text-white/60/60 focus:border-lime focus:ring-2 focus:ring-lime/30 focus:outline-none transition-colors resize-none"
                          />
                        </div>

                        {error && (
                          <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {error}
                          </div>
                        )}

                        <button
                          type="submit"
                          disabled={submitting}
                          className="group w-full inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-6 py-4 text-base font-bold text-lime border border-lime shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_24px_-2px_oklch(0.88_0.21_124_/_0.6),0_14px_28px_-10px_oklch(0.13_0.005_240_/_0.6)] hover:shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.8),0_0_36px_0_oklch(0.88_0.21_124_/_0.8),0_18px_36px_-10px_oklch(0.13_0.005_240_/_0.8)] hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-60 disabled:hover:translate-y-0 disabled:cursor-not-allowed"
                        >
                          {submitting ? (
                            <>
                              <svg
                                className="animate-spin h-4 w-4"
                                viewBox="0 0 24 24"
                                fill="none"
                                aria-hidden
                              >
                                <circle
                                  className="opacity-25"
                                  cx="12"
                                  cy="12"
                                  r="10"
                                  stroke="currentColor"
                                  strokeWidth="4"
                                />
                                <path
                                  className="opacity-75"
                                  fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                              Book My Free Strategy Call
                            </>
                          )}
                        </button>

                        <p className="text-center text-xs text-white/60">
                          By submitting, you agree to be contacted on WhatsApp about
                          your free strategy call.
                        </p>
                      </form>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="confirm"
                      initial={{ opacity: 0, x: 80 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      className="relative pt-6 text-center min-h-[520px] flex flex-col items-center justify-center"
                    >
                      <div className="relative">
                        <span className="absolute inset-0 rounded-full bg-lime/20 animate-ping" />
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
                          className="relative inline-flex h-20 w-20 items-center justify-center rounded-full bg-lime text-ink shadow-[0_18px_36px_-8px_oklch(0.62_0.16_162_/_0.55)]"
                        >
                          <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
                        </motion.div>
                      </div>

                      <motion.h3
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35 }}
                        className="mt-6 text-2xl font-extrabold text-white"
                      >
                        Your request is in.
                      </motion.h3>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.45 }}
                        className="mt-2 text-sm text-white/60 max-w-xs mx-auto"
                      >
                        Hi {form.name || "there"} — our team will reach out within{" "}
                        <span className="font-semibold text-white">24 hours</span> on
                        WhatsApp to schedule your free strategy call.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.55 }}
                        className="mt-6 w-full max-w-xs rounded-2xl border border-white/10 bg-white/5 p-4 text-left"
                      >
                        <div className="flex items-center gap-2 text-xs font-bold text-lime uppercase tracking-wider">
                          <Phone className="h-3.5 w-3.5" />
                          What to expect
                        </div>
                        <ul className="mt-2 space-y-1.5 text-xs text-white/60">
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-lime">•</span>
                            WhatsApp message from our team within 24 hours
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-lime">•</span>
                            A 15-minute strategy call at your preferred time
                          </li>
                          <li className="flex items-start gap-2">
                            <span className="mt-0.5 text-lime">•</span>
                            A clear roadmap — no pushy sales talk
                          </li>
                        </ul>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.65 }}
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="mt-6 text-sm font-semibold text-lime hover:text-lime transition-colors"
                      >
                        ← Submit another request
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  maxLength,
  pattern,
  inputMode,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
  pattern?: string;
  inputMode?: "text" | "numeric" | "tel" | "email";
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-white mb-1.5">
        {label}
        {required && <span className="text-lime ml-0.5">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        pattern={pattern}
        inputMode={inputMode}
        className="w-full rounded-xl border border-white/10 bg-ink px-4 py-3 text-sm text-white placeholder:text-white/60/60 focus:border-lime focus:ring-2 focus:ring-lime/30 focus:outline-none transition-colors"
      />
    </div>
  );
}
