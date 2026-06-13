"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User, Mail, MapPin, Home, DollarSign, MessageSquare,
  ArrowRight, Loader2, CheckCircle, Sparkles
} from "lucide-react";
import { SuccessState } from "@/components/SuccessState";

interface FormData {
  fullName: string;
  email: string;
  location: string;
  propertyType: string;
  budget: string;
  message: string;
}

const propertyTypes = [
  "Apartment", "House", "Villa", "Townhouse", "Condo", "Commercial", "Land"
];

const budgetRanges = [
  "Under $200K", "$200K – $500K", "$500K – $1M", "$1M – $2M", "$2M – $5M", "$5M+"
];

const inputBase =
  "w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted)] outline-none transition-all duration-200 focus:border-[var(--accent)]/50 focus:ring-2 focus:ring-[var(--accent)]/10 hover:border-[var(--border-hover)]";

export function LeadForm() {
  const [form, setForm] = useState<FormData>({
    fullName: "", email: "", location: "",
    propertyType: "", budget: "", message: "",
  });
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const validate = (): boolean => {
    const errs: Partial<FormData> = {};
    if (!form.fullName.trim()) errs.fullName = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email";
    if (!form.location.trim()) errs.location = "Location is required";
    if (!form.propertyType) errs.propertyType = "Select a property type";
    if (!form.budget) errs.budget = "Select a budget range";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setSubmitError("");

    try {
      const res = await fetch("/api/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error || "Something went wrong. Please try again.");
        return;
      }

      setSubmitted(true);
    } catch {
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: undefined }));
  };

  if (submitted) {
    return <SuccessState name={form.fullName} email={form.email} onReset={() => setSubmitted(false)} />;
  }

  return (
    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">

          {/* Left: Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8">
              <div className="mb-8">
                <h2 className="text-2xl font-bold tracking-tight text-[var(--foreground)] mb-2">
                  Submit Your Inquiry
                </h2>
                <p className="text-sm text-[var(--muted)]">
                  Tell us what you&apos;re looking for — our AI responds instantly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                      <User className="h-3 w-3" /> Full Name
                    </label>
                    <input
                      type="text"
                      placeholder="Alex Johnson"
                      value={form.fullName}
                      onChange={set("fullName")}
                      className={inputBase}
                    />
                    {errors.fullName && <p className="text-xs text-red-400">{errors.fullName}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                      <Mail className="h-3 w-3" /> Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="alex@example.com"
                      value={form.email}
                      onChange={set("email")}
                      className={inputBase}
                    />
                    {errors.email && <p className="text-xs text-red-400">{errors.email}</p>}
                  </div>
                </div>

                {/* Location */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                    <MapPin className="h-3 w-3" /> Preferred Location
                  </label>
                  <input
                    type="text"
                    placeholder="Miami, FL — or specify a neighborhood"
                    value={form.location}
                    onChange={set("location")}
                    className={inputBase}
                  />
                  {errors.location && <p className="text-xs text-red-400">{errors.location}</p>}
                </div>

                {/* Property Type + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                      <Home className="h-3 w-3" /> Property Type
                    </label>
                    <select
                      value={form.propertyType}
                      onChange={set("propertyType")}
                      className={inputBase + " appearance-none cursor-pointer"}
                    >
                      <option value="" disabled>Select type</option>
                      {propertyTypes.map(t => (
                        <option key={t} value={t} className="bg-[#111827]">{t}</option>
                      ))}
                    </select>
                    {errors.propertyType && <p className="text-xs text-red-400">{errors.propertyType}</p>}
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                      <DollarSign className="h-3 w-3" /> Budget Range
                    </label>
                    <select
                      value={form.budget}
                      onChange={set("budget")}
                      className={inputBase + " appearance-none cursor-pointer"}
                    >
                      <option value="" disabled>Select budget</option>
                      {budgetRanges.map(b => (
                        <option key={b} value={b} className="bg-[#111827]">{b}</option>
                      ))}
                    </select>
                    {errors.budget && <p className="text-xs text-red-400">{errors.budget}</p>}
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-[var(--muted)] flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3" /> Additional Details <span className="text-[var(--muted)]/50">(optional)</span>
                  </label>
                  <textarea
                    placeholder="3 bedrooms, home office, near good schools, parking for 2..."
                    value={form.message}
                    onChange={set("message")}
                    rows={3}
                    className={inputBase + " resize-none"}
                  />
                </div>

                {/* Error */}
                <AnimatePresence>
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                    >
                      {submitError}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.01 }}
                  whileTap={{ scale: loading ? 1 : 0.99 }}
                  className="w-full flex items-center justify-center gap-2.5 rounded-2xl py-4 text-sm font-semibold tracking-wide text-[#080a0f] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{
                    background: loading
                      ? "rgba(0, 229, 255, 0.6)"
                      : "var(--accent)",
                    boxShadow: loading ? "none" : "0 0 20px rgba(0, 229, 255, 0.2)",
                  }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Processing your inquiry…
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Get Property Options
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </motion.button>

                <p className="text-center text-xs text-[var(--muted)]/60">
                  Your data is encrypted and never shared. Unsubscribe anytime.
                </p>
              </form>
            </div>
          </motion.div>

          {/* Right: Info panels */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-2 space-y-4"
          >
            <HowItWorksPanel />
            <AutomationFlowPanel />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksPanel() {
  const steps = [
    { num: "01", title: "Submit Inquiry", desc: "Fill out your property requirements" },
    { num: "02", title: "AI Analysis", desc: "Lead scored and intent classified" },
    { num: "03", title: "Instant Email", desc: "Personalized response sent immediately" },
    { num: "04", title: "Auto Follow-Up", desc: "3-touch sequence over 7 days" },
  ];

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="text-sm font-semibold text-[var(--foreground)] mb-5 tracking-tight">
        How It Works
      </h3>
      <div className="space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.6 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-start gap-3"
          >
            <span className="flex-shrink-0 text-xs font-mono font-bold text-[var(--accent)] bg-[var(--accent-dim)] rounded-lg w-8 h-8 flex items-center justify-center border border-[var(--accent)]/20">
              {step.num}
            </span>
            <div>
              <div className="text-sm font-medium text-[var(--foreground)] leading-tight">{step.title}</div>
              <div className="text-xs text-[var(--muted)] mt-0.5">{step.desc}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function AutomationFlowPanel() {
  const nodes = [
    { icon: "⚡", label: "Webhook", color: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" },
    { icon: "📊", label: "Google Sheets", color: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" },
    { icon: "⚡", label: "Groq LLaMA 3.3", color: "text-[var(--accent)] bg-[var(--accent-dim)] border-[var(--accent)]/20" },
    { icon: "📧", label: "Gmail Send", color: "text-red-400 bg-red-400/10 border-red-400/20" },
  ];

  return (
    <div className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-[var(--foreground)] tracking-tight">
          Response Pipeline
        </h3>
        <span className="text-xs text-emerald-400 font-mono flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />Live</span>
      </div>
      <div className="space-y-2">
        {nodes.map((node, i) => (
          <motion.div
            key={node.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.7 + i * 0.07 }}
            className="flex items-center gap-3"
          >
            {i > 0 && (
              <div className="absolute left-[31px] h-2 w-px bg-[var(--border)]" style={{ marginTop: "-10px" }} />
            )}
            <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-xl border text-sm ${node.color}`}>
              {node.icon}
            </div>
            <span className="text-sm text-[var(--foreground)]">{node.label}</span>
            {i < nodes.length - 1 && (
              <div className="ml-auto">
                <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="mt-5 rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)] px-4 py-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-[var(--muted)]">Avg. response time</span>
          <span className="font-mono font-bold text-[var(--accent)]">~28s</span>
        </div>
      </div>
    </div>
  );
}
