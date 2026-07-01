"use client";
import { motion } from "framer-motion";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-40px" },
    transition: { duration: 0.45, delay },
  };
}

const sponsors = [
  "TechGhana", "InnovateCo", "StartupHub", "GhanaVC",
  "DigiMedia", "AfriTech", "BoldFund", "CreativeGH",
];

export default function Sponsors() {
  return (
    <section id="sponsors" className="py-20 bg-gray-50 border-t border-gray-100">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-12">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-2">Sponsors &amp; Partners</p>
            <h2 className="text-2xl font-black text-gray-900">Backed by industry leaders.</h2>
          </motion.div>
          <motion.a
            {...fadeUp(0.1)}
            href="#contact"
            className="text-sm text-[#1d4ed8] font-semibold hover:underline shrink-0"
          >
            Become a sponsor →
          </motion.a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {sponsors.map((s, i) => (
            <motion.div
              key={s}
              {...fadeUp(0.04 * i)}
              className="bg-white rounded-xl border border-gray-100 h-16 flex items-center justify-center text-sm font-semibold text-gray-500 hover:text-gray-800 hover:border-gray-200 transition-colors"
            >
              {s}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
