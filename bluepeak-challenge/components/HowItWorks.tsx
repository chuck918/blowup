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

const steps = [
  {
    num: "01",
    title: "Pay the fee",
    desc: "Pay via Mobile Money, Visa, or Mastercard through our secure payment gateway.",
  },
  {
    num: "02",
    title: "Get your reference",
    desc: "You'll receive instant payment confirmation and a unique reference number.",
  },
  {
    num: "03",
    title: "Fill the Google Form",
    desc: "Complete your profile, choose a category, and submit your project details.",
  },
  {
    num: "04",
    title: "Await confirmation",
    desc: "Our team reviews every application and notifies you of your participation status.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-gray-50">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <motion.div {...fadeUp(0)}>
            <p className="eyebrow mb-4">How it works</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight tracking-tight">
              Four steps<br />to enter.
            </h2>
          </motion.div>
          <motion.div {...fadeUp(0.1)}>
            <a
              href="https://paystack.com/pay/blowup-competition"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 bg-[#1d4ed8] text-white font-semibold text-sm px-6 py-3 rounded-full hover:bg-blue-700 transition-colors"
            >
              Start here →
            </a>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {steps.map((s, i) => (
            <motion.div
              key={s.num}
              {...fadeUp(0.05 * i)}
              className="bg-white rounded-2xl p-8 border border-gray-100 flex gap-6"
            >
              <span className="text-xs font-bold text-gray-200 tabular-nums shrink-0 mt-0.5">{s.num}</span>
              <div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
