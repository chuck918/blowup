"use client";
import { motion } from "framer-motion";
import { PAYSTACK_URL } from "@/lib/links";

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.5, delay, ease: "easeOut" as const },
  };
}

const benefits = [
  { label: "Recognition", desc: "Media highlights and professional exposure across platforms." },
  { label: "Networking", desc: "Connect with judges, mentors, sponsors, and ambitious peers." },
  { label: "Career exposure", desc: "Open doors with industry leaders and potential employers." },
  { label: "Media publicity", desc: "Get featured on digital channels and news platforms." },
  // { label: "Certificate", desc: "All participants receive an official certificate of participation." },
];

export default function WhyJoin() {
  return (
    <section id="why-join" className="py-24 bg-black relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/3 -right-32 bg-glow-yellow opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">Why join</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
              What you stand<br />
              <span className="text-brand-yellow text-glow-yellow">to gain.</span>
            </h2>
            <p className="text-gray-300 mt-6 text-lg leading-relaxed">
              BlowUp is not just a competition - it is a launchpad for your future.
            </p>
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex mt-8 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black font-extrabold text-sm px-6 py-3 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(255,230,0,0.25)] transition-all duration-200"
            >
              Blow Up Now →
            </a>
          </motion.div>

          <div className="grid grid-cols-1 gap-0 border border-white/10 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                {...fadeUp(0.05 * i)}
                className="flex items-start gap-4 px-6 py-5 bg-white/5 hover:bg-white/10 transition-colors border-b border-white/5 last:border-0 group"
              >
                <div className="w-2 h-2 rounded-full bg-brand-orange mt-2 shrink-0 shadow-[0_0_8px_rgba(255,94,0,0.8)] group-hover:bg-brand-yellow group-hover:shadow-[0_0_8px_rgba(255,230,0,0.8)] transition-all duration-300" />
                <div>
                  <h3 className="font-extrabold text-white text-base group-hover:text-brand-yellow transition-colors duration-300">{b.label}</h3>
                  <p className="text-gray-400 text-sm mt-0.5 leading-relaxed">{b.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
