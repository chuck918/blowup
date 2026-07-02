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
    <section id="about" className="py-24 bg-white">
      <div className="container">
        {/* Two-column header */}
        <div className="grid md:grid-cols-2 gap-12 items-start mb-20">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">About</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Built for bold<br />innovators.
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)} className="flex flex-col justify-end">
            <p className="text-gray-500 text-lg leading-relaxed">
              The BlowUp Innovation Challenge uncovers bold ideas, rewards excellence,
              and creates meaningful opportunities for participants across Ghana and beyond.
            </p>

            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-100">
              {[
                { label: "Open to", value: "All" },
                { label: "Deadline", value: "Aug 23" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                  <div className="text-gray-400 text-xs mt-1 font-medium uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <motion.p {...fadeUp(0.15)} className="eyebrow mb-8">Competition categories</motion.p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100 rounded-2xl overflow-hidden">
          {categories.map((c, i) => (
            <motion.div
              key={c.num}
              {...fadeUp(0.1 + i * 0.07)}
              className="bg-white p-7 hover:bg-gray-50 transition-colors"
            >
              <span className="text-xs font-bold text-gray-300 tabular-nums">{c.num}</span>
              <h3 className="font-bold text-gray-900 text-base mt-3 mb-2">{c.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{c.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
