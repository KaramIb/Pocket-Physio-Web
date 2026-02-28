import { Smartphone, Sparkles, ListChecks, Shield, Lock, Heart, Check, ShieldOff } from "lucide-react";

const features = [
  {
    icon: Smartphone,
    title: "WhatsApp. Not another app.",
    description: "98% open rate. Zero downloads. Patients reply the way they'd text a friend.",
  },
  {
    icon: Sparkles,
    title: "Signal, not noise",
    description: "AI reads every message and extracts pain, adherence, barriers, and mood — so you don't have to.",
  },
  {
    icon: ListChecks,
    title: "A queue, not a caseload",
    description: "Patients ranked by urgency. Green means progressing. You only open what needs your attention.",
  },
  {
    icon: Shield,
    title: "Safety-first. Always.",
    description: "Red-flag symptoms trigger instant escalation. Deterministic detection — no AI in the safety loop.",
  },
  {
    icon: Lock,
    title: "Replace personal WhatsApp",
    description: "Every interaction logged, timestamped, audit-ready. GDPR-compliant. No more messaging patients from your phone.",
  },
  {
    icon: Heart,
    title: "Patients who feel supported return",
    description: "Daily check-ins show you're invested between sessions. Better experience. Stronger retention.",
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
            Everything you need. Nothing you don&rsquo;t.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Clinical monitoring, safety, and engagement — without the overhead.
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
