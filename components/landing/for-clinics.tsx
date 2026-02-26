import { Check, X } from "lucide-react";

const stats = [
  {
    value: "Earlier",
    label: "Intervention",
    note: "Catch problems days before the next appointment.",
  },
  {
    value: "95%",
    label: "Message open rate",
    note: "WhatsApp gets read. Apps don't.",
  },
  {
    value: "0",
    label: "Apps to download",
    note: "No app fatigue. No friction. No barrier.",
  },
];

const comparisonRows = [
  {
    without: "Patients leave and you hope for the best",
    with: "Regular check-ins tell you exactly how they're doing",
  },
  {
    without: "No visibility until the next appointment",
    with: "Real-time signals surface who needs attention",
  },
  {
    without: "Manual follow-up takes time you don't have",
    with: "AI handles the conversation. You review and act.",
  },
  {
    without: "Another app patients won't download",
    with: "WhatsApp. Already on their phone. Already trusted.",
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
            Intelligence across your entire caseload.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            Whether they're recovering from surgery or training for a marathon, the gap between sessions is where the outcome is decided.
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

        {/* Comparison table */}
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-100">
            <div className="border-r border-slate-100 px-7 py-5">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-red-400" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">Without Pocket Physio</h3>
              </div>
            </div>
            <div className="px-7 py-5">
              <div className="flex items-center gap-2.5">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">With Pocket Physio</h3>
              </div>
            </div>
          </div>

          {/* Rows */}
          {comparisonRows.map((row, index) => (
            <div
              key={index}
              className={`grid grid-cols-2 ${index % 2 === 1 ? "bg-slate-50/50" : "bg-white"} ${
                index !== comparisonRows.length - 1 ? "border-b border-slate-100" : ""
              }`}
            >
              <div className="border-r border-slate-100 px-7 py-5">
                <div className="flex items-start gap-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                  <p className="text-sm leading-relaxed text-slate-400">{row.without}</p>
                </div>
              </div>
              <div className="px-7 py-5">
                <div className="flex items-start gap-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
                  <p className="text-sm leading-relaxed text-slate-700">{row.with}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
