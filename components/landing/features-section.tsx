import { Smartphone, Eye, Sparkles, Shield, Heart, Check, Lock, ShieldOff } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "Zero friction for patients",
    description: "They use WhatsApp — the app already on their phone. No downloads, no passwords, no onboarding. They just reply to a message.",
  },
  {
    icon: Eye,
    title: "Full picture between sessions",
    description: "Progress, adherence, pain signals, barriers — all captured automatically through natural conversation. No manual data entry.",
  },
  {
    icon: Sparkles,
    title: "AI-powered triage, not guesswork",
    description: "Our AI reads every message, understands the clinical context, and surfaces the right patients at the right time. You get actionable insights.",
  },
  {
    icon: Check,
    title: "Your queue is empty most days",
    description: "You only see patients who need action. No noise, no unnecessary alerts. When it's clear, it tells you — and you move on.",
  },
  {
    icon: Shield,
    title: "Safety guardrails built-in",
    description: "Red flag symptoms trigger immediate escalation. Deterministic safety gates ensure critical issues never get missed by AI.",
  },
  {
    icon: Heart,
    title: "Patients who feel supported come back",
    description: "Consistent check-ins between sessions show patients you're invested. Better experience, stronger retention, more follow-up bookings.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5 shadow-sm">
            Features
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Better outcomes. Zero admin.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            A complete system for patient monitoring, safety, and engagement — without the overhead.
          </p>
        </div>

        {/* Feature grid */}
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group rounded-2xl bg-slate-50 p-7 ring-1 ring-black/5 transition-all hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 hover:ring-blue-100"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 ring-1 ring-blue-100/50 transition-colors group-hover:bg-blue-100">
                <feature.icon className="h-5 w-5 text-blue-600" />
              </div>
              <h3 className="mt-5 text-sm font-semibold tracking-tight text-slate-900">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-10 gap-y-3 rounded-2xl bg-slate-50 px-8 py-5 ring-1 ring-black/5">
          {[
            { icon: Lock, text: "Encrypted at rest and in transit" },
            { icon: Check, text: "UK GDPR compliant" },
            { icon: ShieldOff, text: "Your data is never used to train AI" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-xs text-slate-400">
              <Icon className="h-3.5 w-3.5" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
