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
    <section id="prizes" className="py-24 bg-white">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Prizes</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Win big.
            </h2>
          </motion.div>
          <motion.p {...fadeUp(0.1)} className="text-gray-500 text-lg max-w-sm leading-relaxed">
            Outstanding work deserves outstanding rewards.
          </motion.p>
        </div>

        {/* Main prizes */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          {prizes.map((p, i) => (
            <motion.div
              key={p.place}
              {...fadeUp(0.08 * i)}
              className={`rounded-2xl p-8 border ${
                p.highlight
                  ? "bg-[#1e3a8a] border-[#1e3a8a] text-white"
                  : "bg-gray-50 border-gray-100 text-gray-900"
              }`}
            >
              <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${p.highlight ? "text-blue-300" : "text-gray-400"}`}>
                {p.place}
              </p>
              <div className={`text-4xl font-black tracking-tight mb-6 ${p.highlight ? "text-white" : "text-gray-900"}`}>
                {p.amount}
              </div>
              <ul className="space-y-2">
                {p.perks.map((perk) => (
                  <li key={perk} className={`text-sm flex items-center gap-2 ${p.highlight ? "text-blue-200" : "text-gray-500"}`}>
                    <span className={`w-1 h-1 rounded-full shrink-0 ${p.highlight ? "bg-amber-400" : "bg-gray-300"}`} />
                    {perk}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Special awards */}
        <motion.div {...fadeUp(0.3)} className="bg-gray-50 rounded-2xl p-7 border border-gray-100">
          <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Special category awards</p>
          <div className="flex flex-wrap gap-3">
            {special.map((s) => (
              <span key={s} className="bg-white border border-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-full">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
