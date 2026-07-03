"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { GOOGLE_FORM_URL as FORM_URL } from "@/lib/links";

const COUNTDOWN_SECONDS = 300;

export default function ThankYou() {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (seconds <= 0 && FORM_URL) {
      window.location.href = FORM_URL;
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  return (
    <main className="min-h-screen bg-black flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Decorative background glows */}
      <div className="absolute top-1/4 -left-32 bg-glow-orange opacity-30 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 bg-glow-yellow opacity-25 pointer-events-none" />

      <div className="max-w-lg w-full text-center relative z-10">
        {/* Animated checkmark */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange flex items-center justify-center shadow-[0_0_20px_rgba(255,230,0,0.35)]">
          <svg
            className="w-10 h-10 text-black"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-black text-white mb-3 uppercase tracking-tight">Payment Confirmed!</h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Thank you for registering for the BlowUp Innovation Challenge.
          <br />
          Your payment has been received successfully.
        </p>

        {/* Next steps */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <h2 className="font-extrabold text-white mb-4 text-center uppercase tracking-wider">Next Steps</h2>
          {[
            "Save your payment reference number",
            "You will be redirected to the application form automatically",
            "Complete all fields accurately",
            "Submit and await our confirmation email",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-sm text-gray-300 mb-3 last:mb-0">
              <span className="w-6 h-6 bg-brand-yellow text-black font-black rounded-full flex items-center justify-center flex-shrink-0 text-xs shadow-[0_0_8px_rgba(255,230,0,0.2)]">
                {i + 1}
              </span>
              {step}
            </div>
          ))}
        </div>

        {/* Countdown + CTA */}
        <div className="mb-4">
          <a
            href={FORM_URL}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 w-full bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black font-extrabold py-4 rounded-2xl text-lg shadow-[0_0_15px_rgba(255,230,0,0.25)] hover:brightness-110 transition-all duration-200"
          >
            Open Application Form →
          </a>
          {seconds > 0 ? (
            <p className="text-gray-400 text-sm mt-3">
              Redirecting automatically in{" "}
              <span className="font-bold text-brand-yellow text-glow-yellow">{seconds}</span> second
              {seconds !== 1 ? "s" : ""}…
            </p>
          ) : (
            <p className="text-gray-400 text-sm mt-3">Redirecting now…</p>
          )}
        </div>

        <Link href="/" className="inline-block text-brand-yellow font-extrabold text-sm hover:text-brand-orange transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
