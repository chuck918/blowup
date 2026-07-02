"use client";
import { useEffect, useState } from "react";
import { PAYSTACK_URL } from "@/lib/links";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function getTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

const DEADLINE = new Date("2026-10-15T23:59:59");

export default function Hero() {
  const [time, setTime] = useState(() => getTimeLeft(DEADLINE));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(DEADLINE)), 1000);
    return () => clearInterval(id);
  }, []);

  const units = [
    { label: "Days", value: time.days },
    { label: "Hrs", value: time.hours },
    { label: "Min", value: time.minutes },
    { label: "Sec", value: time.seconds },
  ];

  return (
    <section
      className="relative min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #1e3a8a 0%, #1d4ed8 55%, #0f172a 100%)" }}
    >
      {/* Top meta bar */}
      <div className="container pt-28 pb-0 flex items-center justify-between">
        <span className="text-white/40 text-xs font-medium uppercase tracking-widest">Ghana · 2026</span>
        <span className="text-white/40 text-xs font-medium">Open for Registration</span>
      </div>

      {/* Hero body */}
      <div className="container flex-1 flex flex-col justify-center py-16">
        <div className="max-w-3xl">
          <p className="text-amber-400 text-sm font-semibold mb-5 tracking-wide">
            BlowUp Innovation Challenge
          </p>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white leading-[1.05] tracking-tight mb-8">
            Compete.<br />
            <span className="text-white/50">Innovate.</span><br />
            Win Big.
          </h1>

          <p className="text-blue-200 text-lg leading-relaxed max-w-xl mb-10">
            A national platform for bold ideas - open to startups, technologists,
            artists, and youth changemakers across Ghana.
          </p>

          <div className="flex flex-wrap gap-3">
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-bold px-7 py-3.5 rounded-full text-sm hover:bg-amber-300 transition-colors"
            >
              Buy Registration Form
            </a>
            <a
              href="#about"
              className="inline-flex items-center gap-2 bg-white/10 text-white border border-white/20 font-medium px-7 py-3.5 rounded-full text-sm hover:bg-white/15 transition-colors"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip — stats + countdown */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-2xl font-black text-white">GHS 9,500+</div>
              <div className="text-white/40 text-xs mt-0.5">Total prize pool</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-black text-white">3</div>
              <div className="text-white/40 text-xs mt-0.5">Categories</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <div className="text-2xl font-black text-amber-400">Oct 15</div>
              <div className="text-white/40 text-xs mt-0.5">Deadline 2026</div>
            </div>
          </div>

          {/* Countdown */}
          <div className="flex items-center gap-1" suppressHydrationWarning>
            {units.map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-1">
                <div className="bg-white/10 rounded-lg px-3 py-2 text-center min-w-[52px]">
                  <div className="text-xl font-black text-white tabular-nums" suppressHydrationWarning>
                    {pad(value)}
                  </div>
                  <div className="text-white/40 text-[10px] font-medium mt-0.5">{label}</div>
                </div>
                {i < units.length - 1 && (
                  <span className="text-white/30 text-sm font-bold mb-1">:</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
