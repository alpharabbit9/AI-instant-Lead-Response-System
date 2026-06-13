"use client";

import { motion } from "framer-motion";
import { Brain, Clock, Shield, BarChart3, Mail, Database } from "lucide-react";

const bentoItems = [
  {
    icon: Brain,
    title: "AI-Powered Scoring",
    desc: "Every lead is scored 1–10 and classified by buyer intent using GPT-4. High-intent leads get priority routing.",
    span: "col-span-1 md:col-span-2",
    accent: true,
  },
  {
    icon: Clock,
    title: "< 30s Response",
    desc: "From form submission to inbox. Faster than any human team.",
    span: "col-span-1",
    accent: false,
  },
  {
    icon: Database,
    title: "CRM-Ready Data",
    desc: "Every inquiry lands in Google Sheets with timestamp, score, and follow-up status — ready for your CRM.",
    span: "col-span-1",
    accent: false,
  },
  {
    icon: Mail,
    title: "Personalized Emails",
    desc: "Each email references the buyer's exact location, property type, and budget. No generic templates.",
    span: "col-span-1",
    accent: false,
  },
  {
    icon: BarChart3,
    title: "3-Touch Follow-Up",
    desc: "Automated Day 2 · Day 5 · Day 7 sequences keep leads warm without manual effort.",
    span: "col-span-1 md:col-span-2",
    accent: false,
  },
  {
    icon: Shield,
    title: "Zero Leads Lost",
    desc: "Every inquiry — even at 2am — receives an instant professional response.",
    span: "col-span-1",
    accent: false,
  },
];

export function BentoSection() {
  return (
    <section className="px-6 pb-20">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--foreground)] mb-3">
            Everything your team needs
          </h2>
          <p className="text-[var(--muted)] text-base max-w-xl mx-auto">
            One automation stack that handles the entire buyer journey — from first inquiry to closed deal.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {bentoItems.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`${item.span} rounded-3xl border p-6 transition-all duration-300 card-glow ${
                item.accent
                  ? "border-[var(--accent)]/20 bg-[var(--accent-glow)]"
                  : "border-[var(--border)] bg-[var(--surface)]"
              }`}
            >
              <div className={`mb-4 flex h-10 w-10 items-center justify-center rounded-xl border ${
                item.accent
                  ? "bg-[var(--accent-dim)] border-[var(--accent)]/30"
                  : "bg-white/[0.04] border-[var(--border)]"
              }`}>
                <item.icon
                  className={`h-5 w-5 ${item.accent ? "text-[var(--accent)]" : "text-[var(--muted)]"}`}
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-base font-semibold text-[var(--foreground)] mb-2 tracking-tight">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--muted)] leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
