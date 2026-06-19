"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  TrendingUp,
  ChevronDown,
  Users,
  Info,
  Phone,
  ShieldCheck,
  ScrollText,
  Home,
  BadgeCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter, useContactForm, type Route } from "./router";
import { ThemeSwitcher } from "@/components/theme-switcher";

type TopLink = { kind: "route"; label: string; route: Route };

const TOP_LINKS: TopLink[] = [
  { kind: "route", label: "Home", route: "home" },
  { kind: "route", label: "About Us", route: "about" },
  { kind: "route", label: "Our Team", route: "team" },
  { kind: "route", label: "Contact", route: "contact" },
];

const LEGAL_LINKS: { label: string; route: Route; icon: React.ElementType }[] = [
  { label: "Privacy Policy", route: "privacy", icon: ShieldCheck },
  { label: "Terms & Conditions", route: "terms", icon: ScrollText },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);
  const { route, navigate } = useRouter();
  const openContactForm = useContactForm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!legalOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-legal-dropdown]")) setLegalOpen(false);
    };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [legalOpen]);

  const isHome = route === "home";

  const handleNavClick = (link: TopLink) => {
    setOpen(false);
    navigate(link.route);
  };

  return (
    <>
    <header
      className={cn(
        "relative inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || !isHome
          ? "bg-ink/85 backdrop-blur-xl border-b border-white/10 shadow-[0_4px_24px_-12px_oklch(0_0_0_/_0.5)]"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8 h-16 lg:h-20">
        {/* Logo */}
        <button
          type="button"
          onClick={() => navigate("home")}
          className="flex items-center gap-2 group cursor-pointer"
          aria-label="WellScale home"
        >
          <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl bg-ink text-lime shadow-[0_8px_20px_-6px_oklch(0.13_0.005_240_/_0.5)] transition-transform group-hover:scale-105">
            <TrendingUp className="h-5 w-5" strokeWidth={2.6} />
            <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-lime ring-2 ring-white" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="text-lg font-bold tracking-tight text-white">
              Well<span className="text-lime">Scale</span>
            </span>
          </span>
        </button>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-0.5">
          {TOP_LINKS.map((link) => {
            const isActive =
              link.kind === "route" &&
              ((link.route === "home" && isHome) ||
                (link.route !== "home" && route === link.route));
            return (
              <button
                key={link.label}
                type="button"
                onClick={() => handleNavClick(link)}
                className={cn(
                  "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5",
                  isActive
                    ? "text-white bg-lime/10"
                    : "text-white/80 hover:text-white hover:bg-white/5"
                )}
              >
                {link.label}
              </button>
            );
          })}

          {/* Legal dropdown */}
          <div className="relative" data-legal-dropdown>
            <button
              type="button"
              onClick={() => setLegalOpen(!legalOpen)}
              className={cn(
                "relative px-4 py-2 text-sm font-medium transition-colors rounded-lg flex items-center gap-1.5",
                route === "privacy" || route === "terms"
                  ? "text-white bg-lime/10"
                  : "text-white/80 hover:text-white hover:bg-white/5"
              )}
              aria-expanded={legalOpen}
              aria-haspopup="true"
            >
              Legal
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  legalOpen && "rotate-180"
                )}
              />
            </button>
            <AnimatePresence>
              {legalOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-56 rounded-2xl border border-white/10 bg-ink shadow-xl p-1.5"
                >
                  {LEGAL_LINKS.map((l) => {
                    const Icon = l.icon;
                    return (
                      <button
                        key={l.route}
                        type="button"
                        onClick={() => {
                          setLegalOpen(false);
                          navigate(l.route);
                        }}
                        className={cn(
                          "w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors text-left",
                          route === l.route
                            ? "bg-lime/10 text-white"
                            : "text-white/80 hover:bg-white/5 hover:text-white"
                        )}
                      >
                        <Icon className="h-4 w-4" />
                        {l.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => openContactForm()}
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-lime border border-lime shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_20px_-2px_oklch(0.88_0.21_124_/_0.6),0_10px_24px_-8px_oklch(0.13_0.005_240_/_0.5)] hover:shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.9),0_0_32px_0_oklch(0.88_0.21_124_/_0.85),0_14px_30px_-8px_oklch(0.13_0.005_240_/_0.7)] hover:-translate-y-0.5 transition-all"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime/80 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-lime" />
            </span>
            Book a Free Call
          </button>
        </div>

        {/* Mobile theme switcher + menu trigger */}
        <div className="lg:hidden flex items-center gap-2">
          <ThemeSwitcher />
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-ink text-white shadow-sm active:scale-95 transition-transform"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </nav>
    </header>

      {/* Mobile drawer — rendered OUTSIDE header to avoid backdrop-filter containing block issue */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="lg:hidden fixed inset-0 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            <motion.div
              className="absolute right-0 top-0 h-full w-[82%] max-w-sm bg-ink shadow-2xl flex flex-col border-l border-lime/20"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 320, damping: 32 }}
              style={{ zIndex: 101 }}
            >
              <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-ink text-lime">
                    <TrendingUp className="h-4 w-4" />
                  </span>
                  <span className="font-bold text-white">
                    Well<span className="text-lime">Scale</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-5 py-6 space-y-1">
                <MobileLink
                  icon={Home}
                  label="Home"
                  active={isHome}
                  onClick={() => handleNavClick({ kind: "route", label: "Home", route: "home" })}
                  delay={0.05}
                />
                <MobileLink
                  icon={Info}
                  label="About Us"
                  active={route === "about"}
                  onClick={() => handleNavClick({ kind: "route", label: "About", route: "about" })}
                  delay={0.08}
                />
                <MobileLink
                  icon={Users}
                  label="Our Team"
                  active={route === "team"}
                  onClick={() => handleNavClick({ kind: "route", label: "Our Team", route: "team" })}
                  delay={0.11}
                />
                <MobileLink
                  icon={Phone}
                  label="Contact Us"
                  active={route === "contact"}
                  onClick={() => handleNavClick({ kind: "route", label: "Contact", route: "contact" })}
                  delay={0.14}
                />

                <div className="my-3 mx-2 border-t border-white/5" />

                <p className="px-4 py-2 text-[10px] font-bold uppercase tracking-[0.16em] text-white/60">
                  Legal
                </p>
                {LEGAL_LINKS.map((l, i) => {
                  const Icon = l.icon;
                  return (
                    <motion.button
                      key={l.route}
                      type="button"
                      onClick={() => {
                        setOpen(false);
                        navigate(l.route);
                      }}
                      className={
                        "w-full flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-colors text-left " +
                        (route === l.route
                          ? "bg-lime/10 text-white"
                          : "text-white hover:bg-white/5")
                      }
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.03 }}
                    >
                      <span className="flex items-center gap-3">
                        <Icon className="h-4 w-4 text-lime" />
                        {l.label}
                      </span>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-lime">
                        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.button>
                  );
                })}
              </div>

              <div className="px-5 pb-8 pt-4 border-t border-white/10 space-y-4">
                <button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                    // Use a slight delay so the drawer closes first, then open the form
                    setTimeout(() => openContactForm(), 200);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-4 text-base font-semibold text-lime border border-lime shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_24px_-2px_oklch(0.88_0.21_124_/_0.6)] active:scale-[0.98] transition-transform"
                >
                  Book a Free Call
                </button>
                <ul className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 mt-1">
                  {["No contract", "No risk", "100% performance-based"].map((p) => (
                    <li
                      key={p}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-white/70"
                    >
                      <BadgeCheck className="h-3.5 w-3.5 text-lime" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MobileLink({
  icon: Icon,
  label,
  active,
  onClick,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
  delay: number;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={
        "w-full flex items-center justify-between rounded-2xl px-4 py-4 text-base font-semibold transition-colors text-left " +
        (active ? "bg-lime/10 text-white" : "text-white hover:bg-white/5")
      }
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
    >
      <span className="flex items-center gap-3">
        <Icon className="h-4 w-4 text-lime" />
        {label}
      </span>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-lime">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.button>
  );
}
