"use client";

import { useEffect, useRef } from "react";
import { Check, AlertTriangle, Clock } from "lucide-react";

function DataWaveform() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, W, H);

    const cy = H / 2;

    const outerGlow = ctx.createLinearGradient(0, 0, W, 0);
    outerGlow.addColorStop(0, "rgba(56,189,248,0)");
    outerGlow.addColorStop(0.35, "rgba(56,189,248,0.06)");
    outerGlow.addColorStop(0.5, "rgba(56,189,248,0.18)");
    outerGlow.addColorStop(0.65, "rgba(56,189,248,0.06)");
    outerGlow.addColorStop(1, "rgba(56,189,248,0)");

    ctx.save();
    ctx.shadowColor = "rgba(56,189,248,0.3)";
    ctx.shadowBlur = 40;
    ctx.strokeStyle = outerGlow;
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.restore();

    const lineGrad = ctx.createLinearGradient(0, 0, W, 0);
    lineGrad.addColorStop(0, "rgba(56,189,248,0)");
    lineGrad.addColorStop(0.3, "rgba(56,189,248,0.25)");
    lineGrad.addColorStop(0.5, "rgba(125,211,252,0.9)");
    lineGrad.addColorStop(0.7, "rgba(56,189,248,0.25)");
    lineGrad.addColorStop(1, "rgba(56,189,248,0)");

    ctx.save();
    ctx.shadowColor = "rgba(56,189,248,0.5)";
    ctx.shadowBlur = 12;
    ctx.strokeStyle = lineGrad;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, cy);
    ctx.lineTo(W, cy);
    ctx.stroke();
    ctx.restore();
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-full"
      style={{ height: 48, display: "block" }}
      aria-hidden="true"
    />
  );
}

export function ClinicalIntelligence() {
  return (
    <section id="intelligence" className="bg-[#020617] py-28 sm:py-36">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center rounded-full bg-white/[0.07] px-5 py-2 text-sm font-semibold text-blue-300 ring-1 ring-white/10">
            Clinical Intelligence
          </div>
          <h2 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Never treat blind.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 sm:text-lg">
            Every patient gets an AI-generated clinical briefing before their next appointment.
            No more starting with &ldquo;so, how have you been?&rdquo;
          </p>
        </div>

        {/* Patient Snapshot Card */}
        <div className="mt-14 rounded-2xl bg-white p-6 shadow-2xl sm:p-8">

          {/* Card header */}
          <div className="flex items-start justify-between border-b border-slate-100 pb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                Patient Snapshot
              </p>
              <div className="mt-2 flex items-center gap-3 flex-wrap">
                <h3 className="text-lg font-semibold text-slate-900">Tom Henderson</h3>
                <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-semibold text-amber-700 ring-1 ring-amber-200">
                  Pain Signal
                </span>
              </div>
              <p className="mt-1 text-sm text-slate-400">ACL Rehabilitation &middot; Week 6</p>
            </div>
          </div>

          {/* AI Narrative */}
          <div className="mt-5">
            <p className="text-sm leading-[1.85] text-slate-600">
              Tom completed all five sessions this week but reported knee soreness after squats
              on both Tuesday and Thursday. First time he said{" "}
              <span className="font-medium text-slate-900">&ldquo;bit tight afterwards,&rdquo;</span>{" "}
              second time{" "}
              <span className="font-medium text-slate-900">&ldquo;properly sore, had to ice it.&rdquo;</span>{" "}
              Pain is lateral knee, post-exercise only, worsening trajectory. He&rsquo;s asking
              if he should drop the weight or push through.
            </p>
          </div>

          {/* Action bar */}
          <div className="mt-5 flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-3 ring-1 ring-amber-100">
            <AlertTriangle className="h-4 w-4 flex-shrink-0 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">Review before next session</span>
          </div>

          {/* Metadata */}
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Check className="h-3.5 w-3.5 text-emerald-500" />
              5/5 sessions completed
            </span>
            <span className="flex items-center gap-1.5">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
              Pain: worsening trend
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-slate-400" />
              Week 6 of 12
            </span>
          </div>
        </div>

        {/* Waveform */}
        <div className="mt-14 mb-14">
          <DataWaveform />
        </div>

        {/* Punchline */}
        <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          Pocket Physio turns the lights on.
        </p>

      </div>
    </section>
  );
}
