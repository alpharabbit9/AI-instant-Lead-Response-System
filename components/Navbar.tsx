"use client";

import { motion } from "framer-motion";
import { Zap } from "lucide-react";

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mx-auto max-w-6xl px-6 py-4">
        <div
          className="flex items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)]/80 px-5 py-3"
          style={{ backdropFilter: "blur(20px)" }}
        >
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[var(--accent-dim)] border border-[var(--accent)]/20">
              <Zap className="h-4 w-4 text-[var(--accent)]" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold tracking-tight text-[var(--foreground)]">
              LeadFlow<span className="text-[var(--accent)]">AI</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <span className="text-xs text-[var(--muted)] font-medium">Real Estate Automation</span>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-emerald-400 font-medium">System Active</span>
            </div>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
