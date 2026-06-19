"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarCheck, ArrowRight } from "lucide-react";
import { useContactForm } from "./router";

/**
 * Sticky mobile-only CTA bar that appears after the user scrolls past the hero.
 */
export function MobileCta() {
  const [show, setShow] = useState(false);
  const openContactForm = useContactForm();

  useEffect(() => {
    const onScroll = () => {
      // Show after ~700px (past hero on most phones)
      setShow(window.scrollY > 700);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="md:hidden fixed inset-x-0 bottom-0 z-40 pb-[env(safe-area-inset-bottom)]"
        >
          <div className="mx-3 mb-3 rounded-2xl border border-white/10 bg-ink/95 backdrop-blur-xl shadow-[0_-10px_30px_-12px_oklch(0_0_0_/_0.5)] p-2.5">
            <div className="flex items-center gap-3">
              <div className="hidden min-[380px]:flex shrink-0 items-center gap-2 pl-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
                </span>
                <div className="leading-none">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-white">
                    Free Strategy Call
                  </p>
                  <p className="text-[10px] text-white/60">15 min · no commitment</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => openContactForm()}
                className="group flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-ink px-5 py-3.5 text-sm font-bold text-lime shadow-lg active:scale-[0.98] transition-transform"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Free Call
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
