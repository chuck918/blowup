"use client";
import { motion } from "framer-motion";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const events = [
  { date: "July 2026", label: "Registration Opens", desc: "Applications begin immediately.", active: true },
  { date: "15 Oct 2026", label: "Registration Closes", desc: "Final submission window closes.", active: false },
  { date: "Nov 2026", label: "Auditions", desc: "Shortlisted participants invited for screening.", active: false },
  { date: "Dec 2026", label: "Final Event", desc: "Finalists pitch before judges and industry experts.", active: false },
  { date: "Dec 2026", label: "Winner Announcement", desc: "Winners announced and celebrated publicly.", active: false },
];

export default function Timeline() {
  return (
    <section id="timeline" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/2 -left-32 bg-glow-orange opacity-25 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-3 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Timeline</p>
            <h2 className="text-4xl font-black text-white leading-tight tracking-tight uppercase">
              Key<br />
              <span className="text-brand-yellow text-glow-yellow">dates.</span>
            </h2>
            <p className="text-gray-300 text-base mt-4 leading-relaxed">
              Mark your calendar - do not miss any milestone.
            </p>
          </motion.div>

          <div className="md:col-span-2">
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-0 top-3 bottom-3 w-px bg-gradient-to-b from-brand-yellow via-brand-orange to-white/10" />

              <div className="space-y-0">
                {events.map((e, i) => (
                  <motion.div
                    key={e.label}
                    {...fadeUp(0.08 * i)}
                    className="relative flex gap-8 pl-8 pb-10 last:pb-0"
                  >
                    {/* Dot */}
                    <div
                      className={`absolute left-0 top-1.5 w-[9px] h-[9px] rounded-full -translate-x-[4px] border-2 transition-all duration-300 ${
                        e.active
                          ? "bg-brand-orange border-brand-orange shadow-[0_0_8px_rgba(255,94,0,0.8)] scale-125"
                          : "bg-black border-white/20"
                      }`}
                    />

                    <div>
                      <span className={`text-xs font-black uppercase tracking-wider ${e.active ? "text-brand-orange text-glow-orange" : "text-brand-yellow/60"}`}>
                        {e.date}
                      </span>
                      <h3 className="font-extrabold text-white text-base mt-1 mb-0.5">{e.label}</h3>
                      <p className="text-gray-400 text-sm">{e.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
