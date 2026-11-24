"use client";

import { useEffect, useState } from "react";

function split(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  return { Days: Math.floor(s / 86400), Hrs: Math.floor((s % 86400) / 3600), Min: Math.floor((s % 3600) / 60), Sec: s % 60 };
}

/** Renders placeholders on the server, then ticks in the browser (no hydration mismatch). */
export default function Countdown({ target }: { target: string }) {
  const [left, setLeft] = useState<ReturnType<typeof split> | null>(null);

  useEffect(() => {
    const t = new Date(target).getTime();
    const tick = () => setLeft(split(t - Date.now()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);

  const units = left ?? { Days: null, Hrs: null, Min: null, Sec: null };
  return (
    <div className="grid grid-cols-4 gap-2" role="timer" aria-label="Time left to register">
      {Object.entries(units).map(([label, v]) => (
        <div key={label} className="rounded-2xl border border-line bg-white/[0.03] px-2 py-3 text-center">
          <div className="display text-3xl sm:text-4xl tabular-nums text-brand-yellow">
            {v === null ? "--" : String(v).padStart(2, "0")}
          </div>
          <div className="mt-1 text-[0.62rem] font-extrabold uppercase tracking-[0.2em] text-subtle">{label}</div>
        </div>
      ))}
    </div>
  );
}
