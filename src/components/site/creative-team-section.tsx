"use client";

import { motion } from "framer-motion";
import { Linkedin, Sparkles, ArrowUpRight } from "lucide-react";
import { AnimatedNumber } from "@/components/animated-number";

type CreativeMember = {
  name: string;
  role: string;
  initials: string;
  bio: string;
  gradient: string; // tailwind gradient for avatar fallback
};

// 3 featured team members for the creative staggered layout
const FEATURED_TEAM: CreativeMember[] = [
  {
    name: "Aarav Mehta",
    role: "Founder & Head of Growth",
    initials: "AM",
    bio: "Architect of the 3X-in-30-days system. 7+ years scaling aesthetic clinics across India.",
    gradient: "from-lime to-[oklch(0.70_0.18_124)]",
  },
  {
    name: "Dr. Kavya Rao",
    role: "Clinic Growth Advisor",
    initials: "KR",
    bio: "Former medical director at a 3-location aesthetic chain. The practitioner's voice on our team.",
    gradient: "from-white to-[oklch(0.70_0.02_240)]",
  },
  {
    name: "Rohan Desai",
    role: "Head of Performance Ads",
    initials: "RD",
    bio: "Manages ₹20L+ in monthly ad spend. Obsessed with lead quality over lead volume.",
    gradient: "from-[oklch(0.70_0.18_124)] to-lime",
  },
];

export function CreativeTeamSection() {
  return (
    <section className="relative py-20 lg:py-32 bg-ink overflow-hidden">
      {/* Background: lime grid + orbs */}
      <div className="absolute inset-0 team-grid-bg pointer-events-none" />
      <div className="team-orb top-10 -left-20 h-80 w-80 bg-lime/10" />
      <div className="team-orb bottom-10 -right-20 h-96 w-96 bg-lime/8" />
      <div className="team-orb top-1/2 left-1/3 h-64 w-64 bg-lime/5" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* LEFT: heading + intro */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 lg:sticky lg:top-28"
          >
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-lime/30 bg-lime/5 px-3.5 py-1.5 text-xs font-semibold text-lime uppercase tracking-wider">
              <Sparkles className="h-3.5 w-3.5" />
              Our Team
            </div>

            {/* Heading with lime highlight */}
            <h2 className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.05]">
              Meet the People
              <br />
              Powering{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-lime">Innovation</span>
                <span className="absolute -bottom-1 left-0 h-3 w-full bg-lime/20 -z-0 rounded-sm" />
              </span>
            </h2>

            {/* Lime accent line */}
            <div className="team-accent-line mt-6" />

            {/* Subheading */}
            <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed max-w-md">
              Our talented team of engineers, automation specialists, designers,
              and strategists work together to build intelligent digital
              solutions that drive business growth.
            </p>

            {/* Mini stats */}
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              <div className="inline-flex items-center gap-2">
                <span className="text-2xl font-extrabold text-lime tabular-nums">
                  <AnimatedNumber value={14} />
                </span>
                <span className="text-white/60">specialists</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="inline-flex items-center gap-2">
                <span className="text-2xl font-extrabold text-lime tabular-nums">
                  <AnimatedNumber value={40} suffix="+" />
                </span>
                <span className="text-white/60">clinics partnered</span>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div className="inline-flex items-center gap-2">
                <span className="text-2xl font-extrabold text-lime tabular-nums">
                  <AnimatedNumber value={8} suffix="X" />
                </span>
                <span className="text-white/60">max revenue scaled</span>
              </div>
            </div>

            {/* CTA */}
            <a
              href="#/contact"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-lime px-6 py-3 text-sm font-bold text-ink shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.5),0_0_24px_-2px_oklch(0.88_0.21_124_/_0.6)] hover:shadow-[0_0_0_1px_oklch(0.88_0.21_124_/_0.9),0_0_36px_0_oklch(0.88_0.21_124_/_0.8)] hover:-translate-y-0.5 transition-all"
            >
              Join the team
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.div>

          {/* RIGHT: staggered team cards */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {/* Card 1 — top-left, slight upward stagger */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="team-glow team-glass team-float rounded-3xl p-5 sm:p-6 sm:mt-0"
              >
                <TeamCardInner member={FEATURED_TEAM[0]} />
              </motion.div>

              {/* Card 2 — center, featured (larger, highlighted) */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="team-glow team-glass team-featured team-float-slow rounded-3xl p-5 sm:p-6 sm:-mt-6 lg:-mt-8 z-10"
              >
                <TeamCardInner member={FEATURED_TEAM[1]} featured />
              </motion.div>

              {/* Card 3 — bottom-right, slight downward stagger */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="team-glow team-glass team-float-delayed rounded-3xl p-5 sm:p-6 sm:mt-0"
              >
                <TeamCardInner member={FEATURED_TEAM[2]} />
              </motion.div>
            </div>

            {/* Decorative footer line */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 flex items-center gap-3 text-xs text-white/40"
            >
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
              <span className="uppercase tracking-[0.2em]">+ 11 more specialists</span>
              <span className="h-px flex-1 bg-gradient-to-r from-transparent via-lime/30 to-transparent" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TeamCardInner({
  member,
  featured = false,
}: {
  member: CreativeMember;
  featured?: boolean;
}) {
  return (
    <div className="relative z-10 flex flex-col items-center text-center">
      {/* Avatar with lime gradient ring */}
      <div className="team-avatar-ring mb-5">
        <div
          className={`h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center text-2xl sm:text-3xl font-extrabold text-ink shadow-inner`}
        >
          {member.initials}
        </div>
        {/* Featured badge */}
        {featured && (
          <span className="absolute -top-1 -right-1 inline-flex h-6 w-6 items-center justify-center rounded-full bg-lime text-ink ring-2 ring-ink">
            <Sparkles className="h-3 w-3" strokeWidth={2.5} />
          </span>
        )}
      </div>

      {/* Name */}
      <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
        {member.name}
      </h3>

      {/* Role */}
      <p className="mt-1 text-sm font-semibold text-lime">
        {member.role}
      </p>

      {/* Bio */}
      <p className="mt-3 text-xs sm:text-sm text-white/55 leading-relaxed">
        {member.bio}
      </p>

      {/* Social icons */}
      <div className="mt-5 flex items-center gap-2">
        <a
          href="#/team"
          onClick={(e) => e.preventDefault()}
          aria-label={`${member.name} on LinkedIn`}
          className="team-social inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70"
        >
          <Linkedin className="h-4 w-4" />
        </a>
        <a
          href="#/team"
          onClick={(e) => e.preventDefault()}
          aria-label={`${member.name} profile`}
          className="team-social inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/15 bg-white/5 text-white/70"
        >
          <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
