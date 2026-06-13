"use client";

import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface)] mt-auto">
      <div className="mx-auto max-w-6xl px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent-dim)] border border-[var(--accent)]/20">
              <Zap className="h-3.5 w-3.5 text-[var(--accent)]" strokeWidth={2} />
            </div>
            <span className="text-sm font-semibold text-[var(--foreground)]">
              LeadFlow<span className="text-[var(--accent)]">AI</span>
            </span>
          </div>
          <div className="flex items-center gap-6 text-xs text-[var(--muted)]">
            <span>AI-Powered · Automated Outreach · Smart Lead Capture</span>
          </div>
          <div className="text-xs text-[var(--muted)]/50">
            © 2026 LeadFlowAI. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
