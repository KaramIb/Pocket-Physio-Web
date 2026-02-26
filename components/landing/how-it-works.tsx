import { MessageSquare, Activity, Zap, CheckCircle, AlertCircle, Flag } from "lucide-react";

export function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-slate-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-black/5 shadow-sm">
            How it works
          </div>
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl">
            Simple for patients. Powerful for you.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500 sm:text-lg">
            No apps. No logins. No chasing. Just daily intelligence, straight to your queue.
          </p>
        </div>

        {/* Cards */}
        <div className="relative mt-16 grid gap-6 md:grid-cols-3">

          {/* Arrow connectors */}
          <div className="absolute left-1/3 top-16 z-20 hidden -translate-x-1/2 md:block">
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
          <div className="absolute left-2/3 top-16 z-20 hidden translate-x-1/2 md:block">
            <svg className="h-5 w-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>

          {/* Card 1 */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm shadow-slate-200/50 ring-1 ring-black/5">
            <div className="text-4xl font-semibold tracking-tight text-blue-100 select-none">01</div>
            <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <MessageSquare className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">Daily support via WhatsApp</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Exercise reminders on prescribed days. Smart nudges when they go quiet. They reply naturally — no app, no forms, just a message.
            </p>
            {/* WhatsApp preview */}
            <div className="mt-auto pt-6">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-black/5">
                <p className="text-[10px] font-medium text-slate-400 mb-2.5">Sarah M · 2:34 PM</p>
                <div className="inline-block rounded-xl rounded-tl-sm bg-[#DCF8C6] px-3 py-2 shadow-sm">
                  <p className="text-xs leading-relaxed text-[#111B21]">
                    {"done but my knee was a bit weird after the squats"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm shadow-slate-200/50 ring-1 ring-black/5">
            <div className="text-4xl font-semibold tracking-tight text-blue-100 select-none">02</div>
            <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Activity className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">It understands what matters</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              The system reads every message and extracts the clinical signal — pain, progress, barriers — automatically.
            </p>
            {/* Transformation visual */}
            <div className="mt-auto pt-6 space-y-2.5">
              {/* Input */}
              <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-black/5">
                <div className="inline-block rounded-xl rounded-tl-sm bg-[#DCF8C6] px-3 py-2">
                  <p className="text-[10px] text-[#111B21] leading-relaxed">{"done but my knee was a bit weird after the squats"}</p>
                </div>
              </div>
              {/* Arrow */}
              <div className="flex justify-center">
                <svg className="h-3.5 w-3.5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
              {/* Clinical Summary */}
              <div className="rounded-xl bg-white p-3 ring-1 ring-black/5 shadow-sm space-y-0">
                <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-2">Clinical Summary</p>
                <div className="flex items-center gap-2.5 py-1.5">
                  <CheckCircle className="h-3.5 w-3.5 flex-shrink-0 text-emerald-500" />
                  <span className="text-[10px] text-slate-400 w-14">Status</span>
                  <span className="font-mono text-[10px] font-semibold text-emerald-700">Completed</span>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-t border-slate-50">
                  <AlertCircle className="h-3.5 w-3.5 flex-shrink-0 text-amber-500" />
                  <span className="text-[10px] text-slate-400 w-14">Symptom</span>
                  <span className="font-mono text-[10px] font-semibold text-amber-700">Knee Pain (Mild)</span>
                </div>
                <div className="flex items-center gap-2.5 py-1.5 border-t border-slate-50">
                  <Flag className="h-3.5 w-3.5 flex-shrink-0 text-blue-500" />
                  <span className="text-[10px] text-slate-400 w-14">Action</span>
                  <span className="font-mono text-[10px] font-semibold text-blue-700">Flagged for Review</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col rounded-2xl bg-white p-8 shadow-sm shadow-slate-200/50 ring-1 ring-black/5">
            <div className="text-4xl font-semibold tracking-tight text-blue-100 select-none">03</div>
            <div className="mt-5 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <Zap className="h-5 w-5 text-blue-600" />
            </div>
            <h3 className="mt-5 text-base font-semibold tracking-tight text-slate-900">Your queue shows who needs you</h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-500">
              Patients are ranked by urgency. You see the signal and a draft response, ready to review and send.
            </p>
            {/* Mini queue */}
            <div className="mt-auto pt-6">
              <div className="rounded-xl bg-slate-50 p-4 ring-1 ring-black/5">
                <div className="flex items-center gap-3 rounded-lg border-l-2 border-l-amber-500 bg-white px-3 py-2.5 shadow-sm ring-1 ring-black/5">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-900">Sarah M</p>
                    <p className="text-[10px] text-slate-400">Pain Reported</p>
                  </div>
                  <span className="flex-shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-[9px] font-semibold text-amber-700">
                    Urgent
                  </span>
                  <button className="flex-shrink-0 text-[10px] font-semibold text-blue-600 hover:text-blue-700">
                    Review →
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
