import { ArrowRight, Check, Phone, Lock, ShieldCheck, ServerOff } from "lucide-react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1.1fr_1fr] xl:gap-24 items-center">

          {/* Left side */}
          <div className="max-w-xl">
            <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-1.5 ring-1 ring-blue-100">
              <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                Clinical intelligence for physiotherapy
              </span>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.08] tracking-tight text-slate-900 sm:text-6xl">
              Track. Intervene.<br />Improve.
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-500">
              Turn between-session WhatsApp messages into clinical signal you can act on.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-full bg-blue-600 px-7 text-base font-medium shadow-sm hover:bg-blue-700">
                <a href="#contact">
                  Book a Demo
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-7 text-base font-medium text-slate-700 hover:bg-slate-50"
              >
                <a href="#how-it-works">See how it works</a>
              </Button>
            </div>

            <div className="mt-10 space-y-3">
              {[
                "98% open rate — WhatsApp, not another app",
                "AI extracts clinical signal from natural conversation",
                "You only see patients who need you",
              ].map((point) => (
                <p key={point} className="flex items-start gap-3 text-sm leading-relaxed text-slate-500">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-50">
                    <Check className="h-3 w-3 text-blue-600" />
                  </span>
                  {point}
                </p>
              ))}
            </div>
          </div>

          {/* Right side - Action Queue */}
          <div className="relative">
            <div className="relative rounded-2xl bg-white p-6 shadow-xl shadow-slate-200/60 ring-1 ring-black/5 sm:p-8">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
                <div>
                  <h3 className="text-sm font-semibold tracking-tight text-slate-900">
                    Action Queue
                  </h3>
                  <p className="mt-0.5 text-[11px] text-slate-400">Updated just now</p>
                </div>
                <span className="rounded-full bg-red-50 px-3 py-1 text-[11px] font-semibold text-red-600 ring-1 ring-red-100">
                  2 need attention
                </span>
              </div>

              <div className="space-y-2.5">
                {/* Card 1 - High Priority */}
                <div className="flex items-center gap-3 rounded-xl border-l-2 border-l-red-500 bg-red-50/50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">Emma Richards</p>
                      <span className="rounded-full bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-700">
                        Pain Increasing
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">Lower Back Pain · Day 8</p>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                    <Phone className="h-3 w-3" />
                    Check-in
                  </button>
                </div>

                {/* Card 2 - Medium Priority */}
                <div className="flex items-center gap-3 rounded-xl border-l-2 border-l-amber-500 bg-amber-50/50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">James Morrison</p>
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                        3 Days Silent
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">Knee Rehab · Day 14</p>
                  </div>
                  <button className="flex-shrink-0 flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm hover:bg-slate-50 transition-colors">
                    Nudge
                  </button>
                </div>

                {/* Card 3 - On Track */}
                <div className="flex items-center gap-3 rounded-xl border-l-2 border-l-emerald-500 bg-emerald-50/50 px-4 py-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">Lucy Chen</p>
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        On Track
                      </span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-400">Shoulder Program · Day 21</p>
                  </div>
                  <button className="flex-shrink-0 text-[11px] font-semibold text-slate-400 hover:text-slate-700 transition-colors">
                    View →
                  </button>
                </div>
              </div>
            </div>

            {/* Subheading below queue */}
            <p className="mt-7 text-base leading-relaxed text-slate-500">
              Your morning starts here. Open the queue, see who needs you, act.
            </p>

            {/* Soft glow behind card */}
            <div className="absolute -inset-6 -z-10 rounded-3xl bg-blue-600/5 blur-3xl" />
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <div className="border-t border-slate-100 bg-slate-50/50">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-10">
            {[
              { icon: Lock, text: "Encrypted at rest and in transit" },
              { icon: ShieldCheck, text: "UK GDPR compliant" },
              { icon: ServerOff, text: "Your data is never used to train AI" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 text-xs text-slate-400">
                <Icon className="h-3.5 w-3.5" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
