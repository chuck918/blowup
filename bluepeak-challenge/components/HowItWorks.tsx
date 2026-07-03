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

const steps = [
  {
    num: "01",
    title: "Fill the Form",
    desc: "Complete your profile, choose a category.",
  },
  {
    num: "02",
    title: "Pay the fee",
    desc: "Pay via Mobile Money, Visa, or Mastercard through our secure payment gateway.",
  },
  {
    num: "03",
    title: "Await confirmation",
    desc: "Our team reviews every application and notifies you of your participation status.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 -left-32 bg-glow-orange opacity-30 pointer-events-none" />

      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight uppercase">
              Three steps<br />
              <span className="text-brand-yellow text-glow-yellow">to enter.</span>
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <a
              href={PAYSTACK_URL}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center  gap-2 bg-gradient-to-r from-brand-yellow via-brand-gold to-brand-orange text-black font-extrabold text-sm px-6 py-3 rounded-full hover:brightness-110 shadow-[0_0_15px_rgba(255,230,0,0.25)] transition-all duration-200"
            >
              Start here →
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(0.05 * i)}
              className="glass-card rounded-2xl p-8 flex gap-6 group relative overflow-hidden"
            >
              {/* Card top border glow on hover */}
              <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-brand-yellow to-brand-orange opacity-0 group-hover:opacity-100 transition-all duration-300" />
              
              <span className="text-sm font-black text-brand-orange/60 group-hover:text-brand-yellow transition-colors duration-300 tabular-nums shrink-0 mt-0.5">
                {s.num}
              </span>
              <div>
                <h3 className="font-extrabold text-white text-lg mb-2 group-hover:text-brand-yellow transition-colors duration-300">
                  {s.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
