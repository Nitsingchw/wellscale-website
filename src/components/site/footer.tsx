"use client";

import { useState } from "react";
import {
  TrendingUp,
  Mail,
  Phone,
  ShieldCheck,
  IndianRupee,
  ChevronDown,
  MessageCircle,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Facebook,
  Sparkles,
} from "lucide-react";
import { useRouter, type Route } from "./router";
import { AnimatedNumber } from "@/components/animated-number";
import { cn } from "@/lib/utils";

type PageLink = { label: string; route: Route };
const PAGE_LINKS: PageLink[] = [
  { label: "Home", route: "home" },
  { label: "About Us", route: "about" },
  { label: "Our Team", route: "team" },
  { label: "Contact Us", route: "contact" },
];

const LEGAL_LINKS: PageLink[] = [
  { label: "Privacy Policy", route: "privacy" },
  { label: "Terms & Conditions", route: "terms" },
];

const SERVICES = [
  "Meta Ad Strategy",
  "Walk-in Campaigns",
  "WhatsApp Nurturing",
  "Dead Lead Reactivation",
  "GMB Ranking",
  "Sales Training",
  "Influencer Marketing",
  "Content Strategy",
];

const STATS = [
  { icon: IndianRupee, label: "monthly ad spend managed", value: 20, prefix: "₹", suffix: "L+" },
  { icon: TrendingUp, label: "avg ROAS delivered", value: 4.2, suffix: "X", decimals: 1 },
  { icon: ShieldCheck, label: "performance-based", value: 100, suffix: "%" },
];

/**
 * Premium, mobile-friendly footer.
 *
 * Layout:
 *   - Desktop (md+): 12-col grid — brand+contact | quick stats | pages | services | legal
 *   - Mobile: stacked single column with collapsible (accordion) sections
 *
 * Sticky-footer behaviour is handled by the parent layout
 * (min-h-screen flex flex-col + mt-auto on <Footer/>).
 */
