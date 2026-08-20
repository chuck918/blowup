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

const DEADLINE = new Date("2026-08-23T23:59:59");

export default function Hero() {
  const [time, setTime] = useState(() => getTimeLeft(DEADLINE));

  useEffect(() => {
    const updateTime = () => setTime(getTimeLeft(DEADLINE));
    updateTime();
    const id = setInterval(updateTime, 1000);
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
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.85) 0%, rgba(255, 94, 0, 0.08) 50%, rgba(0, 0, 0, 0.95) 100%), url('/images/Backdrop 2.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
      }}
    >
      {/* Decorative glows */}
      <div className="absolute top-1/4 -left-20 bg-glow-yellow opacity-60 pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 bg-glow-orange opacity-65 pointer-events-none" />
      
      {/* Sunburst radial overlay */}
      <div className="absolute inset-0 sunburst-bg opacity-30 pointer-events-none" />
      <div className="absolute inset-0 sunburst-overlay opacity-20 pointer-events-none" />

      {/* Hero body */}
      <div className="container flex-1 flex flex-col justify-center py-24 relative z-10">
        <div className="max-w-3xl">
          {/* <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6 shadow-sm">
            <img src="/images/logo.png" alt="The BlowUp Logo" className="h-6 w-auto object-contain brightness-110" />
            <span className="text-xs font-extrabold uppercase tracking-widest text-brand-yellow">The BlowUp Innovation Challenge</span>
          </div> */}

          <div className="relative mb-12">
            <h1 className="text-6xl sm:text-7xl md:text-8.5xl font-black text-white leading-none tracking-tighter select-none">
              Compete<br />
              <span className="text-white/30">Innovate</span><br />
              Win Big!
            </h1>
            {/* <span className="absolute -bottom-6 left-12 sm:left-24 script-highlight text-brand-yellow text-4xl sm:text-5xl md:text-6xl transform -rotate-3 drop-shadow-[0_2px_10px_rgba(255,230,0,0.55)] select-none pointer-events-none">
              Challenge
            </span> */}
          </div>

          <p className="text-gray-300 text-lg sm:text-xl leading-relaxed max-w-xl mb-10 border-l-2 border-brand-yellow pl-4">
             A platform for bold ideas. Open to creatives.
          </p>

          <div className="flex flex-wrap gap-4 text-white">
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="button-black inline-flex items-center gap-2 bg-linear-to-r from-brand-yellow via-brand-gold to-brand-orange text-[#000000] font-extrabold px-8 py-4 rounded-full text-sm hover:brightness-110 transition-all shadow-[0_0_20px_rgba(255,230,0,0.3)] hover:shadow-[0_0_35px_rgba(255,230,0,0.6)] hover:-translate-y-0.5 duration-200"
            >
              Blow Up Now
            </a>
            <a
              href="#about"
              className="link button-white inline-flex items-center gap-2 bg-white/5 text-white border border-white/10 font-bold px-8 py-4 rounded-full text-sm hover:bg-white/10 hover:border-white/20 transition-all backdrop-blur-sm"
            >
              Learn more
            </a>
          </div>
        </div>
      </div>

      {/* Bottom strip — stats + countdown */}
      <div className="border-t border-white/10 bg-black/40 backdrop-blur-md relative z-10">
        <div className="container py-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Stats */}
          <div className="flex items-center gap-8">
            <div>
              <div className="text-2xl font-black text-white">3</div>
              <div className="text-white/40 text-xs mt-0.5 font-bold uppercase tracking-wider">Categories</div>
            </div>
            <div className="w-px h-8 bg-white/10" />
            {/* <div>
              <div className="text-2xl font-black text-brand-yellow text-glow-yellow">Aug 23</div>
              <div className="text-white/40 text-xs mt-0.5 font-bold uppercase tracking-wider">Deadline 2026</div>
            </div> */}
          </div>

          {/* Countdown */}
          {/* <div className="flex items-center gap-1.5" suppressHydrationWarning>
            {units.map(({ label, value }, i) => (
              <div key={label} className="flex items-center gap-1.5">
                <div className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-center min-w-16 backdrop-blur-sm shadow-[0_4px_12px_rgba(0,0,0,0.3)]">
                  <div className="text-2xl font-black text-brand-yellow tabular-nums text-glow-yellow" suppressHydrationWarning>
                    {pad(value)}
                  </div>
                  <div className="text-white/40 text-[9px] font-bold uppercase tracking-wider mt-1">{label}</div>
                </div>
                {i < units.length - 1 && (
                  <span className="text-brand-orange text-lg font-black animate-pulse mb-1">:</span>
                )}
              </div>
            ))}
          </div> */}
        </div>
      </div>
    </section>
  );
}
