import { Check, X } from "lucide-react";

const stats = [
  {
    value: "98%",
    label: "Message open rate",
    note: "WhatsApp gets read. Health apps don't.",
  },
  {
    value: "Day 2",
    label: "Problem detection",
    note: "Not at the next appointment.",
  },
  {
    value: "0",
    label: "Apps to download",
    note: "Zero downloads. Zero logins. Zero behaviour change.",
  },
];

const scenarios = [
  {
    title: "Pain caught early",
    before:
      'Athlete says "bit tight" Tuesday. "Properly sore" Thursday. Physio finds out Friday — assessment starts from scratch.',
    after:
      "Dashboard flags worsening pain Thursday. Physio walks in knowing exactly what to address.",
  },
  {
    title: "Dropout prevented",
    before:
      "Patient goes silent Tuesday. Misses Thursday. Never rebooks. Four sessions of revenue lost.",
    after:
      "Silence flagged Day 1. Check-in sent. Patient replies. Session saved.",
  },
];

export function ForClinics() {
  return (
    <section id="for-clinics" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-slate-50 px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5 shadow-sm">
            For Clinics
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Better decisions. Retained patients.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            The gap between sessions is where outcomes are decided. Now you have visibility across your entire caseload.
          </p>
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl gap-5 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-slate-50 p-8 text-center ring-1 ring-black/5"
            >
              <p className="text-5xl font-semibold tracking-tight text-slate-900">
                {stat.value}
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-700">{stat.label}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{stat.note}</p>
            </div>
          ))}
        </div>

        {/* Before / After scenarios */}
        <div className="mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2">
          {scenarios.map((scenario) => (
            <div
              key={scenario.title}
              className="overflow-hidden rounded-2xl ring-1 ring-black/5"
            >
              <div className="border-b border-slate-100 bg-slate-50 px-6 py-4">
                <h3 className="text-sm font-semibold text-slate-900">{scenario.title}</h3>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-red-400" />
                  <p className="text-sm leading-relaxed text-slate-400">{scenario.before}</p>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-emerald-500" />
                  <p className="text-sm leading-relaxed text-slate-700">{scenario.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Business value */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-base font-medium text-slate-500">
          One saved dropout per physio per month pays for the entire platform.
        </p>

      </div>
    </section>
  );
}
