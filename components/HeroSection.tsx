"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, TrendingUp, Users } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

const stats = [
  { icon: Clock, label: "Response Time", value: "< 30s", desc: "Instant AI reply" },
  { icon: TrendingUp, label: "Lead Recovery", value: "87%", desc: "Previously lost leads" },
  { icon: Users, label: "Conversion Lift", value: "3.4×", desc: "Vs manual follow-up" },
];

export function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 px-6">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 radial-glow pointer-events-none" />

      <div className="mx-auto max-w-6xl relative">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex justify-center mb-8"
        >
          <Badge variant="accent" className="gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
            Instant Lead Response · Powered by AI
            <ArrowRight className="h-3 w-3" />
          </Badge>
        </motion.div>

        {/* Headline */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.06]">
            <span className="text-[var(--foreground)]">Find Your Next</span>
            <br />
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: "linear-gradient(135deg, #f0f4f8 0%, var(--accent) 100%)",
              }}
            >
              Property Faster
            </span>
          </h1>
        </motion.div>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-center text-lg text-[var(--muted)] max-w-2xl mx-auto mb-16 leading-relaxed"
        >
          Submit your property inquiry and receive an AI-personalized response within seconds.
          Our automation handles scoring, outreach, and follow-up — so no lead is ever lost.
        </motion.p>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 card-glow transition-all duration-300"
            >
              <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-[var(--accent-dim)] border border-[var(--accent)]/20">
                <stat.icon className="h-5 w-5 text-[var(--accent)]" strokeWidth={1.5} />
              </div>
              <div>
                <div className="text-xl font-bold text-[var(--foreground)] leading-tight">{stat.value}</div>
                <div className="text-xs text-[var(--muted)]">{stat.desc}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
