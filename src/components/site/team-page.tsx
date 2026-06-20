"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Linkedin,
  Twitter,
  Sparkles,
  TrendingUp,
  Target,
  Users,
  ArrowUpRight,
} from "lucide-react";
import { PageHero } from "./page-hero";
import { useContactForm, type Route } from "./router";
import { AnimatedNumber, parseStatString } from "@/components/animated-number";

type Member = {
  name: string;
  role: string;
  bio: string;
  photo: string;
  focus: string[];
};

const TEAM: Member[] = [
  {
    name: "Nitish Singh",
    role: "Founder & Lead Automation",
    bio: "Started WellScale in 2021 after 7 years in performance marketing. Built the original 3X-in-30-days system. Still leads strategy for every new clinic we onboard.",
    photo: "/team/custom-1.jpeg",
    focus: ["Strategy", "Meta Ads", "Clinic Onboarding"],
  },
  {
    name: "Vishal Rajput",
    role: "CEO & Strategy Manager",
    bio: "Former medical director at a 3-location aesthetic chain. Vetoes any campaign that wouldn't convert in a real clinic. The voice of the practitioner on our team.",
    photo: "/team/custom-5.png",
    focus: ["Clinical Ops", "Patient Funnel", "Sales Training"],
  },
  {
    name: "Jatin Shakrawar",
    role: "Head of Performance Ads & CTO",
    bio: "Manages ₹20L+ in monthly ad spend across 20+ clinic accounts. Obsessed with lead quality over lead volume. Will pause a winning campaign if the consultation rate dips.",
    photo: "/team/custom-2.png",
    focus: ["Meta Ads", "Lead Quality", "ROAS"],
  },
  {
    name: "Tushar Sahu",
    role: "Clinic Growth Advisor",
    bio: "Scripts the conversation trees that turn cold leads into walk-ins. Has built nurture sequences in 4 languages. Her reactivation flows revive 8-14% of dead leads on average.",
    photo: "/team/custom-3.png",
    focus: ["WhatsApp", "Lead Reactivation", "Copywriting"],
  },
  {
    name: "Samarth Pane",
    role: "Content & Brand Strategist",
    bio: "Gets your clinic into the top 3 of the Google local pack for every treatment you offer. Reviews, posts, photos, schema — he tunes every signal Google watches.",
    photo: "/team/custom-4.png",
    focus: ["GMB", "Local SEO", "Reviews"],
  },
  {
    name: "Priya Sharma",
    role: "Lead — WhatsApp & Nurturing",
    bio: "Architects the content calendars that make your feed sell your expertise while you sleep. Before/afters, doctor credibility, patient stories — all under her direction.",
    photo: "/team/member-6.jpg",
    focus: ["Content", "Social Media", "Brand Building"],
  },
];

const STATS = [
  { icon: Users, value: "6", label: "Core team members" },
  { icon: Target, value: "1", label: "Vertical — aesthetic clinics only" },
  { icon: TrendingUp, value: "20+", label: "Clinics partnered" },
  { icon: TrendingUp, value: "8X", label: "Max revenue scaled" },
];

