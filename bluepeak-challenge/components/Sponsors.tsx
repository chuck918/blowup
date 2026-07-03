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
    <section id="sponsors" className="py-20 bg-black border-t border-white/10">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-2">Sponsors &amp; Partners</p>
            <h2 className="text-2xl font-black text-white uppercase">Become a partner.</h2>
          </motion.div>
          <motion.a
            {...fadeUp(0.1)}
            href="#contact"
            className="link text-sm text-brand-yellow font-extrabold hover:text-brand-orange transition-colors shrink-0"
          >
            Become a sponsor →
          </motion.a>
        </div>
      </div>
    </section>
  );
}