export function Footer() {
  const { navigate, route } = useRouter();

  return (
    <footer className="relative bg-ink text-white">
      {/* Top growth-line divider */}
      <div className="h-10 w-full overflow-hidden opacity-40">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 30"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 28 L120 27 L350 22 L500 18 L650 14 L800 10 L950 7 L1100 4 L1440 2"
            stroke="var(--lime)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16 pb-32 md:pb-16">
        {/* === TOP: brand + CTA strip === */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          {/* Brand block */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl bg-lime text-ink">
                <TrendingUp className="h-5 w-5" strokeWidth={2.6} />
                <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-ink" />
              </span>
              <div>
                <p className="text-xl font-bold tracking-tight">
                  Well<span className="text-lime">Scale</span>
                </p>
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/50">
                  Performance Marketing
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm text-white/70 leading-relaxed max-w-md">
              Performance marketing agency built exclusively for aesthetic
              clinics. We engineer patient pipelines that scale your revenue
              <span className="font-semibold text-lime"> 3X in 30 days</span>{" "}
              — or we work free.
            </p>

            {/* Inline stats — wraps nicely on mobile */}
            <div className="mt-6 flex flex-wrap gap-2.5">
              {STATS.map(({ icon: Icon, label, value, prefix, suffix, decimals }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-2 rounded-full border border-lime/25 bg-lime/5 px-3 py-1.5 text-xs"
                >
                  <Icon className="h-3.5 w-3.5 text-lime" />
                  <span className="font-bold text-lime tabular-nums">
                    <AnimatedNumber
                      value={value}
                      prefix={prefix}
                      suffix={suffix}
                      decimals={decimals}
                    />
                  </span>
                  <span className="text-white/60">{label}</span>
                </span>
              ))}
            </div>

            {/* Contact info — stacks gracefully on mobile */}
            <ul className="mt-6 space-y-3 text-sm">
              <li>
                <a
                  href="mailto:Admin@wellscalemedia.com"
                  className="group flex items-center gap-3 text-white/75 hover:text-lime transition-colors"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-lime/40 group-hover:bg-lime/10 transition-colors">
                    <Mail className="h-4 w-4 text-lime" />
                  </span>
                  <span className="break-all">Admin@wellscalemedia.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+917222999342"
                  className="group flex items-center gap-3 text-white/75 hover:text-lime transition-colors"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-lime/40 group-hover:bg-lime/10 transition-colors">
                    <Phone className="h-4 w-4 text-lime" />
                  </span>
                  <span>+91 72229 99342</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/917222999342"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 text-white/75 hover:text-lime transition-colors"
                >
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/5 group-hover:border-lime/40 group-hover:bg-lime/10 transition-colors">
                    <MessageCircle className="h-4 w-4 text-lime" />
                  </span>
                  <span>Chat on WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Right side: link columns (mobile = accordion, desktop = grid) */}
          <div className="lg:col-span-7">
            {/* Desktop grid (md+) */}
            <div className="hidden md:grid grid-cols-3 gap-6">
              <FooterLinkColumn
                title="Pages"
                links={PAGE_LINKS}
                activeRoute={route}
                onNavigate={navigate}
              />
              <FooterLinkColumn
                title="Legal"
                links={LEGAL_LINKS}
                activeRoute={route}
                onNavigate={navigate}
              />
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                  Services
                </p>
                <ul className="mt-4 space-y-2 text-sm">
                  {SERVICES.map((s) => (
                    <li
                      key={s}
                      className="text-white/75 leading-relaxed"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Mobile accordion (< md) */}
            <div className="md:hidden divide-y divide-white/10 border-t border-white/10">
              <MobileAccordion title="Pages">
                <ul className="space-y-2.5">
                  {PAGE_LINKS.map((l) => (
                    <li key={l.route}>
                      <button
                        type="button"
                        onClick={() => navigate(l.route)}
                        className={cn(
                          "text-sm transition-colors",
                          route === l.route
                            ? "text-lime font-semibold"
                            : "text-white/75"
                        )}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
              <MobileAccordion title="Services">
                <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4">
                  {SERVICES.map((s) => (
                    <li
                      key={s}
                      className="text-sm text-white/75 leading-relaxed"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
              <MobileAccordion title="Legal" defaultOpen>
                <ul className="space-y-2.5">
                  {LEGAL_LINKS.map((l) => (
                    <li key={l.route}>
                      <button
                        type="button"
                        onClick={() => navigate(l.route)}
                        className={cn(
                          "text-sm transition-colors",
                          route === l.route
                            ? "text-lime font-semibold"
                            : "text-white/75"
                        )}
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </MobileAccordion>
            </div>

            {/* CTA card */}
            <div className="mt-8 rounded-2xl border border-lime/25 bg-gradient-to-br from-lime/10 via-white/[0.03] to-transparent p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-lime text-ink">
                  <Sparkles className="h-5 w-5" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-white">
                    Scale your clinic in 30 days
                  </p>
                  <p className="mt-1 text-xs text-white/65 leading-relaxed">
                    Book a free strategy call. No contract, no risk — 100%
                    performance-based.
                  </p>
                </div>
              </div>
              <a
                href="https://wa.me/917222999342"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-lime px-5 py-3 text-sm font-bold text-ink hover:opacity-90 transition-opacity"
              >
                <MessageCircle className="h-4 w-4" />
                Message us on WhatsApp
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* === BOTTOM bar === */}
        <div className="mt-10 lg:mt-14 pt-6 border-t border-white/10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-white/55 text-center sm:text-left leading-relaxed">
              © {new Date().getFullYear()} WellScale · Performance Marketing
              for Aesthetic Clinics · All Rights Reserved
            </p>

            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs">
              {/* Privacy / Terms / 100% performance-based — hidden on mobile,
                  visible only on sm+ (desktop) to keep the mobile bottom bar
                  clean with just the copyright + social icons. */}
              <button
                type="button"
                onClick={() => navigate("privacy")}
                className="hidden sm:inline text-white/60 hover:text-lime transition-colors"
              >
                Privacy
              </button>
              <span className="hidden sm:inline text-white/25">·</span>
              <button
                type="button"
                onClick={() => navigate("terms")}
                className="hidden sm:inline text-white/60 hover:text-lime transition-colors"
              >
                Terms
              </button>
              <span className="hidden sm:inline text-white/25">·</span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-white/60">
                <ShieldCheck className="h-3.5 w-3.5 text-lime" />
                100% performance-based
              </span>

              {/* Social icons */}
              <span className="hidden sm:inline text-white/25">·</span>
              <div className="flex items-center gap-2">
                {[
                  { Icon: Instagram, label: "Instagram" },
                  { Icon: Linkedin, label: "LinkedIn" },
                  { Icon: Facebook, label: "Facebook" },
                ].map(({ Icon, label }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 text-white/60 hover:border-lime/40 hover:text-lime transition-colors"
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ---------- helpers ---------- */

function FooterLinkColumn({
  title,
  links,
  activeRoute,
  onNavigate,
}: {
  title: string;
  links: PageLink[];
  activeRoute: Route;
  onNavigate: (r: Route) => void;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/50">
        {title}
      </p>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.route}>
            <button
              type="button"
              onClick={() => onNavigate(l.route)}
              className={cn(
                "transition-colors text-left",
                activeRoute === l.route
                  ? "text-lime font-semibold"
                  : "text-white/75 hover:text-lime"
              )}
            >
              {l.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordion({
  title,
  children,
  defaultOpen = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between py-4"
        aria-expanded={open}
      >
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
          {title}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-lime transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "grid transition-all duration-200",
          open ? "grid-rows-[1fr] pb-4" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