function MemberCard({ member, index }: { member: Member; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="team-photo-card aspect-[3/4]"
    >
      {/* Top hover accent line */}
      <span className="team-top-line" />

      {/* Live status dot */}
      <div className="team-live-dot">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-lime" />
        </span>
        Active
      </div>

      {/* Social icons — appear on hover */}
      <div className="team-socials">
        <a
          href="#/team"
          onClick={(e) => e.preventDefault()}
          aria-label={`${member.name} on LinkedIn`}
          className="team-social-btn"
        >
          <Linkedin className="h-3 w-3 sm:h-4 sm:w-4" />
        </a>
        <a
          href="#/team"
          onClick={(e) => e.preventDefault()}
          aria-label={`${member.name} on Twitter`}
          className="team-social-btn"
        >
          <Twitter className="h-3 w-3 sm:h-4 sm:w-4" />
        </a>
      </div>

      {/* Photo */}
      <img
        src={member.photo}
        alt={member.name}
        className="team-photo absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />

      {/* Info overlay — name + role always, bio + tags on hover (desktop only) */}
      <div className="team-info">
        <h3 className="text-sm sm:text-xl font-bold text-white tracking-tight leading-tight">
          {member.name}
        </h3>
        <p className="text-[11px] sm:text-sm font-semibold text-lime mt-0.5 leading-tight">
          {member.role}
        </p>

        {/* Bio — reveals on hover (desktop only, hidden on mobile) */}
        <div className="team-bio">
          <p className="text-[10px] sm:text-xs text-white/70 leading-relaxed">
            {member.bio}
          </p>
        </div>

        {/* Focus tags — reveal on hover (desktop only, hidden on mobile) */}
        <div className="team-tags">
          {member.focus.map((f) => (
            <span key={f} className="team-tag text-[9px] sm:text-[11px]">
              {f}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function TeamPage({ currentRoute }: { currentRoute: Route }) {
  const openContactForm = useContactForm();
  return (
    <>
      <PageHero
        currentRoute={currentRoute}
        breadcrumbLabel="Our Team"
        eyebrow="The WellScale Team"
        title={
          <>
            6 specialists.
            <br />
            <span className="text-lime">One clinic vertical.</span>
          </>
        }
        subtitle="Every person on this team works exclusively with aesthetic clinics. No generalists, no moonlighting — just deep specialists who already know your patient funnel before we start."
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

      {/* Team grid with photos */}
      <section className="py-16 lg:py-24 bg-ink relative overflow-hidden">
        {/* Background grid + orbs */}
        <div className="absolute inset-0 team-grid-bg pointer-events-none" />
        <div className="team-orb top-10 -left-20 h-80 w-80 bg-lime/10" />
        <div className="team-orb bottom-10 -right-20 h-96 w-96 bg-lime/8" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
              <Megaphone className="h-3 w-3" />
              Meet the Team
            </span>
            <h2 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
              People who carry the{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-lime">3X promise.</span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-lime/20 -z-0 rounded-sm" />
              </span>
            </h2>
            <p className="mt-3 text-base text-white/60">
              The team that designs, runs, and optimises every clinic partnership.
              Hover over each card to see their story.
            </p>
          </motion.div>

          {/* Team grid — 3 columns on desktop, 2 on tablet, 1 on mobile */}
          <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-5 lg:gap-6">
            {TEAM.map((m, i) => (
              <MemberCard key={m.name} member={m} index={i} />
            ))}
          </div>

          {/* How you'll work with us */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-16 max-w-5xl mx-auto"
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-ink px-3.5 py-1 text-xs font-semibold text-lime uppercase tracking-wider">
                <Sparkles className="h-3 w-3" />
                How You&apos;ll Work With Us
              </span>
              <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-white">
                A small, named team. Not a rotating account pool.
              </h3>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: "01",
                  title: "Nitish runs your strategy call",
                  body: "Your 15-minute free call goes to the founder, not a junior AE. He'll tell you whether we can 3X your clinic — and if not, why.",
                },
                {
                  step: "02",
                  title: "Vishal audits your patient funnel",
                  body: "A clinic-side practitioner reviews your consultation recordings, front-desk scripts, and lead sources before we propose anything.",
                },
                {
                  step: "03",
                  title: "Jatin + Tushar build your growth system",
                  body: "Ads + WhatsApp nurturing go live in week 1. Samarth handles your GMB. Priya ships your content calendar.",
                },
              ].map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.06 }}
                  className="agency-card rounded-2xl p-5 sm:p-6 flex items-start gap-4 sm:gap-6"
                >
                  <span className="shrink-0 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-lime text-ink font-bold text-base">
                    {s.step}
                  </span>
                  <div>
                    <h4 className="text-base sm:text-lg font-bold text-white">
                      {s.title}
                    </h4>
                    <p className="mt-1 text-sm text-white/60 leading-relaxed">
                      {s.body}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-12 rounded-3xl bg-ink text-white p-8 lg:p-12 relative overflow-hidden border border-lime/20"
          >
            <div className="absolute -top-12 -right-12 h-48 w-48 rounded-full bg-lime/15 blur-3xl pointer-events-none" />
            <div className="relative grid lg:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold">
                  Want this team working on your clinic?
                </h3>
                <p className="mt-2 text-white/60">
                  Book a free 15-minute strategy call with Nitish. He&apos;ll tell
                  you straight whether we can 3X your revenue in 30 days.
                </p>
              </div>
              <div className="lg:text-right">
                <button
                  type="button"
                  onClick={() => openContactForm()}
                  className="group inline-flex items-center gap-2 rounded-full bg-lime px-7 py-4 text-base font-bold text-ink shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_24px_-2px_oklch(0.88_0.21_124_/_0.6)] hover:shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.9),0_0_36px_0_oklch(0.88_0.21_124_/_0.8)] hover:-translate-y-0.5 transition-all"
                >
                  Book Your Free Call
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
