"use client";

import { motion } from "framer-motion";
import { CheckCircle, Calendar, Mail, BarChart3, ArrowRight, RotateCcw } from "lucide-react";

interface SuccessStateProps {
  name: string;
  email: string;
  onReset: () => void;
}

const successSteps = [
  {
    icon: CheckCircle,
    label: "Request received",
    desc: "Your inquiry is logged and scored",
    color: "text-emerald-400",
    bg: "bg-emerald-400/10 border-emerald-400/20",
  },
  {
    icon: Mail,
    label: "Response sent to your email",
    desc: "Personalized property options delivered",
    color: "text-[var(--accent)]",
    bg: "bg-[var(--accent-dim)] border-[var(--accent)]/20",
  },
  {
    icon: Calendar,
    label: "Follow-up sequence scheduled",
    desc: "Day 2 · Day 5 · Day 7 touchpoints set",
    color: "text-violet-400",
    bg: "bg-violet-400/10 border-violet-400/20",
  },
];

const followUpTimeline = [
  { day: "Day 2", label: "Checking your interest", status: "Scheduled" },
  { day: "Day 5", label: "Additional property options", status: "Scheduled" },
  { day: "Day 7", label: "Final follow-up", status: "Scheduled" },
];

export function SuccessState({ name, email, onReset }: SuccessStateProps) {
  const firstName = name.split(" ")[0];

  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Main success card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8"
          >
            {/* Header */}
            <div className="text-center mb-10">
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-400/10 border border-emerald-400/20"
              >
                <CheckCircle className="h-8 w-8 text-emerald-400" strokeWidth={1.5} />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2"
              >
                You&apos;re all set, {firstName}!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="text-sm text-[var(--muted)]"
              >
                Check <span className="text-[var(--foreground)] font-medium">{email}</span> — your personalized response is on its way.
              </motion.p>
            </div>

            {/* Steps */}
            <div className="space-y-3 mb-8">
              {successSteps.map((step, i) => (
                <motion.div
                  key={step.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] p-4"
                >
                  <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border ${step.bg}`}>
                    <step.icon className={`h-4.5 w-4.5 ${step.color}`} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[var(--foreground)]">{step.label}</span>
                      <span className="text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full px-2 py-0.5 font-medium">Done</span>
                    </div>
                    <p className="text-xs text-[var(--muted)] mt-0.5">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* AI Score preview */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="rounded-2xl border border-[var(--accent)]/20 bg-[var(--accent-dim)] p-5 mb-6"
            >
              <div className="flex items-center gap-2 mb-3">
                <BarChart3 className="h-4 w-4 text-[var(--accent)]" />
                <span className="text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">AI Lead Analysis</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-lg font-bold text-[var(--foreground)]">8<span className="text-sm text-[var(--muted)]">/10</span></div>
                  <div className="text-xs text-[var(--muted)]">Lead Score</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-emerald-400">High</div>
                  <div className="text-xs text-[var(--muted)]">Buyer Intent</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[var(--foreground)]">Active</div>
                  <div className="text-xs text-[var(--muted)]">Status</div>
                </div>
              </div>
            </motion.div>

            {/* Reset */}
            <motion.button
              onClick={onReset}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full flex items-center justify-center gap-2 rounded-2xl border border-[var(--border)] bg-[var(--surface-elevated)] py-3 text-sm text-[var(--muted)] hover:text-[var(--foreground)] hover:border-[var(--border-hover)] transition-all duration-200"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              Submit another inquiry
            </motion.button>
          </motion.div>

          {/* Right: follow-up timeline */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="h-4 w-4 text-violet-400" />
                <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
                  Follow-Up Schedule
                </h3>
              </div>

              <div className="space-y-1">
                {followUpTimeline.map((item, i) => (
                  <motion.div
                    key={item.day}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                    className="relative flex items-start gap-4 pb-5"
                  >
                    {i < followUpTimeline.length - 1 && (
                      <div className="absolute left-3.5 top-8 bottom-0 w-px bg-[var(--border)]" />
                    )}
                    <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-violet-400/30 bg-violet-400/10 text-xs font-bold text-violet-400 font-mono">
                      {i + 1}
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-medium text-[var(--foreground)]">{item.label}</span>
                        <span className="text-xs text-violet-400 bg-violet-400/10 border border-violet-400/20 rounded-full px-2 py-0.5 flex-shrink-0">
                          {item.status}
                        </span>
                      </div>
                      <span className="text-xs text-[var(--muted)] font-mono">{item.day}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* What happens next */}
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
              <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight mb-4">
                What Happens Now
              </h3>
              <div className="space-y-3">
                {[
                  "Your agent reviews AI-scored inquiry",
                  "Curated property list prepared for you",
                  "Direct line opened with your agent",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <ArrowRight className="h-3.5 w-3.5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-[var(--muted)] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
