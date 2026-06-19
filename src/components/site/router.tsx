"use client";

import { useEffect, useState, useCallback } from "react";

/**
 * Lightweight hash-based router for the single / route.
 *
 * Why hash routing?
 *   The Next.js scaffold only exposes `/` to the user. Hash routing lets us
 *   simulate multi-page navigation (`/#/about`, `/#/team`, etc.) entirely on
 *   the client, while still giving the user:
 *     - shareable URLs (`https://site/#/about`)
 *     - working back/forward browser buttons
 *     - per-page scroll restoration to top
 *
 * Supported routes:
 *   #/                  -> home
 *   #/about             -> about us
 *   #/team              -> team
 *   #/contact           -> contact us
 *   #/privacy           -> privacy policy
 *   #/terms             -> terms & conditions
 *
 * Section anchors on the home page still work via `/#offerings` etc.
 * (any hash that doesn't start with `/` is treated as a home-page anchor).
 */

export type Route =
  | "home"
  | "about"
  | "team"
  | "contact"
  | "privacy"
  | "terms";

const ROUTE_MAP: Record<string, Route> = {
  "": "home",
  "/": "home",
  "/about": "about",
  "/team": "team",
  "/contact": "contact",
  "/privacy": "privacy",
  "/terms": "terms",
};

function parseHash(): Route {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace(/^#/, "");
  // Section anchors like #offerings, #challenge, #contact, #metrics
  // are home-page sections — only treat as a separate route if it starts with "/"
  if (!raw.startsWith("/")) return "home";
  return ROUTE_MAP[raw] ?? "home";
}

export function useRouter() {
  // Lazy initialiser avoids calling setState inside useEffect —
  // SSR-safe because parseHash() returns "home" when window is undefined.
  const [route, setRoute] = useState<Route>(() => parseHash());

  useEffect(() => {
    const onHashChange = () => {
      const next = parseHash();
      setRoute(next);
      // Scroll to top on route change — section anchors handle their own scroll
      if (window.location.hash.startsWith("#/")) {
        window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
      }
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const navigate = useCallback((to: Route) => {
    const hash = to === "home" ? "#/" : `#/${to}`;
    if (window.location.hash === hash) {
      // Already on the route — just scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    window.location.hash = hash;
  }, []);

  return { route, navigate };
}

/**
 * Navigate to a home-page section anchor (#offerings, #challenge, etc.)
 * If we're not on the home route, first switch to home, then jump to the anchor.
 */
export function useSectionNav() {
  const go = useCallback((sectionId: string) => {
    const isHome =
      window.location.hash === "" ||
      window.location.hash === "#/" ||
      !window.location.hash.startsWith("#/");

    if (isHome) {
      // We're on home — just scroll
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Switch to home first, then scroll after a tick
      window.location.hash = "#/";
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 80);
    }
  }, []);

  return go;
}

/**
 * Open the contact form section.
 *
 * Behavior:
 *   - If on home page: smooth-scroll to the #contact section (homepage form).
 *   - If on any other page: navigate to the /#/contact page (which has its own form).
 *
 * This is the single helper all "Book a Free Call" / "Book Free Strategy Call"
 * buttons should use so they consistently land the user on a form.
 */
export function useContactForm() {
  const open = useCallback(() => {
    const isHome =
      window.location.hash === "" ||
      window.location.hash === "#/" ||
      !window.location.hash.startsWith("#/");

    if (isHome) {
      // On home — scroll to the homepage contact section
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // On sub-page — navigate to the dedicated contact page
      window.location.hash = "#/contact";
    }
  }, []);

  return open;
}
