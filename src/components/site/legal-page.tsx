"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Megaphone,
  FileText,
  ShieldCheck,
  ScrollText,
  ChevronRight,
} from "lucide-react";
import { PageHero } from "./page-hero";
import type { Route } from "./router";

type Section = {
  id: string;
  title: string;
  body: React.ReactNode;
};

type LegalPageProps = {
  currentRoute: Route;
  breadcrumbLabel: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle: string;
  variant: "privacy" | "terms";
  lastUpdated: string;
  sections: Section[];
};

export function LegalPage({
  currentRoute,
  breadcrumbLabel,
  eyebrow,
  title,
  subtitle,
  variant,
  lastUpdated,
  sections,
}: LegalPageProps) {
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? "");

  // Track active section on scroll
  useEffect(() => {
    const onScroll = () => {
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top < 140) {
          current = s.id;
        }
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [sections]);

  const Icon = variant === "privacy" ? ShieldCheck : ScrollText;

  return (
    <>
      <PageHero
        currentRoute={currentRoute}
        breadcrumbLabel={breadcrumbLabel}
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
      />

      <section className="py-12 lg:py-16 bg-ink">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* LEFT: sticky table of contents */}
            <aside className="lg:col-span-4 xl:col-span-3">
              <div className="lg:sticky lg:top-24">
                <div className="agency-card rounded-2xl p-5">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-lime/15 text-lime">
                      <Icon className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider text-white/60">
                        On this page
                      </p>
                      <p className="text-sm font-bold text-white">
                        {sections.length} sections
                      </p>
                    </div>
                  </div>

                  <nav className="mt-4 space-y-0.5">
                    {sections.map((s, i) => (
                      <a
                        key={s.id}
                        href={`#${s.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          document
                            .getElementById(s.id)
                            ?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={
                          "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors " +
                          (activeId === s.id
                            ? "bg-lime/15 text-lime font-semibold"
                            : "text-white/60 hover:text-white hover:bg-white/5")
                        }
                      >
                        <span
                          className={
                            "inline-flex h-5 w-5 shrink-0 items-center justify-center rounded text-[10px] font-bold " +
                            (activeId === s.id
                              ? "bg-ink text-lime"
                              : "bg-white/5 text-white/60")
                          }
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="line-clamp-2 leading-tight">{s.title}</span>
                      </a>
                    ))}
                  </nav>

                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs text-white/60">
                      <span className="font-semibold text-white">Last updated:</span>
                      <br />
                      {lastUpdated}
                    </p>
                  </div>
                </div>

                {/* Need help? */}
                <div className="mt-4 rounded-2xl border border-white/10 bg-lime-wash p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-lime">
                    Questions?
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    We&apos;re happy to walk you through any clause. Reach out
                    anytime.
                  </p>
                  <a
                    href="#/contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-lime hover:text-lime transition-colors"
                  >
                    Contact us
                    <ChevronRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            </aside>

            {/* RIGHT: content */}
            <div className="lg:col-span-8 xl:col-span-9">
              <article className="max-w-3xl">
                {sections.map((s, i) => (
                  <motion.section
                    key={s.id}
                    id={s.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45 }}
                    className="scroll-mt-24 pb-10 mb-10 border-b border-[oklch(0.92_0.003_120)] last:border-0 last:mb-0 last:pb-0"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-ink text-lime text-xs font-bold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h2 className="text-xl sm:text-2xl font-bold text-white">
                        {s.title}
                      </h2>
                    </div>
                    <div className="prose prose-sm sm:prose-base max-w-none text-white/80 leading-relaxed space-y-4">
                      {s.body}
                    </div>
                  </motion.section>
                ))}

                {/* Bottom signature card */}
                <div className="mt-10 rounded-2xl bg-ink text-white p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -top-12 -right-12 h-40 w-40 rounded-full bg-lime/20 blur-3xl pointer-events-none" />
                  <div className="relative flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink text-lime">
                      <Megaphone className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-base font-bold">
                        Still have questions about this policy?
                      </p>
                      <p className="mt-1 text-sm text-white/70">
                        Email us at{" "}
                        <a
                          href="mailto:legal@wellscalemedia.com"
                          className="text-lime underline underline-offset-2"
                        >
                          legal@wellscalemedia.com
                        </a>{" "}
                        or book a free strategy call — we&apos;ll address any
                        concerns before we start working together.
                      </p>
                      <a
                        href="#/contact"
                        className="mt-4 inline-flex items-center gap-2 rounded-full bg-lime px-5 py-2.5 text-sm font-bold text-ink hover:-translate-y-0.5 transition-transform"
                      >
                        <FileText className="h-4 w-4" />
                        Contact WellScale
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
