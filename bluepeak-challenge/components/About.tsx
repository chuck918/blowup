"use client";
import { motion } from "framer-motion";

const categories = [
  { num: "01", title: "Film Director", desc: "Creators shaping stories through visual direction and cinematic storytelling." },
  { num: "02", title: "Musician", desc: "Artists crafting performances, melodies, and original musical expression." },
  { num: "03", title: "Sound Engineer / Beat Programmer", desc: "Talent building immersive soundscapes, mixes, and beat-driven production." },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

export default function About() {
  return (
    <section id="about" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative glows */}
      <div className="absolute top-1/3 -right-32 bg-glow-yellow opacity-40 pointer-events-none" />
      <div className="absolute bottom-10 -left-32 bg-glow-orange opacity-40 pointer-events-none" />

      <div className="container relative z-10">
        {/* Two-column header */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">About</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
              Built for bold<br />
              <span className="text-brand-yellow text-glow-yellow">innovators.</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-col justify-end">
            <p className="text-gray-300 text-lg leading-relaxed">
              The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence,
              and creates meaningful opportunities for participants across Ghana and beyond.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-10 pt-10 border-t border-white/10">
              {[
                { label: "Open to", value: "All Creators" },
                { label: "Deadline", value: "Aug 23, 2026" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="text-brand-orange text-xs mt-1 font-bold uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <motion.p {...fadeUp(0.15)} className="eyebrow mb-8">Competition categories</motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((c, i) => (
            <motion.div
              key={c.num}
              {...fadeUp(0.1 + i * 0.07)}
              className="glass-card rounded-2xl p-8 relative overflow-hidden group"
            >
              {/* Card top border glow on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-yellow to-brand-orange opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              <span className="text-xs font-black text-brand-yellow/60 group-hover:text-brand-yellow transition-colors duration-300 tabular-nums">
                {c.num}
              </span>
              <h3 className="font-extrabold text-white text-lg mt-4 mb-3 tracking-tight group-hover:text-brand-yellow transition-colors duration-300">
                {c.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
