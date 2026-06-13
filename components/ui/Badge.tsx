"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "accent" | "success" | "muted";
  className?: string;
  animate?: boolean;
}

export function Badge({ children, variant = "default", className, animate = false }: BadgeProps) {
  const variants = {
    default: "border-[var(--border)] bg-white/[0.04] text-[var(--muted)]",
    accent: "border-[var(--accent)]/20 bg-[var(--accent-dim)] text-[var(--accent)]",
    success: "border-emerald-500/20 bg-emerald-500/10 text-emerald-400",
    muted: "border-[var(--border)] bg-transparent text-[var(--muted)]",
  };

  const Comp = animate ? motion.span : "span";
  const animProps = animate ? {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.3 },
  } : {};

  return (
    <Comp
      {...animProps}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium tracking-wide",
        variants[variant],
        className
      )}
    >
      {children}
    </Comp>
  );
}
