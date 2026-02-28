"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, Check } from "lucide-react";

export function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem('name') as HTMLInputElement).value,
      email: (form.elements.namedItem('email') as HTMLInputElement).value,
      clinic: (form.elements.namedItem('clinic') as HTMLInputElement).value,
      phone: (form.elements.namedItem('phone') as HTMLInputElement).value,
      message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to send');
      setSubmitted(true);
    } catch {
      setError('Something went wrong. Please email us directly at karam@pocketphysio.uk');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="bg-muted/30 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl">
          {/* Section header */}
          <div className="text-center">
            <h2 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Book your demo
            </h2>
            <p className="mt-4 text-pretty text-base leading-relaxed text-muted-foreground sm:text-lg">
              See exactly how Pocket Physio would work with your clinic.
            </p>

            {/* Founder credibility */}
            <div className="mt-6 inline-flex items-center gap-2.5 rounded-full bg-slate-100 px-5 py-2.5">
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-600">
                <span className="text-[10px] font-bold text-white">NHS</span>
              </div>
              <span className="text-sm font-medium text-slate-600">
                Built by an NHS Physiotherapist
              </span>
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="mt-12 rounded-2xl border border-success/20 bg-success-bg p-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/10">
                <Check className="h-6 w-6 text-success" />
              </div>
              <h3 className="mt-4 text-lg font-semibold text-foreground">
                Thanks for your interest
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                We{"'"}ll be in touch within 24 hours to schedule your demo.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-12 space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Your name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Sarah Chen"
                    required
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="sarah@physioclinic.com"
                    required
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="clinic" className="text-sm font-medium">
                    Clinic name
                  </Label>
                  <Input
                    id="clinic"
                    placeholder="City Physiotherapy"
                    className="h-11 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">
                    Phone{" "}
                    <span className="text-muted-foreground font-normal">(optional)</span>
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+44 7700 900000"
                    className="h-11 rounded-lg"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-sm font-medium">
                  Tell us about your clinic{" "}
                  <span className="text-muted-foreground font-normal">(optional)</span>
                </Label>
                <Textarea
                  id="message"
                  placeholder="e.g. How many patients you see weekly, what your biggest challenge is between sessions..."
                  rows={3}
                  className="rounded-lg"
                />
              </div>

              <div>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="w-full rounded-full text-base sm:w-auto sm:px-8"
                >
                  {loading ? "Sending..." : "Book a Demo"}
                  {!loading && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
                {error && (
                  <p className="mt-3 text-xs text-destructive">{error}</p>
                )}
                <p className="mt-3 text-xs text-muted-foreground">
                  We{"'"}ll be in touch within 24 hours. No spam, ever.
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
