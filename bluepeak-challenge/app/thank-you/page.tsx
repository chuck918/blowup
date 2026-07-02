"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScNxrpienMzI_kvFutwZ6gOEpCeo7dKVJwlueoTUQpK0Vxesw/viewform?usp=sharing&ouid=116088014118637590493";

const COUNTDOWN_SECONDS = 300;

export default function ThankYou() {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = FORM_URL;
      return;
    }
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-900 to-slate-900 flex items-center justify-center px-6 py-24">
      <div className="max-w-lg w-full text-center">
        {/* Animated checkmark */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-full bg-amber-400 flex items-center justify-center shadow-2xl">
          <svg
            className="w-10 h-10 text-gray-900"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-4xl font-black text-white mb-3">Payment Confirmed!</h1>
        <p className="text-blue-200 text-lg mb-8 leading-relaxed">
          Thank you for registering for the BlowUp Innovation Challenge.
          <br />
          Your payment has been received successfully.
        </p>

        {/* Next steps */}
        <div className="bg-white/10 border border-white/20 rounded-2xl p-6 mb-8 text-left backdrop-blur">
          <h2 className="font-bold text-white mb-4 text-center">Next Steps</h2>
          {[
            "Save your payment reference number",
            "You will be redirected to the application form automatically",
            "Complete all fields accurately",
            "Submit and await our confirmation email",
          ].map((step, i) => (
            <div key={step} className="flex items-center gap-3 text-sm text-blue-100 mb-3 last:mb-0">
              <span className="w-6 h-6 bg-amber-400 text-gray-900 font-black rounded-full flex items-center justify-center flex-shrink-0 text-xs">
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
            className="inline-flex items-center justify-center gap-2 w-full bg-amber-400 text-gray-900 font-black py-4 rounded-2xl text-lg shadow-xl hover:bg-amber-300 transition-colors"
          >
            Open Application Form →
          </a>
          {seconds > 0 ? (
            <p className="text-blue-300 text-sm mt-3">
              Redirecting automatically in{" "}
              <span className="font-bold text-amber-400">{seconds}</span> second
              {seconds !== 1 ? "s" : ""}…
            </p>
          ) : (
            <p className="text-blue-300 text-sm mt-3">Redirecting now…</p>
          )}
        </div>

        <Link href="/" className="inline-block text-blue-400 text-sm hover:text-white transition-colors">
          ← Back to Homepage
        </Link>
      </div>
    </main>
  );
}
