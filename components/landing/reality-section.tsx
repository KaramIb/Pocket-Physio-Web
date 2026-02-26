"use client";

import { useEffect, useRef } from "react";

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

    // Outer soft glow — wide, very faint
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

    // Core bright line
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

export function RealitySection() {
  return (
    <section className="bg-[#020617] py-28 sm:py-36">
      <div className="mx-auto max-w-[720px] px-6 sm:px-8">

        {/* Headline */}
        <h2 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
          Never treat blind.
        </h2>

        {/* Subhead */}
        <p className="mt-5 text-lg font-medium text-slate-400 sm:text-xl">
          You can't manage what you can't see.
        </p>

        {/* Body */}
        <p className="mt-8 text-base leading-[1.85] text-slate-300 sm:text-lg">
          99% of rehabilitation happens outside your clinic. Today, that time is unsupervised and invisible. You treat the patient in front of you, but you lose them the moment they leave. Pocket Physio captures the 99% — turning the invisible interval into your most valuable clinical asset.
        </p>

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
