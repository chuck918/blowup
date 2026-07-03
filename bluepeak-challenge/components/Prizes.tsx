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

const prizes = [
  {
    place: "1st Place",
    amount: "GHS 5,000",
    perks: ["Gold trophy", "Media feature", "Mentorship package", "Sponsor deal"],
    highlight: true,
  },
  {
    place: "2nd Place",
    amount: "GHS 3,000",
    perks: ["Silver trophy", "Media mention", "Certificate", "Networking event"],
    highlight: false,
  },
  {
    place: "3rd Place",
    amount: "GHS 1,500",
    perks: ["Bronze trophy", "Certificate", "Social media shoutout"],
    highlight: false,
  },
];

const special = ["Best Innovation", "Best Youth Impact", "Best Design", "People's Choice"];

export default function Prizes() {
  return (
    <section id="prizes" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 -left-32 bg-glow-yellow opacity-35 pointer-events-none" />
      <div className="absolute bottom-10 -right-32 bg-glow-orange opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Prizes</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
              Win<br/>
              <span className="text-brand-yellow text-glow-yellow">big.</span>
            </h2>
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="text-gray-300 text-lg max-w-sm leading-relaxed">
            Outstanding work deserves outstanding rewards.
          </motion.p>
        </div>

        {/* Main prizes */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch mb-8">
          {prizes.map((p, i) => (
            <motion.div
              key={p.place}
              {...fadeUp(0.08 * i)}
              className={`rounded-2xl p-8 border flex flex-col justify-between relative overflow-hidden group transition-all duration-300 ${
                p.highlight
                  ? "bg-gradient-to-br from-[#151515] to-[#0A0A0A] border-brand-yellow/30 text-white shadow-[0_8px_32px_rgba(0,0,0,0.6)] md:scale-105 z-10"
                  : "glass-card border-white/10 text-white"
              }`}
            >
              {/* Top border indicator */}
              <div
                className={`absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange ${
                  p.highlight ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                } transition-all duration-300`}
              />

              <div>
                <p className={`text-xs font-black uppercase tracking-widest mb-3 ${p.highlight ? "text-brand-orange text-glow-orange" : "text-brand-yellow/60 group-hover:text-brand-yellow transition-colors"}`}>
                  {p.place}
                </p>
                <div className={`text-4xl font-black tracking-tight mb-6 ${p.highlight ? "text-brand-yellow text-glow-yellow" : "text-white group-hover:text-brand-yellow transition-colors duration-300"}`}>
                  {p.amount}
                </div>
                <ul className="space-y-3">
                  {p.perks.map((perk) => (
                    <li key={perk} className="text-sm flex items-start gap-2.5 text-gray-300 leading-relaxed">
                      <span className={`w-2.5 h-2.5 rounded-full shrink-0 mt-1.5 shadow-[0_0_6px_rgba(255,230,0,0.5)] ${p.highlight ? "bg-brand-orange" : "bg-brand-yellow/60"}`} />
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Special awards */}
        <motion.div {...fadeUp(0.3)} className="bg-white/5 border border-white/10 rounded-2xl p-7 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.3)]">
          <p className="text-brand-orange text-xs font-black uppercase tracking-widest mb-4">Special category awards</p>
          <div className="flex flex-wrap gap-2.5">
            {special.map((s) => (
              <span key={s} className="bg-white/5 border border-white/5 text-gray-300 text-sm font-semibold px-4 py-2 rounded-full hover:border-brand-yellow/30 hover:text-white transition-all duration-200">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
